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
                     

