import { useState } from 'react';
import { Mail, Phone, Clock, Send, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible."
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        {/* Page Header */}
        <div className="bg-accent py-12 mb-12">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
            <p className="text-lg text-center text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We're here to help. Reach out to our team using the contact information below.
            </p>
          </div>
        </div>
        
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Customer Support</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-muted-foreground">support@whatthefood.in</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-muted-foreground">+91 (991) 545-5931</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-primary mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Working Hours</p>
                      <p className="text-muted-foreground">Monday - Friday: 6AM - 12PM IST</p>
                      <p className="text-muted-foreground">Saturday: 10AM - 4PM EST</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
                <p className="text-muted-foreground mb-4">
                  Follow us on social media for the latest updates, health tips, and special promotions.
                </p>
                <div className="flex space-x-4">
                  <a href="https://instagram.com/whatthefoodin" target="_blank" rel="noopener noreferrer" className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://x.com/whatthefood_in" target="_blank" rel="noopener noreferrer" className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/company/whatthefood" target="_blank" rel="noopener noreferrer" className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">For Business Inquiries</h3>
                <p className="text-muted-foreground mb-3">
                  Interested in partnering with WhatTheFood or becoming a vendor?
                </p>
                <p className="font-medium">Email: partnerships@whatthefood.in</p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can we help you?" required />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} placeholder="Tell us about your inquiry..." className="w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" required />
                </div>
                
                <Button type="submit" disabled={isSubmitting} className="w-full button-hover-effect">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Map or Additional Info Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">Visit Our Office</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Our headquarters is located in TBI Chandigarh University. Feel free to visit us during business hours!</p>
            <div className="rounded-lg overflow-hidden h-[400px] bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Map placeholder - Chandigarh University , Mohali , Punjab, 140301</p>
              {/* In a real implementation, you would embed a Google Map or similar here */}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default Contact;