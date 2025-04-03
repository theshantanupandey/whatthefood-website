
import { supabase } from '@/integrations/supabase/client';
import { uploadFileToBucket, uploadMultipleFilesToBucket } from '@/utils/fileUpload';
import { toast } from 'sonner';

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
  deliveryOptions: string[];
  mealTypes: string[];
  healthCertifications: string[];
  kitchenPhotos?: File[];
  foodPhotos?: File[];
  additionalInfo?: string;
  termsAgreed: boolean;
  packagingOption: string;
  priceRange: string;
  customizationWilling: boolean;
  existingDelivery: boolean;
  whyPartner: string;
  fssaiStandards: boolean;
  additionalComments?: string;
}

export async function submitVendorApplication(data: VendorFormData) {
  try {
    console.log('Starting vendor application submission process...');
    
    // Upload kitchen photos if provided
    let kitchenPhotoUrls: string[] = [];
    if (data.kitchenPhotos && data.kitchenPhotos.length > 0) {
      console.log(`Uploading ${data.kitchenPhotos.length} kitchen photos...`);
      const businessNameSlug = data.businessName.replace(/\s+/g, '-').toLowerCase();
      
      const uploadResults = await uploadMultipleFilesToBucket(
        'vendor-applications',
        data.kitchenPhotos,
        'kitchen_photos/',
        `kitchen-${businessNameSlug}`
      );
      
      // Check for any upload failures
      const failedUploads = uploadResults.filter(result => !result.success);
      if (failedUploads.length > 0) {
        const errors = failedUploads.map(result => result.error).join(', ');
        throw new Error(`Failed to upload some kitchen photos: ${errors}`);
      }
      
      // Extract successful upload URLs
      kitchenPhotoUrls = uploadResults.map(result => result.publicUrl);
      console.log(`Successfully uploaded ${kitchenPhotoUrls.length} kitchen photos`);
    }
    
    // Upload food photos if provided
    let foodPhotoUrls: string[] = [];
    if (data.foodPhotos && data.foodPhotos.length > 0) {
      console.log(`Uploading ${data.foodPhotos.length} food photos...`);
      const businessNameSlug = data.businessName.replace(/\s+/g, '-').toLowerCase();
      
      const uploadResults = await uploadMultipleFilesToBucket(
        'vendor-applications',
        data.foodPhotos,
        'food_photos/',
        `food-${businessNameSlug}`
      );
      
      // Check for any upload failures
      const failedUploads = uploadResults.filter(result => !result.success);
      if (failedUploads.length > 0) {
        const errors = failedUploads.map(result => result.error).join(', ');
        throw new Error(`Failed to upload some food photos: ${errors}`);
      }
      
      // Extract successful upload URLs
      foodPhotoUrls = uploadResults.map(result => result.publicUrl);
      console.log(`Successfully uploaded ${foodPhotoUrls.length} food photos`);
    }
    
    // Insert vendor application data into the database
    console.log('Inserting vendor application data into database...');
    const { data: insertedData, error } = await supabase
      .from('vendor_applications')
      .insert([
        {
          business_name: data.businessName,
          owner_name: data.ownerName,
          business_type: data.businessType,
          registration_number: data.registrationNumber || null,
          gst_number: data.gstNumber || null,
          phone: data.phone,
          email: data.email,
          address: data.address,
          city_state: data.cityState,
          meals_per_day: data.mealsPerDay,
          cuisines: data.cuisines,
          vegetarian_options: data.vegetarianOptions,
          delivery_options: data.deliveryOptions,
          meal_types: data.mealTypes,
          health_certifications: data.healthCertifications,
          kitchen_photo_urls: kitchenPhotoUrls,
          food_photo_urls: foodPhotoUrls,
          additional_info: data.additionalInfo || null,
          terms_agreed: data.termsAgreed,
          packaging_option: data.packagingOption,
          price_range: data.priceRange,
          customization_willing: data.customizationWilling,
          existing_delivery: data.existingDelivery,
          why_partner: data.whyPartner,
          fssai_standards: data.fssaiStandards,
          additional_comments: data.additionalComments || null,
        }
      ])
      .select();
    
    if (error) {
      console.error('Error submitting vendor application:', error);
      toast.error('Submission Failed', {
        description: 'There was an error submitting your application. Please try again.'
      });
      return { success: false, error };
    }
    
    console.log('Vendor application submitted successfully:', insertedData);
    toast.success('Application Submitted', {
      description: 'Your vendor application has been submitted successfully. We will contact you soon!'
    });
    
    return { success: true, data: insertedData };
  } catch (error) {
    console.error('Unexpected error during vendor application submission:', error);
    toast.error('Submission Failed', {
      description: error instanceof Error ? error.message : 'An unexpected error occurred'
    });
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}
