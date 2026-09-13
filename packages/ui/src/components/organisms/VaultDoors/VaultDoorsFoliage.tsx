import type { CSSProperties, ReactNode } from "react";

/*
 * Procedural overgrowth for the VaultDoors overlay: hanging vines, creepers
 * and moss, generated once at module load from fixed seeds so the output is
 * deterministic (identical markup on server and client). Palette follows the
 * original reference vines-overlay.svg (#7ea349 → #3b5f2a) and the tokens'
 * --color-green.
 */

const STEM_DARK = "#26361b";
const STEM = "#41592a";
const BACK = "#243418";
const MOSS_DEEP = "#26351a";
const MOSS = "#3d5326";
const MOSS_LIGHT = "#567a33";
/* "G" is a sentinel resolved to the per-instance leaf gradient at render. */
const LEAF_TONES = ["#3b5528", "#49682e", "#578038", "#659647", "#79a05b", "G", "G", "G"];
const LEAF_YELLOW = "#99973f";
const LEAF_DEAD = "#7c6636";

type Pt = { x: number; y: number };
type LeafSpec = { x: number; y: number; a: number; s: number; sy: number; tone: string };
type Vine = {
  d: string;
  branches: string[];
  leaves: LeafSpec[];
  origin: Pt;
  thin: boolean;
  swayDur: number;
  swayDelay: number;
};
type Moss = { deep: string; main: string; dots: { x: number; y: number; r: number; c: string }[] };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n: number) => Math.round(n * 10) / 10;

function pickTone(rng: () => number): string {
  const r = rng();
  if (r < 0.05) return LEAF_DEAD;
  if (r < 0.13) return LEAF_YELLOW;
  return LEAF_TONES[Math.floor(rng() * LEAF_TONES.length)] ?? STEM;
}

/* Random-walk a stem: heading drifts with `curl` jitter while being pulled
   toward `target` (gravity). Returns the points and the heading at each. */
function walk(
  rng: () => number,
  start: Pt,
  angle0: number,
  target: number,
  len: number,
  curl: number,
  pull: number,
): { pts: Pt[]; angs: number[] } {
  const step = 11;
  const n = Math.max(4, Math.round(len / step));
  const pts: Pt[] = [start];
  const angs: number[] = [angle0];
  let a = angle0;
  let { x, y } = start;
  for (let i = 1; i <= n; i++) {
    a += (rng() - 0.5) * curl + (target - a) * pull;
    x += Math.cos(a) * step * (0.85 + rng() * 0.3);
    y += Math.sin(a) * step * (0.85 + rng() * 0.3);
    pts.push({ x, y });
    angs.push(a);
  }
  return { pts, angs };
}

