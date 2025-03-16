import React, { useState, useEffect } from 'react';
import { testSupabaseConnection } from '@/utils/supabaseTest';

const SupabaseSetupGuide: React.FC = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [envVars, setEnvVars] = useState({
    url: import.meta.env.VITE_SUPABASE_URL ? 'Defined' : 'Missing',
    key: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Defined' : 'Missing'
  });

  const runTest = async () => {
    setIsLoading(true);
    try {
      const result = await testSupabaseConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({ success: false, error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Supabase Integration Setup Guide</h1>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Environment Status</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">VITE_SUPABASE_URL:</p>
            <p className={`${envVars.url === 'Defined' ? 'text-green-600' : 'text-red-600'} font-bold`}>
              {envVars.url}
            </p>
          </div>
          <div>
            <p className="font-medium">VITE_SUPABASE_ANON_KEY:</p>
            <p className={`${envVars.key === 'Defined' ? 'text-green-600' : 'text-red-600'} font-bold`}>
              {envVars.key}
            </p>
          </div>
        </div>
        {(envVars.url === 'Missing' || envVars.key === 'Missing') && (
          <div className="mt-3 p-3 bg-yellow-100 rounded-lg">
            <p className="text-yellow-800 font-medium">⚠️ Environment variables are missing!</p>
            <p className="mt-1">Make sure you've created a <code>.env</code> file with the correct variables. Restart the dev server after adding them.</p>
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Environment Variables</h2>
        <p className="mb-2">Ensure your <code>.env</code> file contains the following variables:</p>
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
          VITE_SUPABASE_URL=https://bwytvhhfdflebzrndbrh.supabase.co<br />
          VITE_SUPABASE_ANON_KEY=your_anon_key
        </pre>
        <div className="mt-3 p-3 bg-blue-100 rounded-lg">
          <p className="text-blue-800">⚠️ <strong>Important:</strong> After updating your <code>.env</code> file, you need to restart your development server for the changes to take effect.</p>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Database Tables</h2>
        <p className="mb-2">Use the provided <code>supabase-schema.sql</code> file to create the following tables in your Supabase project:</p>
        <ul className="list-disc pl-6 mb-2">
          <li><code>partner_applications</code> - Stores partner application data</li>
          <li><code>vendor_applications</code> - Stores vendor application data</li>
          <li><code>contact_submissions</code> - Stores contact form submissions</li>
          <li><code>newsletter_subscriptions</code> - Stores newsletter subscriptions</li>
        </ul>
        <p>You can run this SQL in the Supabase SQL Editor.</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Storage Buckets</h2>
        <p className="mb-2">Create the following storage buckets in your Supabase project:</p>
        <ul className="list-disc pl-6">
          <li><code>partner_applications</code> - For storing partner brand decks</li>
          <li><code>vendor_applications</code> - For storing vendor photos</li>
        </ul>
        <p className="mt-2">Configure public access for these buckets as needed.</p>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Test Connection</h2>
        <button
          onClick={runTest}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {isLoading ? 'Testing...' : 'Test Supabase Connection'}
        </button>
        
        {testResult && (
          <div className={`mt-4 p-4 rounded ${testResult.success ? 'bg-green-100' : 'bg-red-100'}`}>
            <p className="font-semibold">
              {testResult.success ? '✅ Connection Successful' : '❌ Connection Failed'}
            </p>
            {testResult.message && <p className="mt-2">{testResult.message}</p>}
            {!testResult.success && testResult.error && (
              <div>
                <button 
                  className="text-blue-600 underline mt-2"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Hide Details' : 'Show Error Details'}
                </button>
                {showDetails && (
                  <pre className="mt-2 p-2 bg-gray-100 rounded text-sm overflow-auto">
                    {JSON.stringify(testResult.error, null, 2)}
                  </pre>
                )}
              </div>
            )}
            {testResult.success && testResult.storageResults && (
              <div className="mt-2">
                <p className="font-semibold">Storage Buckets:</p>
                <ul className="list-disc pl-6">
                  {Object.entries(testResult.storageResults).map(([bucket, result]: [string, any]) => (
                    <li key={bucket}>
                      {bucket}: {result.exists ? '✅ Accessible' : '❌ Not found or not accessible'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">5. Troubleshooting</h2>
        <div className="space-y-3">
          <div className="p-3 bg-gray-100 rounded">
            <p className="font-medium">Environment Variables Not Loading</p>
            <ul className="list-disc pl-6 mt-1">
              <li>Make sure your <code>.env</code> file is in the root directory of your project</li>
              <li>Restart your development server after making changes to the <code>.env</code> file</li>
              <li>Check that the variable names match exactly: <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code></li>
            </ul>
          </div>
          <div className="p-3 bg-gray-100 rounded">
            <p className="font-medium">Connection Errors</p>
            <ul className="list-disc pl-6 mt-1">
              <li>Verify your Supabase URL and anon key are correct</li>
              <li>Check if your Supabase project is active and not in maintenance mode</li>
              <li>Ensure your IP is not blocked by Supabase</li>
              <li>Check if the tables have been created in your Supabase project</li>
            </ul>
          </div>
          <div className="p-3 bg-gray-100 rounded">
            <p className="font-medium">Storage Bucket Errors</p>
            <ul className="list-disc pl-6 mt-1">
              <li>Verify you've created the required storage buckets</li>
              <li>Check that the bucket names match exactly: <code>partner_applications</code> and <code>vendor_applications</code></li>
              <li>Ensure the RLS policies allow access to the buckets</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">6. Next Steps</h2>
        <p>Once your Supabase integration is set up, the following forms will automatically save data to your database:</p>
        <ul className="list-disc pl-6">
          <li>Partner Application Form</li>
          <li>Vendor Application Form</li>
          <li>Contact Form</li>
          <li>Newsletter Subscription</li>
        </ul>
      </div>
    </div>
  );
};

export default SupabaseSetupGuide;
