#!/bin/bash
# Script to add SANITY_API_TOKEN to Vercel

echo "Adding SANITY_API_TOKEN to Vercel..."
echo ""
echo "If you're not logged in, you'll be prompted to log in first."
echo ""

# Add environment variable for production
echo "skjVSZkpjCYW7LqG1tqaWhfD1rMVdGGxyVr6Q5MODtMdGET9EgSJwEzXr98OWqaN4D86WSiiUvAzhkq5oSVmvWP0N3vi5r6NtVJMGgYz5bCsMl0ua0RcvHlOj7fcxVHMXPkTrTHZO7JirbV6mV7qtbsy5pwkOH3Qz13XBclBkjTsYZtBQVYy" | npx vercel env add SANITY_API_TOKEN production

# Also add for preview and development
echo "skjVSZkpjCYW7LqG1tqaWhfD1rMVdGGxyVr6Q5MODtMdGET9EgSJwEzXr98OWqaN4D86WSiiUvAzhkq5oSVmvWP0N3vi5r6NtVJMGgYz5bCsMl0ua0RcvHlOj7fcxVHMXPkTrTHZO7JirbV6mV7qtbsy5pwkOH3Qz13XBclBkjTsYZtBQVYy" | npx vercel env add SANITY_API_TOKEN preview

echo "skjVSZkpjCYW7LqG1tqaWhfD1rMVdGGxyVr6Q5MODtMdGET9EgSJwEzXr98OWqaN4D86WSiiUvAzhkq5oSVmvWP0N3vi5r6NtVJMGgYz5bCsMl0ua0RcvHlOj7fcxVHMXPkTrTHZO7JirbV6mV7qtbsy5pwkOH3Qz13XBclBkjTsYZtBQVYy" | npx vercel env add SANITY_API_TOKEN development

echo ""
echo "Done! Environment variables added."
echo "Your next deployment will include the SANITY_API_TOKEN."
