/*
  # Create items table with search functionality

  1. New Tables
    - `items`
      - `id` (uuid, primary key)
      - `code` (integer, not null)
      - `category` (text, not null)
      - `verified` (boolean, default false)
      - `initial` (boolean, default false)
      - `created_at` (timestamp with time zone, default now())

  2. Security
    - Enable RLS on `items` table
    - Add policies for public read access
    - Add policies for authenticated users to insert items
*/

CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code integer NOT NULL,
  category text NOT NULL,
  verified boolean DEFAULT false,
  initial boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access"
  ON items
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert items
CREATE POLICY "Allow authenticated insert"
  ON items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);