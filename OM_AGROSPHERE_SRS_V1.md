# Software Requirements Specification (SRS)
## Om Agrosphere Web Application — Version 1.0

**Document Version:** 1.0  
**Date:** October 5, 2026  
**Status:** V1 — Implementation Baseline  
**Project:** Om Agrosphere Corporate & Customer Inquiry Website

---

## 1. Purpose

Om Agrosphere is an agricultural processing business. This website will establish a trustworthy digital presence for the business, clearly communicate its services and products, help farmers, traders, wholesale buyers, and retail customers understand what Om Agrosphere offers, and convert visitors into direct business inquiries through phone, WhatsApp, email, directions, and quotation requests.

The website should feel like a **real, established local agricultural business** rather than a generic corporate, template-based, or AI-generated website. Authentic photographs, real business information, local agricultural context, Marathi language support, and transparent communication are central to the experience.

This SRS defines the V1 scope and acts as the primary product/implementation reference for design and development.

---

## 2. Goals

### 2.1 Primary Goals

1. Build trust with farmers and agricultural buyers.
2. Present Om Agrosphere's real facility, machinery, services, and products using authentic content and photography.
3. Make it extremely easy for a visitor to call, WhatsApp, get directions, or request a quotation.
4. Provide English and Marathi language support.
5. Build the site with strong technical and local SEO foundations from day one.
6. Provide good mobile performance and accessibility for users on mobile networks and lower-end devices.
7. Protect customer information submitted through forms.
8. Build a maintainable foundation for future features without over-engineering V1.

### 2.2 Secondary Goals

1. Establish a professional brand identity for Om Agrosphere.
2. Create a reusable platform that can later support e-commerce, farmer accounts, batch tracking, and an admin/CRM system.
3. Make future content updates straightforward.

---

## 3. Target Users

### 3.1 Farmers / Agricultural Producers

Users looking for crop cleaning, sorting, grading, milling, or related processing services.

Potential crops include:
- Wheat
- Jowar
- Bajra
- Tur
- Chana
- Moong
- Urad

### 3.2 Wholesale Buyers / Traders

Users looking for bulk processing services or agricultural products.

### 3.3 Retail Customers

Users interested in packaged products such as spice powders and animal feed products.

### 3.4 Business / Commercial Buyers

Organizations or buyers interested in bulk quantities, recurring supply, or processing arrangements.

### 3.5 Site Administrator / Business Owner

The business owner or team members who receive inquiries, answer customer questions, and provide updated business information.

---

## 4. Brand Identity

### 4.1 Business Name

**Om Agrosphere**

### 4.2 Taglines

**English:** Processing Agriculture, Progressing All  
**Marathi:** प्रक्रिया शेतीची, प्रगती सर्वांची

### 4.3 Official Email

`omagrosphere@gmail.com`

### 4.4 Location

Near Pardeshwar Bharat Petroleum, Dhule-Solapur Highway, Maharashtra, India.

**Note:** Exact postal address, map coordinates, phone number(s), and operating hours must be supplied by the business before launch. Do not invent or approximate them.

---

## 5. Product Scope — V1

### 5.1 Included

V1 will be a responsive, bilingual business website with:

- Home page
- About page
- Services page
- Products page
- Get Quote / Processing Inquiry page
- Contact & Location page
- Site-wide navigation and footer
- Marathi/English language switching
- WhatsApp contact CTA
- Phone CTA
- Google Maps/location integration
- Inquiry/contact forms
- Email notification workflow
- Authentic business photo gallery
- FAQ section
- Trust/credibility sections
- SEO implementation
- Privacy and security foundations
- Analytics/Search Console readiness

### 5.2 Excluded from V1

The following are intentionally deferred to Phase 2 or later:

- Farmer account/login portal
- Customer account/login portal
- Online payment gateway
- Full e-commerce checkout
- Cart/order management
- Crop batch tracking portal
- Customer dashboards
- Mandi-rate API/integration
- Full CRM
- Complex admin dashboard
- Advanced inventory management
- Online billing/invoicing
- Automated order fulfillment

V1 should not be over-engineered to support these features prematurely.

---

