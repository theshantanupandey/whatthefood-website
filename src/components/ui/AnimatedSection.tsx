
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 
    'fade-in' | 
    'fade-in-left' | 
    'fade-in-right' | 
    'blur-in' | 
    'scale-in' | 
    'slide-up' | 
    'rotate-in' | 
    'bounce-in' | 
    'flip-in' |
    'slide-down' |
    'zoom-in' |
    'pop-in' |
    'float-in' |
    'pulse-in';
  threshold?: number;
  duration?: 'fast' | 'normal' | 'slow' | 'very-slow';
}

const AnimatedSection = ({
  children,
  className,
  delay = 0,
  animation = 'fade-in',
  threshold = 0.15,
  duration = 'normal',
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const getDurationClass = () => {
    switch (duration) {
      case 'fast': return 'duration-500';
      case 'slow': return 'duration-1000';
      case 'very-slow': return 'duration-1500';
      default: return 'duration-700';
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      },
      {
        rootMargin: '0px',
        threshold: threshold,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [delay, threshold]);

  const getAnimationClass = () => {
    if (!isVisible) return '';
    
    switch (animation) {
      case 'fade-in': return 'animate-fade-in';
      case 'fade-in-left': return 'animate-fade-in-left';
      case 'fade-in-right': return 'animate-fade-in-right';
      case 'blur-in': return 'animate-blur-in';
      case 'scale-in': return 'animate-scale-in';
      case 'slide-up': return 'translate-y-16 animate-fade-in';
      case 'slide-down': return '-translate-y-16 animate-fade-in';
      case 'rotate-in': return 'rotate-6 animate-fade-in';
      case 'bounce-in': return 'scale-75 animate-scale-in';
      case 'flip-in': return 'rotate-x-90 animate-fade-in';
      case 'zoom-in': return 'scale-50 animate-scale-in';
      case 'pop-in': return 'scale-90 animate-scale-in';
      case 'float-in': return 'translate-y-8 animate-fade-in';
      case 'pulse-in': return 'scale-95 animate-scale-in';
      default: return 'animate-fade-in';
    }
  };

  return (
    <div
      ref={sectionRef}
      className={cn(
        'opacity-0 transition-all transform will-change-transform will-change-opacity',
        getAnimationClass(),
        getDurationClass(),
        className
      )}
      style={{
        animationFillMode: 'forwards',
        animationDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
