import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavLink } from "./NavLink";

const meta: Meta<typeof NavLink> = {
  title: "Atoms/NavLink",
  component: NavLink,
  args: { href: "#experiences", children: "Experiences" },
};

export default meta;
type Story = StoryObj<typeof NavLink>;

export const Default: Story = {};

export const Row: Story = {
  render: () => (
    <nav className="flex gap-4">
      <NavLink href="#experiences">Experiences</NavLink>
      <NavLink href="#pricing">Pricing</NavLink>
      <NavLink href="#groups">Groups</NavLink>
      <NavLink href="#book">Book</NavLink>
    </nav>
  ),
};
