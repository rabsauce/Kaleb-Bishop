# Sanity Studio Setup Steps

## Step 1: Create the Studio

In your terminal, run:

```bash
cd ~/Desktop
npx create-sanity@latest kaleb-bishop-studio --template clean
```

**When prompted:**
1. Select existing project → Choose **"Stunt Portfolio (1rztdp97)"**
2. Dataset → Type: **`production`**
3. Output path → Press Enter (default: `kaleb-bishop-studio`)
4. Use TypeScript? → Type: **`Y`** (Yes)

Wait for it to finish installing dependencies.

## Step 2: Copy Your Schemas

After the Studio is created, run:

```bash
cd ~/Desktop/kaleb-bishop-studio
cp -r "../Stunt Performer Site/sanity/schemas" ./schemas
```

## Step 3: Update the Config

Update `sanity.config.ts` to import your schemas.

## Step 4: Run the Studio

```bash
npm run dev
```

Access at: http://localhost:3333

---

**Current Status:** Ready to create Studio