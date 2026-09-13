import type { Meta, StoryObj } from "@storybook/react-vite";
import { NumberedStep } from "./NumberedStep";

const meta: Meta<typeof NumberedStep> = {
  title: "Molecules/NumberedStep",
  component: NumberedStep,
  args: {
    number: "01",
    children:
      "Bookable now: Laser tag and axe throwing are the live launch offers and are positioned first throughout the page.",
  },
};

export default meta;
type Story = StoryObj<typeof NumberedStep>;

export const Default: Story = {};

export const List: Story = {
  render: () => (
    <div className="grid max-w-lg gap-3.5">
      <NumberedStep number="01">Bookable now: laser tag and axe throwing are the live launch offers.</NumberedStep>
      <NumberedStep number="02">Clear future story: escape rooms are shown honestly as planned later.</NumberedStep>
      <NumberedStep number="03">Mobile-first layout: clear actions, visible pricing, sticky booking buttons.</NumberedStep>
    </div>
  ),
};
