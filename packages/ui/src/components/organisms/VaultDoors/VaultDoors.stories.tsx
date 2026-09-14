import type { Meta, StoryObj } from "@storybook/react-vite";
import { VaultDoors } from "./VaultDoors";
import logo from "../../../assets/logo.webp";

const meta: Meta<typeof VaultDoors> = {
  title: "Organisms/VaultDoors",
  component: VaultDoors,
  parameters: { layout: "fullscreen" },
  args: {
    duration: 9000,
    logoSrc: logo,
  },
};

export default meta;
type Story = StoryObj<typeof VaultDoors>;

/** Remount the story (or tweak an arg) to replay the sequence. */
export const Default: Story = {};

/** The door never opens — the overlay gives up and fades around it. */
export const StaysStuck: Story = {
  args: { resolution: "fade" },
};

/** Access denied — the doors slam back shut and stay sealed for good. */
export const AccessDenied: Story = {
  args: { resolution: "slam" },
};

/**
 * The teaser: the door jams at 42% and stays there, with the page visible
 * through the gap but blocked from any interaction.
 */
export const JammedTeaser: Story = {
  args: { resolution: "jammed" },
  render: (args) => (
    <>
      <div className="min-h-screen bg-bg px-10 py-20 text-text">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          Nuneaton&apos;s immersive adventure destination
        </p>
        <h1 className="mt-5 font-display text-7xl leading-none">
          STEP INTO <span className="text-gold">VAULT 42</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          A lost HEX Corp sanctuary. Reclaimed by nature. Still alive. This is the
          page you would be reading, if the door would let you.
        </p>
        <div className="mt-8 inline-block border border-gold/30 px-6 py-3 font-mono text-sm uppercase tracking-widest text-gold">
          Book your adventure
        </div>
      </div>
      <VaultDoors {...args} />
    </>
  ),
};

export const CustomExcuses: Story = {
  args: {
    headline: "Vault 42 // Maintenance Bay",
    stuckMessages: [
      "Hydraulics last serviced in 2077",
      "Winch is unionised, negotiating",
      "Have you tried the other door",
    ],
  },
};
