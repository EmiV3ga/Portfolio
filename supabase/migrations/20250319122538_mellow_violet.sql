/*
  # Initial Schema Setup

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `created_at` (timestamp)
      - `user_id` (uuid, references auth.users)
      - `likes` (integer)

  2. Security
    - Enable RLS on `posts` table
    - Add policies for:
      - Anyone can read posts
      - Only authenticated users can create posts
      - Only post owners can update/delete their posts
*/

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id),
  likes integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read posts"
  ON posts
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);