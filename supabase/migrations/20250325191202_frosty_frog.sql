/*
  # Fix Profile Creation Trigger

  1. Changes
    - Improve profile creation trigger to handle conflicts better
    - Add immediate profile creation for new users
    - Fix admin status setting

  2. Security
    - Maintain existing RLS policies
*/

-- Create or replace the function to handle new user registration with better conflict handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  is_admin_user boolean;
BEGIN
  -- Check if this is the admin email
  is_admin_user := NEW.email = 'emiliano.dimartino.vega@gmail.com';

  -- Insert or update profile
  INSERT INTO public.profiles (
    id,
    display_name,
    is_admin,
    updated_at
  ) VALUES (
    NEW.id,
    SPLIT_PART(NEW.email, '@', 1),
    is_admin_user,
    now()
  )
  ON CONFLICT (id) DO UPDATE
    SET display_name = EXCLUDED.display_name,
        is_admin = CASE 
          WHEN is_admin_user THEN true 
          ELSE profiles.is_admin
        END,
        updated_at = now();

  RETURN NEW;
END;
$$ language 'plpgsql';

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Update any existing admin profiles
UPDATE profiles
SET is_admin = true
WHERE id IN (
  SELECT id 
  FROM auth.users 
  WHERE email = 'emiliano.dimartino.vega@gmail.com'
);