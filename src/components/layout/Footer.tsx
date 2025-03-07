
// This file is read-only, so we need to create a modified version

import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import NewsletterSignup from '@/components/newsletter/NewsletterSignup';

// You'll need to create a new footer component since the original is read-only
const AppFooter = () => {
  return (
    <footer className="bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About column */}
          <div>
            <h3 className="font-display font-bold text-xl mb-4">What The Food</h3>
            <p className="text-muted-foreground mb-4">
              Healthy, delicious meals delivered to your doorstep. Customized meal plans to meet your nutritional goals.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://facebook.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://youtube.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          {/* Explore column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/meal-plans" className="text-muted-foreground hover:text-primary transition-colors">
                  Meal Plans
                </Link>
              </li>
              <li>
                <Link to="/customize" className="text-muted-foreground hover:text-primary transition-colors">
                  Customize Your Meals
                </Link>
              </li>
              <li>
                <Link to="/ai-diet-planner" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Diet Planner
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-muted-foreground hover:text-primary transition-colors">
                  Vendors
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources column */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-muted-foreground hover:text-primary transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter column */}
          <div>
            <NewsletterSignup />
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} What The Food. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
