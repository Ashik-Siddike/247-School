import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import DevelopmentOverlay from "./components/DevelopmentOverlay";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Teams from "./pages/Teams";
import ClassSelection from "./pages/ClassSelection";
import MathLessons from "./pages/MathLessons";
import EnglishLessons from "./pages/EnglishLessons";
import BanglaLessons from "./pages/BanglaLessons";
import ScienceLessons from "./pages/ScienceLessons";
import LessonDetail from "./pages/LessonDetail";
import QuizPage from "./pages/QuizPage";
import StudentDashboard from "./pages/StudentDashboard";
import ParentPanel from "./pages/ParentPanel";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import ContentPage from "./pages/ContentPage";
import ContentList from "./pages/ContentList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DevelopmentOverlay />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/class/:standard" element={<ClassSelection />} />
            <Route path="/lessons/math" element={<MathLessons />} />
            <Route path="/lessons/english" element={<EnglishLessons />} />
            <Route path="/lessons/bangla" element={<BanglaLessons />} />
            <Route path="/lessons/science" element={<ScienceLessons />} />
            <Route path="/lesson/:subject/:id" element={<LessonDetail />} />
            <Route path="/quiz/:subject/:id" element={<QuizPage />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/parent" element={<ParentPanel />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/login" element={<Login />} />
            <Route path="/content/:id" element={<ContentPageWrapper />} />
            <Route path="/lessons/:subject" element={<SubjectContentListWrapper />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// ContentPage কে রাউট প্যারাম থেকে id নিয়ে রেন্ডার করার জন্য Wrapper
function ContentPageWrapper() {
  const { id } = useParams();
  if (!id) return <div className="text-center mt-8">Content ID পাওয়া যায়নি</div>;
  return <ContentPage contentId={id} />;
}

// Wrapper: ডায়নামিক সাবজেক্ট ও ক্লাস অনুযায়ী ContentList দেখাবে
function SubjectContentListWrapper() {
  const { subject } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const className = params.get("class") || undefined;
  return <ContentList subject={subject} className={className} />;
}

export default App;
