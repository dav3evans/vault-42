import type { Meta, StoryObj } from "@storybook/react-vite";

const colors = [
  { name: "bg", className: "bg-bg", cssVar: "--color-bg" },
  { name: "bg-2", className: "bg-bg-2", cssVar: "--color-bg-2" },
  { name: "panel", className: "bg-panel", cssVar: "--color-panel" },
  { name: "panel-2", className: "bg-panel-2", cssVar: "--color-panel-2" },
  { name: "text", className: "bg-text", cssVar: "--color-text" },
  { name: "muted", className: "bg-muted", cssVar: "--color-muted" },
  { name: "muted-2", className: "bg-muted-2", cssVar: "--color-muted-2" },
  { name: "gold", className: "bg-gold", cssVar: "--color-gold" },
  { name: "gold-2", className: "bg-gold-2", cssVar: "--color-gold-2" },
  { name: "gold-3", className: "bg-gold-3", cssVar: "--color-gold-3" },
  { name: "green", className: "bg-green", cssVar: "--color-green" },
  { name: "red", className: "bg-red", cssVar: "--color-red" },
];

function ColorSwatch({ name, className, cssVar }: { name: string; className: string; cssVar: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className={`h-12 w-12 shrink-0 border border-white/10 ${className}`} />
      <div>
        <div className="font-sans text-sm text-text">{name}</div>
        <div className="font-mono text-xs text-muted-2">{cssVar}</div>
      </div>
    </div>
  );
}

function TokensPreview() {
  return (
    <div className="grid max-w-3xl gap-12 bg-bg p-8">
      <section>
        <h2 className="mb-5 font-display text-3xl tracking-[0.03em] text-text">Colour</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {colors.map((c) => (
            <ColorSwatch key={c.name} {...c} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 font-display text-3xl tracking-[0.03em] text-text">Type</h2>
        <div className="grid gap-5">
          <div>
            <p className="font-display text-5xl leading-none tracking-[0.03em] text-text">Bebas Neue</p>
            <p className="mt-1 font-mono text-xs text-muted-2">--font-display · headings, buttons</p>
          </div>
          <div>
            <p className="font-sans text-2xl text-text">Barlow — body copy</p>
            <p className="mt-1 font-mono text-xs text-muted-2">--font-sans · paragraphs</p>
          </div>
          <div>
            <p className="font-condensed text-xl uppercase tracking-wide text-text">Barlow Condensed — navigation & labels</p>
            <p className="mt-1 font-mono text-xs text-muted-2">--font-condensed · nav, mini-headings</p>
          </div>
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.22em] text-gold">Share Tech Mono — eyebrows & meta</p>
            <p className="mt-1 font-mono text-xs text-muted-2">--font-mono · eyebrows, tags, stats</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="mb-5 font-display text-3xl tracking-[0.03em] text-text">Shape</h2>
        <div className="flex flex-wrap items-center gap-6">
          <div className="grid gap-2">
            <div className="h-16 w-28 border border-line bg-panel-fade" />
            <span className="font-mono text-xs text-muted-2">Sharp corners — no radius anywhere</span>
          </div>
          <div className="grid gap-2">
            <div className="clip-vault h-16 w-28 bg-gold-fade" />
            <span className="font-mono text-xs text-muted-2">.clip-vault (angled CTA cut)</span>
          </div>
          <div className="grid gap-2">
            <div className="h-16 w-28 bg-warn" />
            <span className="font-mono text-xs text-muted-2">--background-image-warn</span>
          </div>
        </div>
      </section>
    </div>
  );
}

const meta: Meta<typeof TokensPreview> = {
  title: "Foundations/Design Tokens",
  component: TokensPreview,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof TokensPreview>;

export const Overview: Story = {};
