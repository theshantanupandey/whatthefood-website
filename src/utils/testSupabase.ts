import { supabase } from '@/lib/supabase';

/**
 * Test Supabase connection and bucket access
 */
export async function testSupabaseConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test database connection
    const { data, error, count } = await supabase
      .from('newsletter_subscriptions')
      .select('*', { count: 'exact' })
      .limit(1);
    
    if (error) {
      console.error('Database connection error:', error);
      return { success: false, error };
    }
    
    console.log(`Database connection successful. Found ${count} newsletter subscriptions.`);
    
    // Test storage buckets
    const buckets = ['partner-applications', 'vendor-applications'];
    
    for (const bucket of buckets) {
      console.log(`Testing access to bucket: ${bucket}`);
      
      try {
        const { data: bucketData, error: bucketError } = await supabase.storage.from(bucket).list();
        
        if (bucketError) {
          console.error(`Error accessing bucket '${bucket}':`, bucketError);
        } else {
          console.log(`Bucket '${bucket}' exists and is accessible. Contains ${bucketData.length} files/folders.`);
        }
      } catch (bucketTestError) {
        console.error(`Error testing bucket '${bucket}':`, bucketTestError);
      }
    }
    
    // Test tables
    const tables = ['partner_applications', 'vendor_applications', 'contact_submissions', 'newsletter_subscriptions'];
    
    for (const table of tables) {
      console.log(`Testing access to table: ${table}`);
      
      try {
        const { data: tableData, error: tableError, count: tableCount } = await supabase
          .from(table)
          .select('*', { count: 'exact' })
          .limit(1);
        
        if (tableError) {
          console.error(`Error accessing table '${table}':`, tableError);
        } else {
          console.log(`Table '${table}' exists and is accessible. Found ${tableCount} records.`);
        }
      } catch (tableTestError) {
        console.error(`Error testing table '${table}':`, tableTestError);
      }
    }
    
    return { success: true };
  } catch (error) {
    console.error('Unexpected error testing Supabase:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    };
  }
}
