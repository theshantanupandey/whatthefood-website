
import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {/* Hero section */}
        <section className="pt-24 pb-12 bg-secondary">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="max-w-3xl mx-auto text-center">
                <div className="badge badge-primary mb-4">Our Story</div>
                <h1 className="mb-6">
                  About <span className="text-primary">What The Food</span>
                </h1>
                <p className="text-lg text-muted-foreground">
                  We're on a mission to make healthy eating accessible, convenient, and delicious for everyone.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Mission & Vision section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="fade-in-left">
                <img
                  src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Our mission"
                  className="rounded-3xl shadow-lg"
                />
              </AnimatedSection>

              <AnimatedSection animation="fade-in-right">
                <div>
                  <h2 className="mb-6">Our Mission & Vision</h2>
                  <p className="text-muted-foreground mb-6">
                    At What The Food, we believe that nutritious food should be accessible to everyone, regardless of how busy their lifestyle is. Our mission is to revolutionize how people approach daily nutrition by providing convenient, chef-prepared meals that never compromise on health, quality, or taste.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    We envision a world where healthy eating isn't a chore but a seamless part of everyday life. By removing the barriers of meal planning, grocery shopping, and cooking, we empower our customers to maintain a balanced diet without the stress.
                  </p>
                  <Button className="button-hover-effect">Learn About Our Values</Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Story section */}
        <section className="py-16 bg-secondary/50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="mb-6">How We Started</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground">
                  What The Food was born from a personal struggle that many of us face: wanting to eat healthier but lacking the time to shop for groceries and prepare meals from scratch.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8">
                <p className="text-muted-foreground mb-6">
                  Our founder, Alex Chen, was working long hours as a financial consultant when he realized his diet consisted mainly of takeout and processed foods. Determined to improve his health without sacrificing his career, he began searching for a solution that would provide nutritious, ready-to-eat meals.
                </p>
                <p className="text-muted-foreground mb-6">
                  When he couldn't find exactly what he was looking for, he decided to create it himself. In 2018, Alex teamed up with nutritionist Maria Lopez and chef David Kim to launch What The Food. What started as a small operation serving professionals in downtown areas has now grown into a comprehensive meal delivery service available across multiple cities.
                </p>
                <p className="text-muted-foreground">
                  Today, we serve thousands of customers daily, helping them maintain healthy eating habits without compromising on taste or convenience. Our team has expanded to include nutrition experts, culinary professionals, and tech innovators all working together to revolutionize how people approach their daily nutrition.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Team section (placeholder) */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="mb-6">Meet Our Team</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground">
                  The passionate people behind What The Food who work tirelessly to bring healthy, delicious meals to your doorstep.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* This would be populated with actual team members */}
              {[1, 2, 3].map((idx) => (
                <AnimatedSection key={idx} delay={idx * 100}>
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/${idx % 2 === 0 ? 'women' : 'men'}/${idx + 10}.jpg`}
                      alt="Team member"
                      className="w-full h-64 object-cover" 
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-1">Team Member Name</h3>
                      <p className="text-primary mb-4">Position</p>
                      <p className="text-muted-foreground">Brief description about this team member and their role at What The Food.</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Impact & Future section */}
        <section className="py-16 bg-accent">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection animation="fade-in-left">
                <div>
                  <h2 className="mb-6">Our Impact & Future Goals</h2>
                  <p className="text-muted-foreground mb-6">
                    Since our founding, we've delivered over 1 million healthy meals, helping our customers save countless hours of meal planning, grocery shopping, and cooking. We've partnered with local farms to source fresh ingredients, reducing food miles and supporting local economies.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Looking ahead, we're committed to expanding our service to more cities, developing new meal plans based on the latest nutritional research, and continuing to innovate our delivery and packaging systems to minimize environmental impact.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Our ultimate goal is to make healthy eating the easiest choice for everyone, regardless of their lifestyle or dietary preferences.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-right">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Future vision"
                    className="rounded-3xl shadow-lg"
                  />
                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md max-w-xs">
                    <h4 className="text-lg font-semibold mb-2">Sustainability Commitment</h4>
                    <p className="text-sm text-muted-foreground">
                      We're transitioning to 100% eco-friendly packaging by 2024 and working toward carbon-neutral operations.
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
