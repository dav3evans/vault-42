import { Panel } from "../Panel/Panel";
import { Tag } from "../../atoms/Tag/Tag";
import { Heading } from "../../atoms/Heading/Heading";
import { cn } from "../../../lib/cn";

export type BlogPostCardProps = {
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
  className?: string;
};

export function BlogPostCard({ category, date, title, excerpt, href, className }: BlogPostCardProps) {
  return (
    <Panel className={cn("h-full", className)} innerClassName="flex h-full flex-col">
      <div className="mb-3 flex items-center gap-3">
        <Tag tone="gold">{category}</Tag>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-2">{date}</span>
      </div>
      <Heading as="h3" size="card" className="mb-3">
        {title}
      </Heading>
      <p className="text-[0.97rem] leading-[1.75] text-text/72">{excerpt}</p>
      <a href={href} className="mt-auto pt-5 font-condensed text-sm uppercase tracking-[0.14em] text-gold no-underline">
        Read more →
      </a>
    </Panel>
  );
}
