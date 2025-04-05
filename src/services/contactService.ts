/**
 * Service for handling contact form submissions
 */

import { supabase } from '@/lib/supabase';
import { sanitizeString, sanitizeObject } from '@/utils/sanitizeInput';
import z from '@/lib/zod-shim';

/**
 * Schema for contact form validation
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z.string().email({ message: 'Valid email address is required' }),
  subject: z.string().min(2, { message: 'Subject is required' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' })
});

/**
 * Interface for contact form data
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Submit a contact form
 * @param formData - The contact form data
 * @returns A promise that resolves with the submission result
 */
export const submitContactForm = async (
  formData: ContactFormData
): Promise<{ success: boolean; message?: string; error?: any }> => {
  try {
    // Sanitize text inputs
    const sanitizedData = sanitizeObject(formData);

    console.log('Contact form submitted:', sanitizedData);
    
    // Insert data into Supabase
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: sanitizedData.name,
        email: sanitizedData.email,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        created_at: new Date().toISOString()
      }]);
    
    if (error) throw error;
    
    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon."
    };
  } catch (error) {
    console.error('Contact form submission error:', error);
    return {
      success: false,
      message: "There was a problem sending your message. Please try again.",
      error
    };
  }
};

/**
 * Save contact form progress to localStorage
 * @param formData - The partial contact form data to save
 */
export const saveContactFormProgress = (formData: Partial<ContactFormData>): void => {
  try {
    localStorage.setItem('contact-form-progress', JSON.stringify(formData));
  } catch (error) {
    console.error('Error saving contact form progress:', error);
  }
};

/**
 * Get saved contact form progress from localStorage
 * @returns The saved form data or null if none exists
 */
export const getContactFormProgress = (): Partial<ContactFormData> | null => {
  try {
    const savedData = localStorage.getItem('contact-form-progress');
    if (!savedData) return null;
    return JSON.parse(savedData);
  } catch (error) {
    console.error('Error retrieving contact form progress:', error);
    return null;
  }
};

/**
 * Clear saved contact form progress from localStorage
 */
export const clearContactFormProgress = (): void => {
  try {
    localStorage.removeItem('contact-form-progress');
  } catch (error) {
    console.error('Error clearing contact form progress:', error);
  }
};