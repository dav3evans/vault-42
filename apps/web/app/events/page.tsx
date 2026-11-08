import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, BulletList, Tag, Callout, Button, InquiryForm } from "@vault42/ui";
import { bookingHref } from "@/lib/site-nav";

export const metadata: Metadata = {
  title: "Night Operations & Special Events",
  description: "HEX Corp Sabotage: an adult-only immersive murder mystery night at Vault 42, plus corporate and private venue hire.",
};

export default function EventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Night Operations & Special Events"
        heading={
          <>
            HEX Corp Sabotage: <Accent>an immersive murder mystery night</Accent>
          </>
        }
        description="Adults-only after-hours operations inside Vault 42 — starting with a live investigation that turns the axe throwing lanes into a crime scene."
        actions={[
          { label: "Book via Wanna Book", href: bookingHref },
          { label: "Enquire About Venue Hire", href: "#venue-hire", variant: "secondary" },
        ]}
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <Tag tone="gold" className="mb-3 block">
          18+ · Night Operations
        </Tag>
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            The sabotage
          </Heading>
          <p className="mb-4 text-[0.97rem] leading-[1.75] text-text/72">
            A traitor is loose inside HEX Corp. Explorers work the case as a group, using live axe-throwing
            target trials to unlock evidence, question suspects and piece together who sabotaged the
            facility — before the night is out.
          </p>
          <BulletList
            items={[
              "Interactive investigation led by an in-character Game Master.",
              "Evidence is unlocked through live axe-throwing target trials, not static clue cards.",
              "Built for adult groups, work nights out and private celebrations.",
            ]}
          />
        </Panel>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Pricing, dates & what&apos;s included
          </Heading>
          <BulletList
            items={[
              "Gameplay: the full HEX Corp Sabotage investigation, hosted by your Game Master.",
              "Food & drink package included — details to follow.",
              "Booked and ticketed through Wanna Book, our booking partner, so your spot is reserved for the night.",
            ]}
          />
          <Callout title="Dates and pricing — to be confirmed" className="mt-5">
            Specific event dates, ticket prices and the exact food/drink package are still being finalised.
            Book via Wanna Book below, or register for updates and we&apos;ll email you the details as soon
            as they&apos;re locked in.
          </Callout>
        </Panel>
      </section>

      <section id="tickets" className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Panel>
          <Heading as="h2" size="card" className="mb-5 text-[#f4e8af]">
            Book your seats
          </Heading>
          <p className="mb-4 text-[0.97rem] leading-[1.75] text-text/72">
            HEX Corp Sabotage is booked through Wanna Book, our booking partner — the same place you book
            axe throwing.
          </p>
          <Button href={bookingHref} className="mb-8">
            Book via Wanna Book
          </Button>
          <Heading as="h3" size="card" className="mb-3 text-[1.1rem]">
            Not ready to book? Register for updates
          </Heading>
          <p className="mb-4 text-[0.9rem] leading-[1.65] text-text/62">
            Exact dates, pricing and the food/drink package are still being finalised — register below and
            we&apos;ll email you as soon as they&apos;re confirmed.
          </p>
          <InquiryForm
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "groupSize", label: "Group Size", required: true },
              { name: "message", label: "Anything else we should know?", type: "textarea" },
            ]}
            submitLabel="Register Interest"
            successMessage="You're registered — we'll be in touch with dates and pricing as soon as they're confirmed."
          />
        </Panel>
      </section>

      <section id="venue-hire" className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Panel>
          <Heading as="h2" size="card" className="mb-5 text-[#f4e8af]">
            Corporate & private venue hire
          </Heading>
          <p className="mb-4 text-[0.97rem] leading-[1.75] text-text/72">
            Hire Vault 42 for a private night operation — corporate socials, work nights out or private
            celebrations built around the HEX Corp Sabotage experience.
          </p>
          <InquiryForm
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "company", label: "Company / Organisation" },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "groupSize", label: "Group Size", required: true },
              { name: "message", label: "Tell us about your event", type: "textarea", required: true },
            ]}
            submitLabel="Send Enquiry"
          />
        </Panel>
      </section>
    </>
  );
}
