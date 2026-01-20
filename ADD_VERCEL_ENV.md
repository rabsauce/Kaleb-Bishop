# Add Sanity API Token to Vercel

## Quick Method (Dashboard - Recommended)

1. Go to: https://vercel.com/dashboard
2. Click on your project: **kaleb-bishop** (or whatever it's named)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   - **Key**: `SANITY_API_TOKEN`
   - **Value**: `skjVSZkpjCYW7LqG1tqaWhfD1rMVdGGxyVr6Q5MODtMdGET9EgSJwEzXr98OWqaN4D86WSiiUvAzhkq5oSVmvWP0N3vi5r6NtVJMGgYz5bCsMl0ua0RcvHlOj7fcxVHMXPkTrTHZO7JirbV6mV7qtbsy5pwkOH3Qz13XBclBkjTsYZtBQVYy`
   - **Environment**: Select all three (Production, Preview, Development)
6. Click **Save**
7. Go to **Deployments** tab and click **Redeploy** on the latest deployment (or wait for next auto-deploy)

## CLI Method (Alternative)

If you prefer CLI, run:
```bash
npx vercel login
# Then follow the prompts to authenticate

# Then add the env var:
echo "skjVSZkpjCYW7LqG1tqaWhfD1rMVdGGxyVr6Q5MODtMdGET9EgSJwEzXr98OWqaN4D86WSiiUvAzhkq5oSVmvWP0N3vi5r6NtVJMGgYz5bCsMl0ua0RcvHlOj7fcxVHMXPkTrTHZO7JirbV6mV7qtbsy5pwkOH3Qz13XBclBkjTsYZtBQVYy" | npx vercel env add SANITY_API_TOKEN production
echo "skjVSZkpjCYW7LqG1tqaWhfD1rMVdGGxyVr6Q5MODtMdGET9EgSJwEzXr98OWqaN4D86WSiiUvAzhkq5oSVmvWP0N3vi5r6NtVJMGgYz5bCsMl0ua0RcvHlOj7fcxVHMXPkTrTHZO7JirbV6mV7qtbsy5pwkOH3Qz13XBclBkjTsYZtBQVYy" | npx vercel env add SANITY_API_TOKEN preview
echo "skjVSZkpjCYW7LqG1tqaWhfD1rMVdGGxyVr6Q5MODtMdGET9EgSJwEzXr98OWqaN4D86WSiiUvAzhkq5oSVmvWP0N3vi5r6NtVJMGgYz5bCsMl0ua0RcvHlOj7fcxVHMXPkTrTHZO7JirbV6mV7qtbsy5pwkOH3Qz13XBclBkjTsYZtBQVYy" | npx vercel env add SANITY_API_TOKEN development
```
