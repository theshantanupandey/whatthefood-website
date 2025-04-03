
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

export interface SubmissionResult {
  success: boolean;
  data?: any;
  error?: string;
}

export async function submitPartnerApplication(data: PartnerFormData): Promise<SubmissionResult> {
  try {
    console.log('Starting partner application submission...');
    
    // Upload brand deck if provided
    let brandDeckUrl = null;
    if (data.brandDeck) {
      console.log(`Uploading brand deck: ${data.brandDeck.name}`);
      
      const brandNameSlug = data.brandName.toLowerCase().replace(/\s+/g, '-');
      const fileName = `${brandNameSlug}-${Date.now()}`;
      
      const uploadResult = await uploadFileToBucket(
        'partner-applications',
        data.brandDeck,
        'brand_decks/',
        fileName
      );
      
      if (!uploadResult.success) {
        const errorMsg = `Brand deck upload failed: ${uploadResult.error}`;
        console.error(errorMsg);
        toast({
          description: errorMsg,
          variant: 'destructive'
        });
        return { success: false, error: errorMsg };
      }
      
      brandDeckUrl = uploadResult.publicUrl;
      console.log(`Brand deck uploaded: ${brandDeckUrl}`);
    }
    
    // Insert into database
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
      const errorMsg = `Database error: ${error.message || 'Unknown error'}`;
      console.error('Partner application submission error:', error);
      toast({
        description: errorMsg,
        variant: 'destructive'
      });
      return { success: false, error: errorMsg };
    }
    
    console.log('Partner application submitted successfully');
    toast({
      description: 'Your partner application has been submitted successfully!',
    });
    
    return { success: true, data: insertedData };
    
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Unexpected error submitting partner application:', error);
    toast({
      description: errorMsg,
      variant: 'destructive'
    });
    return { success: false, error: errorMsg };
  }
}
