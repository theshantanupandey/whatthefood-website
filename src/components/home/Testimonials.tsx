
import { useState } from 'react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    content: "What The Food has completely transformed my eating habits. I save so much time not having to meal prep, and the food is absolutely delicious!",
    author: "Sarah Johnson",
    role: "Busy Professional",
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    content: "As a fitness enthusiast, I need proper nutrition to fuel my workouts. The High Protein plan gives me exactly what I need, and it tastes amazing!",
    author: "Michael Chen",
    role: "Fitness Trainer",
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    content: "The Keto meal plan has been a game-changer for my weight loss journey. Delicious food that keeps me in ketosis without the hassle of cooking.",
    author: "Jessica Rivera",
    role: "Marketing Executive",
    image: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 4,
    content: "I've tried many meal delivery services, but What The Food stands out for quality and taste. The AI Diet Planner feature is incredible!",
    author: "David Thompson",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/4.jpg"
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-24 bg-accent">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="badge badge-primary mb-4">Customer Stories</div>
            <h2 className="mb-6">What Our <span className="text-primary">Customers Say</span></h2>
            <p className="max-w-3xl mx-auto text-muted-foreground">
              Don't just take our word for it. Here's what our customers have to say about their
              experience with What The Food's meal delivery service.
            </p>
          </div>
        </AnimatedSection>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                      <div className="flex-shrink-0">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20" 
                        />
                      </div>
                      <div>
                        <div className="flex mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current text-yellow-500" />
                          ))}
                        </div>
                        <p className="text-lg italic mb-6">{`"${testimonial.content}"`}</p>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full"
              onClick={nextTestimonial}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === activeIndex 
                    ? 'bg-primary scale-110' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
                onClick={() => setActiveIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
