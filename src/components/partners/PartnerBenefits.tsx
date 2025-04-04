
import React from 'react';
import { 
  Users, 
  Zap, 
  MessageSquare, 
  PlusCircle,
  Leaf,
  Globe
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PartnerBenefits = () => {
  const benefits = [
    {
      icon: Users,
      title: "Brand Exposure",
      description: "Reach a health-conscious audience through our platform, gaining visibility with customers who value quality and wellness."
    },
    {
      icon: Zap,
      title: "Marketing Collaboration",
      description: "Benefit from social media features, co-branded promotions, and influencer tie-ups to amplify your message."
    },
    {
      icon: MessageSquare,
      title: "Customer Engagement",
      description: "Gain direct access to thousands of What The Food subscribers who are actively engaged with our platform."
    },
    {
      icon: PlusCircle,
      title: "Custom Integration",
      description: "Feature your products in meal plans, blogs, and AI diet recommendations for seamless brand integration."
    },
    {
      icon: Leaf,
      title: "Sustainability Focus",
      description: "Align with a brand dedicated to clean eating, wellness, and sustainable practices that consumers trust."
    },
    {
      icon: Globe,
      title: "Market Insights",
      description: "Access valuable insights about consumer preferences and trends in the health food market."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-display mb-4">Why Partner with Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the benefits of collaborating with What The Food and how we can help elevate your brand.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index}>
              <CardHeader>
                <benefit.icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerBenefits;
