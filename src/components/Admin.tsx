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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Search, FileText, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Interviews = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [interviews, setInterviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalInterviews, setTotalInterviews] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all"); // Добавляем фильтр по статусу
    const navigate = useNavigate();

    const fetchInterviews = async (page) => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:5000/api/admin?page=${page}&limit=5`);
            setInterviews(data.interviews);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            setTotalInterviews(data.totalInterviews);
        } catch (error) {
            console.error("Error fetching interviews:", error);
            toast.error("Ошибка при загрузке собеседований");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchInterviews(currentPage);
    }, [currentPage]);

    const handleStatusChange = async (interviewId, newStatus) => {
        try {
            const { data } = await axios.patch(
                `http://localhost:5000/api/admin/${interviewId}/status`,
                { status: newStatus }
            );
            
            setInterviews(interviews.map(interview => 
                interview.id === interviewId ? data : interview
            ));
            
            toast.success("Статус успешно обновлен");
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Ошибка при обновлении статуса");
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    // Обновленная логика фильтрации
    const filteredInterviews = interviews.filter((interview) => {
        const matchesSearch = 
            (interview.user_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
            interview.position.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesStatus = 
            statusFilter === "all" || 
            interview.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Получаем статистику по статусам
    const completedCount = interviews.filter(i => i.status === "Completed").length;
    const scheduledCount = interviews.filter(i => i.status === "Scheduled").length;

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
                                    <p>Всего интервью: {totalInterviews}</p>
                                    <p>Завершено: {completedCount}</p>
                                    <p>Запланировано: {scheduledCount}</p>
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

                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <Input
                            type="text"
                            placeholder="Поиск интервью..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    </div>
                    
                    <div className="w-[200px]">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger>
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="Фильтр статуса" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все статусы</SelectItem>
                                <SelectItem value="Scheduled">Запланированные</SelectItem>
                                <SelectItem value="Completed">Завершенные</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="text-center py-4">Загрузка...</div>
                ) : (
                    <>
                        <div className="space-y-4">
                            {filteredInterviews.map((interview) => (
                                <Card key={interview.id} className="p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">
                                                {interview.user_name}
                                            </h3>
                                            <p className="text-gray-600">{interview.position}</p>
                                            <p className="text-sm text-gray-500">
                                                Дата: {new Date(interview.date).toLocaleDateString()}
                                            </p>
                                            <div className="mt-2">
                                                <Select
                                                    value={interview.status}
                                                    onValueChange={(value) => handleStatusChange(interview.id, value)}
                                                >
                                                    <SelectTrigger className={`w-[200px] ${
                                                        interview.status === "Completed" 
                                                            ? "bg-green-100 text-green-800" 
                                                            : "bg-blue-100 text-blue-800"
                                                    }`}>
                                                        <SelectValue placeholder="Выберите статус" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Scheduled">Запланировано</SelectItem>
                                                        <SelectItem value="Completed">Завершено</SelectItem>
                                                    </SelectContent>
                                                </Select>
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

                        {/* Пагинация */}
                        <div className="mt-6 flex justify-center items-center gap-4">
                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </Button>
                            
                            <span className="text-sm text-gray-600">
                                Страница {currentPage} из {totalPages}
                            </span>

                            <Button
                                variant="outline"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="w-4 h-4" />
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Interviews;