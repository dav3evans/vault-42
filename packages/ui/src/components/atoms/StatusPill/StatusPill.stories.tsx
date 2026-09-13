import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatusPill } from "./StatusPill";

const meta: Meta<typeof StatusPill> = {
  title: "Atoms/StatusPill",
  component: StatusPill,
  args: { label: "Systems Active" },
  argTypes: { tone: { control: "select", options: ["active", "idle"] } },
};

export default meta;
type Story = StoryObj<typeof StatusPill>;

export const Active: Story = {};

export const Idle: Story = {
  args: { tone: "idle", label: "Offline" },
};
