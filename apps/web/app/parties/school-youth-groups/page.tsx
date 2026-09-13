import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, BulletList, Callout } from "@vault42/ui";

export const metadata: Metadata = {
  title: "School & Youth Groups",
  description: "Educational tie-ins and group discounts for schools, scouts and youth groups at Vault 42.",
};

export default function SchoolYouthGroupsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Schools & Youth Groups"
        heading={
          <>
            Mission-led play with a <Accent>purpose</Accent>
          </>
        }
        description="The Vault 42 world is built around problem-solving, teamwork and quick thinking — which makes it a natural fit for organised groups, not just parties."
        actions={[{ label: "Ask About a Group Visit", href: "/contact" }]}
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 py-16 lg:grid-cols-2">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Educational tie-ins
          </Heading>
          <BulletList
            items={[
              "Objective-based laser tag modes reward communication and strategy, not just speed.",
              "Axe throwing builds focus and hand-eye coordination under guided supervision.",
              "The Vault 42 lore gives group leaders a ready-made theme for the visit.",
              "Great for scouts, guides, school trips and holiday clubs.",
            ]}
          />
        </Panel>
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Group discounts
          </Heading>
          <p className="mb-4 text-[0.97rem] leading-[1.75] text-text/72">
            Organised groups booking in advance qualify for discounted per-person rates on both laser
            tag and axe throwing — the bigger the group, the more it&apos;s worth calling ahead.
          </p>
          <Callout title="Plan ahead">
            Group rates and risk assessments are available on request — get in touch at least two weeks
            before your visit so we can prepare the arena for your group&apos;s session.
          </Callout>
        </Panel>
      </section>
    </>
  );
}
