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
const LEAF_TONES = ["#3b5528", "#49682e", "#578038", "#659647", "#79a05b", "#6b5a33", "G", "G", "G"];
const LEAF_YELLOW = "#99973f";
const LEAF_DEAD = "#7c6636";
const LEAF_RUST = "#8a6a38";

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
  if (r < 0.07) return LEAF_DEAD;
  if (r < 0.12) return LEAF_RUST;
  if (r < 0.2) return LEAF_YELLOW;
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
  skip = 0.22,
): LeafSpec[] {
  const leaves: LeafSpec[] = [];
  let side = rng() < 0.5 ? 1 : -1;
  for (let i = from; i < pts.length - 1; i++) {
    if (rng() < skip) continue;
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
    /** Heading the stem is pulled toward — straight down unless it's a creeper. */
    target?: number;
    size?: number;
    thin?: boolean;
    /** Chance per step of throwing a side branch (creepers fork more). */
    branchy?: number;
    /** Sparser, smaller leaves — spidery creeper growth. */
    sparse?: boolean;
  },
): Vine {
  const {
    angle,
    len,
    curl = 0.55,
    pull = 0.12,
    target = Math.PI / 2,
    size = 11,
    thin = false,
    branchy = 0.14,
    sparse = false,
  } = opts;
  const { pts, angs } = walk(rng, { x: 0, y: 0 }, angle, target, len, curl, pull);
  const leaves = leavesAlong(rng, pts, angs, size, 2, sparse ? 0.48 : 0.22);
  const branches: string[] = [];
  for (let i = 3; i < pts.length - 3; i++) {
    if (rng() < branchy) {
      const b = walk(
        rng,
        pts[i]!,
        angs[i]! + (rng() < 0.5 ? -0.9 : 0.9),
        target,
        len * 0.35,
        0.7,
        sparse ? 0.06 : 0.16,
      );
      branches.push(smoothPath(b.pts));
      leaves.push(...leavesAlong(rng, b.pts, b.angs, size * 0.8, 1, sparse ? 0.55 : 0.22));
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
  const back = [140, 520, 900, 1290].map((x) => ({
    at: { x: x + rng() * 60, y: -6 },
    vine: genVine(rng, { angle: DOWN + (rng() - 0.5) * 0.5, len: 80 + rng() * 130, size: 10 }),
  }));
  const moss = genMoss(rng, 1440, 16, 130);
  /* A deliberately balanced composition, [x, length]: long falls near the
     left-centre and right corner, short accents between. */
  const spec: [number, number][] = [
    [40, 180],
    [185, 90],
    [420, 300],
    [700, 70],
    [950, 165],
    [1180, 100],
    [1395, 320],
  ];
  const front = spec.map(([x, len]) => ({
    at: { x: x + rng() * 30, y: -4 },
    vine: genVine(rng, {
      angle: DOWN + (rng() - 0.5) * 0.4,
      len: len * (0.9 + rng() * 0.2),
      size: 12,
    }),
  }));
  return { back, moss, front };
}

/* Side growth is two species: drapers emerge, elbow, and fall with gravity
   (these sway); creepers cling to the panels and wander across them — thin,
   kinked, forking, sparse-leaved — and being attached, they don't sway.
   A runner is a draper that runs clear to the bottom of the window. */
type SideSpec = { y: number; kind: "draper" | "creeper" | "runner"; len: number };

function buildSide(seed: number, specs: SideSpec[]) {
  const rng = mulberry32(seed);
  const moss = genMoss(rng, 900, 10, 60);
  const vines = specs.map(({ y, kind, len }) => {
    const at = { x: -6, y: y + rng() * 50 };
    if (kind === "creeper") {
      return {
        at,
        sway: false,
        vine: genVine(rng, {
          angle: (rng() - 0.5) * 0.35,
          len,
          target: 0.16 + rng() * 0.22,
          pull: 0.03,
          curl: 0.95,
          thin: true,
          size: 8,
          sparse: true,
          branchy: 0.34,
        }),
      };
    }
    return {
      at,
      sway: true,
      vine: genVine(rng, {
        angle: (rng() - 0.4) * 0.4,
        len,
        pull: kind === "runner" ? 0.12 : 0.15,
        size: 11,
      }),
    };
  });
  return { moss, vines };
}

function buildLogoVines() {
  const rng = mulberry32(0x2077);
  /* Longer falls off the plaque's shoulders, short accents inside. */
  const spec: [number, number][] = [
    [66, 155],
    [128, 75],
    [232, 95],
    [294, 170],
  ];
  return spec.map(([x, len]) => ({
    at: { x, y: 6 + rng() * 22 },
    vine: genVine(rng, {
      angle: DOWN + (rng() - 0.5) * 0.6,
      len: len * (0.9 + rng() * 0.25),
      size: 10,
      thin: rng() < 0.4,
    }),
  }));
}

/* Creepers that live ON a door: spidery clingers anchored to a door EDGE —
   one growing down from the top, one crawling in through the seam — never
   starting mid-panel. Positioned in % of the door so they ride with it. */
function buildDoorCreepers(seed: number, side: "left" | "right") {
  const rng = mulberry32(seed);
  const creep = (angle: number, target: number, len: number) =>
    genVine(rng, {
      angle,
      len,
      target,
      pull: 0.04,
      curl: 0.9,
      thin: true,
      size: 8,
      sparse: true,
      branchy: 0.34,
    });
  /* Away from the seam: leftward on the left door, rightward on the right. */
  const seamward = side === "left" ? Math.PI : 0;
  const drift = side === "left" ? -0.35 : 0.35;
  return [
    {
      left: side === "left" ? 24 + rng() * 14 : 52 + rng() * 14,
      top: 0,
      vine: creep(DOWN + (rng() - 0.5) * 0.4, DOWN + drift, 110 + rng() * 60),
    },
    {
      left: side === "left" ? 100 : 0,
      top: 38 + rng() * 22,
      vine: creep(
        seamward + (rng() - 0.5) * 0.3,
        seamward - (side === "left" ? 0.22 : -0.22),
        80 + rng() * 50,
      ),
    },
  ];
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
const SIDE_L = buildSide(0xa42, [
  { y: 110, kind: "draper", len: 210 },
  { y: 400, kind: "creeper", len: 120 },
  { y: 640, kind: "draper", len: 110 },
]);
/* The runner drapes all the way down the window, per the design brief. */
const SIDE_R = buildSide(0xb42, [
  { y: 80, kind: "creeper", len: 140 },
  { y: 340, kind: "draper", len: 150 },
  { y: 580, kind: "runner", len: 520 },
]);
const LOGO_VINES = buildLogoVines();
const DOOR_MOSS = { left: buildDoorMoss(0xc42), right: buildDoorMoss(0xd42) };
const DOOR_CREEPERS = {
  left: buildDoorCreepers(0xf42, "left"),
  right: buildDoorCreepers(0x1042, "right"),
};
const CONSOLE_MOSS = genMossPatch(mulberry32(0xe42), 110, 20);

/* ---- Public pieces ---- */

const shadow = "drop-shadow(0 5px 5px rgb(0 0 0 / 0.45))";

/** Static overgrowth pinned to the site window: top canopy + both sides. */
export function Overgrowth({ moss = false }: { moss?: boolean }): ReactNode {
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
        {moss && <MossG moss={CANOPY.moss} />}
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
        {moss && (
          <g transform="matrix(0 1 1 0 0 0)">
            <MossG moss={SIDE_L.moss} />
          </g>
        )}
        {SIDE_L.vines.map((v, i) => (
          <VineG key={i} vine={v.vine} at={v.at} idp="vd-sl" sway={v.sway} />
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
          {moss && (
            <g transform="matrix(0 1 1 0 0 0)">
              <MossG moss={SIDE_R.moss} />
            </g>
          )}
          {SIDE_R.vines.map((v, i) => (
            <VineG key={i} vine={v.vine} at={v.at} idp="vd-sr" sway={v.sway} />
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

/** Spidery creepers clinging to a door's panels; they ride and clip with it.
    Each is a tiny anchor svg with visible overflow — the door's own clip-path
    trims whatever crawls past its toothed edge. */
export function DoorCreepers({ side }: { side: "left" | "right" }): ReactNode {
  return (
    <>
      {DOOR_CREEPERS[side].map((c, i) => {
        const idp = `vd-dc-${side}${i}`;
        return (
          <svg
            key={i}
            aria-hidden
            className="absolute h-[10px] w-[10px] overflow-visible"
            style={{ left: `${f(c.left)}%`, top: `${f(c.top)}%` }}
            viewBox="0 0 10 10"
          >
            <LeafDefs idp={idp} />
            <VineG vine={c.vine} at={{ x: 5, y: 5 }} idp={idp} sway={false} />
          </svg>
        );
      })}
    </>
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
