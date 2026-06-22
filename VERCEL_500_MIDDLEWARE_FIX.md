# Vercel 500 Middleware Fix

This build adds a defensive Supabase middleware wrapper.

If `NEXT_PUBLIC_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` are missing or wrong in Vercel, the middleware now skips Supabase session refresh instead of crashing the whole site with:

`500: INTERNAL_SERVER_ERROR - MIDDLEWARE_INVOCATION_FAILED`

Check these Vercel environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-public-anon-or-publishable-key
NEXT_PUBLIC_SITE_URL=https://your-vercel-project.vercel.app
```

Do not use the Supabase database connection string, JWT secret, or service role key for `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

After changing environment variables in Vercel, redeploy the project.
