import type { Meta, StoryObj } from "@storybook/react-vite";
import { Accent } from "../../atoms/Accent/Accent";
import { StoryTeaser } from "./StoryTeaser";

const meta: Meta<typeof StoryTeaser> = {
  title: "Organisms/StoryTeaser",
  component: StoryTeaser,
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "The world of Vault 42",
    heading: (
      <>
        A forgotten sanctuary. <Accent>A live adventure destination.</Accent>
      </>
    ),
    description:
      "In a world ravaged by the Great Collapse, HEX Corp's once-thriving technological sanctuary stands waiting to be reclaimed.",
    steps: [
      { number: "01", text: "Bookable now: laser tag and axe throwing are the live launch offers." },
      { number: "02", text: "Clear future story: escape rooms are shown honestly as planned later." },
      { number: "03", text: "Mobile-first layout: clear actions, visible pricing, sticky booking buttons." },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof StoryTeaser>;

export const Default: Story = {};
