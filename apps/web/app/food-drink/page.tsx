import type { Metadata } from "next";
import { PageHeader, Accent, PriceCard, Panel, Heading, BulletList } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Food & Drink",
  description: "Pizza, snacks, party food and the café/lounge area at Vault 42.",
};

export default function FoodDrinkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Food & Drink"
        heading={
          <>
            Fuel up between <Accent>games</Accent>
          </>
        }
        description="A simple menu of pizza, snacks and drinks — plus a lounge area for parents and anyone sitting a game out."
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <PriceCard
            title="Pizza"
            rows={[
              { label: "Cheese & Tomato (10\")", value: "£7.50" },
              { label: "Pepperoni (10\")", value: "£8.50" },
              { label: "Vault Special, loaded (10\")", value: "£9.50" },
              { label: "Vegan Cheese & Tomato (10\")", value: "£8.50" },
            ]}
          />
          <PriceCard
            title="Snacks & Drinks"
            rows={[
              { label: "Nachos & Dip", value: "£4.50" },
              { label: "Chicken Goujons", value: "£5.00" },
              { label: "Soft Drink", value: "£2.20" },
              { label: "Hot Drink", value: "£2.50" },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 pb-16 lg:grid-cols-2">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Party food & dietary needs
          </Heading>
          <BulletList
            items={[
              "Vegetarian and vegan pizza options available on every party package.",
              "Let us know about allergies or dietary requirements when you book.",
              "Party platters can be scaled up for larger groups.",
            ]}
          />
        </Panel>
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            The lounge
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            A café/lounge area sits just off the main arena — a quiet spot with seating, hot drinks and
            a view of the action for parents, spectators or anyone taking a breather between games.
          </p>
        </Panel>
      </section>
    </>
  );
}
