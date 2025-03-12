import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Linkedin, Instagram, Twitter } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/button';
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div className="min-h-screen flex flex-col">
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
                <img alt="Our mission" className="rounded-3xl shadow-lg" src="https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
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
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-accent/70 rounded-full px-4 py-2">
                      <span className="text-primary font-medium">Convenience</span>
                    </div>
                    <div className="flex items-center gap-2 bg-accent/70 rounded-full px-4 py-2">
                      <span className="text-primary font-medium">Nutrition</span>
                    </div>
                    <div className="flex items-center gap-2 bg-accent/70 rounded-full px-4 py-2">
                      <span className="text-primary font-medium">Quality</span>
                    </div>
                    <div className="flex items-center gap-2 bg-accent/70 rounded-full px-4 py-2">
                      <span className="text-primary font-medium">Sustainability</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Founders' Story section */}
        <section className="py-16 bg-secondary/50">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="mb-6">The Founders' Story</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground">
                  What The Food was born from a personal struggle that many of us face: wanting to eat healthier but lacking the time to shop for groceries and prepare meals from scratch.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <AnimatedSection animation="fade-in-left" delay={200}>
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h3 className="text-2xl font-semibold mb-4">How It All Started</h3>
                  <p className="text-muted-foreground mb-6">
                    Our co-founders, Alex Chen and Maria Lopez, met while working at a tech startup in San Francisco. Both were struggling with the same problem: long work hours left little time to prepare healthy meals, leading to frequent takeout and convenience foods.
                  </p>
                  <p className="text-muted-foreground">The constant challenge of balancing studies with the need for nutritious food led to the vision of What The Food—an affordable, hygienic, and convenient meal service designed for students and working professionals alike.</p>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-right" delay={300}>
                <div className="relative">
                  <img src="https://images.unsplash.com/photo-1583848547295-0cb991c31d88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Our founders" className="rounded-2xl shadow-lg" />
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-6 max-w-[260px]">
                    <p className="text-sm italic text-muted-foreground">"i started What The Food because we believe everyone deserves access to healthy, convenient meals that don't compromise on taste or nutrition."</p>
                    <p className="text-primary font-medium mt-3">— Shantanu Pandey, Founder</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Impact section */}
        <section className="py-16">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="mb-6">Our Impact</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground">
                  Since launching What The Food, we've been making a difference in how people approach their nutrition and daily lives.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <AnimatedSection delay={100}>
                <div className="bg-white rounded-2xl shadow-sm p-8 h-full">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-6">
                    <span className="text-primary text-lg font-bold">100+</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Meals Delivered</h3>
                  <p className="text-muted-foreground">
                    We've delivered over a million healthy, chef-prepared meals, helping our customers save countless hours of meal planning, grocery shopping, and cooking.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={200}>
                <div className="bg-white rounded-2xl shadow-sm p-8 h-full">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-6">
                    <span className="text-primary text-lg font-bold">10+</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Local Partners</h3>
                  <p className="text-muted-foreground">
                    We've partnered with local farms and suppliers to source fresh, sustainable ingredients, reducing food miles and supporting local economies.
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <div className="bg-white rounded-2xl shadow-sm p-8 h-full">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-6">
                    <span className="text-primary text-lg font-bold">90%</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Customer Satisfaction</h3>
                  <p className="text-muted-foreground">
                    Our dedication to quality and service has resulted in a 90% customer satisfaction rate, with many users reporting improved dietary habits and overall wellbeing.
                  </p>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={400}>
              <div className="mt-16 text-center">
                <Button className="button-hover-effect" asChild>
                  <Link to="/meal-plans">
                    Explore Our Meal Plans
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Contact Information section */}
        <section className="py-16 bg-accent/70">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <AnimatedSection>
              <div className="text-center mb-12">
                <h2 className="mb-6">Get In Touch</h2>
                <p className="max-w-3xl mx-auto text-muted-foreground">
                  Have questions about What The Food? We're here to help! Reach out to our team through any of the channels below.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <AnimatedSection animation="fade-in-left">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Email Us</h4>
                        <p className="text-muted-foreground">support@whatthefood.in</p>
                        <p className="text-sm text-muted-foreground mt-1">We aim to respond within 24 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-medium mb-1">Call Us</h4>
                        <p className="text-muted-foreground">(991)-545-5931</p>
                        <p className="text-sm text-muted-foreground mt-1">Mon-Sat: 9am-6pm IST</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Follow Us</h4>
                      <div className="flex gap-4">
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                          <Instagram className="w-5 h-5" />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                          <Twitter className="w-5 h-5" />
                        </a>
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-right">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                  <img src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Our office" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-white text-xl font-semibold mb-2">Visit Our Office</h3>
                    <p className="text-white/90">TBI , Chandigarh University, Mohali
Punjab 140301</p>
                    <Button variant="outline" className="mt-4 bg-white/90 text-foreground hover:bg-white w-fit">
                      Get Directions
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default About;