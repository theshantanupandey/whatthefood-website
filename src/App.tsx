
import React, { useEffect } from 'react';
import { Toaster } from 'sonner';
import { manualInitialize } from './utils/initSupabase';
import Router from './router';

function App() {
  // Initialize Supabase resources when the app loads
  useEffect(() => {
    manualInitialize().then(result => {
      console.log('Supabase initialization result:', result);
    }).catch(error => {
      console.error('Failed to initialize Supabase:', error);
    });
  }, []);

  return (
    <>
      <Router />
      <Toaster richColors position="top-right" />
    </>
  );
}

export default App;
