# Sanity CMS Setup Guide (Headless Mode)

Since Sanity v5 requires React 19 (which Next.js 14 doesn't support), we're using Sanity as a **headless CMS** instead of embedding the Studio.

## Setup Steps

1. **Create a Sanity Account and Project:**
   - Go to https://sanity.io/manage
   - Sign up or log in
   - Create a new project (e.g., "Kaleb Bishop Stunt Performer")

2. **Get Your Project ID:**
   - After creating the project, go to the project settings
   - Copy the **Project ID**

3. **Set Environment Variables:**
   - Create a `.env.local` file in the root directory
   - Add the following:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_TOKEN=your-read-token-here
   ```

4. **Access Sanity Studio (Separate App):**
   - Go to https://sanity.io/manage
   - Click on your project
   - Use the Studio interface there to manage content
   - OR install Sanity Studio locally (optional):
     ```bash
     npx create-sanity@latest --template clean --create-project false
     ```

## Using Sanity Client

The Sanity client is set up in `sanity/lib/client.ts`. You can query data like this:

```typescript
import { client } from '@/sanity/lib/client'

// Fetch credits
const credits = await client.fetch(`
  *[_type == "credit"] | order(year desc, order asc)
`)

// Fetch profile
const profile = await client.fetch(`
  *[_type == "profile"][0]
`)

// Fetch gallery images
const galleryImages = await client.fetch(`
  *[_type == "galleryImage"] | order(order asc)
`)
```

## Content Types (Schemas)

The schemas are defined in `sanity/schemas/`:
- `profile.ts` - Profile information
- `credit.ts` - Film/TV credits
- `galleryImage.ts` - Gallery images
- `flowGalleryImage.ts` - Flow gallery images

**Note:** You'll need to set up these schemas in your Sanity project. You can:
1. Use the Sanity CLI to initialize a project locally (separate from Next.js)
2. Define schemas there and sync them
3. Or use the Sanity Management API to create the schema types

## Alternative: Use Sanity Studio Locally (Recommended)

If you want a local Studio interface, create it separately:

```bash
# In a separate directory
npx create-sanity@latest my-studio
cd my-studio
npm install
npm run dev
```

Then configure it to connect to the same project using your Project ID.

## Benefits of Headless Approach

- ✅ Works with Next.js 14 and React 18
- ✅ Simpler setup
- ✅ Studio can be hosted separately
- ✅ More flexible deployment options
- ✅ Better performance (Studio doesn't bundle with your site)

## Next Steps

1. Set up your Sanity project and get the Project ID
2. Add environment variables to `.env.local`
3. Update your pages to fetch data from Sanity instead of static files
4. Use the Sanity Studio at sanity.io/manage or set up a local Studio