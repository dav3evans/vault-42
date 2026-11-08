import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, BulletList } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Vault 42 collects, uses and protects your personal data, in line with UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Privacy Policy"
        heading={
          <>
            How we handle <Accent>your data</Accent>
          </>
        }
        description="Vault 42 (operated by Hex Box Limited) is committed to protecting your personal data in line with UK GDPR. This policy explains what we collect and why."
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 py-16">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Data we collect
          </Heading>
          <BulletList
            items={[
              "Contact details you give us directly: name, email, phone number — through bookings, enquiry forms, the careers application form or event registration forms.",
              "Booking details: date, time, session type and party size.",
              "Bookings and payment are handled entirely by Wanna Book, our booking partner — Vault 42 does not process or store your payment details.",
              "Basic website usage data (e.g. pages visited) for site performance, where permitted by your cookie preferences.",
            ]}
          />
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Why we collect it
          </Heading>
          <BulletList
            items={[
              "To process and confirm bookings, payments and digital waivers.",
              "To respond to enquiries, including job applications and event/venue-hire requests.",
              "To send booking confirmations and essential updates about your visit or event.",
              "To send marketing updates, but only if you've opted in — you can unsubscribe at any time.",
            ]}
          />
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Who we share it with
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            We share the minimum data necessary with Wanna Book, our booking partner, and — once one&apos;s
            in place — a digital waiver provider, so they can do their job. We don&apos;t sell your data, and
            we don&apos;t share it with anyone else without your consent unless required by law.
          </p>
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            How long we keep it
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            We keep booking and waiver records for as long as needed to meet our legal, insurance and
            accounting obligations, and job applications for a limited period after a role is filled.
            Exact retention periods are confirmed on request.
          </p>
        </Panel>

        <Panel accentTop={false}>
          <Heading as="h2" size="card" className="mb-3">
            Your rights
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Under UK GDPR you can ask to see, correct or delete the personal data we hold about you, or
            withdraw marketing consent at any time. To do this, contact us at{" "}
            <a href="mailto:hello@vault42.uk" className="text-gold no-underline">
              hello@vault42.uk
            </a>
            .
          </p>
        </Panel>
      </section>
    </>
  );
}
