import type { Meta, StoryObj } from "@storybook/react-vite";
import { PriceCard } from "./PriceCard";

const meta: Meta<typeof PriceCard> = {
  title: "Organisms/PriceCard",
  component: PriceCard,
  parameters: { layout: "padded" },
};

export default meta;
type Story = StoryObj<typeof PriceCard>;

export const LaserTag: Story = {
  args: {
    title: "Laser Tag",
    description: "Standard sessions for casual visits, repeat games and quick decisions.",
    rows: [
      { label: "1 Game", value: "£6.95 pp" },
      { label: "2 Games", value: "£11.95 pp" },
      { label: "3 Games", value: "£14.95 pp" },
    ],
    note: "Exclusive hire: 1 game £130 · 2 games £230 · 3 games £300 for up to 30 players.",
  },
  render: (args) => (
    <div className="max-w-sm">
      <PriceCard {...args} />
    </div>
  ),
};

export const AxeThrowing: Story = {
  args: {
    title: "Axe Throwing",
    description: "Digital Champ Throw pricing by group size.",
    rows: [
      { label: "2 Players", value: "£24 pp" },
      { label: "3 Players", value: "£23 pp" },
      { label: "4 Players", value: "£22 pp" },
      { label: "5 Players", value: "£21 pp" },
      { label: "6 Players", value: "£20 pp" },
    ],
  },
  render: LaserTag.render,
};
