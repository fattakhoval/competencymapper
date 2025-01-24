import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  userId: string | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Проверяем состояние авторизации при первом рендере
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Считываем из localStorage, если есть
    const savedAuthStatus = localStorage.getItem("isAuthenticated");
    return savedAuthStatus === "true";
  });

  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem("userId");
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    // Здесь можно установить userId, если он приходит с сервером после логина
    setUserId("someUserId"); // Замените на реальный userId, полученный при логине
    localStorage.setItem("userId", "someUserId"); // Сохраняем userId в localStorage
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
