
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const PartnerShowcase = () => {
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

  return (
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
  );
};

export default PartnerShowcase;
