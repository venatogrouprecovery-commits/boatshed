# Environment configuration update

This build includes the supplied Supabase environment values in `.env.local` for local testing.

The app now accepts either of these key names:

- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

For Vercel, set these environment variables in Project Settings → Environment Variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://okqvkjwpvsmvdpfyvdti.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_gggI5FSUoNwItF9cKnGu7A_s1XpGLkv
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_gggI5FSUoNwItF9cKnGu7A_s1XpGLkv
NEXT_PUBLIC_SITE_URL=https://boatshedmarketplacenext.vercel.app
```

After changing Vercel environment variables, trigger a fresh redeploy.
