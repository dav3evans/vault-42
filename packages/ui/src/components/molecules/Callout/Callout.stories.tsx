import type { Meta, StoryObj } from "@storybook/react-vite";
import { Callout } from "./Callout";

const meta: Meta<typeof Callout> = {
  title: "Molecules/Callout",
  component: Callout,
  args: {
    title: "Launch-ready message",
    children: "Book laser tag and axe throwing now. Keep escape rooms as a future promise, not a launch-day confusion point.",
  },
  render: (args) => (
    <div className="max-w-md">
      <Callout {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {};
