import type { Preview } from "@storybook/react-vite";
import type { ReactNode } from "react";
import "../src/styles/tokens.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      options: {
        vault: { name: "Vault", value: "#071018" },
        light: { name: "Light", value: "#ffffff" },
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: "vault" },
  },
  decorators: [
    (Story: () => ReactNode) => (
      <div className="font-sans text-text">
        <Story />
      </div>
    ),
  ],
};

export default preview;
