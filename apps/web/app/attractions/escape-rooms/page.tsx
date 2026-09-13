import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader, Accent, TileGridPanel, Panel, Heading, InquiryForm } from "@vault42/ui";

export const metadata: Metadata = {
  title: "Hexcape Escape Rooms",
  description: "The Reactor Room, the Bio-Dome and the Command Centre — Vault 42's escape rooms, planned for a later launch phase.",
};

export default function EscapeRoomsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Hexcape Escape Rooms"
        heading={
          <>
            Planned for a <Accent>later launch phase</Accent>
          </>
        }
        description="Hexcape is part of the wider Vault 42 world, but the escape rooms will not be open at launch. They're shown here honestly, because they're central to where the Vault is heading."
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-16">
        <TileGridPanel
          title="The rooms in development"
          variant="muted"
          columns={3}
          items={[
            {
              title: "The Reactor Room",
              description: "Stabilise the failing power core before meltdown. Race against time to restore order.",
              meta: ["60 minutes", "2-6 players", "Difficulty: ★★★★☆"],
            },
            {
              title: "The Bio-Dome",
              description: "Navigate a botanical lab overrun by mutation and uncover the secrets behind the experiment gone wrong.",
              meta: ["60 minutes", "2-6 players", "Difficulty: ★★★☆☆"],
            },
            {
              title: "The Command Centre",
              description: "Decrypt the past and access the truth behind the Collapse, buried deep in Vault 42's mainframe.",
              meta: ["60 minutes", "2-6 players", "Difficulty: ★★★★★"],
            },
          ]}
        />
      </section>

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 pb-16 lg:grid-cols-[1fr_420px]">
        <Panel>
          <Heading as="h2" size="card" className="mb-3">
            Expected launch
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            The Hexcape rooms are in active development alongside the rest of the facility build. We
            haven&apos;t locked a launch date yet — when we do, it&apos;ll be announced on the{" "}
            <Link href="/news" className="text-gold no-underline">
              News
            </Link>{" "}
            page first, with early access for anyone signed up below.
          </p>
        </Panel>
        <Panel>
          <Heading as="h2" size="card" className="mb-4">
            Get early access
          </Heading>
          <InquiryForm
            fields={[
              { name: "name", label: "Name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
            ]}
            submitLabel="Notify Me"
            successMessage="You're on the list — we'll email you the moment Hexcape opens for booking."
          />
        </Panel>
      </section>
    </>
  );
}
