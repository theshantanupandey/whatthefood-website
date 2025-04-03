
import { supabase } from '@/lib/supabase';

/**
 * Ensures that all required storage buckets exist
 */
export async function ensureRequiredBuckets() {
  const requiredBuckets = [
    'partner-applications',
    'vendor-applications'
  ];
  
  console.log('Setting up required storage buckets...');
  const results: Record<string, any> = {};
  
  for (const bucketName of requiredBuckets) {
    try {
      // Check if bucket exists
      const { data, error } = await supabase.storage.getBucket(bucketName);
      
      if (error) {
        // Create the bucket if it doesn't exist
        if (error.message.includes('not found')) {
          console.log(`Creating bucket '${bucketName}'...`);
          const { data: newBucket, error: createError } = await supabase.storage.createBucket(bucketName, {
            public: true,
            fileSizeLimit: 10485760 // 10MB
          });
          
          if (createError) {
            console.error(`Error creating bucket '${bucketName}':`, createError);
            results[bucketName] = { success: false, error: createError };
          } else {
            console.log(`Bucket '${bucketName}' created successfully`);
            results[bucketName] = { success: true, created: true, data: newBucket };
            
            // Try to create storage policy for the new bucket
            try {
              // Storage policies are created through SQL in Supabase, which we can't do directly here
              // We'll handle it through the supabase-schema.sql script
              console.log(`Note: Make sure to apply proper storage policies for bucket '${bucketName}' using SQL`);
            } catch (policyErr) {
              console.warn(`Failed to set policy for bucket '${bucketName}':`, policyErr);
            }
          }
        } else {
          console.error(`Error checking bucket '${bucketName}':`, error);
          results[bucketName] = { success: false, error };
        }
      } else {
        console.log(`Bucket '${bucketName}' already exists`);
        results[bucketName] = { success: true, exists: true, data };
      }
    } catch (err) {
      console.error(`Unexpected error with bucket '${bucketName}':`, err);
      results[bucketName] = { success: false, error: err };
    }
  }
  
  return results;
}
