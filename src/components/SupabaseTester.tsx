import React, { useState } from 'react';
import { testSupabaseConnection } from '@/utils/testSupabase';
import { Button } from '@/components/ui/button';

const SupabaseTester: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  
  const runTest = async () => {
    setIsLoading(true);
    setResults(null);
    
    try {
      const testResults = await testSupabaseConnection();
      setResults(testResults);
      console.log('Test completed:', testResults);
    } catch (error) {
      console.error('Error running test:', error);
      setResults({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Supabase Connection Tester</h2>
      <p className="mb-4 text-gray-600">
        This tool tests the connection to Supabase and verifies that all required buckets and tables exist.
      </p>
      
      <Button 
        onClick={runTest}
        disabled={isLoading}
        className="mb-4"
      >
        {isLoading ? 'Testing...' : 'Run Supabase Test'}
      </Button>
      
      {results && (
        <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
          <h3 className="text-lg font-semibold mb-2">
            {results.success ? (
              <span className="text-green-700">Connection Successful</span>
            ) : (
              <span className="text-red-700">Connection Failed</span>
            )}
          </h3>
          
          {results.error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-600">{results.error.toString()}</p>
            </div>
          )}
          
          <p className="text-sm text-gray-600 mb-2">
            Check the browser console for detailed test results.
          </p>
        </div>
      )}
    </div>
  );
};

export default SupabaseTester;
