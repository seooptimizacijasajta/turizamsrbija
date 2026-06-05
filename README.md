# turizamsrbija.com — Phase 1 app (Next.js + Supabase)

Bilingual (SR/EN) tourism marketplace. App Router, TypeScript, Tailwind base.
Listings load from Supabase; **falls back to built-in seed data** if no database is
configured, so it runs even before you connect Supabase.

## What works now (Phase 1)
- Home, Mountains, Lakes, Spas, Ethno villages, Accommodation, and detail pages
- SR/EN language toggle (remembers your choice)
- Search / region / category / sort filters
- Inquiry form on every listing → saves to Supabase `inquiries` table via `/api/inquiries`
- 31 real Serbian destinations preloaded as seed/fallback

## Run locally
```bash
npm install
cp .env.example .env.local      # fill in your Supabase keys (optional for first run)
npm run dev                     # http://localhost:3000
```
Without keys it runs on seed data. With keys it reads/writes your real database.

## Deploy to Vercel (recommended path)
1. Create a **new GitHub repo** (e.g. `turizamsrbija`) and push this folder to it.
   (Do NOT commit `node_modules` or `.env.local` — `.gitignore` already excludes them.)
2. In **Vercel → Add New → Project**, import that repo. Framework auto-detects as Next.js.
3. Add **Environment Variables** (Project → Settings → Environment Variables):

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | Supabase service_role key (secret) |

4. **Deploy.** Then add the domain `turizamsrbija.com` in Vercel → Domains and update DNS
   at your registrar (Mcloud d.o.o.) with the two records Vercel shows you.

## Connect the database
1. In Supabase → SQL Editor, first clear the v0-created tables (DB has no real data yet):
   ```sql
   drop table if exists bookings, inquiries, availability, listings, owners cascade;
   ```
2. Run the project's `schema.sql` (in the `turizamsrbija/` folder I gave you earlier).
3. Optional: seed the database with the 31 starter listings — see `scripts/` (ask me to
   wire up the seed script and I'll add it).

## Project structure
```
app/
  page.tsx              Home (server) → HomeClient
  planine|jezera|banje|etno-sela|smestaj/page.tsx   Section pages (server)
  detalji/[id]/page.tsx Detail page (server)
  api/inquiries/route.ts  POST inquiry → Supabase
  components/           Header, Footer, cards, explorer, booking form, detail view
lib/
  types.ts              Listing types
  data.ts               getListings()/getListing() — Supabase + seed fallback
  supabase.ts           server client factory
  i18n.tsx              SR/EN dictionary + LanguageProvider
  seed.json             31 starter listings
```

## Next phases (not built yet)
- **Phase 2:** push each inquiry to HubSpot (stub marked `TODO` in `api/inquiries/route.ts`); admin dashboard.
- **Phase 3:** owner sign-up + listing management (Supabase Auth).
- **Phase 4:** Stripe Connect payments + availability calendar.

Verified: `next build` passes, all routes compile, inquiry API validated.
