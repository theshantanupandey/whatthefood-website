# Supabase Storage Setup Guide

Follow these steps to set up the required storage buckets in your Supabase project:

## 1. Create Storage Buckets

1. Log in to your Supabase dashboard at https://app.supabase.com
2. Select your project
3. Navigate to the "Storage" section in the left sidebar
4. Create the following buckets:

### Partner Applications Bucket
- **Name**: `partner_applications`
- **Public bucket**: Yes (to allow public access to uploaded files)
- **File size limit**: 10MB (or adjust as needed)

### Vendor Applications Bucket
- **Name**: `vendor_applications`
- **Public bucket**: Yes (to allow public access to uploaded files)
- **File size limit**: 10MB (or adjust as needed)

## 2. Create Folders in Vendor Applications Bucket

After creating the `vendor_applications` bucket, create the following folders:

1. `kitchen_photos` - For storing kitchen photos uploaded by vendors
2. `food_photos` - For storing food photos uploaded by vendors

## 3. Set Up Storage Policies

For each bucket, set up the following policies to allow anonymous uploads:

### For partner_applications bucket:

```sql
CREATE POLICY "Allow anonymous uploads to partner_applications"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'partner_applications');

CREATE POLICY "Allow public access to partner_applications"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'partner_applications');
```

### For vendor_applications bucket:

```sql
CREATE POLICY "Allow anonymous uploads to vendor_applications"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'vendor_applications');

CREATE POLICY "Allow public access to vendor_applications"
ON storage.objects
FOR SELECT
TO anon
USING (bucket_id = 'vendor_applications');
```

## 4. Test File Uploads

After setting up the buckets and policies, you can test the file uploads by visiting the `/supabase-setup` page in your application and clicking the "Test Supabase Connection" button.
