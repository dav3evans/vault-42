import type { Meta, StoryObj } from "@storybook/react-vite";
import { OutlineText } from "./OutlineText";

const meta: Meta<typeof OutlineText> = {
  title: "Atoms/OutlineText",
  component: OutlineText,
  args: {
    children: "AND SURVIVE",
  },
  render: (args) => (
    <span className="font-display text-[4rem] leading-[0.88] tracking-[0.03em]">
      <OutlineText {...args} />
    </span>
  ),
};

export default meta;
type Story = StoryObj<typeof OutlineText>;

export const Default: Story = {};
