import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  args: {
    children: "Book Your Adventure",
    href: "#",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "chip"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "See Pricing" },
};

export const Chip: Story = {
  args: { variant: "chip", children: "Call 02476 954242" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary" href="#">
        Book Your Adventure
      </Button>
      <Button variant="secondary" href="#">
        See Pricing
      </Button>
      <Button variant="chip" href="#">
        Call 02476 954242
      </Button>
    </div>
  ),
};
