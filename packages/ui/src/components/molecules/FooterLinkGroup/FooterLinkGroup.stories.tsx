import type { Meta, StoryObj } from "@storybook/react-vite";
import { FooterLinkGroup } from "./FooterLinkGroup";

const meta: Meta<typeof FooterLinkGroup> = {
  title: "Molecules/FooterLinkGroup",
  component: FooterLinkGroup,
  args: {
    title: "Navigate",
    links: [
      { label: "Experiences", href: "#experiences" },
      { label: "Pricing", href: "#pricing" },
      { label: "Groups", href: "#groups" },
      { label: "Book", href: "#book" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof FooterLinkGroup>;

export const Default: Story = {};
