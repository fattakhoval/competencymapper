import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronRight, CheckCircle } from "lucide-react";
import questionsData from './questions.json';
import axios from 'axios';

const TestInterface = () => {
 const [currentQuestion, setCurrentQuestion] = useState(0);
 const [answers, setAnswers] = useState<Record<number, string>>({});
 const [randomQuestions, setRandomQuestions] = useState<any[]>([]);
 const navigate = useNavigate();

 useEffect(() => {
   const allQuestions = questionsData.questions;
   const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
   setRandomQuestions(shuffled.slice(0, 4));
 }, []);

 const calculateScore = () => {
   return Object.entries(answers).reduce((score, [_, answer]) => {
     const points = answer.includes("Очень") || answer.includes("Отлично") ? 4 :
                   answer.includes("Хорошо") || answer.includes("Довольно") ? 3 :
                   answer.includes("Умеренно") || answer.includes("Требуется") ? 2 : 1;
     return score + points;
   }, 0);
 };

 const saveResults = async () => {
  try {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
 
    if (!userId) {
      console.error('User ID is missing.');
      return;
    }
 
    const result = {
      userId,
      score: calculateScore()
    };
 
    const response = await axios.post('http://localhost:5000/api/tests', result, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
 
    console.log('Server response:', response.data);
    navigate("/results");
    
  } catch (error) {
    console.error('Error saving test results:', {
      message: error.message, 
      response: error.response?.data,
      status: error.response?.status,
    });
  }
 };

 const handleAnswer = (value: string) => {
   setAnswers({ ...answers, [randomQuestions[currentQuestion].id]: value });
 };

 const handleNext = () => {
   if (currentQuestion < randomQuestions.length - 1) {
     setCurrentQuestion(currentQuestion + 1);
   } else {
     saveResults();
   }
 };

 if (randomQuestions.length === 0) {
   return <div>Loading...</div>;
 }

 const question = randomQuestions[currentQuestion];

 return (
   <div className="min-h-screen bg-gray-50 py-12">
     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="mb-8">
         <div className="flex justify-between items-center mb-4">
           <h2 className="text-2xl font-bold text-gray-900">
             Оценка компетентности
           </h2>
           <span className="text-sm text-gray-500">
             Вопрос {currentQuestion + 1} из {randomQuestions.length}
           </span>
         </div>
         <div className="w-full bg-gray-200 rounded-full h-2">
           <div
             className="bg-primary rounded-full h-2 transition-all duration-300"
             style={{
               width: `${((currentQuestion + 1) / randomQuestions.length) * 100}%`,
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
           {question.options.map((option: string, index: number) => (
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
             {currentQuestion < randomQuestions.length - 1 ? (
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