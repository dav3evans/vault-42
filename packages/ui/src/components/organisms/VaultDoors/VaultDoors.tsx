"use client";

import { useEffect, useRef, useState } from "react";
import { StatusPill, type StatusPillTone } from "../../atoms/StatusPill/StatusPill";
import { cn } from "../../../lib/cn";

export type VaultDoorsResolution = "give-way" | "fade" | "slam" | "jammed";

export type VaultDoorsProps = {
  /**
   * Total time in ms until the sequence settles (overlay gone, or doors
   * sealed). Ignored by "jammed", which never settles.
   */
  duration?: number;
  /**
   * Called when the sequence settles: after the overlay unmounts for
   * "give-way" / "fade", once the doors seal for "slam", or once the door
   * jams for "jammed".
   */
  onComplete?: () => void;
  headline?: string;
  /** Rotated through while the door is jammed. */
  stuckMessages?: string[];
  /**
   * How the sequence resolves:
   * - "give-way" — the doors finally fling open and the overlay fades away.
   * - "fade" — the doors never open; the overlay gives up and fades out
   *   around the still-jammed door.
   * - "slam" — access denied: the doors slam back shut and stay sealed.
   *   The overlay never unmounts.
   * - "jammed" — the doors jam at 42% and stay there, blocking all
   *   interaction. With the transparent backdrop (its default) the page
   *   shows through the gap — visible, but out of reach. Never unmounts.
   */
  resolution?: VaultDoorsResolution;
  /**
   * What shows through the gap: the vault void, or the page behind the
   * overlay. Defaults to "void" — except for "jammed", which defaults to
   * "transparent" so there is something to tease.
   */
  backdrop?: "void" | "transparent";
  /**
   * URL of the site logo (e.g. "/brand/logo.webp"). Painted across the seam,
   * split between the two door halves — whole while the doors are shut, cut
   * along each door's toothed edge once they move. Without it the doors fall
   * back to the big 4|2 numerals.
   */
  logoSrc?: string;
  /** Rendered logo width in px (capped to 52vw on small screens). */
  logoWidth?: number;
  className?: string;
};

type Phase = "boot" | "opening" | "stuck" | "exit" | "sealed" | "done";

/* Phase timings. The animation durations these pair with live in
   styles/tokens.css (--animate-door-open / -give); keep them in sync. */
const BOOT_MS = 900;
const OPEN_MS = 2600;
const EXIT_MS = 800;
/* Slam needs longer: 900ms slam + a beat before the sequence settles sealed. */
const SLAM_EXIT_MS = 2000;
const MIN_STUCK_MS = 600;

/** The door always jams at 42% open. Facility policy. */
const STUCK_PERCENT = 42;

/* Toothed seam. Both door edges follow ONE shared zigzag line — half-hexagon
   teeth alternating between the doors — so the profiles are exact complements
   and the seam closes completely flush, with no light-leaks along the tooth
   slants. Each door is half a tooth deeper than 50% wide to reach the line. */
const TOOTH_DEPTH_PX = 28;
/* Tooth periods down the seam (each period = one tooth per door). */
const SEAM_PERIODS = 5;
/* Height of each tooth's slanted edge, in % of viewport height. */
const SEAM_SLANT = 3;

type SeamFlat = { tip: boolean; y0: number; y1: number };

/* The flat landings of the shared zigzag ("tip" = the line sits at the left
   door's tooth tip). Starts and ends on a half landing for symmetry. */
function seamFlats(): SeamFlat[] {
  const period = 100 / SEAM_PERIODS;
  const flat = period / 2 - SEAM_SLANT;
  const flats: SeamFlat[] = [{ tip: true, y0: 0, y1: flat / 2 }];
  let y = flat / 2;
  let tip = true;
  for (let i = 0; i < SEAM_PERIODS * 2 - 1; i++) {
    y += SEAM_SLANT;
    tip = !tip;
    flats.push({ tip, y0: y, y1: y + flat });
    y += flat;
  }
  flats.push({ tip: !tip, y0: y + SEAM_SLANT, y1: 100 });
  return flats;
}

function toothedClip(side: "left" | "right"): string {
  const points = [side === "left" ? "0% 0%" : "100% 0%"];
  for (const { tip, y0, y1 } of seamFlats()) {
    const x =
      side === "left"
        ? tip
          ? "100%"
          : `calc(100% - ${TOOTH_DEPTH_PX}px)`
        : tip
          ? `${TOOTH_DEPTH_PX}px`
          : "0%";
    points.push(`${x} ${y0.toFixed(3)}%`, `${x} ${y1.toFixed(3)}%`);
  }
  points.push(side === "left" ? "0% 100%" : "100% 100%");
  return `polygon(${points.join(", ")})`;
}

const DOOR_CLIP = {
  left: toothedClip("left"),
  right: toothedClip("right"),
} as const;

