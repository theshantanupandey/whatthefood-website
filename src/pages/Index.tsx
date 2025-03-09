
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import MealPlans from '@/components/home/MealPlans';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import VendorCTA from '@/components/home/VendorCTA';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="py-16">
          <MealPlans />
        </div>
        <div className="py-16 bg-secondary/30">
          <HowItWorks />
        </div>
        <div className="py-16">
          <Testimonials />
        </div>
        <div className="py-16 bg-secondary/30">
          <div className="container max-w-6xl mx-auto px-4">
            <NewsletterSignup className="glass border-none shadow-none bg-transparent" />
          </div>
        </div>
        <div className="py-16">
          <VendorCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
