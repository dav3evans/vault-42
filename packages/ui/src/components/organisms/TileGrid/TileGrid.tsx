import { InfoTile, type InfoTileVariant } from "../../molecules/InfoTile/InfoTile";
import { cn } from "../../../lib/cn";

export type TileGridItem = {
  title: string;
  description: string;
  meta?: string[];
};

export type TileGridProps = {
  items: TileGridItem[];
  variant?: InfoTileVariant;
  columns?: 2 | 3 | 4;
  className?: string;
};

const columnClasses: Record<NonNullable<TileGridProps["columns"]>, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

/** A bare grid of InfoTiles — used directly (quick-book strip) or nested inside a TileGridPanel. */
export function TileGrid({ items, variant = "muted", columns = 3, className }: TileGridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-3.5", columnClasses[columns], className)}>
      {items.map((item) => (
        <InfoTile key={item.title} variant={variant} title={item.title} meta={item.meta}>
          {item.description}
        </InfoTile>
      ))}
    </div>
  );
}
