import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Accent, PriceCard, Panel, Heading, BulletList, Callout } from "@vault42/ui";

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
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
          <PriceCard
            title="Axe Throwing"
            description="Standard lane pricing applies — the base for every party."
            rows={[
              { label: "2 Players", value: "£24 pp" },
              { label: "3 Players", value: "£23 pp" },
              { label: "4 Players", value: "£22 pp" },
              { label: "5 Players", value: "£21 pp" },
              { label: "6 Players", value: "£20 pp" },
            ]}
            note="Add a private party room and food, then enquire with your group size for a full quote."
          />
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
            <Callout title="Good to know" className="mt-5">
              A minimum group size applies — check with the team when you enquire. Food allergies and
              dietary needs are catered for with advance notice; see our{" "}
              <Link href="/food-drink" className="text-gold no-underline">
                Food &amp; Drink
              </Link>{" "}
              page for party menu options.
            </Callout>
          </Panel>
        </div>
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
