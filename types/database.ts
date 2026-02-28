export type UserRole = 'influencer' | 'brand' | 'admin';
export type CampaignStatus = 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
export type InfluencerStatus = 'pending' | 'approved' | 'rejected';

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Influencer {
  id: string;
  user_id: string;
  handle: string;
  bio?: string;
  niche?: string[];

  instagram_handle?: string;
  instagram_followers: number;
  instagram_engagement: number;

  tiktok_handle?: string;
  tiktok_followers: number;
  tiktok_engagement: number;

  youtube_handle?: string;
  youtube_subscribers: number;
  youtube_engagement: number;

  price_per_post?: number;
  price_per_story?: number;
  price_per_video?: number;

  portfolio_images?: string[];
  past_collaborations?: string[];

  status: InfluencerStatus;
  is_verified: boolean;
  is_featured: boolean;

  location?: string;
  languages?: string[];

  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  user_id: string;
  company_name: string;
  industry?: string;
  website?: string;
  description?: string;
  logo_url?: string;

  contact_name?: string;
  contact_email?: string;

  monthly_budget_range?: string;

  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  brand_id: string;
  influencer_id: string;

  title: string;
  description?: string;
  deliverables?: string[];

  budget: number;
  platform_fee: number;
  influencer_payout: number;

  start_date?: string;
  end_date?: string;

  status: CampaignStatus;

  contract_url?: string;
  signed_at?: string;

  stripe_payment_intent_id?: string;
  paid_at?: string;

  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  campaign_id?: string;
  sender_id: string;
  recipient_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  instagram_handle?: string;
  follower_count?: string;
  company_name?: string;
  industry?: string;
  created_at: string;
}