## 6. Information Architecture

```text
Om Agrosphere Website
│
├── Home
├── About Us
├── Services
├── Products
├── Get a Quote
├── Contact Us
├── Privacy Policy
├── Terms & Conditions
└── 404 / Error Page
```

### Global elements

- Brand/logo
- English ↔ Marathi language switcher
- Primary navigation
- Call CTA
- WhatsApp CTA
- Responsive mobile navigation
- Footer
- Social/contact links where applicable

---

## 7. Page Requirements

# 7.1 Home Page

### Purpose

Create immediate trust, explain the business in simple terms, and drive visitors toward contact/inquiry actions.

### Required sections

1. **Hero Section**
   - Authentic facility/agricultural image or high-quality business photography.
   - Om Agrosphere name.
   - Primary tagline.
   - One-sentence explanation of the business.
   - Primary CTA: Get a Quote.
   - Secondary CTAs: WhatsApp / Call.

2. **Business Introduction**
   - Short human-written introduction.
   - Explain the business in practical language.

3. **Core Services**
   - Grain Cleaning
   - Grain Sorting
   - Grain Grading
   - Dal Milling
   - Each with short explanation and relevant photo/visual.

4. **Supported Crops**
   - Wheat
   - Jowar
   - Bajra
   - Tur
   - Chana
   - Moong
   - Urad
   - Only display crops confirmed by the business.

5. **Featured Products**
   - Corn Grit / मक्याचा भरडा
   - Spice Powders
   - Product cards with inquiry CTA.

6. **Why Om Agrosphere / Trust Section**
   - Clear, factual trust points.
   - No fabricated awards, certifications, years of experience, capacities, or testimonials.

7. **Real Facility / Photo Story**
   - Authentic photos of machinery, processing, facility, products, loading/unloading, and operations where available.

8. **Human / Farmer Connection Section**
   - Explain the business's connection to farmers and agricultural value addition.
   - Content must be based on the owner's real story and values.

9. **Testimonials**
   - Only genuine customer testimonials with permission.
   - V1 may display this section as a placeholder until real testimonials are collected.

10. **FAQ Preview**
    - A few common customer questions with link to full FAQ section.

11. **Location CTA**
    - Highway/location context.
    - Get Directions CTA.

12. **Final Conversion Section**
    - Get a Quote
    - WhatsApp
    - Call

---

# 7.2 About Us Page

### Required sections

- Company overview
- Business story
- Vision
- Mission
- Agricultural/farmer focus
- Processing philosophy
- Infrastructure/machinery overview
- Authentic facility photos
- Location advantage
- Owner/team introduction where the business chooses to provide it

### Content rule

The story must be factual and human. Do not fabricate history, founder claims, family legacy, certifications, or customer numbers.

---

# 7.3 Services Page

Each service must have its own clearly structured section or detail block.

### Services

#### A. Grain Cleaning

Explain, in simple terms, what the cleaning process removes and what a customer should expect.

#### B. Grain Sorting

Explain size/quality separation and supported crops where confirmed.

#### C. Grain Grading

Explain the purpose of grading and how it helps prepare agricultural material for the next stage or sale.

#### D. Dal Milling

Explain the broad processing workflow for pulses such as Tur, Chana, Moong, and Urad, subject to business confirmation.

### Service information fields

Where available, show:

- Supported crop(s)
- Processing type
- Accepted quantity/volume
- Indicative capacity
- Packaging options
- Moisture requirements
- Special handling information
- Expected customer preparation

Unknown fields must be marked as **To be provided** or omitted until verified.

---

# 7.4 Products Page

## Product Category 1 — Animal Feed

### Product: Corn Grit / मक्याचा भरडा

Potential information fields:

- Product name in English and Marathi
- Intended use: animal feed
- Grain size options, if actually offered
- Packaging sizes, if actually offered
- Bulk availability
- Product photos
- Inquiry CTA

Do not publish nutritional values or specifications unless verified by the business.

## Product Category 2 — Spice Powders

Potential information fields:

- Spice/product name
- Pure/blended status where applicable
- Packaging options
- Retail availability
- Wholesale availability
- Hygiene/processing details that are factually true
- Product photos
- Inquiry CTA

