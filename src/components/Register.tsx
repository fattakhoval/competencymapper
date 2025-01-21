import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { UserPlus } from "lucide-react";
import axios from 'axios';
const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password, name }); // Проверьте, что данные правильные
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        email,
        password,
        name,
        role: 'user',
      });
      console.log('Registered:', response.data);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Регистрация
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleRegister}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Email
              </label>
              <Input
                id="name"
                type="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                minLength={6}
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full flex justify-center">
              <UserPlus className="mr-2" />
              Зарегистрироваться
            </Button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-primary hover:text-primary/80">
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;