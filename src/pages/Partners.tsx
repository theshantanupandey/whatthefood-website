
import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  Award, 
  Users, 
  Zap, 
  Globe, 
  Leaf, 
  MessageSquare, 
  PlusCircle,
  Mail,
  Phone,
  Linkedin
} from 'lucide-react';
import { ensureRequiredBuckets } from '@/utils/setupBuckets';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PartnerApplicationForm from '@/components/partners/PartnerApplicationForm';

const Partners = () => {
  useEffect(() => {
    ensureRequiredBuckets().catch(err => {
      console.error('Error setting up buckets:', err);
    });
  }, []);

  const partners = [
    { name: 'Organic Harvest', logo: 'https://images.unsplash.com/photo-1587336123775-6d4176e36194?q=80&w=580&auto=format&fit=crop' },
    { name: 'FitLife Nutrition', logo: 'https://images.unsplash.com/photo-1574339940092-a20deb352ec5?q=80&w=580&auto=format&fit=crop' },
    { name: 'Green Kitchen', logo: 'https://images.unsplash.com/photo-1627905646269-7f034dcc7987?q=80&w=580&auto=format&fit=crop' },
    { name: 'Wellness Daily', logo: 'https://images.unsplash.com/photo-1589544421314-2d8cfde721e0?q=80&w=580&auto=format&fit=crop' },
    { name: 'Pure Protein', logo: 'https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?q=80&w=580&auto=format&fit=crop' },
    { name: 'EcoPackage', logo: 'https://images.unsplash.com/photo-1625650484619-d6e7e92e1905?q=80&w=580&auto=format&fit=crop' },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Organic Harvest',
      quote: 'Partnering with What The Food has increased our brand visibility by 40% among health-conscious consumers. Their customer base aligns perfectly with our target market.',
    },
    {
      name: 'Michael Chen',
      company: 'FitLife Nutrition',
      quote: "The collaborative marketing campaigns we've run with What The Food have generated exceptional engagement. Their team is professional and truly understands how to showcase partner brands effectively.",
    },
  ];

  const successStory = {
    company: 'Green Kitchen',
    title: 'How Green Kitchen Increased Sales by 35%',
    description: 'Green Kitchen partnered with What The Food to feature their sustainable kitchen products in meal plan packages. Through strategic product placement and co-branded content, they reached over 10,000 new customers in just three months.',
    results: ['35% increase in quarterly sales', '10,000+ new customer reach', '67% higher engagement on social media'],
  };

  return (
    <>
      <Header />
      
      <section className="relative bg-gradient-to-r from-primary/10 to-primary/5 pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
                Partner with What The Food: Elevate Your Brand with Healthy Living!
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join forces with us to bring quality nutrition, sustainability, and convenience to our customers.
              </p>
              <Button size="lg" asChild>
                <a href="#partner-form">Become a Partner</a>
              </Button>
            </div>
            <div className="flex justify-center">
              <img 
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1170&auto=format&fit=crop" 
                alt="Brand Collaboration" 
                className="rounded-lg shadow-lg max-w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">Why Partner with Us?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the benefits of collaborating with What The Food and how we can help elevate your brand.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Brand Exposure</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Reach a health-conscious audience through our platform, gaining visibility with customers who value quality and wellness.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Zap className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Marketing Collaboration</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Benefit from social media features, co-branded promotions, and influencer tie-ups to amplify your message.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <MessageSquare className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Customer Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Gain direct access to thousands of What The Food subscribers who are actively engaged with our platform.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <PlusCircle className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Custom Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Feature your products in meal plans, blogs, and AI diet recommendations for seamless brand integration.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Leaf className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Sustainability Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Align with a brand dedicated to clean eating, wellness, and sustainable practices that consumers trust.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Access valuable insights about consumer preferences and trends in the health food market.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-secondary">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">Our Current Brand Partners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join these successful brands that have already partnered with What The Food.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-12">
            {partners.map((partner, index) => (
              <div key={index} className="bg-card p-4 rounded-lg shadow-sm flex items-center justify-center">
                <div className="text-center">
                  <img 
                    src={partner.logo} 
                    alt={partner.name} 
                    className="h-16 w-auto mx-auto mb-2 object-cover rounded" 
                  />
                  <p className="text-sm font-medium">{partner.name}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-primary/10">
                <CardContent className="pt-6">
                  <p className="italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <div className="bg-primary/10 rounded-full p-2 mr-3">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">How We Collaborate</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the various ways your brand can partner with What The Food.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Food & Beverage Brands</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Feature healthy snacks, beverages, or supplements in our meal plans, introducing your products to customers looking for nutritious options.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Fitness & Wellness Brands</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Engage in cross-promotions, sponsored content, and fitness app integrations that complement our healthy meal offerings.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Kitchen & Sustainability Brands</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Collaborate on eco-friendly packaging solutions, kitchenware promotions, and sustainable product features.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Corporate & Institutional Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Develop customized meal plans for offices, schools, and hospitals, creating healthier environments for work and learning.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-primary/5">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">Success Story</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See how our partners have achieved remarkable results through collaboration.
            </p>
          </div>
          
          <Card className="border-primary/20 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-4">{successStory.title}</h3>
                <p className="mb-6">{successStory.description}</p>
                <h4 className="font-semibold mb-2">Key Results:</h4>
                <ul className="space-y-2">
                  {successStory.results.map((result, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1170&auto=format&fit=crop" 
                  alt="Success Story" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      <section id="partner-form" className="py-16 bg-background">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">Get Involved: Partner Application</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to join our community of brand partners? Fill out the form below to get started.
            </p>
          </div>
          
          <PartnerApplicationForm />
        </div>
      </section>
      
      <section className="py-16 bg-secondary">
        <div className="container max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">FAQs for Potential Partners</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Common questions about partnering with What The Food.
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                question: "What types of brands can partner with What The Food?",
                answer: "We welcome partnerships with food & beverage brands, fitness & wellness brands, kitchen & sustainability brands, and corporate & institutional partners. If your brand aligns with our values of health, nutrition, and sustainability, we'd love to collaborate."
              },
              {
                question: "How does co-branding work?",
                answer: "Co-branding can take many forms, including joint marketing campaigns, branded meal plans, exclusive offers for our customers, and featured content in our blog and social media. We work closely with partners to create customized co-branding strategies that benefit both parties."
              },
              {
                question: "Can I offer special discounts to What The Food subscribers?",
                answer: "Yes! Offering exclusive discounts to our subscribers is a great way to introduce your brand and products to our audience. We can feature your special offers in our newsletters, app notifications, and meal plan packages."
              },
              {
                question: "What is the process after I submit my partnership application?",
                answer: "After submission, our partnerships team will review your application and get back to you within 5 business days. If there's potential for collaboration, we'll schedule a call to discuss possibilities, goals, and next steps."
              },
              {
                question: "Is there a partnership fee or commission model?",
                answer: "Our partnership structures vary based on the type of collaboration. Some partnerships operate on a commission model, while others may involve flat fees or mutual promotion agreements. We'll discuss the most suitable arrangement during our initial conversations."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-background">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-display mb-4">Contact Our Partnerships Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or need more information? Our dedicated partnerships team is here to help.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Mail className="h-10 w-10 mx-auto text-primary mb-4" />
                <CardTitle className="mb-2">Email</CardTitle>
                <p className="text-muted-foreground">
                  <a href="mailto:partnerships@whatthefood.com" className="hover:text-primary transition-colors">
                    partnerships@whatthefood.com
                  </a>
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Phone className="h-10 w-10 mx-auto text-primary mb-4" />
                <CardTitle className="mb-2">Phone</CardTitle>
                <p className="text-muted-foreground">
                  <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                    +91 987 654 3210
                  </a>
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Linkedin className="h-10 w-10 mx-auto text-primary mb-4" />
                <CardTitle className="mb-2">LinkedIn</CardTitle>
                <p className="text-muted-foreground">
                  <a href="#" className="hover:text-primary transition-colors">
                    What The Food Business
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Partners;
