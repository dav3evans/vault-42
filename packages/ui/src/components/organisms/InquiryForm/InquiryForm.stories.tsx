import type { Meta, StoryObj } from "@storybook/react-vite";
import { InquiryForm } from "./InquiryForm";

const meta: Meta<typeof InquiryForm> = {
  title: "Organisms/InquiryForm",
  component: InquiryForm,
  parameters: { layout: "padded" },
  args: {
    fields: [
      { name: "name", label: "Name", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "phone", label: "Phone", type: "tel" },
      { name: "message", label: "Message", type: "textarea", required: true },
    ],
    submitLabel: "Send Inquiry",
  },
  render: (args) => (
    <div className="max-w-md">
      <InquiryForm {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof InquiryForm>;

export const Default: Story = {};
