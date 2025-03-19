import { supabase } from '@/lib/supabase';

/**
 * Ensures that all required storage buckets exist
 * Creates them if they don't exist
 */
export async function ensureRequiredBuckets() {
  const requiredBuckets = [
    'vendor-applications',
    'partner-applications'
  ];
  
  console.log('Checking and setting up required storage buckets...');
  
  for (const bucketName of requiredBuckets) {
    try {
      // Check if bucket exists
      const { data, error } = await supabase.storage.getBucket(bucketName);
      
      if (error) {
        if (error.message.includes('The resource was not found')) {
          console.log(`Bucket '${bucketName}' not found. Creating it...`);
          
          // Create the bucket
          const { data: createData, error: createError } = await supabase.storage.createBucket(bucketName, {
            public: true // Make bucket contents publicly accessible
          });
          
          if (createError) {
            console.error(`Failed to create bucket '${bucketName}':`, createError);
          } else {
            console.log(`Successfully created bucket '${bucketName}'`);
          }
        } else {
          console.error(`Error checking bucket '${bucketName}':`, error);
        }
      } else {
        console.log(`Bucket '${bucketName}' already exists`);
      }
    } catch (err) {
      console.error(`Unexpected error checking/creating bucket '${bucketName}':`, err);
    }
  }
  
  console.log('Bucket setup complete');
}

/**
 * Creates storage buckets if they don't already exist
 * @returns Object containing success status and any errors
 */
export async function setupStorageBuckets() {
  const requiredBuckets = [
    'partner-applications',
    'vendor-applications',
    'test-uploads'
  ];

  const results = {};

  for (const bucketName of requiredBuckets) {
    try {
      // Check if bucket exists
      const { data: bucketData, error: getBucketError } = await supabase.storage.getBucket(bucketName);
      
      if (getBucketError) {
        console.log(`Bucket '${bucketName}' does not exist. Creating...`);
        
        // Create the bucket
        const { data: newBucket, error: createError } = await supabase.storage.createBucket(bucketName, {
          public: true, // Make bucket contents publicly accessible
          fileSizeLimit: 10485760 // 10MB limit
        });
        
        if (createError) {
          console.error(`Failed to create bucket '${bucketName}':`, createError);
          results[bucketName] = { success: false, error: createError };
        } else {
          console.log(`Successfully created bucket '${bucketName}'`);
          results[bucketName] = { success: true, data: newBucket };
        }
      } else {
        console.log(`Bucket '${bucketName}' already exists`);
        results[bucketName] = { success: true, data: bucketData };
      }
    } catch (error) {
      console.error(`Error setting up bucket '${bucketName}':`, error);
      results[bucketName] = { success: false, error };
    }
  }

  return results;
}

/**
 * Updates bucket policies to make them public
 * @returns Object containing success status and any errors
 */
export async function updateBucketPolicies() {
  const requiredBuckets = [
    'partner-applications',
    'vendor-applications',
    'test-uploads'
  ];

  const results = {};

  for (const bucketName of requiredBuckets) {
    try {
      // Update bucket to be public
      const { data, error } = await supabase.storage.updateBucket(bucketName, {
        public: true
      });
      
      if (error) {
        console.error(`Failed to update bucket policy for '${bucketName}':`, error);
        results[bucketName] = { success: false, error };
      } else {
        console.log(`Successfully updated bucket policy for '${bucketName}'`);
        results[bucketName] = { success: true, data };
      }
    } catch (error) {
      console.error(`Error updating bucket policy for '${bucketName}':`, error);
      results[bucketName] = { success: false, error };
    }
  }

  return results;
}
