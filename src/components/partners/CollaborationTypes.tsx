
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

const CollaborationTypes = () => {
  return (
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
  );
};

export default CollaborationTypes;
