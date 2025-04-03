
import { useState, useEffect } from 'react';
import { Mail, Phone, Clock, Send, Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { 
  submitContactForm, 
  contactFormSchema, 
  saveContactFormProgress,
  getContactFormProgress,
  clearContactFormProgress,
  type ContactFormData 
} from '@/services/contactService';
import { useFormWithSavedProgress } from '@/hooks/useFormWithSavedProgress';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { EnhancedFormField } from '@/components/ui/enhanced-form-field';
import { trackFormEvent } from '@/services/analyticsService';
import { sanitizeString } from '@/utils/sanitizeInput';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with saved progress capability
  const form = useFormWithSavedProgress<ContactFormData>({
    formId: 'contact-form',
    schema: contactFormSchema,
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    onSaveProgress: (values) => {
      saveContactFormProgress(values);
    }
  });

  // Check for saved progress on mount
  useEffect(() => {
    const savedProgress = getContactFormProgress();
    if (savedProgress) {
      // Populate form with saved data
      Object.keys(savedProgress).forEach(key => {
        const fieldKey = key as keyof ContactFormData;
        if (savedProgress[fieldKey]) {
          form.setValue(fieldKey, savedProgress[fieldKey] as any);
        }
      });
      
      // Track that the user resumed a form
      trackFormEvent({
        formId: 'contact-form',
        eventType: 'resumed'
      }).catch(console.error);
      
      // Notify the user that we've restored their progress
      toast({
        title: "Form Progress Restored",
        description: "We've loaded your previously saved information.",
      });
    }
  }, [form, toast]);

  // Track when form starts being filled
  useEffect(() => {
    trackFormEvent({
      formId: 'contact-form',
      eventType: 'started'
    }).catch(console.error);
  }, []);

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Submit form data to Supabase using the contactService
      const result = await submitContactForm(data);
      
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: result.message || "We'll get back to you as soon as possible."
        });
        
        // Clear saved progress and form
        clearContactFormProgress();
        form.reset();
      } else {
        // Show error message if submission failed
        toast({
          title: "Error",
          description: result.message || "There was a problem sending your message. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
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
                    <Mail className="w-5 h-5 text-primary mt-1 mr-3" aria-hidden="true" />
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p className="text-muted-foreground">
                        <a href="mailto:support@whatthefood.in" className="hover:underline">
                          support@whatthefood.in
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-primary mt-1 mr-3" aria-hidden="true" />
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p className="text-muted-foreground">
                        <a href="tel:+919915455931" className="hover:underline">
                          +91 (991) 545-5931
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-primary mt-1 mr-3" aria-hidden="true" />
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
                  <a 
                    href="https://instagram.com/whatthefoodin" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a 
                    href="https://x.com/whatthefood_in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                    aria-label="Follow us on Twitter"
                  >
                    <Twitter className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a 
                    href="https://facebook.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook className="w-5 h-5" aria-hidden="true" />
                  </a>
                  <a 
                    href="https://linkedin.com/company/whatthefood" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="bg-secondary p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                    aria-label="Follow us on LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" aria-hidden="true" />
                  </a>
                </div>
              </div>
              
              <div className="bg-accent p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">For Business Inquiries</h3>
                <p className="text-muted-foreground mb-3">
                  Interested in partnering with WhatTheFood or becoming a vendor?
                </p>
                <p className="font-medium">Email: 
                  <a href="mailto:partnerships@whatthefood.in" className="ml-1 hover:underline">
                    partnerships@whatthefood.in
                  </a>
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              
              {form.hasSavedProgress && (
                <div className="bg-primary/10 text-primary p-3 rounded mb-6 text-sm">
                  We've restored your previously saved form. You can continue where you left off.
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <EnhancedFormField
                    form={form}
                    name="name"
                    label="Your Name"
                    required={true}
                  >
                    <Input 
                      placeholder="John Doe" 
                      aria-required="true"
                    />
                  </EnhancedFormField>
                  
                  <EnhancedFormField
                    form={form}
                    name="email"
                    label="Email Address"
                    required={true}
                  >
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      aria-required="true"
                    />
                  </EnhancedFormField>
                  
                  <EnhancedFormField
                    form={form}
                    name="subject"
                    label="Subject"
                    required={true}
                  >
                    <Input 
                      placeholder="How can we help you?" 
                      aria-required="true" 
                    />
                  </EnhancedFormField>
                  
                  <EnhancedFormField
                    form={form}
                    name="message"
                    label="Message"
                    required={true}
                    description="Tell us about your inquiry or feedback"
                  >
                    <textarea 
                      rows={5} 
                      placeholder="Tell us about your inquiry..." 
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      aria-required="true"
                    />
                  </EnhancedFormField>
                  
                  <div className="flex space-x-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => form.saveProgress()}
                      disabled={isSubmitting}
                      className="flex-1"
                    >
                      Save Progress
                    </Button>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className="flex-1"
                      aria-busy={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Map or Additional Info Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-6">Visit Our Office</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">Our headquarters is located in TBI Chandigarh University. Feel free to visit us during business hours!</p>
            <div className="rounded-lg overflow-hidden h-[400px] bg-muted flex items-center justify-center" role="img" aria-label="Map of Chandigarh University, Mohali, Punjab">
              <p className="text-muted-foreground">Map placeholder - Chandigarh University, Mohali, Punjab, 140301</p>
              {/* In a real implementation, you would embed a Google Map or similar here */}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
