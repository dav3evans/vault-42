import type { Metadata } from "next";
import { PageHeader, Accent, Panel, Heading, Eyebrow, Tag } from "@vault42/ui";

export const metadata: Metadata = {
  title: "The Vault 42 Story",
  description: "The Great Collapse, HEX Corp, NEXUS AI, the Cult of the Skull, and the Vault Custodians who keep Vault 42 running.",
};

const custodians = [
  {
    name: "Custodian Voss",
    role: "Arena Marshal, Hexforce Laser Tag",
    quote: "I've run a thousand briefings. Every group thinks they've got a strategy. Ten minutes in, it's chaos — good chaos.",
  },
  {
    name: "Custodian Reyes",
    role: "Lane Master, Champ Throw",
    quote: "Axe throwing isn't about strength. Watch someone's second throw, not their first — that's when you see if they're actually listening.",
  },
  {
    name: "Custodian Okafor",
    role: "Systems Liaison",
    quote: "NEXUS still talks to us, technically. Mostly diagnostics. Sometimes something stranger. We keep records either way.",
  },
];

export default function StoryPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Vault 42 Story"
        heading={
          <>
            Behind the reclaimed walls of <Accent>HEX Corp</Accent>
          </>
        }
        description="Vault 42 isn't a themed backdrop — it's a world with a timeline, factions and unanswered questions. Here's what we know so far."
      />

      <section className="mx-auto grid max-w-(--container-max) grid-cols-1 gap-5 px-3.5 py-16">
        <Panel accentTop>
          <Tag tone="gold" className="mb-3 block">
            Chapter One
          </Tag>
          <Heading as="h2" size="card" className="mb-3">
            The Great Collapse
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Nobody agrees on exactly what happened. What&apos;s certain is that HEX Corp&apos;s research
            division went dark almost overnight, and the facility it left behind — Vault 42 — sat
            sealed for years. When it was finally reopened, nature had already moved in: vines through
            the ventilation, moss over the reactor housing, and systems that, against every expectation,
            were still quietly running.
          </p>
        </Panel>

        <Panel accentTop>
          <Tag tone="gold" className="mb-3 block">
            Chapter Two
          </Tag>
          <Heading as="h2" size="card" className="mb-3">
            HEX Corp & NEXUS AI
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Before the Collapse, HEX Corp built its research sanctuary around NEXUS — an AI system
            responsible for security, environmental control and the arena systems themselves. NEXUS
            was never fully shut down. Fragments of it still manage the facility today: the lighting,
            the scoring systems, the &quot;Systems Active&quot; status you&apos;ll see flagged around the
            Vault. What NEXUS remembers from before the Collapse is a different question entirely.
          </p>
        </Panel>

        <Panel accentTop>
          <Tag tone="gold" className="mb-3 block">
            Chapter Three
          </Tag>
          <Heading as="h2" size="card" className="mb-3">
            The Cult of the Skull
          </Heading>
          <p className="text-[0.97rem] leading-[1.75] text-text/72">
            Not everyone who found Vault 42 wanted to reopen it responsibly. The Cult of the Skull
            emerged from a splinter group of early explorers who believed the facility — and NEXUS
            itself — should be worshipped rather than studied. Their symbol still turns up scratched
            into maintenance corridors. The Skull Temple party package borrows their name, if not
            quite their philosophy.
          </p>
        </Panel>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Eyebrow>Meet the team</Eyebrow>
        <Heading as="h2" size="section" className="mb-8">
          The <Accent>Vault Custodians</Accent>
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {custodians.map((custodian) => (
            <Panel key={custodian.name} accentTop={false}>
              <p className="font-display text-[1.3rem] leading-[1.15] tracking-[0.02em] text-[#f4e8af]">
                &ldquo;{custodian.quote}&rdquo;
              </p>
              <div className="mt-5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted-2">
                {custodian.name} · {custodian.role}
              </div>
            </Panel>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 pb-16">
        <Panel innerClassName="p-0" accentTop={false}>
          <div className="border-b border-gold/10 px-6 py-4">
            <span className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-gold">
              NEXUS Terminal — Fragment Log
            </span>
          </div>
          <div className="grid gap-2 px-6 py-6 font-mono text-[0.82rem] leading-[1.9] text-[#8bd178]">
            <p>&gt; diagnostic.run() ... complete.</p>
            <p>&gt; arena_systems: ONLINE</p>
            <p>&gt; visitor_log: +1 new Explorer detected</p>
            <p>&gt; memory_fragment_0442: [CORRUPTED]</p>
            <p>&gt; awaiting further instruction_</p>
          </div>
        </Panel>
      </section>
    </>
  );
}
