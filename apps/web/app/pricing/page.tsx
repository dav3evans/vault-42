import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Accent, PriceCard, Heading, Panel, ActionRow, Callout } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Pricing & Booking",
  description: "Transparent pricing for laser tag, axe throwing, parties and memberships at Vault 42.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing & Booking"
        heading={
          <>
            Simple pricing. <Accent>Easy to book.</Accent>
          </>
        }
        description="Every price point is listed here — no hidden fees, no digging through a PDF. Book online soon, or call and a Vault Custodian will sort it for you today."
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <Heading as="h2" size="section" className="mb-8">
          Laser tag & axe throwing
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <PriceCard
            title="Laser Tag"
            description="Standard sessions for casual visits, repeat games and quick decisions."
            rows={[
              { label: "1 Game", value: "£6.95 pp" },
              { label: "2 Games", value: "£11.95 pp" },
              { label: "3 Games", value: "£14.95 pp" },
            ]}
            note="Exclusive hire: 1 game £130 · 2 games £230 · 3 games £300 for up to 30 players."
          />
          <PriceCard
            title="Axe Throwing"
            description="Digital Champ Throw pricing by group size."
            rows={[
              { label: "2 Players", value: "£24 pp" },
              { label: "3 Players", value: "£23 pp" },
              { label: "4 Players", value: "£22 pp" },
              { label: "5 Players", value: "£21 pp" },
              { label: "6 Players", value: "£20 pp" },
            ]}
          />
          <PriceCard
            title="Wasteland Warriors Kids Club"
            description="1.5 hours of guided laser tag for younger Explorers."
            rows={[{ label: "Per child", value: "£10" }]}
            note="Minimum of 3 games. Every Saturday and Sunday at 10:20 AM."
          />
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Heading as="h2" size="section" className="mb-8">
          Party packages
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <PriceCard
            title="Command Centre Package"
            description="Our classic laser tag birthday party."
            rows={[
              { label: "Per person", value: "£16.99" },
              { label: "Game time", value: "2 games" },
            ]}
            note="Includes a private party room and refreshments."
          />
          <PriceCard
            title="Skull Temple Package"
            description="Mixed laser tag and axe throwing session."
            rows={[
              { label: "Per person", value: "£21.99" },
              { label: "Game time", value: "1 game + axe lane" },
            ]}
            note="Recommended for ages 10 and up."
          />
          <PriceCard
            title="Bio-Dome Package"
            description="Our premium party package."
            rows={[
              { label: "Per person", value: "£24.99" },
              { label: "Game time", value: "3 games" },
            ]}
            note="Includes food, drinks and a goodie bag."
          />
        </div>
        <p className="mt-6 text-sm text-text/62">
          See the full breakdown of inclusions and add-ons on the{" "}
          <Link href="/parties/birthday" className="text-gold no-underline">
            Birthday Parties
          </Link>{" "}
          page.
        </p>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Panel>
          <Heading as="h2" size="card" className="mb-5 text-[#f4e8af]">
            How to book
          </Heading>
          <div className="grid gap-3">
            <ActionRow
              title="Online booking"
              description="A full online booking system is coming soon, with live availability and payment."
              actionLabel="Coming Soon"
              href="/contact"
              variant="secondary"
            />
            <ActionRow
              title="Call to book"
              description="The fastest way to book right now — a Vault Custodian will confirm your slot on the spot."
              actionLabel="02476 954242"
              href="tel:02476954242"
            />
            <ActionRow
              title="Enquire online"
              description="Send us your preferred date and group size and we'll get back to you."
              actionLabel="Contact Us"
              href="/contact"
              variant="secondary"
            />
          </div>
          <Callout title="Membership discounts" className="mt-6">
            Laser Tag and Axe Throwing members get discounted rates on every visit — see the{" "}
            <Link href="/membership" className="text-gold no-underline">
              Membership
            </Link>{" "}
            page for details.
          </Callout>
        </Panel>
      </section>
    </>
  );
}
