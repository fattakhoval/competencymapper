import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CheckCircle } from "lucide-react";
import axios from 'axios';

const TestInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/tests/questions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const calculateCategoryScore = (category: string): number => {
    const categoryQuestions = questions.filter(q => q.category === category);
    return categoryQuestions.reduce((score, question) => {
      const answer = answers[question.id];
      if (!answer) return score;

      const points = answer.includes("Очень") || answer.includes("Отлично") ? 4 :
                    answer.includes("Хорошо") || answer.includes("Довольно") ? 3 :
                    answer.includes("Умеренно") || answer.includes("Требуется") ? 2 : 1;
      return score + points;
    }, 0);
  };

  const calculateCategoryPercentage = (category: string): number => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const maxPossibleScore = categoryQuestions.length * 4;
    const actualScore = calculateCategoryScore(category);
    return (actualScore / maxPossibleScore) * 100;
  };

  const saveResults = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token); // Проверяем токен
      
      if (!token) {
        console.error("No token found");
        navigate("/login");
        return;
      }
  
      // Получаем уникальные категории
      const categories = [...new Set(questions.map(q => q.category))];
      console.log("Categories:", categories); // Проверяем категории
      
      // Рассчитываем результаты по категориям
      const resultsByCategory = categories.reduce((acc, category) => {
        const categoryQuestions = questions.filter(q => q.category === category);
        const score = calculateCategoryScore(category);
        const percentage = calculateCategoryPercentage(category);
  
        acc[category] = {
          score,
          percentage: Math.round(percentage * 100) / 100
        };
        return acc;
      }, {} as Record<string, { score: number; percentage: number }>);
  
      console.log("Results to send:", resultsByCategory); // Проверяем данные перед отправкой
  
      // Отправляем результаты
      console.log("Sending request to:", "https://girl-backend.onrender.com/api/tests");
      const response = await axios.post(
        "https://girl-backend.onrender.com/api/tests",
        { results: resultsByCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );
  
      console.log("Server response:", response); // Проверяем ответ сервера
  
      if (response.status === 201) {
        console.log("Results saved successfully");
        navigate("/results");
      } else {
        console.warn("Unexpected response status:", response.status);
      }
    } catch (error: any) {
      console.error("Error saving test results:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
    }
  };

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      saveResults();
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl">Загрузка вопросов...</div>
    </div>;
  }

  if (questions.length === 0) {
    return <div className="flex justify-center items-center min-h-screen">
      <div className="text-xl">Нет доступных вопросов</div>
    </div>;
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-12">
      <div className="max-w-3xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
              Оценка компетентности
            </h2>
            <span className="text-xs sm:text-sm text-gray-500">
              Вопрос {currentQuestion + 1} из {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        <Card className="p-3 sm:p-6">
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4 sm:mb-6">
            {question.question}
          </h3>

          <RadioGroup
            onValueChange={handleAnswer}
            value={answers[question.id] || ""}
            className="space-y-3 sm:space-y-4"
          >
            {question.options.map((option: string, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-2 border rounded-lg p-3 sm:p-4 hover:bg-gray-50 cursor-pointer"
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer text-sm sm:text-base"
                >
                  {option}
                </Label>
                {answers[question.id] === option && (
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                )}
              </div>
            ))}
          </RadioGroup>

          <div className="mt-6 sm:mt-8">
            <Button
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white text-sm sm:text-base py-2 px-4"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Следующий вопрос
                  <ChevronRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </>
              ) : (
                "Посмотреть результаты"
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TestInterface;