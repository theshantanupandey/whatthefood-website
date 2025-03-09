
import { apiPost } from './api';

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
  return apiPost('vendor-application', data);
}
