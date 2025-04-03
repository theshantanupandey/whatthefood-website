
import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Save, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { trackFormEvent } from '@/services/analyticsService';
import { useNavigate } from 'react-router-dom';

export interface Step {
  id: string;
  label: string;
  component: React.ReactNode;
  optional?: boolean;
}

interface MultiStepFormProps {
  steps: Step[];
  formId: string;
  onComplete: (allData: Record<string, any>) => Promise<boolean>;
  onSaveProgress?: (allData: Record<string, any>) => void;
  initialData?: Record<string, any>;
  submitButtonText?: string;
  showProgressBar?: boolean;
  allowExit?: boolean;
  exitPath?: string;
}

export function MultiStepForm({
  steps,
  formId,
  onComplete,
  onSaveProgress,
  initialData = {},
  submitButtonText = "Submit",
  showProgressBar = true,
  allowExit = true,
  exitPath = "/",
}: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [startTime] = useState<number>(Date.now());
  const navigate = useNavigate();

  // Track form start
  React.useEffect(() => {
    trackFormEvent({
      formId,
      eventType: 'started',
    }).catch(console.error);
  }, [formId]);

  // Calculate progress percentage
  const progress = useMemo(() => {
    return ((currentStep + 1) / steps.length) * 100;
  }, [currentStep, steps.length]);

  const handleStepDataChange = useCallback((stepId: string, data: any) => {
    setFormData(prev => ({
      ...prev,
      [stepId]: data
    }));

    trackFormEvent({
      formId,
      eventType: 'field_completed',
      fieldName: stepId,
    }).catch(console.error);
  }, [formId]);

  const saveProgress = useCallback(async () => {
    setIsSaving(true);
    try {
      if (onSaveProgress) {
        onSaveProgress(formData);
      }
      
      // Save to local storage as fallback
      localStorage.setItem(`form-progress-${formId}`, JSON.stringify(formData));
      
      await trackFormEvent({
        formId,
        eventType: 'saved_progress',
        timeSpent: Date.now() - startTime,
      });
      
      toast({
        title: "Progress saved",
        description: "You can continue later from where you left off.",
      });
    } catch (error) {
      console.error('Error saving progress:', error);
      toast({
        title: "Failed to save progress",
        description: "There was an error saving your progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }, [formData, formId, onSaveProgress, startTime]);

  const handleNext = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, steps.length]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    try {
      // Track submission time
      await trackFormEvent({
        formId,
        eventType: 'submitted',
        timeSpent: Date.now() - startTime,
        metadata: { stepsCompleted: currentStep + 1 },
      });
      
      // Process form submission
      const success = await onComplete(formData);
      
      if (success) {
        // Clear saved progress after successful submission
        localStorage.removeItem(`form-progress-${formId}`);
        
        toast({
          title: "Form submitted successfully",
          description: "Thank you for your submission.",
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      toast({
        title: "Submission failed",
        description: error instanceof Error ? error.message : "An error occurred during submission. Please try again.",
        variant: "destructive",
      });
      
      await trackFormEvent({
        formId,
        eventType: 'validation_error',
        errorMessage: error instanceof Error ? error.message : "Submission error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onComplete, currentStep, formId, startTime]);

  const handleExit = useCallback(() => {
    // Ask for confirmation before navigating away
    const confirmExit = window.confirm(
      "Are you sure you want to exit? Your progress will be saved, but you'll need to start from the beginning next time."
    );
    
    if (confirmExit) {
      // Track form abandonment
      trackFormEvent({
        formId,
        eventType: 'abandoned',
        timeSpent: Date.now() - startTime,
        metadata: { stepsCompleted: currentStep + 1 },
      }).catch(console.error);
      
      saveProgress().then(() => {
        navigate(exitPath);
      });
    }
  }, [formId, currentStep, startTime, saveProgress, navigate, exitPath]);

  // Render current step
  const currentStepData = steps[currentStep];
  
  return (
    <div className="space-y-8">
      {/* Progress tracker */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {steps.length}: {currentStepData.label}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        {showProgressBar && (
          <Progress value={progress} className="h-2" />
        )}
      </div>
      
      {/* Step content */}
      <div className="py-4">
        {React.isValidElement(currentStepData.component) && 
          React.cloneElement(
            currentStepData.component as React.ReactElement, 
            {
              data: formData[currentStepData.id],
              onChange: (data: any) => handleStepDataChange(currentStepData.id, data)
            }
          )
        }
      </div>
      
      {/* Navigation buttons */}
      <div className="flex justify-between pt-4 border-t">
        <div className="flex space-x-2">
          {allowExit && (
            <Button
              type="button"
              variant="outline"
              onClick={handleExit}
              disabled={isSubmitting}
            >
              Save & Exit
            </Button>
          )}
          
          <Button
            type="button"
            variant="ghost"
            onClick={saveProgress}
            disabled={isSubmitting || isSaving}
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Progress
              </>
            )}
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0 || isSubmitting}
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {currentStep < steps.length - 1 ? (
            <Button 
              type="button" 
              onClick={handleNext}
              disabled={isSubmitting}
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                submitButtonText
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
