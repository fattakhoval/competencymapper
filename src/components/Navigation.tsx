import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, BarChart2, ClipboardList, Home, User, LogOut, Shield, Users, Settings } from "lucide-react";
import { useAuth } from "./AuthContext";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, userRole, userName, logout } = useAuth();

  const adminNavItems = [
    {
      path: "/admin",
      label: "Главная",
      icon: Home
    },
    {
      path: "/admin/tests",
      label: "Управление тестами",
      icon: ClipboardList
    },
  ];

  const userNavItems = [
    {
      path: "/",
      label: "Главная",
      icon: Home
    },
    {
      path: "/test",
      label: "Тест",
      icon: ClipboardList
    },
    {
      path: "/results",
      label: "Результаты",
      icon: BarChart2
    }
  ];

  const navItems = [
    ...(userRole === 'admin' ? adminNavItems : userNavItems),
    {
      path: "#",
      label: "Выйти",
      icon: LogOut,
      onClick: () => {
        logout();
        navigate("/login");
      },
    },
  ];

  return (
    <nav className="bg-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Логотип */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-primary text-xl font-bold">ПрофРост</span>
            </div>
          </div>

          {/* Навигация для десктопа */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => {
              if (item.label === "Выйти") return null;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`${
                    location.pathname === item.path
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

          {/* Профиль и кнопка выхода для десктопа */}
          {isAuthenticated && (
            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="flex items-center space-x-2">
                {userRole === 'admin' ? (
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-primary mr-2" />
                    <span className="px-2 py-1 text-sm font-medium text-white bg-primary rounded-full">
                      Админ
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <User className="w-4 h-4 text-gray-500 mr-2" />
                    <span className="text-gray-700 font-medium">{userName || 'Пользователь'}</span>
                  </div>
                )}
              </div>
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

          {/* Кнопка мобильного меню */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">{isOpen ? 'Закрыть меню' : 'Открыть меню'}</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-white shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Информация о пользователе в мобильном меню */}
            {isAuthenticated && (
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  {userRole === 'admin' ? (
                    <>
                      <Shield className="w-5 h-5 text-primary" />
                      <span className="px-2 py-1 text-sm font-medium text-white bg-primary rounded-full">
                        Админ
                      </span>
                    </>
                  ) : (
                    <>
                      <User className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700 font-medium">{userName || 'Пользователь'}</span>
                    </>
                  )}
                </div>
              </div>
            )}
            
            {/* Навигационные пункты в мобильном меню */}
            {navItems.map((item) => {
              const Icon = item.icon;
              return item.onClick ? (
                <button
                  key={item.label}
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md flex items-center"
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`${
                    location.pathname === item.path
                      ? "bg-primary bg-opacity-10 text-primary"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  } block px-3 py-2 rounded-md text-base font-medium flex items-center`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
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