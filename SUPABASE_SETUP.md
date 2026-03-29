# Supabase Setup Guide for Admin Content Manager

## SQL Migrations

Run these SQL commands in your Supabase SQL Editor to create the necessary tables:

```sql
-- Create Articles Table
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  author TEXT,
  category TEXT,
  image_url TEXT,
  link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Magazines Table
CREATE TABLE IF NOT EXISTS magazines (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  author TEXT,
  category TEXT,
  image_url TEXT,
  link TEXT,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Sermons Table
CREATE TABLE IF NOT EXISTS sermons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  author TEXT,
  category TEXT,
  image_url TEXT,
  link TEXT,
  speaker TEXT,
  date_preached DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Memory Verses Table
CREATE TABLE IF NOT EXISTS memory_verses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  verse TEXT NOT NULL,
  reference TEXT NOT NULL,
  title TEXT,
  description TEXT,
  explanation TEXT,
  category TEXT,
  author TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Resources Table
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  author TEXT,
  category TEXT,
  image_url TEXT,
  link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create Growth Materials Table
CREATE TABLE IF NOT EXISTS growth_materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  author TEXT,
  category TEXT,
  image_url TEXT,
  link TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create GLC Modules Table
CREATE TABLE IF NOT EXISTS glc_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT,
  author TEXT,
  category TEXT,
  image_url TEXT,
  link TEXT,
  module_number INT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_created ON articles(created_at);
CREATE INDEX idx_magazines_created ON magazines(created_at);
CREATE INDEX idx_sermons_created ON sermons(created_at);
CREATE INDEX idx_verses_reference ON memory_verses(reference);
CREATE INDEX idx_resources_category ON resources(category);
```

## Steps to Set Up

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Click on "SQL Editor" in the left sidebar
4. Create a new query by clicking "New Query"
5. Copy and paste the SQL code above
6. Click "Run" to execute all migrations

## RLS (Row Level Security) - Optional but Recommended

```sql
-- Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE magazines ENABLE ROW LEVEL SECURITY;
ALTER TABLE sermons ENABLE ROW LEVEL SECURITY;
ALTER TABLE memory_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE glc_modules ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON articles FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON magazines FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON sermons FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON memory_verses FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON resources FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON growth_materials FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON glc_modules FOR SELECT USING (true);

-- Allow authenticated admin write access (you may need to adjust this based on your auth setup)
-- For now, we'll rely on application-level authentication check
```

## Verification

After running the migrations:
1. Go to "Table Editor" in Supabase
2. You should see all 7 new tables listed
3. Click on each table to verify columns are correct

## Next Steps

1. Start the app: `npm run dev`
2. Go to `/admin/content` (make sure you're logged in as admin)
3. Try creating, editing, and deleting content
4. The content should appear on the public pages

## Troubleshooting

- **Tables not appearing**: Make sure the SQL ran without errors. Check the SQL Editor for error messages.
- **Can't connect**: Verify your Supabase URL and key in `src/supabase.js`
- **Permission denied**: Check that RLS policies are set up correctly (or disable RLS for testing)
