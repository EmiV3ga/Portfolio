/*
  # Fix Posts and Profiles Relationships

  1. Changes
    - Drop and recreate foreign key relationships
    - Ensure proper relationship between posts and profiles
    - Add missing columns and constraints

  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing foreign key if it exists
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_user_id_fkey_profiles;
ALTER TABLE posts DROP CONSTRAINT IF EXISTS posts_user_id_fkey;

-- Add foreign key constraints
ALTER TABLE posts
  ADD CONSTRAINT posts_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id);

-- Enhance posts table
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS image_url text,
ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Enhance profiles table
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS display_name text,
ADD COLUMN IF NOT EXISTS bio text;

-- Create trigger for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to posts table
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Update handle_new_user function to set default display_name
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, SPLIT_PART(NEW.email, '@', 1))
  ON CONFLICT (id) DO UPDATE
  SET display_name = EXCLUDED.display_name
  WHERE profiles.display_name IS NULL;
  RETURN NEW;
END;
$$ language 'plpgsql';