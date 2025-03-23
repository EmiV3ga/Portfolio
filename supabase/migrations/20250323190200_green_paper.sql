/*
  # Add relationship between posts and profiles

  1. Changes
    - Add foreign key constraint from posts.user_id to profiles.id
    - This enables joining posts with profiles to get user information

  2. Notes
    - We already have posts.user_id referencing auth.users(id)
    - profiles.id also references auth.users(id)
    - This creates an indirect relationship that we need to make explicit
*/

-- Add foreign key constraint
DO $$ BEGIN
  ALTER TABLE posts
    ADD CONSTRAINT posts_user_id_fkey_profiles
    FOREIGN KEY (user_id)
    REFERENCES profiles(id);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;