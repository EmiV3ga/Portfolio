/*
  # Add Categories and Tags for Blog Posts

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text)
      - `description` (text)
      - `created_at` (timestamp)
    
    - `post_categories`
      - `post_id` (uuid, references posts)
      - `category_id` (uuid, references categories)

    - `tags`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text)
      - `created_at` (timestamp)

    - `post_tags`
      - `post_id` (uuid, references posts)
      - `tag_id` (uuid, references tags)

  2. Changes to Posts Table
    - Add markdown_content column
    - Add excerpt column
    - Add reading_time column

  3. Security
    - Enable RLS
    - Add appropriate policies
*/

-- Drop existing view first to avoid conflicts
DROP VIEW IF EXISTS post_details;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create junction tables
CREATE TABLE IF NOT EXISTS post_categories (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

CREATE TABLE IF NOT EXISTS post_tags (
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- Add new columns to posts table
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS markdown_content text,
ADD COLUMN IF NOT EXISTS excerpt text,
ADD COLUMN IF NOT EXISTS reading_time integer DEFAULT 0;

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for tags
CREATE POLICY "Anyone can read tags"
  ON tags
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policies for post_categories and post_tags
CREATE POLICY "Anyone can read post categories"
  ON post_categories
  FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their post categories"
  ON post_categories
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_categories.post_id
      AND posts.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can read post tags"
  ON post_tags
  FOR SELECT
  USING (true);

CREATE POLICY "Users can manage their post tags"
  ON post_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE posts.id = post_tags.post_id
      AND posts.user_id = auth.uid()
    )
  );

-- Create new post_details view
CREATE VIEW post_details AS
SELECT 
  p.id,
  p.title,
  p.content,
  p.markdown_content,
  p.excerpt,
  p.reading_time,
  p.created_at,
  p.updated_at,
  p.user_id,
  p.likes,
  p.image_url,
  pr.display_name,
  pr.avatar_url,
  ARRAY_AGG(DISTINCT c.name) FILTER (WHERE c.name IS NOT NULL) as categories,
  ARRAY_AGG(DISTINCT t.name) FILTER (WHERE t.name IS NOT NULL) as tags
FROM posts p
LEFT JOIN profiles pr ON p.user_id = pr.id
LEFT JOIN post_categories pc ON p.id = pc.post_id
LEFT JOIN categories c ON pc.category_id = c.id
LEFT JOIN post_tags pt ON p.id = pt.post_id
LEFT JOIN tags t ON pt.tag_id = t.id
GROUP BY 
  p.id,
  p.title,
  p.content,
  p.markdown_content,
  p.excerpt,
  p.reading_time,
  p.created_at,
  p.updated_at,
  p.user_id,
  p.likes,
  p.image_url,
  pr.display_name,
  pr.avatar_url;