## Product CTA

Primary CTA examples:

- Inquire for Bulk Rates
- Ask About Availability
- Request Product Quote
- WhatsApp Us

---

# 7.5 Get a Quote / Processing Inquiry Page

### Required form fields

1. Customer Name — required
2. Mobile Number — required
3. User Type — required
   - Farmer
   - Trader
   - Wholesale Buyer
   - Retail Buyer
   - Commercial Buyer
4. Crop / Product Interest — required
   - Wheat
   - Jowar
   - Bajra
   - Tur
   - Chana
   - Moong
   - Urad
   - Corn Grit
   - Spices
5. Quantity / Volume — required where relevant
6. Unit
   - Kg
   - Quintal
   - Ton
7. Preferred Service / Delivery Date — optional or required depending on the request type
8. Message / Notes — optional
9. Privacy acknowledgement — required before submission if personal data is collected

### Validation

- Required field validation
- Indian mobile number format validation
- Numeric validation for quantity
- Safe length limits for text fields
- Server-side validation in addition to client-side validation
- Protection against malformed/malicious input

### Submission behavior

On successful submission:

1. Show a clear success message.
2. Notify the business via configured email.
3. Where technically appropriate, generate a pre-filled WhatsApp message containing the submitted inquiry details.
4. Avoid exposing private credentials or API keys in the browser.

The WhatsApp action should be a controlled click-to-chat workflow unless a verified WhatsApp Business/API service is later introduced.

### Failure behavior

If email/API processing fails:

- Tell the user that the submission could not be completed.
- Provide direct Call/WhatsApp alternatives.
- Do not expose technical error details.

---

# 7.6 Contact & Location Page

### Required information

- Official email
- Verified phone number(s)
- Operating hours
- Address
- Nearby landmark
- Highway/location description
- Google Maps/map embed or equivalent
- Get Directions CTA
- WhatsApp CTA
- Call CTA
- Quick inquiry form

### Location rule

The exact map pin/location must be verified by the business before production launch.

---

# 7.7 FAQ

Create a dedicated FAQ section/page for real customer questions, such as:

- Which crops do you process?
- What services are available?
- What quantity can I bring?
- How can I request a processing quotation?
- Do you accept bulk orders?
- Do you sell corn grit?
- Which spice products are available?
- How do I reach the facility?
- What are the operating hours?

Questions and answers must reflect actual business practices.

---

# 7.8 Gallery

Use authentic photographs supplied by Om Agrosphere.

Suggested categories:

- Facility
- Machinery
- Processing
- Products
- Agricultural Loads
- Team / Operations

### Image requirements

- Use real photographs wherever possible.
- Avoid generic stock imagery for core business claims.
- Compress and optimize images.
- Use descriptive alt text.
- Use responsive image sizes.
- Use modern formats such as WebP/AVIF where supported.
- Lazy-load non-critical images.

---

## 8. Global Navigation & UI Requirements

### 8.1 Header

- Om Agrosphere logo/wordmark
- English / मराठी toggle
- Home
- About
- Services
- Products
- Get Quote
- Contact
- Mobile menu

### 8.2 Persistent actions

On mobile, high-priority actions should be easy to reach:

- Call
- WhatsApp
- Get Directions
- Get Quote

### 8.3 Footer

Must include:

- Business name
- Short description
- Navigation links
- Services links
- Contact information
- Location
- WhatsApp/contact CTA
- Privacy Policy
- Terms & Conditions
- Copyright

---

## 9. Bilingual Requirements

### Languages

- English
- Marathi

### Requirements

- User can switch language easily.
- All important navigation and conversion content must be translated.
- Do not translate only the menu while leaving the core page content in one language.
- Marathi typography must remain readable on mobile.
- Language preference should be preserved during navigation where practical.
- SEO metadata should be language-appropriate for translated pages.
- URLs and metadata strategy should support clear indexing of language variants.

The Marathi copy must be reviewed by a fluent human before production.

---

## 10. Design & Brand Experience

### 10.1 Design direction

The visual identity should communicate:

**Trustworthy + Agricultural + Human + Modern + Local**

