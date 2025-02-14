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

  const handleAddTest = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/admin/tests",
        {
          ...newTest,
          options: newTest.options.filter((opt) => opt.trim() !== ""),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTests();
      setNewTest({
        category: "",
        question: "",
        options: ["", "", "", ""],
      });
    } catch (error) {
      console.error("Error adding test:", error);
    }
  };

  const handleUpdateTest = async (id: number) => {
    if (!editingTest) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/tests/${id}`,
        {
          ...editingTest,
          options: editingTest.options.filter((opt) => opt.trim() !== ""),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTests();
      setEditingTest(null);
    } catch (error) {
      console.error("Error updating test:", error);
    }
  };

  const handleDeleteTest = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить этот вопрос?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/tests/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchTests();
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Card className="bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-600">Ошибка</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
            <Button 
              onClick={fetchTests}
              className="mt-4"
              variant="outline"
            >
              Попробовать снова
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Управление тестами</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select
                  value={newTest.category}
                  onValueChange={(value) =>
                    setNewTest({ ...newTest, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tectnick">Технические навыки</SelectItem>
                    <SelectItem value="People">Работа с людьми</SelectItem>
                    <SelectItem value="Leader">Лидерские качества</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Textarea
                  placeholder="Введите вопрос"
                  value={newTest.question}
                  onChange={(e) =>
                    setNewTest({ ...newTest, question: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
            <Button onClick={handleAddTest} className="w-full">
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
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Категория</TableHead>
                <TableHead>Вопрос</TableHead>
                <TableHead>Варианты ответов</TableHead>
                <TableHead className="w-[100px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell>
                    {editingTest?.id === test.id ? (
                      <Select
                        value={editingTest.category}
                        onValueChange={(value) =>
                          setEditingTest({ ...editingTest, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Tectnick">Технические навыки</SelectItem>
                          <SelectItem value="People">Работа с людьми</SelectItem>
                          <SelectItem value="Leader">Лидерские качества</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      test.category
                    )}
                  </TableCell>
                  <TableCell>
                    {editingTest?.id === test.id ? (
                      <Textarea
                        value={editingTest.question}
                        onChange={(e) =>
                          setEditingTest({
                            ...editingTest,
                            question: e.target.value,
                          })
                        }
                      />
                    ) : (
                      test.question
                    )}
                  </TableCell>
                  <TableCell>
                    {editingTest?.id === test.id ? (
                      <div className="space-y-2">
                        {editingTest.options.map((option, index) => (
                          <Input
                            key={index}
                            value={option}
                            onChange={(e) => {
                              const newOptions = [...editingTest.options];
                              newOptions[index] = e.target.value;
                              setEditingTest({
                                ...editingTest,
                                options: newOptions,
                              });
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <ul className="list-disc list-inside">
                        {test.options.map((option, index) => (
                          <li key={index}>{option}</li>
                        ))}
                      </ul>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      {editingTest?.id === test.id ? (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleUpdateTest(test.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditingTest(null)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditingTest(test)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleDeleteTest(test.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </>
                      )}
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