# Abrajan homepage

An Astro homepage for **Abrajan Tree & Complete Landscaping Service**, inspired by the Gardenx reference supplied by Bryan. Built for client design review, with static output and a separate Cloudflare Worker for the future Resend contact endpoint.

## Run locally

Requires Node.js 22.22 or later.

```sh
npm install
npm run dev
```

Use the Local URL printed by Astro; its current daemon selects an available port. The initial preview was served at `http://127.0.0.1:4328`.

```sh
npm run check
npm test
npm run build
npm run preview
```

The website is generated into `dist/`. Fonts and images are served locally. No React runtime or external font requests are needed. Format edits with `npx prettier --write src workers tests`.

## What's included

- Responsive homepage, supplied logo, full-width hero, real team photo, services, seasonal care, interactive before-and-after comparisons, process, FAQs, and estimate form.
- Mobile navigation with Escape and outside-click dismissal.
- Service links preselect the matching estimate option.
- Accessible before-and-after sliders with service tabs, mouse/touch dragging, keyboard controls, and native FAQ disclosures.
- Reduced-motion support, descriptive image text, keyboard focus styles, and form validation.
- Preview mode clearly explains that form entries are not sent or saved.

## Cloudflare hosting

The tracked `wrangler.jsonc` serves `dist/` through Cloudflare Workers Static Assets and routes `/api/*` through `workers/index.js`. Astro produces plain static HTML; no server adapter is necessary for this architecture.

```sh
npm run preview:cloudflare
```

After approving the homepage and choosing the Cloudflare account/project:

```sh
npm run deploy
```

No public deployment has been performed. The static `dist/` folder can also be hosted on Cloudflare Pages, but the included email Worker is configured for Workers and would need a Pages Function equivalent or a separate Worker route if Pages is chosen.

## Connect Resend when ready

Keep `PUBLIC_CONTACT_FORM_ENABLED=false` during design review. The server endpoint also refuses delivery without all three required bindings.

Configure secrets through Cloudflare's encrypted secret settings or these interactive commands (never place the key in source or a `PUBLIC_` variable):

```sh
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put CONTACT_FROM_EMAIL
npx wrangler secret put CONTACT_TO_EMAIL
```

`CONTACT_FROM_EMAIL` must use a sender/domain verified with Resend. `CONTACT_TO_EMAIL` is the client's chosen recipient. The visitor's email is used only for Reply-To; the recipient is never taken from the form. Messages are sent as plain text.

Then set `PUBLIC_CONTACT_FORM_ENABLED=true` in the build environment, rebuild, and verify a real delivery with authorization. `npm run dev` previews the static page and does not run the Worker; use `npm run preview:cloudflare` for the API. Before enabling public submissions, configure Cloudflare rate limiting or Turnstile for spam protection; the initial handler already checks method, origin, content type, input lengths, allowed services, and a honeypot.

## Content and asset sources

