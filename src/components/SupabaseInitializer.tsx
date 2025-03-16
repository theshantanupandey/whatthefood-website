import React, { useEffect, useState } from 'react';
import { setupSupabaseResources, checkRequiredTables } from '@/utils/setupSupabase';

interface TableStatus {
  [tableName: string]: boolean;
}

interface BucketStatus {
  [bucketName: string]: { exists: boolean; error?: any };
}

const SupabaseInitializer: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [initError, setInitError] = useState<string | null>(null);
  const [tableStatus, setTableStatus] = useState<TableStatus | null>(null);
  const [bucketStatus, setBucketStatus] = useState<BucketStatus | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      try {
        // Setup required Supabase resources
        const setupResult = await setupSupabaseResources();
        if (!setupResult.success) {
          setInitError(setupResult.error || 'Failed to set up Supabase resources');
          return;
        }

        // Check if required tables exist
        const tableResults = await checkRequiredTables();
        setTableStatus(tableResults);

        setIsInitializing(false);
      } catch (error) {
        console.error('Error initializing Supabase:', error);
        setInitError(error instanceof Error ? error.message : 'An unknown error occurred');
        setIsInitializing(false);
      }
    };

    initialize();
  }, []);

  if (isInitializing) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-blue-700">Initializing Supabase...</h2>
        <p className="text-blue-600">Setting up required resources and checking connections.</p>
      </div>
    );
  }

  if (initError) {
    return (
      <div className="p-4 bg-red-50 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-red-700">Supabase Initialization Error</h2>
        <p className="text-red-600">{initError}</p>
        <button 
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && (
          <pre className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-xs">
            {JSON.stringify({ error: initError, tableStatus }, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  // Check if any tables are not accessible
  const hasTableIssues = tableStatus ? Object.values(tableStatus).some(status => !status) : false;

  if (hasTableIssues) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-yellow-700">Supabase Table Access Issues</h2>
        <p className="text-yellow-600">Some tables are not accessible. This may affect form submissions.</p>
        <button 
          className="mt-2 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && tableStatus && (
          <div className="mt-2 p-2 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Table Status:</h3>
            <ul className="list-disc pl-5">
              {Object.entries(tableStatus).map(([table, accessible]) => (
                <li key={table} className={accessible ? 'text-green-600' : 'text-red-600'}>
                  {table}: {accessible ? 'Accessible' : 'Not Accessible'}
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-gray-700">
              For tables that are not accessible, check your Supabase RLS policies and ensure they allow the necessary operations.
            </p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-green-700">Supabase Initialized Successfully</h2>
      <p className="text-green-600">All required resources are set up and accessible.</p>
      <button 
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && tableStatus && (
        <div className="mt-2 p-2 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Table Status:</h3>
          <ul className="list-disc pl-5">
            {Object.entries(tableStatus).map(([table, accessible]) => (
              <li key={table} className={accessible ? 'text-green-600' : 'text-red-600'}>
                {table}: {accessible ? 'Accessible' : 'Not Accessible'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SupabaseInitializer;
