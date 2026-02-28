#!/bin/bash

# INFLUX.AI - Railway Deployment Script
# This script will guide you through deploying to Railway

set -e

echo "🚂 INFLUX.AI - Railway Deployment"
echo "=================================="
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm i -g @railway/cli
else
    echo "✅ Railway CLI found"
fi

echo ""
echo "📋 DEPLOYMENT STEPS:"
echo ""
echo "Step 1: Login to Railway"
echo "Step 2: Initialize project"
echo "Step 3: Set environment variables"
echo "Step 4: Deploy"
echo ""

# Step 1: Login
echo "🔐 Step 1: Login to Railway"
echo "----------------------------"
echo "This will open your browser. Please login with GitHub or Email."
echo ""
read -p "Press ENTER to continue..."

railway login

if [ $? -eq 0 ]; then
    echo "✅ Login successful!"
else
    echo "❌ Login failed. Please try again."
    exit 1
fi

echo ""

# Step 2: Initialize project
echo "🆕 Step 2: Initialize Railway Project"
echo "--------------------------------------"
echo "Creating new Railway project..."
echo ""

railway init

if [ $? -eq 0 ]; then
    echo "✅ Project created!"
else
    echo "❌ Project creation failed."
    exit 1
fi

echo ""

# Step 3: Environment variables
echo "🔧 Step 3: Set Environment Variables"
echo "-------------------------------------"
echo ""
echo "You need to provide your Supabase credentials."
echo "Get them from: https://supabase.com/dashboard"
echo "  → Select your project"
echo "  → Settings → API"
echo ""

# Prompt for Supabase URL
read -p "Enter SUPABASE_URL: " SUPABASE_URL
read -p "Enter SUPABASE_ANON_KEY: " SUPABASE_ANON_KEY

if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_ANON_KEY" ]; then
    echo "❌ Both Supabase URL and Anon Key are required!"
    exit 1
fi

echo ""
echo "Setting environment variables..."

railway variables --set NEXT_PUBLIC_SUPABASE_URL="$SUPABASE_URL"
railway variables --set NEXT_PUBLIC_SUPABASE_ANON_KEY="$SUPABASE_ANON_KEY"
railway variables --set NEXT_PUBLIC_APP_URL="https://influx-ai-production.up.railway.app"

if [ $? -eq 0 ]; then
    echo "✅ Environment variables set!"
else
    echo "❌ Failed to set environment variables."
    exit 1
fi

echo ""

# Step 4: Deploy
echo "🚀 Step 4: Deploy Application"
echo "------------------------------"
echo "Deploying Influx.AI to Railway..."
echo ""

railway up

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
else
    echo "❌ Deployment failed. Check logs with: railway logs"
    exit 1
fi

echo ""

# Get domain
echo "🌐 Getting your live URL..."
echo ""

DOMAIN=$(railway domain)

if [ $? -eq 0 ]; then
    echo "✅ Your app is live at:"
    echo ""
    echo "   $DOMAIN"
    echo ""
else
    echo "Getting domain..."
    railway domain
fi

echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "======================="
echo ""
echo "Next steps:"
echo ""
echo "1. Visit your live site (URL shown above)"
echo "2. Update Supabase redirect URLs:"
echo "   → Go to Supabase Dashboard"
echo "   → Authentication → URL Configuration"
echo "   → Add Site URL: https://your-railway-domain.up.railway.app"
echo "   → Add Redirect URLs:"
echo "     - https://your-railway-domain.up.railway.app/auth/callback"
echo "     - https://your-railway-domain.up.railway.app/dashboard/influencer"
echo "     - https://your-railway-domain.up.railway.app/dashboard/brand"
echo ""
echo "3. Test your app:"
echo "   - Sign up as influencer"
echo "   - Sign up as brand"
echo "   - Browse influencers"
echo ""
echo "4. Monitor deployment:"
echo "   railway logs        # View logs"
echo "   railway status      # Check status"
echo "   railway open        # Open in browser"
echo ""
echo "📊 Railway Dashboard: https://railway.app/dashboard"
echo ""
echo "Happy launching! 🚀"
