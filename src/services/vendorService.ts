
import { supabase } from '@/lib/supabase';
import { uploadMultipleFilesToBucket } from '@/utils/fileUpload';
import { toast } from '@/hooks/use-toast';

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

export interface SubmissionResult {
  success: boolean;
  data?: any;
  error?: string;
}

export async function submitVendorApplication(data: VendorFormData): Promise<SubmissionResult> {
  try {
    console.log('Starting vendor application submission...');
    
    // Upload kitchen photos if provided
    let kitchenPhotoUrls: string[] = [];
    if (data.kitchenPhotos && data.kitchenPhotos.length > 0) {
      console.log(`Uploading ${data.kitchenPhotos.length} kitchen photos...`);
      
      const businessNameSlug = data.businessName.toLowerCase().replace(/\s+/g, '-');
      
      const uploadResults = await uploadMultipleFilesToBucket(
        'vendor-applications',
        data.kitchenPhotos,
        'kitchen_photos/',
        `${businessNameSlug}-kitchen`
      );
      
      // Check for upload errors
      const failedUploads = uploadResults.filter(result => !result.success);
      if (failedUploads.length > 0) {
        const errorMsg = `Failed to upload ${failedUploads.length} kitchen photos`;
        console.error(errorMsg, failedUploads);
        toast({
          description: errorMsg,
          variant: 'destructive'
        });
        return { success: false, error: errorMsg };
      }
      
      // Extract URLs from successful uploads
      kitchenPhotoUrls = uploadResults
        .filter(result => result.success && result.publicUrl)
        .map(result => result.publicUrl as string);
      
      console.log(`Successfully uploaded ${kitchenPhotoUrls.length} kitchen photos`);
    }
    
    // Upload food photos if provided
    let foodPhotoUrls: string[] = [];
    if (data.foodPhotos && data.foodPhotos.length > 0) {
      console.log(`Uploading ${data.foodPhotos.length} food photos...`);
      
      const businessNameSlug = data.businessName.toLowerCase().replace(/\s+/g, '-');
      
      const uploadResults = await uploadMultipleFilesToBucket(
        'vendor-applications',
        data.foodPhotos,
        'food_photos/',
        `${businessNameSlug}-food`
      );
      
      // Check for upload errors
      const failedUploads = uploadResults.filter(result => !result.success);
      if (failedUploads.length > 0) {
        const errorMsg = `Failed to upload ${failedUploads.length} food photos`;
        console.error(errorMsg, failedUploads);
        toast({
          description: errorMsg,
          variant: 'destructive'
        });
        return { success: false, error: errorMsg };
      }
      
      // Extract URLs from successful uploads
      foodPhotoUrls = uploadResults
        .filter(result => result.success && result.publicUrl)
        .map(result => result.publicUrl as string);
      
      console.log(`Successfully uploaded ${foodPhotoUrls.length} food photos`);
    }
    
    // Insert into database
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
          additional_comments: data.additionalComments || null
        }
      ])
      .select();
    
    if (error) {
      const errorMsg = `Database error: ${error.message || 'Unknown error'}`;
      console.error('Vendor application submission error:', error);
      toast({
        description: errorMsg,
        variant: 'destructive'
      });
      return { success: false, error: errorMsg };
    }
    
    console.log('Vendor application submitted successfully');
    toast({
      description: 'Your vendor application has been submitted successfully!',
    });
    
    return { success: true, data: insertedData };
    
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Unexpected error submitting vendor application:', error);
    toast({
      description: errorMsg,
      variant: 'destructive'
    });
    return { success: false, error: errorMsg };
  }
}
