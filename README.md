# Institute for Behavior and Learning Platform

This repository contains a full-stack web application for the Institute for Behavior and Learning (IBL). The `ibl-app/` directory is a Next.js 16 project that delivers the public marketing site, client intake workflows, a parent/caregiver resource portal, a blog/news hub, and an authenticated staff workspace for scheduling and case notes.

## Project layout

- `ibl-app/` – Next.js application with Tailwind CSS, Prisma (SQLite), and serverless API routes
  - `app/` – App Router pages for marketing, portals, and staff tools
  - `components/` – Reusable UI and form components
  - `lib/` – Prisma client, session helpers, and shared content
  - `prisma/` – Schema, migrations, and seed data
  - `public/resources/` – Downloadable manuals and worksheets exposed in the parent portal

## Getting started

```bash
cd ibl-app
npm install
cp .env.example .env   # update STAFF_JWT_SECRET before running in production
npx prisma db push
npm run db:seed        # optional, loads demo content and a staff account
npm run dev
```

The seeded staff account is `jordan.winters@ibl.org` with password `Support!2025`.

For more context, deployment notes, and feature documentation see `ibl-app/README.md`.
