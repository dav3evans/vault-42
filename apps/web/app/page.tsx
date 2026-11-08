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
            { label: "Live now", text: "Vault 42 Axe Throwing — digital Champ Throw lanes, open today." },
            { label: "After hours", text: "HEX Corp Sabotage — an 18+ immersive murder mystery night." },
          ],
          chipActions: [{ label: "Call 02476 954242", href: "tel:02476954242" }],
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
          "CHAMP THROW GAME MODES",
          "HEX CORP SABOTAGE NIGHTS",
          "BIRTHDAY PARTIES",
          "CORPORATE GROUPS",
          "VAULT CUSTODIAN GUIDED",
        ]}
      />

      <StoryTeaser
        eyebrow="The world of Vault 42"
        heading={
          <>
            A forgotten sanctuary. <Accent>A live adventure destination.</Accent>
          </>
        }
        description="In a world ravaged by the Great Collapse, HEX Corp's once-thriving technological sanctuary stands waiting to be reclaimed. As an Explorer, you'll test your precision in augmented axe throwing and uncover the HEX Corp Sabotage after hours."
        steps={[
          { number: "01", text: "Augmented axe throwing — moving targets, real-time scoring, 16 game modes." },
          { number: "02", text: "After hours: HEX Corp Sabotage, an 18+ immersive murder mystery night." },
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

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="axe-throwing">
        <Heading as="h2" size="section" className="mb-8">
          Vault 42 <Accent>Axe Throwing</Accent>
        </Heading>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr]">
          <CtaCard
            tag="Live Now"
            title="Melee weapons training for the wasteland"
            description="Vault 42's digital Champ Throw system gives you moving targets, real-time scoring and 16 interactive game modes — guided by your Vault Custodians from first throw to last."
            bullets={[
              "Dynamic scoring and live feedback keep every session fresh.",
              "Perfect for all skill levels, from first-timers to seasoned throwers.",
              "Individual, group and corporate lanes, plus party bookings by enquiry.",
            ]}
            actions={[
              { label: "Book Axe Throwing", href: bookingHref },
              { label: "Learn More", href: "/axe-throwing", variant: "secondary" },
            ]}
          />
          <PriceCard
            title="Pricing"
            description="Digital Champ Throw pricing by group size."
            rows={[
              { label: "2 Players", value: "£24 pp" },
              { label: "3 Players", value: "£23 pp" },
              { label: "4 Players", value: "£22 pp" },
              { label: "5 Players", value: "£21 pp" },
              { label: "6 Players", value: "£20 pp" },
            ]}
            note="No hidden fees — the price per player drops automatically as your group grows."
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
            "Corporate and private venue hire available — dates and pricing confirmed soon.",
          ]}
          actions={[{ label: "Explore Special Events", href: "/events" }]}
        />
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
              { title: "Birthday Parties", description: "Private party room packages with food and refreshments, by enquiry." },
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
              { title: "Real gameplay", description: "Champ Throw delivers a proper interactive system, not static props." },
              { title: "Simple booking path", description: "Clear offers, visible prices, direct call option and mobile-friendly action buttons." },
              { title: "After-hours events", description: "HEX Corp Sabotage brings a different kind of night out, built around the same lanes." },
            ]}
          />
        </div>
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
              <ActionRow title="Book axe throwing" description="Instant booking via Wanna Book, our booking partner" actionLabel="Book Now" href={bookingHref} />
              <ActionRow title="Call now" description="Ask about parties, groups or the best fit for your visit" actionLabel="02476 954242" href="tel:02476954242" variant="secondary" />
            </div>
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
