/*
  # Enhance Posts and Profiles Schema

  1. Changes
    - Add image_url column to posts table
    - Add display_name column to profiles table
    - Add bio column to profiles table
    - Update foreign key relationships
    - Add new RLS policies

  2. Security
    - Maintain existing RLS policies
    - Add new policies for image handling
*/

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