function smoothPath(pts: Pt[]): string {
  const first = pts[0];
  if (!first) return "";
  let d = `M${f(first.x)} ${f(first.y)}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const p = pts[i]!;
    const q = pts[i + 1]!;
    d += ` Q${f(p.x)} ${f(p.y)} ${f((p.x + q.x) / 2)} ${f((p.y + q.y) / 2)}`;
  }
  const last = pts[pts.length - 1]!;
  return `${d} L${f(last.x)} ${f(last.y)}`;
}

function leavesAlong(
  rng: () => number,
  pts: Pt[],
  angs: number[],
  size: number,
  from: number,
): LeafSpec[] {
  const leaves: LeafSpec[] = [];
  let side = rng() < 0.5 ? 1 : -1;
  for (let i = from; i < pts.length - 1; i++) {
    if (rng() < 0.22) continue;
    side = -side;
    const p = pts[i]!;
    const tangent = angs[i]!;
    const raw = tangent + side * (0.95 + (rng() - 0.5) * 0.7);
    /* Bias every leaf a little toward hanging down. */
    const a = raw + (Math.PI / 2 - raw) * 0.22;
    leaves.push({
      x: p.x,
      y: p.y,
      a: (a * 180) / Math.PI,
      s: (size * (0.8 + rng() * 0.5) * (1 - (0.4 * i) / pts.length)) / 10,
      sy: 0.85 + rng() * 0.35,
      tone: pickTone(rng),
    });
  }
  /* Leaf cluster at the growing tip. */
  const tip = pts[pts.length - 1]!;
  for (let k = 0; k < 2 + Math.floor(rng() * 2); k++) {
    leaves.push({
      x: tip.x,
      y: tip.y,
      a: 90 + (rng() - 0.5) * 110,
      s: (size * (0.6 + rng() * 0.4)) / 10,
      sy: 0.85 + rng() * 0.35,
      tone: pickTone(rng),
    });
  }
  return leaves;
}

/* A vine relative to its own anchor at (0,0) — place it with a translate. */
function genVine(
  rng: () => number,
  opts: {
    angle: number;
    len: number;
    curl?: number;
    pull?: number;
    size?: number;
    thin?: boolean;
    /** Rosette of large leaves at the anchor, where growth is thickest. */
    crown?: boolean;
  },
): Vine {
  const { angle, len, curl = 0.55, pull = 0.12, size = 11, thin = false, crown = false } = opts;
  const { pts, angs } = walk(rng, { x: 0, y: 0 }, angle, Math.PI / 2, len, curl, pull);
  const leaves = leavesAlong(rng, pts, angs, size, 2);
  if (crown) {
    const n = 5 + Math.floor(rng() * 4);
    for (let k = 0; k < n; k++) {
      leaves.push({
        x: (rng() - 0.5) * 16,
        y: rng() * 8,
        a: 25 + (k / (n - 1)) * 130 + (rng() - 0.5) * 24,
        s: (size * (1.5 + rng() * 0.9)) / 10,
        sy: 0.9 + rng() * 0.3,
        tone: pickTone(rng),
      });
    }
  }
  const branches: string[] = [];
  for (let i = 3; i < pts.length - 3; i++) {
    if (rng() < 0.14) {
      const b = walk(
        rng,
        pts[i]!,
        angs[i]! + (rng() < 0.5 ? -0.9 : 0.9),
        Math.PI / 2,
        len * 0.35,
        0.7,
        0.16,
      );
      branches.push(smoothPath(b.pts));
      leaves.push(...leavesAlong(rng, b.pts, b.angs, size * 0.8, 1));
    }
  }
  /* Some vines end in a bare, curling tendril. */
  if (rng() < 0.35) {
    const last = pts[pts.length - 1]!;
    const t = walk(rng, last, angs[angs.length - 1]!, Math.PI / 2 + (rng() - 0.5) * 3, 46, 1.5, 0.02);
    branches.push(smoothPath(t.pts));
  }
  return {
    d: smoothPath(pts),
    branches,
    leaves,
    origin: { x: 0, y: 0 },
    thin,
    swayDur: 5.5 + rng() * 4,
    swayDelay: -(rng() * 8),
  };
}

/* Moss band hugging y=0 across [0, w]. A slowly-drifting envelope pinches the
   band to near-nothing in stretches, so it reads as patchy growth rather than
   a solid frame; two lumpy layers plus speckles. */
function genMoss(rng: () => number, w: number, t: number, dotCount: number): Moss {
  const steps: { x: number; env: number }[] = [];
  let env = 0.3 + rng() * 0.7;
  for (let x = 0; x <= w; x += 34 + rng() * 20) {
    env = Math.min(1.15, Math.max(0.04, env + (rng() - 0.48) * 0.55));
    steps.push({ x, env });
  }
  const lump = (depth: number): string => {
    let d = `M0 0 L${w} 0 L${w} ${f(depth * 0.2)}`;
    for (let i = steps.length - 1; i > 0; i--) {
      const s = steps[i]!;
      const deepLobe = rng() < 0.14 && s.env > 0.5 ? 1.9 : 1;
      d += ` Q${f(s.x + 12)} ${f(depth * s.env * (0.7 + rng() * 0.6) * deepLobe)} ${f(s.x)} ${f(
        depth * s.env * (0.5 + rng() * 0.5) * deepLobe,
      )}`;
    }
    return `${d} L0 ${f(depth * 0.25)} Z`;
  };
  const deep = lump(t * 1.5);
  const main = lump(t);
  const dots: Moss["dots"] = [];
  for (let i = 0; i < dotCount; i++) {
    const x = rng() * w;
    const near = steps.reduce((a, b) => (Math.abs(b.x - x) < Math.abs(a.x - x) ? b : a));
    dots.push({
      x: f(x),
      y: f(rng() * t * near.env),
      r: f(0.7 + rng() * 1.6),
      c: rng() < 0.6 ? MOSS_LIGHT : MOSS_DEEP,
    });
  }
  return { deep, main, dots };
}

/* A discrete moss clump — lumpy squashed blob hanging below its anchor. */
function genMossPatch(rng: () => number, w: number, h: number): Moss {
  const blob = (rw: number, rh: number, cy: number): string => {
    const n = 12;
    let d = "";
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI; // half-disc, flat top against the edge
      const r = 0.62 + rng() * 0.38;
      const x = f(w / 2 + Math.cos(Math.PI - a) * rw * r);
      const y = f(cy + Math.sin(a) * rh * r);
      d += i === 0 ? `M${x} ${y}` : ` Q${f(w / 2 + (Math.cos(Math.PI - a) * rw * r) / (0.9 + rng() * 0.3))} ${f(
        cy + Math.sin(a) * rh * (r + 0.18),
      )} ${x} ${y}`;
    }
    return `${d} Z`;
  };
  const deep = blob(w * 0.5, h * 0.95, 0);
  const main = blob(w * 0.4, h * 0.7, 0);
  const dots: Moss["dots"] = [];
  for (let i = 0; i < 10 + Math.floor(rng() * 8); i++) {
    dots.push({
      x: f(w * (0.18 + rng() * 0.64)),
      y: f(rng() * h * 0.6),
      r: f(0.6 + rng() * 1.4),
      c: rng() < 0.6 ? MOSS_LIGHT : MOSS_DEEP,
    });
  }
  return { deep, main, dots };
}

function LeafDefs({ idp }: { idp: string }) {
  return (
    <defs>
      <linearGradient id={`${idp}-lg`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7ea349" />
        <stop offset="100%" stopColor="#3b5f2a" />
      </linearGradient>
      <g id={`${idp}-leaf`}>
        <path d="M0 0 C2.1 -3.3 6.4 -3.3 9.4 -0.5 C9.9 -0.1 9.9 0.1 9.4 0.5 C6.4 3.3 2.1 3.3 0 0 Z" />
        <path
          d="M0.7 0 C3.4 -0.7 6.3 -0.6 8.9 -0.15"
          fill="none"
          stroke="#1e2c14"
          strokeOpacity="0.4"
          strokeWidth="0.55"
        />
      </g>
    </defs>
  );
}

function VineG({
  vine,
  at,
  idp,
  sway,
  tone,
}: {
  vine: Vine;
  at: Pt;
  idp: string;
  sway: boolean;
  /** Overrides stems AND leaves with a flat colour (for silhouette layers). */
  tone?: string;
}) {
  const stems = (
    <>
      <path
        d={vine.d}
        fill="none"
        stroke={tone ?? STEM_DARK}
        strokeWidth={vine.thin ? 1.9 : 3.2}
        strokeLinecap="round"
      />
      {!tone && (
        <path d={vine.d} fill="none" stroke={STEM} strokeWidth={vine.thin ? 0.9 : 1.6} strokeLinecap="round" />
      )}
      {vine.branches.map((b, i) => (
        <path key={i} d={b} fill="none" stroke={tone ?? STEM_DARK} strokeWidth={1.4} strokeLinecap="round" />
      ))}
      {vine.leaves.map((l, i) => (
        <use
          key={i}
          href={`#${idp}-leaf`}
          transform={`translate(${f(l.x)} ${f(l.y)}) rotate(${f(l.a)}) scale(${f(l.s)} ${f(l.s * l.sy)})`}
          fill={tone ?? (l.tone === "G" ? `url(#${idp}-lg)` : l.tone)}
        />
      ))}
    </>
  );
  const swayStyle: CSSProperties | undefined = sway
    ? {
        transformOrigin: "0px 0px",
        animationDuration: `${f(vine.swayDur)}s`,
        animationDelay: `${f(vine.swayDelay)}s`,
      }
    : undefined;
  return (
    <g transform={`translate(${f(at.x)} ${f(at.y)})`}>
      {sway ? (
        <g className="motion-safe:animate-vine-sway" style={swayStyle}>
          {stems}
        </g>
      ) : (
        stems
      )}
    </g>
  );
}

