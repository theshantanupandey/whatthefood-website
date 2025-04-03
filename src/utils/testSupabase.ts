
import { supabase } from '@/lib/supabase';
import { ensureRequiredBuckets } from './setupBuckets';

export async function testSupabaseConnection() {
  const results: any = {
    connection: false,
    tables: {},
    storage: {},
  };

  try {
    // Test basic connection
    console.log('Testing basic Supabase connection...');
    const { error } = await supabase.from('newsletter_subscriptions')
      .select('count(*)', { count: 'exact', head: true });
    
    if (error) {
      console.error('Connection test failed:', error);
      results.connection = false;
      results.error = error;
      return results;
    }
    
    results.connection = true;
    console.log('Connection test successful!');
    
    // Check required tables
    const tables = [
      'newsletter_subscriptions',
      'contact_submissions',
      'partner_applications',
      'vendor_applications'
    ];
    
    for (const table of tables) {
      try {
        console.log(`Testing access to table: ${table}`);
        const { error } = await supabase.from(table)
          .select('count(*)', { count: 'exact', head: true });
        
        results.tables[table] = { exists: !error };
        if (error) {
          console.error(`Table '${table}' check failed:`, error);
        } else {
          console.log(`Table '${table}' is accessible`);
        }
      } catch (err) {
        console.error(`Error checking table '${table}':`, err);
        results.tables[table] = { exists: false, error: err };
      }
    }
    
    // Setup and check buckets
    console.log('Setting up and testing storage buckets...');
    const bucketsResult = await ensureRequiredBuckets();
    results.storage = bucketsResult;
    
    return {
      success: results.connection,
      tables: results.tables,
      storage: results.storage,
      data: results
    };
  } catch (error) {
    console.error('Unexpected error during Supabase test:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: results
    };
  }
}
