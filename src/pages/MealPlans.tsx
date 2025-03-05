
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
import { Heart, Dumbbell, Salad, Leaf, Download } from 'lucide-react';

const mealPlans = [
  {
    id: 'regular',
    title: 'Regular Plan',
    description: 'A perfect balance of proteins, carbs, and fats for general health and wellbeing.',
    longDescription: 'Our Regular Plan provides perfectly balanced meals with optimal proportions of proteins, carbohydrates, and healthy fats. Ideal for those looking to maintain a healthy diet without specific dietary restrictions. Each meal contains approximately 500-600 calories with a balanced macronutrient profile.',
    icon: Heart,
    color: 'bg-blue-500/10 text-blue-500',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    suitableFor: ['General health maintenance', 'Busy professionals', 'Families', 'Those new to healthy eating'],
    sampleMeals: [
      'Grilled Chicken with Quinoa and Roasted Vegetables',
      'Teriyaki Salmon with Brown Rice and Steamed Broccoli',
      'Turkey and Vegetable Stir Fry with Jasmine Rice'
    ]
  },
  {
    id: 'high-protein',
    title: 'High Protein',
    description: 'Extra protein for muscle building, recovery, and active lifestyles.',
    longDescription: 'Designed for those who need extra protein in their diet, our High Protein plan focuses on lean protein sources while maintaining a balanced nutritional profile. Perfect for athletes, active individuals, and those looking to build or maintain muscle mass. Each meal contains 30-40g of protein and approximately 600-700 calories.',
    icon: Dumbbell,
    color: 'bg-purple-500/10 text-purple-500',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    suitableFor: ['Athletes', 'Fitness enthusiasts', 'Post-workout recovery', 'Muscle building goals'],
    sampleMeals: [
      'Steak with Sweet Potato and Asparagus',
      'Chicken Breast with Quinoa Power Bowl',
      'Protein-Packed Turkey Meatballs with Whole Wheat Pasta'
    ]
  },
  {
    id: 'keto',
    title: 'Keto',
    description: 'Low-carb, high-fat meals designed for the ketogenic lifestyle.',
    longDescription: 'Our Keto Plan features low-carbohydrate, high-fat meals designed to help your body maintain ketosis. Each meal contains less than 10g of net carbs while providing healthy fats and moderate protein. This plan is ideal for those following a ketogenic diet for weight management, metabolic health, or other health reasons.',
    icon: Salad,
    color: 'bg-orange-500/10 text-orange-500',
    image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    suitableFor: ['Keto diet followers', 'Weight management goals', 'Metabolic health optimization', 'Low-carb enthusiasts'],
    sampleMeals: [
      'Avocado and Bacon Stuffed Chicken with Cauliflower Rice',
      'Zucchini Noodles with Alfredo Sauce and Grilled Shrimp',
      'Grilled Salmon with Asparagus and Hollandaise Sauce'
    ]
  },
  {
    id: 'vegan',
    title: 'Vegan',
    description: '100% plant-based, nutrient-rich meals with no animal products.',
    longDescription: 'Our Vegan Plan features delicious, nutrient-dense meals made entirely from plant sources. We ensure balanced nutrition with adequate protein from varied plant sources, healthy fats, complex carbohydrates, and all essential nutrients. Perfect for those following a vegan lifestyle or looking to incorporate more plant-based meals.',
    icon: Leaf,
    color: 'bg-green-500/10 text-green-500',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    suitableFor: ['Vegans', 'Vegetarians', 'Plant-based diet followers', 'Environmental conscious eaters'],
    sampleMeals: [
      'Spiced Chickpea and Sweet Potato Buddha Bowl',
      'Lentil and Mushroom Bolognese with Zucchini Noodles',
      'Quinoa Stuffed Bell Peppers with Avocado Sauce'
    ]
  }
];

const MealPlans = () => {
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
                <div className="badge badge-primary mb-4">Nourish Your Body</div>
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

        {/* Meal plans details section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            {mealPlans.map((plan, idx) => (
              <AnimatedSection 
                key={plan.id} 
                className={`mb-20 ${idx % 2 === 0 ? '' : ''}`}
                animation={idx % 2 === 0 ? 'fade-in-left' : 'fade-in-right'}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className={`${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                    <div className={`inline-flex items-center rounded-full px-4 py-2 ${plan.color} mb-4`}>
                      <plan.icon className="w-5 h-5 mr-2" />
                      <span className="font-medium">{plan.title} Plan</span>
                    </div>
                    <h2 className="text-3xl font-bold mb-4">{plan.title} Meal Plan</h2>
                    <p className="text-lg text-muted-foreground mb-6">{plan.longDescription}</p>
                    
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3">Perfect For:</h3>
                      <ul className="space-y-2">
                        {plan.suitableFor.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-3">Sample Meals:</h3>
                      <ul className="space-y-2">
                        {plan.sampleMeals.map((meal, i) => (
                          <li key={i} className="flex items-start">
                            <svg className="w-5 h-5 text-primary mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{meal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="button-hover-effect">
                      <Download className="w-4 h-4 mr-2" />
                      Download Sample Menu
                    </Button>
                  </div>
                  
                  <div className={`${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                    <div className="relative rounded-3xl overflow-hidden shadow-lg">
                      <img 
                        src={plan.image}
                        alt={plan.title} 
                        className="w-full h-auto object-cover aspect-[4/3]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60" />
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Why choose our meal plans section */}
        <section className="py-16 bg-accent">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="mb-6">Why Choose Our Meal Plans?</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground">
                  What The Food offers more than just convenience. Here's why our subscribers love our meal plans.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {['Fresh Ingredients', 'Nutrition-Optimized', 'Chef-Crafted'].map((feature, idx) => (
                <AnimatedSection key={feature} delay={idx * 100}>
                  <div className="bg-white rounded-2xl shadow-sm p-6 h-full">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      {idx === 0 && (
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                      {idx === 1 && (
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                      {idx === 2 && (
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature}</h3>
                    <p className="text-muted-foreground">
                      {idx === 0 && "We source ingredients locally when possible, ensuring maximum freshness and flavor in every bite."}
                      {idx === 1 && "Our nutritionists ensure every meal provides balanced nutrition with optimal macros for your specific dietary needs."}
                      {idx === 2 && "Experienced chefs create delicious recipes that prove healthy food can be incredibly tasty and satisfying."}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* How to subscribe CTA */}
        <section className="py-16 bg-secondary/50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="mb-6">Ready to Start Your Healthy Eating Journey?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Subscribe to your preferred meal plan through our mobile app. Set your preferences, choose your delivery schedule, and enjoy fresh, nutritious meals delivered to your door.
                </p>
                <Button size="lg" className="button-hover-effect">
                  <Download className="w-5 h-5 mr-2" />
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

export default MealPlans;
