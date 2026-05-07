import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import CapsulePage from "./pages/CapsulePage";
import CategoryPage from "./pages/CategoryPage";
import CategoriesPage from "./pages/CategoriesPage";
import RandomPage from "./pages/RandomPage";
import ProgressPage from "./pages/ProgressPage";
import FinalTestPage from "./pages/FinalTestPage";
import AchievementsPage from "./pages/AchievementsPage";
import NotFound from "./pages/NotFound";
import AchievementToast from "./components/AchievementToast";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AchievementToast />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/capsule/:id" element={<CapsulePage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/category/:id/final-test" element={<FinalTestPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/random" element={<RandomPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
