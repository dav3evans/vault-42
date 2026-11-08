# Vault 42 — open items

Living list of what's still outstanding from the Phase 1 brief, and what's already been sorted.
Update this alongside the code — when something below gets resolved, move it to "Resolved" with a
one-line note on how.

## Needs an answer from the business

- [ ] **Digital waiver provider** — not chosen yet. `/safety` explicitly says so ("Provider not yet
      selected"). Once there's a provider, wire up the real link/embed and update that page plus the
      Terms and Privacy pages' wording.
- [ ] **Special Events (HEX Corp Sabotage) pricing & dates** — still marked "TBC" on `/events` and on
      the home page pricing card. Needs real ticket price, the food/drink package details, and actual
      dates before it can be presented as bookable rather than "register interest."
- [ ] **Axe Throwing minimum age** — the brief mentions "age limits" but never gives a number. The Axe
      Throwing and Safety pages currently just say "ask when booking" instead of stating one.
- [ ] **Instagram** — placeholder only (dimmed icon, not a live link) in the footer. Add the real
      `href` in `apps/web/lib/site-nav.ts` (`socialLinks`) the moment there's an account. Same place to
      add any other platform (TikTok, X, etc.) if they open one.

## Needs a decision, not just an answer

- [ ] **`/attractions` overview + `/attractions/future`** — both still exist but are unlinked from
      everywhere. Decide whether they get relinked (into the Attractions dropdown) once Laser Tag and
      Escape Rooms go live, get reworked, or just stay as-is indefinitely.

## Needs legal/compliance review before going live

- [ ] **Privacy Policy** (`/privacy`) — written as a standard UK GDPR template. Needs real data
      retention periods, and the named third-party processors section needs updating once a waiver
      provider is chosen. Should get an actual legal read-through before publishing.

---

## Resolved

- [x] Booking & payment — everything routes through Wanna Book (`https://wannabook.online/booking/vault42`);
      no payment happens on vault42.uk itself. Header "Book Now", sticky mobile bar, hero, Axe Throwing
      page, Pricing page and Special Events page all point at it via the shared `bookingHref` constant.
- [x] Axe Throwing is the flagship live attraction everywhere (hero, nav, pricing, attractions); Laser
      Tag and Escape Rooms are reframed "Sector Locked" site-wide, including the News archive and Story
      page bios that used to describe Laser Tag as already running.
- [x] Careers page rebuilt with the brief's three roles and a real application form.
- [x] `/events` (Night Operations & Special Events) built: narrative, inclusions, venue-hire enquiry,
      Wanna Book link for booking.
- [x] `/terms`, `/privacy`, `/safety` created and linked from the footer; `/contact` already met spec.
- [x] Attractions nav is a hover dropdown (Axe Throwing only); `/attractions` overview unlinked but not
      deleted.
- [x] URLs flattened: `/axe-throwing`, `/laser-tag`, `/escape-rooms` instead of nested under
      `/attractions/*`.
- [x] Footer social row added (Facebook live, Instagram placeholder — see open items above).
- [x] Round 2 cohesion pass: retired the standalone `/pricing` page (it was mostly "coming soon" line
      items) — it now redirects to `/axe-throwing#pricing`, where the real price table lives alongside
      the product. Main nav no longer lists "Pricing" separately.
- [x] Home page rebalanced around Axe Throwing: the three "coming soon" sections (Laser Tag detail,
      Escape Rooms detail, and the non-live cards mixed into "book now"/pricing) are now one compact
      "What's coming to the Vault" section. Marquee, StoryTeaser and the final CTA panel trimmed to stop
      leading with what's missing.
- [x] Trimmed repeated "once laser tag unlocks" asides out of Parties (corporate, school/youth,
      special occasions), Membership and Policies pages — those now describe what's bookable today;
      the "coming later" messaging is concentrated on the home page and the dedicated Laser Tag/Escape
      Rooms pages instead of repeated on every page.
