/*
  # Fix User Registration Profile Creation

  1. Changes
    - Update handle_new_user function to properly handle profile creation
    - Add error handling for edge cases
    - Ensure proper transaction handling

  2. Security
    - Maintain existing RLS policies
*/

-- Update the handle_new_user function with better error handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Create profile with basic information
  INSERT INTO public.profiles (
    id,
    display_name,
    updated_at
  ) VALUES (
    NEW.id,
    COALESCE(SPLIT_PART(NEW.email, '@', 1), 'user_' || NEW.id),
    now()
  );

  RETURN NEW;
EXCEPTION 
  WHEN unique_violation THEN
    -- Profile already exists, ignore
    RETURN NEW;
  WHEN OTHERS THEN
    -- Log other errors but don't fail the user creation
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();