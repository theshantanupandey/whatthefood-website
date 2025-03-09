
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Heart, Dumbbell, Salad, Leaf, ArrowRight } from 'lucide-react';

const mealPlans = [
  {
    id: 'regular',
    title: 'Regular Plan',
    description: 'Balanced nutrition with a variety of delicious meals.',
    icon: Heart,
    color: 'bg-blue-500/10 text-blue-500',
    gradient: 'from-blue-500/20 to-blue-400/10',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'high-protein',
    title: 'High Protein',
    description: 'Extra protein for muscle building and recovery.',
    icon: Dumbbell,
    color: 'bg-purple-500/10 text-purple-500',
    gradient: 'from-purple-500/20 to-purple-400/10',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'keto',
    title: 'Keto',
    description: 'Low-carb, high-fat meals for ketogenic lifestyles.',
    icon: Salad,
    color: 'bg-orange-500/10 text-orange-500',
    gradient: 'from-orange-500/20 to-orange-400/10',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vegan',
    title: 'Vegan',
    description: '100% plant-based meals rich in nutrients and flavor.',
    icon: Leaf,
    color: 'bg-green-500/10 text-green-500',
    gradient: 'from-green-500/20 to-green-400/10',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const MealPlans = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-secondary/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-primary/5 rounded-full opacity-70 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-blue-500/5 rounded-full opacity-70 blur-3xl" />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <AnimatedSection animation="fade-in">
          <div className="text-center mb-16">
            <div className="badge badge-primary mb-4">Tailored For You</div>
            <h2 className="mb-6">Choose Your Perfect <span className="gradient-text">Meal Plan</span></h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              Our chef-designed meal plans cater to different dietary needs and preferences.
              All made with fresh ingredients and delivered straight to your door.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mealPlans.map((plan, index) => (
            <AnimatedSection key={plan.id} delay={index * 150} animation="scale-in">
              <div className="glass-deep rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:translate-y-[-8px] group">
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <img 
                    src={plan.image} 
                    alt={plan.title}
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 left-4">
                    <div className={`rounded-full p-2 ${plan.color} backdrop-blur-sm transition-all duration-300 group-hover:scale-110`}>
                      <plan.icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <div className={`p-6 bg-gradient-to-br ${plan.gradient} bg-opacity-30 backdrop-blur-sm`}>
                  <h3 className="text-xl font-semibold mb-2">{plan.title}</h3>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <Button 
                    variant="outline" 
                    className="w-full glass-effect hover:bg-white/30 group"
                    onClick={() => navigate('/meal-plans')}
                  >
                    Learn More
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400} animation="fade-in">
          <div className="mt-16 text-center">
            <Button 
              size="lg"
              className="button-hover-effect bg-gradient-to-r from-primary to-primary/80 shadow-glow"
              onClick={() => navigate('/meal-plans')}
            >
              View All Meal Plans
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default MealPlans;
