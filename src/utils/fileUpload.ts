import { supabase } from '@/lib/supabase';

/**
 * Uploads a file to a Supabase storage bucket
 * @param bucketName The name of the bucket to upload to
 * @param file The file to upload
 * @param path Optional path within the bucket (e.g., 'folder/')
 * @param customFileName Optional custom file name (if not provided, will use a generated name)
 * @returns Object containing success status, public URL (if successful), and any error
 */
export async function uploadFileToBucket(
  bucketName: string,
  file: File,
  path: string = '',
  customFileName?: string
) {
  try {
    // Validate inputs
    if (!file) {
      console.error('No file provided for upload');
      return { success: false, error: 'No file provided for upload' };
    }
    
    if (!bucketName) {
      console.error('No bucket name provided for upload');
      return { success: false, error: 'No bucket name provided for upload' };
    }

    console.log(`Starting upload of file ${file.name} (${file.size} bytes) to bucket ${bucketName}`);
    
    // Check if bucket exists first
    console.log(`Checking if bucket '${bucketName}' exists...`);
    const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(bucketName);
    
    if (bucketError) {
      console.error(`Error accessing bucket '${bucketName}':`, bucketError);
      
      // Try to create the bucket if it doesn't exist
      if (bucketError.message.includes('The resource was not found')) {
        console.log(`Attempting to create bucket '${bucketName}'...`);
        const { data: createData, error: createError } = await supabase.storage.createBucket(bucketName, {
          public: true // Make bucket contents publicly accessible
        });
        
        if (createError) {
          console.error(`Failed to create bucket '${bucketName}':`, createError);
          return { success: false, error: createError };
        }
        
        console.log(`Successfully created bucket '${bucketName}'`);
      } else {
        return { success: false, error: bucketError };
      }
    } else {
      console.log(`Bucket '${bucketName}' exists:`, bucketData);
    }
    
    // Generate file name if not provided
    const fileExt = file.name.split('.').pop();
    const fileName = customFileName ? 
      `${customFileName}.${fileExt}` : 
      `${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
    
    // Construct the full path
    const fullPath = path ? `${path}${fileName}` : fileName;
    
    // Upload the file
    console.log(`Uploading file to ${bucketName}/${fullPath}...`);
    
    // Convert File to ArrayBuffer for upload
    const fileBuffer = await file.arrayBuffer();
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fullPath, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true // Overwrite if file exists
      });
    
    if (uploadError) {
      console.error(`Error uploading file to '${bucketName}/${fullPath}':`, uploadError);
      return { success: false, error: uploadError };
    }
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fullPath);
    
    console.log(`File uploaded successfully to '${bucketName}/${fullPath}'`);
    console.log(`Public URL: ${urlData.publicUrl}`);
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
 * Uploads multiple files to a Supabase storage bucket
 * @param bucketName The name of the bucket to upload to
 * @param files Array of files to upload
 * @param path Optional path within the bucket (e.g., 'folder/')
 * @param fileNamePrefix Optional prefix for the generated file names
 * @returns Array of upload results for each file
 */
export async function uploadMultipleFilesToBucket(
  bucketName: string,
  files: File[],
  path: string = '',
  fileNamePrefix: string = ''
) {
  const results = [];
  
  for (const file of files) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${fileNamePrefix}${fileNamePrefix ? '-' : ''}${Date.now()}-${Math.random().toString(36).substring(2, 10)}.${fileExt}`;
    
    const result = await uploadFileToBucket(bucketName, file, path, fileName);
    results.push(result);
  }
  
  return results;
}
