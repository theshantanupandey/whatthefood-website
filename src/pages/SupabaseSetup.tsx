import React from 'react';
import { createClient } from '@supabase/supabase-js';
import SupabaseSetupGuide from '@/components/SupabaseSetupGuide';
import SupabaseInitializer from '@/components/SupabaseInitializer';
import SupabaseFormTester from '@/components/SupabaseFormTester';
import FileUploadTester from '@/components/FileUploadTester';
import SupabaseTester from '@/components/SupabaseTester';
import FormSubmissionTester from '@/components/FormSubmissionTester';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SupabaseSetup: React.FC = () => {
  // Example usage of Supabase client
  const fetchData = async () => {
    const { data, error } = await supabase.from('newsletter_subscriptions').select('*');
    if (error) console.error('Error fetching data:', error);
    else console.log('Data:', data);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Supabase Setup & Diagnostics</h1>
      
      {/* Add the SupabaseInitializer component */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
        <SupabaseInitializer />
      </div>
      
      {/* Add the new SupabaseTester component */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Comprehensive Supabase Test</h2>
        <SupabaseTester />
      </div>
      
      {/* Add the FileUploadTester component */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">File Upload Tester</h2>
        <FileUploadTester />
      </div>
      
      {/* Add the new comprehensive FormSubmissionTester component */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Comprehensive Form Submission Tester</h2>
        <FormSubmissionTester />
      </div>
      
      {/* Add the SupabaseFormTester component */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Form Submission Tester</h2>
        <SupabaseFormTester />
      </div>
      
      <SupabaseSetupGuide />
    </div>
  );
};

export default SupabaseSetup;
