import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import axios from 'axios';
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
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Отладка токена

        const response = await axios.get("http://localhost:5000/api/processedResults", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Response:', response.data); // Отладка ответа

        if (!response.data || response.data.length === 0) {
          setError('Нет данных');
          return;
        }

        const transformedData = response.data.map(result => {
          console.log('Processing result:', result); // Отладка каждого результата
          return {
            date: new Date(result.completedAt).toLocaleDateString('ru-RU'),
            Leader: result.score?.Leader?.percentage || 0,
            People: result.score?.People?.percentage || 0,
            Tectnick: result.score?.Tectnick?.percentage || 0
          };
        });

        console.log('Transformed data:', transformedData); // Отладка преобразованных данных
        setProgressData(transformedData.reverse());

        if (response.data.length >= 2) {
          const latest = response.data[0].score;
          const first = response.data[response.data.length - 1].score;

          const competenciesData = [
            {
              name: "Технические навыки",
              current: latest?.Tectnick?.percentage || 0,
              previous: first?.Tectnick?.percentage || 0,
              Изменения: `${(latest?.Tectnick?.percentage || 0) - (first?.Tectnick?.percentage || 0)}`
            },
            {
              name: "Руководство",
              current: latest?.Leader?.percentage || 0,
              previous: first?.Leader?.percentage || 0,
              Изменения: `${(latest?.Leader?.percentage || 0) - (first?.Leader?.percentage || 0)}`
            },
            {
              name: "Коммуникация",
              current: latest?.People?.percentage || 0,
              previous: first?.People?.percentage || 0,
              Изменения: `${(latest?.People?.percentage || 0) - (first?.People?.percentage || 0)}`
            }
          ];
          setCompetencies(competenciesData);
        }
      } catch (error) {
        console.error('Error details:', error.response || error); // Расширенная отладка ошибок
        setError(error.response?.data?.message || 'Ошибка загрузки данных');
        console.log('Token:', localStorage.getItem('token'));
      }
    };

    fetchResults();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <Card className="p-6">
            <p className="text-red-600">{error}</p>
          </Card>
        </div>
      </div>
    );
  }

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
            {progressData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Tectnick"
                    stroke="#1E40AF"
                    name="Технические навыки"
                  />
                  <Line
                    type="monotone"
                    dataKey="Leader"
                    stroke="#047857"
                    name="Руководство"
                  />
                  <Line
                    type="monotone"
                    dataKey="People"
                    stroke="#B91C1C"
                    name="Коммуникация"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>Загрузка данных...</p>
              </div>
            )}
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
                  <span className={`font-medium ${Number(comp.Изменения) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Number(comp.Изменения) >= 0 ? '+' : ''}{comp.Изменения}%
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