
import { useEffect, useState } from 'react';
import { UseFormReturn, useForm, FieldValues, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';

export type FormSaveOptions<T extends FieldValues> = {
  formId: string;
  schema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  onLoadProgress?: (values: DefaultValues<T>) => void;
  onSaveProgress?: (values: T) => void;
}

export function useFormWithSavedProgress<T extends FieldValues>(
  options: FormSaveOptions<T>
): UseFormReturn<T> & { 
  saveProgress: () => void;
  clearSavedProgress: () => void;
  hasSavedProgress: boolean;
} {
  const { formId, schema, defaultValues, onLoadProgress, onSaveProgress } = options;
  const [hasSavedProgress, setHasSavedProgress] = useState(false);
  const localStorageKey = `form-progress-${formId}`;
  
  // Initialize form with potential saved values
  const getSavedValues = (): DefaultValues<T> => {
    if (typeof window === 'undefined') return defaultValues;
    
    try {
      const savedFormData = localStorage.getItem(localStorageKey);
      if (!savedFormData) return defaultValues;
      
      const parsedData = JSON.parse(savedFormData);
      return { ...defaultValues, ...parsedData };
    } catch (error) {
      console.error('Error loading saved form data:', error);
      return defaultValues;
    }
  };
  
  const savedValues = getSavedValues();
  
  // Check if we have saved progress
  useEffect(() => {
    const savedFormData = localStorage.getItem(localStorageKey);
    setHasSavedProgress(!!savedFormData);
    
    if (savedFormData && onLoadProgress) {
      try {
        const parsedData = JSON.parse(savedFormData);
        onLoadProgress(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, [localStorageKey, onLoadProgress]);
  
  // Initialize the form with react-hook-form
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: savedValues,
  });
  
  // Function to save form progress
  const saveProgress = () => {
    const values = form.getValues();
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(values));
      setHasSavedProgress(true);
      toast({
        title: "Progress saved",
        description: "You can continue later from where you left off.",
      });
      if (onSaveProgress) onSaveProgress(values);
    } catch (error) {
      console.error('Error saving form progress:', error);
      toast({
        title: "Failed to save progress",
        description: "There was an error saving your progress. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Function to clear saved progress
  const clearSavedProgress = () => {
    try {
      localStorage.removeItem(localStorageKey);
      setHasSavedProgress(false);
    } catch (error) {
      console.error('Error clearing form progress:', error);
    }
  };
  
  return {
    ...form,
    saveProgress,
    clearSavedProgress,
    hasSavedProgress,
  };
}
