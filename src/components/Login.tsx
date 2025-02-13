import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogIn } from "lucide-react";
import axios from "axios";
import { useAuth } from "./AuthContext";

// Компонент поля ввода с плавающей подписью
const FloatingLabelInput = ({ 
  id, 
  type, 
  value, 
  onChange, 
  label, 
  required = false 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="block w-full px-4 py-2 text-gray-900 bg-white border rounded-md appearance-none focus:outline-none focus:ring-primary focus:border-primary peer"
        placeholder=" "
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(value.length > 0)}
      />
      <label
        htmlFor={id}
        className={`absolute text-sm duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1 ${
          isFocused ? "text-primary" : "text-gray-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const { token, userId, role, name } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", name);

      login(role, name);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Неверные данные для входа");
      console.error("Ошибка входа в систему:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Вход в систему
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <FloatingLabelInput
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              required
            />
            
            <FloatingLabelInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Пароль"
              required
            />
          </div>
          
          {error && (
            <div className="text-center text-red-500">{error}</div>
          )}
          
          <Button type="submit" className="w-full flex justify-center">
            <LogIn className="mr-2" />
            Войти
          </Button>
        </form>
        
        <p className="text-sm text-center text-gray-600">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-primary hover:text-primary/80">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;