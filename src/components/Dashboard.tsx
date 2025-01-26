import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Brain, Target, History, TrendingUp, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({
    completedTests: 0,
    averageScore: 0,
    skillsToImprove: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/dashboard/stats", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    {
      title: "Завершенные тесты",
      value: stats.completedTests,
      icon: Brain,
      color: "text-blue-600",
    },
    {
      title: "Средний балл",
      value: `${stats.averageScore}%`,
      icon: Award,
      color: "text-green-600",
    },
    {
      title: "Навыки, которые необходимо совершенствовать",
      value: stats.skillsToImprove,
      icon: Target,
      color: "text-orange-600",
    },
  ];

  const hrMetrics = [
    {
      title: "История интервью",
      description: "Просмотр записей интервью и управление ими",
      icon: History,
      link: "/interviews",
    },
    {
      title: "Отслеживание прогресса",
      description: "Контроль развития компетенций",
      icon: TrendingUp,
      link: "/progress",
    },
    {
      title: "Отзывы и опросы",
      description: "Удовлетворенность сотрудников и обратная связь",
      icon: MessageSquare,
      link: "/feedback",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Оценка профессиональной компетентности
          </h1>
          <p className="text-xl text-gray-600">
            Следите за своим прогрессом и совершенствуйте свои профессиональные навыки
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {stat.title}
                </h3>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {hrMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Link to={metric.link} key={metric.title}>
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <Icon className="w-8 h-8 text-primary" />
                    <h3 className="text-lg font-medium text-gray-900">
                      {metric.title}
                    </h3>
                  </div>
                  <p className="text-gray-600">{metric.description}</p>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/test">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary-hover text-white"
            >
              Начать новую оценку
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;