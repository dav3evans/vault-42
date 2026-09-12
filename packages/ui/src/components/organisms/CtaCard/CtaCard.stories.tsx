import type { Meta, StoryObj } from "@storybook/react-vite";
import { CtaCard, type CtaCardProps } from "./CtaCard";

const meta: Meta<typeof CtaCard> = {
  title: "Organisms/CtaCard",
  component: CtaCard,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof CtaCard>;

const laserTagProps: CtaCardProps = {
  tag: "Hexforce Laser Tag",
  title: "Experience the ultimate adventure",
  description:
    "Step into the Hexforce Arena, where Explorers navigate a post-apocalyptic battlefield filled with high-tech obstacles and strategic challenges.",
  bullets: [
    "Great for families, friends, youth groups, parties and competitive sessions.",
    "Exclusive hire available for up to 30 players.",
    "Wasteland Warriors Kids Club runs every Saturday and Sunday at 10:20 AM.",
  ],
  actions: [
    { label: "See Laser Tag Pricing", href: "#pricing", variant: "primary" },
    { label: "Book Laser Tag", href: "#book", variant: "secondary" },
  ],
};

const axeThrowingProps: CtaCardProps = {
  tag: "Vault 42 Axe Throwing",
  title: "Melee weapons training for the wasteland",
  description:
    "Digital Champ Throw system with moving targets, real-time scoring and 16 interactive game modes.",
  bullets: [
    "Dynamic scoring and live feedback keep every session fresh.",
    "Perfect for all skill levels with guidance from your Vault Custodians.",
  ],
  actions: [
    { label: "See Axe Pricing", href: "#pricing" },
    { label: "Book Axe Throwing", href: "#book", variant: "secondary" },
  ],
};

const comingSoonProps: CtaCardProps = {
  tag: "Hexcape Escape Rooms",
  title: "Planned for a later launch phase",
  description:
    "Hexcape is part of the wider Vault 42 world, but the escape rooms will not be open at launch.",
  actions: [{ label: "Register Interest", href: "#book", variant: "secondary" }],
};

export const LaserTag: Story = {
  args: laserTagProps,
  render: (args) => (
    <div className="max-w-md">
      <CtaCard {...args} />
    </div>
  ),
};

export const ComingSoon: Story = {
  args: comingSoonProps,
  render: LaserTag.render,
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      <CtaCard {...laserTagProps} />
      <CtaCard {...axeThrowingProps} />
      <CtaCard {...comingSoonProps} />
    </div>
  ),
};
