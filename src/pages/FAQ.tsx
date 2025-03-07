
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  ChevronDown, 
  ChevronUp, 
  Info, 
  UtensilsCrossed, 
  Settings, 
  Truck, 
  Store, 
  Brain, 
  CreditCard, 
  HelpCircle 
} from 'lucide-react';

// Add the missing FAQSection component
const FAQSection = ({ title, questions }: { title: string; questions: { question: string; answer: string }[] }) => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems((prevOpenItems) => 
      prevOpenItems.includes(index)
        ? prevOpenItems.filter((item) => item !== index)
        : [...prevOpenItems, index]
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-4">
        {questions.map((item, index) => (
          <div 
            key={index}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full p-4 text-left bg-card hover:bg-accent/50 transition-colors"
              onClick={() => toggleItem(index)}
            >
              <h3 className="text-lg font-medium">{item.question}</h3>
              {openItems.includes(index) ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            {openItems.includes(index) && (
              <div className="p-4 bg-card border-t border-border">
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQPage = () => {
  return (
    <>
      <Header />
      <div className="pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Frequently Asked Questions</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to the most common questions about What The Food's meal plans, services, and more.
            </p>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="general" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-transparent h-auto">
                  <TabsTrigger 
                    value="general" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-3 flex gap-2 items-center"
                  >
                    <Info className="h-4 w-4" />
                    <span>General</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="meals" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-3 flex gap-2 items-center"
                  >
                    <UtensilsCrossed className="h-4 w-4" />
                    <span>Meal Plans</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="customize" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-3 flex gap-2 items-center"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Customization</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="delivery" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-3 flex gap-2 items-center"
                  >
                    <Truck className="h-4 w-4" />
                    <span>Delivery</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="vendors" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-3 flex gap-2 items-center"
                  >
                    <Store className="h-4 w-4" />
                    <span>Vendors</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="ai" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-3 flex gap-2 items-center"
                  >
                    <Brain className="h-4 w-4" />
                    <span>AI Diet Planner</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="pricing" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-3 flex gap-2 items-center"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Pricing</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="support" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-3 flex gap-2 items-center"
                  >
                    <HelpCircle className="h-4 w-4" />
                    <span>Support</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="mt-4">
                <TabsContent value="general" className="mt-0">
                  <FAQSection 
                    title="General Questions" 
                    questions={[
                      {
                        question: "What is What The Food?",
                        answer: "What The Food is a meal planning and delivery service that connects health-conscious individuals with fresh, customized meal plans from local vendors. We combine AI-powered nutrition recommendations with convenient meal delivery to make healthy eating easy and enjoyable."
                      },
                      {
                        question: "How does What The Food work?",
                        answer: "It's simple! You select a meal plan that fits your preferences, dietary needs, and goals (or use our AI Diet Planner to get personalized recommendations). We partner with local vendors to prepare your meals fresh daily, and deliver them right to your doorstep according to your schedule."
                      },
                      {
                        question: "Where is What The Food available?",
                        answer: "We currently operate in major metropolitan areas across India, with plans to expand to more cities soon. Check our delivery page or enter your pincode to see if we deliver to your area."
                      },
                      {
                        question: "Do I need to order daily, or is it a subscription model?",
                        answer: "What The Food operates on a subscription model, but we offer flexibility. You can choose weekly, bi-weekly, or monthly plans, and you can easily pause or modify your subscription as needed."
                      },
                      {
                        question: "How do I sign up for a meal plan?",
                        answer: "Simply create an account on our website or mobile app, browse our meal plans or use the AI Diet Planner for personalized recommendations, select your preferred plan, customize it if needed, and proceed to checkout. Once your payment is confirmed, you'll start receiving meals on your selected start date."
                      },
                      {
                        question: "Can I pause or cancel my subscription anytime?",
                        answer: "Absolutely! You can pause, modify, or cancel your subscription through your account dashboard with at least 24 hours' notice before your next delivery."
                      },
                      {
                        question: "Are there any hidden fees or extra charges?",
                        answer: "No hidden fees! The price you see includes the cost of meal preparation and standard delivery. Certain premium customizations or priority delivery slots may have additional charges, but these are always clearly disclosed before you confirm your order."
                      },
                      {
                        question: "Do I need to download the app to subscribe?",
                        answer: "While our mobile app offers the best experience with features like delivery tracking and easy plan management, you can also subscribe and manage your meal plans through our website."
                      }
                    ]} 
                  />
                </TabsContent>

                <TabsContent value="meals" className="mt-0">
                  <FAQSection 
                    title="Meal Plans & Nutrition" 
                    questions={[
                      {
                        question: "What types of meal plans do you offer?",
                        answer: "We offer a variety of meal plans including Balanced, Weight Loss, High Protein, Vegan, Keto, Low-Carb, and more. Each plan is designed with specific nutritional profiles to suit different health and fitness goals."
                      },
                      {
                        question: "Can I switch my meal plan after subscribing?",
                        answer: "Yes, you can change your meal plan at any time through your account dashboard. Changes made before the cutoff time (usually 48 hours before delivery) will apply to your next delivery."
                      },
                      {
                        question: "Are the meals fresh or frozen?",
                        answer: "All our meals are prepared fresh daily by our partner vendors. We never use frozen meals, ensuring maximum nutrition and taste."
                      },
                      {
                        question: "Do you use organic ingredients?",
                        answer: "Many of our vendors use organic ingredients, and we label these meals accordingly. You can filter for organic options when selecting your meals."
                      },
                      {
                        question: "How do you ensure food safety and hygiene?",
                        answer: "We have strict quality control measures for all our vendor partners. Each kitchen is regularly audited for hygiene standards, and we ensure proper handling and packaging of all meals. Our delivery process maintains the appropriate temperature control until the meal reaches you."
                      },
                      {
                        question: "Can I request specific cuisines or meal preferences?",
                        answer: "Yes! You can set cuisine preferences in your profile, and our system will prioritize meals that match your taste preferences while still adhering to your nutritional requirements."
                      },
                      {
                        question: "Do you offer meal plans for medical conditions?",
                        answer: "We offer specialized meal plans for common conditions like diabetes, hypertension, and PCOS. However, for specific medical dietary requirements, we recommend consulting your healthcare provider first and then using our customization options."
                      },
                      {
                        question: "What portion sizes do you provide?",
                        answer: "Our portion sizes are calculated based on standard nutritional requirements, but can be adjusted based on your caloric needs and goals. You can specify smaller or larger portions during the customization process."
                      },
                      {
                        question: "Can I track my calorie intake with your meals?",
                        answer: "Absolutely! Each meal comes with a detailed nutritional breakdown, and our app allows you to track your daily and weekly nutritional intake across all meals."
                      },
                      {
                        question: "Do you provide information about allergens in meals?",
                        answer: "Yes, all meals are clearly labeled with allergen information. You can also set allergen restrictions in your profile to automatically exclude meals containing ingredients you need to avoid."
                      }
                    ]} 
                  />
                </TabsContent>

                <TabsContent value="customize" className="mt-0">
                  <FAQSection 
                    title="Customization & Dietary Preferences" 
                    questions={[
                      {
                        question: "Can I customize my meal plan?",
                        answer: "Yes, all meal plans can be customized. After selecting a base plan, you can modify specific meals, exclude ingredients, adjust portion sizes, and more through our customization interface."
                      },
                      {
                        question: "What if I have food allergies or specific dietary restrictions?",
                        answer: "During signup, you can specify your allergies and dietary restrictions. Our system will automatically filter out incompatible meals and ingredients. For severe allergies, we recommend checking meal ingredients carefully, as some meals are prepared in kitchens that handle various allergens."
                      },
                      {
                        question: "Do you offer gluten-free, keto, or vegan options?",
                        answer: "Yes, we offer dedicated meal plans for these dietary preferences. You can also apply these filters to any meal plan to ensure all your meals comply with your dietary requirements."
                      },
                      {
                        question: "Can I choose how many meals per day I receive?",
                        answer: "Absolutely! You can select from breakfast, lunch, dinner, and snack options, and choose to receive anywhere from one to five meals per day, depending on your needs."
                      },
                      {
                        question: "Do you allow ingredient swaps in meals?",
                        answer: "Yes, for most meals you can remove or swap certain ingredients. The available swaps will be shown during the customization process and may vary depending on the meal and vendor."
                      }
                    ]} 
                  />
                </TabsContent>

                <TabsContent value="delivery" className="mt-0">
                  <FAQSection 
                    title="Delivery Information" 
                    questions={[
                      {
                        question: "What areas do you deliver to?",
                        answer: "We currently deliver to major metropolitan areas across India. You can check delivery availability by entering your pincode on our website or app."
                      },
                      {
                        question: "How often are meals delivered?",
                        answer: "We offer daily, alternate day, or weekly delivery options depending on your subscription plan and preferences."
                      },
                      {
                        question: "What are your delivery hours?",
                        answer: "We deliver during three time slots: Early Morning (6-8 AM), Lunch (11 AM-1 PM), and Dinner (6-8 PM). You can select your preferred delivery time when signing up."
                      },
                      {
                        question: "Is there a delivery fee?",
                        answer: "Standard delivery is included in your subscription price. However, there may be a nominal delivery fee for certain remote areas or for priority delivery slots."
                      },
                      {
                        question: "How do you ensure meals stay fresh during delivery?",
                        answer: "All meals are packed in temperature-controlled, eco-friendly containers and delivered in insulated bags to maintain freshness. Our delivery system is optimized to ensure minimum transit time."
                      }
                    ]} 
                  />
                </TabsContent>

                <TabsContent value="vendors" className="mt-0">
                  <FAQSection 
                    title="Vendor Partners" 
                    questions={[
                      {
                        question: "Who prepares the meals?",
                        answer: "Meals are prepared by our network of vetted local restaurants, cloud kitchens, and professional chefs who specialize in healthy, nutritious cooking."
                      },
                      {
                        question: "How do you select vendor partners?",
                        answer: "We have a rigorous selection process that evaluates kitchen hygiene, ingredient quality, cooking methods, taste, and consistency. Only vendors who meet our high standards are invited to join our network."
                      },
                      {
                        question: "Can I choose specific vendors for my meals?",
                        answer: "Yes, you can favorite certain vendors, and our system will prioritize their meals in your recommendations. You can also exclude specific vendors if you prefer."
                      },
                      {
                        question: "I'm a restaurant owner. How can I become a vendor partner?",
                        answer: "We're always looking for quality food partners! Visit our Vendor Application page to learn about our requirements and submit your application."
                      }
                    ]} 
                  />
                </TabsContent>

                <TabsContent value="ai" className="mt-0">
                  <FAQSection 
                    title="AI Diet Planner" 
                    questions={[
                      {
                        question: "What is the AI Diet Planner?",
                        answer: "Our AI Diet Planner is an intelligent system that creates personalized meal plans based on your health goals, dietary preferences, lifestyle, and even genetic factors (if provided). It continuously learns from your feedback to optimize recommendations."
                      },
                      {
                        question: "How accurate are the AI recommendations?",
                        answer: "Our AI system is built on nutritional science and constantly updated with the latest research. While it provides highly personalized recommendations, they should complement, not replace, advice from healthcare professionals for medical conditions."
                      },
                      {
                        question: "Can I modify the AI-generated meal plan?",
                        answer: "Absolutely! The AI generates a recommended plan, but you have full control to modify it. Each modification helps the AI learn your preferences better for future recommendations."
                      },
                      {
                        question: "Do I need to pay extra for the AI Diet Planner?",
                        answer: "Basic AI Diet Planner features are included with all subscriptions. Premium features like detailed nutritional analysis, body composition tracking, and genetic-based recommendations are available with our premium subscription tiers."
                      }
                    ]} 
                  />
                </TabsContent>

                <TabsContent value="pricing" className="mt-0">
                  <FAQSection 
                    title="Pricing & Billing" 
                    questions={[
                      {
                        question: "How much does a meal plan cost?",
                        answer: "Our meal plans start at ₹2,000 per week for 10 meals. Pricing varies based on the number of meals, customization options, and delivery frequency. You can see detailed pricing on our Meal Plans page."
                      },
                      {
                        question: "Do you offer any discounts?",
                        answer: "Yes, we offer discounts for longer subscription commitments, referral bonuses, and occasional promotional offers. First-time users can enjoy a 20% discount on their first week."
                      },
                      {
                        question: "What payment methods do you accept?",
                        answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets. All payments are securely processed and encrypted."
                      },
                      {
                        question: "When am I charged for my subscription?",
                        answer: "For weekly plans, you're charged every 7 days. For monthly plans, you're charged on the same date each month. You'll receive a notification before each billing cycle."
                      },
                      {
                        question: "Do you offer refunds?",
                        answer: "We offer refunds if you're not satisfied with the quality of the meal or if there was an error with your order. Please report any issues within 2 hours of delivery through our app or website for prompt resolution."
                      }
                    ]} 
                  />
                </TabsContent>

                <TabsContent value="support" className="mt-0">
                  <FAQSection 
                    title="Customer Support" 
                    questions={[
                      {
                        question: "How can I contact customer support?",
                        answer: "You can reach our customer support team through the in-app chat, email at support@whatthefood.com, or by phone at our toll-free number 1800-123-4567. We're available from 8 AM to 10 PM daily."
                      },
                      {
                        question: "What if I have a complaint about a meal?",
                        answer: "We take food quality very seriously. If you're not satisfied with a meal, please report it through the app or website with a photo (if possible) within 2 hours of delivery. Our team will address your concern immediately."
                      },
                      {
                        question: "Do you have a satisfaction guarantee?",
                        answer: "Yes! We have a 100% satisfaction guarantee. If you're not happy with a meal for any reason, we'll offer a replacement or refund, no questions asked."
                      },
                      {
                        question: "How can I provide feedback on my meals?",
                        answer: "After each meal, you'll receive a notification to rate and review it in the app. This feedback helps us improve our service and helps the AI better understand your preferences."
                      }
                    ]} 
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQPage;
