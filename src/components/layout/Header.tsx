import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Meal Plans', href: '/meal-plans' },
    { name: 'Customize', href: '/customize' },
    { name: 'Vendors', href: '/vendors' },
    { name: 'AI Diet Planner', href: '/ai-diet-planner' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100/70 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-display font-bold tracking-tighter">
            What<span className="text-primary">The</span>Food
          </span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'text-sm font-medium transition-colors duration-200 hover:text-primary',
                location.pathname === item.href
                  ? 'text-primary'
                  : 'text-foreground/80'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>

        <Button className="hidden lg:flex button-hover-effect">
          Download App
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-white flex flex-col animate-fade-in">
            <div className="px-4 pt-20 pb-6 flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'px-4 py-3 text-base font-medium transition-colors duration-200 rounded-md',
                    location.pathname === item.href
                      ? 'bg-accent text-primary'
                      : 'text-foreground/80 hover:bg-secondary'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="mt-4 w-full button-hover-effect">
                Download App
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
