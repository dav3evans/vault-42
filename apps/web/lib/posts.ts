/**
 * Seed blog content. This is the natural swap point for a CMS later —
 * replace these functions with fetches and the pages don't need to change.
 */
export type Post = {
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "halloween-at-the-vault",
    category: "Announcements",
    date: "2026-10-01",
    title: "Halloween at the Vault: extended axe throwing hours and a first look at Night Operations",
    excerpt: "The wasteland gets darker this October — extended evening axe throwing sessions, plus a first preview of HEX Corp Sabotage, our new after-hours special event.",
    body: [
      "This October, Vault 42 stays open later and darker. We're running extended evening axe throwing sessions across the full month, with the arena lighting dropped to its lowest setting yet.",
      "We're also giving a first preview of HEX Corp Sabotage — our upcoming 18+ immersive murder mystery night — ahead of its full launch. Keep an eye on the Special Events page for dates and tickets.",
      "Booking works exactly the same as any other axe throwing session — just look for the Halloween slots when you check availability.",
    ],
  },
  {
    slug: "vault-42-build-progress",
    category: "Behind the Scenes",
    date: "2026-08-14",
    title: "Behind the scenes: Vault 42's build progress",
    excerpt: "A look at how the Champ Throw lanes came together, and what's happening with Hexforce Laser Tag and Hexcape.",
    body: [
      "Building Vault 42 meant fitting a post-apocalyptic HEX Corp facility into a working unit in Nuneaton — which is a stranger sentence to write down than you'd think.",
      "The axe throwing lanes were our Phase 1 priority, mostly because Champ Throw arrives largely pre-fitted. The Hexforce Arena obstacle layout is in its third redesign, and build work continues alongside it.",
      "Hexforce Laser Tag and Hexcape — our planned escape rooms — are both sector locked for now. No launch dates yet, but the Hexforce Arena build is further along than Hexcape's Reactor Room concept.",
    ],
  },
  {
    slug: "now-hiring-hex-corp-operations-team",
    category: "Announcements",
    date: "2026-06-02",
    title: "Now hiring: join the HEX Corp Operations Team",
    excerpt: "We're hiring Axe Throwing Lane Marshals, Game Masters for our Special Events and a Venue Duty Manager. Full training provided.",
    body: [
      "Vault 42 is hiring. We're looking for high-energy people to help run axe throwing lanes, host our Special Events nights and keep the venue running day to day.",
      "Three roles are open right now: Axe Throwing Lane Marshal & Safety Host, Immersive Event Actor / Game Master, and Venue Duty Manager. No experience with the Vault 42 world required — we'll train you on every game mode, safety procedure and bit of lore before your first solo shift.",
      "Full details and the application form are on the Careers page.",
    ],
  },
  {
    slug: "corporate-team-day-community-story",
    category: "Community",
    date: "2026-04-20",
    title: "How one team turned a Monday morning slump into their best team day yet",
    excerpt: "A local operations team booked a full-venue axe throwing session to shake off a rough quarter. Here's what happened.",
    body: [
      "We get a lot of corporate bookings that start the same way: a team that needs to blow off steam after a difficult stretch.",
      "One local operations team booked a full-venue axe throwing session on a Monday morning, ran a four-team knockout bracket across the Champ Throw lanes, and by the second round had completely forgotten they were supposed to be stressed.",
      "If you're weighing up whether a team day is worth it, the answer from everyone we've spoken to afterwards has been the same: book it earlier than you think you need to.",
    ],
  },
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
