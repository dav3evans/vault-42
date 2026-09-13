import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accent } from "../../atoms/Accent/Accent";
import { PageHeader } from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "Organisms/PageHeader",
  component: PageHeader,
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "Attractions",
    heading: (
      <>
        Hexforce <Accent>Laser Tag</Accent>
      </>
    ),
    description:
      "Step into the Hexforce Arena, where Explorers navigate a post-apocalyptic battlefield filled with high-tech obstacles and strategic challenges.",
    actions: [
      { label: "See Pricing", href: "#pricing" },
      { label: "Book Now", href: "#book", variant: "secondary" },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {};
