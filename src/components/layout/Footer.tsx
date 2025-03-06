
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Linkedin, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-secondary pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-gray-200/70">
          {/* Logo and Description */}
          <div className="md:col-span-4">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-display font-bold tracking-tighter">
                What<span className="text-primary">The</span>Food
              </span>
            </Link>
            <p className="text-muted-foreground mb-6">
              Fresh, nutritious, and hassle-free meal plans delivered daily to your doorstep.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h5 className="font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h5>
            <ul className="space-y-3">
              {['About', 'Meal Plans', 'Customize', 'AI Diet Planner'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h5 className="font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h5>
            <ul className="space-y-3">
              {['Blog', 'FAQ', 'Partners', 'Vendors'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <h5 className="font-semibold mb-4 text-sm uppercase tracking-wider">Newsletter</h5>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for weekly health tips and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <Button className="rounded-l-none">Subscribe</Button>
            </div>
            <div className="mt-6 space-y-2">
              <a href="#" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@whatthefood.com</span>
              </a>
              <a href="#" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} What The Food. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
