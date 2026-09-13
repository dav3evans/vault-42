import type { Metadata } from "next";
import { PageHeader, Panel, Heading, Accent, BulletList, Tag, TileGridPanel, Callout } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Hexforce Laser Tag",
  description: "Overview, game modes, equipment and booking options for Hexforce Laser Tag at Vault 42.",
};

export default function LaserTagPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hexforce Laser Tag"
        heading={
          <>
            Experience the <Accent>ultimate adventure</Accent>
          </>
        }
        description="Step into the Hexforce Arena, where Explorers navigate a post-apocalyptic battlefield filled with high-tech obstacles and strategic challenges."
        actions={[
          { label: "See Pricing", href: "/pricing" },
          { label: "Book Laser Tag", href: "/contact", variant: "secondary" },
        ]}
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 py-16 lg:grid-cols-2">
        <Panel>
          <Tag tone="gold" className="mb-3 block">
            The arena
          </Tag>
          <Heading as="h2" size="card" className="mb-3">
            Storyline & game modes
          </Heading>
          <p className="mb-4 text-[0.97rem] leading-[1.75] text-text/72">
            Every session is set inside the reclaimed Hexforce Arena — a maze of obstacles, cover and
            light rigs built into the bones of the old HEX Corp facility. Your Vault Custodian briefs you
            on the mission before every game.
          </p>
          <BulletList
            items={[
              "Base Assault — capture and hold the enemy's core.",
              "Capture the Flag — classic two-team objective play.",
              "Zombies vs Survivors — one team infects, the other holds out.",
              "Domination — control the most zones to win.",
            ]}
          />
        </Panel>
        <Panel>
          <Tag tone="gold" className="mb-3 block">
            Equipment
          </Tag>
          <Heading as="h2" size="card" className="mb-3">
            Laserforce Gen 7
          </Heading>
          <p className="mb-4 text-[0.97rem] leading-[1.75] text-text/72">
            Vault 42 runs the latest Laserforce Gen 7 battle suits — lightweight vests with live scoring,
            in-game power-ups and immersive sound effects synced to the arena.
          </p>
          <BulletList
            items={[
              "Live scoring shown on the arena screens after every game.",
              "In-game power-ups you unlock mid-session.",
              "Suits adjust to fit ages 7 and up.",
            ]}
          />
        </Panel>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <TileGridPanel
          title="Booking options"
          variant="feature"
          columns={3}
          items={[
            { title: "Single Games", description: "Drop in for 1, 2 or 3 games — perfect for a quick session or first visit." },
            { title: "Party Packages", description: "Two games, a private party room and refreshments included." },
            { title: "Group & Exclusive Hire", description: "Exclusive hire is available for up to 30 players — ideal for corporate days and big celebrations." },
          ]}
        />
        <Callout title="Wasteland Warriors Kids Club" className="mt-6">
          A dedicated laser tag session for younger Explorers, every Saturday and Sunday at 10:20 AM — 1.5 hours with a minimum of 3 games.
        </Callout>
      </section>
    </>
  );
}
