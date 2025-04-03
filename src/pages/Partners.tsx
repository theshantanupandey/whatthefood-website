
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitPartnerApplication } from '@/services/partnerService';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const partnerFormSchema = z.object({
  brandName: z.string().min(2, "Brand name is required"),
  website: z.string().url("Must be a valid website URL"),
  industryType: z.string().min(2, "Industry type is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Must be a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  collaborationTypes: z.array(z.string()).min(1, "Select at least one collaboration type"),
  additionalInfo: z.string().optional(),
  termsAgreed: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions"
  }),
  brandDeckFile: z.any().optional()
});

type PartnerFormValues = z.infer<typeof partnerFormSchema>;

const collaborationOptions = [
  { id: "co-branded-menu", label: "Co-branded Menu Items" },
  { id: "promotional-deals", label: "Promotional Deals/Discounts" },
  { id: "events", label: "Events & Pop-ups" },
  { id: "digital-content", label: "Digital Content Collaboration" },
  { id: "product-integration", label: "Product Integration" }
];

const Partners = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const form = useForm<PartnerFormValues>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      brandName: "",
      website: "",
      industryType: "",
      contactName: "",
      email: "",
      phone: "",
      collaborationTypes: [],
      additionalInfo: "",
      termsAgreed: false
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: PartnerFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create a properly typed object that matches the PartnerFormData interface
      const formData = {
        brandName: data.brandName,
        website: data.website,
        industryType: data.industryType,
        contactName: data.contactName,
        email: data.email,
        phone: data.phone,
        collaborationTypes: data.collaborationTypes,
        additionalInfo: data.additionalInfo || "",
        termsAgreed: data.termsAgreed,
        brandDeckFile: selectedFile
      };
      
      const response = await submitPartnerApplication(formData);
      
      if (response.success) {
        toast.success('Application Submitted!', {
          description: "Thank you for your interest in partnering with us. We will be in touch shortly."
        });
        form.reset();
        setSelectedFile(null);
      } else {
        toast.error('Submission Failed', {
          description: String(response.error) || 'Failed to submit your application. Please try again.'
        });
      }
    } catch (error) {
      toast.error('Submission Error', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Partner with Us</h1>
        <p className="text-lg mb-8">
          Join forces with What The Food to create innovative culinary experiences and reach new audiences.
          Fill out the form below and our partnerships team will get back to you shortly.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="brandName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand/Company Name</FormLabel>
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
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://yourbrand.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="industryType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry Type</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Food & Beverage, Retail, Tech" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@yourbrand.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel className="block mb-2">Interested in (select all that apply)</FormLabel>
              <div className="space-y-2">
                {collaborationOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      onCheckedChange={(checked) => {
                        const currentValues = form.getValues().collaborationTypes || [];
                        if (checked) {
                          form.setValue('collaborationTypes', [...currentValues, option.id]);
                        } else {
                          form.setValue(
                            'collaborationTypes',
                            currentValues.filter((value) => value !== option.id)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </div>
                ))}
              </div>
              {form.formState.errors.collaborationTypes && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.collaborationTypes.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="brand-deck" className="block mb-2">Brand Deck/Presentation (PDF, max 10MB)</Label>
              <Input 
                id="brand-deck" 
                type="file" 
                accept=".pdf,.ppt,.pptx,.doc,.docx" 
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground mt-1">Selected: {selectedFile.name}</p>
              )}
            </div>

            <FormField
              control={form.control}
              name="additionalInfo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us more about your partnership ideas or specific requirements" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <FormLabel>
                      I agree to the terms and conditions, including the processing of my data as described in the privacy policy
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full md:w-auto"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Partnership Application'}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Partners;
