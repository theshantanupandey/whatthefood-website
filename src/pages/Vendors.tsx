import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, TrendingUp, Users, Clock, FileText, Check, MapPin, ChefHat, Utensils, BarChart, Truck, DollarSign } from 'lucide-react';

// Sample vendor data
const vendors = [{
  id: 1,
  name: "Fresh Greens Kitchen",
  location: "Kharar",
  cuisine: "Plant-based",
  image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  description: "Specializing in plant-based protein bowls and creative salads."
}, {
  id: 2,
  name: "Protein Power House",
  location: "Chandigarh",
  cuisine: "High-protein",
  image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  description: "Focused on macro-balanced meals for fitness enthusiasts."
}, {
  id: 3,
  name: "Balanced Bites",
  location: "Mohali",
  cuisine: "Mediterranean",
  image: "https://images.unsplash.com/photo-1616645297079-dfaf44a6f977?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  description: "Mediterranean-inspired healthy meals with local ingredients."
}, {
  id: 4,
  name: "Keto Kreations",
  location: "Kharar",
  cuisine: "Ketogenic",
  image: "https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  description: "Specialized in low-carb, high-fat meals for keto lifestyles."
}, {
  id: 5,
  name: "Seasonal Harvest",
  location: "Chandigarh",
  cuisine: "Farm-to-table",
  image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  description: "Seasonal ingredients from local farms prepared with minimal processing."
}, {
  id: 6,
  name: "Macro Meals",
  location: "Mohali",
  cuisine: "Custom macros",
  image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  description: "Perfectly portioned meals designed to meet specific macro requirements."
}];

