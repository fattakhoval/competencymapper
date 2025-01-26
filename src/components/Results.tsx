import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, RefreshCw, MessageSquare } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Results = () => {
  const [currentData, setCurrentData] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState({ title: "", items: [] });

  const getRecommendations = (scores) => {
    const scoreData = typeof scores === 'string' ? JSON.parse(scores) : scores;
    
    // Приводим названия категорий к единому формату
    const normalizedScores = {
      Leader: scoreData.Leader?.percentage || 0,
      People: scoreData.People?.percentage || 0,
      Technical: scoreData.Tectnick?.percentage || 0
    };
    
    const lowestScore = Object.entries(normalizedScores).reduce((lowest, [key, value]) => {
      return value < lowest.score ? { area: key, score: value } : lowest;
    }, { score: 100, area: 'Leader' });

    const recommendationsByArea = {
      People: {
        title: "Рекомендации по развитию навыков работы с людьми",
        items: [
          "Улучшите навыки активного слушания",
          "Изучите техники эффективной коммуникации",
          "Развивайте эмоциональный интеллект",
          "Практикуйте решение конфликтных ситуаций"
        ]
      },
      Leader: {
        title: "Рекомендации по развитию лидерских навыков",
        items: [
          "Пройдите курсы по управлению командой",
          "Развивайте навыки делегирования",
          "Практикуйте принятие стратегических решений",
          "Изучите методы мотивации сотрудников"
        ]
      },
     
      Technical: {
        title: "Рекомендации по развитию технических навыков",
        items: [
          "Изучите новые технологии в вашей области",
          "Пройдите технические сертификации",
          "Участвуйте в профессиональных сообществах",
          "Практикуйте решение сложных технических задач"
        ]
      }
    };

    if (lowestScore.area && recommendationsByArea[lowestScore.area]) {
      return recommendationsByArea[lowestScore.area];
    }
    
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/results", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { currentResults } = response.data;

        if (currentResults && currentResults.length > 0) {
          const processedData = currentResults.map(result => {
            const scoreData = result.score ? JSON.parse(typeof result.score === 'string' ? result.score : JSON.stringify(result.score)) : {};
            return {
              date: new Date(result.completedAt).toLocaleDateString(),
              Leader: scoreData.Leader?.percentage || 0,
              People: scoreData.People?.percentage || 0,
              Technical: scoreData.Tectnick?.percentage || 0,
            };
          });
          
          setCurrentData(processedData);

          const latestScores = currentResults[0].score;
          const recs = getRecommendations(latestScores);
          if (recs) {
            setRecommendations(recs);
            setShowRecommendations(true);
          }

          const avgProgress = currentResults.map(result => {
            const scoreData = result.score ? JSON.parse(typeof result.score === 'string' ? result.score : JSON.stringify(result.score)) : {};
            const scores = [
              scoreData.Leader?.percentage || 0,
              scoreData.People?.percentage || 0,
              scoreData.Tectnick?.percentage || 0
            ];
            return {
              date: new Date(result.completedAt).toLocaleDateString(),
              average: scores.reduce((a, b) => a + b, 0) / scores.length
            };
          });
          setProgressData(avgProgress);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const downloadReport = () => {
    const doc = new jsPDF();
    doc.text("Evaluation Results", 10, 10);
    
    doc.autoTable({
      head: [["Date", "Leader", "People", "Technical"]],
      body: currentData.map(data => [
        data.date,
        `${data.Leader}%`,
        `${data.People}%`,
        `${data.Technical}%`
      ]),
      startY: 20,
    });

    doc.save("competency-report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Результаты оценки</h1>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Показатели компетентности</h2>
          <div className="h-96">
            <ResponsiveContainer>
              <BarChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="Leader" fill="#1E40AF" name="Лидерство" />
                <Bar dataKey="People" fill="#3B82F6" name="Работа с людьми" />
                <Bar dataKey="Technical" fill="#60A5FA" name="Технические навыки" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Средний прогресс</h2>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="average" stroke="#1E40AF" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="flex justify-center space-x-4">
          <Button onClick={downloadReport}>
            <Download className="mr-2 h-4 w-4" />
            Скачать отчёт
          </Button>
          <Link to="/test">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Пройти ещё раз
            </Button>
          </Link>
          <Link to="/feedback">
            <Button variant="outline">
              <MessageSquare className="mr-2 h-4 w-4" />
              Обратная связь
            </Button>
          </Link>
        </div>

        <AlertDialog open={showRecommendations} onOpenChange={setShowRecommendations}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{recommendations.title}</AlertDialogTitle>
              <AlertDialogDescription>
                <ul className="list-disc pl-6 space-y-2 mt-4">
                  {recommendations.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Понятно</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Results;