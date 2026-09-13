import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, BulletList, JobListingCard, NumberedStep } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open Vault Custodian positions, team culture and volunteering at Vault 42.",
};

const openRoles = [
  { title: "Vault Custodian (Laser Tag)", type: "Part-time", location: "Nuneaton" },
  { title: "Vault Custodian (Axe Throwing)", type: "Part-time", location: "Nuneaton" },
  { title: "Party Host", type: "Weekends", location: "Nuneaton" },
  { title: "Duty Manager", type: "Full-time", location: "Nuneaton" },
];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        heading={
          <>
            Join the <Accent>Vault Custodians</Accent>
          </>
        }
        description="We hire for energy and reliability first — the Vault 42 world and every game mode, we'll teach you."
        actions={[{ label: "Get in Touch", href: "/contact" }]}
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <Heading as="h2" size="section" className="mb-8">
          Open positions
        </Heading>
        <div className="grid gap-3.5">
          {openRoles.map((role) => (
            <JobListingCard key={role.title} title={role.title} type={role.type} location={role.location} href="/contact" />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 pb-16 lg:grid-cols-2">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Team culture
          </Heading>
          <BulletList
            items={[
              "You'll spend your shift briefing, hosting and hyping up every group that comes through the door.",
              "Full training on every game mode, safety procedure and the Vault 42 lore before your first solo shift.",
              "A team that takes the games seriously and everything else a lot less seriously.",
            ]}
          />
        </Panel>
        <Panel>
          <Heading as="h2" size="card" className="mb-4">
            How to apply
          </Heading>
          <div className="grid gap-3.5">
            <NumberedStep number="01">Get in touch through the Contact page with the role you&apos;re interested in.</NumberedStep>
            <NumberedStep number="02">A short chat with the Duty Manager — no formal interview panel.</NumberedStep>
            <NumberedStep number="03">Trial shift, paid, so you can see if it&apos;s actually for you.</NumberedStep>
          </div>
        </Panel>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Panel accentTop={false}>
          <Heading as="h2" size="card" className="mb-3">
            Volunteering
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            We occasionally look for volunteers to help run larger community events and launch days.
            If that&apos;s more your speed than a regular shift, mention it when you get in touch.
          </p>
        </Panel>
      </section>
    </>
  );
}
