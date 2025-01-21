import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import TestInterface from "./components/TestInterface";
import Results from "./components/Results";
import Interviews from "./components/Interviews";
import Progress from "./components/Progress";
import Feedback from "./components/Feedback";
import Login from "./components/Login";
import Register from "./components/Register";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen">
              <Navigation />
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/test" element={<TestInterface />} />
                <Route path="/results" element={<Results />} />
                <Route path="/interviews" element={<Interviews />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
