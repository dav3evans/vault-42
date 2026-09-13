import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  parameters: { layout: "fullscreen" },
  args: {
    brandTitle: "VAULT 42",
    brandSubtitle: "A Division of Hex Corp",
    links: [
      { label: "Experiences", href: "#experiences" },
      { label: "Pricing", href: "#pricing" },
      { label: "Groups", href: "#groups" },
      { label: "Escape Rooms", href: "#rooms" },
      { label: "Book", href: "#book" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
