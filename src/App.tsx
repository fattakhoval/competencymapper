import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import TestInterface from "./components/TestInterface";
import Results from "./components/Results";
import Interviews from "./components/Interviews";
import Progress from "./components/Progress";
import Feedback from "./components/Feedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;