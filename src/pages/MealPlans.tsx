import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, Dumbbell, Salad, Leaf, ChevronDown, Filter, Sliders } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

const mealPlans = [
  {
    id: 'regular',
    title: 'Regular Plan',
    description: 'Balanced nutrition with a variety of delicious meals.',
    longDescription: 'Our Regular Plan provides perfectly balanced meals with optimal proportions of proteins, carbohydrates, and healthy fats. Ideal for those looking to maintain a healthy diet without specific dietary restrictions.',
    calories: 1800,
    price: 149,
    dietType: 'both',
    cuisine: 'mixed',
    icon: Heart,
    color: 'bg-blue-500/10 text-blue-500',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tag: 'Most Popular'
  },
  {
    id: 'high-protein',
    title: 'High Protein',
    description: 'Extra protein for muscle building and recovery.',
    longDescription: 'Designed for those who need extra protein in their diet, our High Protein plan focuses on lean protein sources while maintaining a balanced nutritional profile. Perfect for athletes and active individuals.',
    calories: 2200,
    price: 179,
    dietType: 'non-veg',
    cuisine: 'mixed',
    icon: Dumbbell,
    color: 'bg-purple-500/10 text-purple-500',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'keto',
    title: 'Keto',
    description: 'Low-carb, high-fat meals for ketogenic lifestyles.',
    longDescription: 'Our Keto Plan features low-carbohydrate, high-fat meals designed to help your body maintain ketosis. Each meal contains less than 10g of net carbs while providing healthy fats and moderate protein.',
    calories: 1600,
    price: 189,
    dietType: 'both',
    cuisine: 'continental',
    icon: Salad,
    color: 'bg-orange-500/10 text-orange-500',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'vegan',
    title: 'Vegan',
    description: '100% plant-based meals rich in nutrients and flavor.',
    longDescription: 'Our Vegan Plan features delicious, nutrient-dense meals made entirely from plant sources. We ensure balanced nutrition with adequate protein from varied plant sources, healthy fats, and complex carbohydrates.',
    calories: 1500,
    price: 159,
    dietType: 'veg',
    cuisine: 'mixed',
    icon: Leaf,
    color: 'bg-green-500/10 text-green-500',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'asian-fusion',
    title: 'Asian Fusion',
    description: 'Diverse flavors from across Asia with a healthy twist.',
    longDescription: 'Explore the vibrant tastes of Asia with our carefully crafted meals that balance traditional flavors with modern nutritional science. Each meal delivers authentic taste with healthier ingredients.',
    calories: 1700,
    price: 169,
    dietType: 'both',
    cuisine: 'asian',
    icon: Heart,
    color: 'bg-red-500/10 text-red-500',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mediterranean',
    title: 'Mediterranean',
    description: 'Heart-healthy meals inspired by Mediterranean cuisine.',
    longDescription: 'Inspired by one of the world\'s healthiest diets, our Mediterranean plan features olive oil, whole grains, lean proteins and plenty of fresh vegetables. Perfect for heart health and longevity.',
    calories: 1600,
    price: 179,
    dietType: 'both',
    cuisine: 'mediterranean',
    icon: Heart,
    color: 'bg-blue-500/10 text-blue-500',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

type DietType = 'all' | 'veg' | 'non-veg' | 'both';
type CuisineType = 'all' | 'mixed' | 'asian' | 'continental' | 'mediterranean';
type SortType = 'popular' | 'price-low' | 'price-high' | 'calories-low' | 'calories-high';

const MealPlans = () => {
  const navigate = useNavigate();
  const [dietFilter, setDietFilter] = useState<DietType>('all');
  const [cuisineFilter, setCuisineFilter] = useState<CuisineType>('all');
  const [sortBy, setSortBy] = useState<SortType>('popular');
  const [filteredPlans, setFilteredPlans] = useState(mealPlans);

  useEffect(() => {
    let filtered = mealPlans;

    if (dietFilter !== 'all') {
      filtered = filtered.filter(plan => 
        dietFilter === 'both' ? plan.dietType === 'both' : plan.dietType === dietFilter || plan.dietType === 'both'
      );
    }

    if (cuisineFilter !== 'all') {
      filtered = filtered.filter(plan => plan.cuisine === cuisineFilter);
    }

    switch (sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'calories-low':
        filtered = [...filtered].sort((a, b) => a.calories - b.calories);
        break;
      case 'calories-high':
        filtered = [...filtered].sort((a, b) => b.calories - a.calories);
        break;
      default:
        break;
    }

    setFilteredPlans(filtered);
  }, [dietFilter, cuisineFilter, sortBy]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clearFilters = () => {
    setDietFilter('all');
    setCuisineFilter('all');
    setSortBy('popular');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        <section className="pt-24 pb-12 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <div className="badge badge-primary mb-4">Personalized Nutrition</div>
                <h1 className="mb-6">
                  Our <span className="text-primary">Meal Plans</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Choose from our chef-designed meal plans tailored to different dietary needs and preferences.
                  All made with fresh ingredients and delivered straight to your door.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <section className="py-8 bg-white border-b">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-lg font-semibold">Filters</h3>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-9">
                      <span>Diet Type: {dietFilter === 'all' ? 'All' : dietFilter === 'veg' ? 'Vegetarian' : dietFilter === 'non-veg' ? 'Non-Vegetarian' : 'Both'}</span>
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuRadioGroup value={dietFilter} onValueChange={(value) => setDietFilter(value as DietType)}>
                      <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="veg">Vegetarian</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="non-veg">Non-Vegetarian</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="both">Both</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-9">
                      <span>Cuisine: {cuisineFilter === 'all' ? 'All' : cuisineFilter.charAt(0).toUpperCase() + cuisineFilter.slice(1)}</span>
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuRadioGroup value={cuisineFilter} onValueChange={(value) => setCuisineFilter(value as CuisineType)}>
                      <DropdownMenuRadioItem value="all">All</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="mixed">Mixed</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="asian">Asian</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="continental">Continental</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="mediterranean">Mediterranean</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-9">
                      <Sliders className="mr-2 h-4 w-4" />
                      <span>Sort By</span>
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuRadioGroup value={sortBy} onValueChange={(value) => setSortBy(value as SortType)}>
                      <DropdownMenuRadioItem value="popular">Most Popular</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="calories-low">Calories: Low to High</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="calories-high">Calories: High to Low</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-9"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            {filteredPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlans.map((plan, index) => (
                  <AnimatedSection key={plan.id} delay={index * 100}>
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
                      <div className="aspect-w-16 aspect-h-9 relative">
                        <img 
                          src={plan.image} 
                          alt={plan.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        <div className="absolute top-4 left-4">
                          <div className={`rounded-full p-2 ${plan.color}`}>
                            <plan.icon className="w-5 h-5" />
                          </div>
                        </div>
                        {plan.tag && (
                          <div className="absolute top-4 right-4">
                            <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                              {plan.tag}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold">{plan.title}</h3>
                          <div className="text-lg font-bold text-primary">
                            ₹{plan.price}<span className="text-sm font-normal text-muted-foreground">/week</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground mb-3 line-clamp-2">{plan.description}</p>
                        <div className="flex items-center gap-3 mb-4 text-sm">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs",
                            plan.dietType === 'veg' ? "bg-green-100 text-green-800" : 
                            plan.dietType === 'non-veg' ? "bg-red-100 text-red-800" : 
                            "bg-blue-100 text-blue-800"
                          )}>
                            {plan.dietType === 'veg' ? 'Vegetarian' : 
                             plan.dietType === 'non-veg' ? 'Non-Vegetarian' : 
                             'Veg & Non-Veg'}
                          </span>
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                            {plan.calories} cal
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <Button 
                            className="flex-1 button-hover-effect"
                            onClick={() => navigate(`/meal-plans/${plan.id}`)}
                          >
                            View Plan
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 button-hover-effect"
                            onClick={() => navigate('/customize')}
                          >
                            Customize
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <AnimatedSection>
                  <h3 className="text-2xl font-semibold mb-4">No meal plans match your filters</h3>
                  <p className="text-muted-foreground mb-6">Try adjusting your filters or browse all our plans.</p>
                  <Button onClick={clearFilters}>Show All Plans</Button>
                </AnimatedSection>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-accent">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="mb-6">Can't Find What You're Looking For?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Create a fully personalized meal plan with our AI-powered customization tool.
                  Tailor it to your dietary preferences, health goals, and taste preferences.
                </p>
                <Button 
                  size="lg" 
                  className="button-hover-effect"
                  onClick={() => navigate('/customize')}
                >
                  Create Custom Meal Plan
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MealPlans;
