import type { Meta, StoryObj } from "@storybook/react-vite";
import { TileGridPanel } from "./TileGridPanel";

const meta: Meta<typeof TileGridPanel> = {
  title: "Organisms/TileGridPanel",
  component: TileGridPanel,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TileGridPanel>;

export const PerfectFor: Story = {
  args: {
    title: "Perfect for",
    variant: "muted",
    columns: 2,
    items: [
      { title: "Birthday Parties", description: "Laser tag party packages with a private room and refreshments." },
      { title: "Corporate Team-Building", description: "Great for breaking routine and getting people properly involved." },
      { title: "Youth Groups & Scouts", description: "Mission-led play that works brilliantly for organised groups." },
      { title: "SEN-Friendly Sessions", description: "A more considered option for groups that need calmer experiences." },
    ],
  },
};

export const WhyVault42: Story = {
  args: {
    title: "Why Vault 42?",
    variant: "feature",
    columns: 4,
    items: [
      { title: "Immersive world", description: "Strong theming, reclaimed HEX Corp identity and a memorable visual style." },
      { title: "Real gameplay", description: "Laserforce Gen 7 and Champ Throw both deliver proper interactive systems." },
      { title: "Simple booking path", description: "Clear offers, visible prices, direct call option and mobile-friendly buttons." },
      { title: "Growth built in", description: "The escape rooms are already part of the future story." },
    ],
  },
};

export const RoomsPanel: Story = {
  args: {
    title: "Hexcape Escape Rooms",
    variant: "muted",
    columns: 3,
    items: [
      {
        title: "The Reactor Room",
        description: "Stabilise the failing power core before meltdown.",
        meta: ["60 minutes", "2-6 players", "Difficulty: ★★★★☆"],
      },
      {
        title: "The Bio-Dome",
        description: "Navigate a lab overrun by mutated plants.",
        meta: ["60 minutes", "2-6 players", "Difficulty: ★★★☆☆"],
      },
      {
        title: "The Command Centre",
        description: "Decrypt the past and hack the future.",
        meta: ["60 minutes", "2-6 players", "Difficulty: ★★★★★"],
      },
    ],
  },
};
