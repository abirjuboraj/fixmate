# FixMate

A role-based repair-service platform connecting device & home appliance owners with
verified local technicians. Customers can search services, request repairs, track job
status live, and pay securely after completion. Technicians manage their listings and
job pipeline; admins moderate services and oversee the platform.

## Live URL

https://fixmate-mu.vercel.app

> Replace this with your final deployed URL if it differs.

## Admin credentials

| Role  | Email            | Password    |
| ----- | ---------------- | ----------- |
| Admin | admin@gmail.com  | Admin10@    |

> Sign in at `/sign-in`, then open **Dashboard → Platform Overview** (you will be
> routed to `/dashboard/admin`).

## Key features

- **Authentication & roles** — Better Auth (email/password + Google), JWT tokens for
  the Express API, server-side sign-up role guard (only `customer` / `technician`
  can be self-selected), role-based routing and protected dashboards.
- **Public browsing** — server-side search, category & service-mode filters, and
  price/newest sorting on `/services`; deep-linked category cards from the homepage;
  full service details with technician profile (photo, area, bio).
- **Bookings** — customers request repairs, cancel pending requests, and pay after
  completion; technicians accept/reject, start work, and mark jobs complete with a
  final amount; server-enforced status pipeline.
- **Payments** — Stripe Checkout (`mode: 'payment'`, no webhooks), success receipt
  with copyable transaction ID, and payment history for customers and admins.
- **Dashboards** — dedicated overviews and management pages for Customer,
  Technician, and Admin, with instant client-side status filters and scoped loading
  skeletons.
- **Polish** — responsive layouts for mobile/tablet/desktop, reusable highlight
  flow from overview pages to list rows, toasts, skeletons, and empty states.

## Tech stack & npm packages

### Framework & runtime
- `next` 16.4.5 (App Router, Turbopack), `react` 19.3.1, `react-dom` 19.3.1

### Auth & data
- `better-auth` 1.7.25 (with JWT plugin), `@better-auth/mongo-adapter` 1.7.25
- `mongodb` 7.9.0 (resilient, cached connection)

### UI & styling
- `tailwindcss` 4 with `@tailwindcss/postcss`, `tw-animate-css`
- `shadcn` / `@base-ui/react`, `class-variance-authority`, `cn`
- `lucide-react` (icons), `next-themes`
- `embla-carousel-react` + `embla-carousel-autoplay` (homepage categories)
- `framer-motion` + `react-countup` (scroll-triggered stat counters)

### Feedback & utilities
- `sonner` (toast notifications)

### Dev tooling
- `typescript`, `eslint`, `eslint-config-next`, `prettier`,
  `prettier-plugin-tailwindcss`, `@types/node`, `@types/react`, `@types/react-dom`

## Getting started

```bash
npm install
cp .env.example .env   # fill in MongoDB, Better Auth, ImgBB, Google OAuth and API URL values
npm run dev            # http://localhost:3000
```

The Express backend lives in `../fixmate-server` and runs on port `5000` by default.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript checks |
| `npm run format` | Format TS/TSX with Prettier |
