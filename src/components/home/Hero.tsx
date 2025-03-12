import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowDown, Sparkles } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

const Hero = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Blur In Effect */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
        }}
      />
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40 animate-pulse-subtle" />
      
      {/* Floating decorative elements with improved animations */}
      <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-primary/10 mix-blend-multiply animate-float blur-3xl" />
      <div className="absolute bottom-[10%] right-[15%] w-48 h-48 rounded-full bg-blue-500/10 mix-blend-multiply animate-float blur-3xl" style={{ animationDelay: '2s' }} />
      <div className="absolute top-[40%] right-[25%] w-24 h-24 rounded-full bg-yellow-500/10 mix-blend-multiply animate-float blur-2xl" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-[30%] left-[20%] w-36 h-36 rounded-full bg-purple-500/10 mix-blend-multiply animate-float blur-2xl" style={{ animationDelay: '4s' }} />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <AnimatedSection animation="fade-in-left" duration="slow" className="lg:col-span-5">
            <div>
              <div className="inline-block bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium mb-5 animate-pulse-glow">Meal Delivery Service</div>
              <h1 className="mb-6">
                <span className="block mb-2">Healthy Meals,</span>{' '}
                <span className="relative">
                  <span className="relative z-10 gradient-text font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">Delivered Daily!</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/30 -z-10 transform skew-x-12 animate-pulse-subtle" />
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
                Fresh, nutritious, and hassle-free meal plans for everyone. Experience the convenience of healthy eating without the prep work.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button 
                  size="lg" 
                  className="button-hover-effect group relative overflow-hidden"
                  onClick={() => navigate('/meal-plans')}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-primary/90 transition-all duration-300"></span>
                  <span className="relative flex items-center z-10 text-white">
                    Explore Meal Plans
                    <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/90 to-primary shadow-glow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-20 w-20 text-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="button-hover-effect hover:bg-white/30 relative overflow-hidden transition-all duration-300 border border-white/20 backdrop-blur-sm"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/5 rounded-md"></span>
                  <span className="relative z-10">Download App</span>
                </Button>
              </div>
              
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((idx) => (
                    <div 
                      key={idx}
                      className="w-10 h-10 rounded-full border-2 border-background overflow-hidden animate-fade-in hover-scale"
                      style={{ animationDelay: `${idx * 200}ms` }}
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
                    {[1, 2, 3, 4, 5].map((star, idx) => (
                      <svg 
                        key={star} 
                        className="w-4 h-4 text-yellow-500 animate-scale-in animate-pulse-glow" 
                        style={{ animationDelay: `${idx * 100}ms` }}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
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
          </AnimatedSection>
          
          {/* Right side floating cards - fixed positioning to prevent overlap */}
          <div className="hidden lg:flex lg:col-span-7 relative h-[500px]">
            <div className="absolute inset-0 overflow-visible">
              {/* First card - top position */}
              <AnimatedSection animation="fade-in" delay={400}>
                <div className="absolute top-5 -right-5 w-52 glass-card rounded-2xl p-3 hover-lift transition-all backdrop-blur-md bg-white/60 border border-white/30 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                  <div className="overflow-hidden rounded-lg mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Healthy food" 
                      className="w-full h-32 object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <h4 className="font-medium mb-1 text-sm">Balanced Nutrition</h4>
                  <p className="text-xs text-muted-foreground">Perfectly portioned meals with all nutrients you need</p>
                </div>
              </AnimatedSection>
              
              {/* Second card - bottom position */}
              <AnimatedSection animation="fade-in" delay={700}>
                <div className="absolute bottom-5 -right-24 w-52 glass-card rounded-2xl p-3 hover-lift transition-all backdrop-blur-md bg-white/70 border border-white/30 shadow-lg animate-float" style={{ animationDelay: '2s' }}>
                  <div className="overflow-hidden rounded-lg mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Fresh ingredients"
                      className="w-full h-32 object-cover transition-transform duration-700 hover:scale-110" 
                    />
                  </div>
                  <h4 className="font-medium mb-1 text-sm">Fresh Ingredients</h4>
                  <p className="text-xs text-muted-foreground">Locally sourced and delivered fresh to your door</p>
                </div>
              </AnimatedSection>
              
              {/* Third card - middle position */}
              <AnimatedSection animation="fade-in" delay={1000}>
                <div className="absolute top-[40%] -translate-y-1/2 right-2 w-52 glass-intense rounded-2xl p-3 hover-lift transition-all backdrop-blur-xl border border-white/50 shadow-xl animate-float" style={{ animationDelay: '3s' }}>
                  <div className="overflow-hidden rounded-lg mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Meal variety"
                      className="w-full h-32 object-cover transition-transform duration-700 hover:scale-110" 
                    />
                  </div>
                  <h4 className="font-medium mb-1 text-sm">Endless Variety</h4>
                  <p className="text-xs text-muted-foreground">New menus weekly so you never get bored</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
        <p className="text-sm text-muted-foreground mb-2">Scroll Down</p>
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
