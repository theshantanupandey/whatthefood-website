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

  // Simple body scroll lock that doesn't mess with the scroll position
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 w-full z-40 transition-all duration-500',
          isScrolled
            ? 'bg-white/60 backdrop-blur-lg shadow-sm border-b border-gray-100/70 py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <span className="text-xl font-display font-bold tracking-tighter relative">
              What<span className="text-primary group-hover:animate-pulse transition-all duration-500">The</span>Food
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-primary',
                  location.pathname === item.href
                    ? 'text-primary after:w-full'
                    : 'text-foreground/80'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>

          {/* Download App Button (Desktop) */}
          <Button className="hidden lg:flex button-hover-effect bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-500 shadow-lg shadow-primary/20">
            Download App
          </Button>
        </div>
      </header>

      {/* Mobile Navigation - Completely separate from the header */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-30 lg:hidden overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="sticky top-0 left-0 right-0 bg-white border-b border-gray-100 px-4 py-4 flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="text-xl font-display font-bold tracking-tighter relative">
                What<span className="text-primary">The</span>Food
              </span>
            </Link>
          </div>
          
          {/* Mobile Menu Content */}
          <div className="px-4 py-6 flex flex-col space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'px-4 py-3 text-base font-medium transition-all duration-300 rounded-md hover:bg-primary/10',
                  location.pathname === item.href
                    ? 'bg-accent text-primary'
                    : 'text-foreground/80'
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button 
              className="mt-4 w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-500 shadow-lg shadow-primary/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Download App
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
