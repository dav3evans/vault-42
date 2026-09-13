import type { Meta, StoryObj } from "@storybook/react-vite";
import { Marquee } from "./Marquee";

const meta: Meta<typeof Marquee> = {
  title: "Molecules/Marquee",
  component: Marquee,
  parameters: { layout: "fullscreen" },
  args: {
    items: [
      "LASERFORCE GEN 7 ACTION",
      "AUGMENTED AXE THROWING",
      "BIRTHDAY PARTIES",
      "CORPORATE GROUPS",
      "WASTELAND WARRIORS KIDS CLUB",
      "ESCAPE ROOMS COMING LATER",
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Marquee>;

export const Default: Story = {};
