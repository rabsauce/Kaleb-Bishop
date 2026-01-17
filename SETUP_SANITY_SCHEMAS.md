# Setting Up Sanity Schemas

Since we're using Sanity as a headless CMS, you need to set up the schemas in your Sanity project. Here are your options:

## Option 1: Use Sanity CLI (Recommended for Schema Import)

If you want to programmatically deploy schemas:

1. **Install Sanity CLI globally:**
   ```bash
   npm install -g @sanity/cli
   ```

2. **Login to Sanity:**
   ```bash
   sanity login
   ```

3. **Initialize schemas in a temporary directory:**
   ```bash
   cd ~/Desktop
   mkdir sanity-schemas
   cd sanity-schemas
   npx create-sanity@latest --template clean --project 1rztdp97
   ```

4. **Copy schema files:**
   Copy the files from `sanity/schemas/` to the new project's schema directory

5. **Deploy schemas:**
   ```bash
   sanity schema deploy
   ```

## Option 2: Manual Setup in Sanity Studio (Easiest)

1. **Go to Sanity Studio:**
   - Visit https://sanity.io/manage
   - Select your project (1rztdp97)
   - Click on your project to open the Studio

2. **Create Document Types:**
   
   For each schema file in `sanity/schemas/`, create a corresponding document type:
   
   - **Profile** - Single document type
   - **Credit** - Document type
   - **Gallery Image** - Document type  
   - **Flow Gallery Image** - Document type

3. **Field Structure:**
   
   Refer to the TypeScript schema files in `sanity/schemas/` for the exact field structure:
   - `sanity/schemas/profile.ts`
   - `sanity/schemas/credit.ts`
   - `sanity/schemas/galleryImage.ts`
   - `sanity/schemas/flowGalleryImage.ts`

## Option 3: Use Sanity Vision (Quick Testing)

1. Go to https://sanity.io/manage
2. Open your project
3. Go to the API section
4. Use the Vision tool to test queries

## Schema Reference

### Profile Schema
- name (string)
- tagline (string)
- bio (text)
- email (string)
- phone (string)
- imdbUrl (url)
- instagramUrl (url)
- reelUrl (url)
- flowReelUrl (url)
- stats (object with: yearsActive, credits, specialties, height, weight)

### Credit Schema
- year (number)
- project (string)
- role (string - with options)
- type (string - with options)
- director (string, optional)
- coordinator (string, optional)
- notes (text, optional)
- highlight (boolean)
- order (number, optional)

### Gallery Image Schema
- title (string)
- image (image)
- alt (string)
- category (string - with options)
- order (number, optional)

### Flow Gallery Image Schema
- title (string)
- image (image)
- alt (string)
- order (number, optional)

## Next Steps

Once schemas are set up:

1. ✅ Add content through Sanity Studio
2. ✅ Your Next.js site will automatically fetch from Sanity
3. ✅ The code is already set up with fallbacks to static data

The helper functions in `lib/sanity/` will:
- Try to fetch from Sanity first
- Fall back to static data if Sanity fails or has no data
- Transform Sanity data to match your existing data structure