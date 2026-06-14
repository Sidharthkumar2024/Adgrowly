-- Run this SQL script in your Supabase SQL Editor to create the leads database table:

CREATE TABLE IF NOT EXISTS submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    business_name TEXT NOT NULL,
    website_url TEXT,
    ad_budget TEXT,
    contact_name TEXT NOT NULL,
    contact_email TEXT NOT NULL,
    phone TEXT,
    gmb_status TEXT,
    status TEXT DEFAULT 'pending'
);

-- Enable Row Level Security (RLS) if you want to restrict public access
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so form submissions from the web work)
CREATE POLICY "Allow anonymous inserts" 
ON submissions 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow authenticated users or select roles to view/update listings (for the admin panel)
CREATE POLICY "Allow anon select for demo" 
ON submissions 
FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Allow anon update for demo" 
ON submissions 
FOR UPDATE 
TO anon 
USING (true);

CREATE POLICY "Allow anon delete for demo" 
ON submissions 
FOR DELETE 
TO anon 
USING (true);
