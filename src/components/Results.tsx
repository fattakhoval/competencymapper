import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, RefreshCw, MessageSquare } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";


const Results = () => {
  const [currentData, setCurrentData] = useState([]);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/tests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const results = response.data;

        const currentSkills = results.slice(0, 5).map(result => ({
          skill: `Skills for ${new Date(result.completedAt).toLocaleDateString("en-US")}`,
          score: result.score,
        }));
        setCurrentData(currentSkills);

        const months = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const progress = months.map((month, index) => {
          const resultForMonth = results.find(result => {
            const resultMonth = new Date(result.completedAt).getMonth();
            return resultMonth === index;
          });
          return {
            month: month,
            score: resultForMonth ? resultForMonth.score : 0,
          };
        });
        setProgressData(progress);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  const downloadReport = () => {
    const doc = new jsPDF();
  
    // Заголовок отчёта
    doc.setFontSize(16);
    doc.text("Evaluation Results", 10, 10);
  
    // Текущие показатели
    doc.setFontSize(14);
    doc.text("Current Competence Indicators", 10, 20);
    const currentTable = currentData.map(data => [data.skill, data.score]);
    doc.autoTable({
      head: [["Skill", "Evaluation"]],
      body: currentTable,
      startY: 25,
    });
  
    // Прогресс
    doc.text("All-Time Progress", 10, doc.previousAutoTable.finalY + 10);
    const progressTable = progressData.map(data => [data.month, data.score]);
    doc.autoTable({
      head: [["Month", "Evaluation"]],
      body: progressTable,
      startY: doc.previousAutoTable.finalY + 15,
    });
  
    // Сохранение PDF
    doc.save("Report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Результаты оценки
          </h1>
          <p className="text-xl text-gray-600">
            Ознакомьтесь с результатами вашей деятельности
          </p>
        </div>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Текущие показатели компетентности
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#1E40AF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Прогресс за всё время
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#1E40AF" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="flex justify-center space-x-4">
          <Button className="bg-primary hover:bg-primary-hover text-white" onClick={downloadReport}>
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
      </div>
    </div>
  );
};

export default Results;