function MossG({ moss }: { moss: Moss }) {
  return (
    <>
      <path d={moss.deep} fill={MOSS_DEEP} fillOpacity="0.92" />
      <path d={moss.main} fill={MOSS} />
      {moss.dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} fillOpacity="0.75" />
      ))}
    </>
  );
}

/* ---- Prebuilt scenes (seeded, module-scope, deterministic) ---- */

const DOWN = Math.PI / 2;

function buildCanopy() {
  const rng = mulberry32(0x42421);
  const back = [60, 320, 610, 880, 1130, 1390].map((x) => ({
    at: { x: x + rng() * 40, y: -6 },
    vine: genVine(rng, { angle: DOWN + (rng() - 0.5) * 0.5, len: 90 + rng() * 150, size: 10 }),
  }));
  const moss = genMoss(rng, 1440, 16, 130);
  const frontXs = [30, 128, 262, 395, 540, 665, 795, 935, 1075, 1215, 1355];
  const front = frontXs.map((x, i) => {
    const edgy = Math.min(x, 1440 - x) < 300 ? 1 : 0.55; // longer near the corners
    return {
      at: { x: x + rng() * 36, y: -4 },
      vine: genVine(rng, {
        angle: DOWN + (rng() - 0.5) * 0.4,
        len: (i % 3 === 1 ? 130 : 190) * edgy + rng() * 120 * edgy,
        size: 12,
        crown: rng() < 0.6,
      }),
    };
  });
  return { back, moss, front };
}

