# Ads Growly

A focused Next.js App Router site for Ads Growly with a public intake form, admin panel, and Supabase-ready submissions storage.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The admin panel is at [http://localhost:3000/admin](http://localhost:3000/admin). Without environment variables, local preview mode uses the passcode `local-preview` and stores submissions in dev-server memory so the form-to-admin flow can be tested immediately.

## Supabase Setup

Run `supabase_schema.sql` in your Supabase SQL Editor.

Set these environment variables locally and in Vercel:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
SUPABASE_SECRET_KEY=your-supabase-secret-key
ADMIN_PASSCODE=choose-a-private-admin-passcode
ADMIN_SESSION_SECRET=choose-a-long-random-session-secret
```

Legacy Supabase projects can use `SUPABASE_SERVICE_ROLE_KEY` instead of `SUPABASE_SECRET_KEY`.

## Vercel

This app is Vercel-ready as a standard Next.js project. Add the environment variables above in the Vercel project settings, then deploy.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