// Locations for filtering
const locations = ["All Locations", "Kharar", "Chandigarh", "Mohali"];
const benefits = [{
  title: 'Expand Your Reach',
  description: 'Connect with new customers and grow your business through our platform.',
  icon: TrendingUp
}, {
  title: 'Steady Revenue',
  description: 'Benefit from predictable subscription-based orders.',
  icon: DollarSign
}, {
  title: 'Flexible Options',
  description: 'Choose the meal plans you want to contribute to.',
  icon: Users
}, {
  title: 'Easy Integration',
  description: 'Our system integrates seamlessly with your kitchen operations.',
  icon: Clock
}];
const applicationSteps = [{
  title: "Submit Application",
  description: "Fill out our vendor application form with details about your kitchen and cuisine.",
  icon: FileText
}, {
  title: "Kitchen Review",
  description: "Our team will review your facilities, food safety practices, and meal quality.",
  icon: ChefHat
}, {
  title: "Menu Development",
  description: "Work with our nutritionists to create meal plan options that meet our standards.",
  icon: Utensils
}, {
  title: "Platform Integration",
  description: "Get set up with our ordering system and delivery logistics.",
  icon: Truck
}, {
  title: "Launch Partnership",
  description: "Start receiving orders and growing your business with What The Food.",
  icon: BarChart
}];
const Vendors = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter vendors by location
  useEffect(() => {
    if (selectedLocation === "All Locations") {
      setFilteredVendors(vendors);
    } else {
      setFilteredVendors(vendors.filter(vendor => vendor.location === selectedLocation));
    }
  }, [selectedLocation]);
  const handleApplyClick = () => {
    navigate('/vendor-application');
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="pt-24 pb-16 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <div className="badge badge-primary mb-4">For Restaurants & Cloud Kitchens</div>
                <h1 className="mb-6">
                  Join Our <span className="text-primary">Vendor Network</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Partner with What The Food to expand your reach and provide healthy, 
                  delicious meals to subscribers in your area.
                </p>
                <Button size="lg" className="button-hover-effect" onClick={handleApplyClick}>
                  Apply to Become a Vendor
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
        
        {/* Current vendor partners */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="mb-6">Current Vendor Partners</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground">
                  We've partnered with top restaurants and cloud kitchens to deliver 
                  exceptional meal plans across the country.
                </p>
              </div>
            </AnimatedSection>
            
            {/* Location filter */}
            <AnimatedSection delay={100}>
              <div className="mb-8">
                <Tabs defaultValue={selectedLocation} className="w-full">
                  <TabsList className="mb-6 flex flex-wrap justify-center gap-2">
                    {locations.map(location => <TabsTrigger key={location} value={location} onClick={() => setSelectedLocation(location)} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        {location}
                      </TabsTrigger>)}
                  </TabsList>
                </Tabs>
              </div>
            </AnimatedSection>
            
            {/* Vendor grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVendors.map((vendor, idx) => <AnimatedSection key={vendor.id} delay={idx * 100}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full flex flex-col">
                    <div className="relative h-48">
                      <img src={vendor.image} alt={vendor.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-white mr-1" />
                          <span className="text-white text-sm">{vendor.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex-grow">
                      <div className="badge badge-primary mb-2">{vendor.cuisine}</div>
                      <h3 className="text-xl font-semibold mb-2">{vendor.name}</h3>
                      <p className="text-muted-foreground">{vendor.description}</p>
                    </div>
                  </div>
                </AnimatedSection>)}
            </div>
          </div>
        </section>
        
        {/* Why partner with us */}
        <section className="py-16 bg-accent">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="fade-in-left">
                <div>
                  <div className="badge badge-primary mb-4">Partner Benefits</div>
                  <h2 className="mb-6">Why Partner With <span className="text-primary">What The Food</span></h2>
                  <p className="text-muted-foreground mb-10 max-w-lg">
                    Reach more customers and grow your business by joining our network of meal providers.
                    We connect your kitchen with health-conscious subscribers in your area.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                    {benefits.map((benefit, idx) => <div key={idx} className="flex">
                        <div className="bg-primary/10 rounded-full p-3 flex-shrink-0 mt-1">
                          <benefit.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="ml-4">
                          <h4 className="font-medium mb-1">{benefit.title}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="fade-in-right">
                <div className="relative">
                  <img alt="Restaurant kitchen" className="rounded-3xl shadow-lg" src="https://images.unsplash.com/photo-1581349485608-9469926a8e5e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <Store className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">100+ Partners</h4>
                        <p className="text-xs text-muted-foreground">Across major cities</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
        
        {/* Application process */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="mb-6">How to Become a Vendor</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground">
                  Our streamlined application process makes it easy to join our vendor network.
                  Here's what to expect:
                </p>
              </div>
            </AnimatedSection>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />
              
              {/* Timeline steps */}
              <div className="space-y-12 relative">
                {applicationSteps.map((step, idx) => <AnimatedSection key={idx} delay={idx * 100}>
                    <div className={`md:flex items-center ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse text-right'}`}>
                      <div className={`md:w-1/2 p-6 ${idx % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                        <div className="glass-card p-6 rounded-xl shadow-sm">
                          <div className="flex items-center mb-4">
                            <div className="bg-primary/10 rounded-full p-3 flex-shrink-0">
                              <step.icon className="w-5 h-5 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold ml-4">{step.title}</h3>
                          </div>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                      
                      {/* Center point */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-primary text-primary-foreground rounded-full items-center justify-center font-semibold shadow-md">
                        {idx + 1}
                      </div>
                    </div>
                  </AnimatedSection>)}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 bg-primary/5">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" alt="Team collaboration" className="rounded-xl shadow-sm" />
                  </div>
                  <div>
                    <h2 className="mb-6">Ready to Grow Your Business?</h2>
                    <p className="text-muted-foreground mb-8">
                      Join our network of successful vendor partners and expand your reach to health-conscious customers. 
                      Our platform provides the technology and customer base, you provide the delicious, nutritious meals.
                    </p>
                    <div className="space-y-4 mb-8">
                      {['No upfront costs to join', 'Detailed analytics and reporting', 'Flexible scheduling options', 'Marketing support and promotion'].map((item, idx) => <div key={idx} className="flex items-start">
                          <div className="mt-1 bg-primary/10 rounded-full p-1">
                            <Check className="w-4 h-4 text-primary" />
                          </div>
                          <span className="ml-3">{item}</span>
                        </div>)}
                    </div>
                    <Button size="lg" className="button-hover-effect" onClick={handleApplyClick}>
                      Apply to Become a Vendor
                    </Button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Vendors;