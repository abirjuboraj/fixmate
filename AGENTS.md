<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FixMate — Frontend Architecture

## 1. Overview

FixMate is a role-based repair-service platform (customers, technicians, admins).
This repository is the **Next.js 16 App Router frontend**. The Express REST API lives
in `../fixmate-server` and uses the same MongoDB Atlas database (`fixmate`).

- Authentication is handled by **Better Auth** (email/password + Google).
- The frontend mints a **JWT** through Better Auth's `jwt()` plugin
  (`auth.api.getToken()` in `lib/server.ts`) and sends it as a Bearer token to the
  Express API. The backend verifies it against Better Auth's JWKS endpoint.
- Payments use Stripe Checkout (`mode: 'payment'`, no webhooks).

## 2. Directory structure

```text
app/
├── (auth)/            # sign-in, sign-up (split-screen auth layout)
├── (public)/          # home, /services, /services/[id], /about, payment pages
├── (dashboard)/       # dashboard shell (server layout) + role dashboards
├── api/auth/[...all]/ # Better Auth catch-all route handler
├── unauthorized/      # status-aware 401 / 403 page
└── not-found.tsx
components/
├── home/              # hero, featured services, how it works, categories
│                      # carousel, why choose us, stats counter, testimonials
├── navbar/            # public navbar + mobile drawer + user dropdown
├── dashboard/         # client shell, sidebar, topbar, skeleton
├── footer/, shared/, ui/
hooks/                 # use-highlight (5s row highlight)
lib/                   # auth, auth-client, server helpers, api/, action/, db.ts
types/index.ts         # shared interfaces and constants
```

Server Components fetch data; interactive pieces are small Client Components.

## 3. Main routes & features

| Route | Purpose |
| --- | --- |
| `/` | Hero, featured services, how it works, popular categories (Embla carousel), why choose us |
| `/services` | Server-side search, category/mode filters and sorting via URL params |
| `/services/[id]` | Full service details + technician summary (photo, name, email, area, bio) |
| `/about` | Professional About page |
| `/sign-in`, `/sign-up` | Auth with JWT cookie cache and a server-side role guard |
| `/unauthorized` | `?status=401` → "Unauthorized Access"; `?status=403` → "Forbidden Access" |
| `/payment/success`, `/payment/cancel` | Stripe receipt with copyable transaction ID / cancellation notice |
| `/dashboard` | Server-side redirect to the signed-in role's dashboard |
| `/dashboard/customer` | Overview, bookings, payment history, profile |
| `/dashboard/technician` | Overview, add service, my services, manage requests, profile |
| `/dashboard/admin` | Platform overview, users, service approval, bookings, transactions, profile |

Highlights:
- **Status filters are instant** — admin services/bookings fetch all rows once and
  filter in the client; only mutations (`router.refresh()`) hit the server.
- **Shared highlight flow** (`lib/highlight.ts` + `hooks/use-highlight.ts`): overview
  "Review / Details / Update" links pass `?highlight=<id>` + `#anchor`; the target row
  scrolls into view, glows with a full-border outline for 5s, then fades out.
- **Responsive loaders** — only menu-level `loading.tsx` skeletons exist; there is no
  dashboard-shell loader. Overview pages use scoped `<Suspense>` skeletons.
- **Category deep links** — homepage cards link to `/services?category=<name>`.

## 4. Server helpers & conventions

- `lib/server.ts`
  - `getSession()` — React `cache()`d Better Auth session lookup.
  - `getToken()` — returns the plugin JWT from `auth.api.getToken({ headers })`.
  - `authFetch()` / `protectedMutation()` — attach the Bearer token; on 401/403 they
    redirect to `/unauthorized?status=<code>` **before** generic error handling.
  - `requireRole()` — redirects with `401` (no session) or `403` (wrong role).
- Any server-side `catch` that can wrap `redirect()`/`notFound()` calls
  `unstable_rethrow(error)` first, so Next's internal signals are not swallowed.
- `lib/db.ts` keeps one resilient MongoClient and reconnects if the driver closes
  its topology; `lib/auth.ts` wraps the Better Auth adapter with retries for reads.
- Toast notifications use **Sonner** (`import { toast } from "sonner"`).
- Styling: Tailwind CSS v4 with OKLCH theme tokens; shadcn/ui components; Lucide icons.

## 5. Tech stack

- Next.js 16.4.5 (Turbopack), React 19.3.1, TypeScript 5
- Tailwind CSS v4, shadcn/ui (`@base-ui/react`), Lucide React, tw-animate-css
- Better Auth 1.7.25 (+ JWT plugin + MongoDB adapter), MongoDB driver 7.9
- Embla Carousel, Framer Motion, react-countup, Sonner
- ESLint 9, Prettier, `npm run typecheck` / `npm run lint` / `npm run build`

## 6. Scripts

`npm run dev` · `npm run build` · `npm start` · `npm run lint` · `npm run typecheck` · `npm run format`
