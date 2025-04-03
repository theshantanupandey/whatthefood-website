import { supabase } from '@/lib/supabase';

export interface NewsletterSubscription {
  email: string;
  name?: string;
  interests?: string[];
}

export async function subscribeToNewsletter(data: NewsletterSubscription) {
  try {
    const { data: result, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{
        email: data.email,
        name: data.name || null,
        interests: data.interests || [],
        created_at: new Date().toISOString()
      }]);

    if (error) throw error;

    return {
      success: true,
      data: result
    };
  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
