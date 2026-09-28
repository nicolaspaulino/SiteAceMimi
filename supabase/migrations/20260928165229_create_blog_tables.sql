/*
# Create blog tables (single-tenant, no auth)

1. New Tables
- `blog_posts` — stores articles published by the AceMimi team (análises jurídicas, notícias, dicas de direito)
  - id (uuid, primary key)
  - author_name (text, not null) — name of the lawyer/author
  - author_role (text) — role/title of the author
  - category (text, not null) — 'analise', 'noticia', or 'dica'
  - title (text, not null)
  - excerpt (text) — short summary shown in the feed
  - content (text, not null) — full article body
  - tags (text[]) — optional tags
  - likes_count (integer, default 0) — denormalized like counter
  - comments_count (integer, default 0) — denormalized comment counter
  - created_at (timestamptz, default now())
- `post_likes` — stores individual likes on posts
  - id (uuid, primary key)
  - post_id (uuid, references blog_posts, on delete cascade)
  - reader_name (text) — optional name of the person who liked
  - created_at (timestamptz, default now())
- `post_comments` — stores comments on posts
  - id (uuid, primary key)
  - post_id (uuid, references blog_posts, on delete cascade)
  - author_name (text, not null) — name of commenter
  - content (text, not null) — comment body
  - created_at (timestamptz, default now())

2. Security
- Enable RLS on all tables.
- Allow anon + authenticated CRUD because the blog is intentionally public/shared (no sign-in screen).
- All data is public — anyone can read posts, like, and comment.

3. Notes
- likes_count and comments_count are denormalized counters updated via triggers for performance.
- A trigger increments/decrements likes_count when a row is added/removed from post_likes.
- A trigger increments/decrements comments_count when a row is added/removed from post_comments.
*/

-- Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_name text NOT NULL,
  author_role text DEFAULT '',
  category text NOT NULL DEFAULT 'analise',
  title text NOT NULL,
  excerpt text DEFAULT '',
  content text NOT NULL DEFAULT '',
  tags text[] DEFAULT '{}',
  likes_count integer NOT NULL DEFAULT 0,
  comments_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_posts" ON blog_posts;
CREATE POLICY "anon_select_posts" ON blog_posts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_posts" ON blog_posts;
CREATE POLICY "anon_insert_posts" ON blog_posts FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_posts" ON blog_posts;
CREATE POLICY "anon_update_posts" ON blog_posts FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_posts" ON blog_posts;
CREATE POLICY "anon_delete_posts" ON blog_posts FOR DELETE
  TO anon, authenticated USING (true);

-- Likes table
CREATE TABLE IF NOT EXISTS post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  reader_name text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_likes" ON post_likes;
CREATE POLICY "anon_select_likes" ON post_likes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_likes" ON post_likes;
CREATE POLICY "anon_insert_likes" ON post_likes FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_likes" ON post_likes;
CREATE POLICY "anon_delete_likes" ON post_likes FOR DELETE
  TO anon, authenticated USING (true);

-- Comments table
CREATE TABLE IF NOT EXISTS post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_comments" ON post_comments;
CREATE POLICY "anon_select_comments" ON post_comments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_comments" ON post_comments;
CREATE POLICY "anon_insert_comments" ON post_comments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_comments" ON post_comments;
CREATE POLICY "anon_delete_comments" ON post_comments FOR DELETE
  TO anon, authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts (category);
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes (post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments (post_id);

-- Trigger: update likes_count on insert
CREATE OR REPLACE FUNCTION increment_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blog_posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_increment_likes ON post_likes;
CREATE TRIGGER trg_increment_likes
  AFTER INSERT ON post_likes
  FOR EACH ROW EXECUTE FUNCTION increment_likes_count();

-- Trigger: update likes_count on delete
CREATE OR REPLACE FUNCTION decrement_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blog_posts SET likes_count = GREATEST(0, likes_count - 1) WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_decrement_likes ON post_likes;
CREATE TRIGGER trg_decrement_likes
  AFTER DELETE ON post_likes
  FOR EACH ROW EXECUTE FUNCTION decrement_likes_count();

-- Trigger: update comments_count on insert
CREATE OR REPLACE FUNCTION increment_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blog_posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_increment_comments ON post_comments;
CREATE TRIGGER trg_increment_comments
  AFTER INSERT ON post_comments
  FOR EACH ROW EXECUTE FUNCTION increment_comments_count();

-- Trigger: update comments_count on delete
CREATE OR REPLACE FUNCTION decrement_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE blog_posts SET comments_count = GREATEST(0, comments_count - 1) WHERE id = OLD.post_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_decrement_comments ON post_comments;
CREATE TRIGGER trg_decrement_comments
  AFTER DELETE ON post_comments
  FOR EACH ROW EXECUTE FUNCTION decrement_comments_count();
