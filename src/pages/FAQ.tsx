
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
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

const FAQPage = () => {
  return (
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
                  title="Delivery & Service Areas" 
                  questions={[
                    {
                      question: "How does delivery work?",
                      answer: "We deliver your meals fresh daily (or according to your selected schedule). You'll receive a notification when your meal is on the way, and you can track the delivery in real-time through our app."
                    },
                    {
                      question: "What cities do you currently operate in?",
                      answer: "We currently serve major metropolitan areas including Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Pune, and Kolkata. We're continuously expanding to new cities."
                    },
                    {
                      question: "Can I choose specific delivery times?",
                      answer: "Yes, you can select from available delivery time slots for each meal. Morning deliveries typically occur between 6-9 AM, lunch between 11 AM-1 PM, and dinner between 6-8 PM."
                    },
                    {
                      question: "What happens if I'm not home when my meal is delivered?",
                      answer: "Our delivery partners will attempt to contact you. If you're unavailable, they can leave the meal with your security guard or a neighbor (if you've pre-approved this option), or they can return later during a time window you specify."
                    },
                    {
                      question: "Do you deliver on weekends and holidays?",
                      answer: "Yes, we operate 7 days a week, including holidays. You can customize your delivery schedule to include or exclude specific days."
                    },
                    {
                      question: "Is there a delivery fee?",
                      answer: "Standard delivery is included in your subscription cost. For special delivery requests or remote locations, additional fees may apply."
                    },
                    {
                      question: "How can I track my meal deliveries?",
                      answer: "You can track your deliveries in real-time through our mobile app. You'll receive notifications when your meal is being prepared, when it's out for delivery, and when it's about to arrive."
                    }
                  ]} 
                />
              </TabsContent>

              <TabsContent value="vendors" className="mt-0">
                <FAQSection 
                  title="Vendor & Cloud Kitchen Partnerships" 
                  questions={[
                    {
                      question: "How can I become a vendor on What The Food?",
                      answer: "Visit our Vendors page to start the application process. We'll review your kitchen facilities, menu options, and ensure your operations meet our quality and hygiene standards."
                    },
                    {
                      question: "What are the benefits of partnering with What The Food?",
                      answer: "As a vendor partner, you'll gain access to a new customer base, predictable order volumes, simplified logistics, and technology to streamline your operations. We also provide data insights to help optimize your menu and operations."
                    },
                    {
                      question: "Do I need a cloud kitchen to join as a vendor?",
                      answer: "While cloud kitchens are ideal, traditional restaurants can also partner with us as long as you have the capacity to prepare meal plan orders alongside your regular operations."
                    },
                    {
                      question: "How does the payment process work for vendors?",
                      answer: "Vendors receive weekly settlements for all meals prepared. Our transparent dashboard shows order details, customer feedback, and payment information."
                    },
                    {
                      question: "Can restaurants and tiffin services also join?",
                      answer: "Yes, we welcome restaurants and established tiffin services that can meet our quality standards and prepare meals according to our nutritional guidelines."
                    }
                  ]} 
                />
              </TabsContent>

              <TabsContent value="ai" className="mt-0">
                <FAQSection 
                  title="AI Diet Planner & Personalization" 
                  questions={[
                    {
                      question: "How does the AI Diet Planner work?",
                      answer: "Our AI Diet Planner analyzes your health profile, dietary preferences, fitness goals, and lifestyle factors to recommend personalized meal plans. It considers factors like BMI, activity level, existing health conditions, and food preferences to suggest the optimal nutritional approach."
                    },
                    {
                      question: "Can the AI help me choose a plan based on my fitness goals?",
                      answer: "Absolutely! Whether your goal is weight loss, muscle gain, improved endurance, or general wellness, our AI can recommend suitable meal plans and specific nutritional targets to help you achieve your fitness objectives."
                    },
                    {
                      question: "Is the AI Diet Planner free to use?",
                      answer: "Yes, the basic AI Diet Planner is free for all users. For advanced features like detailed nutritional analysis and integration with fitness trackers, we offer premium subscription options."
                    },
                    {
                      question: "Does the AI take into account my medical conditions?",
                      answer: "The AI can accommodate common health conditions like diabetes, hypertension, and cholesterol management. However, for specific medical dietary requirements, we recommend consulting your healthcare provider and using their guidance to customize your plan."
                    },
                    {
                      question: "How accurate is the AI's nutritional recommendation?",
                      answer: "Our AI is trained on extensive nutritional data and updated regularly with the latest research. While it provides scientifically-backed recommendations, individual results may vary. We continuously refine our algorithms based on customer feedback and outcomes."
                    },
                    {
                      question: "Can I integrate the AI diet planner with Google Fit or Apple Health?",
                      answer: "Yes, our premium version offers integration with popular fitness apps and wearables, allowing the AI to adjust recommendations based on your activity levels and health metrics."
                    }
                  ]} 
                />
              </TabsContent>

              <TabsContent value="pricing" className="mt-0">
                <FAQSection 
                  title="Pricing & Payments" 
                  questions={[
                    {
                      question: "How much do meal plans cost?",
                      answer: "Our meal plans start at ₹1,500 per week for basic plans, with premium and highly customized plans ranging from ₹2,000 to ₹3,500 per week. The exact cost depends on the number of meals per day, level of customization, and specific dietary requirements."
                    },
                    {
                      question: "Do you offer discounts for long-term subscriptions?",
                      answer: "Yes, we offer discounts of 10% for monthly subscriptions and 15% for quarterly subscriptions, compared to the weekly rate."
                    },
                    {
                      question: "What payment methods do you accept?",
                      answer: "We accept credit/debit cards, UPI payments, net banking, and popular digital wallets. For long-term subscriptions, we also offer EMI options with select banks."
                    },
                    {
                      question: "Can I pay in installments?",
                      answer: "Yes, for quarterly and longer subscriptions, we offer EMI options through our banking partners. Details are available at checkout."
                    },
                    {
                      question: "Do you offer refunds if I'm not satisfied with the service?",
                      answer: "We have a satisfaction guarantee for first-time customers. If you're not satisfied with your first week of meals, contact our customer support for a full refund. For ongoing subscriptions, we handle issues on a case-by-case basis and may offer credits or partial refunds for legitimate quality concerns."
                    }
                  ]} 
                />
              </TabsContent>

              <TabsContent value="support" className="mt-0">
                <FAQSection 
                  title="Support & Assistance" 
                  questions={[
                    {
                      question: "How do I contact customer support?",
                      answer: "You can reach our customer support team via live chat on our website and app, email at support@whatthefood.com, or phone at +1 (555) 123-4567. We're available 7 days a week from 8 AM to 10 PM."
                    },
                    {
                      question: "Can I speak to a nutritionist before choosing a meal plan?",
                      answer: "Yes, premium subscribers can schedule a consultation with one of our certified nutritionists. We also offer a brief complimentary consultation for new customers to help them choose the right meal plan."
                    },
                    {
                      question: "What should I do if I receive the wrong meal?",
                      answer: "If you receive an incorrect meal, please report it immediately through the app or by contacting customer support. We'll arrange for the correct meal to be delivered as soon as possible, and credit your account accordingly."
                    },
                    {
                      question: "How do I report an issue with my order?",
                      answer: "You can report issues directly through our app by selecting the order and clicking 'Report an Issue,' or by contacting customer support. Please provide photos when possible to help us resolve the issue more effectively."
                    },
                    {
                      question: "Do you offer gift cards or referral bonuses?",
                      answer: "Yes! You can purchase digital gift cards for friends and family through our website or app. We also have a referral program that rewards you with credits when someone you refer subscribes to a meal plan."
                    }
                  ]} 
                />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="text-center mt-16 mb-8 bg-accent p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6 text-muted-foreground">Our customer support team is ready to help you with any other questions you might have.</p>
          <Link to="/contact" className="inline-block bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

// FAQ Section component to display an accordion of questions
const FAQSection = ({ title, questions }: { title: string, questions: { question: string, answer: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-4">
        {questions.map((item, index) => (
          <div key={index} className="border border-border rounded-lg overflow-hidden">
            <button
              className={cn(
                "w-full text-left p-4 flex justify-between items-center",
                openIndex === index ? "bg-muted" : "bg-card"
              )}
              onClick={() => toggleQuestion(index)}
            >
              <span className="font-medium">{item.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-primary" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            {openIndex === index && (
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

export default FAQPage;
