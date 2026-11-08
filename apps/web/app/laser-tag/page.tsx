import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, BulletList, Tag, InquiryForm } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Hexforce Laser Tag",
  description: "Sector locked — the Hexforce Arena is coming soon to Vault 42. Register for priority access and early-bird tickets.",
};

export default function LaserTagPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hexforce Laser Tag"
        heading={
          <>
            Sector locked <Accent>{"// coming soon"}</Accent>
          </>
        }
        description="The Hexforce Arena is part of the wider Vault 42 world, but it isn't open yet. Here's what's coming, and how to get priority access when it unlocks."
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 py-16 lg:grid-cols-2">
        <Panel>
          <Tag tone="gold" className="mb-3 block">
            The arena
          </Tag>
          <Heading as="h2" size="card" className="mb-3">
            Storyline & game modes
          </Heading>
          <p className="mb-4 text-[0.97rem] leading-[1.75] text-text/72">
            Every session will be set inside the reclaimed Hexforce Arena — a maze of obstacles, cover and
            light rigs built into the bones of the old HEX Corp facility. Your Vault Custodian will brief
            you on the mission before every game, once the sector unlocks.
          </p>
          <BulletList
            items={[
              "Base Assault — capture and hold the enemy's core.",
              "Capture the Flag — classic two-team objective play.",
              "Zombies vs Survivors — one team infects, the other holds out.",
              "Domination — control the most zones to win.",
            ]}
          />
        </Panel>
        <Panel>
          <Tag tone="gold" className="mb-3 block">
            Equipment
          </Tag>
          <Heading as="h2" size="card" className="mb-3">
            Laserforce Gen 7
          </Heading>
          <p className="mb-4 text-[0.97rem] leading-[1.75] text-text/72">
            Vault 42 is fitting out the latest Laserforce Gen 7 battle suits — lightweight vests with live
            scoring, in-game power-ups and immersive sound effects synced to the arena.
          </p>
          <BulletList
            items={[
              "Live scoring shown on the arena screens after every game.",
              "In-game power-ups you'll unlock mid-session.",
              "Suits will adjust to fit ages 7 and up.",
            ]}
          />
        </Panel>
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 pb-16 lg:grid-cols-[1fr_420px]">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Expected launch
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            The Hexforce Arena, Wasteland Warriors Kids Club and the laser tag party packages all return
            once this sector unlocks. We haven&apos;t locked a launch date yet — when we do, it&apos;ll be
            announced on the News page first, with early access for anyone signed up below.
          </p>
        </Panel>
        <Panel>
          <Heading as="h2" size="card" className="mb-4">
            Get priority access
          </Heading>
          <InquiryForm
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
            ]}
            submitLabel="Notify Me"
            successMessage="You're on the list — enter your email to receive priority access and early-bird tickets when this sector unlocks."
          />
        </Panel>
      </section>
    </>
  );
}
