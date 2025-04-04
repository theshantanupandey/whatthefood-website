
import React, { useState } from 'react';
import { useFormWithSavedProgress } from '@/hooks/useFormWithSavedProgress';
import { zodResolver } from '@hookform/resolvers/zod';
import z from '@/lib/zod-shim';
import { 
  CheckCircle2, 
  Upload,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { submitPartnerApplication, PartnerFormData } from '@/services/partnerService';
import { EnhancedFileUpload } from '@/components/ui/enhanced-file-upload';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  brandName: z.string().min(2, { message: 'Brand name is required' }),
  website: z.string().url({ message: 'Please enter a valid website URL' }),
  industryType: z.string().min(1, { message: 'Please select an industry type' }),
  contactName: z.string().min(2, { message: 'Contact name is required' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  collaborationTypes: z.array(z.string()).min(1, { message: 'Please select at least one collaboration type' }),
  additionalInfo: z.string().optional(),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: 'You must accept the partnership terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const PartnerApplicationForm = () => {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useFormWithSavedProgress<FormValues>({
    formId: 'partner-application',
    schema: formSchema,
    defaultValues: {
      brandName: '',
      website: '',
      industryType: '',
      contactName: '',
      email: '',
      phone: '',
      collaborationTypes: [],
      additionalInfo: '',
      termsAgreed: false,
    },
    onLoadProgress: (values) => {
      // Optional callback when saved progress is loaded
      console.log('Loaded saved form data:', values);
    }
  });

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setFile(files[0]);
    } else {
      setFile(null);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      const formData: PartnerFormData = {
        brandName: data.brandName,
        website: data.website,
        industryType: data.industryType,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        collaborationTypes: data.collaborationTypes,
        additionalInfo: data.additionalInfo,
        termsAgreed: data.termsAgreed,
        brandDeck: file || undefined
      };
      
      const response = await submitPartnerApplication(formData);
      
      if (response.success) {
        form.reset();
        setFile(null);
        form.clearSavedProgress();
        toast({
          title: "Application Submitted",
          description: "Thank you for your interest! We'll review your application and get back to you soon.",
        });
      } else {
        // Error is handled by the service and toast is shown there
        console.error("Submission failed:", response.error);
      }
    } catch (error) {
      console.error("Error submitting partnership application:", error);
      toast({
        title: "Submission Failed",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="brandName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Your brand name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website*</FormLabel>
                    <FormControl>
                      <Input placeholder="https://yourbrand.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="industryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Type*</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="fitness">Fitness & Wellness</SelectItem>
                      <SelectItem value="kitchen">Kitchen & Sustainability</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Person Name*</FormLabel>
                    <FormControl>
                      <Input placeholder="Full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <Input placeholder="Your contact number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="collaborationTypes"
              render={() => (
                <FormItem>
                  <FormLabel>How Would You Like to Collaborate?*</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                    {[
                      { id: 'product', label: 'Product Placement' },
                      { id: 'marketing', label: 'Marketing & Promotion' },
                      { id: 'mealplans', label: 'Meal Plans Integration' },
                      { id: 'cobranding', label: 'Co-Branding' },
                    ].map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="collaborationTypes"
                        render={({ field }) => {
                          return (
                            <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedCollabTypes = checked
                                      ? [...field.value, item.id]
                                      : field.value?.filter((value) => value !== item.id);
                                    field.onChange(updatedCollabTypes);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us more about your brand and partnership ideas..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <FormLabel>Upload Brand Deck or Portfolio (Optional)</FormLabel>
              <EnhancedFileUpload
                onChange={handleFileChange}
                value={file}
                accepted={[
                  'application/pdf',
                  'application/vnd.ms-powerpoint',
                  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                  'application/msword',
                  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                ]}
                maxSizeInMB={10}
                description="PDF, PPT, or DOC (Max 10MB)"
                label="Upload Brand Deck"
              />
            </div>
            
            <FormField
              control={form.control}
              name="termsAgreed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal">
                      I agree to the partnership terms & conditions*
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <div className="flex gap-4">
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Partnership Application'}
              </Button>
              
              {form.hasSavedProgress && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={form.saveProgress}
                  className="flex items-center gap-2"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Save Progress
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default PartnerApplicationForm;