### 10.2 Design principles

1. Authentic photography over stock imagery.
2. Clean, premium layout without looking like a software/SaaS website.
3. Subtle agricultural references such as grain, crop, soil, machinery, and field imagery.
4. Strong readability and practical usability.
5. Avoid excessive decorative greenery or generic “farm website” clichés.
6. Use real business details wherever possible.
7. Use whitespace and clear hierarchy.
8. Prioritize mobile usability.
9. Make trust signals visible but factual.
10. CTAs should be action-oriented and business-relevant.

### 10.3 Tone of content

- Clear
- Honest
- Human
- Respectful
- Practical
- Confident without exaggerated marketing claims

Avoid:

- Fake testimonials
- Fake statistics
- Unsupported superlatives
- Fabricated certifications
- Generic AI-sounding marketing language
- Unverified technical specifications

---

## 11. SEO Requirements

SEO is a first-class V1 requirement, not a post-launch task.

### 11.1 Technical SEO

Implement:

- Semantic HTML
- One clear H1 per primary page where appropriate
- Logical H2/H3 hierarchy
- Unique page titles
- Unique meta descriptions
- Canonical URLs
- Clean, human-readable URLs
- XML sitemap
- robots.txt
- Proper status codes
- Custom 404 page
- Internal linking
- Descriptive image alt text
- Open Graph metadata
- Social sharing metadata
- Mobile-friendly rendering
- Fast loading
- Optimized font loading
- Image optimization
- Avoid unnecessary JavaScript

### 11.2 Local SEO

Build pages/content around real service and location intent, potentially including:

- Dal mill / dal milling services near Dhule
- Grain cleaning near Dhule
- Grain sorting and grading Maharashtra
- Tur/Chana processing services
- Corn grit / animal feed supplier
- Spice powder supplier

Keyword usage must remain natural and user-focused.

### 11.3 Structured data

Use appropriate Schema.org structured data where applicable, such as:

- LocalBusiness / appropriate business subtype
- Organization
- Product
- BreadcrumbList
- FAQPage only where the page genuinely qualifies and the content is visible to users

All structured data must match visible, verified business information.

### 11.4 Search tools

Prepare the site for:

- Google Search Console
- Google Business Profile
- Google Analytics 4 or another chosen analytics solution

### 11.5 SEO content quality

Do not create large volumes of repetitive keyword pages. Pages should answer genuine customer questions and clearly describe real services/products.

---

## 12. Performance Requirements

### 12.1 Goals

- Fast initial load on 4G mobile networks.
- Minimize JavaScript and unnecessary third-party scripts.
- Optimize above-the-fold content.
- Use responsive images.
- Lazy-load below-the-fold images.
- Cache static assets where appropriate.
- Compress text and media.

### 12.2 Practical target

Aim for excellent real-world mobile performance and strong Core Web Vitals rather than optimizing only for an artificial benchmark.

### 12.3 Image rules

- Prefer WebP/AVIF where appropriate.
- Provide correctly sized responsive images.
- Avoid uploading multi-megabyte original photos directly to production.
- Preserve useful visual quality.

---

## 13. Security Requirements

### 13.1 Transport security

- Production site must use HTTPS.
- No sensitive form data should be sent over insecure HTTP.

### 13.2 Form/API security

- Validate input on the server.
- Sanitize/encode output as needed.
- Rate-limit public form endpoints where applicable.
- Add anti-spam protection.
- Prevent abuse of email/webhook endpoints.
- Avoid logging unnecessary personal information.

### 13.3 Secrets

- API keys, SMTP credentials, webhook secrets, and other credentials must be stored as server-side environment variables/secrets.
- Never commit secrets to Git.
- Never expose private credentials in client-side JavaScript.

### 13.4 Security headers

Use appropriate production security headers, including a considered Content Security Policy where practical, plus protections such as clickjacking, MIME-sniffing, and referrer-related controls as appropriate for the hosting setup.

### 13.5 Dependencies

- Keep dependencies minimal.
- Use maintained packages.
- Update dependencies regularly.
- Avoid unnecessary plugins/packages.

### 13.6 Error handling

