import type { Meta, StoryObj } from "@storybook/react-vite";
import { BulletList } from "./BulletList";

const meta: Meta<typeof BulletList> = {
  title: "Molecules/BulletList",
  component: BulletList,
  args: {
    items: [
      "Great for families, friends, youth groups, parties and competitive sessions.",
      "Exclusive hire available for up to 30 players.",
      "Wasteland Warriors Kids Club runs every Saturday and Sunday at 10:20 AM.",
    ],
  },
};

export default meta;
type Story = StoryObj<typeof BulletList>;

export const Default: Story = {};
