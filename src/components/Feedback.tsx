import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";

const Feedback = () => {
  const [feedback, setFeedback] = useState("");
  const [satisfaction, setSatisfaction] = useState<number | null>(null);
  const { toast } = useToast();
  const [feedbackList, setFeedbackList] = useState([]);
  const { userId } = useAuth(); // Получаем userId из контекста

  useEffect(() => {
    // Получение последних отзывов
    const fetchFeedback = async () => {
      try {
        const response = await fetch("https://girl-backend.onrender.com/api/feedback", {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Добавьте токен здесь
          },
        });
        const data = await response.json();
        console.log('Data fetched from feedback API:', data); // Лог, чтобы проверить, что получили
        setFeedbackList(data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!satisfaction || !feedback.trim()) {
      return;
    } // Сначала проверяем на входные данные// Сначала проверяем на входные данные

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast({ title: "Ошибка", description: "Не удалось получить информацию о пользователе", variant: "destructive" });
      return;
    }

    const newFeedback = { text: feedback, rating: satisfaction, userId };

    try {
      const response = await fetch("https://girl-backend.onrender.com/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}` // Добавляем заголовок с токеном
        },
        body: JSON.stringify(newFeedback),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении отзыва");
      }

      setFeedback("");
      setSatisfaction(null);
      toast({ title: "Отзыв успешно добавлен", description: "Спасибо за ваш отзыв!" });

    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast({ title: "Ошибка", description: "Не удалось отправить отзыв", variant: "destructive" });
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Отзывы и опросы</h1>

        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Насколько вы удовлетворены процессом оценки?
          </h2>
          <div className="flex justify-center space-x-4 mb-8">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => setSatisfaction(rating)}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium transition-colors ${satisfaction === rating
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                {rating}
              </button>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Поделитесь своими мыслями об оценке и процессе обучения
              </label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Ваши отзывы помогают нам совершенствоваться..."
                className="min-h-[150px]"
              />
            </div>
            <Button type="submit" className="w-full">
              Отправить отзыв
            </Button>
          </form>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Последние отзывы</h2>
          <div className="space-y-4">
            {feedbackList.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${index < item.rating ? "text-yellow-400" : "text-gray-300"
                          }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;
