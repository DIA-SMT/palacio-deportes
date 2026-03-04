-- ==============================================
-- Palacio de los Deportes - Supabase Setup
-- Run this in Supabase SQL Editor
-- ==============================================

-- Events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('recital','cultural','deportivo','familiar','feria')),
  date_iso DATE NOT NULL,
  time TEXT NOT NULL,
  short_description TEXT NOT NULL,
  long_description TEXT NOT NULL,
  image TEXT DEFAULT '',
  gallery TEXT[] DEFAULT '{}',
  video_clips JSONB DEFAULT '[]',
  ticket_url TEXT DEFAULT '',
  status TEXT NOT NULL CHECK (status IN ('disponible','agotado','ultimos','proximamente')),
  price_label TEXT NOT NULL,
  is_free BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  lineup TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS: anyone can read, only authenticated users can write
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON events FOR SELECT USING (true);
CREATE POLICY "Auth insert" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update" ON events FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete" ON events FOR DELETE USING (auth.role() = 'authenticated');

-- Storage bucket for event images (public read)
INSERT INTO storage.buckets (id, name, public) VALUES ('event-images', 'event-images', true);
CREATE POLICY "Public read images" ON storage.objects FOR SELECT USING (bucket_id = 'event-images');
CREATE POLICY "Auth upload images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'event-images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth update images" ON storage.objects FOR UPDATE USING (bucket_id = 'event-images' AND auth.role() = 'authenticated');
CREATE POLICY "Auth delete images" ON storage.objects FOR DELETE USING (bucket_id = 'event-images' AND auth.role() = 'authenticated');
