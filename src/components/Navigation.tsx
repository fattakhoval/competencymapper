import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BarChart2, ClipboardList, Home, User, LogOut } from "lucide-react";
import { useAuth } from "./AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userRole, logout } = useAuth();

  // Определяем элементы навигации в зависимости от роли пользователя
  const navItems = [

    ...(userRole !== 'admin' ? [
      {
        path: isAuthenticated ? "/" : "",
        label: isAuthenticated ? "Главная" : "",
        icon: Home
      },
      {
        path: isAuthenticated ? "/test" : "",
        label: isAuthenticated ? "Тест" : "",
        icon: ClipboardList
      },
      {
        path: isAuthenticated ? "/results" : "",
        label: isAuthenticated ? "Результаты" : "",
        icon: BarChart2
      }
    ] : []),
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
      <div className="flex justify-between h-16 w-full">
  <div className="flex">
    <div className="flex-shrink-0 flex items-center">
      <span className="text-primary text-xl font-bold">ПрофРост</span>
    </div>
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {navItems.map((item) => {
        if (item.label === "Выйти") return null; // Исключаем кнопку выхода из основного списка
        const Icon = item.icon;
        return (
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

  {/* Блок с ником и кнопкой выхода */}
  {isAuthenticated && (
    <div className="flex items-center space-x-4">
      <span className="text-gray-700 font-medium">{userRole}</span>
      <button
        onClick={() => {
          logout();
          navigate("/login");
        }}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Выйти
      </button>
    </div>
  )}
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
                  <div className="flex items-right">
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
