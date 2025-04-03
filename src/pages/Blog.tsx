
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Mail, Heart, Dumbbell, Leaf, CheckCircle, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Sample blog data - in a real app, this would come from an API
const blogPosts = [
  {
    id: 1,
    title: "How to Meal Prep for a Busy Week",
    excerpt: "Learn the essential steps to prepare healthy meals for the entire week in just 2 hours.",
    category: "meal-prep",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1172&auto=format&fit=crop",
    author: "Jessica Chen, Nutritionist",
    date: "May 15, 2023",
    featured: true,
    icon: "utensils"
  },
  {
    id: 2,
    title: "10 High-Protein Vegetarian Meals",
    excerpt: "Delicious plant-based recipes packed with protein to keep you energized throughout the day.",
    category: "recipes",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1172&auto=format&fit=crop",
    author: "Mark Johnson, Chef",
    date: "June 3, 2023",
    featured: true,
    icon: "leaf"
  },
  {
    id: 3,
    title: "Why Consistency Matters More Than Perfection",
    excerpt: "Small, consistent habits lead to better health outcomes than sporadic extreme dieting.",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1170&auto=format&fit=crop",
    author: "Alex Rivera, Fitness Coach",
    date: "April 22, 2023",
    featured: true,
    icon: "dumbbell"
  },
  {
    id: 4,
    title: "Understanding Macros: A Beginner's Guide",
    excerpt: "Learn how to balance proteins, carbs, and fats for optimal health and weight management.",
    category: "nutrition",
    image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1170&auto=format&fit=crop",
    author: "Dr. Sarah Wilson, Dietitian",
    date: "July 10, 2023",
    featured: false,
    icon: "heart"
  },
  {
    id: 5,
    title: "The Best Foods to Eat Before a Workout",
    excerpt: "Fuel your exercise routine with these energizing pre-workout meals and snacks.",
    category: "fitness",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1170&auto=format&fit=crop",
    author: "Chris Taylor, Sports Nutritionist",
    date: "August 5, 2023",
    featured: false,
    icon: "dumbbell"
  },
  {
    id: 6,
    title: "How to Stay Hydrated Throughout the Day",
    excerpt: "Simple strategies to ensure you're getting enough water and staying properly hydrated.",
    category: "wellness",
    image: "https://images.unsplash.com/photo-1550505095-81378a674395?q=80&w=1170&auto=format&fit=crop",
    author: "Lisa Park, Health Coach",
    date: "May 28, 2023",
    featured: false,
    icon: "coffee"
  }
];

const successStories = [
  {
    id: 1,
    name: "Michael D.",
    title: "Lost 30 pounds in 6 months",
    story: "I've tried many meal plans before, but What The Food made it easy to stick to my diet goals. The convenience and variety kept me on track.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=1176&auto=format&fit=crop",
    results: "Weight loss, improved energy"
  },
  {
    id: 2,
    name: "Sophia R.",
    title: "Managed my diabetes through diet",
    story: "The customized meal plans helped me keep my blood sugar levels stable. The dietitian support was invaluable in creating meals that work for my condition.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1176&auto=format&fit=crop",
    results: "Stable blood sugar, reduced medication"
  },
  {
    id: 3,
    name: "James T.",
    title: "Gained 15 pounds of muscle",
    story: "The high-protein meal options and perfect portion sizes helped me reach my muscle-building goals while maintaining a busy work schedule.",
    image: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=1170&auto=format&fit=crop",
    results: "Muscle gain, improved strength"
  }
];

