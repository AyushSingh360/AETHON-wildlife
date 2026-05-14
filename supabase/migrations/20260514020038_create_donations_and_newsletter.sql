/*
  # Create donations and newsletter tables

  1. New Tables
    - `donations`
      - `id` (uuid, primary key)
      - `amount` (integer, not null) - donation amount in cents
      - `frequency` (text, not null) - "once" or "monthly"
      - `tier` (text, not null) - tier label (Guardian, Protector, Champion, Founder)
      - `donor_email` (text) - optional donor email
      - `donor_name` (text) - optional donor name
      - `created_at` (timestamptz, default now())
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `subscribed_at` (timestamptz, default now())

  2. Security
    - Enable RLS on both tables
    - Donations: anyone can insert (public donation flow), no read access for anon
    - Newsletter: anyone can insert (public subscribe flow), no read access for anon
*/

CREATE TABLE IF NOT EXISTS donations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  amount integer NOT NULL,
  frequency text NOT NULL DEFAULT 'once',
  tier text NOT NULL DEFAULT 'Guardian',
  donor_email text,
  donor_name text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public donation inserts"
  ON donations FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public newsletter subscription"
  ON newsletter_subscribers FOR INSERT
  TO anon
  WITH CHECK (true);
