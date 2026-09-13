import type { Meta, StoryObj } from "@storybook/react-vite";
import { JobListingCard } from "./JobListingCard";

const meta: Meta<typeof JobListingCard> = {
  title: "Molecules/JobListingCard",
  component: JobListingCard,
  args: {
    title: "Vault Custodian (Laser Tag)",
    type: "Part-time",
    location: "Nuneaton",
    href: "#",
  },
  render: (args) => (
    <div className="max-w-2xl">
      <JobListingCard {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof JobListingCard>;

export const Default: Story = {};
