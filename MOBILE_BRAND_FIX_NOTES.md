# Mobile navigation and brand logo fix

This build fixes two reported issues:

1. **Brand logos missing**
   - Replaced fragile external Clearbit logo URLs with local SVG logo tiles in `public/brand-logos/`.
   - Updated `src/lib/demo-data.ts` so brand sections use local `/brand-logos/*.svg` assets.
   - This means logos load from the deployed site itself and do not depend on third-party image requests.

2. **Hamburger menu not showing on mobile**
   - Replaced the earlier `<details>` menu with a more robust checkbox/label mobile navigation.
   - Added `.mobile-menu-v2` CSS with `display: block !important` below 1180px.
   - Desktop nav/actions are force-hidden below 1180px and the mobile hamburger is force-shown.

Upload the contents of this ZIP to the GitHub repo root, preserving the `public`, `app`, and `src` folders.
