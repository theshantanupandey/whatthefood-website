import React, { useState } from 'react';
import { subscribeToNewsletter } from '@/services/newsletterService';
import { submitPartnerApplication } from '@/services/partnerService';
import { submitVendorApplication } from '@/services/vendorService';
import { submitContactForm } from '@/services/contactService';

type FormType = 'newsletter' | 'partner' | 'vendor' | 'contact';

const SupabaseFormTester: React.FC = () => {
  const [formType, setFormType] = useState<FormType>('newsletter');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResult(null);
    setError(null);
    
    try {
      let response;
      
      switch (formType) {
        case 'newsletter':
          response = await subscribeToNewsletter({
            email: `test-${Date.now()}@example.com`,
            name: 'Test User',
            interests: ['food', 'health']
          });
          break;
          
        case 'partner':
          response = await submitPartnerApplication({
            brandName: 'Test Brand',
            website: 'https://example.com',
            industryType: 'Food',
            contactName: 'Test Contact',
            email: `test-partner-${Date.now()}@example.com`,
            phone: '1234567890',
            collaborationTypes: ['marketing', 'events'],
            additionalInfo: 'This is a test submission',
            termsAgreed: true
          });
          break;
          
        case 'vendor':
          response = await submitVendorApplication({
            businessName: 'Test Vendor',
            ownerName: 'Test Owner',
            businessType: 'Restaurant',
            phone: '1234567890',
            email: `test-vendor-${Date.now()}@example.com`,
            address: '123 Test Street',
            cityState: 'Test City, Test State',
            mealsPerDay: 100,
            cuisines: ['Italian', 'Indian'],
            vegetarianOptions: true,
            deliveryOptions: ['pickup', 'delivery'],
            mealTypes: ['lunch', 'dinner'],
            healthCertifications: ['ISO22000'],
            additionalInfo: 'This is a test submission',
            termsAgreed: true,
            packagingOption: 'eco-friendly',
            priceRange: 'medium',
            customizationWilling: true,
            existingDelivery: false,
            whyPartner: 'To expand business',
            fssaiStandards: true
          });
          break;
          
        case 'contact':
          response = await submitContactForm({
            name: 'Test Contact',
            email: `test-contact-${Date.now()}@example.com`,
            subject: 'Test Subject',
            message: 'This is a test contact form submission'
          });
          break;
      }
      
      setResult(response);
      if (!response.success) {
        setError(response.error || 'Unknown error');
      }
    } catch (err) {
      console.error('Error testing form submission:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Supabase Form Tester</h2>
      <p className="mb-4 text-gray-600">
        This tool helps test form submissions to Supabase without requiring the full form UI.
      </p>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Form Type</label>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded ${formType === 'newsletter' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFormType('newsletter')}
          >
            Newsletter
          </button>
          <button
            className={`px-4 py-2 rounded ${formType === 'partner' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFormType('partner')}
          >
            Partner
          </button>
          <button
            className={`px-4 py-2 rounded ${formType === 'vendor' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFormType('vendor')}
          >
            Vendor
          </button>
          <button
            className={`px-4 py-2 rounded ${formType === 'contact' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            onClick={() => setFormType('contact')}
          >
            Contact
          </button>
        </div>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">
          Testing form type: <span className="font-semibold">{formType}</span>
        </p>
        <p className="text-sm text-gray-600">
          This will submit test data to the {formType} table in Supabase.
        </p>
      </div>
      
      <button
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Test Submission'}
      </button>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}
      
      {result && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
          <h3 className="text-lg font-semibold mb-2">
            {result.success ? (
              <span className="text-green-700">Success!</span>
            ) : (
              <span className="text-red-700">Failed</span>
            )}
          </h3>
          <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto max-h-60">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SupabaseFormTester;
