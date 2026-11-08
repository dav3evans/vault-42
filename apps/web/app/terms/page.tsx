import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, BulletList } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Booking, cancellation, late-arrival and refund terms for Vault 42.",
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Terms & Conditions"
        heading={
          <>
            Booking terms <Accent>in plain English</Accent>
          </>
        }
        description="The rules that apply when you book a session, party or event with Vault 42."
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 py-16">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Bookings
          </Heading>
          <BulletList
            items={[
              "A booking is confirmed once payment or a deposit has been taken via Wanna Book, our online booking partner.",
              "Please arrive at least 10 minutes before your session to check in and complete any required waiver.",
              "Sessions start on time to keep the schedule fair for everyone booked after you — arriving late may mean a shortened session with no reduction in price.",
            ]}
          />
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Cancellations, rescheduling & refunds
          </Heading>
          <BulletList
            items={[
              "Bookings cancelled more than 48 hours in advance are eligible for a full refund or reschedule.",
              "Cancellations inside 48 hours may be rescheduled but are not eligible for a refund.",
              "Party and event packages require a deposit, refundable under the same 48-hour window.",
              "Vault 42 reserves the right to reschedule a booking in the event of equipment failure or circumstances outside our control, in which case a full refund or alternative slot will be offered.",
            ]}
          />
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Age restrictions & waivers
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Minimum age and supervision requirements vary by attraction — see the{" "}
            <a href="/safety" className="text-gold no-underline">
              Safety & Waiver Policy
            </a>{" "}
            for details. Every participant (or a parent/guardian for under-18s) must complete a digital
            waiver before taking part.
          </p>
        </Panel>

        <Panel accentTop={false}>
          <Heading as="h2" size="card" className="mb-3">
            Pricing
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Prices shown on the site are correct at time of publishing and may change without notice.
            The price confirmed at the time of booking is the price you pay.
          </p>
        </Panel>
      </section>
    </>
  );
}
