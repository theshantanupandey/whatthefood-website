/**
 * Service for handling job applications
 */

import { supabase } from '@/lib/supabase';
import { sanitizeString } from '@/utils/sanitizeInput';

/**
 * Interface for job application data
 */
export interface JobApplication {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  coverLetter: string;
  resume?: File;
  portfolioUrl?: string;
  referralSource?: string;
  termsAccepted: boolean;
}

/**
 * Submit a job application
 * @param application - The job application data
 * @returns A promise that resolves when the submission is successful
 */
export const submitJobApplication = async (
  application: JobApplication
): Promise<void> => {
  try {
    // Sanitize text inputs
    const sanitizedData = {
      ...application,
      fullName: sanitizeString(application.fullName),
      email: sanitizeString(application.email),
      phone: sanitizeString(application.phone),
      position: sanitizeString(application.position),
      experience: sanitizeString(application.experience),
      coverLetter: sanitizeString(application.coverLetter),
      portfolioUrl: application.portfolioUrl ? sanitizeString(application.portfolioUrl) : undefined,
      referralSource: application.referralSource ? sanitizeString(application.referralSource) : undefined,
    };

    // In a real implementation, this would send the data to a backend API
    console.log('Job application submitted:', sanitizedData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Example implementation with Supabase:
    // const { data, error } = await supabase
    //   .from('job_applications')
    //   .insert([{
    //     full_name: sanitizedData.fullName,
    //     email: sanitizedData.email,
    //     phone: sanitizedData.phone,
    //     position: sanitizedData.position,
    //     experience: sanitizedData.experience,
    //     cover_letter: sanitizedData.coverLetter,
    //     portfolio_url: sanitizedData.portfolioUrl,
    //     referral_source: sanitizedData.referralSource,
    //     terms_accepted: sanitizedData.termsAccepted,
    //     created_at: new Date().toISOString()
    //   }]);
    // 
    // if (error) throw error;
    
    return Promise.resolve();
  } catch (error) {
    console.error('Job application submission error:', error);
    return Promise.reject(error);
  }
};