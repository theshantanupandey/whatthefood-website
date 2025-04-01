
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
    const fileExt = file.name.split('.').pop();
    const fileName = `${filePrefix ? filePrefix + '-' : ''}${uuidv4()}.${fileExt}`;
    const filePath = folderPath ? `${folderPath}${fileName}` : fileName;
    
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    const { data } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);
    
    return { 
      success: true, 
      path: filePath, 
      publicUrl: data.publicUrl 
    };
  } catch (error) {
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
