/*
  # Fix Posts and Profiles Table Relationship

  1. Changes
    - Remove incorrect foreign key constraints
    - Add correct relationship between posts and profiles tables
    - Update posts table to properly reference profiles

  2. Security
    - Maintain existing RLS policies
*/

-- First, remove any existing incorrect foreign key constraints
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_user_id_fkey_profiles;
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_user_id_fkey;

-- Add the correct foreign key constraint to link posts with auth.users
ALTER TABLE posts
  ADD CONSTRAINT posts_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id);

-- Update the Posts component query
CREATE OR REPLACE VIEW post_details AS
SELECT 
  p.*,
  pr.display_name,
  pr.avatar_url
FROM posts p
LEFT JOIN profiles pr ON p.user_id = pr.id;