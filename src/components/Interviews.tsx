import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Interviews = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [interviews, setInterviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/interviews");
        setInterviews(data);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchInterviews();
  }, []);

  const filteredInterviews = interviews.filter(
    (interview) =>
      interview.candidate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      interview.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">История интервью</h1>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Отчеты
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle>Отчеты по интервью</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                  <p>Всего интервью: {interviews.length}</p>
                  <p>
                    Завершено:{" "}
                    {interviews.filter((interview) => interview.status === "Completed").length}
                  </p>
                  <p>
                    Запланировано:{" "}
                    {interviews.filter((interview) => interview.status === "Scheduled").length}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              className="bg-primary"
              onClick={() => navigate("/create-interview")}
            >
              <Plus className="w-4 h-4 mr-2" />
              Новое интервью
            </Button>
          </div>
        </div>

        <div className="mb-6 relative">
          <Input
            type="text"
            placeholder="Поиск интервью..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>

        <div className="space-y-4">
          {filteredInterviews.map((interview) => (
            <Card key={interview.id} className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {interview.candidate}
                  </h3>
                  <p className="text-gray-600">{interview.position}</p>
                  <p className="text-sm text-gray-500">
                    Дата: {new Date(interview.date).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        interview.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {interview.status === "Completed"
                        ? "Завершено"
                        : "Запланировано"}
                    </span>
                  </div>
                </div>
                <Textarea
                  className="mt-2 w-1/2"
                  placeholder="Добавить заметки..."
                  defaultValue={interview.notes}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interviews;
