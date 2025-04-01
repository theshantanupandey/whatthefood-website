
import { supabase } from '@/integrations/supabase/client';
import { uploadFileToBucket } from '@/utils/fileUpload';
import { toast } from '@/hooks/use-toast';

export interface PartnerFormData {
  brandName: string;
  website: string;
  industryType: string;
  contactName: string;
  email: string;
  phone: string;
  collaborationTypes: string[];
  additionalInfo?: string;
  termsAgreed: boolean;
  brandDeck?: File;
}

export async function submitPartnerApplication(data: PartnerFormData) {
  try {
    console.log('Starting partner application submission process...');
    
    // Upload brand deck if provided
    let brandDeckUrl = null;
    if (data.brandDeck) {
      console.log(`Uploading brand deck for ${data.brandName}...`);
      const brandNameSlug = data.brandName.replace(/\s+/g, '-').toLowerCase();
      
      // First, check if the bucket exists and try to create it if it doesn't
      const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
      
      if (bucketError) {
        console.error('Error checking buckets:', bucketError);
        return { success: false, error: bucketError };
      }
      
      const bucketExists = buckets.some(bucket => bucket.name === 'partner-applications');
      
      if (!bucketExists) {
        console.log('Partner applications bucket does not exist, creating...');
        const { error: createError } = await supabase.storage.createBucket('partner-applications', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
        
        if (createError) {
          console.error('Failed to create partner-applications bucket:', createError);
          toast({
            title: "Setup Error",
            description: "Failed to create storage bucket for file uploads.",
            variant: "destructive"
          });
          return { success: false, error: createError };
        }
      }
      
      const uploadResult = await uploadFileToBucket(
        'partner-applications',
        data.brandDeck,
        'brand_decks/',
        `deck-${brandNameSlug}-${Date.now()}`
      );
      
      if (uploadResult.success) {
        brandDeckUrl = uploadResult.publicUrl;
        console.log(`Successfully uploaded brand deck: ${brandDeckUrl}`);
      } else {
        console.error('Failed to upload brand deck:', uploadResult.error);
        toast({
          title: "File Upload Failed",
          description: uploadResult.error ? uploadResult.error.toString() : "Unknown upload error",
          variant: "destructive"
        });
        return { success: false, error: uploadResult.error };
      }
    }
    
    // Insert partner application data into the database
    console.log('Inserting partner application data into database...');
    console.log('Data being inserted:', {
      brand_name: data.brandName,
      website: data.website,
      industry_type: data.industryType,
      contact_name: data.contactName,
      email: data.email,
      phone: data.phone,
      collaboration_types: data.collaborationTypes,
      additional_info: data.additionalInfo || null,
      terms_agreed: data.termsAgreed,
      brand_deck_url: brandDeckUrl
    });
    
    // Use public access for inserts
    const { data: insertedData, error } = await supabase
      .from('partner_applications')
      .insert([
        {
          brand_name: data.brandName,
          website: data.website,
          industry_type: data.industryType,
          contact_name: data.contactName,
          email: data.email,
          phone: data.phone,
          collaboration_types: data.collaborationTypes,
          additional_info: data.additionalInfo || null,
          terms_agreed: data.termsAgreed,
          brand_deck_url: brandDeckUrl
        }
      ])
      .select();
    
    if (error) {
      console.error('Error submitting partner application:', error);
      
      // Detailed error logging for troubleshooting
      if (error.code) {
        console.error('Error code:', error.code);
      }
      if (error.details) {
        console.error('Error details:', error.details);
      }
      
      // Check if it's an RLS error
      if (error.message && error.message.includes('policy')) {
        console.error('This appears to be an RLS policy error. Check your Supabase RLS policies for partner_applications table.');
        toast({
          title: "Submission Failed - Permission Error",
          description: "You don't have permission to submit applications. This is likely a configuration issue. Please contact support.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: error.message,
          variant: "destructive",
        });
      }
      return { success: false, error: error.message };
    }
    
    console.log('Partner application submitted successfully:', insertedData);
    toast({
      title: "Application Submitted",
      description: "Your partner application has been submitted successfully. We will contact you soon!",
    });
    
    return { success: true, data: insertedData };
  } catch (error) {
    console.error('Unexpected error during partner application submission:', error);
    toast({
      title: "Submission Failed",
      description: error instanceof Error ? error.message : "An unexpected error occurred. Please try again later.",
      variant: "destructive",
    });
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}
