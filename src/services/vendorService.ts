import { supabase } from '@/lib/supabase';
import { uploadFileToBucket, uploadMultipleFilesToBucket } from '@/utils/fileUpload';

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
  sampleMenu?: File[];
}

export interface VendorSubmissionResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export async function submitVendorApplication(data: VendorFormData): Promise<VendorSubmissionResult> {
  try {
    // Handle kitchen photos upload
    const kitchenPhotoUrls: string[] = [];
    if (data.kitchenPhotos && data.kitchenPhotos.length > 0) {
      console.log(`Starting kitchen photos upload for ${data.businessName}...`);
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
        console.error('Some kitchen photos failed to upload:', failedUploads);
        // If all uploads failed, throw an error
        if (failedUploads.length === data.kitchenPhotos.length) {
          throw new Error('All kitchen photos failed to upload');
        }
        // Otherwise, continue with the uploads that succeeded
      }
      
      // Collect URLs from successful uploads
      uploadResults
        .filter(result => result.success)
        .forEach(result => kitchenPhotoUrls.push(result.publicUrl));
      
      console.log(`Successfully uploaded ${kitchenPhotoUrls.length} kitchen photos`);
    }
    
    // Handle food photos upload
    const foodPhotoUrls: string[] = [];
    if (data.foodPhotos && data.foodPhotos.length > 0) {
      console.log(`Starting food photos upload for ${data.businessName}...`);
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
        console.error('Some food photos failed to upload:', failedUploads);
        // If all uploads failed, throw an error
        if (failedUploads.length === data.foodPhotos.length) {
          throw new Error('All food photos failed to upload');
        }
        // Otherwise, continue with the uploads that succeeded
      }
      
      // Collect URLs from successful uploads
      uploadResults
        .filter(result => result.success)
        .forEach(result => foodPhotoUrls.push(result.publicUrl));
      
      console.log(`Successfully uploaded ${foodPhotoUrls.length} food photos`);
    }
    
    // Handle sample menu upload if provided
    const sampleMenuUrls: string[] = [];
    if (data.sampleMenu && data.sampleMenu.length > 0) {
      console.log(`Starting sample menu upload for ${data.businessName}...`);
      const businessNameSlug = data.businessName.replace(/\s+/g, '-').toLowerCase();
      const menuUploadResult = await uploadFileToBucket(
        'vendor-applications',
        data.sampleMenu[0], // Use the first file from the array
        'menus/',
        `menu-${businessNameSlug}`
      );
      
      if (menuUploadResult.success) {
        sampleMenuUrls.push(menuUploadResult.publicUrl);
      }
      
      console.log(`Successfully uploaded ${sampleMenuUrls.length} sample menu files`);
    }
    
    // Insert vendor application data
    console.log('Inserting vendor application data into database...');
    const { data: result, error } = await supabase
      .from('vendor_applications')
      .insert([{
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
        sample_menu_urls: sampleMenuUrls,
        additional_info: data.additionalInfo || null,
        terms_agreed: data.termsAgreed,
        packaging_option: data.packagingOption,
        price_range: data.priceRange,
        customization_willing: data.customizationWilling,
        existing_delivery: data.existingDelivery,
        why_partner: data.whyPartner,
        fssai_standards: data.fssaiStandards,
        additional_comments: data.additionalComments || null,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Database insert error:', error);
      throw error;
    }

    console.log('Vendor application submitted successfully!');
    return {
      success: true,
      message: `Thank you, ${data.ownerName}! Your vendor application for ${data.businessName} has been submitted successfully. We'll be in touch soon.`,
      data: result
    };
  } catch (error) {
    console.error('Error submitting vendor application:', error);
    return {
      success: false,
      message: 'There was an error submitting your application. Please try again later.',
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
