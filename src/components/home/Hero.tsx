
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero = ({ className }: HeroProps) => {
  return (
    <section className={cn('relative py-20 md:py-28 lg:py-36', className)}>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Fresh, Nutritious Meals Delivered 
            <span className="text-primary"> To Your Door</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Skip the shopping, prepping, and planning. Get delicious, chef-prepared meals tailored to your preferences and dietary needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="text-base">
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              View Meal Plans
            </Button>
            <Button size="lg" variant="secondary" className="text-base" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
        
        <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[16/9] max-w-5xl mx-auto">
          <img 
            src="/placeholder.svg" 
            alt="Fresh meals delivered to your doorstep" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 inline-block">
              <p className="font-medium">Try our new seasonal menu</p>
              <p className="text-sm opacity-80">Available now through October</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
