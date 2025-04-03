
import { supabase } from '@/lib/supabase';

type FormEvent = 'started' | 'field_completed' | 'validation_error' | 'saved_progress' | 'resumed' | 'submitted' | 'abandoned';

export interface FormAnalyticsData {
  formId: string;
  eventType: FormEvent;
  fieldName?: string;
  errorMessage?: string;
  timeSpent?: number;
  metadata?: Record<string, any>;
}

export async function trackFormEvent(data: FormAnalyticsData) {
  try {
    const { data: result, error } = await supabase
      .from('form_analytics')
      .insert([{
        form_id: data.formId,
        event_type: data.eventType,
        field_name: data.fieldName || null,
        error_message: data.errorMessage || null,
        time_spent: data.timeSpent || null,
        metadata: data.metadata || null,
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Error tracking form event:', error);
      return { success: false, error };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Error tracking form event:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

export async function getFormAnalytics(formId: string) {
  try {
    const { data, error } = await supabase
      .from('form_analytics')
      .select('*')
      .eq('form_id', formId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching form analytics:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching form analytics:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}

export async function getFormCompletionRate(formId: string) {
  try {
    const { data: started, error: startedError } = await supabase
      .from('form_analytics')
      .select('count')
      .eq('form_id', formId)
      .eq('event_type', 'started');

    const { data: submitted, error: submittedError } = await supabase
      .from('form_analytics')
      .select('count')
      .eq('form_id', formId)
      .eq('event_type', 'submitted');

    if (startedError || submittedError) {
      console.error('Error calculating form completion rate:', startedError || submittedError);
      return { success: false, error: startedError || submittedError };
    }

    const startCount = started?.[0]?.count || 0;
    const submitCount = submitted?.[0]?.count || 0;
    const completionRate = startCount > 0 ? (submitCount / startCount) * 100 : 0;

    return { 
      success: true, 
      data: {
        started: startCount,
        submitted: submitCount,
        completionRate
      }
    };
  } catch (error) {
    console.error('Error calculating form completion rate:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
}
