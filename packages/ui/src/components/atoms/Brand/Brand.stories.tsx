import type { Meta, StoryObj } from "@storybook/react-vite";
import { Brand } from "./Brand";

const meta: Meta<typeof Brand> = {
  title: "Atoms/Brand",
  component: Brand,
  args: {
    title: "VAULT 42",
    subtitle: "A Division of Hex Corp",
  },
};

export default meta;
type Story = StoryObj<typeof Brand>;

export const Default: Story = {};

export const WithoutSubtitle: Story = {
  args: { subtitle: undefined },
};
