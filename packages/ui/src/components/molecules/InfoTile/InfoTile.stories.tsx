import type { Meta, StoryObj } from "@storybook/react-vite";
import { InfoTile } from "./InfoTile";

const meta: Meta<typeof InfoTile> = {
  title: "Molecules/InfoTile",
  component: InfoTile,
  argTypes: {
    variant: { control: "select", options: ["quick", "feature", "muted"] },
  },
};

export default meta;
type Story = StoryObj<typeof InfoTile>;

export const Quick: Story = {
  args: {
    variant: "quick",
    title: "Book Laser Tag",
    children: "Fastest route for families, groups, parties and first-time visitors.",
  },
  render: (args) => (
    <div className="w-64">
      <InfoTile {...args} />
    </div>
  ),
};

export const Feature: Story = {
  args: {
    variant: "feature",
    title: "Immersive world",
    children: "Strong theming, reclaimed HEX Corp identity and a memorable visual style.",
  },
  render: Quick.render,
};

export const Muted: Story = {
  args: {
    variant: "muted",
    title: "Birthday Parties",
    children: "Laser tag party packages with a private room and refreshments.",
  },
  render: Quick.render,
};

export const MutedWithMeta: Story = {
  args: {
    variant: "muted",
    title: "The Reactor Room",
    children: "Stabilise the failing power core before meltdown.",
    meta: ["60 minutes", "2-6 players", "Difficulty: ★★★★☆"],
  },
  render: Quick.render,
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid max-w-3xl grid-cols-3 gap-4">
      <InfoTile variant="quick" title="Book Laser Tag">
        Fastest route for families, groups, parties and first-time visitors.
      </InfoTile>
      <InfoTile variant="feature" title="Real gameplay">
        Laserforce Gen 7 and Champ Throw both deliver proper interactive systems.
      </InfoTile>
      <InfoTile variant="muted" title="Youth Groups & Scouts">
        Mission-led play that works brilliantly for organised groups.
      </InfoTile>
    </div>
  ),
};
