<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# FixMate — Project Architecture & Progress Log

## 1. Project Overview
FixMate is a full-stack, role-based repair service platform connecting device & home appliance owners with verified technicians and admin moderation. Built with Next.js App Router (Client), Express.js (Server), MongoDB, Better Auth, and Stripe.

### G. Unauthorized Access Page (`/unauthorized`)
- **Server Component** (`app/unauthorized/page.tsx`): Role & session aware 403 access restricted view.
  - **Guests / Logged-out**: Contextual notice explaining that the page is for verified members, providing a primary "Sign In to Continue" button (linking to `/sign-in`) and "Browse Services".
  - **Authenticated Users**: Shows their user name and role, explaining that their account role does not have authorization for that section, providing a primary "Go to [Role] Dashboard" button routing directly to their specific dashboard (`/dashboard/customer`, `/dashboard/technician`, or `/dashboard/admin`) and "Home".

### H. Customer My Bookings Route (`/dashboard/customer/bookings`)
- **Server Component** (`app/(dashboard)/dashboard/customer/bookings/page.tsx`): Verifies customer session server-side and fetches own bookings using `getMyBookings()`.
- **Client Component** (`app/(dashboard)/dashboard/customer/bookings/_components/customer-bookings-client.tsx`):
  - Responsive presentation: desktop data table (`Table`) and mobile card list.
  - Visual status badges: Requested (amber), Accepted (blue), In Progress (purple), Completed (emerald), Rejected (destructive), Cancelled (muted).
  - Payment badges: Paid (emerald), Unpaid (amber).
  - Conditional cancellation: Cancel button visible only when `status === 'requested'`. Prompts an alert confirmation modal before setting status to `'cancelled'`.
  - Conditional payment: "Pay Now" button visible only when `status === 'completed'` and `paymentStatus === 'unpaid'`. Connects to Stripe payment handler.
  - Replaces button with a "Paid" badge once completed and paid.
  - Empty state with CTA linking to `/services`.
- **Actions & API**:
  - `lib/api/bookings.ts`: `getMyBookings()`
  - `lib/action/bookings.ts`: `cancelBooking(id)` and `initiateBookingPayment(id)` with TODO hooks for your backend routes.

### I. Technician Manage Requests Route (`/dashboard/technician/requests`)
- **Server Component** (`app/(dashboard)/dashboard/technician/requests/page.tsx`): Verifies technician session server-side and fetches assigned requests via `getTechnicianBookings()`.
- **Client Component** (`app/(dashboard)/dashboard/technician/requests/_components/technician-requests-client.tsx`):
  - **Status Filter Tabs**: Filter requests by *All Requests*, *Requested*, *Accepted*, *In Progress*, and *Completed* with real-time count badges.
  - **Status Pipeline Action Buttons**:
    - `requested`: **Accept** (green) / **Reject** (red) buttons.
    - `accepted`: **Start Work** (blue) button transitions job to `in-progress`.
    - `in-progress`: **Mark Completed** (purple) button opens a modal.
    - `completed`, `rejected`, `cancelled`: No actions. Displays payment badge for completed jobs.
  - **Mark Completed Modal**: Pre-fills the base price into a final amount input, allows technician adjustment for parts/diagnostics, and submits with validation.
  - **Responsive Dual Layout**: Full detailed data table on desktop and touch-friendly card list on mobile.
- **Actions & API**:
  - `lib/api/bookings.ts`: `getTechnicianBookings()`
  - `lib/action/bookings.ts`: `updateBookingStatus(bookingId, status, finalAmount)`

---

## 2. Completed Milestones & Current Progress

### A. Authentication & User Schema
- Preserved existing MongoDB integration and Better Auth configuration.
- Client types inferred using `inferAdditionalFields<typeof auth>()`.
- Default user role set to `"customer"`, with `"technician"` selectable during sign-up. `"admin"` is assigned strictly via database or admin plugin.
- Added custom authentication layout, sign-in, and sign-up with client-side password validation (min 6 characters, uppercase, lowercase) and ImgBB photo selection support.

### B. Layouts & Navigation
- **Public Layout**: Sticky responsive Navbar with active route highlighting, user profile menu, and footer with legal and modern X social icons.
- **Dashboard Layout**: Role-based sidebar and topbar supporting Customer, Technician, and Admin roles with responsive sheet drawer for mobile/tablet.
- **Role Routing**: Server-side redirect at `/dashboard` routing directly to `/dashboard/customer`, `/dashboard/technician`, or `/dashboard/admin`.
- Custom 404 repair-themed error page implemented at `app/not-found.tsx`.

### C. Technician Add Service (`/dashboard/technician/add-service`)
- Server Component page verifying session and `"technician"` role.
- Client Component form capturing: Title, Category (7 official categories), Service Mode (`Home Visit` / `Shop Drop-off`), Base Price, Estimated Duration, Service Area, Description, and Banner Image.
- Banner image uploaded via ImgBB server action (`uploadImage`).
- Defaults to `approvalStatus: 'pending'` and `isAvailable: true` awaiting admin moderation.
- Technician info read-only from session and appended on backend.

