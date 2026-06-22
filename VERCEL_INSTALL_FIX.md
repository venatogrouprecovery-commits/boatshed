# Vercel npm install fix

If Vercel previously failed at `npm install`, use this version of the ZIP.

The earlier package included a `package-lock.json` generated inside ChatGPT's sandbox. That lockfile can contain internal package registry URLs that Vercel cannot access, causing `npm install` / `npm ci` to exit with code 1.

This version removes the lockfile, pins dependency versions, removes the Netlify-only plugin from dev dependencies, and adds a Node engine range for Vercel.

## Vercel settings

Framework Preset: Next.js
Build Command: npm run build
Install Command: npm install
Output Directory: leave blank / default
Node.js Version: 20.x or 22.x

## Environment variables

NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-public-key
NEXT_PUBLIC_SITE_URL=https://your-vercel-site.vercel.app
