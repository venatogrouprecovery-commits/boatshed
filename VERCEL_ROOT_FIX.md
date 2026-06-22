# Vercel root / Next.js detection fix

If Vercel says it cannot identify the Next.js version, it normally means Vercel is not seeing this root-level package.json file.

This package includes:

- package.json at the project root
- next listed under dependencies
- vercel.json forcing the framework to Next.js
- .npmrc forcing the public npm registry

When uploading to GitHub, upload the *contents* of this folder, not the folder itself and not the ZIP file.

In Vercel project settings:

- Framework Preset: Next.js
- Root Directory: leave blank, or set it to the exact folder that contains package.json
- Install Command: npm install
- Build Command: npm run build
- Output Directory: leave blank
- Node.js Version: 20.x

Required env vars:

NEXT_PUBLIC_SUPABASE_URL=https://okqvkjwpvsmvdpfyvdti.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_gggI5FSUoNwItF9cKnGu7A_s1XpGLkv
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_gggI5FSUoNwItF9cKnGu7A_s1XpGLkv
NEXT_PUBLIC_SITE_URL=https://boatshedmarketplacenext.vercel.app
