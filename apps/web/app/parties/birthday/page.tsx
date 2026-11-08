import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Accent, TileGridPanel, Panel, Heading, BulletList } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Birthday Parties",
  description: "Axe Throwing birthday parties at Vault 42, with a private party room and food.",
};

export default function BirthdayPartiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Birthday Parties"
        heading={
          <>
            Axe Throwing parties for <Accent>kids, teens and adults</Accent>
          </>
        }
        description="A private party room, food, and a Vault Custodian running the lanes — pick your group size and we'll build the party around it."
        actions={[{ label: "Check a Date", href: "/contact" }]}
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <TileGridPanel
          title="Ways to book"
          variant="feature"
          columns={3}
          items={[
            {
              title: "Lane-Only Celebration",
              description: "Straight onto the Champ Throw lanes — pricing scales with group size, from £24pp for 2 players down to £20pp for 6.",
            },
            {
              title: "Private Party Room",
              description: "Lane time plus a dedicated party room, with food laid on and a Vault Custodian running the session.",
            },
            {
              title: "Full Celebration Package",
              description: "Lane time, party room, food and a goodie bag for every guest — tell us your numbers and we'll build it around you.",
            },
          ]}
        />
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 pb-16 lg:grid-cols-2">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Custom add-ons
          </Heading>
          <BulletList
            items={[
              "Extra lane time",
              "Personalised cake table setup",
              "Upgraded goodie bags",
              "Additional party room time",
            ]}
          />
        </Panel>
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Good to know
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            A minimum group size applies — check with the team when you enquire. Food allergies and
            dietary needs are catered for with advance notice; see our{" "}
            <Link href="/food-drink" className="text-gold no-underline">
              Food &amp; Drink
            </Link>{" "}
            page for party menu options.
          </p>
        </Panel>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Panel accentTop={false}>
          <Heading as="h2" size="card" className="mb-3">
            Coming later: themed laser tag packages
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Command Centre, Skull Temple and Bio-Dome — our themed laser tag and mixed-session party
            packages — return once Hexforce Laser Tag unlocks. Register interest on the{" "}
            <Link href="/laser-tag" className="text-gold no-underline">
              Laser Tag
            </Link>{" "}
            page to hear first.
          </p>
        </Panel>
      </section>
    </>
  );
}