function buildSide(seed: number) {
  const rng = mulberry32(seed);
  const moss = genMoss(rng, 900, 10, 60);
  const vines = [70, 210, 380, 560, 730].map((y) => ({
    at: { x: -6, y: y + rng() * 60 },
    vine: genVine(rng, {
      angle: (rng() - 0.4) * 0.5,
      len: 140 + rng() * 130,
      pull: 0.055,
      size: 11,
      crown: rng() < 0.7,
    }),
  }));
  return { moss, vines };
}

function buildLogoVines() {
  const rng = mulberry32(0x2077);
  return [56, 96, 148, 212, 262, 300].map((x, i) => ({
    at: { x, y: 6 + rng() * 22 },
    vine: genVine(rng, {
      angle: DOWN + (rng() - 0.5) * 0.6,
      len: i === 2 || i === 3 ? 70 + rng() * 60 : 130 + rng() * 90,
      size: 10,
      thin: rng() < 0.4,
    }),
  }));
}

function buildDoorMoss(seed: number) {
  const rng = mulberry32(seed);
  /* Discrete clumps, not a band: [left %, width px, height px] along the top,
     plus one pooled low near the seam. */
  const tops = [
    { at: 6 + rng() * 10, w: 110 + rng() * 50, h: 26 + rng() * 10 },
    { at: 40 + rng() * 12, w: 70 + rng() * 40, h: 18 + rng() * 8 },
    { at: 72 + rng() * 10, w: 130 + rng() * 60, h: 30 + rng() * 12 },
  ].map((p) => ({ ...p, moss: genMossPatch(rng, p.w, p.h) }));
  const bottom = { w: 120 + rng() * 40, h: 22 + rng() * 8, moss: genMossPatch(rng, 150, 26) };
  return { tops, bottom };
}

const CANOPY = buildCanopy();
const SIDE_L = buildSide(0xa42);
const SIDE_R = buildSide(0xb42);
const LOGO_VINES = buildLogoVines();
const DOOR_MOSS = { left: buildDoorMoss(0xc42), right: buildDoorMoss(0xd42) };
const CONSOLE_MOSS = genMossPatch(mulberry32(0xe42), 110, 20);

/* ---- Public pieces ---- */

const shadow = "drop-shadow(0 5px 5px rgb(0 0 0 / 0.45))";

