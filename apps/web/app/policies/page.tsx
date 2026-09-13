import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, BulletList, FaqAccordion } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Policies & FAQs",
  description: "Health & safety, cancellations, code of conduct and accessibility information for Vault 42.",
};

const policyFaqs = [
  {
    question: "What happens if I'm running late?",
    answer: "Sessions start on time to keep the schedule fair for everyone booked after you — arriving late may mean a shortened session.",
  },
  {
    question: "What if someone in my group has mobility needs?",
    answer: "Let us know when you book. Both the laser tag arena and axe throwing lanes can be adapted for most mobility and sensory needs — see Accessibility below.",
  },
];

export default function PoliciesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Policies & FAQs"
        heading={
          <>
            Health, safety and <Accent>the fine print</Accent>
          </>
        }
        description="Everything you need to know before you visit, laid out plainly rather than buried in a terms page."
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 py-16">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Health & safety
          </Heading>
          <BulletList
            items={[
              "Every session is briefed by a Vault Custodian before play begins, including laser tag arena hazards and axe throwing lane rules.",
              "Closed-lane design on axe throwing keeps throwers and spectators fully separated at all times.",
              "Laser tag equipment is sanitised between every session.",
              "First-aid trained staff are on site during all opening hours.",
            ]}
          />
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Cancellations & refunds
          </Heading>
          <BulletList
            items={[
              "Bookings cancelled more than 48 hours in advance are eligible for a full refund or reschedule.",
              "Cancellations inside 48 hours may be rescheduled but are not eligible for a refund.",
              "Party packages require a deposit, refundable under the same 48-hour window.",
            ]}
          />
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Code of conduct
          </Heading>
          <BulletList
            items={[
              "Play fair — targeting equipment or facilities rather than the game is not tolerated.",
              "Follow your Vault Custodian's instructions at all times, especially on the axe throwing lanes.",
              "Vault 42 reserves the right to end a session early for guests who put themselves or others at risk.",
            ]}
          />
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Accessibility
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Vault 42 is a step-free, ground-floor venue. Our SEN-friendly sessions offer a calmer,
            more manageable version of laser tag for groups that need it — ask about these when you
            book. If you have specific access requirements, let us know in advance and we&apos;ll do what
            we can to accommodate them.
          </p>
        </Panel>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Heading as="h2" size="section" className="mb-8">
          A few more questions
        </Heading>
        <FaqAccordion items={policyFaqs} className="max-w-3xl" />
      </section>
    </>
  );
}
