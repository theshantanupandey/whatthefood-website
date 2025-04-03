
import { setupStorageBuckets } from '@/integrations/supabase/storage';

/**
 * Initialize Supabase resources
 * This should be called during application startup
 */
export async function initializeSupabase() {
  console.log('Initializing Supabase resources...');
  
  try {
    // Set up storage buckets
    const storageSetupResult = await setupStorageBuckets();
    console.log('Storage setup complete:', storageSetupResult);
    
    return {
      success: true,
      storage: storageSetupResult
    };
  } catch (error) {
    console.error('Error initializing Supabase resources:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

/**
 * Add this function to your app's entry point or layout component
 */
export function useSupabaseInitialization() {
  React.useEffect(() => {
    initializeSupabase().catch(console.error);
  }, []);
}

/**
 * Manual initialization function for testing
 */
export async function manualInitialize() {
  return await initializeSupabase();
}
