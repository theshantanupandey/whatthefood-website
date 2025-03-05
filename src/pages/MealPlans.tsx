
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Heart, Dumbbell, Salad, Leaf, ChevronDown, Filter, Sliders, Check, Download, ArrowRight, Star } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    tag: 'Most Popular',
    nutrition: {
      protein: '25%',
      carbs: '50%',
      fats: '25%'
    },
    suitableFor: ['Weight maintenance', 'Overall wellness', 'Busy professionals'],
    sampleMeals: [
      {
        day: 'Monday',
        breakfast: 'Greek yogurt with berries and granola',
        lunch: 'Grilled chicken salad with mixed greens',
        dinner: 'Baked salmon with roasted vegetables'
      },
      {
        day: 'Tuesday',
        breakfast: 'Avocado toast with poached eggs',
        lunch: 'Quinoa bowl with roasted vegetables',
        dinner: 'Lean beef stir-fry with brown rice'
      },
      {
        day: 'Wednesday',
        breakfast: 'Vegetable omelette with whole grain toast',
        lunch: 'Turkey wrap with fresh vegetables',
        dinner: 'Grilled fish with sweet potato'
      }
    ]
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
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    nutrition: {
      protein: '40%',
      carbs: '40%',
      fats: '20%'
    },
    suitableFor: ['Athletes', 'Bodybuilders', 'Post-workout recovery'],
    sampleMeals: [
      {
        day: 'Monday',
        breakfast: 'Protein pancakes with Greek yogurt',
        lunch: 'Grilled chicken breast with quinoa',
        dinner: 'Lean beef steak with steamed vegetables'
      },
      {
        day: 'Tuesday',
        breakfast: 'Egg white omelette with turkey bacon',
        lunch: 'Tuna salad with mixed greens',
        dinner: 'Baked chicken with sweet potato'
      },
      {
        day: 'Wednesday',
        breakfast: 'Protein smoothie with whey protein',
        lunch: 'Grilled fish with brown rice',
        dinner: 'Turkey meatballs with zucchini noodles'
      }
    ]
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
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    nutrition: {
      protein: '25%',
      carbs: '5%',
      fats: '70%'
    },
    suitableFor: ['Keto dieters', 'Low-carb lifestyle', 'Weight loss goals'],
    sampleMeals: [
      {
        day: 'Monday',
        breakfast: 'Avocado and bacon omelette',
        lunch: 'Cobb salad with full-fat dressing',
        dinner: 'Baked salmon with buttered asparagus'
      },
      {
        day: 'Tuesday',
        breakfast: 'Cream cheese and berry fat bombs',
        lunch: 'Tuna salad in lettuce wraps',
        dinner: 'Ribeye steak with garlic butter mushrooms'
      },
      {
        day: 'Wednesday',
        breakfast: 'Keto yogurt with chia seeds',
        lunch: 'Chicken Caesar salad (no croutons)',
        dinner: 'Zucchini noodles with bolognese sauce'
      }
    ]
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
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    nutrition: {
      protein: '20%',
      carbs: '55%',
      fats: '25%'
    },
    suitableFor: ['Vegans', 'Plant-based diet enthusiasts', 'Environmentally conscious'],
    sampleMeals: [
      {
        day: 'Monday',
        breakfast: 'Overnight chia pudding with berries',
        lunch: 'Quinoa Buddha bowl with roasted vegetables',
        dinner: 'Lentil curry with brown rice'
      },
      {
        day: 'Tuesday',
        breakfast: 'Tofu scramble with vegetables',
        lunch: 'Chickpea salad wrap',
        dinner: 'Vegan mushroom risotto'
      },
      {
        day: 'Wednesday',
        breakfast: 'Avocado toast with hemp seeds',
        lunch: 'Black bean and sweet potato bowl',
        dinner: 'Cauliflower and chickpea curry'
      }
    ]
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
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    nutrition: {
      protein: '25%',
      carbs: '55%',
      fats: '20%'
    },
    suitableFor: ['Asian cuisine lovers', 'Flavor enthusiasts', 'Cultural explorers'],
    sampleMeals: [
      {
        day: 'Monday',
        breakfast: 'Congee with ginger and scallions',
        lunch: 'Sushi bowl with brown rice',
        dinner: 'Thai green curry with jasmine rice'
      },
      {
        day: 'Tuesday',
        breakfast: 'Miso soup with tofu',
        lunch: 'Vietnamese rice paper rolls',
        dinner: 'Korean bibimbap bowl'
      },
      {
        day: 'Wednesday',
        breakfast: 'Japanese-style omelette',
        lunch: 'Chinese stir-fried vegetables with rice',
        dinner: 'Indian butter chicken with naan'
      }
    ]
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
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    nutrition: {
      protein: '20%',
      carbs: '50%',
      fats: '30%'
    },
    suitableFor: ['Heart health conscious', 'Olive oil enthusiasts', 'Healthy lifestyle seekers'],
    sampleMeals: [
      {
        day: 'Monday',
        breakfast: 'Greek yogurt with honey and walnuts',
        lunch: 'Mediterranean chickpea salad',
        dinner: 'Grilled fish with lemon and herbs'
      },
      {
        day: 'Tuesday',
        breakfast: 'Whole grain toast with olive tapenade',
        lunch: 'Falafel wrap with tahini sauce',
        dinner: 'Ratatouille with quinoa'
      },
      {
        day: 'Wednesday',
        breakfast: 'Spanish omelette with vegetables',
        lunch: 'Tuna Niçoise salad',
        dinner: 'Chicken souvlaki with tzatziki'
      }
    ]
  }
];

