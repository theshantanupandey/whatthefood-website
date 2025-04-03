
import { supabase } from '@/lib/supabase';

interface UploadResult {
  success: boolean;
  path?: string;
  publicUrl?: string;
  error?: string | Error;
}

/**
 * Uploads a file to a Supabase storage bucket
 */
export async function uploadFileToBucket(
  bucketName: string,
  file: File,
  path: string = '',
  customFileName?: string
): Promise<UploadResult> {
  try {
    // Validate inputs
    if (!file) {
      return { success: false, error: 'No file provided' };
    }
    
    console.log(`Uploading file ${file.name} (${file.size} bytes) to ${bucketName}`);
    
    // Generate file name if not provided
    const fileExt = file.name.split('.').pop();
    const fileName = customFileName ? 
      `${customFileName}.${fileExt}` : 
      `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    
    // Full storage path
    const fullPath = path ? `${path}${fileName}` : fileName;
    
    // Convert file to arrayBuffer for upload
    const fileBuffer = await file.arrayBuffer();
    
    // Upload the file
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fullPath, fileBuffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      console.error('Upload error:', uploadError);
      return { success: false, error: uploadError.message };
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fullPath);
    
    console.log(`File uploaded successfully: ${urlData.publicUrl}`);
    
    return {
      success: true,
      path: fullPath,
      publicUrl: urlData.publicUrl
    };
  } catch (error) {
    console.error('Unexpected file upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown upload error'
    };
  }
}

/**
 * Uploads multiple files to a Supabase storage bucket
 */
export async function uploadMultipleFilesToBucket(
  bucketName: string,
  files: File[],
  path: string = '',
  fileNamePrefix: string = ''
): Promise<UploadResult[]> {
  const results: UploadResult[] = [];
  
  if (!files || files.length === 0) {
    return [];
  }
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const uniqueName = `${fileNamePrefix}${fileNamePrefix ? '-' : ''}${i+1}-${Date.now()}`;
    const result = await uploadFileToBucket(bucketName, file, path, uniqueName);
    results.push(result);
  }
  
  return results;
}
