/*
  # Add Storage Buckets for Media Files

  1. Changes
    - Create storage buckets for post images and videos
    - Set up storage policies for authenticated users

  2. Security
    - Only authenticated users can upload files
    - Anyone can view uploaded files
    - Users can only delete their own files
*/

-- Enable storage by creating the required buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('post-images', 'post-images', true),
  ('post-videos', 'post-videos', true);

-- Set up security policies for post-images bucket
CREATE POLICY "Anyone can view post images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-images');

CREATE POLICY "Authenticated users can upload post images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'post-images'
    AND (storage.foldername(name))[1] != 'private'
  );

CREATE POLICY "Users can update their own post images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'post-images' AND owner = auth.uid());

CREATE POLICY "Users can delete their own post images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'post-images' AND owner = auth.uid());

-- Set up security policies for post-videos bucket
CREATE POLICY "Anyone can view post videos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'post-videos');

CREATE POLICY "Authenticated users can upload post videos"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'post-videos'
    AND (storage.foldername(name))[1] != 'private'
  );

CREATE POLICY "Users can update their own post videos"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'post-videos' AND owner = auth.uid());

CREATE POLICY "Users can delete their own post videos"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'post-videos' AND owner = auth.uid());