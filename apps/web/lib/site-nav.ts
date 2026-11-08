export const primaryNav = [
  {
    label: "Attractions",
    items: [
      // Laser Tag and Escape Rooms rejoin this list once they're live — the full /attractions
      // overview page stays unlinked for now rather than listing what isn't bookable yet.
      { label: "Axe Throwing", href: "/axe-throwing" },
    ],
  },
  { label: "Parties & Events", href: "/parties" },
  { label: "Special Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

// The Story and Membership are both benched for now — Story needs a genuine rewrite from the
// client's own archives, and Membership ties to Laser Tag, which isn't live yet. Routes and files
// stay in place (unlinked, like /attractions) so they're easy to bring back later.

export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Axe Throwing", href: "/axe-throwing" },
      { label: "Parties & Events", href: "/parties" },
      { label: "Special Events", href: "/events" },
    ],
  },
  {
    title: "Vault 42",
    links: [
      { label: "Food & Drink", href: "/food-drink" },
      { label: "News", href: "/news" },
      { label: "Careers", href: "/careers" },
      { label: "Policies & FAQs", href: "/policies" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Safety & Waiver Policy", href: "/safety" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export const siteContact = {
  phone: "02476 954242",
  phoneHref: "tel:02476954242",
  email: "hello@vault42.uk",
  emailHref: "mailto:hello@vault42.uk",
  website: "vault42.uk",
  websiteHref: "https://vault42.uk",
  address: "Unit 1 - 2, Closers Business Centre, Avenue Road, Nuneaton, CV11 4ND",
};

export const openingHours = [
  { days: "Monday – Friday", hours: "4:00pm – 9:00pm" },
  { days: "Saturday – Sunday", hours: "10:00am – 9:00pm" },
];

/**
 * All bookings and payment go through Wanna Book — nothing is processed on vault42.uk itself.
 * Same link for axe throwing and Special Events bookings until there's a dedicated events listing.
 */
export const bookingHref = "https://wannabook.online/booking/vault42";

/**
 * Footer social row. Instagram has no `href` yet — it's a placeholder (dimmed, unclickable)
 * until there's a real account to link to.
 */
export const socialLinks = [
  { label: "Facebook", platform: "facebook" as const, href: "https://www.facebook.com/Vault42" },
  { label: "Instagram", platform: "instagram" as const },
];
