import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import MealPlans from "./pages/MealPlans";
import Customize from "./pages/Customize";
import Vendors from "./pages/Vendors";
import VendorApplication from "./pages/VendorApplication";
import AIDietPlanner from "./pages/AIDietPlanner";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Partners from "./pages/Partners";
import NotFound from "./pages/NotFound";
import SupabaseSetup from "@/pages/SupabaseSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/meal-plans" element={<MealPlans />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendor-application" element={<VendorApplication />} />
          <Route path="/ai-diet-planner" element={<AIDietPlanner />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/supabase-setup" element={<SupabaseSetup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
