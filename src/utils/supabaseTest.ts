import { supabase, testConnection } from '@/lib/supabase';

/**
 * Test function to verify Supabase connection and table access
 * Run this function from a component or page to test your setup
 */
export async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  
  try {
    // Test basic connection first
    const connectionResult = await testConnection();
    
    if (!connectionResult.success) {
      console.error('Connection error:', connectionResult.error);
      return { 
        success: false, 
        error: connectionResult.error,
        message: 'Failed to connect to Supabase. Check your credentials and network connection.'
      };
    }
    
    console.log('Successfully connected to Supabase!');
    
    // Test storage buckets
    const buckets = ['partner_applications', 'vendor_applications'];
    const storageResults = {};
    
    for (const bucket of buckets) {
      try {
        const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(bucket);
        
        if (bucketError) {
          console.warn(`Bucket '${bucket}' not found or not accessible:`, bucketError);
          storageResults[bucket] = { exists: false, error: bucketError };
        } else {
          console.log(`Bucket '${bucket}' exists and is accessible`);
          storageResults[bucket] = { exists: true };
        }
      } catch (e) {
        console.error(`Error checking bucket '${bucket}':`, e);
        storageResults[bucket] = { exists: false, error: e };
      }
    }
    
    return { 
      success: true, 
      message: 'Supabase connection successful', 
      storageResults 
    };
  } catch (error) {
    console.error('Unexpected error testing Supabase connection:', error);
    return { 
      success: false, 
      error,
      message: 'An unexpected error occurred while testing the Supabase connection.'
    };
  }
}
