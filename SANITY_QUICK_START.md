# Sanity Quick Start Guide

## Step 1: Create a Sanity Account & Project

1. Go to **https://sanity.io/manage**
2. Click **"Sign in"** or **"Create account"**
   - You can sign in with Google, GitHub, or email
3. Once logged in, click **"Create project"**
4. Fill in the details:
   - **Project name**: `Kaleb Bishop Stunt Performer` (or any name you prefer)
   - **Data location**: Choose closest to you (US, EU, etc.)
   - Click **"Create project"**

## Step 2: Get Your Project ID

1. After creating the project, you'll be on the project dashboard
2. Look for **"Project ID"** in the project settings/info
3. It will look something like: `abc123xyz` or `your-project-id`
4. **Copy this ID** - you'll need it in the next step

**Alternative way to find Project ID:**
- Click on your project name in the top left
- Go to **Settings** → **API** → **Project ID**
- Copy the Project ID

## Step 3: Configure Environment Variables

1. In your project root, create a file called `.env.local`
2. Add the following (replace `your-project-id-here` with your actual Project ID):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
```

3. Save the file

**Example:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

## Step 4: Access Sanity Studio

1. Go back to **https://sanity.io/manage**
2. Click on your project
3. You'll see the **Sanity Studio** interface
4. Here you can start adding content!

## Step 5: Set Up Your Content Types (Schemas)

Since we're using Sanity as a headless CMS, you'll need to set up the schemas manually. Here's what you need:

### Option A: Use Sanity CLI (Recommended)

1. Install Sanity CLI globally (if you haven't):
   ```bash
   npm install -g @sanity/cli
   ```
   (You may need `sudo` on Mac/Linux)

2. Login to Sanity:
   ```bash
   sanity login
   ```

3. Initialize schemas in your project:
   ```bash
   sanity init schema
   ```
   - Select your project
   - It will create schema files

4. Copy the schema files from `sanity/schemas/` in this project to your Sanity project

### Option B: Use Schema Import (Advanced)

You can use the Sanity Management API to import schemas programmatically.

## Step 6: Test the Connection

Once you have:
- ✅ Project ID in `.env.local`
- ✅ Content types set up in Sanity
- ✅ Some test content added

You can test fetching data in your Next.js app:

```typescript
import { client } from '@/sanity/lib/client'

// In a server component or API route
const profile = await client.fetch(`*[_type == "profile"][0]`)
console.log(profile)
```

## Next Steps

1. ✅ Create Sanity project
2. ✅ Add Project ID to `.env.local`
3. ⏭️ Set up schemas in Sanity Studio
4. ⏭️ Add content through the Studio
5. ⏭️ Update your Next.js pages to fetch from Sanity

## Need Help?

- Sanity Documentation: https://www.sanity.io/docs
- Sanity Community: https://slack.sanity.io/