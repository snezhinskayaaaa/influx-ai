# 🚂 DEPLOY INFLUX.AI TO RAILWAY

Complete guide to deploy your MVP to Railway in minutes.

---

## 📋 Prerequisites

- Railway CLI installed ✅ (already installed)
- GitHub repository pushed ✅ (already done)
- Railway account (free tier works)

---

## 🚀 DEPLOYMENT STEPS

### Step 1: Login to Railway (Manual)

Open your terminal and run:

```bash
cd /Users/snezhinskayaaaa/influx-ai
railway login
```

This will open your browser. Login with:
- GitHub account (recommended)
- OR email

---

### Step 2: Create New Railway Project

After logging in, run:

```bash
railway init
```

When prompted:
- **Project name:** `influx-ai` or `influx-ai-mvp`
- **Start with:** Empty project

---

### Step 3: Link to GitHub (Optional but Recommended)

Option A - Deploy from GitHub:
```bash
# This will set up automatic deployments from GitHub
railway link
```

Option B - Deploy from local:
```bash
# Deploy directly from your local code
railway up
```

**Recommendation:** Use Option A (GitHub) for automatic deployments on push.

---

### Step 4: Add Supabase Service

You need a database. Two options:

#### Option A: Use Existing Supabase (Recommended for MVP)

Keep using your Supabase project and just add environment variables in Step 5.

#### Option B: Add Railway PostgreSQL

```bash
railway add --plugin postgresql
```

Then you'll need to:
1. Get the DATABASE_URL from Railway
2. Run migrations manually
3. Update schema

**For MVP, use Option A (existing Supabase).**

---

### Step 5: Set Environment Variables

Run these commands one by one:

```bash
# Supabase URL
railway variables --set NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

# Supabase Anon Key
railway variables --set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App URL (will update after deployment)
railway variables --set NEXT_PUBLIC_APP_URL=https://influx-ai-production.up.railway.app
```

**Get your Supabase credentials:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Copy Project URL and anon/public key

---

### Step 6: Deploy!

```bash
railway up
```

This will:
- Build your Next.js app
- Deploy to Railway
- Give you a live URL

---

### Step 7: Get Your Live URL

```bash
railway domain
```

Or create a custom domain:

```bash
railway domain --add
```

This generates a URL like: `influx-ai-production.up.railway.app`

---

### Step 8: Update Environment Variables

Update the app URL to match your Railway domain:

```bash
railway variables --set NEXT_PUBLIC_APP_URL=https://your-railway-domain.up.railway.app
```

Then redeploy:

```bash
railway up
```

---

## ✅ POST-DEPLOYMENT CHECKLIST

- [ ] Login to Railway successful
- [ ] Project created
- [ ] Environment variables set (Supabase URL and Key)
- [ ] App deployed successfully
- [ ] Domain/URL obtained
- [ ] App accessible at live URL
- [ ] Test influencer signup
- [ ] Test brand signup
- [ ] Test browse page
- [ ] Update Supabase redirect URLs

---

## 🔧 Update Supabase Redirect URLs

After deployment, update your Supabase project:

1. Go to Supabase Dashboard
2. Authentication → URL Configuration
3. Add to **Site URL:**
   ```
   https://your-railway-domain.up.railway.app
   ```
4. Add to **Redirect URLs:**
   ```
   https://your-railway-domain.up.railway.app/auth/callback
   https://your-railway-domain.up.railway.app/dashboard/influencer
   https://your-railway-domain.up.railway.app/dashboard/brand
   https://your-railway-domain.up.railway.app/admin
   ```

---

## 🎯 QUICK DEPLOYMENT (All-in-One Script)

Run this after `railway login`:

```bash
cd /Users/snezhinskayaaaa/influx-ai

# Initialize project
railway init

# Set environment variables (replace with your actual values)
railway variables --set NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
railway variables --set NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
railway variables --set NEXT_PUBLIC_APP_URL=https://your-app.up.railway.app

# Deploy
railway up

# Get domain
railway domain
```

---

## 🐛 Troubleshooting

### Build Fails

Check logs:
```bash
railway logs
```

Common issues:
- Missing environment variables
- TypeScript errors
- Node version mismatch

### Fix Node Version

Add to `package.json`:
```json
"engines": {
  "node": ">=18.0.0"
}
```

### Can't Access Site

1. Check Railway dashboard: https://railway.app/dashboard
2. Verify deployment status
3. Check environment variables are set
4. Verify Supabase redirect URLs

### Database Connection Error

- Verify Supabase URL is correct
- Verify Supabase Anon Key is correct
- Check Supabase project is active

---

## 💰 Railway Pricing

**Free Tier Includes:**
- $5 credit per month
- Enough for MVP testing
- ~500 hours of runtime
- Multiple services

**After Free Tier:**
- Pay-as-you-go
- ~$5-10/month for small apps

---

## 🔄 Continuous Deployment

Once linked to GitHub, every push to main branch automatically deploys:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Railway automatically deploys
```

---

## 📊 Monitor Your Deployment

**Railway Dashboard:**
https://railway.app/dashboard

**View Logs:**
```bash
railway logs
```

**View Deployments:**
```bash
railway status
```

**Open in Browser:**
```bash
railway open
```

---

## 🎉 EXPECTED RESULT

After successful deployment, you should have:

✅ Live URL: `https://influx-ai-production.up.railway.app`
✅ Automatic SSL certificate
✅ Auto-scaling
✅ Automatic deployments from GitHub
✅ Environment variables configured
✅ Connected to Supabase database
✅ Ready for users!

---

## 📞 Support

**Railway Docs:** https://docs.railway.app/
**Railway Discord:** https://discord.gg/railway
**Railway Status:** https://status.railway.app/

---

**Next Step:** Run `railway login` in your terminal!
