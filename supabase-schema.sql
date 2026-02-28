-- Influx.AI Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User types enum
CREATE TYPE user_role AS ENUM ('influencer', 'brand', 'admin');
CREATE TYPE campaign_status AS ENUM ('draft', 'pending', 'active', 'completed', 'cancelled');
CREATE TYPE influencer_status AS ENUM ('pending', 'approved', 'rejected');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'influencer',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Influencer profiles
CREATE TABLE influencers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  handle TEXT UNIQUE NOT NULL,
  bio TEXT,
  niche TEXT[] DEFAULT '{}',

  -- Social media stats
  instagram_handle TEXT,
  instagram_followers INTEGER DEFAULT 0,
  instagram_engagement DECIMAL(5,2) DEFAULT 0,

  tiktok_handle TEXT,
  tiktok_followers INTEGER DEFAULT 0,
  tiktok_engagement DECIMAL(5,2) DEFAULT 0,

  youtube_handle TEXT,
  youtube_subscribers INTEGER DEFAULT 0,
  youtube_engagement DECIMAL(5,2) DEFAULT 0,

  -- Pricing
  price_per_post INTEGER, -- in cents
  price_per_story INTEGER,
  price_per_video INTEGER,

  -- Portfolio
  portfolio_images TEXT[] DEFAULT '{}',
  past_collaborations TEXT[] DEFAULT '{}',

  -- Status
  status influencer_status DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,

  -- Metadata
  location TEXT,
  languages TEXT[] DEFAULT '{}',

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Brand profiles
CREATE TABLE brands (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  industry TEXT,
  website TEXT,
  description TEXT,
  logo_url TEXT,

  -- Contact info
  contact_name TEXT,
  contact_email TEXT,

  -- Budget
  monthly_budget_range TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Campaigns
CREATE TABLE campaigns (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  brand_id UUID REFERENCES brands(id) ON DELETE CASCADE NOT NULL,
  influencer_id UUID REFERENCES influencers(id) ON DELETE CASCADE NOT NULL,

  title TEXT NOT NULL,
  description TEXT,
  deliverables TEXT[] DEFAULT '{}',

  -- Pricing
  budget INTEGER NOT NULL, -- in cents
  platform_fee INTEGER NOT NULL, -- 20% of budget
  influencer_payout INTEGER NOT NULL, -- 80% of budget

  -- Timeline
  start_date DATE,
  end_date DATE,

  status campaign_status DEFAULT 'draft',

  -- Contract
  contract_url TEXT,
  signed_at TIMESTAMP WITH TIME ZONE,

  -- Payment
  stripe_payment_intent_id TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Messages
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,

  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Waitlist
CREATE TABLE waitlist (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT, -- 'influencer' or 'brand'

  -- For influencers
  instagram_handle TEXT,
  follower_count TEXT,

  -- For brands
  company_name TEXT,
  industry TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_influencers_status ON influencers(status);
CREATE INDEX idx_influencers_verified ON influencers(is_verified);
CREATE INDEX idx_influencers_featured ON influencers(is_featured);
CREATE INDEX idx_campaigns_brand ON campaigns(brand_id);
CREATE INDEX idx_campaigns_influencer ON campaigns(influencer_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_messages_campaign ON messages(campaign_id);
CREATE INDEX idx_messages_recipient ON messages(recipient_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencers ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Influencers policies
CREATE POLICY "Approved influencers are viewable by everyone" ON influencers
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Influencers can update own profile" ON influencers
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Influencers can insert own profile" ON influencers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Brands policies
CREATE POLICY "Brands can view own profile" ON brands
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Brands can update own profile" ON brands
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Brands can insert own profile" ON brands
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Campaigns policies
CREATE POLICY "Users can view own campaigns" ON campaigns
  FOR SELECT USING (
    auth.uid() IN (
      SELECT user_id FROM brands WHERE id = brand_id
      UNION
      SELECT user_id FROM influencers WHERE id = influencer_id
    )
  );

CREATE POLICY "Brands can create campaigns" ON campaigns
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM brands WHERE id = brand_id)
  );

CREATE POLICY "Campaign participants can update" ON campaigns
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT user_id FROM brands WHERE id = brand_id
      UNION
      SELECT user_id FROM influencers WHERE id = influencer_id
    )
  );

-- Messages policies
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Waitlist policies
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Functions for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_influencers_updated_at BEFORE UPDATE ON influencers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON brands
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
