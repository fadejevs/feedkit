-- Run this in Supabase SQL Editor to check your table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'feedback' 
ORDER BY ordinal_position;
