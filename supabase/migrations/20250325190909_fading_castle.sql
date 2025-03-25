/*
  # Set Admin User and Fix Admin Check

  1. Changes
    - Set admin status for specific email
    - Add index on profiles.is_admin for better performance
    - Update admin check policies
*/

-- Set admin status for specific email
UPDATE profiles
SET is_admin = true
WHERE id IN (
  SELECT id 
  FROM auth.users 
  WHERE email = 'emiliano.dimartino.vega@gmail.com'
);

-- Add index for better performance on admin checks
CREATE INDEX IF NOT EXISTS idx_profiles_is_admin ON profiles(is_admin);

-- Update posts policy to use the new index
DROP POLICY IF EXISTS "Only admin can create posts" ON posts;
CREATE POLICY "Only admin can create posts"
ON posts
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.is_admin = true
  )
);