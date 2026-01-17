# Get Started with Sanity - Quick Guide

## Step 1: Access Your Sanity Studio

1. **Go to:** https://sanity.io/manage
2. **Sign in** (you're already logged in as paragon2l@gmail.com)
3. **Click on your project** (Project ID: 1rztdp97)
4. You'll see the Sanity Studio interface

## Step 2: Create Your First Document Type (Profile)

Since you're starting fresh, you'll need to create document types. Here's how:

### Option A: Quick Start with Simple Types

1. In Sanity Studio, look for **"Schema"** or **"Content models"** in the sidebar
2. Click **"Create document type"** or **"Add type"**
3. Start with **Profile**:

**Profile Document Type:**
- **Name:** `profile`
- **Title:** `Profile`
- **Icon:** (optional) Person/User

**Fields to add:**
1. `name` - String (Required)
2. `tagline` - String
3. `bio` - Text
4. `email` - String
5. `phone` - String
6. `imdbUrl` - URL
7. `instagramUrl` - URL
8. `reelUrl` - URL
9. `flowReelUrl` - URL
10. `stats` - Object with fields:
    - `yearsActive` - Number
    - `credits` - Number
    - `specialties` - Number
    - `height` - String
    - `weight` - String

### Option B: Use Sanity CLI (More Control)

If you prefer to set up schemas programmatically:

```bash
# Install Sanity CLI globally (if not already installed)
npm install -g @sanity/cli

# You're already logged in, so skip login
# Create a temporary studio to deploy schemas
cd ~/Desktop
mkdir sanity-temp
cd sanity-temp
npx create-sanity@latest --template clean --project 1rztdp97

# Copy schema files from your project
cp -r "/Users/kalebbishop/Desktop/Stunt Performer Site/sanity/schemas" ./schemas

# Follow prompts to set up, then deploy schemas
```

## Step 3: Add Your First Content

Once schemas are set up:

1. In Sanity Studio, click **"+ Create"** or **"New"**
2. Select **"Profile"**
3. Fill in your information
4. Click **"Publish"**

## Step 4: Verify Connection

Your Next.js site is already configured to fetch from Sanity. Once you add content:

1. Restart your dev server: `npm run dev`
2. The site will automatically fetch from Sanity (with fallback to static data)
3. Check browser console for any Sanity-related messages

## Quick Reference

- **Studio URL:** https://sanity.io/manage (then select your project)
- **Project ID:** 1rztdp97
- **Dataset:** production
- **Environment Variables:** Already set in `.env.local`

## Need Help?

- **Sanity Docs:** https://www.sanity.io/docs
- **Schema Reference:** Check `sanity/schemas/` folder in your project
- **Query Examples:** Check `lib/sanity/queries.ts`

## Current Status

✅ Sanity project created (1rztdp97)
✅ Environment variables configured
✅ Next.js client set up
✅ Helper functions ready
⏭️ Next: Create schemas in Studio
⏭️ Next: Add content through Studio