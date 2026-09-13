import type { Metadata } from "next";
import { PageHeader, Accent, TileGrid, Panel, Heading, InquiryForm } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Special Occasions",
  description: "Hen and stag parties, and private hire packages at Vault 42.",
};

export default function SpecialOccasionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Special Occasions"
        heading={
          <>
            Hen dos, stag dos and <Accent>private hire</Accent>
          </>
        }
        description="Some occasions need something a bit different. We'll build a package around what you actually want the day to feel like."
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <TileGrid
          variant="muted"
          columns={3}
          items={[
            { title: "Hen & Stag Parties", description: "Competitive laser tag or axe throwing, with the option to add food and drink packages." },
            { title: "Private Hire", description: "Exclusive use of the arena for your group only — no other bookings running alongside you." },
            { title: "Anniversaries & Reunions", description: "A genuinely different way to get a group together that isn't just a meal out." },
          ]}
        />
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 pb-16 lg:grid-cols-[1fr_420px]">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Tell us what you&apos;re celebrating
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Every private hire is custom-built around your group size, budget and the occasion itself.
            Send us the details and a Vault Custodian will put a package together for you.
          </p>
        </Panel>
        <Panel>
          <Heading as="h2" size="card" className="mb-4">
            Request a custom package
          </Heading>
          <InquiryForm
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "occasion", label: "What's the occasion?", required: true },
              { name: "group-size", label: "Approximate group size" },
            ]}
            submitLabel="Send Request"
            successMessage="Thanks — a Vault Custodian will be in touch to build your package."
          />
        </Panel>
      </section>
    </>
  );
}
