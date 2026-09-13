import type { Meta, StoryObj } from "@storybook/react-vite";
import { Hero } from "./Hero";

const meta: Meta<typeof Hero> = {
  title: "Organisms/Hero",
  component: Hero,
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "Nuneaton's immersive adventure destination",
    headingLead: "STEP INTO",
    headingAccent: "VAULT 42",
    headingOutline: "AND SURVIVE",
    lead: "A lost HEX Corp sanctuary. Reclaimed by nature. Still alive. Battle through Laserforce combat, test your nerve in augmented axe throwing, and get ready for the next phase of the vault.",
    sub: "Vault 42 blends post-apocalyptic worldbuilding, competitive gameplay and proper event energy into one cinematic destination for families, friends, parties, corporate groups and young explorers.",
    actions: [
      { label: "Book Your Adventure", href: "#book", variant: "primary" },
      { label: "See Pricing", href: "#pricing", variant: "secondary" },
    ],
    stats: [
      { value: "Laser Tag", label: "From £6.95 pp" },
      { value: "Axe Throwing", label: "From £20 pp" },
      { value: "Open in Nuneaton", label: "Book online now" },
    ],
    card: {
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
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {};

export const WithoutCard: Story = {
  args: { card: undefined },
};
