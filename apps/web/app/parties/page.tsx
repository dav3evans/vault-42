import type { Metadata } from "next";
import { PageHeader, CtaCard } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Parties & Events",
  description: "Birthday parties, corporate events, school & youth groups and special occasions at Vault 42.",
};

const categories = [
  {
    tag: "Birthdays",
    title: "Kids, teens & adult parties",
    description: "Themed packages built around the Vault 42 world, with a private party room and food included.",
    bullets: ["Command Centre, Skull Temple and Bio-Dome packages", "Goodie bags and custom add-ons available"],
    actions: [{ label: "Birthday Packages", href: "/parties/birthday" }],
  },
  {
    tag: "Corporate",
    title: "Team-building & arena rental",
    description: "Break routine and get the whole team properly involved, from small teams to full-arena hire.",
    bullets: ["Guided competitive formats", "Testimonials from past events"],
    actions: [{ label: "Corporate Events", href: "/parties/corporate" }],
  },
  {
    tag: "Schools & Youth Groups",
    title: "Mission-led play with a purpose",
    description: "Problem-solving and teamwork tied into the Vault 42 lore, with discounts for organised groups.",
    bullets: ["Scouts, guides and school trips welcome", "Group discount pricing"],
    actions: [{ label: "School & Youth Groups", href: "/parties/school-youth-groups", variant: "secondary" as const }],
  },
  {
    tag: "Special Occasions",
    title: "Hen & stag parties, private hire",
    description: "Fully customisable packages for the occasions that need something a bit different.",
    bullets: ["Private arena hire available", "Tell us what you're celebrating"],
    actions: [{ label: "Special Occasions", href: "/parties/special-occasions", variant: "secondary" as const }],
  },
];

export default function PartiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Parties & Events"
        heading="Built for birthdays, groups and team days"
        description="Vault 42 is designed to be easy to understand for first-time visitors and easy to sell for event organisers. Keep it simple, or go bigger with exclusive hire."
      />
      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {categories.map((item) => (
            <CtaCard key={item.tag} {...item} />
          ))}
        </div>
      </section>
    </>
  );
}
