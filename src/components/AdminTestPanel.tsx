import { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Edit, Trash, X, Check } from "lucide-react";

interface Test {
  id: number;
  category: string;
  question: string;
  options: string[];
}

const AdminTestPanel = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const [newTest, setNewTest] = useState({
    category: "",
    question: "",
    options: ["", "", "", ""],
  });

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchTests = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.get("http://localhost:5000/api/admin/tests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTests(response.data);
    } catch (error: any) {
      console.error("Error fetching tests:", error);
      setError(error.response?.data?.error || 'Failed to fetch tests');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Управление тестами</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                value={newTest.category}
                onValueChange={(value) => setNewTest({ ...newTest, category: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tectnick">Технические навыки</SelectItem>
                  <SelectItem value="People">Работа с людьми</SelectItem>
                  <SelectItem value="Leader">Лидерские качества</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Введите вопрос"
                value={newTest.question}
                onChange={(e) => setNewTest({ ...newTest, question: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newTest.options.map((option, index) => (
                <Input
                  key={index}
                  placeholder={`Вариант ответа ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...newTest.options];
                    newOptions[index] = e.target.value;
                    setNewTest({ ...newTest, options: newOptions });
                  }}
                />
              ))}
            </div>
            <Button onClick={() => {}} className="w-full md:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Добавить вопрос
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Список вопросов</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Категория</TableHead>
                <TableHead className="whitespace-nowrap">Вопрос</TableHead>
                <TableHead className="whitespace-nowrap">Варианты ответов</TableHead>
                <TableHead className="w-[100px] whitespace-nowrap">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="whitespace-nowrap">{test.category}</TableCell>
                  <TableCell>{test.question}</TableCell>
                  <TableCell>
                    <ul className="list-disc list-inside">
                      {test.options.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestPanel;
