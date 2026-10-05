# Om Agrosphere — website

The V1 website for Om Agrosphere, an agricultural processing business on the Dhule–Solapur Highway at
Diwashi, Gangapur taluka, Chhatrapati Sambhajinagar district, Maharashtra. Grain cleaning, sorting,
grading, dal milling and spice grinding; corn grit for animal feed; spice powders.

Next.js (App Router) · TypeScript · Tailwind CSS. No database, no CMS, no UI framework.

---

## Running it

```bash
npm install
cp .env.example .env.local   # then fill in what you have (see below)
npm run dev                  # http://localhost:3000 → redirects to /en
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (all pages prerender statically) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` — strict mode, no `any` |

The site builds and runs correctly with **no** environment variables set. Everything that depends on
an unconfirmed business fact is hidden or explicitly marked pending rather than broken.

`CONTENT-TODO.md` is the owner's list of what still needs supplying.

---

## Configuration

All business facts live in **`src/content/site.ts`** — nothing is scattered through components. The
confirmed facts (name, owner, phone, WhatsApp, hours, address, coordinates, maps link and embed) are
written there directly, so the site is correct the moment it is deployed with no configuration. Only
genuinely deployment-specific or secret values come from environment variables — site origin, Resend
keys, reCAPTCHA, analytics. See `.env.example` for the list with comments.

Two things worth knowing:

- `NEXT_PUBLIC_*` values are read as **static member expressions** (`process.env.NEXT_PUBLIC_X`), never
  `process.env[key]`. Next.js only inlines the literal form at build time; the dynamic form silently
  evaluates to `undefined` in the browser bundle.
- Secrets used for email delivery and reCAPTCHA are server-side only. `src/lib/email.ts` imports
  `server-only`, so it cannot be pulled into a client bundle by accident.

---

## Content is data, not markup

Everything a non-developer would want to change sits in `src/content/`, in both languages:

| File | Holds |
| --- | --- |
| `site.ts` | Name, tagline, email, phone, WhatsApp, hours, location, social, analytics |
| `services.ts` | The five services and the seven supported crops |
| `products.ts` | Corn grit and spice powders; also the enquiry form's interest list |
| `faqs.ts` | FAQ entries and the homepage trust points |
| `media.ts` | The photograph registry (18 slots) and the gallery grouping |
| `ui.ts` | Reusable interface wording — buttons, labels, form states |
| `nav.ts` | Header and footer navigation |

Pages read from these files; they do not hard-code business facts.

### Publishing a photograph

1. Put the file in `public/images/` (long edge ≈ 2000 px, compressed).
2. In `src/content/media.ts`, set that slot's `src` to `/images/<file>.jpg`.
3. Confirm the `alt` text still describes what the photograph shows.

While `src` is `null`, `<Photo>` renders a labelled "photograph to be added" panel. It never falls back
to stock imagery — see below.

---

## Two things this codebase does deliberately

**It never invents a business fact.** No phone number, capacity, moisture level, certification, pack
size, testimonial or statistic appears anywhere unless it was supplied. Where a fact is missing, the UI
hides the element or says in plain words that the detail is being confirmed (`<Photo>`, the service
specifications block, the product grades panel). This is why the site looks slightly bare in places:
that bareness is the feature. `CONTENT-TODO.md` lists each gap. The confirmed facts — phone, WhatsApp,
hours, address, coordinates, map link — are published in full and appear in schema.org structured data.

**It is bilingual by route, not by state.** `/[lang]` is the root layout, so `<html lang>` is correct
per language, both trees prerender statically, and switching language is a real link that can be shared
and indexed. `/` redirects to `/en`; `src/app/not-found.tsx` handles URLs with no language prefix.

---

## Structure

```
src/
├── app/
│   ├── [lang]/            # root layout + every page, en and mr
│   │   ├── layout.tsx     # <html>, fonts, header, footer, mobile action bar
│   │   ├── page.tsx       # home
│   │   ├── services/[slug]/
│   │   └── …              # about, products, quote, contact, gallery, faq, privacy, terms
│   ├── api/inquiry/       # route handler — validates, rate-limits, emails
│   ├── not-found.tsx      # 404 for paths with no language prefix
│   ├── robots.ts, sitemap.ts, icon.svg
├── components/            # presentational; no business facts
├── content/               # all copy and business data (above)
└── lib/                   # i18n, validation, SEO, email, rate limiting, reCAPTCHA
```

## The enquiry flow

`src/components/InquiryForm.tsx` (client) → `POST /api/inquiry` → `src/lib/email.ts`.

The API route runs its guards in a deliberate order: rate limit → parse → honeypot → Zod validate →
fill-time check → reCAPTCHA (optional, fails open) → send. The honeypot is checked on the **raw body,
before validation**, so a bot that trips it gets the ordinary success response instead of a field error
naming the hidden field. Client-side validation exists for speed; the server validates again and is the
authority. Validation rules live in `src/lib/validation.ts` and are shared by both sides, so they
cannot drift.

The notification email and the pre-filled WhatsApp message are built by the same function
(`src/lib/inquiry-message.ts`), so both channels always say the same thing. The on-screen copy of the
summary masks the mobile number.

Failures never show a stack trace. If email delivery fails, the response tells the form to offer
WhatsApp, email and a retry — a lead is not lost because a third party was down.

---

## Deployment

Any Node host that supports Next.js (Vercel, or `npm run build && npm run start` anywhere). Set the same
environment variables in the host's dashboard. The inquiry route needs the Node.js runtime, which is
declared in the route file.

Before going live: `CONTENT-TODO.md` §8.

---

## Not built, on purpose

Phase 2 — farmer login, batch tracking, e-commerce, payments, mandi price APIs, CRM, admin dashboard — is
out of scope for V1. The content and configuration layers are structured so those can be added without
reshaping what is here, but nothing for them exists yet.