- Users must receive friendly error messages.
- Production errors must not expose stack traces, credentials, database details, or internal implementation information.

---

## 14. Privacy Requirements

Because quote/contact forms may collect personal information, V1 must include:

### Required pages

- Privacy Policy
- Terms & Conditions

### Privacy principles

- Collect only information needed to handle an inquiry.
- State why data is collected.
- Do not sell or unnecessarily share customer data.
- Protect stored/transmitted inquiry information.
- Define an appropriate retention approach if inquiries are stored.
- Identify relevant third-party services used by the website where applicable.

### Consent

Where required by the chosen analytics/cookie implementation, provide an appropriate notice/consent mechanism.

Legal/privacy wording should be reviewed for the business's actual practices before launch.

---

## 15. Accessibility Requirements

Target practical WCAG-aligned accessibility.

Requirements include:

- Readable typography
- Strong color contrast
- Keyboard-accessible navigation
- Visible focus states
- Proper form labels
- Useful error messages
- Large touch targets
- Alt text for meaningful images
- Decorative images appropriately marked
- No information conveyed by color alone
- Reduced-motion consideration
- Marathi text readability

---

## 16. Analytics & Conversion Tracking

Where analytics is enabled, track useful business actions, such as:

- WhatsApp button clicks
- Phone/call clicks
- Get Directions clicks
- Quote form submissions
- Contact form submissions
- Product inquiry clicks

Avoid collecting unnecessary personal information in analytics tools.

The implementation should make it possible to evaluate whether the website is generating actual business inquiries, not just page views.

---

## 17. Forms & Lead Handling

### V1 lead channels

- Email
- WhatsApp
- Phone

### Minimum lead information

- Name
- Mobile number
- User type
- Crop/product
- Quantity where applicable
- Requested service/date where applicable
- Message

### Lead storage

V1 does not require a full CRM/database.

If inquiry persistence is needed, use the simplest secure solution that meets the business need. Do not introduce a database solely for architectural complexity.

Future CRM/lead management can be added in Phase 2.

---

## 18. Recommended Technology Direction

The implementation should favor a modern, maintainable, performance-oriented web stack.

### Preferred V1 stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI:** Custom components with minimal dependencies
- **Forms:** Secure server-side handling through Next.js server routes/actions or an equivalent backend endpoint
- **Email:** Configured transactional/email service selected during implementation
- **Maps:** Google Maps embed/link or appropriate Maps integration
- **Analytics:** Google Analytics 4 or selected privacy-conscious alternative
- **Search monitoring:** Google Search Console
- **Hosting:** Vercel/Netlify/other suitable production hosting
- **Domain:** `omagrosphere.com` when available/configured

### Architecture principle

Prefer a simple monolithic/web application architecture for V1.

Do not introduce:

- Microservices
- Kubernetes
- Message queues
- Multiple databases
- Complex authentication
- Event-driven infrastructure

unless a real requirement appears later.

---

## 19. Content Requirements Before Launch

The development team must collect and verify the following from the business owner:

### Required factual business information

- Final logo
- Final brand name spelling
- Owner/business introduction
- Phone number(s)
- WhatsApp number
- Email confirmation
- Exact business address
- Exact Google Maps location/pin
- Operating hours
- Services actually offered
- Supported crops
- Processing capacity, if the business wants to publish it
- Moisture/quality requirements, if the business wants to publish them
- Packaging sizes
- Actual products
- Actual spice varieties
- Product photos
- Facility/machinery photos
- Team/owner photos where appropriate
- Genuine testimonials, if available
- Social media profiles, if applicable

### Content rule

Anything not confirmed by the business must not be presented as fact.

---

## 20. Recommended Photo Strategy

Authentic imagery is a major trust component of V1.

Priority order:

1. Actual facility exterior/interior
2. Actual processing machinery
3. Actual crop/grain processing
4. Actual product packaging
5. Actual loading/unloading operations
6. Actual workers/team, with consent
7. Owner/founder/business photos, where appropriate
8. Agricultural/farmer imagery from the business's own collection
9. Stock imagery only when there is no suitable authentic image

Images should feel documentary and real rather than overly staged.

