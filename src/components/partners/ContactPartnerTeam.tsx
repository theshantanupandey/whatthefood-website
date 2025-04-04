
import React from 'react';
import { Mail, Phone, Linkedin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

const ContactPartnerTeam = () => {
  return (
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
  );
};

export default ContactPartnerTeam;
