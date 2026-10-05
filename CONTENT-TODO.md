# CONTENT-TODO — what the business still needs to supply

This file is the owner's checklist. Nothing on the list below has been invented on the site:
every item is either **absent** (the UI hides it) or **explicitly marked as pending** (the UI says so
in plain words). Fill an item in and it appears immediately — no layout changes needed.

The biggest remaining gaps are the photographs (section 3) and the product and service specifics
(section 4). Everything else is polish.

> **Supplied by the owner and now live on the site:** business name, owner name, year started,
> phone and WhatsApp number (+91 94233 97938), email, full address with PIN 423702, Google Plus Code,
> Google Maps place link and embed, exact coordinates, and operating hours (Mon–Sat 9:00 am–6:00 pm,
> Sun 9:00 am–3:00 pm). These are hard-coded in `src/content/site.ts` — **not** environment
> variables — so the site shows them the moment it is deployed. To change one, edit that file and
> redeploy.

---

## 1. Contact details — done

Phone, WhatsApp, hours and the postal address are published site-wide and appear in structured data.
Nothing is left to configure.

---

## 2. Exact location — done

The full address, PIN, Plus Code, the business's own Google Maps link, the exact coordinates
(`19.990856, 75.128479`) and a dropped-pin map embed are all published. Structured data carries
`streetAddress`, `addressLocality` (Gangapur), `addressRegion`, `postalCode`,
`openingHoursSpecification`, `geo` (`GeoCoordinates`) and `hasMap`.

> **The taluka was changed from Kannad to Gangapur.** The owner supplied "Taluka Kannad", but the PIN
> they also supplied — 423702 — does not cover Kannad. India Post lists all fifteen post offices under
> 423702 in **block Gangapur**, including *Pimpalgaon Diwashi*, the one serving this village; the
> coordinates also reverse-geocode to `Diwashi, Gangapur`. Two independent sources agree, so the site
> publishes Gangapur. **If Kannad is right** — for instance because the revenue record says so, or
> because "Kannad" is the assembly constituency — change `locality` in `src/content/site.ts` back and
> everything follows from it.


---

## 3. Photographs

`src/content/media.ts` lists 18 photograph slots. Each one describes what the picture should show.
Until a real photograph exists, the slot renders a labelled "photograph to be added" panel — the site
never substitutes stock imagery or a picture of somebody else's plant.

**To publish one:**

1. Save the file in `public/images/` (long edge ≈ 2000 px, compressed — Next.js converts to AVIF/WebP).
2. In `src/content/media.ts`, set that slot's `src` to `/images/<file-name>.jpg`.
3. Check the `alt` text still describes what the photograph actually shows.

Priority order: `hero-facility`, `facility-exterior`, `machinery-overview`, `product-corn-grit`,
`operations-loading`, `farmer-delivery`. Those six change how the homepage reads.

---

## 4. Product and service specifics

The Services and Products pages deliberately state that capacity, accepted volumes, moisture
requirements and pack sizes are **not published yet**. To publish them:

| What | Where |
| --- | --- |
| Service specifications (capacity, accepted volumes, moisture, packaging) | `src/content/services.ts` → each service's `specs` array. Add `{ label: { en, mr }, value: { en, mr } }`. The "being confirmed" panel disappears automatically once the array is non-empty. |
| Product grades | `src/content/products.ts` → `corn-grit` → `specs` |
| Pack sizes | `src/content/products.ts` → each product's `packaging` — currently `{ en: [], mr: [] }` |
| Spice varieties | `src/content/products.ts` → `spice-powders` — the full list is still to be confirmed |

**Please do not add** nutritional values, purity percentages, certifications or quality grades unless
they have been established by an actual test or certificate. If a figure cannot be stood behind, it
should stay off the site.

---

## 5. Testimonials

There are **no** testimonials on the site. No review, name or quote was invented.

If real customers are willing, collect their words with permission to publish, then add them to the
homepage. Until then the homepage makes its case with facts about how the business works, which is
weaker than a real customer's sentence — but honest.

---

## 6. Social profiles (optional)

`src/content/site.ts` → `social` is an empty array. Add `{ label, url }` entries and they appear in the
footer and in the Organization structured data (`sameAs`). Leave empty if the business has none.

---

## 7. Legal pages need the owner's review

`/privacy` and `/terms` describe what the site actually does — what the form collects, where it goes,
that no cookies or analytics run by default, and that job terms are agreed per lot. They also state
that the full processing terms (delivery, weighing, grade settlement, responsibility for material on
the premises) are still being finalised.

**These two pages should be read by the owner — and ideally by a lawyer — before launch.** They are
written to be accurate and unreasonably narrow rather than to sound impressive, but they are not
legal advice.

---

## 8. Before launch

- [ ] `RESEND_API_KEY` set and `INQUIRY_FROM_EMAIL` on a domain verified with Resend — then send one
      real test enquiry.
- [ ] `NEXT_PUBLIC_SITE_URL` set to the live domain.
- [ ] Optional: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` + `RECAPTCHA_SECRET_KEY`, and
      `NEXT_PUBLIC_GA_ID` for analytics.
- [ ] Photographs added (section 3).
- [ ] Privacy and Terms read and approved (section 7).
- [ ] Confirm the SEO locality: the site is optimised for **Gangapur, Chhatrapati Sambhajinagar**
      (where the unit is, per PIN 423702). This replaced "Kannad" — see section 2. If most customers
      come from Dhule district across the highway, say so and the copy and structured data can name
      both.
