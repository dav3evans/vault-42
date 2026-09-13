import type { Meta, StoryObj } from "@storybook/react-vite";
import { BlogPostCard } from "./BlogPostCard";

const meta: Meta<typeof BlogPostCard> = {
  title: "Molecules/BlogPostCard",
  component: BlogPostCard,
  args: {
    category: "Announcements",
    date: "12 Oct 2026",
    title: "Halloween at the Vault: extended hours and a new game mode",
    excerpt: "The Wasteland gets darker this October — extended evening sessions and a limited-run Zombies vs Survivors event.",
    href: "#",
  },
  render: (args) => (
    <div className="max-w-sm">
      <BlogPostCard {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof BlogPostCard>;

export const Default: Story = {};
