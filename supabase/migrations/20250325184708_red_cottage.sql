/*
  # Set Admin User

  1. Changes
    - Update specific user profile to be admin
    - Add safety checks to prevent errors

  2. Security
    - Only updates specific user profile
    - Maintains existing RLS policies
*/

-- Update the specific user profile to be admin
DO $$ 
BEGIN
  -- First, ensure the profiles table exists and has the is_admin column
  IF EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'is_admin'
  ) THEN
    -- Update the profile for the specific user
    UPDATE profiles 
    SET is_admin = true 
    WHERE id IN (
      SELECT id 
      FROM auth.users 
      WHERE email = 'emiliano.dimartino.vega@gmail.com'
    );
  END IF;
END $$;