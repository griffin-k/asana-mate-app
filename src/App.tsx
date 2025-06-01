
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import StepsPage from "./pages/StepsPage";
import HydrationPage from "./pages/HydrationPage";
import YogaPage from "./pages/YogaPage";
import HistoryPage from "./pages/HistoryPage";
import BMIPage from "./pages/BMIPage";
import GeminiChatPage from "./pages/GeminiChatPage";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/steps" element={<StepsPage />} />
          <Route path="/hydration" element={<HydrationPage />} />
          <Route path="/yoga" element={<YogaPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/bmi" element={<BMIPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/gemini-chat" element={<GeminiChatPage />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
