# Vercel App Directory Fix

This package moves the Next.js App Router directory to the project root as `/app` instead of `/src/app`.

Your GitHub repo root must show:

- package.json
- app/
- src/
- public/ (if present)
- supabase/
- next.config.mjs
- tsconfig.json
- vercel.json

Do not upload the ZIP itself. Upload the unzipped contents.

In Vercel:
- Framework Preset: Next.js
- Install Command: npm install
- Build Command: npm run build
- Output Directory: blank/default
- Root Directory: blank, unless your repo contains this project inside a subfolder.
