import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const SupabaseSetup = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [projectInfo, setProjectInfo] = useState<any>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Simple query to check if connection works
        const { data, error } = await supabase.from('job_applications').select('count(*)').limit(1);
        
        if (error) throw error;
        
        // Get project info
        const { data: projectData } = await supabase.rpc('get_project_info', {}).single();
        setProjectInfo(projectData || { 
          project_id: 'Available (query succeeded)',
          version: 'Unknown'
        });
        
        setStatus('success');
      } catch (err: any) {
        console.error('Supabase connection error:', err);
        setError(err.message || 'Failed to connect to Supabase');
        setStatus('error');
      }
    };

    checkConnection();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Supabase Setup</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
        
        {status === 'loading' && (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
            <p>Testing connection to Supabase...</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="text-green-600">
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Connected to Supabase successfully!
            </p>
          </div>
        )}
        
        {status === 'error' && (
          <div className="text-red-600">
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Failed to connect to Supabase
            </p>
            {error && <p className="mt-2 text-sm bg-red-50 p-2 rounded">{error}</p>}
          </div>
        )}
      </div>

      {status === 'success' && projectInfo && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Project Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700">Project URL</h3>
              <p className="text-gray-600">{import.meta.env.VITE_SUPABASE_URL}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Project ID</h3>
              <p className="text-gray-600">{projectInfo.project_id}</p>
            </div>
            
            {projectInfo.version && (
              <div>
                <h3 className="font-medium text-gray-700">Version</h3>
                <p className="text-gray-600">{projectInfo.version}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <p className="mb-4">Make sure you have the following environment variables set in your <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file:</p>
        
        <div className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
          <pre>
            VITE_SUPABASE_URL=https://your-project-id.supabase.co
            VITE_SUPABASE_ANON_KEY=your-anon-key
          </pre>
        </div>
      </div>
    </div>
  );
};

export default SupabaseSetup;