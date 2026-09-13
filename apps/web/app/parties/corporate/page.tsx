import type { Metadata } from "next";
import { PageHeader, Accent, TileGridPanel, TestimonialCard, Heading } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Corporate Events",
  description: "Team-building packages and arena rental for corporate groups at Vault 42.",
};

export default function CorporateEventsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Corporate Events"
        heading={
          <>
            Team-building that people <Accent>actually enjoy</Accent>
          </>
        }
        description="Break routine, build energy and get people properly involved — from a single team session to a full-arena buyout."
        actions={[{ label: "Enquire About a Date", href: "/contact" }]}
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <TileGridPanel
          title="Ways to book"
          variant="feature"
          columns={3}
          items={[
            { title: "Team Sessions", description: "Book a block of laser tag or axe throwing games for a single team." },
            { title: "Multi-Team Tournaments", description: "Run a bracket across departments with live scoring on the arena screens." },
            { title: "Full Arena Hire", description: "Exclusive hire for up to 30 players — the whole venue, just your group." },
          ]}
        />
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Heading as="h2" size="section" className="mb-8">
          What past groups <Accent>have said</Accent>
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <TestimonialCard
            quote="Best team day we've had in years — everyone was still talking about it a week later."
            name="Sarah M."
            role="Operations Lead"
          />
          <TestimonialCard
            quote="The Custodians ran the whole thing for us. Zero stress, maximum competitive chaos."
            name="Danny R."
            role="Team Manager"
          />
          <TestimonialCard
            quote="We booked the full arena for our Christmas do. Genuinely the best corporate event I've been to."
            name="Priya K."
            role="HR Coordinator"
          />
        </div>
      </section>
    </>
  );
}
