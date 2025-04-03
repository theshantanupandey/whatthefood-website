
-- Drop existing tables if they exist
DROP TABLE IF EXISTS partner_applications CASCADE;
DROP TABLE IF EXISTS vendor_applications CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS newsletter_subscriptions CASCADE;

-- Partner Applications Table
CREATE TABLE partner_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_name TEXT NOT NULL,
  website TEXT NOT NULL,
  industry_type TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  collaboration_types TEXT[] NOT NULL,
  additional_info TEXT,
  terms_agreed BOOLEAN NOT NULL,
  brand_deck_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendor Applications Table
CREATE TABLE vendor_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  registration_number TEXT,
  gst_number TEXT,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city_state TEXT NOT NULL,
  meals_per_day INTEGER NOT NULL,
  cuisines TEXT[] NOT NULL,
  vegetarian_options BOOLEAN NOT NULL,
  delivery_options TEXT[] NOT NULL,
  meal_types TEXT[] NOT NULL,
  health_certifications TEXT[] NOT NULL,
  kitchen_photo_urls TEXT[],
  food_photo_urls TEXT[],
  additional_info TEXT,
  terms_agreed BOOLEAN NOT NULL,
  packaging_option TEXT NOT NULL,
  price_range TEXT NOT NULL,
  customization_willing BOOLEAN NOT NULL,
  existing_delivery BOOLEAN NOT NULL,
  why_partner TEXT NOT NULL,
  fssai_standards BOOLEAN NOT NULL,
  additional_comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact Submissions Table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter Subscriptions Table
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  interests TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for each table
-- Partner Applications policies
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert to partner_applications"
  ON partner_applications FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view partner_applications"
  ON partner_applications FOR SELECT
  TO authenticated
  USING (true);

-- Vendor Applications policies
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert to vendor_applications"
  ON vendor_applications FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view vendor_applications"
  ON vendor_applications FOR SELECT
  TO authenticated
  USING (true);

-- Contact Submissions policies
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert to contact_submissions"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view contact_submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Newsletter Subscriptions policies
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous insert to newsletter_subscriptions"
  ON newsletter_subscriptions FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view newsletter_subscriptions"
  ON newsletter_subscriptions FOR SELECT
  TO authenticated
  USING (true);
