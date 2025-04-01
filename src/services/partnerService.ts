
import { supabase } from '@/integrations/supabase/client';
import { uploadFileToBucket } from '@/utils/fileUpload';
import { toast } from '@/hooks/use-toast';
import { ensureRequiredBuckets } from '@/utils/setupBuckets';

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
    
    // First, ensure the storage buckets exist
    const bucketsResult = await ensureRequiredBuckets();
    if (!bucketsResult.success) {
      console.error('Failed to set up storage buckets:', bucketsResult.error);
      return { success: false, error: 'Storage setup failed' };
    }
    
    // Handle file upload if provided
    let brandDeckUrl = null;
    if (data.brandDeck) {
      console.log(`Uploading brand deck for ${data.brandName}...`);
      const brandNameSlug = data.brandName.replace(/\s+/g, '-').toLowerCase();
      
      const uploadResult = await uploadFileToBucket(
        'partner-applications',
        data.brandDeck,
        'brand_decks',
        `deck-${brandNameSlug}-${Date.now()}`
      );
      
      if (!uploadResult.success) {
        console.error('Failed to upload brand deck:', uploadResult.error);
        return { success: false, error: uploadResult.error };
      }
      
      brandDeckUrl = uploadResult.publicUrl;
      console.log(`Successfully uploaded brand deck: ${brandDeckUrl}`);
    }
    
    // Prepare data for insertion
    const partnerData = {
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
    
    console.log('Inserting partner application data into database:', partnerData);
    
    // Insert data into the database
    const { data: insertedData, error } = await supabase
      .from('partner_applications')
      .insert([partnerData])
      .select();
    
    if (error) {
      console.error('Error submitting partner application:', error);
      console.error('Error code:', error.code);
      console.error('Error details:', error.details);
      console.error('Error message:', error.message);
      
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
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}
