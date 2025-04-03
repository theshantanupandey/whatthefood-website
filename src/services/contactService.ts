import { supabase } from '@/lib/supabase';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export async function submitContactForm(data: ContactFormData): Promise<ContactSubmissionResult> {
  try {
    console.log('Submitting contact form data...');
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }

    console.log('Contact form submitted successfully!');
    return {
      success: true,
      message: `Thank you, ${data.name}! Your message has been received. We'll get back to you soon.`,
      data: result
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      message: 'There was an error submitting your message. Please try again later.',
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
