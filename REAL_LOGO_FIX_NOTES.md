# Real logo integration fix

This build replaces the previous fake/local text-tile logo SVGs with live brand logo image URLs based on the recognised brand domains.

The logo rail now uses real external logo images via `logo.clearbit.com`. This is suitable for demo/prototype presentation only. Before public launch, replace these URLs with permission-approved official logo assets stored locally under `public/brand-logos/` or from a licensed brand asset provider.

Changed file:
- `src/lib/demo-data.ts`

Also corrected the Mercury Marine domain typo from `mercuymarine.com` to `mercurymarine.com`.
