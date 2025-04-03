
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface NewsletterSubscription {
  email: string;
  name?: string;
  interests?: string[];
}

export async function subscribeToNewsletter(data: NewsletterSubscription) {
  try {
    console.log('Submitting newsletter subscription:', data);
    
    const { data: result, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{
        email: data.email,
        name: data.name || null,
        interests: data.interests || []
      }])
      .select();

    if (error) {
      console.error('Error subscribing to newsletter:', error);
      toast.error('Subscription Failed', {
        description: error.message || 'Failed to subscribe to newsletter. Please try again.'
      });
      return {
        success: false,
        error: error.message
      };
    }

    console.log('Newsletter subscription successful:', result);
    toast.success('Subscription Successful', {
      description: 'Thank you for subscribing to our newsletter!'
    });
    
    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Unexpected error subscribing to newsletter:', error);
    toast.error('Subscription Failed', {
      description: error instanceof Error ? error.message : 'An unknown error occurred'
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
