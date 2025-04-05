/**
 * Service for handling newsletter subscriptions
 */

import { supabase } from '@/lib/supabase';

/**
 * Interface for newsletter subscription data
 */
export interface NewsletterSubscription {
  email: string;
  name?: string;
  preferences?: string[];
}

/**
 * Subscribe a user to the newsletter
 * @param subscription - The subscription data containing at least an email
 * @returns A promise that resolves with the submission result
 */
export const subscribeToNewsletter = async (
  subscription: NewsletterSubscription
): Promise<{ success: boolean; error?: any }> => {
  try {
    console.log('Newsletter subscription:', subscription);
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{
        email: subscription.email,
        name: subscription.name || null,
        interests: subscription.preferences || [],
        created_at: new Date().toISOString()
      }]);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { success: false, error };
  }
};