import type { Meta, StoryObj } from "@storybook/react-vite";
import { ContactItem } from "./ContactItem";

const meta: Meta<typeof ContactItem> = {
  title: "Molecules/ContactItem",
  component: ContactItem,
};

export default meta;
type Story = StoryObj<typeof ContactItem>;

export const Phone: Story = {
  args: { label: "Phone", href: "tel:02476954242", children: "02476 954242" },
};

export const List: Story = {
  render: () => (
    <div className="grid max-w-sm gap-3.5">
      <ContactItem label="Phone" href="tel:02476954242">
        02476 954242
      </ContactItem>
      <ContactItem label="Website" href="https://vault42.uk">
        vault42.uk
      </ContactItem>
      <ContactItem label="Address">Unit 1 - 2, Closers Business Centre, Avenue Road, Nuneaton, CV11 4ND</ContactItem>
    </div>
  ),
};
