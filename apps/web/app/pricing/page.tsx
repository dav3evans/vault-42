import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Accent, PriceCard, Heading, Panel, ActionRow, Callout } from "@vault42/ui";
import { bookingHref } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Pricing & Booking",
  description: "Transparent pricing for axe throwing at Vault 42, plus planned pricing for laser tag and parties once those sectors unlock.",
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
          Axe throwing — live now
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
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
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Heading as="h2" size="section" className="mb-8">
          Laser tag — sector locked
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <PriceCard
            title="Laser Tag"
            description="Planned pricing — not bookable until the Hexforce Arena unlocks."
            rows={[
              { label: "1 Game", value: "£6.95 pp" },
              { label: "2 Games", value: "£11.95 pp" },
              { label: "3 Games", value: "£14.95 pp" },
            ]}
            note="Exclusive hire: 1 game £130 · 2 games £230 · 3 games £300 for up to 30 players, once launched."
          />
          <PriceCard
            title="Wasteland Warriors Kids Club"
            description="1.5 hours of guided laser tag for younger Explorers."
            rows={[{ label: "Per child", value: "£10" }]}
            note="Minimum of 3 games. Resumes every Saturday and Sunday at 10:20 AM once laser tag unlocks."
          />
        </div>
        <p className="mt-6 text-sm text-text/62">
          Register for priority access on the{" "}
          <Link href="/laser-tag" className="text-gold no-underline">
            Laser Tag
          </Link>{" "}
          page — we&apos;ll email you the moment this sector unlocks.
        </p>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Heading as="h2" size="section" className="mb-8">
          Party packages
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <PriceCard
            title="Command Centre Package"
            description="Our classic laser tag birthday party — sector locked."
            rows={[
              { label: "Per person", value: "£16.99" },
              { label: "Game time", value: "2 games" },
            ]}
            note="Returns once laser tag unlocks."
          />
          <PriceCard
            title="Skull Temple Package"
            description="A mixed laser tag and axe throwing session — sector locked."
            rows={[
              { label: "Per person", value: "£21.99" },
              { label: "Game time", value: "1 game + axe lane" },
            ]}
            note="Returns once laser tag unlocks."
          />
          <PriceCard
            title="Bio-Dome Package"
            description="Our premium party package — sector locked."
            rows={[
              { label: "Per person", value: "£24.99" },
              { label: "Game time", value: "3 games" },
            ]}
            note="Includes food, drinks and a goodie bag. Returns once laser tag unlocks."
          />
        </div>
        <p className="mt-6 text-sm text-text/62">
          Want a party now? Axe Throwing party bookings are available by enquiry — pricing confirmed when
          you get in touch. See the{" "}
          <Link href="/parties/birthday" className="text-gold no-underline">
            Birthday Parties
          </Link>{" "}
          page or{" "}
          <Link href="/contact" className="text-gold no-underline">
            contact us
          </Link>
          .
        </p>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Panel>
          <Heading as="h2" size="card" className="mb-5 text-[#f4e8af]">
            How to book
          </Heading>
          <div className="grid gap-3">
            <ActionRow
              title="Book online"
              description="Book axe throwing instantly online via our booking partner, Wanna Book."
              actionLabel="Book Now"
              href={bookingHref}
            />
            <ActionRow
              title="Call to book"
              description="Prefer to talk it through? A Vault Custodian will confirm your slot on the spot."
              actionLabel="02476 954242"
              href="tel:02476954242"
              variant="secondary"
            />
            <ActionRow
              title="Enquire online"
              description="For parties, corporate hire or anything custom — send your details and we'll get back to you."
              actionLabel="Contact Us"
              href="/contact"
              variant="secondary"
            />
          </div>
          <Callout title="Membership discounts" className="mt-6">
            Axe Throwing members get discounted rates on every visit, with Laser Tag membership discounts
            returning once that sector unlocks — see the{" "}
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
