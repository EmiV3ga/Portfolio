/*
  # Add Guestbook functionality

  1. New Tables
    - `guestbook`
      - `id` (uuid, primary key)
      - `content` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)

  2. Views
    - `guestbook_entries_with_profiles`
      - Combines guestbook entries with user profile information

  3. Security
    - Enable RLS on guestbook table
    - Add policies for:
      - Anyone can read entries
      - Authenticated users can create entries
      - Users can delete their own entries
*/

-- Create guestbook table
CREATE TABLE IF NOT EXISTS guestbook (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id) NOT NULL
);

-- Enable RLS
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read guestbook entries"
  ON guestbook
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create guestbook entries"
  ON guestbook
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own guestbook entries"
  ON guestbook
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create view for guestbook entries with profile information
CREATE OR REPLACE VIEW guestbook_entries_with_profiles AS
SELECT 
  g.*,
  p.display_name,
  p.avatar_url
FROM guestbook g
LEFT JOIN profiles p ON g.user_id = p.id;