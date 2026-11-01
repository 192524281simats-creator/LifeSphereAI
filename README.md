# LifeSphere AI — V1 demonstration

A React, Vite, TypeScript and Tailwind celebration workspace for community organizations. This release is a functional frontend demonstration, not the full production platform. AI is template-based, authentication is mocked, and all records are synthetic and persisted in browser localStorage. No live AI, PostgreSQL, vendor bookings, donations, cloud media storage, payments or verified rewards are connected.

## Run
Use Node 18+ and the existing project package configuration: `npm install`, `npm run dev`. Build with `npm run build`. OnSpace manages missing common dependencies. Do not put service secrets in client-side environment variables. Vite's SPA entry is `index.html`; configure production hosts to rewrite application routes to it.

## Connected demo flow
1. `/welcome` → `/login`: enter a sample profile; this does not authenticate.
2. `/events`: create a celebration, choose the active event and manage preparation tasks.
3. `/copilot`: request a plan with a guest count and INR budget; template responses identify estimates and assumptions. Approve checklist additions.
4. `/studio`: consent, upload an optional photograph, compose accurate overlay text on a generated sample background, download or save to memories. Style options label the composition; they do not transform faces.
5. `/gifts`: filter estimated sample gift ideas and save favorites.
6. `/budget`: record expenses, compare Economy/Balanced/Premium estimates, approve a base budget.
7. `/simulation`: change guests/budget/weather/venue assumptions; inspect transparent calculations and approve a review task. Original event data stays unchanged.
8. `/guests`: add synthetic guests, preview same-device QR invitation and RSVP, confirm attendance once, export CSV.
9. `/community`: create synthetic resource/volunteer/food listings and record demo interest. No real claims occur.
10. `/impact`: compute explicit material avoidance, meal surplus and self-reported access readiness; demo points derive from unique completed tasks.
11. `/memories`: store authorized compressed images, edit captions, export or delete.
12. `/settings`: export all workspace records or reset synthetic data.

## Important limitations
Tasks, guests, expenses and resources are workspace-wide in this release; they are not separated per event. QR invitation data is only available in the browser holding the demo records. No permissions or privacy protections beyond browser-local storage are implied. Use sample media only. Browser storage can fill up; errors are surfaced and users can export records or delete images. There are no cloud sessions, email verification or password reset. Upcoming personal, vendor, admin and venue modules are intentionally not exposed as broken navigation.

## Architecture
Routes: `src/App.tsx`; page-level lazy loading. Shell: `components/layout`. Reusable entry form: React Hook Form + Zod in `components/forms`. Persistent state and types: `hooks/useWorkspace.tsx`, `types/index.ts`. Synthetic seeds: `constants/demo.ts`. Transparent template orchestrator: `lib/demoEngine.ts`. Style tokens use HSL CSS properties in `src/index.css`.

## Production blueprint
OnSpace supports Supabase-compatible OnSpace Cloud with PostgreSQL, Auth, Storage and Edge Functions. A Python FastAPI/SQLAlchemy runtime and Render backend cannot run in this workspace. Initialize OnSpace Cloud before implementing any backend services. Use authenticated Edge Functions for orchestration, provider calls, JWT verification, authorization, quotas, audit trails and job processing. OnSpace AI is the default AI integration. Secret keys must remain server-side.

### Ownership and relationships to implement
- `profiles.id` references `auth.users.id`; preferences belong to users. Organization membership joins user and organization with explicit roles; users cannot self-assign administrator privileges.
- `events.organization_id` references organizations; `created_by` references profiles. `event_members` joins event/user with organizer/editor/viewer roles. Tasks, budgets, expenses, guests, invitations, venues and layouts reference events. Check-ins reference guests and events, with a unique event/guest constraint preventing duplicates.
- AI conversations belong to users and optionally events; messages reference conversations. Jobs, runs, recommendations and usage reference authorized owner/event and track pending/processing/completed/failed. Store only necessary authorized context.
- Generated images, birthday profiles, memory albums and user files belong to users with optional event association. Memory items reference albums. Private storage object paths include the owner UUID; access is via short-lived signed URLs after authorization.
- Gifts belong to users; registries may reference events. Group gift members are explicit authorized participants. Avoid storing payment credentials.
- Reward wallets uniquely reference users; transactions have unique idempotency keys and verified source references. Award only server-side after verified activity. User achievements uniquely join user and achievement.
- Vendor profiles reference vendor owners, services reference vendors, quotes/bookings reference vendor and event. Bookings transition to confirmed only on provider confirmation. Reviews require eligible completed activity.
- Community requests/listings/donations reference owner and organization where relevant; requests/claims reference listings and requesters. Volunteer matches join a verified volunteer/request. Food records require preparation time, deadline, quantity, location consent, safety checks and approved recipient.
- Impact records reference event/user and preserve inputs, versioned assumptions and formulas. Personal plans, expenses, reminders and emergency contacts belong to their user; explicit family sharing is needed for shared tasks.
- Notifications belong to users; audit logs are server-append-only. Reports have reporter ownership and restricted moderator access. Platform settings are administrator-write-only.

### RLS migration requirements
No executable database migration is supplied or applied in this frontend demo. Before production: UUID primary keys, foreign keys, timestamps, non-negative money/quantity checks, event membership uniqueness, indexed owner/event/org references, role enums and server-authoritative lifecycle transitions. Enable RLS on every table. Owner policies must include both USING and WITH CHECK. Event policies must validate event membership and operation role; guest public access uses expiring scoped invitation tokens, not unrestricted reads. Organizations require verified membership. Administrative privileges are controlled by trusted server claims or protected role tables. Public vendor/community access must expose only approved non-sensitive fields through curated views. Reward transactions and audit logs cannot be client-written. Storage policies must validate bucket and owner path. Seed only explicitly labeled demo organizations and accounts.

## Manual QA checklist (not an automated test report)
- Build/typecheck and inspect console errors before deployment.
- Create an event with invalid and valid fields, select it and refresh.
- Toggle tasks and ensure progress/points recalculate without duplicate awards.
- Add/delete expenses and verify remaining budget and chart.
- Compare scenario formula against hand calculations, including budget shortfall and rain surcharge.
- Confirm photo consent requirement and invalid/oversize file rejection.
- Download artwork, save/delete memories, and refresh to inspect persistence.
- Filter gifts and confirm persisted favorites.
- Add guest, RSVP and check in; repeated check-in is disabled.
- Preview QR link in same browser; separate device is intentionally unavailable.
- Create demo listing and record interest without claiming real donation.
- Verify checklist percentages and environmental assumptions.
- Test keyboard focus, form labels, mobile sidebar and responsive tables.
- Export records and reset demo; confirm restored synthetic data.
- Production tests must additionally cover auth/session isolation, RLS cross-user denial, signed storage URLs, job failures/retries, rate limits and reward idempotency.
