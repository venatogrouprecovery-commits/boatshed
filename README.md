# Boatshed Marketplace — Next.js/Supabase Demo Marketplace

This is the proper launch-oriented marketplace foundation with convincing demo content preloaded in the frontend so the site looks active immediately.

## Stack

- **Next.js** app router
- **TypeScript**
- **Bootstrap 5** responsive frontend framework
- **Supabase Auth** for user accounts
- **Supabase PostgreSQL** for listings, profiles, enquiries, favourites and future marketplace tables
- **Row Level Security** policies included
- **Netlify-ready** via `netlify.toml`

## What is already built

- Responsive homepage with marketplace activity stats
- Demo boat inventory shown automatically when the live database is empty
- Boat search and filters
- Public boat listing detail pages
- Login and registration
- Buyer / seller / broker / admin roles
- Seller dashboard
- Create boat advert form
- Admin moderation page
- Enquiry capture
- Pricing page ready for Stripe
- Chandlery section with demo products
- Marine services directory with demo suppliers
- Marina/berth offers section
- Suggested chandlery/services on boat detail pages
- Supabase SQL schema with RLS policies
- Optional Supabase demo boat seed file

## Important demo behaviour

The app now includes static demo data in:

```text
src/lib/demo-data.ts
```

This means the public site looks populated even before Supabase has real data. Once approved live boat listings exist in Supabase, the boat pages automatically use those live listings instead of the demo boat fallback.

The chandlery, services and marina pages are currently demo/static sections. The database tables for those future marketplace areas have been added to `supabase/schema.sql`, so they can later be connected to real seller/supplier dashboards.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Create a Supabase project.

3. In Supabase SQL editor, run:

```text
supabase/schema.sql
```

4. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

5. Add your Supabase keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-or-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

6. Start the app:

```bash
npm run dev
```

7. Open:

```text
http://localhost:3000
```

## Optional: seed real demo boats into Supabase

The frontend already looks populated without this. If you want the boats to exist in Supabase as real database rows:

1. Register a seller or broker account in the app.
2. In Supabase, copy that user's `id` from `public.profiles`.
3. Open:

```text
supabase/demo_boat_seed.sql
```

4. Replace every instance of:

```text
YOUR_PROFILE_UUID
```

with the real profile UUID.

5. Run the file in Supabase SQL editor.

## Creating an admin

Register a normal user first, then in Supabase SQL editor run:

```sql
update public.profiles
set role = 'admin'
where id = 'YOUR_USER_UUID';
```

Then visit:

```text
/admin
```

## Netlify deployment

1. Push this project to GitHub.
2. Create a new Netlify site from the GitHub repo.
3. Add these environment variables in Netlify:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
4. Build command:

```bash
npm run build
```

5. Publish directory:

```text
.next
```

The repo includes `netlify.toml` with the Next.js plugin configured.

## What should be built next

### Phase 1 — Launch MVP completion

- Real image uploads to Supabase Storage or Cloudflare R2
- Edit/delete listing forms
- Broker company profiles
- Buyer saved searches
- Email notifications for enquiries
- Better listing media gallery
- Basic anti-spam/rate limiting

### Phase 2 — Commercial platform

- Stripe subscriptions and featured listing payments
- Broker stock imports
- Lead inbox and CRM export
- Make/model/location SEO landing pages
- Listing analytics
- Admin payment controls
- Moderation audit log

### Phase 3 — Marketplace moat

- Real chandlery seller dashboards
- Marine service provider accounts
- Marina berth availability management
- Valuation data
- Survey/document vault
- Boat transport quote requests
- Insurance/finance lead referrals
- AI advert writing
- Video walkthrough hosting

## Important note

This is still a foundation, not a finished production system. The difference now is that it looks like an active marketplace immediately and uses a proper architecture that can be extended without throwing the work away.