const DEFAULT_STUCK_MESSAGES = [
  "Obstruction detected in door track",
  "Re-engaging drive motor 2 of 2",
  "Applying percussive maintenance",
  "Consulting HEX Corp manual, page 404",
  "Door is doing its best",
];

const PHASE_MESSAGE: Record<Exclude<Phase, "stuck" | "exit" | "sealed" | "done">, string> = {
  boot: "Initialising door control…",
  opening: "Cycling blast door — stand clear",
};

/* "jammed" never reaches the exit phase; its entries are here only to keep
   these records total. */
const EXIT_MESSAGE: Record<VaultDoorsResolution, string> = {
  "give-way": "Override accepted — mind the gap",
  fade: "Good enough — squeeze through",
  slam: "Access denied — vault resealed",
  jammed: "Door has failed — enjoy the view",
};

const PHASE_PILL: Record<
  Exclude<Phase, "exit" | "sealed" | "done">,
  { label: string; tone: StatusPillTone }
> = {
  boot: { label: "Standby", tone: "idle" },
  opening: { label: "Cycling", tone: "active" },
  stuck: { label: "Jammed", tone: "critical" },
};

const EXIT_PILL: Record<VaultDoorsResolution, { label: string; tone: StatusPillTone }> = {
  "give-way": { label: "Override", tone: "active" },
  fade: { label: "Jammed", tone: "critical" },
  slam: { label: "Denied", tone: "critical" },
  jammed: { label: "Jammed", tone: "critical" },
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/**
 * A fake loading screen: the vault blast doors try to open, jam at 42%,
 * strain against the mechanism, and finally give way after `duration` ms.
 * Purely theatrical — it isn't waiting on anything.
 */
export function VaultDoors({
  duration = 7000,
  onComplete,
  headline = "Vault 42 // Door Control",
  stuckMessages = DEFAULT_STUCK_MESSAGES,
  resolution = "give-way",
  backdrop,
  logoSrc,
  logoWidth = 360,
  className,
}: VaultDoorsProps) {
  const resolvedBackdrop = backdrop ?? (resolution === "jammed" ? "transparent" : "void");
  const [phase, setPhase] = useState<Phase>("boot");
  const [percent, setPercent] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  /* Phase timeline. With reduced motion we skip the theatrics and hold the
     jammed frame as a still until the fade. */
  useEffect(() => {
    const stuckAt = reduced ? 300 : BOOT_MS + OPEN_MS;
    const timers: number[] = [
      window.setTimeout(() => setPhase(reduced ? "stuck" : "opening"), reduced ? 300 : BOOT_MS),
    ];
    if (!reduced) timers.push(window.setTimeout(() => setPhase("stuck"), stuckAt));
    if (resolution === "jammed") {
      /* The door never resolves; the sequence settles once it jams. */
      timers.push(window.setTimeout(() => onCompleteRef.current?.(), stuckAt));
    } else {
      const exitMs = resolution === "slam" ? SLAM_EXIT_MS : EXIT_MS;
      const exitAt = Math.max(stuckAt + MIN_STUCK_MS, duration - exitMs);
      timers.push(window.setTimeout(() => setPhase("exit"), exitAt));
      timers.push(
        window.setTimeout(() => {
          setPhase(resolution === "slam" ? "sealed" : "done");
          onCompleteRef.current?.();
        }, exitAt + exitMs),
      );
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [duration, reduced, resolution]);

  /* Keep the page still while the doors hog the screen. */
  useEffect(() => {
    if (phase === "done") return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [phase === "done"]);

  /* Aperture readout: eases up to 42 while opening, twitches while jammed,
     sprints to 100 once the door gives way. */
  useEffect(() => {
    if (phase === "opening") {
      const start = performance.now();
      let frame: number;
      const tick = (now: number) => {
        const t = Math.min((now - start) / OPEN_MS, 1);
        setPercent(Math.round(STUCK_PERCENT * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }
    if (phase === "stuck") {
      setPercent(STUCK_PERCENT);
      if (reduced) return;
      const interval = window.setInterval(
        () => setPercent(STUCK_PERCENT - 1 + Math.floor(Math.random() * 3)),
        600,
      );
      return () => window.clearInterval(interval);
    }
    if (phase === "exit" && resolution !== "fade") {
      /* give-way sprints to 100; slam crashes back to 0 alongside the doors. */
      const rampMs = resolution === "slam" ? 500 : EXIT_MS * 0.6;
      const start = performance.now();
      let frame: number;
      const tick = (now: number) => {
        const t = Math.min((now - start) / rampMs, 1);
        setPercent(
          resolution === "slam"
            ? Math.round(STUCK_PERCENT * (1 - t) * (1 - t))
            : Math.round(STUCK_PERCENT + (100 - STUCK_PERCENT) * t),
        );
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }
  }, [phase, reduced, resolution]);

  /* Rotate the excuses while jammed. */
  useEffect(() => {
    if (phase !== "stuck" || stuckMessages.length < 2) return;
    const interval = window.setInterval(
      () => setMessageIndex((i) => (i + 1) % stuckMessages.length),
      1900,
    );
    return () => window.clearInterval(interval);
  }, [phase, stuckMessages.length]);

  if (phase === "done") return null;

  /* In "fade" mode the exit keeps the strain class, so the door is still
     visibly struggling while the overlay fades out around it. */
  const doorAnimation = reduced
    ? undefined
    : phase === "opening"
      ? "animate-door-open"
      : phase === "stuck" || (phase === "exit" && resolution === "fade")
        ? "animate-door-strain"
        : phase === "exit"
          ? resolution === "slam"
            ? "animate-door-slam"
            : "animate-door-give"
          : undefined;

  /* Only a "give-way" exit is a success; everything else stays red. */
  const jammed =
    phase === "stuck" || phase === "sealed" || (phase === "exit" && resolution !== "give-way");

  /* Terminal states: the overlay is staying, and so is the visitor. */
  const terminal = phase === "sealed" || (resolution === "jammed" && phase === "stuck");

  /* Reduced motion renders the doors as stills: the jammed position, then a
     jump cut to closed for a "slam" exit. */
  const stillPercent =
    (phase === "exit" && resolution === "slam") || phase === "sealed" ? 0 : STUCK_PERCENT;
  const doorStyle = (dir: -1 | 1) => ({
    "--door-dir": dir,
    transform:
      reduced && phase !== "boot" ? `translateX(calc(${dir} * ${stillPercent}%))` : undefined,
  }) as React.CSSProperties;

  const message =
    phase === "stuck"
      ? stuckMessages[messageIndex] ?? "Obstruction detected"
      : phase === "exit" || phase === "sealed"
        ? EXIT_MESSAGE[phase === "sealed" ? "slam" : resolution]
        : PHASE_MESSAGE[phase];
  const pill =
    phase === "exit" || phase === "sealed"
      ? EXIT_PILL[phase === "sealed" ? "slam" : resolution]
      : PHASE_PILL[phase];

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[80] overflow-hidden font-sans text-text select-none",
        "transition-opacity duration-500",
        phase === "exit" && resolution !== "slam" && "opacity-0 delay-300",
        terminal && "cursor-not-allowed",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          !reduced && phase === "stuck" && "animate-door-jolt",
          !reduced && phase === "exit" && resolution === "slam" && "animate-door-slam-jolt",
        )}
      >
        {/* What the doors are failing to reveal. */}
        {resolvedBackdrop === "void" && (
          <div className="absolute inset-0 bg-[#04090e]">
            <div
              className={cn(
                "absolute inset-y-0 left-1/2 w-[46%] -translate-x-1/2 blur-2xl transition-colors duration-700",
                jammed && "animate-pulse",
              )}
              style={{
                background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${
                  jammed ? "rgba(255,92,87,0.2)" : "rgba(254,207,24,0.16)"
                }, transparent 70%)`,
              }}
            />
          </div>
        )}

        {/* Door halves. */}
        <Door side="left" animation={doorAnimation} style={doorStyle(-1)} logoSrc={logoSrc} logoWidth={logoWidth} />
        <Door side="right" animation={doorAnimation} style={doorStyle(1)} logoSrc={logoSrc} logoWidth={logoWidth} />

        {/* Door tracks — fixed rails the doors slide behind. */}
        <div className="absolute inset-x-0 top-0 h-2.5 border-b border-line bg-[#050b11] bg-[repeating-linear-gradient(90deg,rgb(232_224_204/0.08)_0_2px,transparent_2px_24px)]" />
        <div className="absolute inset-x-0 bottom-0 h-2.5 border-t border-line bg-[#050b11] bg-[repeating-linear-gradient(90deg,rgb(232_224_204/0.08)_0_2px,transparent_2px_24px)]" />

        {/* Control console. */}
        <div className="absolute bottom-[9vh] left-1/2 w-[min(92vw,520px)] -translate-x-1/2">
          <div className="clip-vault border border-gold/12 bg-panel-fade px-6 py-5 shadow-[0_26px_60px_rgb(0_0_0/0.5)]">
            <div className="flex items-center justify-between gap-3 border-b border-gold/10 pb-3">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-gold">
                {headline}
              </span>
              <StatusPill label={pill.label} tone={pill.tone} />
            </div>
            <div className="mt-4 flex items-end justify-between gap-4">
              <span className="font-display text-5xl leading-none text-gold tabular-nums">
                {String(percent).padStart(3, "0")}
                <span className="ml-1 text-2xl text-gold/60">%</span>
              </span>
              <span className="pb-1 font-mono text-[0.58rem] uppercase tracking-[0.22em] text-muted-2">
                Door aperture
              </span>
            </div>
            <div className="mt-3 h-2.5 border border-line bg-bg-2">
              <div
                className="relative h-full bg-warn transition-[width] duration-300 ease-out"
                style={{ width: `${percent}%` }}
              >
                {jammed && (
                  <span className="absolute inset-y-0 -right-px w-1 animate-pulse bg-red" />
                )}
              </div>
            </div>
            <p className="mt-3.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-2">
              {message}
              <span className="ml-1 animate-pulse text-gold">▮</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Door({
  side,
  animation,
  style,
  logoSrc,
  logoWidth,
}: {
  side: "left" | "right";
  animation?: string;
  style: React.CSSProperties;
  logoSrc?: string;
  logoWidth: number;
}) {
  const left = side === "left";
  /* Capped so the emblem never outgrows small screens; the same expression
     feeds the half-container width and the right half's offset so the two
     halves stay pixel-aligned. */
  const logoW = `min(${logoWidth}px, 52vw)`;
  return (
    <div
      className={cn(
        "absolute inset-y-0 overflow-hidden will-change-transform",
        "bg-[linear-gradient(180deg,#152736_0%,#0e1c2a_55%,#0a1520_100%)]",
        left ? "left-0" : "right-0",
        animation,
      )}
      style={{
        ...style,
        /* Half a tooth wider than 50%, so the teeth interlock when shut. */
        width: `calc(50% + ${TOOTH_DEPTH_PX / 2}px)`,
        clipPath: DOOR_CLIP[side],
      }}
    >
      {/* Brushed-steel verticals. */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,rgb(255_255_255/0.025)_0_1px,transparent_1px_14px)]" />
      {/* Horizontal brace. */}
      <div className="absolute inset-x-0 top-1/2 h-12 -translate-y-1/2 border-y border-line bg-white/[0.02]" />
      {/* Rivets along the outer edge and beside the hazard band. */}
      <div
        className={cn(
          "absolute inset-y-3 w-3 bg-[radial-gradient(circle,rgb(232_224_204/0.16)_1.5px,transparent_2px)] bg-[length:100%_26px]",
          left ? "left-3" : "right-3",
        )}
      />
      <div
        className={cn(
          "absolute inset-y-3 w-3 bg-[radial-gradient(circle,rgb(232_224_204/0.16)_1.5px,transparent_2px)] bg-[length:100%_26px]",
          left ? "right-12" : "left-12",
        )}
      />
      {/* Hazard band at the seam — wide enough to paint the teeth themselves,
          the clip-path cuts it to their shape; mirrored on the right so the
          chevrons meet. */}
      <div
        className={cn(
          "absolute inset-y-0 w-10 bg-warn opacity-90",
          left ? "right-0 border-l border-black/50" : "left-0 -scale-x-100 border-l border-black/50",
        )}
      />
      {/* Seam shadow for depth. */}
      <div
        className={cn(
          "absolute inset-y-0 w-24",
          left
            ? "right-10 bg-gradient-to-l from-black/45 to-transparent"
            : "left-10 bg-gradient-to-r from-black/45 to-transparent",
        )}
      />
      {logoSrc ? (
        /* This half's share of the emblem, aligned so both halves meet at the
           visual seam; the door's clip-path bites the teeth into its edge. */
        <div
          className={cn("absolute top-1/2 -translate-y-1/2 overflow-hidden", left ? "right-0" : "left-0")}
          style={{ width: `calc(${logoW} / 2 + ${TOOTH_DEPTH_PX / 2}px)` }}
        >
          <img
            src={logoSrc}
            alt=""
            draggable={false}
            className="block max-w-none opacity-90 drop-shadow-[0_14px_30px_rgb(0_0_0/0.45)]"
            style={{
              width: logoW,
              marginLeft: left ? 0 : `calc(${TOOTH_DEPTH_PX / 2}px - ${logoW} / 2)`,
            }}
          />
        </div>
      ) : (
        /* Without a logo the halves read "42" across the seam while closed. */
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 font-display text-[34vmin] leading-none text-gold/12",
            "[-webkit-text-stroke:2px_rgb(254_207_24/0.28)]",
            left ? "right-14" : "left-14",
          )}
        >
          {left ? "4" : "2"}
        </span>
      )}
      {/* Manufacturer plate. */}
      <span
        className={cn(
          "absolute top-[12vh] border border-line bg-bg/40 px-3 py-1 font-mono text-[0.55rem] uppercase tracking-[0.22em] text-muted-2",
          left ? "right-14" : "left-14",
        )}
      >
        {left ? "HEX Corp heavy door div." : "Serial № 42-B / Sublevel 01"}
      </span>
    </div>
  );
}
