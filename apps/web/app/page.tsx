import Image from "next/image";
import {
  Hero,
  Marquee,
  TileGrid,
  TileGridPanel,
  StoryTeaser,
  CtaCard,
  PriceCard,
  Panel,
  ActionRow,
  ContactItem,
  Callout,
  Heading,
  Accent,
} from "@vault42/ui";
import { bookingHref } from "@/lib/site-nav";

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Nuneaton's immersive adventure destination"
        headingLead="ENTER"
        headingAccent="VAULT 42"
        headingOutline="RECLAIM THE SANCTUARY"
        lead="In a world reshaped by the Great Collapse, HEX Corp's high-tech underground sanctuary stands waiting to be reclaimed. Phase 1 is live — your trial begins on the lanes."
        sub="Vault 42 blends post-apocalyptic worldbuilding, competitive gameplay and proper event energy into one cinematic destination for families, friends, parties, corporate groups and young explorers."
        backgroundImage="url('/brand/hero-wasteland.webp')"
        actions={[
          { label: "Book Axe Throwing", href: bookingHref },
          { label: "Explore Axe Throwing", href: "/axe-throwing", variant: "secondary" },
        ]}
        stats={[
          { value: "Axe Throwing", label: "From £20 pp" },
          { value: "Special Events", label: "18+ Murder Mystery Nights" },
          { value: "Open in Nuneaton", label: "Book online now" },
        ]}
        card={{
          statusLabel: "Facility Status",
          statusNote: "Critical Failure",
          statusTone: "critical",
          logo: (
            <div className="relative mx-auto aspect-4/3 w-full max-w-[220px]">
              <Image
                src="/brand/logo.webp"
                alt="Vault 42 logo with reclaimed vines"
                fill
                sizes="220px"
                className="object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.42)]"
              />
            </div>
          ),
          items: [
            { label: "Book now", text: "Vault 42 Axe Throwing is the live launch experience." },
            { label: "Sector locked", text: "Hexforce Laser Tag and Hexcape Escape Rooms are coming soon." },
          ],
          chipActions: [
            { label: "Call 02476 954242", href: "tel:02476954242" },
            { label: "See what's locked", href: "#laser-tag-soon" },
          ],
        }}
      />

      <div className="mx-auto -mt-7 max-w-(--container-max) px-3.5">
        <TileGrid
          variant="quick"
          columns={4}
          items={[
            { title: "Book Axe Throwing", description: "High-tech Champ Throw lanes with 16 interactive game modes." },
            { title: "Special Events", description: "HEX Corp Sabotage — an 18+ immersive murder mystery night." },
            { title: "Call Us", description: "02476 954242 for group bookings, questions or launch info." },
            { title: "Find Us", description: "Unit 1 - 2, Closers Business Centre, Avenue Road, Nuneaton." },
          ]}
        />
      </div>

      <Marquee
        className="mt-9"
        items={[
          "AUGMENTED AXE THROWING",
          "HEX CORP SABOTAGE NIGHTS",
          "BIRTHDAY PARTIES",
          "CORPORATE GROUPS",
          "LASER TAG — SECTOR LOCKED",
          "ESCAPE ROOMS — SECTOR LOCKED",
        ]}
      />

      <StoryTeaser
        eyebrow="The world of Vault 42"
        heading={
          <>
            A forgotten sanctuary. <Accent>A live adventure destination.</Accent>
          </>
        }
        description="In a world ravaged by the Great Collapse, HEX Corp's once-thriving technological sanctuary stands waiting to be reclaimed. As an Explorer, you'll test your precision in augmented axe throwing, uncover the HEX Corp Sabotage after hours, and watch Vault 42 grow into its next phase as more sectors come online."
        steps={[
          { number: "01", text: "Bookable now: augmented axe throwing is the live launch offer." },
          { number: "02", text: "Clear future story: laser tag and escape rooms are shown honestly as sector locked." },
          { number: "03", text: "Mobile-first layout: clear actions, visible pricing, sticky booking buttons." },
        ]}
        media={
          <Image
            src="/brand/guide-vine-lights.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 430px, 100vw"
            className="object-cover"
          />
        }
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="experiences">
        <Heading as="h2" size="section" className="mb-8">
          What you can <Accent>book now</Accent>
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <CtaCard
            tag="Vault 42 Axe Throwing — Live Now"
            title="Melee weapons training for the wasteland"
            description="Vault 42's digital Champ Throw system gives you moving targets, real-time scoring and 16 interactive game modes."
            bullets={[
              "Dynamic scoring and live feedback keep every session fresh.",
              "Perfect for all skill levels with guidance from your Vault Custodians.",
            ]}
            actions={[
              { label: "See Axe Pricing", href: "/pricing" },
              { label: "Learn More", href: "/axe-throwing", variant: "secondary" },
            ]}
          />
          <CtaCard
            tag="Hexforce Laser Tag — Sector Locked"
            title="Coming soon to the wasteland"
            description="Hexforce Laser Tag is part of the wider Vault 42 world, but the arena isn't open yet. Register for priority access and we'll let you know the moment it unlocks."
            bullets={[
              "Post-apocalyptic battlefield with live scoring and power-ups.",
              "Exclusive hire for up to 30 players once it launches.",
              "Wasteland Warriors Kids Club resumes once the arena is live.",
            ]}
            actions={[{ label: "Register Interest", href: "/laser-tag", variant: "secondary" }]}
          />
          <CtaCard
            tag="Hexcape Escape Rooms — Sector Locked"
            title="Planned for a later launch phase"
            description="Hexcape is part of the wider Vault 42 world, but the escape rooms will not be open at launch. They remain on the page because they are important to the long-term story."
            bullets={[
              "The Reactor Room: stabilise the failing power core before meltdown.",
              "The Bio-Dome: navigate a botanical lab overrun by mutation.",
              "The Command Centre: decrypt the past and access the truth behind the Collapse.",
            ]}
            actions={[{ label: "Register Interest", href: "/escape-rooms", variant: "secondary" }]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="special-events">
        <Heading as="h2" size="section" className="mb-8">
          Something darker <Accent>after hours</Accent>
        </Heading>
        <CtaCard
          tag="18+ · Night Operations"
          title="HEX Corp Sabotage: an immersive murder mystery night"
          description="A traitor is loose inside HEX Corp. Explorers work the case using live axe-throwing target trials to unlock evidence and catch them — before the night is out."
          bullets={[
            "Interactive investigation led by an in-character Game Master.",
            "Built for adult groups, work nights out and private celebrations.",
            "Corporate and private venue hire available.",
          ]}
          actions={[{ label: "Explore Special Events", href: "/events" }]}
        />
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="pricing">
        <Heading as="h2" size="section" className="mb-8">
          Simple pricing. <Accent>Easy to book.</Accent>
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <PriceCard
            title="Axe Throwing"
            description="Digital Champ Throw pricing by group size."
            rows={[
              { label: "2 Players", value: "£24 pp" },
              { label: "3 Players", value: "£23 pp" },
              { label: "4 Players", value: "£22 pp" },
              { label: "5 Players", value: "£21 pp" },
              { label: "6 Players", value: "£20 pp" },
            ]}
          />
          <PriceCard
            title="Laser Tag & Kids Club"
            description="Planned pricing — sector locked until launch."
            rows={[
              { label: "1 Game", value: "£6.95 pp" },
              { label: "Kids Club", value: "£10 pp" },
            ]}
            note="Register for priority access on the Laser Tag page — pricing is confirmed once the sector unlocks."
          />
          <PriceCard
            title="Night Operations"
            description="HEX Corp Sabotage: adults-only murder mystery night."
            rows={[
              { label: "Gameplay", value: "TBC" },
              { label: "Food & drink package", value: "TBC" },
            ]}
            note="Full pricing and dates confirmed soon — register interest on the Special Events page."
          />
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="groups">
        <Heading as="h2" size="section" className="mb-8">
          Built for <Accent>birthdays, groups and team days</Accent>
        </Heading>
        <div className="grid grid-cols-1 gap-5.5 lg:grid-cols-2">
          <TileGridPanel
            title="Perfect for"
            variant="muted"
            columns={2}
            items={[
              { title: "Birthday Parties", description: "Private party room packages with food and refreshments — Axe Throwing packages available now, laser tag packages return once that sector unlocks." },
              { title: "Corporate Team-Building", description: "Great for breaking routine, building energy and getting people properly involved rather than just standing around." },
              { title: "Youth Groups & Scouts", description: "Mission-led play that works brilliantly for organised groups and repeat visits." },
              { title: "SEN-Friendly Sessions", description: "A more considered option for groups that need calmer, more manageable experiences — ask when you book." },
            ]}
          />
          <TileGridPanel
            title="Why Vault 42?"
            variant="feature"
            columns={2}
            items={[
              { title: "Immersive world", description: "Strong theming, reclaimed HEX Corp identity and a memorable visual style." },
              { title: "Real gameplay", description: "Champ Throw delivers a proper interactive system, not static props — with Laserforce Gen 7 arena combat on the way." },
              { title: "Simple booking path", description: "Clear offers, visible prices, direct call option and mobile-friendly action buttons." },
              { title: "Growth built in", description: "Laser tag and the escape rooms are already part of the future story, so the brand can grow naturally over time." },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="laser-tag-soon">
        <Heading as="h2" size="section" className="mb-8">
          Hexforce Laser Tag is <Accent>sector locked</Accent>
        </Heading>
        <TileGridPanel
          title="What's coming"
          variant="muted"
          columns={2}
          items={[
            { title: "Base Assault", description: "Capture and hold the enemy's core." },
            { title: "Capture the Flag", description: "Classic two-team objective play." },
            { title: "Zombies vs Survivors", description: "One team infects, the other holds out." },
            { title: "Domination", description: "Control the most zones to win." },
          ]}
        />
        <Callout title="Get priority access" className="mt-6">
          Register on the Laser Tag page and we&apos;ll email you the moment the Hexforce Arena unlocks.
        </Callout>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="rooms">
        <Heading as="h2" size="section" className="mb-8">
          Hexcape escape rooms are <Accent>sector locked</Accent>
        </Heading>
        <TileGridPanel
          title="What's planned next"
          variant="muted"
          columns={3}
          items={[
            { title: "The Reactor Room", description: "Stabilise the failing power core before meltdown. Race against time to restore order.", meta: ["60 minutes", "2-6 players", "Difficulty: ★★★★☆"] },
            { title: "The Bio-Dome", description: "Navigate a lab overrun by mutated plants and uncover the secrets behind the experiment gone wrong.", meta: ["60 minutes", "2-6 players", "Difficulty: ★★★☆☆"] },
            { title: "The Command Centre", description: "Decrypt the past and hack the future. Uncover the secrets buried within Vault 42's mainframe.", meta: ["60 minutes", "2-6 players", "Difficulty: ★★★★★"] },
          ]}
        />
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="book">
        <Heading as="h2" size="section" className="mb-8">
          Ready to <Accent>enter the vault?</Accent>
        </Heading>
        <div className="grid grid-cols-1 gap-5.5 lg:grid-cols-2">
          <Panel>
            <Heading as="h3" size="card" className="mb-5 text-[#f4e8af]">
              Fastest booking actions
            </Heading>
            <div className="grid gap-3">
              <ActionRow title="See pricing" description="Check prices for axe throwing, parties and special events" actionLabel="View Pricing" href="/pricing" />
              <ActionRow title="Call now" description="Ask about parties, groups, launch availability or the best fit" actionLabel="02476 954242" href="tel:02476954242" variant="secondary" />
              <ActionRow title="Laser tag interest" description="Ask about the Hexforce Arena launch and get priority access" actionLabel="Register Interest" href="/laser-tag" variant="secondary" />
              <ActionRow title="Escape room interest" description="Ask about the future Hexcape phase and launch updates" actionLabel="Register Interest" href="/escape-rooms" variant="secondary" />
            </div>
            <Callout title="Launch-ready message">
              Book axe throwing now. Keep laser tag and escape rooms as a clear future promise, not a launch-day confusion point.
            </Callout>
          </Panel>
          <Panel>
            <Heading as="h3" size="card" className="mb-5 text-[#f4e8af]">
              Contact & location
            </Heading>
            <div className="grid gap-3.5">
              <ContactItem label="Phone" href="tel:02476954242">
                02476 954242
              </ContactItem>
              <ContactItem label="Website" href="https://vault42.uk">
                vault42.uk
              </ContactItem>
              <ContactItem label="Address">Unit 1 - 2, Closers Business Centre, Avenue Road, Nuneaton, CV11 4ND</ContactItem>
              <ContactItem label="Trade mark">Vault 42® is a registered trade mark of Hex Box Limited</ContactItem>
            </div>
          </Panel>
        </div>
      </section>
    </>
  );
}
