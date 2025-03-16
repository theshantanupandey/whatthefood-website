import { supabase } from '@/lib/supabase';

/**
 * Sets up the required Supabase resources (buckets, etc.)
 * Call this function during application initialization
 */
export async function setupSupabaseResources() {
  try {
    console.log('Setting up Supabase resources...');
    
    // Check and create required storage buckets
    await createBucketIfNotExists('partner_applications');
    await createBucketIfNotExists('vendor_applications');
    
    console.log('Supabase resources setup complete!');
    return { success: true };
  } catch (error) {
    console.error('Error setting up Supabase resources:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

/**
 * Creates a storage bucket if it doesn't already exist
 */
async function createBucketIfNotExists(bucketName: string) {
  try {
    // Check if bucket exists
    const { data: existingBucket, error: getBucketError } = await supabase.storage.getBucket(bucketName);
    
    if (getBucketError) {
      if (getBucketError.message.includes('The resource was not found')) {
        console.log(`Bucket '${bucketName}' not found, creating...`);
        
        // Create the bucket
        const { data, error: createError } = await supabase.storage.createBucket(bucketName, {
          public: true // Make bucket contents publicly accessible
        });
        
        if (createError) throw createError;
        
        console.log(`Bucket '${bucketName}' created successfully`);
        return { success: true, created: true };
      } else {
        // Some other error occurred
        throw getBucketError;
      }
    }
    
    console.log(`Bucket '${bucketName}' already exists`);
    return { success: true, created: false };
  } catch (error) {
    console.error(`Error creating bucket '${bucketName}':`, error);
    throw error;
  }
}

/**
 * Checks if the required tables exist in the database
 */
export async function checkRequiredTables() {
  const requiredTables = [
    'partner_applications',
    'vendor_applications',
    'contact_submissions',
    'newsletter_subscriptions'
  ];
  
  const results: Record<string, boolean> = {};
  
  for (const table of requiredTables) {
    try {
      // Try to select a single row to check if table exists
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);
      
      results[table] = !error;
      
      if (error) {
        console.error(`Error checking table '${table}':`, error);
      } else {
        console.log(`Table '${table}' exists and is accessible`);
      }
    } catch (e) {
      results[table] = false;
      console.error(`Exception checking table '${table}':`, e);
    }
  }
  
  return results;
}
