import type { Metadata } from "next";
import { PageHeader, CtaCard } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Attractions",
  description: "Every experience inside Vault 42 — Hexforce Laser Tag, augmented axe throwing, and the escape rooms coming later.",
};

const attractions = [
  {
    tag: "Hexforce Laser Tag",
    title: "Battle through the wasteland",
    description: "A post-apocalyptic arena with live scoring, power-ups and four game modes.",
    bullets: ["Ages 7 and up", "Exclusive hire for up to 30 players", "Wasteland Warriors Kids Club, weekends 10:20 AM"],
    actions: [{ label: "Explore Laser Tag", href: "/attractions/laser-tag" }],
  },
  {
    tag: "Vault 42 Axe Throwing",
    title: "Augmented Champ Throw lanes",
    description: "Moving targets, real-time scoring and 16 interactive game modes for every skill level.",
    bullets: ["Individual, group and corporate lanes", "Guided by your Vault Custodians"],
    actions: [{ label: "Explore Axe Throwing", href: "/attractions/axe-throwing" }],
  },
  {
    tag: "Hexcape Escape Rooms",
    title: "Coming in a later phase",
    description: "Three rooms are in development: the Reactor Room, the Bio-Dome and the Command Centre.",
    bullets: ["Register for early access", "Launch dates announced on the News page"],
    actions: [{ label: "See What's Planned", href: "/attractions/escape-rooms", variant: "secondary" as const }],
  },
  {
    tag: "Future Attractions",
    title: "What's next for the Vault",
    description: "VR escape rooms, a laser maze and a pixel floor are all under consideration for future phases.",
    bullets: ["Tell us what you'd like to see"],
    actions: [{ label: "Share Your Interest", href: "/attractions/future", variant: "secondary" as const }],
  },
];

export default function AttractionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Attractions"
        heading="Every way to explore Vault 42"
        description="Two experiences are live and bookable today. Two more are part of where the Vault is headed — shown honestly so you always know what's real right now."
      />
      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {attractions.map((item) => (
            <CtaCard key={item.tag} {...item} />
          ))}
        </div>
      </section>
    </>
  );
}
