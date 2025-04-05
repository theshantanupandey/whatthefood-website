/**
 * Service for handling vendor applications
 */

import { supabase } from '@/lib/supabase';
import { sanitizeString } from '@/utils/sanitizeInput';

/**
 * Interface for vendor form data
 */
export interface VendorFormData {
  businessName: string;
  ownerName: string;
  businessType: string;
  registrationNumber?: string;
  gstNumber?: string;
  phone: string;
  email: string;
  address: string;
  cityState: string;
  mealsPerDay: number;
  cuisines: string[];
  vegetarianOptions: boolean;
  deliveryOptions?: string[];
  mealTypes: string[];
  healthCertifications?: string[];
  kitchenPhotos?: File[];
  foodPhotos?: File[];
  additionalInfo?: string;
  additionalComments?: string;
  termsAgreed: boolean;
  packagingOption: string;
  priceRange: string;
  customizationWilling: boolean;
  existingDelivery: boolean;
  whyPartner: string;
  fssaiStandards: boolean;
}

/**
 * Submit a vendor application
 * @param formData - The vendor application form data
 * @returns A promise that resolves when the submission is successful
 */
export const submitVendorApplication = async (
  formData: VendorFormData
): Promise<{ success: boolean; error?: any; message?: string }> => {
  try {
    // Sanitize text inputs
    const sanitizedData = {
      ...formData,
      businessName: sanitizeString(formData.businessName),
      ownerName: sanitizeString(formData.ownerName),
      email: sanitizeString(formData.email),
      phone: sanitizeString(formData.phone),
      address: sanitizeString(formData.address),
      businessType: sanitizeString(formData.businessType),
      cityState: sanitizeString(formData.cityState),
      whyPartner: sanitizeString(formData.whyPartner),
      additionalComments: formData.additionalComments ? sanitizeString(formData.additionalComments) : '',
    };

    console.log('Vendor application submitted:', sanitizedData);
    
    // Upload kitchen photos if any
    const kitchenPhotoUrls: string[] = [];
    if (formData.kitchenPhotos && formData.kitchenPhotos.length > 0) {
      for (const photo of formData.kitchenPhotos) {
        try {
          const fileName = `${Date.now()}-${photo.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('vendor-applications')
            .upload(`kitchen-photos/${fileName}`, photo);
          
          if (uploadError) {
            console.error('Error uploading kitchen photo:', uploadError);
            continue;
          }
          
          // Get public URL - getPublicUrl is synchronous, no need to await
          const { data: publicUrlData } = supabase.storage
            .from('vendor-applications')
            .getPublicUrl(`kitchen-photos/${fileName}`);
            
          if (publicUrlData?.publicUrl) {
            kitchenPhotoUrls.push(publicUrlData.publicUrl);
            console.log('Added kitchen photo URL:', publicUrlData.publicUrl);
          }
        } catch (photoError) {
          console.error('Error processing kitchen photo:', photoError);
        }
      }
    }
    
    // Upload food photos if any
    const foodPhotoUrls: string[] = [];
    if (formData.foodPhotos && formData.foodPhotos.length > 0) {
      for (const photo of formData.foodPhotos) {
        try {
          const fileName = `${Date.now()}-${photo.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('vendor-applications')
            .upload(`food-photos/${fileName}`, photo);
          
          if (uploadError) {
            console.error('Error uploading food photo:', uploadError);
            continue;
          }
          
          // Get public URL - getPublicUrl is synchronous, no need to await
          const { data: publicUrlData } = supabase.storage
            .from('vendor-applications')
            .getPublicUrl(`food-photos/${fileName}`);
            
          if (publicUrlData?.publicUrl) {
            foodPhotoUrls.push(publicUrlData.publicUrl);
            console.log('Added food photo URL:', publicUrlData.publicUrl);
          }
        } catch (photoError) {
          console.error('Error processing food photo:', photoError);
        }
      }
    }
    
    // Prepare data for insertion
    const vendorData = {
      business_name: sanitizedData.businessName,
      owner_name: sanitizedData.ownerName,
      business_type: sanitizedData.businessType,
      registration_number: sanitizedData.registrationNumber || null,
      gst_number: sanitizedData.gstNumber || null,
      phone: sanitizedData.phone,
      email: sanitizedData.email,
      address: sanitizedData.address,
      city_state: sanitizedData.cityState,
      meals_per_day: sanitizedData.mealsPerDay,
      cuisines: sanitizedData.cuisines,
      vegetarian_options: sanitizedData.vegetarianOptions,
      delivery_options: sanitizedData.deliveryOptions || [],
      meal_types: sanitizedData.mealTypes,
      health_certifications: sanitizedData.healthCertifications || [],
      kitchen_photo_urls: kitchenPhotoUrls,
      food_photo_urls: foodPhotoUrls,
      packaging_option: sanitizedData.packagingOption,
      price_range: sanitizedData.priceRange,
      customization_willing: sanitizedData.customizationWilling,
      existing_delivery: sanitizedData.existingDelivery,
      why_partner: sanitizedData.whyPartner,
      fssai_standards: sanitizedData.fssaiStandards,
      additional_comments: sanitizedData.additionalComments || null,
      terms_agreed: sanitizedData.termsAgreed,
      created_at: new Date().toISOString()
    };
    
    console.log('Attempting to insert vendor application into database:', vendorData);
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('vendor_applications')
      .insert([vendorData]);
    
    if (error) {
      console.error('Database insertion error:', error);
      throw error;
    }
    
    console.log('Vendor application successfully inserted into database');
    return { 
      success: true,
      message: "Your vendor application has been submitted successfully. We will contact you soon!"
    };
  } catch (error) {
    console.error('Vendor application submission error:', error);
    return { 
      success: false, 
      error,
      message: error instanceof Error ? error.message : "There was an error submitting your application. Please try again."
    };
  }
};