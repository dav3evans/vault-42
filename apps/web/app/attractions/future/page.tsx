import type { Metadata } from "next";
import { PageHeader, Accent, TileGrid, Panel, Heading, InquiryForm } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Future Attractions",
  description: "VR escape rooms, a laser maze and a pixel floor — future attractions under consideration for Vault 42.",
};

export default function FutureAttractionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Future Attractions"
        heading={
          <>
            What&apos;s next for <Accent>the Vault</Accent>
          </>
        }
        description="Vault 42 is designed to grow. These are early ideas we're exploring for future phases — nothing here is confirmed or scheduled yet."
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <TileGrid
          variant="feature"
          columns={3}
          items={[
            { title: "VR Escape Rooms", description: "A fully virtual companion to Hexcape, for solo Explorers or small groups." },
            { title: "Laser Maze", description: "A timed, obstacle-lit maze testing speed and precision rather than combat." },
            { title: "Pixel Floor", description: "An interactive light-up floor for reaction games, ideal for younger visitors and parties." },
          ]}
        />
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 pb-16 lg:grid-cols-[1fr_420px]">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Help shape what we build
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            None of these are funded or scheduled yet — they&apos;re ideas on the table. If one of them
            would get you back through the door, tell us. Genuine interest is what turns a teaser into
            a real build.
          </p>
        </Panel>
        <Panel>
          <Heading as="h2" size="card" className="mb-4">
            Register your interest
          </Heading>
          <InquiryForm
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "interest", label: "Which attraction interests you most?", required: true },
            ]}
            submitLabel="Submit"
            successMessage="Thanks — we're logging every response as we plan the next phase."
          />
        </Panel>
      </section>
    </>
  );
}
