import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tag } from "./Tag";

const meta: Meta<typeof Tag> = {
  title: "Atoms/Tag",
  component: Tag,
  args: {
    children: "Hexforce Laser Tag",
  },
  argTypes: {
    tone: { control: "select", options: ["gold", "muted"] },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Gold: Story = {
  args: { tone: "gold" },
};

export const Muted: Story = {
  args: { tone: "muted", children: "Ages 7 and up" },
};
