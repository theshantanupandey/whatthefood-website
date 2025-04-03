
-- Create form_analytics table for tracking form usage and analytics
CREATE TABLE IF NOT EXISTS form_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  field_name TEXT,
  error_message TEXT,
  time_spent INTEGER,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  session_id TEXT
);

-- Create index to optimize queries by form_id
CREATE INDEX IF NOT EXISTS idx_form_analytics_form_id ON form_analytics(form_id);

-- Create index to optimize queries by event_type
CREATE INDEX IF NOT EXISTS idx_form_analytics_event_type ON form_analytics(event_type);

-- Create index to optimize time-based queries
CREATE INDEX IF NOT EXISTS idx_form_analytics_created_at ON form_analytics(created_at);

-- Enable Row Level Security
ALTER TABLE form_analytics ENABLE ROW LEVEL SECURITY;

-- Policy for inserting analytics (allow anonymous)
CREATE POLICY "Allow anonymous insert to form_analytics"
ON form_analytics
FOR INSERT
TO anon
WITH CHECK (true);

-- Policy for viewing analytics (only authenticated users)
CREATE POLICY "Allow authenticated users to view form_analytics"
ON form_analytics
FOR SELECT
TO authenticated
USING (true);
