/*
  # Fix Storage Policies for Media Files

  1. Changes
    - Drop existing policies and recreate them with correct permissions
    - Ensure authenticated users can upload files
    - Fix RLS policy issues

  2. Security
    - Maintain public read access
    - Restrict write operations to authenticated users
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view post images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload post images" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own post images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own post images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view post videos" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload post videos" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own post videos" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own post videos" ON storage.objects;

-- Create new simplified policies for post-images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'post-images' );

CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-images'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Owner Access"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'post-images'
  AND owner = auth.uid()
);

-- Create new simplified policies for post-videos
CREATE POLICY "Public Video Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'post-videos' );

CREATE POLICY "Authenticated Video Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'post-videos'
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Video Owner Access"
ON storage.objects FOR ALL
TO authenticated
USING (
  bucket_id = 'post-videos'
  AND owner = auth.uid()
);

-- Enable RLS on storage.objects if not already enabled
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;