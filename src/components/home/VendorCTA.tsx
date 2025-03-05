
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Store, TrendingUp, Users, Clock } from 'lucide-react';

const benefits = [
  {
    title: 'Expand Your Reach',
    description: 'Connect with new customers and grow your business through our platform.',
    icon: TrendingUp,
  },
  {
    title: 'Steady Revenue',
    description: 'Benefit from predictable subscription-based orders.',
    icon: Store,
  },
  {
    title: 'Flexible Options',
    description: 'Choose the meal plans you want to contribute to.',
    icon: Users,
  },
  {
    title: 'Easy Integration',
    description: 'Our system integrates seamlessly with your kitchen operations.',
    icon: Clock,
  },
];

const VendorCTA = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -right-20 top-20 w-64 h-64 bg-primary/5 rounded-full opacity-70" />
      <div className="absolute left-10 bottom-10 w-40 h-40 bg-blue-500/5 rounded-full opacity-70" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedSection animation="fade-in-left">
            <div className="relative rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Restaurant kitchen"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-2xl font-semibold mb-2">Vendor Partnership</h3>
                <p className="text-white/80">Join our network of cloud kitchens and restaurants</p>
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection animation="fade-in-right">
            <div>
              <div className="badge badge-primary mb-4">For Restaurants & Cloud Kitchens</div>
              <h2 className="mb-6">Partner With <span className="text-primary">What The Food</span></h2>
              <p className="text-muted-foreground mb-10 max-w-lg">
                Reach more customers and grow your business by joining our network of meal providers.
                We connect your kitchen with health-conscious subscribers in your area.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex">
                    <div className="bg-primary/10 rounded-full p-3 flex-shrink-0 mt-1">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium mb-1">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                size="lg" 
                className="button-hover-effect"
                onClick={() => navigate('/vendors')}
              >
                Partner With Us
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default VendorCTA;