const categories = [
  { name: "All", value: "all" },
  { name: "Weight Loss", value: "weight-loss" },
  { name: "Muscle Gain", value: "muscle-gain" },
  { name: "Nutrition", value: "nutrition" },
  { name: "Recipes", value: "recipes" },
  { name: "Fitness", value: "fitness" },
  { name: "Meal Prep", value: "meal-prep" },
  { name: "Vegan Diet", value: "vegan" },
  { name: "Wellness", value: "wellness" }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "heart":
      return <Heart className="w-5 h-5" />;
    case "dumbbell":
      return <Dumbbell className="w-5 h-5" />;
    case "leaf":
      return <Leaf className="w-5 h-5" />;
    case "utensils":
      return <CheckCircle className="w-5 h-5" />;
    case "coffee":
      return <Coffee className="w-5 h-5" />;
    default:
      return <CheckCircle className="w-5 h-5" />;
  }
};

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to a backend
    alert(`Thanks for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection animation="fade-in">
              <div className="text-center max-w-3xl mx-auto">
                <h1 className="mb-4">Health & Nutrition Blog</h1>
                <p className="text-muted-foreground mb-8">
                  Expert advice on nutrition, fitness, and meal planning to help you achieve your health goals
                </p>
                
                <div className="relative max-w-xl mx-auto">
                  <Search className="absolute left-3 top-3 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    className="pl-10 pr-4 py-6 w-full rounded-full text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16 bg-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection animation="fade-in">
              <div className="mb-12 text-center">
                <h2 className="mb-4">Featured Articles</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Our most popular and helpful content to guide you on your health journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredPosts.map((post) => (
                  <div 
                    key={post.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <span className="badge badge-primary flex items-center gap-1">
                          {getIcon(post.icon)}
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                      <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">{post.date}</span>
                        <Button variant="link" className="flex items-center gap-1 p-0">
                          Read More <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Browse All Articles */}
        <section className="py-16 bg-secondary/50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection animation="fade-in">
              <div className="mb-12">
                <h2 className="mb-4">Browse Articles</h2>
                <p className="text-muted-foreground max-w-3xl">
                  Find the information you need to support your health and wellness goals
                </p>
              </div>

              <div className="mb-8">
                <Tabs 
                  defaultValue="all" 
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                  className="w-full"
                >
                  <TabsList className="mb-8 flex flex-wrap h-auto bg-transparent p-0 gap-2">
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category.value} 
                        value={category.value}
                        className="px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-full"
                      >
                        {category.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <TabsContent value={selectedCategory} className="mt-0">
                    {filteredPosts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post) => (
                          <div 
                            key={post.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                          >
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="w-full h-48 object-cover"
                            />
                            <div className="p-6 flex flex-col flex-grow">
                              <div className="flex items-center mb-4">
                                <span className="badge badge-primary flex items-center gap-1">
                                  {getIcon(post.icon)}
                                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                              <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                              <div className="flex justify-between items-center mt-auto">
                                <span className="text-sm text-muted-foreground">{post.date}</span>
                                <Button variant="link" className="flex items-center gap-1 p-0">
                                  Read More <ArrowRight className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-white rounded-lg">
                        <p className="text-lg text-muted-foreground">No articles found. Try a different search.</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Success Stories */}
        <section className="py-16 bg-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection animation="fade-in">
              <div className="mb-12 text-center">
                <h2 className="mb-4">Success Stories</h2>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Real people, real results - see how What The Food has transformed lives
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {successStories.map((story) => (
                  <div 
                    key={story.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-6">
                        <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                          <img 
                            src={story.image} 
                            alt={story.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg">{story.name}</h4>
                          <p className="text-primary font-medium">{story.title}</p>
                        </div>
                      </div>
                      <p className="mb-4 text-muted-foreground italic">"{story.story}"</p>
                      <div className="bg-accent p-3 rounded-md">
                        <p className="font-medium text-sm">Results: {story.results}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button variant="outline" className="button-hover-effect">
                  View All Success Stories
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 bg-primary/10">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection animation="fade-in">
              <div className="max-w-3xl mx-auto text-center">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="mb-4">Subscribe to Our Newsletter</h2>
                <p className="text-muted-foreground mb-8">
                  Get weekly health tips, new recipes, and exclusive nutrition advice delivered to your inbox
                </p>
                
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    required
                    className="flex-grow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" className="button-hover-effect">
                    Subscribe
                  </Button>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
