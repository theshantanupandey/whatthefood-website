
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
          description: `Could not upload brand deck: ${uploadResult.error}`,
          variant: "destructive"
        });
        return { success: false, error: uploadResult.error };
      }
    }
    
    // Insert partner application data into the database
    console.log('Inserting partner application data into database...');
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
