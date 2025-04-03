
import { supabase } from '@/lib/supabase';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SubmissionResult {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

export async function submitContactForm(data: ContactFormData): Promise<SubmissionResult> {
  try {
    console.log('Submitting contact form...');
    
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      }])
      .select();

    if (error) {
      console.error('Error submitting contact form:', error);
      return {
        success: false,
        error: error.message || 'Database error occurred'
      };
    }

    console.log('Contact form submitted successfully!');
    return {
      success: true,
      message: `Thank you, ${data.name}! Your message has been received. We'll get back to you soon.`,
      data: result
    };
  } catch (error) {
    console.error('Unexpected error submitting contact form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
