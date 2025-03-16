import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Log environment variable status (for debugging)
console.log('Supabase URL:', supabaseUrl ? 'Defined' : 'Missing');
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Defined' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase credentials missing. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export a function to test the connection
export async function testConnection() {
  try {
    const { error } = await supabase.from('newsletter_subscriptions').select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return { success: false, error };
    }
    
    console.log('Supabase connection test successful!');
    return { success: true };
  } catch (err) {
    console.error('Unexpected error testing Supabase connection:', err);
    return { success: false, error: err };
  }
}
