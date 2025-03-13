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

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500',
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
          className="lg:hidden"
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

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-white flex flex-col animate-in slide-in-from-top duration-500">
            <div className="px-4 pt-20 pb-6 flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'px-4 py-3 text-base font-medium transition-all duration-300 rounded-md hover:bg-primary/10 hover:translate-x-2',
                    location.pathname === item.href
                      ? 'bg-accent text-primary'
                      : 'text-foreground/80'
                  )}
                  onClick={(e) => {
                    // Prevent accidental clicks
                    if (e.target !== e.currentTarget) {
                      e.stopPropagation();
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="mt-4 w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-500 shadow-lg shadow-primary/20">
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
