import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Download, RefreshCw, MessageSquare } from "lucide-react";

const currentData = [
  { skill: "Управление временем", score: 85 },
  { skill: "Командное сотрудничество", score: 92 },
  { skill: "Управление стрессом", score: 78 },
  { skill: "Коммуникация", score: 88 },
  { skill: "Решение проблем", score: 90 },
];

const progressData = [
  { month: "Январь", score: 75 },
  { month: "Февраль", score: 78 },
  { month: "Март", score: 82 },
  { month: "Апрель", score: 85 },
  { month: "Май", score: 88 },
  { month: "Июнь", score: 92 },
];

const Results = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Результаты оценки
          </h1>
          <p className="text-xl text-gray-600">
            Вот как вы проявили себя в различных областях деятельности
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Ключевые сильные стороны
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-green-600">
                <span className="w-4 h-4 bg-green-600 rounded-full mr-3"></span>
                Командное сотрудничество (92%)
              </li>
              <li className="flex items-center text-green-600">
                <span className="w-4 h-4 bg-green-600 rounded-full mr-3"></span>
                Решение проблем (90%)
              </li>
              <li className="flex items-center text-green-600">
                <span className="w-4 h-4 bg-green-600 rounded-full mr-3"></span>
                Коммуникация (88%)
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Области, требующие улучшения
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center text-orange-600">
                <span className="w-4 h-4 bg-orange-600 rounded-full mr-3"></span>
                Управление стрессом (78%)
              </li>
              <li className="flex items-center text-orange-600">
                <span className="w-4 h-4 bg-orange-600 rounded-full mr-3"></span>
                Тайм-менеджмент (85%)
              </li>
            </ul>
          </Card>
        </div>

        <div className="flex justify-center space-x-4">
          <Button className="bg-primary hover:bg-primary-hover text-white">
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