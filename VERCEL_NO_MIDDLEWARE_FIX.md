# Vercel no-middleware fix

This build removes `src/middleware.ts` entirely to stop `MIDDLEWARE_INVOCATION_FAILED` errors on Vercel.

The public demo pages still work. Login/admin protection should be handled inside pages/actions until the deployment is stable. Middleware can be reintroduced later after the environment variables and Supabase Auth flow are confirmed working.

Important redeploy instruction:
- Delete the old `src/middleware.ts` from GitHub if it exists.
- Upload/commit this project version.
- Redeploy on Vercel.
