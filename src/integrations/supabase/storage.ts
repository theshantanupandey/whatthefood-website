
import { supabase } from './client';

/**
 * Set up storage buckets required by the application
 */
export async function setupStorageBuckets() {
  console.log('Setting up storage buckets...');
  
  // Define the buckets we need
  const requiredBuckets = [
    'partner-applications',
    'vendor-applications'
  ];
  
  const results = {};
  
  // Create each bucket if it doesn't exist
  for (const bucketName of requiredBuckets) {
    try {
      // Check if bucket exists
      const { data: existingBucket, error: getBucketError } = await supabase.storage.getBucket(bucketName);
      
      if (getBucketError) {
        console.log(`Bucket '${bucketName}' does not exist. Creating...`);
        
        // Create the bucket
        const { data, error } = await supabase.storage.createBucket(bucketName, {
          public: true, // Set to public so files can be accessed without authentication
          fileSizeLimit: 10485760 // 10MB file size limit
        });
        
        if (error) {
          console.error(`Failed to create bucket '${bucketName}':`, error);
          results[bucketName] = { success: false, error };
        } else {
          console.log(`Successfully created bucket '${bucketName}'`);
          results[bucketName] = { success: true };
        }
      } else {
        console.log(`Bucket '${bucketName}' already exists`);
        results[bucketName] = { success: true };
      }
    } catch (error) {
      console.error(`Unexpected error when setting up bucket '${bucketName}':`, error);
      results[bucketName] = { success: false, error };
    }
  }
  
  return results;
}

/**
 * Uploads a file to a storage bucket
 * 
 * @param bucketName The name of the bucket to upload to
 * @param file The file to upload
 * @param path Optional path within the bucket
 * @param customFileName Optional custom file name
 * @returns Object with success status, public URL (if successful), and any error
 */
export async function uploadFile(
  bucketName: string,
  file: File,
  path: string = '',
  customFileName?: string
) {
  try {
    // Generate file name if not provided
    const fileExt = file.name.split('.').pop();
    const fileName = customFileName 
      ? `${customFileName}.${fileExt}` 
      : `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
    
    // Construct the full path
    const fullPath = path ? `${path}${fileName}` : fileName;
    
    // Convert File to ArrayBuffer for upload
    const fileBuffer = await file.arrayBuffer();
    
    // Upload the file
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fullPath, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true // Overwrite if file exists
      });
    
    if (error) {
      console.error(`Error uploading file to '${bucketName}/${fullPath}':`, error);
      return { success: false, error };
    }
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fullPath);
    
    console.log(`File uploaded successfully to '${bucketName}/${fullPath}'`);
    return { 
      success: true, 
      path: fullPath,
      publicUrl: urlData.publicUrl 
    };
  } catch (error) {
    console.error('Unexpected error during file upload:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred during file upload' 
    };
  }
}

/**
 * Uploads multiple files to a storage bucket
 * 
 * @param bucketName The name of the bucket to upload to
 * @param files Array of files to upload
 * @param path Optional path within the bucket
 * @param fileNamePrefix Optional prefix for the generated file names
 * @returns Array of upload results for each file
 */
export async function uploadMultipleFiles(
  bucketName: string,
  files: File[],
  path: string = '',
  fileNamePrefix: string = ''
) {
  const results = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = fileNamePrefix ? `${fileNamePrefix}-${i+1}` : undefined;
    const result = await uploadFile(bucketName, file, path, fileName);
    results.push(result);
  }
  
  return results;
}
