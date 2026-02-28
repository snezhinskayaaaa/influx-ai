# 🌊 INFLUX.AI - AI Influencer Marketplace MVP

**The first dedicated marketplace connecting brands with AI influencers.**

Where influence flows.

---

## 🚀 Project Status

**MVP COMPLETE** - Full functional marketplace platform with:
- ✅ Landing page with waitlist
- ✅ User authentication (influencers, brands, admin)
- ✅ Browse influencers with search/filter
- ✅ Influencer profiles and dashboard
- ✅ Brand profiles and dashboard
- ✅ Campaign management system
- ✅ Admin panel
- ✅ Database schema with Row Level Security

---

## 📦 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** Stripe Connect (ready to integrate)
- **Hosting:** Vercel (recommended)
- **Icons:** Lucide React
- **State Management:** Zustand
- **Notifications:** React Hot Toast

---

## 🎯 Core Features

### For AI Influencers
- **Profile Management** - Showcase stats, portfolio, and pricing
- **Campaign Dashboard** - View and manage brand collaborations
- **Earnings Tracking** - Monitor income (80% commission)
- **Portfolio Builder** - Upload images and past work
- **Verification Badge** - Get verified by admin

### For Brands
- **Browse Influencers** - Search and filter by niche, followers, budget
- **Campaign Creation** - Define goals, deliverables, and budget
- **Campaign Management** - Track active and completed campaigns
- **Direct Messaging** - Communicate with influencers
- **Analytics** - Track campaign performance and ROI

### For Admins
- **User Management** - Approve/reject influencer applications
- **Revenue Tracking** - Monitor platform fees (20% commission)
- **Campaign Oversight** - View all campaigns and transactions
- **Platform Analytics** - Track growth metrics

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Supabase account (free tier works)
- Stripe account (optional, for payments)

### 1. Clone the Repository

```bash
git clone https://github.com/snezhinskayaaaa/influx-ai.git
cd influx-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. **Create a new Supabase project:** https://supabase.com/dashboard
2. **Run the database schema:**
   - Go to SQL Editor in Supabase Dashboard
   - Copy contents of `supabase-schema.sql`
   - Paste and run in SQL Editor
   - This creates all tables, RLS policies, and functions

3. **Get your Supabase credentials:**
   - Project URL: Settings → API → Project URL
   - Anon Key: Settings → API → Project API keys → anon public

### 4. Environment Variables

Create `.env.local` in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe (optional for now)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_pk_test_key
STRIPE_SECRET_KEY=your_stripe_sk_test_key

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📊 Database Schema

The platform uses PostgreSQL via Supabase with the following main tables:

- **profiles** - Base user profiles (extends Supabase auth.users)
- **influencers** - AI influencer profiles with metrics and pricing
- **brands** - Brand company profiles
- **campaigns** - Campaign details and status
- **messages** - In-platform messaging
- **waitlist** - Landing page signups

All tables have Row Level Security (RLS) enabled for data protection.

---

## 🎨 Brand Colors

```css
--influx-blue: #0066FF    /* Primary - Trust, tech, flow */
--deep-purple: #6B46C1    /* Secondary - AI, innovation */
--electric-cyan: #00E5FF  /* Accent - Energy, digital */
--success-green: #00D084  /* Success - Conversions */
--warning-orange: #FF6B35 /* CTA - Highlights */
--neutral-gray: #1A1A1A   /* Text - Professional */
```

---

## 🔑 User Roles

### Influencer
- Sign up at `/influencers/signup`
- Dashboard at `/dashboard/influencer`
- Status: pending → approved → active

### Brand
- Sign up at `/brands/signup`
- Dashboard at `/dashboard/brand`
- Can immediately browse and create campaigns

### Admin
- Manually set role to 'admin' in profiles table
- Admin panel at `/admin`
- Can approve influencers, view all data

---

## 📱 Key Routes

### Public
- `/` - Landing page
- `/browse` - Browse AI influencers (no auth required)
- `/auth/login` - Login page
- `/influencers/signup` - Influencer signup
- `/brands/signup` - Brand signup

### Influencer Dashboard
- `/dashboard/influencer` - Main dashboard
- `/dashboard/influencer/profile` - Edit profile
- `/dashboard/influencer/campaigns` - View campaigns

### Brand Dashboard
- `/dashboard/brand` - Main dashboard
- `/dashboard/brand/campaigns` - View campaigns
- `/browse` - Browse and book influencers

### Admin
- `/admin` - Admin dashboard
- `/admin/influencers` - Manage influencers
- `/admin/brands` - Manage brands
- `/admin/campaigns` - View all campaigns

---

## 💰 Business Model

- **Commission:** 20% platform fee on all campaigns
- **Influencer Payout:** 80% of campaign budget
- **No Listing Fees:** Free for influencers to join
- **No Subscription:** Brands pay per campaign only

Example:
- Brand creates $1,000 campaign
- Platform fee: $200 (20%)
- Influencer receives: $800 (80%)

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Add all variables from .env.local
```

### Deploy to Other Platforms

The app is a standard Next.js 16 app and can be deployed to:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

---

## 📈 Next Steps (Post-MVP)

### Phase 1 - Core Enhancements
- [ ] Stripe Connect integration for payments
- [ ] Email notifications (Resend or SendGrid)
- [ ] File upload for portfolio images (Uploadthing)
- [ ] Real-time messaging system
- [ ] Campaign analytics dashboard

### Phase 2 - Growth Features
- [ ] Advanced search filters
- [ ] Campaign templates
- [ ] Bulk influencer outreach
- [ ] White-label options
- [ ] API for third-party integrations

### Phase 3 - Scale
- [ ] Mobile app (React Native)
- [ ] Video portfolio support
- [ ] AI-powered influencer matching
- [ ] Affiliate program
- [ ] Multi-language support

---

## 🔒 Security

- ✅ Row Level Security (RLS) on all tables
- ✅ Server-side authentication checks
- ✅ SQL injection protection (Supabase ORM)
- ✅ HTTPS only in production
- ✅ Environment variables for secrets
- ⏳ Rate limiting (TODO)
- ⏳ CSRF protection (TODO)

---

## 📄 License

Proprietary - All rights reserved © 2026 Influx.AI

---

## 🤝 Contributing

This is a private MVP. Contact the team for collaboration opportunities.

---

## 📞 Contact

- **Website:** influx.ai (coming soon)
- **Email:** contact@influx.ai
- **Twitter:** @influxai
- **GitHub:** https://github.com/snezhinskayaaaa/influx-ai

---

## 🎯 Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

**Built with ❤️ for the AI influencer economy**

Launch Date: March 2026 🚀