---

## 21. Functional Requirements Summary

### Navigation

- **FR-NAV-01:** Show Om Agrosphere branding.
- **FR-NAV-02:** Provide responsive navigation to all V1 pages.
- **FR-NAV-03:** Provide English/Marathi language switching.
- **FR-NAV-04:** Provide visible Call and WhatsApp actions.
- **FR-NAV-05:** Provide footer navigation and legal links.

### Home

- **FR-HM-01:** Display hero section and primary CTA.
- **FR-HM-02:** Explain the business in plain language.
- **FR-HM-03:** Showcase core services.
- **FR-HM-04:** Showcase supported crops.
- **FR-HM-05:** Showcase featured products.
- **FR-HM-06:** Display trust/credibility content.
- **FR-HM-07:** Display authentic business photography.
- **FR-HM-08:** Display real testimonials when available.
- **FR-HM-09:** Display FAQ preview.
- **FR-HM-10:** Provide contact/location conversion CTA.

### About

- **FR-AB-01:** Display company overview.
- **FR-AB-02:** Display verified story/vision/mission.
- **FR-AB-03:** Showcase infrastructure.
- **FR-AB-04:** Explain agricultural/farmer focus.

### Services

- **FR-SRV-01:** Explain grain cleaning.
- **FR-SRV-02:** Explain grain sorting.
- **FR-SRV-03:** Explain grain grading.
- **FR-SRV-04:** Explain dal milling.
- **FR-SRV-05:** Display only verified service specifications.

### Products

- **FR-PRD-01:** Showcase Corn Grit / मक्याचा भरडा.
- **FR-PRD-02:** Showcase spice powders.
- **FR-PRD-03:** Display verified packaging/options.
- **FR-PRD-04:** Provide product inquiry CTA.

### Quote / Inquiry

- **FR-QT-01:** Provide quote/inquiry form.
- **FR-QT-02:** Validate required input.
- **FR-QT-03:** Apply server-side validation.
- **FR-QT-04:** Send business notification.
- **FR-QT-05:** Provide WhatsApp follow-up option.
- **FR-QT-06:** Show success/failure states.
- **FR-QT-07:** Apply anti-spam protection.

### Contact

- **FR-CU-01:** Show verified contact information.
- **FR-CU-02:** Show verified location/map.
- **FR-CU-03:** Provide directions CTA.
- **FR-CU-04:** Provide quick inquiry form.

### Gallery / FAQ

- **FR-GAL-01:** Display authentic business photos.
- **FR-FAQ-01:** Display genuine customer FAQs.

---

## 22. Non-Functional Requirements Summary

### Performance

- **NFR-PER-01:** Mobile-first responsive performance.
- **NFR-PER-02:** Optimized images and assets.
- **NFR-PER-03:** Minimize blocking scripts and unnecessary third-party tools.
- **NFR-PER-04:** Target strong Core Web Vitals.

### Responsive Design

- **NFR-UI-01:** Support current mobile, tablet, and desktop screen sizes.
- **NFR-UI-02:** Make core actions easily reachable on mobile.
- **NFR-UI-03:** Ensure readable Marathi and English typography.

### Accessibility

- **NFR-A11Y-01:** Use accessible navigation and forms.
- **NFR-A11Y-02:** Maintain sufficient contrast.
- **NFR-A11Y-03:** Support keyboard navigation.
- **NFR-A11Y-04:** Use meaningful semantic structure and image alt text.

### SEO

- **NFR-SEO-01:** Implement technical SEO foundation.
- **NFR-SEO-02:** Implement local SEO structure.
- **NFR-SEO-03:** Implement appropriate structured data.
- **NFR-SEO-04:** Provide sitemap and robots.txt.
- **NFR-SEO-05:** Support Search Console and Business Profile readiness.

### Security

- **NFR-SEC-01:** HTTPS in production.
- **NFR-SEC-02:** Server-side input validation.
- **NFR-SEC-03:** Anti-spam and abuse controls.
- **NFR-SEC-04:** Secure secret management.
- **NFR-SEC-05:** Appropriate security headers.
- **NFR-SEC-06:** Safe production error handling.
- **NFR-SEC-07:** Dependency hygiene.

