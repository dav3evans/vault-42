import type { Meta, StoryObj } from "@storybook/react-vite";
import { ActionRow } from "./ActionRow";

const meta: Meta<typeof ActionRow> = {
  title: "Molecules/ActionRow",
  component: ActionRow,
  args: {
    title: "Book online",
    description: "Go straight to the live booking flow on vault42.uk",
    actionLabel: "Open Site",
    href: "https://vault42.uk",
  },
  render: (args) => (
    <div className="w-md">
      <ActionRow {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof ActionRow>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    title: "Call now",
    description: "Ask about parties, groups, launch availability or the best fit",
    actionLabel: "02476 954242",
    href: "tel:02476954242",
    variant: "secondary",
  },
};
