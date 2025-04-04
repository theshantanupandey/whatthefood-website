
import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { Card } from "@/components/ui/card";

const SuccessStory = () => {
  const successStory = {
    company: 'Green Kitchen',
    title: 'How Green Kitchen Increased Sales by 35%',
    description: 'Green Kitchen partnered with What The Food to feature their sustainable kitchen products in meal plan packages. Through strategic product placement and co-branded content, they reached over 10,000 new customers in just three months.',
    results: ['35% increase in quarterly sales', '10,000+ new customer reach', '67% higher engagement on social media'],
  };

  return (
    <section className="py-16 bg-primary/5">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">Success Story</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our partners have achieved remarkable results through collaboration.
          </p>
        </div>
        
        <Card className="border-primary/20 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">{successStory.title}</h3>
              <p className="mb-6">{successStory.description}</p>
              <h4 className="font-semibold mb-2">Key Results:</h4>
              <ul className="space-y-2">
                {successStory.results.map((result, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-100 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1170&auto=format&fit=crop" 
                alt="Success Story" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SuccessStory;
