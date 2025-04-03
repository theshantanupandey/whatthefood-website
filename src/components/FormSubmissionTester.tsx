import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { submitContactForm } from '@/services/contactService';
import { submitPartnerApplication } from '@/services/partnerService';
import { submitVendorApplication } from '@/services/vendorService';
import { subscribeToNewsletter } from '@/services/newsletterService';

const FormSubmissionTester: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'partner' | 'vendor' | 'newsletter'>('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Subject',
    message: 'This is a test message from the form tester.'
  });
  
  // Partner form state
  const [partnerForm, setPartnerForm] = useState({
    brandName: 'Test Brand',
    website: 'https://example.com',
    industryType: 'Food',
    contactName: 'Test Contact',
    email: 'partner@example.com',
    phone: '1234567890',
    collaborationTypes: ['Marketing'],
    additionalInfo: 'Test additional info',
    termsAgreed: true,
    brandDeck: null as File | null
  });
  
  // Vendor form state
  const [vendorForm, setVendorForm] = useState({
    businessName: 'Test Vendor',
    ownerName: 'Test Owner',
    businessType: 'Restaurant',
    phone: '9876543210',
    email: 'vendor@example.com',
    address: '123 Test Street',
    cityState: 'Delhi, India',
    mealsPerDay: 100,
    cuisines: ['Indian'],
    vegetarianOptions: true,
    deliveryOptions: ['Eco-friendly'],
    mealTypes: ['Lunch'],
    healthCertifications: ['FSSAI'],
    kitchenPhotos: [] as File[],
    foodPhotos: [] as File[],
    sampleMenu: [] as File[],
    additionalInfo: 'Test vendor info',
    termsAgreed: true,
    packagingOption: 'Eco-friendly',
    priceRange: '₹200-300',
    customizationWilling: true,
    existingDelivery: false,
    whyPartner: 'To grow business',
    fssaiStandards: true,
    additionalComments: 'Test comments'
  });
  
  // Newsletter form state
  const [newsletterForm, setNewsletterForm] = useState({
    email: 'newsletter@example.com',
    name: 'Newsletter User',
    interests: ['Health Tips', 'Recipes']
  });
  
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePartnerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPartnerForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePartnerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPartnerForm(prev => ({ ...prev, brandDeck: e.target.files![0] }));
    }
  };
  
  const handleVendorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVendorForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleVendorFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'kitchen' | 'food' | 'menu') => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      if (fileType === 'kitchen') {
        setVendorForm(prev => ({ ...prev, kitchenPhotos: files }));
      } else if (fileType === 'food') {
        setVendorForm(prev => ({ ...prev, foodPhotos: files }));
      } else if (fileType === 'menu') {
        setVendorForm(prev => ({ ...prev, sampleMenu: files }));
      }
    }
  };
  
  const handleNewsletterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewsletterForm(prev => ({ ...prev, [name]: value }));
  };
  
  const submitForm = async () => {
    setIsSubmitting(true);
    setResult(null);
    
    try {
      let response;
      
      switch (activeTab) {
        case 'contact':
          response = await submitContactForm(contactForm);
          break;
          
        case 'partner':
          response = await submitPartnerApplication(partnerForm);
          break;
          
        case 'vendor':
          response = await submitVendorApplication(vendorForm);
          break;
          
        case 'newsletter':
          response = await subscribeToNewsletter(newsletterForm);
          break;
          
        default:
          throw new Error('Invalid form type');
      }
      
      setResult({
        success: response.success,
        message: response.message,
        data: response.data,
        error: response.error
      });
      
      console.log(`${activeTab} form submission result:`, response);
    } catch (error) {
      console.error(`Error submitting ${activeTab} form:`, error);
      setResult({
        success: false,
        message: 'An unexpected error occurred',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Form Submission Tester</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex space-x-2">
          <Button 
            variant={activeTab === 'contact' ? 'default' : 'outline'}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </Button>
          <Button 
            variant={activeTab === 'partner' ? 'default' : 'outline'}
            onClick={() => setActiveTab('partner')}
          >
            Partner
          </Button>
          <Button 
            variant={activeTab === 'vendor' ? 'default' : 'outline'}
            onClick={() => setActiveTab('vendor')}
          >
            Vendor
          </Button>
          <Button 
            variant={activeTab === 'newsletter' ? 'default' : 'outline'}
            onClick={() => setActiveTab('newsletter')}
          >
            Newsletter
          </Button>
        </div>
        
        {activeTab === 'contact' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input name="name" value={contactForm.name} onChange={handleContactChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" value={contactForm.email} onChange={handleContactChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <Input name="subject" value={contactForm.subject} onChange={handleContactChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea name="message" value={contactForm.message} onChange={handleContactChange} />
            </div>
          </div>
        )}
        
        {activeTab === 'partner' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand Name</label>
              <Input name="brandName" value={partnerForm.brandName} onChange={handlePartnerChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <Input name="website" value={partnerForm.website} onChange={handlePartnerChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Name</label>
              <Input name="contactName" value={partnerForm.contactName} onChange={handlePartnerChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" value={partnerForm.email} onChange={handlePartnerChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Brand Deck (PDF)</label>
              <Input type="file" accept=".pdf" onChange={handlePartnerFileChange} />
            </div>
          </div>
        )}
        
        {activeTab === 'vendor' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Business Name</label>
              <Input name="businessName" value={vendorForm.businessName} onChange={handleVendorChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Owner Name</label>
              <Input name="ownerName" value={vendorForm.ownerName} onChange={handleVendorChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" value={vendorForm.email} onChange={handleVendorChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Kitchen Photos</label>
              <Input type="file" multiple accept="image/*" onChange={(e) => handleVendorFileChange(e, 'kitchen')} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Food Photos</label>
              <Input type="file" multiple accept="image/*" onChange={(e) => handleVendorFileChange(e, 'food')} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Sample Menu</label>
              <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => handleVendorFileChange(e, 'menu')} />
            </div>
          </div>
        )}
        
        {activeTab === 'newsletter' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" value={newsletterForm.email} onChange={handleNewsletterChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Name (Optional)</label>
              <Input name="name" value={newsletterForm.name} onChange={handleNewsletterChange} />
            </div>
          </div>
        )}
        
        <Button 
          className="mt-6 w-full" 
          onClick={submitForm} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : `Test ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Form`}
        </Button>
        
        {result && (
          <div className={`mt-6 p-4 rounded-md ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <h3 className={`text-lg font-semibold mb-2 ${result.success ? 'text-green-700' : 'text-red-700'}`}>
              {result.success ? 'Success' : 'Error'}
            </h3>
            <p className="mb-2">{result.message}</p>
            {result.error && (
              <div className="mt-2 text-sm text-red-600">
                <strong>Error:</strong> {result.error}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FormSubmissionTester;
