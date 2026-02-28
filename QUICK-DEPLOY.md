# 🚀 QUICK DEPLOY - DO THIS NOW

## Step-by-Step Commands

Copy and paste these commands ONE BY ONE in your terminal:

### 1. Go to project directory
```bash
cd /Users/snezhinskayaaaa/influx-ai
```

### 2. Login to Railway
```bash
railway login
```
*(This opens your browser - login with GitHub)*

### 3. Create new project
```bash
railway init
```

When prompted:
- **Project name:** Type `influx-ai` and press ENTER
- **Starting point:** Choose "Empty Project"

### 4. Link to GitHub repository (Optional but recommended)
```bash
railway link
```

Select your `snezhinskayaaaa/influx-ai` repository from the list.

This enables automatic deployments when you push to GitHub!

### 5. Set environment variables

**FIRST:** Get your Supabase credentials:
1. Open https://supabase.com/dashboard
2. Select your project
3. Settings → API
4. Copy the **Project URL** and **anon public** key

**THEN run these commands** (replace with your actual values):

```bash
railway variables set NEXT_PUBLIC_SUPABASE_URL="your_supabase_url_here"
```

```bash
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY="your_anon_key_here"
```

```bash
railway variables set NEXT_PUBLIC_APP_URL="https://influx-ai-production.up.railway.app"
```

### 6. Deploy!
```bash
railway up
```

Wait 3-5 minutes for build and deployment...

### 7. Generate a domain
```bash
railway domain
```

This gives you a public URL like: `https://influx-ai-production.up.railway.app`

### 8. Update the APP_URL variable with your actual domain

After you get your domain from step 7, update the variable:

```bash
railway variables set NEXT_PUBLIC_APP_URL="https://your-actual-railway-domain.up.railway.app"
```

Then redeploy:
```bash
railway up
```

---

## ✅ DONE!

Now refresh your Railway dashboard - you should see the `influx-ai` project!

Visit your live URL and test the app!

---

## 🔧 After Deployment

Update Supabase redirect URLs:
1. Go to Supabase Dashboard
2. Authentication → URL Configuration
3. Site URL: Add your Railway domain
4. Redirect URLs: Add:
   - `https://your-domain.up.railway.app/auth/callback`
   - `https://your-domain.up.railway.app/dashboard/influencer`
   - `https://your-domain.up.railway.app/dashboard/brand`

---

## 🎯 Summary

```bash
# All commands in order:
cd /Users/snezhinskayaaaa/influx-ai
railway login
railway init
railway variables set NEXT_PUBLIC_SUPABASE_URL="your_url"
railway variables set NEXT_PUBLIC_SUPABASE_ANON_KEY="your_key"
railway variables set NEXT_PUBLIC_APP_URL="https://temp.railway.app"
railway up
railway domain
# Get the domain, then update APP_URL and redeploy
```

**Start with the first command now!** 🚀
