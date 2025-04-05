/**
 * Service for handling partner applications
 */

import { supabase } from '@/lib/supabase';
import { sanitizeString } from '@/utils/sanitizeInput';

/**
 * Interface for partner form data
 */
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

/**
 * Submit a partner application
 * @param formData - The partner application form data
 * @returns A promise that resolves when the submission is successful
 */
export const submitPartnerApplication = async (
  formData: PartnerFormData
): Promise<{ success: boolean; error?: any }> => {
  try {
    // Sanitize text inputs
    const sanitizedData = {
      ...formData,
      brandName: sanitizeString(formData.brandName),
      contactName: sanitizeString(formData.contactName),
      email: sanitizeString(formData.email),
      phone: sanitizeString(formData.phone),
      website: sanitizeString(formData.website),
      industryType: sanitizeString(formData.industryType),
      additionalInfo: formData.additionalInfo ? sanitizeString(formData.additionalInfo) : '',
    };

    console.log('Partner application submitted:', sanitizedData);
    
    // Upload brand deck if provided
    let brandDeckUrl = null;
    if (formData.brandDeck) {
      const fileName = `${Date.now()}-${formData.brandDeck.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('partner-applications')
        .upload(`brand-decks/${fileName}`, formData.brandDeck);
      
      if (uploadError) {
        console.error('Error uploading brand deck:', uploadError);
      } else {
        // Get public URL
        const { data: publicUrlData } = supabase.storage
          .from('partner-applications')
          .getPublicUrl(`brand-decks/${fileName}`);
          
        if (publicUrlData?.publicUrl) {
          brandDeckUrl = publicUrlData.publicUrl;
        }
      }
    }
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('partner_applications')
      .insert([{
        brand_name: sanitizedData.brandName,
        contact_name: sanitizedData.contactName,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        website: sanitizedData.website,
        industry_type: sanitizedData.industryType,
        collaboration_types: sanitizedData.collaborationTypes,
        additional_info: sanitizedData.additionalInfo,
        brand_deck_url: brandDeckUrl,
        terms_agreed: sanitizedData.termsAgreed,
        created_at: new Date().toISOString()
      }]);
    
    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Partner application submission error:', error);
    return { success: false, error };
  }
};