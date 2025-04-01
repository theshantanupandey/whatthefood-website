
import { supabase } from '@/integrations/supabase/client';

export async function ensureRequiredBuckets() {
  try {
    console.log('Checking and setting up storage buckets...');
    
    // Check if the buckets exist
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Error checking storage buckets:', error);
      return { success: false, error };
    }
    
    console.log('Current buckets:', buckets.map(b => b.name));
    
    // Check for vendor-applications bucket
    const vendorBucketExists = buckets.some(bucket => bucket.name === 'vendor-applications');
    
    if (!vendorBucketExists) {
      console.log('Creating vendor-applications bucket...');
      const { error: createError } = await supabase.storage.createBucket('vendor-applications', {
        public: true,
        fileSizeLimit: 10485760, // 10MB file size limit
      });
      
      if (createError) {
        console.error('Error creating vendor-applications bucket:', createError);
        return { success: false, error: createError };
      }
      
      console.log('vendor-applications bucket created successfully');
    } else {
      console.log('vendor-applications bucket already exists');
    }
    
    // Check for partner-applications bucket
    const partnerBucketExists = buckets.some(bucket => bucket.name === 'partner-applications');
    
    if (!partnerBucketExists) {
      console.log('Creating partner-applications bucket...');
      const { error: createError } = await supabase.storage.createBucket('partner-applications', {
        public: true,
        fileSizeLimit: 10485760, // 10MB file size limit
      });
      
      if (createError) {
        console.error('Error creating partner-applications bucket:', createError);
        return { success: false, error: createError };
      }
      
      console.log('partner-applications bucket created successfully');
    } else {
      console.log('partner-applications bucket already exists');
    }
    
    // Verify that the buckets are accessible
    for (const bucketName of ['vendor-applications', 'partner-applications']) {
      try {
        console.log(`Testing access to ${bucketName} bucket...`);
        const { data, error: accessError } = await supabase.storage.from(bucketName).list('', {
          limit: 1,
        });
        
        if (accessError) {
          console.error(`Error accessing ${bucketName} bucket:`, accessError);
        } else {
          console.log(`Successfully accessed ${bucketName} bucket`);
        }
      } catch (e) {
        console.error(`Exception testing access to ${bucketName} bucket:`, e);
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
