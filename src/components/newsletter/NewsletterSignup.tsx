
import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { subscribeToNewsletter } from '@/services/newsletterService';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
});

type FormValues = z.infer<typeof formSchema>;

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterSignup({ 
  title = "Subscribe to Our Newsletter", 
  description = "Get the latest meal plans, health tips, and exclusive offers delivered to your inbox.", 
  className 
}: NewsletterSignupProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      const response = await subscribeToNewsletter({
        email: data.email,
      });
      
      if (response.success) {
        toast({
          title: "Subscription Successful!",
          description: "Thank you for subscribing to our newsletter.",
        });
        form.reset();
      } else {
        toast({
          title: "Subscription Failed",
          description: response.error || "There was an error subscribing to the newsletter. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      toast({
        title: "Subscription Error",
        description: "There was an unexpected error. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input 
                      placeholder="Enter your email" 
                      type="email" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default NewsletterSignup;
