# How to Get Your Sanity API Token

## Step-by-Step Instructions

### 1. Go to Sanity Management
Visit: **https://sanity.io/manage**

### 2. Select Your Project
- Click on **"Stunt Portfolio"** (Project ID: `1rztdp97`)

### 3. Navigate to API Settings
- In the left sidebar, click on **"API"** or **"Settings"** → **"API"**
- Or go directly to: https://sanity.io/manage/project/1rztdp97/api

### 4. Create a New Token
- Look for **"Tokens"** or **"API Tokens"** section
- Click **"Add API token"** or **"Create token"**

### 5. Configure the Token
- **Name**: Give it a descriptive name (e.g., "Photo Upload Token" or "Website Upload")
- **Permissions**: Select **"Editor"** (needs write access to upload images)
- **Dataset**: Make sure it's set to **"production"**

### 6. Copy the Token
- After creating, you'll see the token (it starts with something like `sk...`)
- **IMPORTANT**: Copy it immediately - you won't be able to see it again!
- It will look something like: `skAbCdEf1234567890...`

### 7. Add to Your Project
- I'll help you add it to `.env.local` file next

## Quick Link
Direct link to your project's API settings:
**https://sanity.io/manage/project/1rztdp97/api**

---

## Alternative: If You Can't Find the Token Section

If you don't see the token creation option:
1. Make sure you're logged in with the correct account
2. Check that you have admin/owner permissions on the project
3. Try going to: https://sanity.io/manage/project/1rztdp97/settings/api
