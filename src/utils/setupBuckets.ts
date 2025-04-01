
import { supabase } from '@/integrations/supabase/client';

/**
 * Ensure required buckets exist in Supabase storage
 */
export async function ensureRequiredBuckets() {
  try {
    console.log('Checking and setting up storage buckets...');
    
    // List all buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error checking storage buckets:', listError);
      return { success: false, error: listError };
    }
    
    const bucketNames = buckets?.map(bucket => bucket.name) || [];
    console.log('Current buckets:', bucketNames);
    
    // Buckets that must exist
    const requiredBuckets = [
      { name: 'partner-applications', isPublic: true },
      { name: 'vendor-applications', isPublic: true }
    ];
    
    // Create any missing buckets
    for (const bucket of requiredBuckets) {
      if (!bucketNames.includes(bucket.name)) {
        console.log(`Creating ${bucket.name} bucket...`);
        const { error: createError } = await supabase.storage.createBucket(
          bucket.name,
          { 
            public: bucket.isPublic,
            fileSizeLimit: 10485760 // 10MB
          }
        );
        
        if (createError) {
          console.error(`Error creating ${bucket.name} bucket:`, createError);
        } else {
          console.log(`${bucket.name} bucket created successfully`);
        }
      } else {
        console.log(`${bucket.name} bucket already exists`);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Unexpected error setting up buckets:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
