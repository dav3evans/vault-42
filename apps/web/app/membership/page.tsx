import type { Metadata } from "next";
import { PageHeader, Accent, PriceCard, Panel, Heading, BulletList, Callout } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Memberships & Loyalty",
  description: "Laser tag and axe throwing memberships, plus referral and loyalty rewards at Vault 42.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Memberships & Loyalty"
        heading={
          <>
            For Explorers who <Accent>keep coming back</Accent>
          </>
        }
        description="If Vault 42 is becoming a regular thing, membership pays for itself fast — discounted rates, priority booking and early access to whatever comes next."
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <PriceCard
            title="Laser Tag Membership"
            description="For Explorers who want the Hexforce Arena on tap."
            rows={[
              { label: "Monthly", value: "£12.99" },
              { label: "Member game rate", value: "£4.95" },
              { label: "Guest passes", value: "2 / month" },
            ]}
            note="Cancel any time. Discount applies from your first session."
          />
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
          <Callout title="Coming with online booking">
            Point tracking and referral codes will go live alongside the online booking system — for now, ask a Vault Custodian to log your referral in person.
          </Callout>
        </Panel>
      </section>
    </>
  );
}
