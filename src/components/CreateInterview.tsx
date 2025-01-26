import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const CreateInterview = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_user: "",
    position: "",
    date: "",
    notes: ""
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/admin/users");
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/admin", formData);
      navigate("/admin");
    } catch (error) {
      console.error("Error creating interview:", error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-6 mt-8">
      <h1 className="text-2xl font-bold mb-6">Создать интервью</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Select
          onValueChange={(value) => setFormData({ ...formData, id_user: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Выберите кандидата" />
          </SelectTrigger>
          <SelectContent>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id.toString()}>
                {user.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Должность"
          onChange={(e) => setFormData({ ...formData, position: e.target.value })}
        />

        <Input
          type="date" // Было datetime-local
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        <Textarea
          placeholder="Заметки"
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
        />

        <Button type="submit" className="w-full">
          Создать интервью
        </Button>
      </form>
    </Card>
  );
};

export default CreateInterview;