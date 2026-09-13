import type { Meta, StoryObj } from "@storybook/react-vite";
import { TestimonialCard } from "./TestimonialCard";

const meta: Meta<typeof TestimonialCard> = {
  title: "Molecules/TestimonialCard",
  component: TestimonialCard,
  args: {
    quote: "Best team day we've had in years — everyone was still talking about it a week later.",
    name: "Sarah M.",
    role: "Operations Lead, corporate booking",
  },
  render: (args) => (
    <div className="max-w-sm">
      <TestimonialCard {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const Default: Story = {};
