import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CheckCircle } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Насколько эффективно вы распоряжаетесь своим рабочим временем?",
    options: [
      "Очень эффективно - я всегда выполняю задачи вовремя",
      "Довольно эффективно - я обычно укладываюсь в сроки",
      "Требуется улучшение - я часто не справляюсь со сроками",
      "Плохо - я часто пропускаю сроки",
    ],
  },
  {
    id: 2,
    question: "Насколько хорошо вы работаете в команде?",
    options: [
      "Отлично - я преуспеваю в коллективе",
      "Хорошо - я хорошо работаю с другими",
      "Честно - я могу работать в команде, когда это необходимо",
      "Плохо - я предпочитаю работать в одиночку",
    ],
  },
  {
    id: 3,
    question: "Как вы справляетесь со стрессом на рабочем месте?",
    options: [
      "Очень хорошо - у меня есть эффективные стратегии преодоления",
      "Хорошо - обычно я справляюсь со стрессом надлежащим образом",
      "Умеренно - иногда я борюсь со стрессом",
      "Плохо - я часто чувствую себя подавленным",
    ],
  },
];

const TestInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results");
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Оценка компетентности            </h2>
            <span className="text-sm text-gray-500">
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

        <Card className="p-6">
          <h3 className="text-xl font-medium text-gray-900 mb-6">
            {question.question}
          </h3>

          <RadioGroup
            onValueChange={handleAnswer}
            value={answers[question.id] || ""}
            className="space-y-4"
          >
            {question.options.map((option, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
              >
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label
                  htmlFor={`option-${index}`}
                  className="flex-grow cursor-pointer"
                >
                  {option}
                </Label>
                {answers[question.id] === option && (
                  <CheckCircle className="h-5 w-5 text-primary" />
                )}
              </div>
            ))}
          </RadioGroup>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleNext}
              disabled={!answers[question.id]}
              className="bg-primary hover:bg-primary-hover text-white"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Следующий вопрос
                  <ChevronRight className="ml-2 h-4 w-4" />
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