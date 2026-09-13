import type { Meta, StoryObj } from "@storybook/react-vite";
import { FaqAccordion } from "./FaqAccordion";

const meta: Meta<typeof FaqAccordion> = {
  title: "Organisms/FaqAccordion",
  component: FaqAccordion,
  parameters: { layout: "padded" },
  args: {
    items: [
      {
        question: "What age is laser tag suitable for?",
        answer: "Laser tag is suitable for ages 7 and up. Younger Explorers can join the Wasteland Warriors Kids Club sessions.",
      },
      {
        question: "Do I need to book in advance?",
        answer: "We recommend booking online to guarantee your slot, especially for weekends and group bookings.",
      },
      {
        question: "Can I cancel or reschedule?",
        answer: "Yes — see our cancellation and refund policy for full details on timeframes and terms.",
      },
    ],
  },
  render: (args) => (
    <div className="max-w-2xl">
      <FaqAccordion {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof FaqAccordion>;

export const Default: Story = {};
