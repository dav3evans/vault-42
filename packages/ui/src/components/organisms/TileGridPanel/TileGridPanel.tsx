import { Panel } from "../../molecules/Panel/Panel";
import { Heading } from "../../atoms/Heading/Heading";
import { TileGrid, type TileGridItem, type TileGridProps } from "../TileGrid/TileGrid";

export type TileGridPanelProps = {
  title: string;
  items: TileGridItem[];
  variant?: TileGridProps["variant"];
  columns?: TileGridProps["columns"];
  className?: string;
};

/** A Panel with a heading and a TileGrid inside — used for "Perfect for", "Why Vault 42" and the rooms section. */
export function TileGridPanel({ title, items, variant = "muted", columns = 2, className }: TileGridPanelProps) {
  return (
    <Panel className={className}>
      <Heading as="h3" size="card" className="mb-5 text-[#f4e8af]">
        {title}
      </Heading>
      <TileGrid items={items} variant={variant} columns={columns} />
    </Panel>
  );
}
