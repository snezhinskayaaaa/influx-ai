# 🚀 DEPLOY TO RAILWAY NOW

## Quick Start (5 minutes)

### Option 1: Automated Script (Easiest)

Run the automated deployment script:

```bash
cd /Users/snezhinskayaaaa/influx-ai
./deploy-railway.sh
```

This script will:
1. Login to Railway
2. Create project
3. Ask for your Supabase credentials
4. Set environment variables
5. Deploy the app
6. Give you the live URL

---

### Option 2: Manual Step-by-Step

#### Step 1: Login to Railway

```bash
cd /Users/snezhinskayaaaa/influx-ai
railway login
```

This opens your browser. Login with GitHub.

#### Step 2: Create Project

```bash
railway init
```

Choose:
- Project name: `influx-ai`
- Start with: Empty Project

#### Step 3: Set Environment Variables

Get your Supabase credentials from https://supabase.com/dashboard:
- Settings → API → Copy Project URL and Anon Key

Then run:

```bash
railway variables --set NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
railway variables --set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
railway variables --set NEXT_PUBLIC_APP_URL=https://influx-ai-production.up.railway.app
```

#### Step 4: Deploy

```bash
railway up
```

Wait 2-3 minutes for build and deployment.

#### Step 5: Get Your URL

```bash
railway domain
```

---

## After Deployment

### 1. Update Supabase Redirect URLs

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Authentication → URL Configuration
4. Add your Railway domain to:
   - **Site URL:** `https://your-railway-domain.up.railway.app`
   - **Redirect URLs:** Add these:
     ```
     https://your-railway-domain.up.railway.app/auth/callback
     https://your-railway-domain.up.railway.app/dashboard/influencer
     https://your-railway-domain.up.railway.app/dashboard/brand
     https://your-railway-domain.up.railway.app/admin
     ```

### 2. Test Your Deployment

Visit your live URL and:
- ✅ Check landing page loads
- ✅ Sign up as influencer at `/influencers/signup`
- ✅ Sign up as brand at `/brands/signup`
- ✅ Browse influencers at `/browse`
- ✅ Login at `/auth/login`

---

## Useful Commands

```bash
# View logs
railway logs

# Check deployment status
railway status

# Open app in browser
railway open

# View environment variables
railway variables

# Redeploy
railway up

# View Railway dashboard
# https://railway.app/dashboard
```

---

## Troubleshooting

### Build Failed?

Check logs:
```bash
railway logs
```

Common fixes:
- Verify environment variables are set correctly
- Check Supabase credentials
- Ensure Node version is correct (18+)

### Can't Access Site?

1. Check deployment finished: `railway status`
2. Get domain: `railway domain`
3. Verify environment variables: `railway variables`
4. Check Supabase redirect URLs updated

### Database Connection Error?

1. Verify Supabase URL is correct
2. Verify Supabase Anon Key is correct
3. Check Supabase project is active
4. Ensure RLS policies are set up (run supabase-schema.sql)

---

## 🎯 READY TO DEPLOY?

Choose your method:

**EASY:** Run `./deploy-railway.sh`

**MANUAL:** Follow Option 2 steps above

**Time needed:** 5-10 minutes

**Cost:** FREE (Railway gives $5/month credit)

---

**Questions? Check `railway-deploy-guide.md` for detailed guide.**

🚀 Let's launch!
