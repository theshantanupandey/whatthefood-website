
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Image with Blur In Effect */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="pt-8 pb-16">
            <div className="animate-fade-in">
              <div className="badge badge-primary mb-5">Meal Delivery Service</div>
              <h1 className="mb-6">
                Healthy Meals,{' '}
                <span className="relative">
                  <span className="relative z-10">Delivered Daily!</span>
                  <span className="absolute bottom-3 left-0 w-full h-3 bg-primary/30 -z-10 transform skew-x-12" />
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
                Fresh, nutritious, and hassle-free meal plans for everyone. Experience the convenience of healthy eating without the prep work.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button 
                  size="lg" 
                  className="button-hover-effect"
                  onClick={() => navigate('/meal-plans')}
                >
                  Explore Meal Plans
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="button-hover-effect"
                >
                  Download App
                </Button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((idx) => (
                    <div 
                      key={idx}
                      className="w-10 h-10 rounded-full border-2 border-background overflow-hidden"
                    >
                      <img 
                        src={`https://randomuser.me/api/portraits/men/${idx + 30}.jpg`}
                        alt="Customer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">4.9</span> from 2,500+ reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side floating cards */}
          <div className="hidden lg:flex relative h-[500px]">
            <div className="absolute top-10 right-0 w-64 glass-card rounded-2xl p-4 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Healthy food" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h4 className="font-medium mb-1">Balanced Nutrition</h4>
              <p className="text-sm text-muted-foreground">Perfectly portioned meals with all nutrients you need</p>
            </div>
            
            <div className="absolute bottom-10 left-0 w-64 glass-card rounded-2xl p-4 animate-fade-in" style={{ animationDelay: '700ms' }}>
              <img 
                src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Fresh ingredients"
                className="w-full h-40 object-cover rounded-lg mb-4" 
              />
              <h4 className="font-medium mb-1">Fresh Ingredients</h4>
              <p className="text-sm text-muted-foreground">Locally sourced and delivered fresh to your door</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
