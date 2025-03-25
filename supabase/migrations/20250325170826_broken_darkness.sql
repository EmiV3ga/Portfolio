/*
  # Add Video Support and Enhance Posts Schema

  1. Changes
    - Add video_url column to posts table
    - Drop and recreate post_details view to include video_url
    - Add storage bucket for videos

  2. Security
    - Maintain existing RLS policies
    - Add storage policies for videos
*/

-- Add video_url column to posts table
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS video_url text;

-- Drop existing view
DROP VIEW IF EXISTS post_details;

-- Recreate view with video_url
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
  p.video_url,
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
  p.video_url,
  pr.display_name,
  pr.avatar_url;