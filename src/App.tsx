import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import TestInterface from "./components/TestInterface";
import Results from "./components/Results";
import Interviews from "./components/Interviews";
import CreateInterview from "./components/CreateInterview";
import Progress from "./components/Progress";
import Feedback from "./components/Feedback";
import Login from "./components/Login";
import Register from "./components/Register";
import Admin from "./components/Admin";
import AdminTestPanel from "./components/AdminTestPanel";

const queryClient = new QueryClient();

const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const userRole = localStorage.getItem('userRole');

  return (
    <div className="min-h-screen">
      {isAuthenticated && <Navigation />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {isAuthenticated ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/test" element={<TestInterface />} />
            <Route path="/results" element={<Results />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/create-interview" element={<CreateInterview />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/feedback" element={<Feedback />} />
            
            {/* Административные маршруты */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <Admin />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/tests"
              element={
                <ProtectedAdminRoute>
                  <AdminTestPanel />
                </ProtectedAdminRoute>
              }
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/register" />} />
        )}
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;