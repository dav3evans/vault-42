import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, BulletList, JobListingCard, NumberedStep, InquiryForm } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles, team culture and how to apply to join the HEX Corp Operations Team at Vault 42.",
};

const openRoles = [
  { title: "Axe Throwing Lane Marshal & Safety Host", type: "Part-time", location: "Nuneaton" },
  { title: "Immersive Event Actor / Game Master", type: "Evenings & Weekends", location: "Nuneaton" },
  { title: "Venue Duty Manager", type: "Full-time", location: "Nuneaton" },
];

const roleOptions = [...openRoles.map((role) => role.title), "Other / General Application"];

export default function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers"
        heading={
          <>
            Join the <Accent>HEX Corp Operations Team</Accent>
          </>
        }
        description="We're looking for high-energy people to lead operations in Sector 42. We hire for energy and reliability first — the Vault 42 world and every game mode, we'll teach you."
        actions={[{ label: "Apply Below", href: "#apply" }]}
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <Heading as="h2" size="section" className="mb-8">
          Open positions
        </Heading>
        <div className="grid gap-3.5">
          {openRoles.map((role) => (
            <JobListingCard key={role.title} title={role.title} type={role.type} location={role.location} href="#apply" />
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
            <NumberedStep number="01">Fill out the application form below with the role you&apos;re interested in.</NumberedStep>
            <NumberedStep number="02">A short chat with the Duty Manager — no formal interview panel.</NumberedStep>
            <NumberedStep number="03">Trial shift, paid, so you can see if it&apos;s actually for you.</NumberedStep>
          </div>
        </Panel>
      </section>

      <section id="apply" className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Panel>
          <Heading as="h2" size="card" className="mb-5 text-[#f4e8af]">
            Apply now
          </Heading>
          <InquiryForm
            fields={[
              { name: "name", label: "Full Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "phone", label: "Phone Number", type: "tel", required: true },
              { name: "role", label: "Role applying for", type: "select", options: roleOptions, required: true },
              {
                name: "availability",
                label: "Availability",
                type: "select",
                options: ["Part-time", "Full-time", "Evenings & Weekends"],
                required: true,
              },
              { name: "cv", label: "CV / Resume (PDF or DOCX)", type: "file", accept: ".pdf,.doc,.docx", required: true },
              { name: "why", label: "Why would you thrive in Sector 42?", type: "textarea", required: true },
            ]}
            submitLabel="Submit Application"
            successMessage="Application received — a member of the Duty Manager team will be in touch."
          />
        </Panel>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Panel accentTop={false}>
          <Heading as="h2" size="card" className="mb-3">
            Volunteering
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            We occasionally look for volunteers to help run larger community events and launch days.
            If that&apos;s more your speed than a regular shift, mention it in the form above.
          </p>
        </Panel>
      </section>
    </>
  );
}
