import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null; // Добавьте роль пользователя
  login: (role: string) => void; // Измените сигнатуру метода login
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuthStatus = localStorage.getItem("isAuthenticated");
    return savedAuthStatus === "true";
  });

  const [userId, setUserId] = useState<string | null>(() => {
    return localStorage.getItem("userId");
  });

  const [userRole, setUserRole] = useState<string | null>(() => {
    return localStorage.getItem("userRole");
  });

  const login = (role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    // Установите userId, полученный при логине
    setUserId("userId"); // Замените на реальный userId
    localStorage.setItem("userId", "userId");
  };


  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserRole(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, userRole, login, logout }}>
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
