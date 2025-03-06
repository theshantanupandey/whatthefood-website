
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  ActivitySquare, 
  Utensils, 
  ChevronRight, 
  Apple, 
  Smartphone, 
  BarChart, 
  Download 
} from 'lucide-react';

const AIDietPlanner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="pt-24 pb-16 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">
                  AI-Powered Nutrition
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Your Personal <span className="text-primary">AI Diet Planner</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Get personalized meal recommendations based on your unique health profile, preferences, and goals.
                </p>
                <Button size="lg" className="button-hover-effect">
                  Try AI Diet Planner Now
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* What is the AI Diet Planner */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="fade-in-left">
                <div>
                  <h2 className="text-3xl font-bold mb-6">What is the AI Diet Planner?</h2>
                  <p className="text-muted-foreground mb-6">
                    Our AI Diet Planner is a sophisticated nutritional guidance system powered by machine learning algorithms that understand your unique body composition, dietary preferences, and health goals.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Unlike generic meal plans, our AI creates truly personalized nutrition recommendations by analyzing:
                  </p>
                  <ul className="space-y-4">
                    {[
                      'Your biometric data (height, weight, body composition)',
                      'Activity levels and exercise routines',
                      'Food preferences and dietary restrictions',
                      'Health conditions and nutritional needs',
                      'Your specific short and long-term goals'
                    ].map((item, idx) => (
                      <li key={idx} className="flex">
                        <div className="mr-4 mt-1">
                          <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                          </div>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-right">
                <div className="relative rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="AI Diet Planning"
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <div className="flex items-center">
                      <Brain className="h-8 w-8 text-primary mr-3" />
                      <div>
                        <h3 className="text-white font-semibold">AI-Powered Analysis</h3>
                        <p className="text-white/80 text-sm">Continuous learning from your feedback</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-accent">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-6">How It Works</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground">
                  Our AI Diet Planner takes the guesswork out of nutrition by creating a 
                  personalized meal plan based on your specific data.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  title: 'Input Your Data',
                  description: 'Enter your weight, height, age, activity level, and nutritional goals.',
                  icon: ActivitySquare,
                  delay: 0
                },
                {
                  title: 'AI Analysis',
                  description: 'Our AI analyzes your information to calculate your optimal nutritional needs.',
                  icon: Brain,
                  delay: 100
                },
                {
                  title: 'Custom Meal Plans',
                  description: 'Receive personalized meal plans that match your specific health profile.',
                  icon: Utensils,
                  delay: 200
                }
              ].map((step, idx) => (
                <AnimatedSection key={idx} delay={step.delay}>
                  <div className="bg-white rounded-xl shadow-sm p-6 h-full flex flex-col">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <step.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-xs font-semibold text-primary mb-2">Step {idx + 1}</span>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={300}>
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-2xl font-semibold mb-6">Information You Can Provide:</h3>
                
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="diet">Dietary Preferences</TabsTrigger>
                    <TabsTrigger value="goals">Health Goals</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Physical Metrics</h4>
                        <ul className="space-y-2">
                          {['Height', 'Weight', 'Age', 'Biological sex', 'Body composition (if available)'].map((item, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <ChevronRight className="h-4 w-4 text-primary mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Activity Level</h4>
                        <ul className="space-y-2">
                          {['Sedentary', 'Lightly active', 'Moderately active', 'Very active', 'Extremely active'].map((item, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <ChevronRight className="h-4 w-4 text-primary mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="diet" className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Diet Types</h4>
                        <ul className="space-y-2">
                          {['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Paleo', 'Keto', 'Mediterranean'].map((item, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <ChevronRight className="h-4 w-4 text-primary mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Restrictions</h4>
                        <ul className="space-y-2">
                          {['Food allergies', 'Intolerances', 'Religious restrictions', 'Disliked foods', 'Preferred cuisines'].map((item, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <ChevronRight className="h-4 w-4 text-primary mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="goals" className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Weight Management</h4>
                        <ul className="space-y-2">
                          {['Weight loss', 'Weight gain', 'Weight maintenance', 'Body recomposition'].map((item, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <ChevronRight className="h-4 w-4 text-primary mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Health Optimization</h4>
                        <ul className="space-y-2">
                          {['Improve energy levels', 'Better sleep', 'Digestive health', 'Reduce inflammation', 'Manage specific conditions'].map((item, i) => (
                            <li key={i} className="flex items-center text-sm">
                              <ChevronRight className="h-4 w-4 text-primary mr-2" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Health App Integrations */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="fade-in-left">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Apple Health',
                      description: 'Sync your health data directly from your iPhone',
                      icon: Apple,
                      color: 'bg-[#FF2D55]/10',
                      textColor: 'text-[#FF2D55]'
                    },
                    {
                      name: 'Google Fit',
                      description: 'Connect your Google Fit account for seamless integration',
                      icon: Smartphone,
                      color: 'bg-[#4285F4]/10',
                      textColor: 'text-[#4285F4]'
                    },
                    {
                      name: 'Fitbit',
                      description: 'Import your Fitbit activity and health metrics',
                      icon: BarChart,
                      color: 'bg-[#00B0B9]/10',
                      textColor: 'text-[#00B0B9]'
                    }
                  ].map((app, idx) => (
                    <AnimatedSection key={idx} delay={idx * 100}>
                      <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center">
                        <div className={`w-14 h-14 ${app.color} rounded-full flex items-center justify-center mb-4`}>
                          <app.icon className={`h-7 w-7 ${app.textColor}`} />
                        </div>
                        <h3 className="font-semibold mb-2">{app.name}</h3>
                        <p className="text-sm text-muted-foreground">{app.description}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-right">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Health App Integrations</h2>
                  <p className="text-muted-foreground mb-6">
                    Enhance your AI Diet Planner experience by connecting with your favorite health and fitness apps. 
                    This allows our AI to access real-time data about your:
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Daily activity levels and step count',
                      'Workout intensity and duration',
                      'Heart rate and sleep patterns',
                      'Weight changes over time'
                    ].map((item, idx) => (
                      <li key={idx} className="flex">
                        <svg className="w-5 h-5 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground mb-6">
                    By integrating these apps, your meal plans will automatically adjust based on your actual activity and health metrics.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Nutrition?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Download our app to access the AI Diet Planner and get personalized meal recommendations tailored to your unique needs.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button size="lg" className="button-hover-effect">
                    <Download className="mr-2 h-5 w-5" />
                    Download App
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
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

export default AIDietPlanner;
