import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const [competencies, setCompetencies] = useState([]);

  useEffect(() => {
    // Генерируем случайные данные для каждого месяца
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май"];
    const generateRandomProgress = (baseValue) => {
      return Math.floor(baseValue + Math.random() * 15);
    };

    const generatedData = months.map((month, index) => {
      const technical = generateRandomProgress(65 + index * 3);
      const leadership = generateRandomProgress(60 + index * 3);
      const communication = generateRandomProgress(70 + index * 3);

      return {
        month,
        technical,
        leadership,
        communication,
      };
    });

    setProgressData(generatedData);

    // Вычисляем текущие и предыдущие значения для компетенций
    const latest = generatedData[generatedData.length - 1];
    const first = generatedData[0];

    const competenciesData = [
      {
        name: "Технические навыки",
        current: latest.technical,
        previous: first.technical,
        Изменения: `+${latest.technical - first.technical}`,
      },
      {
        name: "Руководство",
        current: latest.leadership,
        previous: first.leadership,
        Изменения: `+${latest.leadership - first.leadership}`,
      },
      {
        name: "Коммуникация",
        current: latest.communication,
        previous: first.communication,
        Изменения: `+${latest.communication - first.communication}`,
      },
    ];

    setCompetencies(competenciesData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Отслеживание прогресса
        </h1>

        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Развитие компетенций за всё время
          </h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="technical"
                  stroke="#1E40AF"
                  name="Технические навыки"
                />
                <Line
                  type="monotone"
                  dataKey="leadership"
                  stroke="#047857"
                  name="Руководство"
                />
                <Line
                  type="monotone"
                  dataKey="communication"
                  stroke="#B91C1C"
                  name="Коммуникация"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competencies.map((comp) => (
            <Card key={comp.name} className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {comp.name}
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Текущий уровень</span>
                  <span className="font-medium">{comp.current}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Предыдущий уровень</span>
                  <span className="font-medium">{comp.previous}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Изменения</span>
                  <span className="font-medium text-green-600">
                    {comp.Изменения}%
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;