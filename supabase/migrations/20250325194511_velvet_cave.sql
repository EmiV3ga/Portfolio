/*
  # Add Comments System

  1. New Tables
    - `comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references posts)
      - `content` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `visitor_name` (text)

  2. Security
    - Enable RLS on comments table
    - Add policies for:
      - Anyone can read comments
      - Anyone can create comments
      - Admin can delete comments
*/

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id),
  visitor_name text
);

-- Enable RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create comments"
  ON comments
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admin can delete comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = true
    )
  );

-- Create view for comments with user information
CREATE OR REPLACE VIEW comment_details AS
SELECT 
  c.*,
  p.display_name,
  p.avatar_url
FROM comments c
LEFT JOIN profiles p ON c.user_id = p.id;