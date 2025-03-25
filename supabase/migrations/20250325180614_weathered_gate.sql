/*
  # Update Posts and Guestbook Schema

  1. Changes to Posts Table
    - Add is_admin column to profiles table
    - Add unique_likes view for tracking likes
    - Update post_details view
    - Add RLS policies to restrict post creation to admin

  2. Changes to Guestbook Table
    - Remove user_id requirement
    - Add name column
    - Update RLS policies
*/

-- Add is_admin column to profiles
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS is_admin boolean DEFAULT false;

-- Create table for tracking likes
CREATE TABLE IF NOT EXISTS post_likes (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  visitor_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (post_id, visitor_id)
);

-- Enable RLS
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- Update guestbook table
ALTER TABLE guestbook 
DROP CONSTRAINT IF EXISTS guestbook_user_id_fkey,
ALTER COLUMN user_id DROP NOT NULL,
ADD COLUMN IF NOT EXISTS visitor_name text;

-- Update policies for posts
DROP POLICY IF EXISTS "Authenticated users can create posts" ON posts;
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

-- Update policies for post likes
CREATE POLICY "Anyone can read post likes"
  ON post_likes
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add likes"
  ON post_likes
  FOR INSERT
  WITH CHECK (true);

-- Update policies for guestbook
DROP POLICY IF EXISTS "Authenticated users can create guestbook entries" ON guestbook;
DROP POLICY IF EXISTS "Users can delete their own guestbook entries" ON guestbook;

CREATE POLICY "Anyone can create guestbook entries"
  ON guestbook
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admin can delete guestbook entries"
  ON guestbook
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Update guestbook view
DROP VIEW IF EXISTS guestbook_entries_with_profiles;
CREATE VIEW guestbook_entries_with_profiles AS
SELECT 
  g.id,
  g.content,
  g.created_at,
  g.user_id,
  g.visitor_name,
  COALESCE(p.display_name, g.visitor_name, 'Anonymous') as display_name,
  COALESCE(p.avatar_url, 'https://ui-avatars.com/api/?name=' || COALESCE(g.visitor_name, 'Anonymous')) as avatar_url
FROM guestbook g
LEFT JOIN profiles p ON g.user_id = p.id;