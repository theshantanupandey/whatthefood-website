
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: 'fade-in' | 'fade-in-left' | 'fade-in-right' | 'blur-in' | 'scale-in';
}

const AnimatedSection = ({
  children,
  className,
  delay = 0,
  animation = 'fade-in',
}: AnimatedSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
        threshold: 0.15,
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
  }, [delay]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        'opacity-0',
        {
          'animate-fade-in': isVisible && animation === 'fade-in',
          'animate-fade-in-left': isVisible && animation === 'fade-in-left',
          'animate-fade-in-right': isVisible && animation === 'fade-in-right',
          'animate-blur-in': isVisible && animation === 'blur-in',
          'animate-scale-in': isVisible && animation === 'scale-in',
        },
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
