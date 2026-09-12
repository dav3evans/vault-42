import type { Meta, StoryObj } from "@storybook/react-vite";
import { StatBlock } from "./StatBlock";

const meta: Meta<typeof StatBlock> = {
  title: "Molecules/StatBlock",
  component: StatBlock,
  args: {
    value: "Laser Tag",
    label: "From £6.95 pp",
  },
};

export default meta;
type Story = StoryObj<typeof StatBlock>;

export const Default: Story = {};

export const Row: Story = {
  render: () => (
    <div className="grid max-w-xl grid-cols-3 gap-3.5">
      <StatBlock value="Laser Tag" label="From £6.95 pp" />
      <StatBlock value="Axe Throwing" label="From £20 pp" />
      <StatBlock value="Open in Nuneaton" label="Book online now" />
    </div>
  ),
};