const benefits = [
  {
    title: "Nutritionally Balanced",
    description: "Every meal is crafted by nutritionists to ensure optimal balance of macronutrients.",
    icon: Heart
  },
  {
    title: "Freshly Prepared",
    description: "Meals are prepared fresh daily with locally sourced ingredients when possible.",
    icon: Leaf
  },
  {
    title: "Convenient Delivery",
    description: "Weekly deliveries straight to your doorstep, saving you time and effort.",
    icon: ArrowRight
  },
  {
    title: "Variety of Options",
    description: "Never get bored with our rotating menu and seasonal specialties.",
    icon: Star
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
  const [selectedPlan, setSelectedPlan] = useState(mealPlans[0]);

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
    if (filtered.length > 0 && !filtered.find(plan => plan.id === selectedPlan.id)) {
      setSelectedPlan(filtered[0]);
    }
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                    <h3 className="text-xl font-semibold mb-4">Available Plans</h3>
                    <div className="space-y-3">
                      {filteredPlans.map((plan) => (
                        <div 
                          key={plan.id}
                          onClick={() => setSelectedPlan(plan)}
                          className={cn(
                            "p-4 rounded-lg cursor-pointer transition-all",
                            selectedPlan.id === plan.id 
                              ? "bg-primary/10 border border-primary" 
                              : "bg-secondary hover:bg-primary/5"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`rounded-full p-2 ${plan.color}`}>
                              <plan.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="font-medium">{plan.title}</h4>
                              <p className="text-sm text-muted-foreground">{plan.calories} calories</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <AnimatedSection>
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="relative">
                        <img 
                          src={selectedPlan.image} 
                          alt={selectedPlan.title}
                          className="w-full h-64 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-6 left-6 text-white">
                          <div className={`rounded-full p-2 ${selectedPlan.color} bg-white inline-flex mb-2`}>
                            <selectedPlan.icon className="w-5 h-5" />
                          </div>
                          <h2 className="text-3xl font-bold">{selectedPlan.title}</h2>
                          <p className="text-lg opacity-90">{selectedPlan.description}</p>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <Tabs defaultValue="overview" className="w-full">
                          <TabsList className="grid w-full grid-cols-4">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                            <TabsTrigger value="sampleMenu">Sample Menu</TabsTrigger>
                            <TabsTrigger value="getStarted">Get Started</TabsTrigger>
                          </TabsList>
                          
                          <TabsContent value="overview" className="pt-6">
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-xl font-semibold mb-3">About This Plan</h3>
                                <p className="text-muted-foreground">{selectedPlan.longDescription}</p>
                              </div>
                              
                              <div>
                                <h3 className="text-xl font-semibold mb-3">Best For</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  {selectedPlan.suitableFor.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-secondary/50 p-3 rounded-md">
                                      <Check className="w-4 h-4 text-primary" />
                                      <span>{item}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-xl font-semibold mb-3">Plan Details</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div className="bg-secondary/50 p-4 rounded-md text-center">
                                    <p className="text-sm text-muted-foreground">Calories</p>
                                    <p className="text-lg font-semibold">{selectedPlan.calories}</p>
                                  </div>
                                  <div className="bg-secondary/50 p-4 rounded-md text-center">
                                    <p className="text-sm text-muted-foreground">Price</p>
                                    <p className="text-lg font-semibold">₹{selectedPlan.price}/week</p>
                                  </div>
                                  <div className="bg-secondary/50 p-4 rounded-md text-center">
                                    <p className="text-sm text-muted-foreground">Diet Type</p>
                                    <p className="text-lg font-semibold capitalize">{selectedPlan.dietType}</p>
                                  </div>
                                  <div className="bg-secondary/50 p-4 rounded-md text-center">
                                    <p className="text-sm text-muted-foreground">Cuisine</p>
                                    <p className="text-lg font-semibold capitalize">{selectedPlan.cuisine}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="nutrition" className="pt-6">
                            <div className="space-y-6">
                              <div>
                                <h3 className="text-xl font-semibold mb-3">Nutritional Breakdown</h3>
                                <div className="bg-secondary/30 p-6 rounded-lg">
                                  <div className="grid grid-cols-3 gap-4">
                                    <div className="text-center">
                                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-xl font-bold mb-2">
                                        {selectedPlan.nutrition.protein}
                                      </div>
                                      <p className="font-medium">Protein</p>
                                    </div>
                                    <div className="text-center">
                                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 text-xl font-bold mb-2">
                                        {selectedPlan.nutrition.carbs}
                                      </div>
                                      <p className="font-medium">Carbs</p>
                                    </div>
                                    <div className="text-center">
                                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 text-yellow-600 text-xl font-bold mb-2">
                                        {selectedPlan.nutrition.fats}
                                      </div>
                                      <p className="font-medium">Fats</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div>
                                <h3 className="text-xl font-semibold mb-3">Daily Calories</h3>
                                <p className="text-muted-foreground mb-2">
                                  Each day's meals are balanced to provide approximately {selectedPlan.calories} calories, 
                                  distributed across breakfast, lunch, and dinner.
                                </p>
                                <div className="bg-secondary/30 p-4 rounded-lg">
                                  <div className="flex items-center justify-between">
                                    <span className="font-medium">Breakfast</span>
                                    <span className="font-semibold">{Math.round(selectedPlan.calories * 0.25)} calories</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '25%' }}></div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between mt-4">
                                    <span className="font-medium">Lunch</span>
                                    <span className="font-semibold">{Math.round(selectedPlan.calories * 0.35)} calories</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '35%' }}></div>
                                  </div>
                                  
                                  <div className="flex items-center justify-between mt-4">
                                    <span className="font-medium">Dinner</span>
                                    <span className="font-semibold">{Math.round(selectedPlan.calories * 0.40)} calories</span>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-2.5 my-2">
                                    <div className="bg-primary h-2.5 rounded-full" style={{ width: '40%' }}></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="sampleMenu" className="pt-6">
                            <h3 className="text-xl font-semibold mb-4">Sample Weekly Menu</h3>
                            <div className="space-y-6">
                              {selectedPlan.sampleMeals.map((meal, index) => (
                                <div key={index} className="bg-secondary/30 rounded-lg overflow-hidden">
                                  <div className="bg-primary text-white p-3">
                                    <h4 className="font-semibold">{meal.day}</h4>
                                  </div>
                                  <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white p-3 rounded-md shadow-sm">
                                      <p className="text-sm text-muted-foreground">Breakfast</p>
                                      <p className="font-medium">{meal.breakfast}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-md shadow-sm">
                                      <p className="text-sm text-muted-foreground">Lunch</p>
                                      <p className="font-medium">{meal.lunch}</p>
                                    </div>
                                    <div className="bg-white p-3 rounded-md shadow-sm">
                                      <p className="text-sm text-muted-foreground">Dinner</p>
                                      <p className="font-medium">{meal.dinner}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <p className="text-center text-muted-foreground mt-4">
                                This is just a sample of what you might receive. Our menu rotates weekly to ensure variety and seasonal freshness.
                              </p>
                            </div>
                          </TabsContent>
                          
                          <TabsContent value="getStarted" className="pt-6">
                            <div className="space-y-6">
                              <h3 className="text-xl font-semibold mb-4">How to Subscribe</h3>
                              
                              <div className="bg-secondary/30 p-6 rounded-lg">
                                <div className="flex flex-col gap-6">
                                  <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold flex-shrink-0">
                                      1
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-1">Download the App</h4>
                                      <p className="text-muted-foreground mb-3">Get the What The Food app from your app store.</p>
                                      <div className="flex gap-3">
                                        <Button className="gap-2">
                                          <Download className="w-4 h-4" />
                                          App Store
                                        </Button>
                                        <Button className="gap-2">
                                          <Download className="w-4 h-4" />
                                          Play Store
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold flex-shrink-0">
                                      2
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-1">Create an Account</h4>
                                      <p className="text-muted-foreground">Sign up and set up your profile with your dietary preferences.</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold flex-shrink-0">
                                      3
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-1">Choose Your Plan</h4>
                                      <p className="text-muted-foreground">Select the {selectedPlan.title} and customize as needed.</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold flex-shrink-0">
                                      4
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-1">Set Delivery Schedule</h4>
                                      <p className="text-muted-foreground">Choose your preferred delivery days and times.</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold flex-shrink-0">
                                      5
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-1">Enjoy Your Meals!</h4>
                                      <p className="text-muted-foreground">Receive fresh, delicious meals at your doorstep.</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
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
        
        <section className="py-16 bg-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="mb-4">Why Choose Our <span className="text-primary">Meal Plans</span>?</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Our meal plans are designed with your health and convenience in mind. Here's what sets us apart:
                </p>
              </div>
            </AnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="bg-secondary/30 p-6 rounded-lg h-full">
                    <div className="bg-primary/10 text-primary rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-accent">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="mb-6">Ready to Start Your Healthy Eating Journey?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Download our app to browse all meal plans, customize your meals, and place your first order.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg" 
                    className="button-hover-effect gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download on App Store
                  </Button>
                  <Button 
                    size="lg" 
                    className="button-hover-effect gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Get it on Play Store
                  </Button>
                </div>
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
