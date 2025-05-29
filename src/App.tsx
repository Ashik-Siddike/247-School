
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MathLessons from "./pages/MathLessons";
import EnglishLessons from "./pages/EnglishLessons";
import BanglaLessons from "./pages/BanglaLessons";
import ScienceLessons from "./pages/ScienceLessons";
import LessonDetail from "./pages/LessonDetail";
import QuizPage from "./pages/QuizPage";
import StudentDashboard from "./pages/StudentDashboard";
import ParentPanel from "./pages/ParentPanel";
import AdminPanel from "./pages/AdminPanel";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lessons/math" element={<MathLessons />} />
            <Route path="/lessons/english" element={<EnglishLessons />} />
            <Route path="/lessons/bangla" element={<BanglaLessons />} />
            <Route path="/lessons/science" element={<ScienceLessons />} />
            <Route path="/lesson/:subject/:id" element={<LessonDetail />} />
            <Route path="/quiz/:subject/:id" element={<QuizPage />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/parent" element={<ParentPanel />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
