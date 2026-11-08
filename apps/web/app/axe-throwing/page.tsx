import type { Metadata } from "next";
import { PageHeader, Panel, Heading, Accent, BulletList, Tag, TileGridPanel, PriceCard, Button } from "@vault42/ui";
import { bookingHref } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Axe Throwing",
  description: "Augmented reality axe throwing, game modes, safety rules and pricing at Vault 42.",
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
          { label: "Book Axe Throwing", href: bookingHref },
          { label: "See Pricing", href: "#pricing", variant: "secondary" },
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
              "Closed-toe shoes are required on the lanes — no sandals or open-toe footwear.",
              "A minimum age applies — see our Safety & Waiver Policy or ask when booking.",
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

      <section id="pricing" className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Heading as="h2" size="section" className="mb-8">
          Simple pricing. <Accent>Easy to book.</Accent>
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_320px]">
          <PriceCard
            title="Digital Champ Throw"
            description="Pricing drops as your group grows — no hidden fees, no deposit games."
            rows={[
              { label: "2 Players", value: "£24 pp" },
              { label: "3 Players", value: "£23 pp" },
              { label: "4 Players", value: "£22 pp" },
              { label: "5 Players", value: "£21 pp" },
              { label: "6 Players", value: "£20 pp" },
            ]}
            note="Bigger group or a private party room? Get in touch and we'll confirm pricing for you."
          />
          <Panel>
            <Heading as="h3" size="card" className="mb-4">
              Ready to throw?
            </Heading>
            <p className="mb-5 text-[0.93rem] leading-[1.68] text-text/68">
              Book your lane online now, or call and a Vault Custodian will sort it for you today.
            </p>
            <div className="grid gap-3">
              <Button href={bookingHref}>Book Axe Throwing</Button>
              <Button href="tel:02476954242" variant="secondary">
                Call 02476 954242
              </Button>
            </div>
          </Panel>
        </div>
      </section>
    </>
  );
}
