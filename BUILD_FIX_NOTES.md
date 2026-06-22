# Vercel build fix notes

This package includes a small TypeScript fix in `src/lib/supabase-middleware.ts` for the Supabase SSR cookie helper.

The original demo package could fail during Vercel/Next.js compile with a cookie helper type error similar to:

```text
Parameter 'cookiesToSet' implicitly has an 'any' type
```

The middleware cookie setter is now explicitly typed and the project has been locally verified with:

```bash
npm install
npm run build
```

Do not upload `node_modules` or `.next` to GitHub. Vercel will install and build automatically.
