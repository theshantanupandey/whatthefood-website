
-- Fix RLS policies for partner_applications table
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow anonymous insert to partner_applications" ON partner_applications;
DROP POLICY IF EXISTS "Allow authenticated users to view partner_applications" ON partner_applications;

-- Create explicit policies with correct syntax
CREATE POLICY "Allow anonymous insert to partner_applications" ON partner_applications 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view partner_applications" ON partner_applications
    FOR SELECT
    TO authenticated
    USING (true);
