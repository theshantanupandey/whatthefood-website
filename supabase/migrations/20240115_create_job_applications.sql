
-- Create job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    position TEXT NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    resume_url TEXT,
    cover_letter TEXT,
    portfolio TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS job_applications_email_idx ON job_applications(email);

-- Create an index on position for faster filtering
CREATE INDEX IF NOT EXISTS job_applications_position_idx ON job_applications(position);

-- Add RLS policies
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert applications - this is explicitly FOR INSERT
CREATE POLICY "Allow anonymous insert to job_applications" ON job_applications 
    FOR INSERT 
    TO anon 
    WITH CHECK (true);

-- Only allow authenticated users to view applications
CREATE POLICY "Allow authenticated users to view job_applications" ON job_applications
    FOR SELECT
    TO authenticated
    USING (true);

-- Create a trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON job_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
