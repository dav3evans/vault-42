import type { Meta, StoryObj } from "@storybook/react-vite";
import { StickyMobileBar } from "./StickyMobileBar";

const meta: Meta<typeof StickyMobileBar> = {
  title: "Organisms/StickyMobileBar",
  component: StickyMobileBar,
  parameters: { layout: "fullscreen" },
  args: {
    primary: { label: "See Pricing", href: "#pricing" },
    secondary: { label: "Book Now", href: "#book" },
  },
  render: (args) => (
    <div className="relative h-40 max-w-sm bg-bg">
      <p className="p-4 text-xs text-muted-2">
        Hidden above 760px wide — shown here forced visible so it can be previewed at any canvas size.
      </p>
      <StickyMobileBar {...args} className="!absolute !block" />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof StickyMobileBar>;

export const Default: Story = {};
