import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "./Footer";

const meta: Meta<typeof Footer> = {
  title: "Organisms/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "Vault 42",
    blurb:
      "Vault 42 brings Hexforce Laser Tag and augmented axe throwing together inside one strong post-apocalyptic world, with Hexcape escape rooms planned for a later phase.",
    columns: [
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
    ],
    copyright: "Vault 42® is a registered trade mark of Hex Box Limited · One-page launch site",
  },
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