/** Static overgrowth pinned to the site window: top canopy + both sides. */
export function Overgrowth(): ReactNode {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        className="absolute inset-x-0 top-0 w-full"
        style={{ aspectRatio: "1440/400", filter: shadow }}
        viewBox="0 0 1440 400"
        preserveAspectRatio="xMidYMin slice"
      >
        <LeafDefs idp="vd-can" />
        <g opacity="0.62">
          {CANOPY.back.map((v, i) => (
            <VineG key={i} vine={v.vine} at={v.at} idp="vd-can" sway={false} tone={BACK} />
          ))}
        </g>
        <MossG moss={CANOPY.moss} />
        {CANOPY.front.map((v, i) => (
          <VineG key={i} vine={v.vine} at={v.at} idp="vd-can" sway />
        ))}
      </svg>
      <svg
        className="absolute inset-y-0 left-0 h-full w-[240px] max-w-[30vw]"
        style={{ filter: shadow }}
        viewBox="0 0 240 900"
        preserveAspectRatio="xMinYMin slice"
      >
        <LeafDefs idp="vd-sl" />
        <g transform="matrix(0 1 1 0 0 0)">
          <MossG moss={SIDE_L.moss} />
        </g>
        {SIDE_L.vines.map((v, i) => (
          <VineG key={i} vine={v.vine} at={v.at} idp="vd-sl" sway={i % 2 === 0} />
        ))}
      </svg>
      <svg
        className="absolute inset-y-0 right-0 h-full w-[240px] max-w-[30vw]"
        style={{ filter: shadow }}
        viewBox="0 0 240 900"
        preserveAspectRatio="xMaxYMin slice"
      >
        <LeafDefs idp="vd-sr" />
        <g transform="translate(240 0) scale(-1 1)">
          <g transform="matrix(0 1 1 0 0 0)">
            <MossG moss={SIDE_R.moss} />
          </g>
          {SIDE_R.vines.map((v, i) => (
            <VineG key={i} vine={v.vine} at={v.at} idp="vd-sr" sway={i % 2 === 1} />
          ))}
        </g>
      </svg>
    </div>
  );
}

/** Vines hanging from behind the logo plaque; rides the right door with it. */
export function LogoVines({ width }: { width: string }): ReactNode {
  return (
    <svg
      aria-hidden
      className="absolute top-1/2"
      style={{
        left: 14,
        width,
        aspectRatio: "360/300",
        transform: "translate(-50%, -14%)",
        filter: shadow,
      }}
      viewBox="0 0 360 300"
    >
      <LeafDefs idp="vd-lv" />
      {LOGO_VINES.map((v, i) => (
        <VineG key={i} vine={v.vine} at={v.at} idp="vd-lv" sway />
      ))}
    </svg>
  );
}

/** Discrete moss clumps on a door — top edge and pooled low near the seam. */
export function DoorMoss({ side }: { side: "left" | "right" }): ReactNode {
  const m = DOOR_MOSS[side];
  return (
    <>
      {m.tops.map((p, i) => (
        <svg
          key={i}
          aria-hidden
          className="absolute top-0 opacity-90"
          style={{ left: `${p.at}%`, width: p.w, height: p.h }}
          viewBox={`0 0 ${f(p.w)} ${f(p.h)}`}
        >
          <MossG moss={p.moss} />
        </svg>
      ))}
      <svg
        aria-hidden
        className={`absolute bottom-0 opacity-80 ${side === "left" ? "right-10" : "left-10"}`}
        style={{ width: m.bottom.w, height: m.bottom.h }}
        viewBox="0 0 150 26"
        preserveAspectRatio="none"
      >
        <g transform="translate(0 26) scale(1 -1)">
          <MossG moss={m.bottom.moss} />
        </g>
      </svg>
    </>
  );
}

/** A small clump on the console housing, so the HUD belongs to the scene. */
export function ConsoleMoss(): ReactNode {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute -top-1 left-6 z-10 h-[20px] w-[110px]"
      viewBox="0 0 110 20"
    >
      <MossG moss={CONSOLE_MOSS} />
    </svg>
  );
}
