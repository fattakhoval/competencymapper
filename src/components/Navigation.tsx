import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BarChart2, ClipboardList, Home, User, LogOut } from "lucide-react";
import { useAuth } from "./AuthContext"; // Импортируем контекст

interface NavigationProps {
  isAuthenticated: boolean;
  logout: () => void;
}

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth(); // Используем контекст авторизации // Используем контекст авторизации

  const navItems = [
    { 
      path: isAuthenticated ? "/" : "", 
      label: isAuthenticated ? "Главная" : "", 
      icon: Home },
    { 
      path: isAuthenticated ? "/test" : "", 
      label: isAuthenticated ? "Тест" : "", 
      icon: ClipboardList },
    { 
      path: isAuthenticated ? "/results" : "", 
      label: isAuthenticated ? "Результаты" : "", 
      icon:  BarChart2 },
    {
      path: isAuthenticated ? "#" : "/register",
      label: isAuthenticated ? "Выйти" : "Регистрация",
      icon: isAuthenticated ? LogOut : User,
      onClick: isAuthenticated
        ? () => {
          logout();
          navigate("/login");
        }
        : undefined,
    },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-primary text-xl font-bold">ПрофРост</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                return item.onClick ? (
                  // Если есть onClick, используем кнопку
                  <button
                    key={item.label}
                    onClick={item.onClick}
                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                ) : (
                  // Для остальных ссылок используем Link
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`${location.pathname === item.path
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return item.onClick ? (
                <button
                  key={item.label}
                  onClick={item.onClick}
                  className={`${location.pathname === item.path
                      ? "bg-primary bg-opacity-10 border-primary text-primary"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium w-full text-left`}
                >
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </div>
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${location.pathname === item.path
                      ? "bg-primary bg-opacity-10 border-primary text-primary"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
                    } block pl-3 pr-4 py-2 border-l-4 text-base font-medium`}
                >
                  <div className="flex items-center">
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

