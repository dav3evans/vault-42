import type { Meta, StoryObj } from "@storybook/react-vite";
import { TileGrid } from "./TileGrid";

const meta: Meta<typeof TileGrid> = {
  title: "Organisms/TileGrid",
  component: TileGrid,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof TileGrid>;

export const QuickBook: Story = {
  args: {
    variant: "quick",
    columns: 4,
    items: [
      { title: "Book Laser Tag", description: "Fastest route for families, groups, parties and first-time visitors." },
      { title: "Book Axe Throwing", description: "High-tech Champ Throw lanes with 16 interactive game modes." },
      { title: "Call Us", description: "02476 954242 for group bookings, questions or launch info." },
      { title: "Find Us", description: "Unit 1 - 2, Closers Business Centre, Avenue Road, Nuneaton." },
    ],
  },
};
