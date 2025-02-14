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

  // Кастомный тултип для мобильных устройств
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 shadow-lg rounded-lg border border-gray-200">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">Результаты оценки</h1>
        </div>

        {/* График компетентности */}
        <Card className="p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Показатели компетентности</h2>
          <div className="h-64 sm:h-96">
            <ResponsiveContainer>
              <BarChart 
                data={currentData}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="Leader" 
                  fill="#1E40AF" 
                  name="Лидерство"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="People" 
                  fill="#3B82F6" 
                  name="Работа с людьми"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="Technical" 
                  fill="#60A5FA" 
                  name="Технические навыки"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* График прогресса */}
        <Card className="p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Средний прогресс</h2>
          <div className="h-48 sm:h-72">
            <ResponsiveContainer>
              <LineChart 
                data={progressData}
                margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="average" 
                  stroke="#1E40AF"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Кнопки действий */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 px-4 sm:px-6 mt-6 sm:mt-8 max-w-3xl mx-auto">
          <Button 
            onClick={downloadReport}
            className="w-full h-12 sm:h-14 flex items-center justify-center text-sm sm:text-base font-medium transition-all duration-200 hover:scale-105"
            variant="default"
          >
            <div className="flex flex-col sm:flex-row items-center sm:space-x-2">
              <Download className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0" />
              <span>Скачать отчёт</span>
            </div>
          </Button>
          
          <Link to="/test" className="w-full">
            <Button 
              variant="outline"
              className="w-full h-12 sm:h-14 flex items-center justify-center text-sm sm:text-base font-medium border-2 transition-all duration-200 hover:scale-105 hover:bg-gray-50"
            >
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2">
                <RefreshCw className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0" />
                <span>Пройти ещё раз</span>
              </div>
            </Button>
          </Link>
          
          <Link to="/feedback" className="w-full">
            <Button 
              variant="outline"
              className="w-full h-12 sm:h-14 flex items-center justify-center text-sm sm:text-base font-medium border-2 transition-all duration-200 hover:scale-105 hover:bg-gray-50"
            >
              <div className="flex flex-col sm:flex-row items-center sm:space-x-2">
                <MessageSquare className="h-5 w-5 sm:h-4 sm:w-4 mb-1 sm:mb-0" />
                <span>Обратная связь</span>
              </div>
            </Button>
          </Link>
        </div>

        {/* Диалог с рекомендациями */}
        <AlertDialog open={showRecommendations} onOpenChange={setShowRecommendations}>
          <AlertDialogContent className="sm:max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-lg sm:text-xl">
                {recommendations.title}
              </AlertDialogTitle>
              <AlertDialogDescription>
                <ul className="list-disc pl-4 sm:pl-6 space-y-2 mt-4">
                  {recommendations.items.map((item, index) => (
                    <li key={index} className="text-sm sm:text-base">{item}</li>
                  ))}
                </ul>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="w-full sm:w-auto">
                Понятно
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Results;