### D. Public Services Route (`/services`) — Challenge 1 Compliant
- Implemented full Server/Client separation:
  - **Server Component** (`app/(public)/services/page.tsx`): Fetches public approved & available services using `getAllPublicServices()` with server-side query parameters (`search`, `category`, `serviceMode`, `sort`).
  - **Client Component** (`app/(public)/services/_components/services-browser-client.tsx`):
    - **Live Real-time Search**: Search input on the far-left searches as the user types (with 300ms debounce and loading spinner). No search button needed.
    - **Side-by-Side Controls**: Top row places search bar on the far-left, and the service mode filter and sort dropdown side-by-side on the far-right.
    - **Category Pills**: Clean horizontal row placed directly underneath the search and controls row.
    - **Clean Dynamic Empty State**: Removed redundant active filter badges. Renders a focused empty state illustration with a direct "Reset Filters" action.
  - **Service Card** (`app/(public)/services/_components/service-card.tsx`): Uniform aspect-ratio image, category tag, mode badge, price, technician attribution, and view details CTA.
  - **Skeleton Loader** (`app/(public)/services/_components/services-skeleton-grid.tsx`): Animated skeleton cards matching real card layout during loading transitions.
- **Dedicated Central Types** (`types/index.ts`): All interfaces (`PublicServicesQueryParams`, `PublicServicesResponse`, `SortOption`, etc.) are centralized in `types/index.ts`.
- **Deep-linking Ready**: Passing `?category=AC` opens the page with the AC category filter pre-selected and queried from the server, ready for the upcoming Homepage "Popular Categories" section.

### E. Service Details Route (`/services/[id]`)
- **Server Component** (`app/(public)/services/[id]/page.tsx`): Fetches public approved service details and verifies `approvalStatus === 'approved'` and `isAvailable === true`, else calls `notFound()`. Reads session server-side for role awareness.
- **Client Component** (`app/(public)/services/[id]/_components/service-detail-view.tsx`): Displays large aspect-video banner, title, duration, area pills, description, role-restricted "Request Repair" button (with callbackURL for logged-out users, disabled notice for tech/admin), and sticky side-by-side pricing & verified technician cards with generous bottom padding.

### F. Homepage Extra Section: Popular Categories & Why Choose Us
- **Popular Categories** (`components/home/popular-categories.tsx`): Clickable category cards featuring the 7 official repair categories (`Smartphone`, `Laptop & PC`, `AC`, `Refrigerator`, `TV`, `Washing Machine`, `Electrical`) with custom icons and descriptions. Each card deep-links to `/services?category=<CategoryName>`, pre-filtering the services browser.
- **Why Choose Us** (`components/home/why-choose-us.tsx`): Divided into a clean, dedicated trust section showcasing:
  1. **Core Trust Pillars**: 100% Verified Technicians, Pay After Service, Live Tracking, and Quality Guarantee.
  2. **Platform Stats & Metrics**: Satisfied customers (2,500+), repairs completed (4,800+), satisfaction rate (99.2%), and average rating (4.9/5).
  3. **Customer Testimonials**: Authentic customer feedback cards with star ratings and reviewer avatars.

### G. Unauthorized Access Page (`/unauthorized`)
- **Server Component** (`app/unauthorized/page.tsx`): Role & session aware 403 access restricted view.
  - **Guests / Logged-out**: Contextual notice explaining that the page is for verified members, providing a primary "Sign In to Continue" button (linking to `/sign-in`) and "Browse Services".
  - **Authenticated Users**: Shows their user name and role, explaining that their account role does not have authorization for that section, providing a primary "Go to [Role] Dashboard" button routing directly to their specific dashboard (`/dashboard/customer`, `/dashboard/technician`, or `/dashboard/admin`) and "Home".

### H. Customer My Bookings Route (`/dashboard/customer/bookings`)
- **Server Component** (`app/(dashboard)/dashboard/customer/bookings/page.tsx`): Verifies customer session server-side and fetches own bookings using `getMyBookings()`.
- **Client Component** (`app/(dashboard)/dashboard/customer/bookings/_components/customer-bookings-client.tsx`):
  - Responsive presentation: desktop data table (`Table`) and mobile card list.
  - Visual status badges: Requested (amber), Accepted (blue), In Progress (purple), Completed (emerald), Rejected (destructive), Cancelled (muted).
  - Payment badges: Paid (emerald), Unpaid (amber).
  - Conditional cancellation: Cancel button visible only when `status === 'requested'`. Prompts an alert confirmation modal before setting status to `'cancelled'`.
  - Conditional payment: "Pay Now" button visible only when `status === 'completed'` and `paymentStatus === 'unpaid'`. Connects to Stripe payment handler.
  - Replaces button with a "Paid" badge once completed and paid.
  - Empty state with CTA linking to `/services`.
- **Actions & API**:
  - `lib/api/bookings.ts`: `getMyBookings()`
  - `lib/action/bookings.ts`: `cancelBooking(id)` and `initiateBookingPayment(id)` with TODO hooks for your backend routes.

