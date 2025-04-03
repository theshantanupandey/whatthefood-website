import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from '@/lib/zod-shim';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Briefcase,
  Phone,
  Mail,
  MapPin,
  Utensils,
  Calendar,
  DollarSign,
  File,
  MessageSquare,
  Check,
  Upload,
  ArrowRight,
} from 'lucide-react';
import { submitVendorApplication, VendorFormData } from '@/services/vendorService';
import { ensureRequiredBuckets } from '@/utils/setupBuckets';

const formSchema = z.object({
  businessName: z.string().min(2, { message: 'Business name is required' }),
  ownerName: z.string().min(2, { message: 'Owner/Manager name is required' }),
  businessType: z.string({ required_error: 'Please select a business type' }),
  registrationNumber: z.string().optional(),
  gstNumber: z.string().optional(),
  
  phone: z.string().min(10, { message: 'Valid phone number is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  address: z.string().min(5, { message: 'Business address is required' }),
  cityState: z.string({ required_error: 'Please select your city and state' }),
  
  mealsPerDay: z.number().min(1, { message: 'Please enter a valid number' }),
  cuisines: z.array(z.string()).min(1, { message: 'Select at least one cuisine' }),
  vegetarianOptions: z.boolean(),
  fssaiStandards: z.boolean(),
  packagingOption: z.string({ required_error: 'Please select an option' }),
  
  mealTypes: z.array(z.string()).min(1, { message: 'Select at least one meal type' }),
  priceRange: z.string({ required_error: 'Please select a price range' }),
  customizationWilling: z.boolean(),
  existingDelivery: z.boolean(),
  
  whyPartner: z.string().min(10, { message: 'Please provide some details' }),
  additionalComments: z.string().optional(),
  
  termsAgreed: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const cityStateOptions = [
  'New Delhi, Delhi',
  'Mumbai, Maharashtra',
  'Bangalore, Karnataka',
  'Chennai, Tamil Nadu',
  'Hyderabad, Telangana',
  'Kolkata, West Bengal',
  'Pune, Maharashtra',
  'Ahmedabad, Gujarat',
  'Jaipur, Rajasthan',
  'Lucknow, Uttar Pradesh',
];

const cuisineOptions = [
  'Indian',
  'Continental',
  'Asian',
  'Mediterranean',
  'Mexican',
  'Italian',
  'Chinese',
  'Japanese',
  'Vegan',
  'Keto',
  'Paleo',
];

const mealTypeOptions = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
  { id: 'allday', label: 'All-day' },
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILES = 5; // Maximum number of files per category

const VendorApplication = () => {
  const navigate = useNavigate();
  const [formStep, setFormStep] = useState(0);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
  const [kitchenPhotos, setKitchenPhotos] = useState<File[]>([]);
  const [foodPhotos, setFoodPhotos] = useState<File[]>([]);
  
  // Ensure buckets exist when component mounts
  useEffect(() => {
    ensureRequiredBuckets().catch(err => {
      console.error('Error setting up buckets:', err);
    });
  }, []);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: '',
      ownerName: '',
      registrationNumber: '',
      gstNumber: '',
      phone: '',
      email: '',
      address: '',
      mealsPerDay: 0,
      cuisines: [],
      vegetarianOptions: false,
      fssaiStandards: false,
      mealTypes: [],
      customizationWilling: false,
      existingDelivery: false,
      whyPartner: '',
      additionalComments: '',
      termsAgreed: false,
    },
  });
  
  const validateFiles = (files: File[]): { valid: boolean; error?: string } => {
    if (files.length > MAX_FILES) {
      return { valid: false, error: `Maximum ${MAX_FILES} files allowed` };
    }

    for (const file of files) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        return { valid: false, error: 'Only JPG, PNG and WebP images are allowed' };
      }
      if (file.size > MAX_FILE_SIZE) {
        return { valid: false, error: 'Files must be less than 10MB' };
      }
    }

    return { valid: true };
  };

  const handleSubmit = async (data: FormValues) => {
    setSubmitting(true);
    setIsUploading(true);
    
    try {
      // Validate kitchen photos
      if (kitchenPhotos.length > 0) {
        const kitchenValidation = validateFiles(kitchenPhotos);
        if (!kitchenValidation.valid) {
          toast.error("Kitchen Photos Error", {
            description: kitchenValidation.error,
          });
          return;
        }
      }

      // Validate food photos
      if (foodPhotos.length > 0) {
        const foodValidation = validateFiles(foodPhotos);
        if (!foodValidation.valid) {
          toast.error("Food Photos Error", {
            description: foodValidation.error,
          });
          return;
        }
      }

      const formData: VendorFormData = {
        businessName: data.businessName,
        ownerName: data.ownerName,
        businessType: data.businessType,
        registrationNumber: data.registrationNumber,
        gstNumber: data.gstNumber,
        phone: data.phone,
        email: data.email,
        address: data.address,
        cityState: data.cityState,
        mealsPerDay: data.mealsPerDay,
        cuisines: data.cuisines,
        vegetarianOptions: data.vegetarianOptions,
        deliveryOptions: [data.packagingOption || ''],
        mealTypes: data.mealTypes,
        healthCertifications: data.fssaiStandards ? ['FSSAI'] : [],
        kitchenPhotos: kitchenPhotos,
        foodPhotos: foodPhotos,
        additionalInfo: data.additionalComments,
        additionalComments: data.additionalComments,
        termsAgreed: data.termsAgreed,
        packagingOption: data.packagingOption,
        priceRange: data.priceRange,
        customizationWilling: data.customizationWilling,
        existingDelivery: data.existingDelivery,
        whyPartner: data.whyPartner,
        fssaiStandards: data.fssaiStandards
      };
      
      const response = await submitVendorApplication(formData);
      
      if (response.success) {
        toast.success('Application Submitted', {
          description: 'Your vendor application has been submitted successfully. We will contact you soon!',
        });
        // Only reset and navigate after successful toast
        setTimeout(() => {
          form.reset();
          setKitchenPhotos([]);
          setFoodPhotos([]);
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting vendor application:", error);
      toast.error('Submission Failed', {
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    } finally {
      setSubmitting(false);
      setIsUploading(false);
    }
  };
  
  const totalSteps = 7;
  
  const nextFormStep = () => {
    setFormStep(prev => Math.min(prev + 1, totalSteps - 1));
  };
  
  const prevFormStep = () => {
    setFormStep(prev => Math.max(prev - 1, 0));
  };
  
  const handleMealTypeChange = (mealType: string) => {
    setSelectedMealTypes(prev => {
      const newMealTypes = prev.includes(mealType)
        ? prev.filter(m => m !== mealType)
        : [...prev, mealType];
      
      // Update form value with the new array
      form.setValue('mealTypes', newMealTypes);
      
      return newMealTypes;
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/70 -z-10"></div>
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <AnimatedSection animation="fade-in-left" className="mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <h1 className="mb-4">Vendor Application</h1>
              <p className="text-muted-foreground">
                Please fill out the form below to apply to become a vendor partner with What The Food.
              </p>
            </div>
            
            <AnimatedSection animation="fade-in" delay={300} className="mb-8">
              <div className="flex justify-between items-center">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        index <= formStep
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="text-xs text-muted-foreground hidden sm:block">
                      {index === 0
                        ? 'Business'
                        : index === 1
                        ? 'Contact'
                        : index === 2
                        ? 'Kitchen'
                        : index === 3
                        ? 'Availability'
                        : index === 4
                        ? 'Documents'
                        : index === 5
                        ? 'Additional'
                        : 'Terms'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full bg-muted h-1 mt-4 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-300 ease-in-out"
                  style={{ width: `${(formStep / (totalSteps - 1)) * 100}%` }}
                />
              </div>
            </AnimatedSection>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <Card className="border-none shadow-md glass">
                  <CardContent className="pt-6">
                    {formStep === 0 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Briefcase className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">Business Information</h2>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="businessName" className="block text-sm font-medium mb-1">
                              Business Name*
                            </label>
                            <Input
                              id="businessName"
                              placeholder="Enter your business name"
                              {...form.register('businessName')}
                            />
                            {form.formState.errors.businessName && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.businessName.message}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="ownerName" className="block text-sm font-medium mb-1">
                              Owner/Manager Name*
                            </label>
                            <Input
                              id="ownerName"
                              placeholder="Enter owner or manager name"
                              {...form.register('ownerName')}
                            />
                            {form.formState.errors.ownerName && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.ownerName.message}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="businessType" className="block text-sm font-medium mb-1">
                              Business Type*
                            </label>
                            <Select
                              onValueChange={(value) => form.setValue('businessType', value)}
                              defaultValue={form.getValues('businessType')}
                            >
                              <SelectTrigger id="businessType">
                                <SelectValue placeholder="Select business type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Cloud Kitchen">Cloud Kitchen</SelectItem>
                                <SelectItem value="Restaurant">Restaurant</SelectItem>
                                <SelectItem value="Tiffin Service">Tiffin Service</SelectItem>
                                <SelectItem value="Catering">Catering</SelectItem>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.businessType && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.businessType.message}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="registrationNumber" className="block text-sm font-medium mb-1">
                              Business Registration Number (if applicable)
                            </label>
                            <Input
                              id="registrationNumber"
                              placeholder="Enter registration number"
                              {...form.register('registrationNumber')}
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="gstNumber" className="block text-sm font-medium mb-1">
                              GST Number (if applicable)
                            </label>
                            <Input
                              id="gstNumber"
                              placeholder="Enter GST number"
                              {...form.register('gstNumber')}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formStep === 1 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Phone className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">Contact Details</h2>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium mb-1">
                              Phone Number*
                            </label>
                            <Input
                              id="phone"
                              placeholder="Enter phone number"
                              {...form.register('phone')}
                            />
                            {form.formState.errors.phone && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.phone.message}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium mb-1">
                              Email Address*
                            </label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="Enter email address"
                              {...form.register('email')}
                            />
                            {form.formState.errors.email && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.email.message}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="address" className="block text-sm font-medium mb-1">
                              Business Address*
                            </label>
                            <Input
                              id="address"
                              placeholder="Enter business address"
                              {...form.register('address')}
                            />
                            {form.formState.errors.address && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.address.message}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="cityState" className="block text-sm font-medium mb-1">
                              City & State*
                            </label>
                            <Select
                              onValueChange={(value) => form.setValue('cityState', value)}
                              defaultValue={form.getValues('cityState')}
                            >
                              <SelectTrigger id="cityState">
                                <SelectValue placeholder="Select city & state" />
                              </SelectTrigger>
                              <SelectContent>
                                {cityStateOptions.map((option) => (
                                  <SelectItem key={option} value={option}>
                                    {option}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {form.formState.errors.cityState && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.cityState.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formStep === 2 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Utensils className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">Kitchen & Service Details</h2>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="mealsPerDay" className="block text-sm font-medium mb-1">
                              How many meals can you prepare daily?*
                            </label>
                            <Input
                              id="mealsPerDay"
                              type="number"
                              placeholder="Enter number of meals"
                              min={1}
                              onChange={(e) => form.setValue('mealsPerDay', parseInt(e.target.value) || 0)}
                            />
                            {form.formState.errors.mealsPerDay && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.mealsPerDay.message}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Cuisine Specialties*
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                              {cuisineOptions.map((cuisine) => (
                                <div key={cuisine} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`cuisine-${cuisine}`}
                                    checked={selectedCuisines.includes(cuisine)}
                                    onCheckedChange={() => {
                                      setSelectedCuisines(prev => {
                                        const newCuisines = prev.includes(cuisine)
                                          ? prev.filter(c => c !== cuisine)
                                          : [...prev, cuisine];
                                        
                                        // Update form value with the new array
                                        form.setValue('cuisines', newCuisines);
                                        
                                        return newCuisines;
                                      });
                                    }}
                                  />
                                  <label
                                    htmlFor={`cuisine-${cuisine}`}
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {cuisine}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {form.formState.errors.cuisines && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.cuisines.message}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="vegetarianOptions"
                              checked={form.watch("vegetarianOptions")}
                              onCheckedChange={(checked) => {
                                form.setValue("vegetarianOptions", checked === true);
                              }}
                            />
                            <label
                              htmlFor="vegetarianOptions"
                              className="text-sm leading-none"
                            >
                              Do you provide vegetarian and non-vegetarian options?
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="fssaiStandards"
                              checked={form.watch('fssaiStandards')}
                              onCheckedChange={(checked) => {
                                form.setValue('fssaiStandards', checked === true);
                              }}
                            />
                            <label
                              htmlFor="fssaiStandards"
                              className="text-sm leading-none"
                            >
                              Do you follow FSSAI Food Safety Standards?
                            </label>
                          </div>
                          
                          <div>
                            <label htmlFor="packagingOption" className="block text-sm font-medium mb-1">
                              Do you offer food packaging & delivery, or need assistance?*
                            </label>
                            <Select
                              onValueChange={(value) => form.setValue('packagingOption', value)}
                              defaultValue={form.getValues('packagingOption')}
                            >
                              <SelectTrigger id="packagingOption">
                                <SelectValue placeholder="Select option" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Self-packaging & delivery">Self-packaging & delivery</SelectItem>
                                <SelectItem value="Need packaging & delivery support">Need packaging & delivery support</SelectItem>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.packagingOption && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.packagingOption.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formStep === 3 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <Calendar className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">Availability & Pricing</h2>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">
                              Which meal types do you offer?*
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {mealTypeOptions.map((option) => (
                                <div key={option.id} className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`mealType-${option.id}`}
                                    checked={selectedMealTypes.includes(option.id)}
                                    onCheckedChange={() => handleMealTypeChange(option.id)}
                                  />
                                  <label
                                    htmlFor={`mealType-${option.id}`}
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                            {form.formState.errors.mealTypes && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.mealTypes.message}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="priceRange" className="block text-sm font-medium mb-1">
                              What is your average meal price range?*
                            </label>
                            <Select
                              onValueChange={(value) => form.setValue('priceRange', value)}
                              defaultValue={form.getValues('priceRange')}
                            >
                              <SelectTrigger id="priceRange">
                                <SelectValue placeholder="Select price range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="₹50-₹100">₹50-₹100</SelectItem>
                                <SelectItem value="₹100-₹150">₹100-₹150</SelectItem>
                                <SelectItem value="₹150-₹200">₹150-₹200</SelectItem>
                                <SelectItem value="₹200+">₹200+</SelectItem>
                              </SelectContent>
                            </Select>
                            {form.formState.errors.priceRange && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.priceRange.message}
                              </p>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="customizationWilling"
                              checked={form.watch('customizationWilling')}
                              onCheckedChange={(checked) => {
                                form.setValue('customizationWilling', checked === true);
                              }}
                            />
                            <label
                              htmlFor="customizationWilling"
                              className="text-sm leading-none"
                            >
                              Are you open to meal plan customization?
                            </label>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="existingDelivery"
                              checked={form.watch('existingDelivery')}
                              onCheckedChange={(checked) => {
                                form.setValue('existingDelivery', checked === true);
                              }}
                            />
                            <label
                              htmlFor="existingDelivery"
                              className="text-sm leading-none"
                            >
                              Do you have an existing delivery system?
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formStep === 4 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <File className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">Documents Upload</h2>
                          <span className="text-xs bg-accent text-muted-foreground px-2 py-0.5 rounded">Optional</span>
                        </div>
                        
                        <div className="space-y-4">
                          <p className="text-sm text-muted-foreground">
                            While optional, providing these documents may expedite your application process.
                          </p>
                          
                          <div className="space-y-6">
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                FSSAI License
                              </label>
                              <div
                                className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition"
                                onClick={() => document.getElementById('fssaiLicenseInput').click()}
                              >
                                <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  PDF or Image (max. 5MB)
                                </p>
                                <input
                                  id="fssaiLicenseInput"
                                  type="file"
                                  accept=".pdf, image/*"
                                  style={{ display: 'none' }}
                                  onChange={(e) => {
                                    const files = e.target.files;
                                    if (files) {
                                      setKitchenPhotos(Array.from(files));
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                GST Certificate (if applicable)
                              </label>
                              <div
                                className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition"
                                onClick={() => document.getElementById('gstCertificateInput').click()}
                              >
                                <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  PDF or Image (max. 5MB)
                                </p>
                                <input
                                  id="gstCertificateInput"
                                  type="file"
                                  accept=".pdf, image/*"
                                  style={{ display: 'none' }}
                                  onChange={(e) => {
                                    const files = e.target.files;
                                    if (files) {
                                      setFoodPhotos(Array.from(files));
                                    }
                                  }}
                                />
                              </div>
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium mb-2">
                                Sample Menu & Pricing
                              </label>
                              <div
                                className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition"
                                onClick={() => document.getElementById('sampleMenuInput').click()}
                              >
                                <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground">
                                  Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  PDF or Image (max. 5MB)
                                </p>
                                <input
                                  id="sampleMenuInput"
                                  type="file"
                                  accept=".pdf, image/*"
                                  style={{ display: 'none' }}
                                  onChange={(e) => {
                                    const files = e.target.files;
                                    if (files) {
                                      // setSampleMenu(Array.from(files));
                                    }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formStep === 5 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <MessageSquare className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">Additional Information</h2>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="whyPartner" className="block text-sm font-medium mb-1">
                              Why do you want to partner with What The Food?*
                            </label>
                            <Textarea
                              id="whyPartner"
                              placeholder="Tell us about your interest in partnering with us"
                              rows={4}
                              {...form.register('whyPartner')}
                            />
                            {form.formState.errors.whyPartner && (
                              <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.whyPartner.message}
                              </p>
                            )}
                          </div>
                          
                          <div>
                            <label htmlFor="additionalComments" className="block text-sm font-medium mb-1">
                              Any additional comments or special requests?
                            </label>
                            <Textarea
                              id="additionalComments"
                              placeholder="Add any additional information that might be helpful"
                              rows={4}
                              {...form.register('additionalComments')}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formStep === 6 && (
                      <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-4">
                          <File className="h-5 w-5 text-primary" />
                          <h2 className="text-xl font-semibold">Terms & Conditions</h2>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-muted p-4 rounded-lg max-h-60 overflow-y-auto">
                            <h3 className="font-medium mb-2">Vendor Partnership Terms</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              By agreeing to these terms, you acknowledge and confirm that:
                            </p>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              <li>All information provided is accurate and complete.</li>
                              <li>You will maintain food safety standards at all times.</li>
                              <li>You will adhere to agreed-upon delivery schedules and quality standards.</li>
                              <li>You understand the commission structure and payment terms.</li>
                              <li>You will provide accurate menu information including allergens and nutritional information.</li>
                              <li>You will respond promptly to customer feedback and address issues.</li>
                              <li>What The Food reserves the right to terminate the partnership if terms are violated.</li>
                              <li>You agree to a trial period to assess service quality and reliability.</li>
                            </ul>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="termsAgreed"
                              checked={form.watch("termsAgreed")}
                              onCheckedChange={(checked) => {
                                form.setValue("termsAgreed", checked === true);
                              }}
                            />
                            <label
                              htmlFor="termsAgreed"
                              className="text-sm leading-none"
                            >
                              I agree to the terms and conditions of partnering with What The Food*
                            </label>
                          </div>
                          {form.formState.errors.termsAgreed && (
                            <p className="text-sm text-destructive mt-1">
                              {form.formState.errors.termsAgreed.message}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter className="flex justify-between pt-4">
                    {formStep > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevFormStep}
                      >
                        Previous
                      </Button>
                    )}
                    
                    {formStep < totalSteps - 1 ? (
                      <Button
                        type="button"
                        onClick={nextFormStep}
                        className="ml-auto"
                      >
                        Next <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="ml-auto"
                        disabled={isSubmitting || isUploading}
                      >
                        {isSubmitting || isUploading ? 'Submitting...' : 'Submit Application'}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </form>
            </Form>
          </AnimatedSection>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorApplication;
