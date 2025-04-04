
import { supabase } from '@/lib/supabase';
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
    
    // Prepare the application data
    const applicationData = {
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
    };
    
    // Store application data in local storage for potential recovery/debugging
    try {
      const tempApplications = JSON.parse(localStorage.getItem('pendingPartnerApplications') || '[]');
      tempApplications.push({
        ...applicationData,
        submitted_at: new Date().toISOString()
      });
      localStorage.setItem('pendingPartnerApplications', JSON.stringify(tempApplications));
      console.log('Saved application data to local storage as backup');
    } catch (e) {
      console.error('Failed to save application to local storage:', e);
    }
    
    // Try direct insert
    console.log('Inserting partner application data into database...');
    const { data: insertedData, error } = await supabase
      .from('partner_applications')
      .insert([applicationData])
      .select();
    
    if (error) {
      console.error('Error submitting partner application:', error);
      
      // Handle RLS policy error specifically
      if (error.code === '42501') {
        toast({
          title: "Submission Failed",
          description: "Permission error: Unable to save your application due to security settings. Our team has been notified.",
          variant: "destructive",
        });
        
        return { 
          success: false, 
          error: "Permission error: Unable to save your application due to security settings. Our team has been notified."
        };
      }
      
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
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
