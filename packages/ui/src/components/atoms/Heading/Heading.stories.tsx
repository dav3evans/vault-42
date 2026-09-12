import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./Heading";
import { Accent } from "../Accent/Accent";

const meta: Meta<typeof Heading> = {
  title: "Atoms/Heading",
  component: Heading,
  argTypes: {
    size: { control: "select", options: ["hero", "section", "card"] },
    as: { control: "select", options: ["h1", "h2", "h3", "h4"] },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Hero: Story = {
  args: {
    as: "h1",
    size: "hero",
    children: (
      <>
        STEP INTO <Accent>VAULT 42</Accent>
      </>
    ),
  },
};

export const Section: Story = {
  args: {
    as: "h2",
    size: "section",
    children: (
      <>
        Simple pricing. <Accent>Easy to book.</Accent>
      </>
    ),
  },
};

export const Card: Story = {
  args: {
    as: "h3",
    size: "card",
    children: "Experience the ultimate adventure",
  },
};
