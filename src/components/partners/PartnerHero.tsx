
import React from 'react';
import { Button } from '@/components/ui/button';

const PartnerHero = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 pt-24 pb-16">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Partner with What The Food: Elevate Your Brand with Healthy Living!
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Join forces with us to bring quality nutrition, sustainability, and convenience to our customers.
            </p>
            <Button size="lg" asChild>
              <a href="#partner-form">Become a Partner</a>
            </Button>
          </div>
          <div className="flex justify-center">
            <img 
              src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1170&auto=format&fit=crop" 
              alt="Brand Collaboration" 
              className="rounded-lg shadow-lg max-w-full h-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerHero;
