# Institute for Behavior and Learning Web Platform

A full-stack Next.js application that powers the public website, parent/caregiver portal, intake workflows, blog, and authenticated staff workspace for the Institute for Behavior and Learning (IBL).

## Tech stack

- **Next.js 16 (App Router)** for server-rendered marketing and portal experiences
- **Tailwind CSS v4** for responsive design
- **Prisma + SQLite** for persistent storage (intakes, messages, resources, staff data)
- **JWT-based cookies** for staff authentication
- **React Hook Form + Zod** for accessible, validated forms

## Features

- Marketing site with homepage, About, Services, Contact, Blog/News, and CALM highlights
- Client intake workflow, contact form, and crisis support messaging
- Parent/Caregiver portal with downloadable manuals & worksheets served from `public/resources`
- Blog listing plus individual article pages backed by Prisma content
- Staff portal with credential login, schedule management, and case note logging
- API routes for all forms plus protected scheduling and note-taking endpoints

## Getting started

```bash
npm install
cp .env.example .env   # set a unique STAFF_JWT_SECRET
npx prisma db push      # creates prisma/dev.db
npm run db:seed         # optional demo content & staff account
npm run dev
```

The seed script provisions a staff user:

- **Email:** `jordan.winters@ibl.org`
- **Password:** `Support!2025`

## Useful scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local development server on http://localhost:3000 |
| `npm run build` | Create an optimized production build |
| `npm start` | Run the production build |
| `npm run lint` | Lint the project with ESLint |
| `npm run prisma:generate` | Regenerate the Prisma client |
| `npm run db:migrate` | Apply schema changes via `prisma migrate dev` |
| `npm run db:seed` | Seed the SQLite database with demo content |

## Environment variables

| Name | Description |
| --- | --- |
| `DATABASE_URL` | SQLite connection string (defaults to `file:./prisma/dev.db`) |
| `STAFF_JWT_SECRET` | Secret string used to sign staff session cookies |

## Deploying

1. Provision a persistent SQLite-compatible volume or swap to Postgres by updating `DATABASE_URL`.
2. Run `npx prisma migrate deploy` followed by `npm run db:seed` if you want starter content.
3. Set `STAFF_JWT_SECRET` in your hosting provider.
4. Build with `npm run build` and serve with `npm start` (or use your preferred adapter).

## Testing the flows

- Submit the intake or contact form to populate `ClientIntake`/`ContactMessage` tables.
- Download manuals from `/parent-portal` to validate resource delivery.
- Log in via `/staff/login` using the seeded credentials to access dashboards, schedules, and case notes.
- Add sessions and case notes; data updates instantly via Prisma.

Feel free to adapt the schema, add additional portals, or integrate with external services (e.g., SendGrid, calendaring APIs) using the existing API structure.
