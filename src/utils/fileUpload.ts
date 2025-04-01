
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

type UploadResult = {
  success: boolean;
  path?: string;
  publicUrl?: string;
  error?: string;
};

/**
 * Upload a single file to a Supabase storage bucket
 */
export async function uploadFileToBucket(
  bucketName: string,
  file: File,
  folderPath: string = '',
  filePrefix: string = ''
): Promise<UploadResult> {
  try {
    console.log(`Attempting to upload file to ${bucketName}/${folderPath}...`);
    
    // Check if bucket exists
    try {
      const { data: bucket, error: getBucketError } = await supabase.storage.getBucket(bucketName);
      
      if (getBucketError) {
        console.error(`Error checking bucket ${bucketName}:`, getBucketError);
        return { success: false, error: `Bucket ${bucketName} not accessible: ${getBucketError.message}` };
      }
      
      console.log(`Bucket ${bucketName} exists:`, bucket);
    } catch (e) {
      console.error(`Exception checking bucket ${bucketName}:`, e);
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${filePrefix ? filePrefix + '-' : ''}${uuidv4()}.${fileExt}`;
    const filePath = folderPath ? `${folderPath}${fileName}` : fileName;
    
    console.log(`Uploading file to ${bucketName}/${filePath}...`);
    
    // Try to upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      console.error(`Error uploading file to ${bucketName}/${filePath}:`, uploadError);
      return { success: false, error: uploadError.message };
    }
    
    console.log(`File uploaded successfully to ${bucketName}/${filePath}`);
    
    // Get public URL
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    console.log(`Public URL generated: ${data.publicUrl}`);
    
    return { 
      success: true, 
      path: filePath, 
      publicUrl: data.publicUrl 
    };
  } catch (error) {
    console.error('Unexpected error during file upload:', error);
    return { 
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred during upload'
    };
  }
}

/**
 * Upload multiple files to a Supabase storage bucket
 */
export async function uploadMultipleFilesToBucket(
  bucketName: string,
  files: File[],
  folderPath: string = '',
  filePrefix: string = ''
): Promise<UploadResult[]> {
  const uploadPromises = files.map((file, index) => {
    // Add index to ensure unique file names
    const indexedPrefix = `${filePrefix}${index + 1}`;
    return uploadFileToBucket(bucketName, file, folderPath, indexedPrefix);
  });
  
  return Promise.all(uploadPromises);
}
