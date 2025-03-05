
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import MealPlans from '@/components/home/MealPlans';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import VendorCTA from '@/components/home/VendorCTA';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Initialize scroll reveal animation
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    const elementInView = (el: Element, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <=
        (window.innerHeight || document.documentElement.clientHeight) / dividend
      );
    };

    const displayScrollElement = (element: Element) => {
      element.classList.add('revealed');
    };

    const hideScrollElement = (element: Element) => {
      element.classList.remove('revealed');
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
          displayScrollElement(el);
        } else {
          hideScrollElement(el);
        }
      });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();

    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <Hero />
        <MealPlans />
        <HowItWorks />
        <Testimonials />
        <VendorCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
