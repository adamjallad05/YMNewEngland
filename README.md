# YM MA/RI Regional Calendar

A production-ready `Next.js + TypeScript + Tailwind + Supabase` event calendar for Young Muslims programming across Massachusetts and Rhode Island.

It includes:

- Public homepage with region selection
- Region pages with calendar/list toggles
- Monthly and weekly calendar modes
- Search and filters
- Event detail pages
- Secure admin login and dashboard
- Draft vs published workflow
- Multi-region event support
- Flyer/image uploads via Supabase Storage
- SQL schema and realistic YM-style seed data

## File Structure

```text
.
├── app
│   ├── admin
│   │   ├── events
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── auth/callback/route.ts
│   ├── events/[slug]/page.tsx
│   ├── login/page.tsx
│   ├── regions/[region]/page.tsx
│   ├── actions.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── admin
│   ├── calendar-shell.tsx
│   ├── event-detail.tsx
│   ├── event-list.tsx
│   ├── featured-sections.tsx
│   ├── filter-sidebar.tsx
│   ├── month-calendar.tsx
│   ├── region-selector.tsx
│   └── week-calendar.tsx
├── lib
│   ├── data/events.ts
│   ├── supabase
│   ├── date.ts
│   ├── types.ts
│   └── utils.ts
├── supabase
│   ├── schema.sql
│   └── seed.sql
└── README.md
```

## Database Schema

Main tables:

- `profiles`
  - Stores leader profile info and role: `admin` or `editor`
- `events`
  - Stores all public and draft event data
- `storage.buckets / storage.objects`
  - Stores flyer uploads in the `event-flyers` bucket

Important event fields:

- `id`
- `title`
- `slug`
- `description`
- `start_datetime`
- `end_datetime`
- `region`
- `secondary_regions`
- `venue_name`
- `address`
- `speaker_names`
- `category`
- `gender_audience`
- `age_group`
- `registration_url`
- `flyer_image_url`
- `contact_name`
- `contact_email`
- `tags`
- `status`
- `created_by`
- `created_at`
- `updated_at`

## Setup Instructions

### 1. Install Node.js

Use Node `20.x` or newer.

### 2. Install dependencies

```bash
npm install
```

or

```bash
pnpm install
```

### 3. Create Supabase project

1. Create a new Supabase project.
2. In Supabase SQL Editor, run [`supabase/schema.sql`](/Users/adamaljallad/Documents/New%20project/supabase/schema.sql).
3. Then run [`supabase/seed.sql`](/Users/adamaljallad/Documents/New%20project/supabase/seed.sql).

### 4. Configure environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5. Create your first admin

Recommended secure approach:

1. Disable public signups in Supabase Auth.
2. Create or invite the first leader account from Supabase Auth.
3. After the user exists, assign role manually in SQL:

```sql
update public.profiles
set role = 'admin'
where email = 'leader@example.com';
```

To assign an editor:

```sql
update public.profiles
set role = 'editor'
where email = 'editor@example.com';
```

### 6. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment Instructions

### Recommended hosting

Best overall setup:

- Frontend: Vercel
- Backend/Auth/Database/Storage: Supabase

Why this is the best fit:

- Easiest Next.js deployment path
- Good long-term editor/admin workflow
- Built-in Postgres, auth, storage, and row-level security
- Easy to scale from one region to many regions and states

### Deploy to Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Add the same environment variables from `.env.local`.
4. Deploy.

## Admin Usage Guide

### Roles

- `admin`
  - Full event access
  - Can edit/delete all events
  - Can manage leader permissions in Supabase
- `editor`
  - Can create events
  - Can edit their own events
  - Can delete only their own draft events

### Typical workflow for YM leaders

1. Sign in at `/login`
2. Open `/admin`
3. Create a new event
4. Save as `draft` while details are being finalized
5. Upload flyer
6. Publish when ready
7. Duplicate recurring events for weekly/monthly programs

### Easiest way for leaders to manage this long-term

Use:

- Supabase Auth with invite-only access
- One or two regional `admin` users
- Most chapter leads as `editor`
- Draft workflow before public publishing

That gives non-technical leaders a simple dashboard without needing code changes for ongoing updates.

## Design System

Dark-mode-first palette used in the app:

- Background: `#0B1E3A`
- Secondary: `#132A4A`
- Accent: `#1E3A8A`
- Hover: `#3B82F6`
- Text: `#E5E7EB`
- Secondary text: `#9CA3AF`

## Current Feature Set

- Homepage with welcoming regional navigation
- All Regions view
- Region-specific pages
- Calendar view and list view
- Monthly and weekly toggles
- Upcoming three months default focus
- Search by keyword, region, category, speaker, and location
- Date range filtering
- Event detail pages
- Today / This Week / Featured sections
- Add to Google Calendar
- Past events remain archived and searchable
- Admin authentication
- Event CRUD
- Draft/published status
- Recurring duplication workflow
- Multi-region assignment
- Flyer/image uploads

## Scaling Into a Multi-State YM System Later

This codebase is a strong regional starting point, but for multi-state growth I recommend these next upgrades:

1. Normalize regions into a database table instead of storing primary/secondary region names as text.
2. Add `states`, `chapters`, and `organizations` tables.
3. Replace `secondary_regions` array with an `event_regions` join table.
4. Add per-region admin scopes so leaders only manage their own chapter.
5. Add recurring event rules using a recurrence table instead of simple duplication.
6. Add image optimization, audit logs, and moderation history.
7. Add RSVP integration or a registrations table if you want on-site signup later.

## Notes

- This repository was scaffolded fully in code, but the current environment did not have `node`/`npm` installed, so I could not run the app locally here.
- Once Node is installed and dependencies are added, the project is set up to run as a standard Next.js application.
