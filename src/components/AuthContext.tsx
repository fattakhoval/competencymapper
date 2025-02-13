import React, { createContext, useContext, useState } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  userId: string | null;
  userRole: string | null;
  userName: string | null;
  login: (role: string, name: string) => void;
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

  const [userName, setUserName] = useState<string | null>(() => {
    return localStorage.getItem("userName");
  });

  const login = (role: string, name: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setUserName(name);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    localStorage.setItem("userName", name);
    setUserId("userId");
    localStorage.setItem("userId", "userId");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    setUserRole(null);
    setUserName(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, userRole, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Экспортируем хук useAuth как именованный экспорт
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};