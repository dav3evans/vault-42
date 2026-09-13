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
    title: "Halloween at the Vault: extended hours and a new game mode",
    excerpt: "The wasteland gets darker this October — extended evening sessions and a limited-run Zombies vs Survivors event.",
    body: [
      "This October, Vault 42 stays open later and darker. We're running extended evening sessions across the full month, with the arena lighting dropped to its lowest setting yet.",
      "Zombies vs Survivors returns as a limited-run mode with new spawn rules — one Explorer starts infected, and the lights make it a lot harder to see them coming.",
      "Booking works exactly the same as any other session — just look for the Halloween slots when you check availability.",
    ],
  },
  {
    slug: "vault-42-build-progress",
    category: "Behind the Scenes",
    date: "2026-08-14",
    title: "Behind the scenes: Vault 42's build progress",
    excerpt: "A look at how the Hexforce Arena and Champ Throw lanes came together, and what's happening with Hexcape.",
    body: [
      "Building Vault 42 meant fitting a post-apocalyptic HEX Corp facility into a working unit in Nuneaton — which is a stranger sentence to write down than you'd think.",
      "The Hexforce Arena went through three separate obstacle layouts before we landed on the current one. The axe throwing lanes were the easier build, mostly because Champ Throw arrives largely pre-fitted.",
      "Hexcape — our planned escape rooms — is the next big build phase. No launch date yet, but the Reactor Room concept is furthest along.",
    ],
  },
  {
    slug: "wasteland-warriors-kids-club-launch",
    category: "Announcements",
    date: "2026-06-02",
    title: "Wasteland Warriors Kids Club is now running every weekend",
    excerpt: "Our dedicated Saturday and Sunday morning session for younger Explorers is officially a permanent fixture.",
    body: [
      "After a strong trial run, Wasteland Warriors Kids Club is now a permanent weekend fixture — every Saturday and Sunday at 10:20 AM.",
      "It's 1.5 hours of guided laser tag with a minimum of three games, run by Custodians who specialise in younger groups.",
      "Spaces are limited, so booking ahead is recommended, especially during school holidays.",
    ],
  },
  {
    slug: "corporate-team-day-community-story",
    category: "Community",
    date: "2026-04-20",
    title: "How one team turned a Monday morning slump into their best team day yet",
    excerpt: "A local operations team booked a full-arena session to shake off a rough quarter. Here's what happened.",
    body: [
      "We get a lot of corporate bookings that start the same way: a team that needs to blow off steam after a difficult stretch.",
      "One local operations team booked a full-arena laser tag session on a Monday morning, ran a four-team tournament bracket, and by the second round had completely forgotten they were supposed to be stressed.",
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
