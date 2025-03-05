
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Check, Smartphone, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  {
    title: 'Choose a Plan',
    description: 'Select from our diverse meal plans tailored to your preferences and dietary needs.',
    icon: Check,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Subscribe via App',
    description: 'Download our app and subscribe to your selected meal plan in just a few taps.',
    icon: Smartphone,
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    title: 'Enjoy Healthy Meals',
    description: 'Your freshly prepared meals will be delivered to your doorstep daily or weekly.',
    icon: Utensils,
    color: 'bg-primary/10 text-primary',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection animation="fade-in-left">
            <div>
              <div className="badge badge-primary mb-4">Simple Process</div>
              <h2 className="mb-6">
                How <span className="text-primary">What The Food</span> Works
              </h2>
              <p className="text-muted-foreground mb-12 max-w-md">
                Getting healthy meals delivered to your door has never been easier. Follow these simple steps to start your journey to better eating.
              </p>

              <div className="space-y-8">
                {steps.map((step, index) => (
                  <div key={index} className="flex">
                    <div className={`flex-shrink-0 mt-1 rounded-full p-3 ${step.color}`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="ml-5">
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Button size="lg" className="button-hover-effect">
                  Download Our App
                </Button>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="fade-in-right" className="relative">
            <div className="relative lg:-mr-12">
              <div className="absolute -left-6 -top-6 w-48 h-48 bg-primary/10 rounded-full" />
              <div className="absolute -right-6 -bottom-6 w-64 h-64 bg-blue-500/10 rounded-full" />
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Healthy meal preparation"
                  className="w-full h-auto"
                />
              </div>
              
              <div className="absolute top-1/2 -right-12 transform -translate-y-1/2 bg-white rounded-2xl p-6 shadow-lg w-64">
                <div className="flex items-center">
                  <div className="bg-primary/10 rounded-full p-2">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-xs text-muted-foreground">Delivery time</p>
                    <p className="font-semibold">7:00 AM - 9:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
