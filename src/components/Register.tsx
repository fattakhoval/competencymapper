import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { UserPlus } from "lucide-react";
import axios from "axios";

// Floating Label Input Component
const FloatingLabelInput = ({ 
  id, 
  type, 
  value, 
  onChange, 
  label, 
  required = false, 
  minLength 
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
        minLength={minLength}
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

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        email,
        password,
        name,
        role: "user",
      });

      console.log("Registered:", response.data);
      setMessage("Регистрация прошла успешно!");
    } catch (error) {
      console.error("Registration error:", error);
      if (error.response?.status === 400) {
        setMessage("Пользователь с таким email уже существует.");
      } else {
        setMessage("Ошибка при регистрации. Попробуйте снова.");
      }
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
            <FloatingLabelInput
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Имя"
              required
            />

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
              minLength={6}
            />
          </div>

          <div>
            <Button type="submit" className="w-full flex justify-center">
              <UserPlus className="mr-2" />
              Зарегистрироваться
            </Button>
          </div>
        </form>

        {message && (
          <div className={`mt-4 text-center text-lg ${
            message.includes("успешно") ? "text-green-600" : "text-red-600"
          }`}>
            {message}
          </div>
        )}

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