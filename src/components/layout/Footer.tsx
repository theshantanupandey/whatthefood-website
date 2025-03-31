
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "@/lib/zod-shim";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { subscribeToNewsletter, NewsletterSubscription } from "@/services/newsletterService";
import { useState } from "react";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type FormValues = z.infer<typeof formSchema>;

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      const subscription: NewsletterSubscription = {
        email: data.email
      };
      await subscribeToNewsletter(subscription);
      toast.success("Subscribed Successfully!", {
        description: "Thank you for subscribing to our newsletter!",
      });
      form.reset();
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast.error("Subscription Failed", {
        description: "There was an error subscribing to the newsletter. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-xl font-bold">What The Food</h2>
            <p className="text-muted-foreground text-sm">
              Redefining food delivery with a focus on quality, sustainability, and community.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Company</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
              <Link to="/join-us" className="text-muted-foreground hover:text-primary transition-colors">
                Join Us
              </Link>
              <Link to="/vendors" className="text-muted-foreground hover:text-primary transition-colors">
                Vendors
              </Link>
              <Link to="/customize" className="text-muted-foreground hover:text-primary transition-colors">
                Customize
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Resources</h3>
            <nav className="flex flex-col space-y-2 text-sm">
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Stay updated with our latest news and offers.
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  Subscribe
                </Button>
              </form>
            </Form>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} What The Food. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span className="text-muted-foreground">|</span>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <span className="text-muted-foreground">|</span>
            <p className="text-sm text-muted-foreground">
              Designed with &#10084; for food lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
