import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, BulletList, Callout } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Safety & Waiver Policy",
  description: "Footwear, age restrictions, the zero-tolerance intoxication policy and digital waiver requirements at Vault 42.",
};

export default function SafetyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Safety & Waiver Policy"
        heading={
          <>
            Play safe <Accent>inside the Vault</Accent>
          </>
        }
        description="Every session at Vault 42 is briefed by a Vault Custodian — here's what you need to know before you arrive."
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 py-16">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Footwear
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Closed-toe shoes are required on the axe throwing lanes at all times — no sandals, flip-flops
            or open-toe footwear. Guests without suitable footwear may be refused access to the lanes.
          </p>
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Age restrictions
          </Heading>
          <BulletList
            items={[
              "Laser tag is suitable for ages 7 and up. Younger Explorers can join the Wasteland Warriors Kids Club sessions.",
              "Axe throwing has a minimum age requirement — see your booking confirmation or ask our team for the current age limit.",
              "Under-18s must have a parent or guardian complete the digital waiver on their behalf.",
            ]}
          />
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Zero-tolerance intoxication policy
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Vault 42 operates a zero-tolerance policy on intoxication. Any guest who appears to be under
            the influence of alcohol or drugs will not be permitted to take part in axe throwing, laser
            tag or any Special Event activity, for their own safety and the safety of others. No refund
            is given where entry is refused on this basis.
          </p>
        </Panel>

        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            On-lane safety
          </Heading>
          <BulletList
            items={[
              "Every session is briefed by a Vault Custodian before play begins.",
              "Closed-lane design on axe throwing keeps throwers and spectators fully separated at all times.",
              "First-aid trained staff are on site during all opening hours.",
              "Vault 42 reserves the right to end a session early for guests who put themselves or others at risk.",
            ]}
          />
        </Panel>

        <Panel accentTop={false}>
          <Heading as="h2" size="card" className="mb-3">
            Digital waiver
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Every participant must complete a digital waiver before taking part. Once a waiver provider
            is in place, a link will be sent as part of your Wanna Book booking confirmation and must be
            completed before you arrive.
          </p>
          <Callout title="Provider not yet selected — noted for a future update" className="mt-5">
            We haven&apos;t chosen a digital waiver provider yet. This page will be updated with the live
            link and process once one&apos;s in place.
          </Callout>
        </Panel>
      </section>
    </>
  );
}
