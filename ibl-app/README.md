# Institute for Behavior & Learning Platform

A full-stack Next.js platform for the Institute for Behavior and Learning (IBL). The site delivers responsive marketing pages, caregiver downloads, intake and contact workflows, authentication-gated staff tools for scheduling and case notes, plus a dynamic blog/news hub powered by Prisma + SQLite.

## Features

- **Public experience**: Homepage, About, detailed Services catalog, Intake, Contact, and Blog/News pages with modern glassmorphism styling.
- **Caregiver portal**: Downloadable CALM manuals, advocacy checklists, and worksheets hosted in `/public/resources`.
- **Operational workflows**:
  - Intake, contact, and caregiver forms validated with Zod and persisted through Prisma APIs.
  - Staff-only scheduling and case note management with instant refresh after submissions.
- **Authentication**: NextAuth credentials provider backed by Prisma/SQLite with encrypted passwords.
- **Content management**: Blog posts stored in the database with listing and detail pages.

## Tech Stack

- Next.js 16 (App Router, React 19)
- TypeScript + Tailwind CSS v4
- Prisma ORM with SQLite
- NextAuth.js for authentication
- React Hook Form + Zod for form handling

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

### Environment

Default `.env` values are provided:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="dev-secret-change-me"
```

Update `NEXTAUTH_SECRET` before deploying. For a clean database:

```bash
npm run db:migrate
npm run db:seed
```

## Seed Accounts

| Role  | Email             | Password        |
|-------|-------------------|-----------------|
| Admin | director@ibl.org  | StrongPass!123  |

Use the credentials above on `/staff/login` to access the scheduling and case note portal.

## Testing & Quality

- `npm run lint` – runs ESLint across the project.
- Forms include inline validation and server-side persistence checks.

## Project Structure

- `src/app` – App Router pages and route handlers.
- `src/components` – Reusable UI components and forms.
- `src/lib` – Prisma client, configuration, data helpers, and validators.
- `prisma` – Schema, migration history, and seed script.
- `public/resources` – Caregiver manuals & worksheets surfaced in the Parent/Caregiver portal.
