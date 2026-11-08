import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Accent, PriceCard, Panel, Heading, BulletList, Callout } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Membership & Loyalty",
  description: "Axe throwing membership, plus referral and loyalty rewards at Vault 42.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Membership & Loyalty"
        heading={
          <>
            For Explorers who <Accent>keep coming back</Accent>
          </>
        }
        description="If Vault 42 is becoming a regular thing, membership pays for itself fast — discounted rates, priority booking and early access to whatever comes next."
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_320px]">
          <PriceCard
            title="Axe Throwing Membership"
            description="For regulars who want cheaper lanes and priority slots."
            rows={[
              { label: "Monthly", value: "£14.99" },
              { label: "Member lane rate", value: "£15" },
              { label: "Guest passes", value: "1 / month" },
            ]}
            note="Cancel any time. Priority booking on weekend slots."
          />
          <Panel accentTop={false}>
            <Heading as="h2" size="card" className="mb-3">
              Coming later
            </Heading>
            <p className="text-[0.93rem] leading-[1.68] text-text/68">
              A Laser Tag membership opens up once Hexforce Laser Tag unlocks — register interest on the{" "}
              <Link href="/laser-tag" className="text-gold no-underline">
                Laser Tag
              </Link>{" "}
              page to hear first.
            </p>
          </Panel>
        </div>
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 pb-16 lg:grid-cols-2">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Member benefits
          </Heading>
          <BulletList
            items={[
              "Discounted per-game and per-lane rates on every visit.",
              "Early access to new attractions and escape room launches.",
              "Invitations to member-only events and out-of-hours sessions.",
              "Guest passes to bring friends at the member rate.",
            ]}
          />
        </Panel>
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Referral & loyalty rewards
          </Heading>
          <p className="mb-4 text-[0.97rem] leading-[1.75] text-text/72">
            Refer a friend who signs up for membership and you both get a free game. Loyalty points
            build with every visit, member or not, and can be redeemed against future sessions.
          </p>
          <Callout title="Coming soon">
            Point tracking and referral codes will go live once we add a dedicated membership system — for now, ask a Vault Custodian to log your referral in person.
          </Callout>
        </Panel>
      </section>
    </>
  );
}
