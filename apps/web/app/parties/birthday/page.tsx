import type { Metadata } from "next";
import { PageHeader, Accent, PriceCard, Panel, Heading, BulletList } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Birthday Parties",
  description: "Themed birthday packages at Vault 42 — Command Centre, Skull Temple and Bio-Dome.",
};

export default function BirthdayPartiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Birthday Parties"
        heading={
          <>
            Themed packages for <Accent>kids, teens and adults</Accent>
          </>
        }
        description="Every package includes game time, a private party room and food — pick the theme that fits your Explorer."
        actions={[{ label: "Check a Date", href: "/contact" }]}
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <PriceCard
            title="Command Centre Package"
            description="Our classic laser tag party — the fastest way to book a great birthday."
            rows={[
              { label: "Per person", value: "£16.99" },
              { label: "Game time", value: "2 games" },
              { label: "Party room", value: "45 minutes" },
            ]}
            note="Includes refreshments and a dedicated Vault Custodian host."
          />
          <PriceCard
            title="Skull Temple Package"
            description="A mixed session blending laser tag and axe throwing for older groups."
            rows={[
              { label: "Per person", value: "£21.99" },
              { label: "Game time", value: "1 laser game + axe lane" },
              { label: "Party room", value: "45 minutes" },
            ]}
            note="Recommended for ages 10 and up. Includes refreshments."
          />
          <PriceCard
            title="Bio-Dome Package"
            description="Our premium party — extra game time, food and a goodie bag for every guest."
            rows={[
              { label: "Per person", value: "£24.99" },
              { label: "Game time", value: "3 games" },
              { label: "Party room", value: "60 minutes" },
            ]}
            note="Includes food, drinks and a Vault 42 goodie bag per guest."
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 pb-16 lg:grid-cols-2">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Custom add-ons
          </Heading>
          <BulletList
            items={[
              "Extra game or lane time",
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
          <BulletList
            items={[
              "A minimum group size applies to all party packages — check with the team when you enquire.",
              "Food allergies and dietary needs are catered for with advance notice.",
              "See our Food & Drink page for party menu options.",
            ]}
          />
        </Panel>
      </section>
    </>
  );
}
