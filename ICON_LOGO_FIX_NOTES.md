# Icon / brand logo fix

This build adds a dedicated `BrandLogo` client component.

It first tries the supplied brand-logo URL, then falls back to a Google favicon source, then falls back to a local styled wordmark tile. This prevents missing/broken logo icons from appearing on the live site if an external logo service blocks requests or returns 404.

Files changed:
- `src/components/BrandLogo.tsx`
- `app/page.tsx`
- `app/globals.css`
