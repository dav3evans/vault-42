import type { Metadata } from "next";
import { PageHeader, Panel, Heading, Accent, BulletList, Tag, TileGridPanel } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Axe Throwing",
  description: "Augmented reality axe throwing, game modes, safety rules and booking options at Vault 42.",
};

export default function AxeThrowingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Vault 42 Axe Throwing"
        heading={
          <>
            Melee weapons training for the <Accent>wasteland</Accent>
          </>
        }
        description="Unlike static axe lanes, Vault 42's digital Champ Throw system gives you moving targets, real-time scoring and 16 interactive game modes."
        actions={[
          { label: "See Pricing", href: "/pricing" },
          { label: "Book Axe Throwing", href: "/contact", variant: "secondary" },
        ]}
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 py-16 lg:grid-cols-2">
        <Panel>
          <Tag tone="gold" className="mb-3 block">
            How it works
          </Tag>
          <Heading as="h2" size="card" className="mb-3">
            Augmented, not static
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Sensors track every throw against a digital target, so scoring is automatic and instant.
            Moving targets and on-screen challenges keep sessions fresh even after dozens of throws —
            a sharper, more tactical alternative to standard fixed-target venues.
          </p>
        </Panel>
        <Panel>
          <Tag tone="gold" className="mb-3 block">
            Safety
          </Tag>
          <Heading as="h2" size="card" className="mb-3">
            Game modes & safety rules
          </Heading>
          <BulletList
            items={[
              "Every lane is briefed by a Vault Custodian before your first throw.",
              "Closed-lane design keeps throwers and spectators separated at all times.",
              "16 interactive game modes, from precision challenges to head-to-head knockout.",
              "Suitable for beginners through to seasoned throwers.",
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
            { title: "Individual & Pairs", description: "Book a single lane for a quick session — pricing scales down per player as your group grows." },
            { title: "Groups", description: "Book multiple lanes together for friends, celebrations or a casual get-together." },
            { title: "Corporate Sessions", description: "A sharper alternative to the usual team day, with guided competitive formats." },
          ]}
        />
      </section>
    </>
  );
}
