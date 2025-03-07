
import { apiPost } from './api';

export interface PartnerFormData {
  brandName: string;
  website: string;
  industryType: string;
  contactName: string;
  email: string;
  phone: string;
  collaborationTypes: string[];
  additionalInfo?: string;
  brandDeck?: File;
  termsAgreed: boolean;
}

export async function submitPartnerApplication(data: PartnerFormData) {
  return apiPost('partner-application', data);
}
