import type { Meta, StoryObj } from "@storybook/react-vite";
import { Panel } from "./Panel";
import { Heading } from "../../atoms/Heading/Heading";

const meta: Meta<typeof Panel> = {
  title: "Molecules/Panel",
  component: Panel,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  render: (args) => (
    <Panel {...args} className="max-w-sm">
      <Heading as="h3" size="card" className="mb-3">
        Perfect for
      </Heading>
      <p className="text-[0.97rem] leading-[1.75] text-text/72">
        A generic surface used across the site for cards, grouped content and callouts.
      </p>
    </Panel>
  ),
};

export const WithoutAccentBar: Story = {
  args: { accentTop: false },
  render: Default.render,
};
