import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Header,
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
  Footer,
  StickyMobileBar,
  Heading,
  Accent,
} from "..";

/**
 * Assembles every organism together in roughly the same order as the
 * original reference page (design/reference/index.html), to prove the
 * library covers what's needed to build it — nothing here is page-specific
 * markup, it's all composed from the same components documented elsewhere
 * in this Storybook.
 */
function HomePagePreview() {
  return (
    <div className="bg-bg pb-16">
      <Header
        brandTitle="VAULT 42"
        brandSubtitle="A Division of Hex Corp"
        links={[
          { label: "Experiences", href: "#experiences" },
          { label: "Pricing", href: "#pricing" },
          { label: "Groups", href: "#groups" },
          { label: "Escape Rooms", href: "#rooms" },
          { label: "Book", href: "#book" },
        ]}
      />

      <Hero
        eyebrow="Nuneaton's immersive adventure destination"
        headingLead="STEP INTO"
        headingAccent="VAULT 42"
        headingOutline="AND SURVIVE"
        lead="A lost HEX Corp sanctuary. Reclaimed by nature. Still alive. Battle through Laserforce combat, test your nerve in augmented axe throwing, and get ready for the next phase of the vault."
        sub="Vault 42 blends post-apocalyptic worldbuilding, competitive gameplay and proper event energy into one cinematic destination."
        actions={[
          { label: "Book Your Adventure", href: "#book" },
          { label: "See Pricing", href: "#pricing", variant: "secondary" },
        ]}
        stats={[
          { value: "Laser Tag", label: "From £6.95 pp" },
          { value: "Axe Throwing", label: "From £20 pp" },
          { value: "Open in Nuneaton", label: "Book online now" },
        ]}
        card={{
          statusLabel: "Facility Status",
          statusNote: "Systems Active",
          items: [
            { label: "Book now", text: "Hexforce Laser Tag and augmented axe throwing are the live launch experiences." },
            { label: "Coming later", text: "Hexcape Escape Rooms are planned for a later phase." },
          ],
          chipActions: [
            { label: "Call 02476 954242", href: "tel:02476954242" },
            { label: "See what's planned", href: "#rooms" },
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
        description="In a world ravaged by the Great Collapse, HEX Corp's once-thriving technological sanctuary stands waiting to be reclaimed."
        steps={[
          { number: "01", text: "Bookable now: laser tag and axe throwing are the live launch offers." },
          { number: "02", text: "Clear future story: escape rooms are shown honestly as planned later." },
          { number: "03", text: "Mobile-first layout: clear actions, visible pricing, sticky booking buttons." },
        ]}
      />

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="experiences">
        <Heading as="h2" size="section" className="mb-8">
          What you can <Accent>book now</Accent>
        </Heading>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <CtaCard
            tag="Hexforce Laser Tag"
            title="Experience the ultimate adventure"
            description="Step into the Hexforce Arena, where Explorers navigate a post-apocalyptic battlefield."
            bullets={["Great for families, friends, youth groups and parties.", "Exclusive hire available for up to 30 players."]}
            actions={[
              { label: "See Laser Tag Pricing", href: "#pricing" },
              { label: "Book Laser Tag", href: "#book", variant: "secondary" },
            ]}
          />
          <CtaCard
            tag="Vault 42 Axe Throwing"
            title="Melee weapons training for the wasteland"
            description="Digital Champ Throw system with moving targets, real-time scoring and 16 interactive game modes."
            bullets={["Dynamic scoring and live feedback keep every session fresh."]}
            actions={[
              { label: "See Axe Pricing", href: "#pricing" },
              { label: "Book Axe Throwing", href: "#book", variant: "secondary" },
            ]}
          />
          <CtaCard
            tag="Hexcape Escape Rooms"
            title="Planned for a later launch phase"
            description="Hexcape is part of the wider Vault 42 world, but the escape rooms will not be open at launch."
            actions={[{ label: "Register Interest", href: "#book", variant: "secondary" }]}
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
          />
          <PriceCard
            title="Axe Throwing"
            description="Digital Champ Throw pricing by group size."
            rows={[
              { label: "2 Players", value: "£24 pp" },
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
              { title: "Birthday Parties", description: "Laser tag party packages with a private room and refreshments." },
              { title: "Corporate Team-Building", description: "Great for breaking routine and getting people involved." },
              { title: "Youth Groups & Scouts", description: "Mission-led play for organised groups and repeat visits." },
              { title: "SEN-Friendly Sessions", description: "A more considered option for groups that need calmer sessions." },
            ]}
          />
          <TileGridPanel
            title="Why Vault 42?"
            variant="feature"
            columns={2}
            items={[
              { title: "Immersive world", description: "Strong theming and a memorable visual style." },
              { title: "Real gameplay", description: "Proper interactive systems, not static props." },
              { title: "Simple booking path", description: "Clear offers and mobile-friendly action buttons." },
              { title: "Growth built in", description: "The escape rooms are already part of the story." },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto max-w-(--container-max) px-3.5 py-[86px]" id="rooms">
        <Heading as="h2" size="section" className="mb-8">
          Hexcape escape rooms are <Accent>coming later</Accent>
        </Heading>
        <TileGridPanel
          title="Future rooms"
          variant="muted"
          columns={3}
          items={[
            { title: "The Reactor Room", description: "Stabilise the failing power core before meltdown.", meta: ["60 minutes", "2-6 players", "Difficulty: ★★★★☆"] },
            { title: "The Bio-Dome", description: "Navigate a lab overrun by mutated plants.", meta: ["60 minutes", "2-6 players", "Difficulty: ★★★☆☆"] },
            { title: "The Command Centre", description: "Decrypt the past and hack the future.", meta: ["60 minutes", "2-6 players", "Difficulty: ★★★★★"] },
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
              <ActionRow title="Book online" description="Go straight to the live booking flow on vault42.uk" actionLabel="Open Site" href="https://vault42.uk" />
              <ActionRow title="Call now" description="Ask about parties, groups or launch availability" actionLabel="02476 954242" href="tel:02476954242" variant="secondary" />
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
            </div>
          </Panel>
        </div>
      </section>

      <Footer
        eyebrow="Vault 42"
        blurb="Vault 42 brings Hexforce Laser Tag and augmented axe throwing together inside one strong post-apocalyptic world."
        columns={[
          {
            title: "Navigate",
            links: [
              { label: "Experiences", href: "#experiences" },
              { label: "Pricing", href: "#pricing" },
              { label: "Groups", href: "#groups" },
              { label: "Book", href: "#book" },
            ],
          },
          {
            title: "Contact",
            links: [
              { label: "02476 954242", href: "tel:02476954242" },
              { label: "vault42.uk", href: "https://vault42.uk" },
              { label: "Nuneaton" },
            ],
          },
        ]}
        copyright="Vault 42® is a registered trade mark of Hex Box Limited · One-page launch site"
      />

      <StickyMobileBar primary={{ label: "See Pricing", href: "#pricing" }} secondary={{ label: "Book Now", href: "#book" }} />
    </div>
  );
}

const meta: Meta<typeof HomePagePreview> = {
  title: "Templates/Home Page Preview",
  component: HomePagePreview,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof HomePagePreview>;

export const Default: Story = {};
