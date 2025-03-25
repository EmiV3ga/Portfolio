/*
  # Fix Profile Creation and Admin Check

  1. Changes
    - Add trigger to create profile on user creation if it doesn't exist
    - Update admin check to handle missing profiles
    - Add RLS policies for profile creation

  2. Security
    - Maintain existing RLS policies
    - Add new policies for profile management
*/

-- Create or replace the function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    display_name,
    is_admin,
    updated_at
  ) VALUES (
    NEW.id,
    SPLIT_PART(NEW.email, '@', 1),
    CASE 
      WHEN NEW.email = 'emiliano.dimartino.vega@gmail.com' THEN true
      ELSE false
    END,
    now()
  )
  ON CONFLICT (id) DO UPDATE
    SET display_name = EXCLUDED.display_name,
        is_admin = CASE 
          WHEN NEW.email = 'emiliano.dimartino.vega@gmail.com' THEN true
          ELSE profiles.is_admin
        END
    WHERE profiles.display_name IS NULL;

  RETURN NEW;
END;
$$ language 'plpgsql';

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Update existing profiles for admin email
UPDATE profiles
SET is_admin = true
WHERE id IN (
  SELECT id 
  FROM auth.users 
  WHERE email = 'emiliano.dimartino.vega@gmail.com'
);

-- Ensure RLS is enabled
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Update RLS policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow profile creation on auth"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);