### Privacy

- **NFR-PRI-01:** Minimize personal data collection.
- **NFR-PRI-02:** Publish Privacy Policy and Terms & Conditions.
- **NFR-PRI-03:** Clearly communicate applicable third-party data use.
- **NFR-PRI-04:** Implement analytics/cookie consent where required by the chosen setup.

### Reliability

- **NFR-REL-01:** Graceful handling of form/email failures.
- **NFR-REL-02:** No single UI action should expose internal errors.
- **NFR-REL-03:** Production deployment should support backups/recovery for any stored inquiry data.

---

## 23. Acceptance Criteria for V1

V1 is considered ready when:

1. All agreed pages are available and responsive.
2. English and Marathi content can be switched correctly.
3. Authentic business images are used throughout major visual sections.
4. Services and products shown on the site match verified business information.
5. Call, WhatsApp, and directions actions work correctly on mobile and desktop.
6. Quote/contact forms validate inputs correctly.
7. Successful inquiries reach the configured business notification channel.
8. Form failures provide useful fallback contact methods.
9. HTTPS is enabled in production.
10. Secrets are not present in source code or client bundles.
11. Basic anti-spam protection is active.
12. Privacy Policy and Terms & Conditions are accessible.
13. Sitemap and robots.txt are available.
14. Metadata, canonical URLs, and social sharing metadata are implemented.
15. Structured data is valid and matches visible information.
16. Images are optimized and lazy-loaded where appropriate.
17. The site is usable on mobile without horizontal scrolling.
18. Basic accessibility checks pass.
19. Search Console/Analytics integration is ready or configured as chosen.
20. No fabricated claims, testimonials, statistics, certifications, or technical specifications remain on the production site.

---

## 24. Development Principles

1. **Build V1 fast, but do not cut security or trust.**
2. **Use real content instead of filler wherever possible.**
3. **Do not invent missing business facts.**
4. **Mobile experience comes first.**
5. **Optimize for actual customer actions, not vanity features.**
6. **Keep the codebase simple and maintainable.**
7. **Prefer server-side protection for anything security-sensitive.**
8. **Keep third-party dependencies to a minimum.**
9. **Treat SEO, accessibility, privacy, and performance as core implementation requirements.**
10. **Design V1 so Phase 2 can be added without rebuilding the entire site.**

---

## 25. Phase 2 Roadmap

Potential future enhancements:

### Phase 2A — Business Operations

- Admin dashboard
- Lead management
- Inquiry history
- Basic customer management
- Content management

### Phase 2B — Farmer/Customer Portal

- Customer login
- Batch submission
- Processing status
- Notifications
- Order/inquiry history

### Phase 2C — Commerce

- Product catalog expansion
- Shopping cart
- Online ordering
- Payment gateway
- Order tracking

### Phase 2D — Agriculture Data

- Mandi rates
- Crop market information
- Agricultural updates

These features should be introduced only after V1 has demonstrated actual business value and requirements are known.

---

## 26. Open Business Inputs

The following must be confirmed before final content lock:

- Phone number(s)
- WhatsApp number
- Exact address
- Exact map location
- Operating hours
- Final services list
- Final crop list
- Processing capacities/specifications, if published
- Final product list
- Packaging sizes
- Product photos
- Final business story
- Owner/team information
- Real testimonials
- Final logo/brand assets
- Social links
- Preferred email delivery method
- Preferred hosting/domain setup

---

## 27. Final V1 Product Definition

The Om Agrosphere V1 website is a **bilingual, mobile-first, trust-focused agricultural business website** designed to:

**Show the real business → explain real services/products → build trust → help customers find the facility → generate direct inquiries.**

The site should feel authentic, local, human, and professional, with real photography and clear agricultural context. It should have strong SEO, security, privacy, accessibility, and performance foundations while deliberately avoiding unnecessary complexity.

The website is a V1 business platform, not the final digital ecosystem. Future operational, e-commerce, farmer-portal, and data features will be introduced incrementally based on real business needs.

---

**End of SRS — Om Agrosphere Web Application V1.0**