### I. Technician Manage Requests Route (`/dashboard/technician/requests`)
- **Server Component** (`app/(dashboard)/dashboard/technician/requests/page.tsx`): Verifies technician session server-side and fetches assigned requests via `getTechnicianBookings()`.
- **Client Component** (`app/(dashboard)/dashboard/technician/requests/_components/technician-requests-client.tsx`):
  - **Status Filter Tabs**: Filter requests by *All Requests*, *Requested*, *Accepted*, *In Progress*, and *Completed* with real-time count badges.
  - **Status Pipeline Action Buttons**:
    - `requested`: **Accept** (green) / **Reject** (red) buttons.
    - `accepted`: **Start Work** (blue) button transitions job to `in-progress`.
    - `in-progress`: **Mark Completed** (purple) button opens a modal.
    - `completed`, `rejected`, `cancelled`: No actions. Displays payment badge for completed jobs.
  - **Mark Completed Modal**: Pre-fills the base price into a final amount input, allows technician adjustment for parts/diagnostics, and submits with validation.
  - **Responsive Dual Layout**: Full detailed data table on desktop and touch-friendly card list on mobile.
- **Actions & API**:
  - `lib/api/bookings.ts`: `getTechnicianBookings()`
  - `lib/action/bookings.ts`: `updateBookingStatus(bookingId, status, finalAmount)`

### J. Stripe Payment Flow (No Webhook)
- **Frontend Action** (`lib/action/bookings.ts`): `initiateBookingPayment(bookingId)` calls `POST /api/payment/create-checkout-session` with `{ bookingId }`, receives a Stripe Checkout URL and redirects with `window.location.href`.
- **Backend** (`controllers/payment.controller.js`):
  - `createCheckoutSession`: Looks up booking by `bookingId`, builds a Stripe `mode: 'payment'` session using `basePrice`/`finalAmount` as the line item, saves a pending payment record, and returns `{ url }`.
  - `verifyCheckoutSession`: Called from the success page via `GET /api/payment/verify?session_id=…`. Retrieves the Stripe session, checks `payment_status === 'paid'`, marks booking `paymentStatus: 'paid'`, updates payment record, and returns the payment details.
  - `getMyPayments`: Returns all payments for the authenticated customer via `GET /api/payment/my`.
- **Payment Model** (`models/payment.model.js`): `insertPayment`, `findPaymentBySessionId`, `findPaymentsByCustomer`, `findAllPayments`. Schema fields: `bookingId`, `serviceTitle`, `customerName`, `customerEmail`, `technicianName`, `technicianEmail`, `amount`, `currency`, `transactionId`, `stripeSessionId`, `paymentStatus`, `paidAt`.
- **Validator** (`validators/payment.validator.js`): Validates only `{ bookingId: string }` — all other data is fetched from DB inside the controller.
- **Routes** (`routes/payment.routes.js`): `POST /api/payment/create-checkout-session`, `GET /api/payment/verify`, `GET /api/payment/my`.

### K. Payment Success & Cancel Pages
- **Success Page** (`app/(public)/payment/success/page.tsx`): Server Component that reads `?session_id` from search params and calls `verifyStripeSession(sessionId)`. On success shows a receipt (service title, amount, transaction ID, date). On failure shows an error state.
- **Cancel Page** (`app/(public)/payment/cancel/page.tsx`): Clean UI informing the user their payment was cancelled. Contains a "Return to My Bookings" CTA linking back to `/dashboard/customer/bookings`.
- Both pages use the public layout (Navbar + Footer) under the `(public)` route group.

### L. Customer Payment History Route (`/dashboard/customer/payments`)
- **Page** (`app/(dashboard)/dashboard/customer/payments/page.tsx`): Server Component; fetches payment history via `getMyPayments()`.
- Responsive desktop table + mobile card list showing: service title, technician, amount, date paid, transaction ID, and "Paid" status badge.
- Uses `PaymentRecord` interface from `types/index.ts`.

---

## 3. Tech Stack & Standards
- **Framework**: Next.js 16.4.5 (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS v4 with OKLCH theme variables
- **Component Library**: shadcn/ui exclusively
- **Icons**: Lucide React
- **Payments**: Stripe (`mode: 'payment'` only — no subscription, no webhook yet)
- **Toast Notifications**: Sonner (`import { toast } from "sonner"`) — never `@/components/ui/toast`
- **Backend**: Express.js at `C:\html\Projects_new_course\My Assignments\fixmate-server` (Port 5000) — deployed to Vercel via `api/index.js` + `vercel.json`
- **Database**: MongoDB Atlas (`fixmate` database)

## 4. Remaining Pages (Not Yet Built)
- `/dashboard/admin` — Admin overview dashboard
- `/dashboard/admin/bookings` — All bookings (admin view)
- `/dashboard/admin/services` — Service approval queue
- `/dashboard/admin/users` — Manage users & roles
- `/dashboard/admin/transactions` — All payment transactions (uses `findAllPayments`)
- `/dashboard/technician` — Technician overview / stats
- `/dashboard/technician/my-services` — Technician's listed services
- `/dashboard/profile` — Shared profile update page (all roles)
