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

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Nuneaton's immersive adventure destination"
        headingLead="STEP INTO"
        headingAccent="VAULT 42"
        headingOutline="AND SURVIVE"
        lead="A lost HEX Corp sanctuary. Reclaimed by nature. Still alive. Battle through Laserforce combat, test your nerve in augmented axe throwing, and get ready for the next phase of the vault."
        sub="Vault 42 blends post-apocalyptic worldbuilding, competitive gameplay and proper event energy into one cinematic destination for families, friends, parties, corporate groups and young explorers."
        backgroundImage="url('/brand/hero-wasteland.webp')"
        actions={[
          { label: "Book Your Adventure", href: "/pricing" },
          { label: "See Pricing", href: "/pricing", variant: "secondary" },
        ]}
        stats={[
          { value: "Laser Tag", label: "From £6.95 pp" },
          { value: "Axe Throwing", label: "From £20 pp" },
          { value: "Open in Nuneaton", label: "Book online now" },
        ]}
        card={{
          statusLabel: "Facility Status",
          statusNote: "Systems Active",
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
            { label: "Book now", text: "Hexforce Laser Tag and augmented axe throwing are the live launch experiences." },
            { label: "Coming later", text: "Hexcape Escape Rooms are planned for a later phase." },
          ],
          chipActions: [
            { label: "Call 02476 954242", href: "tel:02476954242" },
            { label: "See what's planned", href: "/attractions/escape-rooms" },
          ],
        }}
      />

      <div className="mx-auto -mt-7 max-w-(--container-max) px-3.5">
        <TileGrid
          variant="quick"
          columns={4}
          items={[
            { title: "Book Laser Tag", description: "Fastest route for families, groups, parties and first-time visitors." },
            { title: "Book Axe Throwing", description: "High-tech Champ Throw lanes with 16 interactive game modes." },
            { title: "Call Us", description: "02476 954242 for group bookings, questions or launch info." },
            { title: "Find Us", description: "Unit 1 - 2, Closers Business Centre, Avenue Road, Nuneaton." },
          ]}
        />
      </div>

      <Marquee
        className="mt-9"
        items={[
          "LASERFORCE GEN 7 ACTION",
          "AUGMENTED AXE THROWING",
          "BIRTHDAY PARTIES",
          "CORPORATE GROUPS",
          "WASTELAND WARRIORS KIDS CLUB",
          "ESCAPE ROOMS COMING LATER",
        ]}
      />

      <StoryTeaser
        eyebrow="The world of Vault 42"
        heading={
          <>
            A forgotten sanctuary. <Accent>A live adventure destination.</Accent>
          </>
        }
        description="In a world ravaged by the Great Collapse, HEX Corp's once-thriving technological sanctuary stands waiting to be reclaimed. As an Explorer, you'll sharpen your reflexes in Hexforce Laser Tag, test your precision in augmented axe throwing, and watch Vault 42 grow into its next phase over time."
        steps={[
          { number: "01", text: "Bookable now: laser tag and axe throwing are the live launch offers." },
          { number: "02", text: "Clear future story: escape rooms are shown honestly as planned later." },
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
            tag="Hexforce Laser Tag"
            title="Experience the ultimate adventure"
            description="Step into the Hexforce Arena, where Explorers navigate a post-apocalyptic battlefield filled with high-tech obstacles and strategic challenges."
            bullets={[
              "Great for families, friends, youth groups, parties and competitive sessions.",
              "Exclusive hire available for up to 30 players.",
              "Wasteland Warriors Kids Club runs every Saturday and Sunday at 10:20 AM.",
            ]}
            actions={[
              { label: "See Laser Tag Pricing", href: "/pricing" },
              { label: "Learn More", href: "/attractions/laser-tag", variant: "secondary" },
            ]}
          />
          <CtaCard
            tag="Vault 42 Axe Throwing"
            title="Melee weapons training for the wasteland"
            description="Vault 42's digital Champ Throw system gives you moving targets, real-time scoring and 16 interactive game modes."
            bullets={[
              "Dynamic scoring and live feedback keep every session fresh.",
              "Perfect for all skill levels with guidance from your Vault Custodians.",
            ]}
            actions={[
              { label: "See Axe Pricing", href: "/pricing" },
              { label: "Learn More", href: "/attractions/axe-throwing", variant: "secondary" },
            ]}
          />
          <CtaCard
            tag="Hexcape Escape Rooms"
            title="Planned for a later launch phase"
            description="Hexcape is part of the wider Vault 42 world, but the escape rooms will not be open at launch. They remain on the page because they are important to the long-term story."
            bullets={[
              "The Reactor Room: stabilise the failing power core before meltdown.",
              "The Bio-Dome: navigate a botanical lab overrun by mutation.",
              "The Command Centre: decrypt the past and access the truth behind the Collapse.",
            ]}
            actions={[{ label: "Register Interest", href: "/attractions/escape-rooms", variant: "secondary" }]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="pricing">
        <Heading as="h2" size="section" className="mb-8">
          Simple pricing. <Accent>Easy to book.</Accent>
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <PriceCard
            title="Laser Tag"
            description="Standard sessions for casual visits, repeat games and quick decisions."
            rows={[
              { label: "1 Game", value: "£6.95 pp" },
              { label: "2 Games", value: "£11.95 pp" },
              { label: "3 Games", value: "£14.95 pp" },
            ]}
            note="Exclusive hire: 1 game £130 · 2 games £230 · 3 games £300 for up to 30 players."
          />
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
            title="Parties & Kids Club"
            description="Clear launch-friendly offers for birthdays and younger players."
            rows={[
              { label: "Laser Tag Party Package", value: "£16.99 pp" },
              { label: "Kids Club", value: "£10 pp" },
            ]}
            note="Party package includes 2 games, private party room and refreshments. Kids Club is 1.5 hours, every Saturday and Sunday at 10:20 AM."
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
              { title: "Birthday Parties", description: "Laser tag party packages with a private room and refreshments, plus the right level of energy for kids and teens." },
              { title: "Corporate Team-Building", description: "Great for breaking routine, building energy and getting people properly involved rather than just standing around." },
              { title: "Youth Groups & Scouts", description: "Mission-led play that works brilliantly for organised groups and repeat visits." },
              { title: "SEN-Friendly Sessions", description: "A more considered option for groups that need calmer, more manageable experiences." },
            ]}
          />
          <TileGridPanel
            title="Why Vault 42?"
            variant="feature"
            columns={2}
            items={[
              { title: "Immersive world", description: "Strong theming, reclaimed HEX Corp identity and a memorable visual style." },
              { title: "Real gameplay", description: "Laserforce Gen 7 and Champ Throw both deliver proper interactive systems, not static props." },
              { title: "Simple booking path", description: "Clear offers, visible prices, direct call option and mobile-friendly action buttons." },
              { title: "Growth built in", description: "The escape rooms are already part of the future story, so the brand can grow naturally over time." },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="rooms">
        <Heading as="h2" size="section" className="mb-8">
          Hexcape escape rooms are <Accent>coming later</Accent>
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
              <ActionRow title="See pricing" description="Check prices for laser tag, axe throwing and parties" actionLabel="View Pricing" href="/pricing" />
              <ActionRow title="Call now" description="Ask about parties, groups, launch availability or the best fit" actionLabel="02476 954242" href="tel:02476954242" variant="secondary" />
              <ActionRow title="Escape room interest" description="Ask about the future Hexcape phase and launch updates" actionLabel="Register Interest" href="/attractions/escape-rooms" variant="secondary" />
            </div>
            <Callout title="Launch-ready message">
              Book laser tag and axe throwing now. Keep escape rooms as a future promise, not a launch-day confusion point.
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
