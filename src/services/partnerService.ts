import { supabase } from '@/lib/supabase';
import { uploadFileToBucket } from '@/utils/fileUpload';

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

export interface PartnerSubmissionResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export async function submitPartnerApplication(data: PartnerFormData): Promise<PartnerSubmissionResult> {
  try {
    // Handle file upload if brandDeck is provided
    let brandDeckUrl = null;
    if (data.brandDeck) {
      const fileName = `${data.brandName.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;
      
      console.log(`Starting brand deck upload for ${data.brandName}...`);
      const uploadResult = await uploadFileToBucket(
        'partner-applications', // Using hyphen instead of underscore to match the actual bucket name
        data.brandDeck,
        '', // No subfolder
        fileName // Use the generated file name
      );
      
      if (!uploadResult.success) {
        console.error('Brand deck upload failed:', uploadResult.error);
        // Don't throw an error, just log it and continue with the application
        console.log('Continuing with application submission without the brand deck');
      } else {
        console.log('Brand deck uploaded successfully:', uploadResult.publicUrl);
        brandDeckUrl = uploadResult.publicUrl;
      }
    }
    
    // Insert partner application data
    console.log('Inserting partner application data into database...');
    const { data: result, error } = await supabase
      .from('partner_applications')
      .insert([{
        brand_name: data.brandName,
        website: data.website,
        industry_type: data.industryType,
        contact_name: data.contactName,
        email: data.email,
        phone: data.phone,
        collaboration_types: data.collaborationTypes,
        additional_info: data.additionalInfo || null,
        terms_agreed: data.termsAgreed,
        brand_deck_url: brandDeckUrl,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    console.log('Partner application submitted successfully!');
    return {
      success: true,
      message: `Thank you, ${data.contactName}! Your partner application for ${data.brandName} has been submitted successfully. We'll be in touch soon.`,
      data: result
    };
  } catch (error) {
    console.error('Error submitting partner application:', error);
    return {
      success: false,
      message: 'There was an error submitting your application. Please try again later.',
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