- Visual direction: [Gardenx template preview](https://preview.themeforest.net/item/gardenx-gardening-landscaping-html-template/full_screen_preview/62494630). The implementation is original Astro/CSS; no template source or licensed template assets were copied.
- Services and business claims: [client homepage](https://abrajantreeandcompletelandscape.com/) and [About Us](https://abrajantreeandcompletelandscape.com/about-us/).
- Phone numbers, free estimates, and licensed/insured wording: supplied client logo and current website.
- Service area: Michiana, as stated in the client's About Us copy. No unverified hours, founding year, ratings, certifications, or testimonials were added.
- Logo: user-supplied original preserved at `public/images/abrajan-original-logo.png`; the optimized complete image is `public/images/abrajan-logo.webp`. The header uses a CSS window to show its branding portion without repeating the phone-number block.
- Team: `https://abrajantreeandcompletelandscape.com/wp-content/uploads/2024/05/Diego-Crew_2024-LR.jpg` → `public/images/abrajan-crew.webp`.
- Tree work: `https://abrajantreeandcompletelandscape.com/wp-content/uploads/2023/05/AbrajanLandscape-TreeWork02.png` → `public/images/tree-care.webp`.
- Landscaping: `AbrajanLandscape-05b.jpg`, `AbrajanLandscape-04.jpg`, `AbrajanLandscape-03.jpg`, and `AbrajanLandscape-01.jpg` in the same `/wp-content/uploads/2023/05/` directory → garden-beds, lawn-care, property-care, and yard-work WebP assets.
- Original downloaded photos are retained in `source-assets/`. Optimization only resizes and compresses; the photos' contents were not altered.
- The decorative leaf favicon is a simple original UI asset, not a replacement company logo.

## Temporary generated hero

`public/images/hero-landscape.webp` is a generated photo. It is a temporary illustrative image. Replace it with approved client photography when available. Generated with the built-in ImageGen tool; original retained at `source-assets/hero-generated.png`.

The exact generation prompt is saved in `source-assets/hero-prompt.txt`.

## Before the approved site launches

- Replace the temporary hero if client photos are available and confirm the existing team/project photos are still preferred.
- Confirm both phone numbers, business name, recipient email, and desired service coverage with the client.
- Connect Resend and verify delivery.
- Remove the `noindex, nofollow` meta tag from `src/pages/index.astro` and replace the review-only `Disallow: /` in `public/robots.txt` when this becomes the approved public website.
- Add the remaining pages and any approved privacy information as the scope expands.

## Verification

Astro check, production build, and nine email-handler tests pass. Tests mock Resend and do not send messages. The Worker passes a Wrangler deployment dry run. Browser review covers desktop, phone, and tablet layouts, navigation, service preselection, form preview feedback, FAQ disclosures, and the original photo viewer. The new comparison feature has separate browser verification below. No real email or public deployment has been tested.

Technical references: [Astro + Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/), [Cloudflare asset routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/), [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email).

## Interactive before-and-after comparisons

The “Good work. Right in your backyard.” section presents three full-width, side-by-side comparison cards for tree care, lawn care, and landscaping, following the user's supplied layout reference. Each card has overlaid category/title text, Before/After labels, its own drag handle, an expand button, and a dark instruction strip. Cards stack vertically on screens up to 800px so slider gestures do not compete with horizontal scrolling. The existing green/lime branding is retained.

Each pair uses the same generated property and camera angle; the before state was made by editing its matching after image. These are visibly labeled AI-generated examples, not claims about actual Abrajan jobs. The client's genuine crew and service photos elsewhere on the page are unchanged.

- Gallery component: `src/components/BeforeAfterGallery.astro` (service data, card layout, expanded dialogs, and JavaScript controller).
- Shared comparison component: `src/components/ComparisonStage.astro` (responsive images, clipping, labels, native range input, and handle).
- Web assets: `public/images/comparisons/{tree,lawn,landscape}-{before,after}.webp`, with matching `-768.webp` responsive versions. Images load lazily.
- Original generated images and exact built-in ImageGen prompts: `source-assets/comparisons/` and `source-assets/comparisons/prompts.json`.
- Interaction: drag anywhere across each photo or use the focused slider's arrow/Home/End keys. Sliders work independently and keep their positions when expanded. Native modal dialogs contain keyboard focus, close with Escape or the close button, and return focus to the opener. Clicking the backdrop also closes the viewer. Each expanded view's estimate link closes the dialog and selects the matching service in the existing form.
- Image display uses clipping rather than changing image width, keeping matched photo geometry consistent while dragging. No external slider dependency or framework runtime.

Replace both files for a service with real, aligned before/after photos when supplied, then update that entry's image descriptions and the disclosure text. Keep original project photos separate from generated examples. To change crops, adjust the shared component's responsive aspect ratios and photo object positioning consistently for both images.

Comparison verification: Astro check and production build pass. Browser review confirmed three visible desktop cards, independent dragging, full before/after endpoints with Home/End, synchronized expanded slider values, image loading, Escape dismissal and focus return, and estimate service preselection. Phone cards stack without horizontal overflow, and the expanded slider works at phone width. No backend or Resend behavior was changed.

## Decorative section artwork

`src/components/SectionContours.astro` adds original SVG contour lines to the seasonal and process sections. Pale green lines frame the dark seasonal panel; sage lines and a soft edge tint frame the cream process panel. Artwork sits behind the content, fades toward the center, and is reduced on smaller screens. It is decorative (`aria-hidden`), ignores pointer input, and uses no downloaded images, JavaScript, or animation. Opacity and placement are controlled in the component's scoped CSS.

## Navigation and local trust details

- The hero header stays transparent at the top and becomes a compact fixed header after scrolling. Desktop links and the mobile drawer highlight the current section. Anchor offsets account for the compact header.
- `src/components/MobileNavigation.astro` supplies a floating, rounded mobile drawer with a blurred backdrop, subtle contour artwork, large numbered links, contact details, and a full-width estimate button. The header uses a compact Menu pill with an animated two-line icon. Opening links appear in a short stagger; closing fades the panel out, with reduced-motion preferences respected. The native dialog preserves keyboard focus wrapping, Escape/backdrop dismissal, scroll locking, focus return, and automatic dismissal when resizing to desktop. Navigation links move focus to their target sections. Verified at 320px, 390px, tablet, and desktop widths; shorter screens scroll within the drawer without horizontal overflow.
- The mobile Call now / Free estimate bar appears after the hero, hides when the contact section enters view, and stays hidden behind open dialogs. It accounts for phone safe areas and keyboard scroll padding.
- `src/scripts/navigation.ts` handles scrolling and navigation state with a single scheduled animation frame per update. No framework or navigation dependency was added.
- `src/components/CustomerReviews.astro` presents live five-star written review cards when the Google connection is configured. The overall rating and count remain separately labeled; the review cards are a selected subset, not the complete review history.
- Verified Google Place ID: `ChIJtdYJBB8V5gwR7LrA79dhelc`. Public profile link: https://www.google.com/maps/search/?api=1&query=Abrajan%20Tree%20%26%20Complete%20Landscape%20Service&query_place_id=ChIJtdYJBB8V5gwR7LrA79dhelc
- Places API (New) is enabled for the separate `abrajan-website-reviews` project in bryandevelops.com. Google automatically linked it to Bryan Develops Billing, which also contains Flores. The private key is restricted to Places API (New) and saved only in ignored `.dev.vars` with owner-only permissions. Google GetPlaceRequest quotas are temporarily capped at 20 per day and 10 per minute for preview use.
- `src/components/ServiceArea.astro` uses only the confirmed wording South Bend and the surrounding Michiana area. Michiana is supported by the client's About Us page; South Bend/nearby areas appears in the supplied Google screenshot. The regional graphic is original illustrative SVG, labeled as such, without a street address, exact coverage boundary, or unverified list of towns.

Navigation verification: browser checks passed for transparent/compact header states, current-section highlighting, anchors clearing the header, drawer focus wrapping and Escape/backdrop closing, focus return, drawer close on desktop resize, 320px and 390px phone widths, tablet/desktop layout, and the mobile action bar appearing after the hero and hiding at contact. No horizontal overflow in tested widths. Astro check and production build pass. The real Google review connection is verified in the local preview; the profile link remains available if Google is unavailable or its request quota is reached.


## Google review connection

`workers/google-reviews.js` uses Places API (New) for the fixed configured Place ID, requesting only reviews, provider attribution, overall rating, and total rating count. It retains original text, filters written five-star reviews, and sorts newest first within Google's at-most-five relevance-selected reviews. Fewer than five cards may appear. No review content is cached or stored. The key stays in the Worker runtime.

The browser lazily requests `/api/google-reviews` once per page visit as the section approaches view. Cards include author attribution, dates, direct Google Maps links, an expand control for long reviews, and horizontal scrolling with accessible previous/next buttons. Google's official unmodified attribution logo is served from `public/images/google-maps-attribution.svg`. Its source is the [official attribution asset bundle](https://developers.google.com/static/maps/documentation/images/Google_Maps_Attribution_Assets.zip). Terms and privacy pages describe the reviews feature and current contact-form preview behavior; review these with the client before launch.

Local credentials are already configured in ignored `.dev.vars`. On another machine, copy `.dev.vars.example` to `.dev.vars`, add the private key and verified Place ID securely, and run `npm run dev:api` alongside `npm run dev`. Restart the Worker after adding or changing local credentials. The Astro development proxy forwards only the review route to the local Worker at port 8787. Rebuild before `npm run preview:cloudflare` to check the full production output. Never put the key in a `PUBLIC_` variable. Before deployment, bind `GOOGLE_PLACES_API_KEY` as a Cloudflare secret and `GOOGLE_PLACE_ID` as a runtime variable, and verify the actual hosting account and Worker.

The Worker requires its rate-limit binding and fails closed without it. The binding allows approximately 10 requests per minute **per Cloudflare location**, not globally. It is an abuse control, not a spending cap. Confirm the namespace ID is unique in the chosen Cloudflare account before launch. Google currently enforces 20 GetPlaceRequest calls per day and 10 per minute for this preview project; this is a daily limit, not a monthly budget or a promise that all usage is free. Choose an ongoing usage allowance before publishing. Free usage is shared across projects under the same billing account; budget alerts alone are not spending caps.

Verification on October 21, 2026: Astro check and build pass; 17 handler tests pass (9 existing email tests and 8 review tests). Tests cover filtering/order, original text, unsafe links, provider attribution, missing configuration, fixed upstream, timeout/redirect options, rate limiting, empty data, errors, and Worker routing. Three successful real Google test requests verified five eligible five-star written reviews and an overall 4.6 rating from 22 reviews. Desktop and 390px phone browser checks confirmed avatars, author/source links, chronological ordering, horizontal controls, long-review expansion, and no page overflow. The live Worker test also caught and fixed an unsupported redirect mode: Workers uses `manual`, and the handler rejects redirect responses without following them. Synthetic fixtures remain excluded from the production build. No public deployment or real email was sent.
