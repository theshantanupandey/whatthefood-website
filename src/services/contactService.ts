
import { supabase } from '@/lib/supabase';
import { sanitizeObject } from '@/utils/sanitizeInput';
import { toast } from '@/hooks/use-toast';
import { trackFormEvent } from '@/services/analyticsService';
import z from '@/lib/zod-shim';

// Define validation schema
export const contactFormSchema = z.object({
  name: z.string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be 100 characters or less" })
    .refine(val => !val.includes('<script>'), { 
      message: "Name contains invalid characters" 
    }),
  
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be 255 characters or less" }),
  
  subject: z.string()
    .min(2, { message: "Subject is required" })
    .max(200, { message: "Subject must be 200 characters or less" }),
  
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(5000, { message: "Message must be 5000 characters or less" }),
});

// Type for the form data
export type ContactFormData = z.infer<typeof contactFormSchema>;

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

export async function submitContactForm(data: ContactFormData): Promise<ContactSubmissionResult> {
  try {
    console.log('Submitting contact form data...');
    
    // Validate the data against the schema
    const validationResult = contactFormSchema.safeParse(data);
    if (!validationResult.success) {
      console.error('Validation errors:', validationResult.error);
      
      // Track validation error
      await trackFormEvent({
        formId: 'contact-form',
        eventType: 'validation_error',
        errorMessage: validationResult.error.toString(),
      });
      
      return {
        success: false,
        message: 'Please correct the form errors and try again.',
        error: validationResult.error.format()
      };
    }
    
    // Sanitize input data to prevent XSS attacks
    const sanitizedData = sanitizeObject(validationResult.data);
    
    const { data: result, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: sanitizedData.name,
        email: sanitizedData.email,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error submitting contact form:', error);
      
      // Track submission error
      await trackFormEvent({
        formId: 'contact-form',
        eventType: 'validation_error',
        errorMessage: error.message,
      });
      
      throw error;
    }

    console.log('Contact form submitted successfully!');
    
    // Track successful submission
    await trackFormEvent({
      formId: 'contact-form',
      eventType: 'submitted',
    });
    
    return {
      success: true,
      message: `Thank you, ${sanitizedData.name}! Your message has been received. We'll get back to you soon.`,
      data: result
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    // Show appropriate error message based on error type
    let errorMessage = 'There was an error submitting your message. Please try again later.';
    
    if (error instanceof Error) {
      if (error.message.includes('network')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (error.message.includes('unique constraint')) {
        errorMessage = 'You have already submitted this form recently. Please try again later.';
      }
    }
    
    toast({
      title: "Error Submitting Form",
      description: errorMessage,
      variant: "destructive",
    });
    
    return {
      success: false,
      message: errorMessage,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

// Implement local storage for saving form progress
export function saveContactFormProgress(data: Partial<ContactFormData>): void {
  try {
    localStorage.setItem('contact-form-progress', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving form progress:', error);
  }
}

export function getContactFormProgress(): Partial<ContactFormData> | null {
  try {
    const saved = localStorage.getItem('contact-form-progress');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Error retrieving form progress:', error);
    return null;
  }
}

export function clearContactFormProgress(): void {
  try {
    localStorage.removeItem('contact-form-progress');
  } catch (error) {
    console.error('Error clearing form progress:', error);
  }
}
