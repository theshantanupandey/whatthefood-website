
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import MealPlans from '@/pages/MealPlans';
import Partners from '@/pages/Partners';
import Vendors from '@/pages/Vendors';
import VendorApplication from '@/pages/VendorApplication';
import FAQ from '@/pages/FAQ';
import Blog from '@/pages/Blog';
import NotFound from '@/pages/NotFound';
import SupabaseSetup from '@/pages/SupabaseSetup';
import AIDietPlanner from '@/pages/AIDietPlanner';
import Customize from '@/pages/Customize';
import JoinUs from '@/pages/JoinUs';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/meal-plans" element={<MealPlans />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/vendor-application" element={<VendorApplication />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/supabase-setup" element={<SupabaseSetup />} />
        <Route path="/ai-diet-planner" element={<AIDietPlanner />} />
        <Route path="/customize" element={<Customize />} />
        <Route path="/join-us" element={<JoinUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
