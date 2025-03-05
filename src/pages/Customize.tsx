
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Settings, ArrowRight, Utensils, AlertCircle, Zap } from 'lucide-react';

const Customize = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="pt-24 pb-12 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <div className="badge badge-primary mb-4">Personalized Nutrition</div>
                <h1 className="mb-6">
                  Customize Your <span className="text-primary">Meal Plan</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  Create a meal plan that perfectly matches your dietary needs, preferences, and health goals.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Why customize section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="fade-in-left">
                <div>
                  <h2 className="mb-6">Why Customize Your Meals?</h2>
                  <p className="text-muted-foreground mb-6">
                    Everyone&apos;s nutritional needs are different. Customizing your meal plan ensures you get exactly what your body needs based on your:
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      'Dietary restrictions and preferences',
                      'Health and fitness goals',
                      'Caloric and macronutrient requirements',
                      'Taste preferences and favorite foods'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="button-hover-effect">
                    Start Customizing
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-right">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Meal customization"
                    className="rounded-3xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                        <Settings className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">Fully Customizable</h4>
                        <p className="text-xs text-muted-foreground">Adjust to your exact needs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Customization options */}
        <section className="py-16 bg-accent">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="mb-6">Customization Options</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground">
                  Our flexible customization system allows you to tailor your meal plan in multiple ways.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Dietary Preferences',
                  description: 'Choose from vegetarian, vegan, pescatarian, or omnivore options to match your lifestyle.',
                  icon: Utensils
                },
                {
                  title: 'Caloric Intake',
                  description: 'Select your daily calorie target based on your goals, whether weight loss, maintenance, or muscle gain.',
                  icon: Zap
                },
                {
                  title: 'Allergen Exclusions',
                  description: 'Specify any food allergies or intolerances, and we\'ll ensure your meals are always safe for you.',
                  icon: AlertCircle
                }
              ].map((option, idx) => (
                <AnimatedSection key={idx} delay={idx * 100}>
                  <div className="bg-white rounded-2xl shadow-sm p-6 h-full flex flex-col">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <option.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                    <p className="text-muted-foreground flex-grow">{option.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={300}>
              <div className="mt-12 bg-white rounded-2xl shadow-sm p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4">Additional Customization Features</h3>
                    <ul className="space-y-3">
                      {[
                        'Macronutrient ratios (protein, fats, carbs)',
                        'Meal size preferences',
                        'Specific ingredients to include or exclude',
                        'Flavor profile preferences',
                        'Frequency of meal delivery',
                        'Portion size adjustments'
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <svg className="w-5 h-5 text-primary mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center">
                    <img
                      src="https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                      alt="Custom meal options"
                      className="rounded-xl shadow-sm max-w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* AI Diet Planner Section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="fade-in-left">
                <div className="relative">
                  <div className="absolute -left-8 -top-8 w-40 h-40 bg-primary/10 rounded-full opacity-70" />
                  <img
                    src="https://images.unsplash.com/photo-1550831107-1553da8c8464?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="AI Diet Planner"
                    className="rounded-3xl shadow-lg relative z-10"
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-right">
                <div>
                  <div className="badge badge-primary mb-4">Smart Recommendations</div>
                  <h2 className="mb-6">AI Diet Planner Integration</h2>
                  <p className="text-muted-foreground mb-6">
                    Not sure exactly what you need? Our AI Diet Planner can analyze your health data, activity levels, and goals to recommend the perfect customized meal plan.
                  </p>
                  <p className="text-muted-foreground mb-8">
                    The AI considers factors like your BMI, exercise habits, sleep patterns, and even genetic predispositions to create truly personalized nutrition recommendations.
                  </p>
                  <Button 
                    className="button-hover-effect"
                    onClick={() => window.location.href = '/ai-diet-planner'}
                  >
                    Try the AI Diet Planner
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-secondary/50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="mb-6">Start Your Personalized Nutrition Journey</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Download our app to access all customization features and create your perfect meal plan today.
                </p>
                <Button size="lg" className="button-hover-effect">
                  Download Our App
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

export default Customize;
