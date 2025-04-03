
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

// Create the Supabase client
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Test the connection to Supabase
export async function testConnection() {
  try {
    const { data, error } = await supabase.from('newsletter_subscriptions').select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { success: false, error };
    }
    
    console.log('Supabase connection successful!');
    return { success: true };
  } catch (err) {
    console.error('Error testing Supabase connection:', err);
    return { success: false, error: err };
  }
}
