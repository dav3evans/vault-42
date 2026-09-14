"use client";

import { useEffect, useRef, useState } from "react";
import { StatusPill, type StatusPillTone } from "../../atoms/StatusPill/StatusPill";
import { ConsoleMoss, DoorCreepers, DoorMoss, LogoVines, Overgrowth } from "./VaultDoorsFoliage";
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
   * URL of the site logo (e.g. "/brand/logo.webp"), mounted as a plaque on
   * the right door. Without it the doors fall back to the big 4|2 numerals.
   */
  logoSrc?: string;
  /** Rendered logo width in px (capped to 38vw on small screens). */
  logoWidth?: number;
  /** Case-insensitive code that, typed into the "access denied" readout, forces a give-way exit. */
  overrideCode?: string;
  /**
   * Nature has been reclaiming the facility: vines hanging from the top of
   * the window and the logo plaque, creepers from the sides. On by default;
   * pass false for a freshly-built vault.
   */
  overgrown?: boolean;
  /**
   * Moss as well — bands along the window edges plus clumps on the doors and
   * console. Off by default; only applies while `overgrown` is on.
   */
  moss?: boolean;
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
  overrideCode = "42",
  overgrown = true,
  moss = false,
  className,
}: VaultDoorsProps) {
  const resolvedBackdrop = backdrop ?? (resolution === "jammed" ? "transparent" : "void");
  const [phase, setPhase] = useState<Phase>("boot");
  const [percent, setPercent] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const [showOverrideInput, setShowOverrideInput] = useState(false);
  const [overrideValue, setOverrideValue] = useState("");
  const [overrideDenied, setOverrideDenied] = useState(false);
  const [overridden, setOverridden] = useState(false);
  const activeResolution: VaultDoorsResolution = overridden ? "give-way" : resolution;

  /* Phase timeline. With reduced motion we skip the theatrics and hold the
     jammed frame as a still until the fade. */
  useEffect(() => {
    const stuckAt = reduced ? 300 : BOOT_MS + OPEN_MS;
    const timers: number[] = [
      window.setTimeout(() => setPhase(reduced ? "stuck" : "opening"), reduced ? 300 : BOOT_MS),
    ];
    if (!reduced) timers.push(window.setTimeout(() => setPhase("stuck"), stuckAt));
    if (activeResolution === "jammed") {
      /* The door never resolves; the sequence settles once it jams. */
      timers.push(window.setTimeout(() => onCompleteRef.current?.(), stuckAt));
    } else {
      const exitMs = activeResolution === "slam" ? SLAM_EXIT_MS : EXIT_MS;
      const exitAt = Math.max(stuckAt + MIN_STUCK_MS, duration - exitMs);
      timers.push(window.setTimeout(() => setPhase("exit"), exitAt));
      timers.push(
        window.setTimeout(() => {
          setPhase(activeResolution === "slam" ? "sealed" : "done");
          onCompleteRef.current?.();
        }, exitAt + exitMs),
      );
    }
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [duration, reduced, activeResolution]);

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
    if (phase === "exit" && activeResolution !== "fade") {
      /* give-way sprints to 100; slam crashes back to 0 alongside the doors. */
      const rampMs = activeResolution === "slam" ? 500 : EXIT_MS * 0.6;
      const start = performance.now();
      let frame: number;
      const tick = (now: number) => {
        const t = Math.min((now - start) / rampMs, 1);
        setPercent(
          activeResolution === "slam"
            ? Math.round(STUCK_PERCENT * (1 - t) * (1 - t))
            : Math.round(STUCK_PERCENT + (100 - STUCK_PERCENT) * t),
        );
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(frame);
    }
  }, [phase, reduced, activeResolution]);

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
      : phase === "stuck" || (phase === "exit" && activeResolution === "fade")
        ? "animate-door-strain"
        : phase === "exit"
          ? activeResolution === "slam"
            ? "animate-door-slam"
            : "animate-door-give"
          : undefined;

  /* Only a "give-way" exit is a success; everything else stays red. */
  const jammed =
    phase === "stuck" ||
    phase === "sealed" ||
    (phase === "exit" && activeResolution !== "give-way");

  /* Terminal states: the overlay is staying, and so is the visitor. */
  const terminal = phase === "sealed" || (activeResolution === "jammed" && phase === "stuck");

  /* Reduced motion renders the doors as stills: the jammed position, then a
     jump cut to closed for a "slam" exit. */
  const stillPercent =
    (phase === "exit" && activeResolution === "slam") || phase === "sealed" ? 0 : STUCK_PERCENT;
  const doorStyle = (dir: -1 | 1) => ({
    "--door-dir": dir,
    transform:
      reduced && phase !== "boot" ? `translateX(calc(${dir} * ${stillPercent}%))` : undefined,
  }) as React.CSSProperties;

  const message =
    phase === "stuck"
      ? stuckMessages[messageIndex] ?? "Obstruction detected"
      : phase === "exit" || phase === "sealed"
        ? EXIT_MESSAGE[phase === "sealed" ? "slam" : activeResolution]
        : PHASE_MESSAGE[phase];
  const pill =
    phase === "exit" || phase === "sealed"
      ? EXIT_PILL[phase === "sealed" ? "slam" : activeResolution]
      : PHASE_PILL[phase];

  const showingDenied =
    !overridden && ((phase === "exit" && resolution === "slam") || phase === "sealed");

  function submitOverride() {
    const guess = overrideValue.trim().toLowerCase();
    if (!guess) return;
    if (guess === overrideCode.trim().toLowerCase()) {
      setOverridden(true);
      setShowOverrideInput(false);
      setOverrideValue("");
      setPhase("boot");
      setPercent(0);
      setMessageIndex(0);
    } else {
      setOverrideDenied(true);
      setOverrideValue("");
      window.setTimeout(() => setOverrideDenied(false), 320);
    }
  }

  return (
    <div
      aria-hidden
      className={cn(
        "fixed inset-0 z-[80] overflow-hidden font-sans text-text select-none",
        "transition-opacity duration-500",
        phase === "exit" && activeResolution !== "slam" && "opacity-0 delay-300",
        terminal && "cursor-not-allowed",
        className,
      )}
    >
      <div
        className={cn(
          "absolute inset-0",
          !reduced && phase === "stuck" && "animate-door-jolt",
          !reduced && phase === "exit" && activeResolution === "slam" && "animate-door-slam-jolt",
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
        <Door side="left" animation={doorAnimation} style={doorStyle(-1)} numeral={logoSrc ? undefined : "4"} mossy={overgrown && moss} viny={overgrown} />
        <Door side="right" animation={doorAnimation} style={doorStyle(1)} numeral={logoSrc ? undefined : "2"} mossy={overgrown && moss} viny={overgrown} />

        {/* The logo plaque, bolted to the right door. It lives outside the
            door div (which would clip it into the teeth) on a sibling layer
            running the identical animation, so it stays glued to the door. */}
        {logoSrc && (
          <div
            className={cn("pointer-events-none absolute inset-y-0 right-0", doorAnimation)}
            style={{ ...doorStyle(1), width: `calc(50% + ${TOOTH_DEPTH_PX / 2}px)` }}
          >
            {/* Behind the plaque, so the vines read as hanging from it. */}
            {overgrown && <LogoVines width={`min(${logoWidth}px, 52vw)`} />}
            <img
              src={logoSrc}
              alt=""
              draggable={false}
              className="absolute top-1/2 max-w-none opacity-95 drop-shadow-[0_18px_28px_rgb(0_0_0/0.5)]"
              style={{
                /* Centred on the seam while shut (the door's leading edge sits
                   half a tooth past screen centre), riding right with the door
                   as it opens. */
                left: `${TOOTH_DEPTH_PX / 2}px`,
                width: `min(${logoWidth}px, 52vw)`,
                /* Hanging a touch crooked — one of the bolts has gone. */
                transform: "translate(-50%, -50%) rotate(-1.6deg)",
              }}
            />
          </div>
        )}

        {/* Door tracks — fixed rails the doors slide behind. */}
        <div className="absolute inset-x-0 top-0 h-2.5 border-b border-line bg-[#050b11] bg-[repeating-linear-gradient(90deg,rgb(232_224_204/0.08)_0_2px,transparent_2px_24px)]" />
        <div className="absolute inset-x-0 bottom-0 h-2.5 border-t border-line bg-[#050b11] bg-[repeating-linear-gradient(90deg,rgb(232_224_204/0.08)_0_2px,transparent_2px_24px)]" />

        {/* Overgrowth pinned to the frame — the doors slide beneath it. */}
        {overgrown && <Overgrowth moss={moss} />}

        {/* Control console. */}
        <div className="absolute bottom-[9vh] left-1/2 w-[min(92vw,520px)] -translate-x-1/2">
          {overgrown && moss && <ConsoleMoss />}
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
            {showingDenied && showOverrideInput ? (
              <div
                className={cn(
                  "mt-3.5 flex items-center gap-1.5 border-b border-gold/30 pb-0.5",
                  overrideDenied && "animate-door-jolt border-red",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[0.66rem] text-gold",
                    overrideDenied && "text-red",
                  )}
                >
                  &gt;
                </span>
                <input
                  autoFocus
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  value={overrideValue}
                  onChange={(event) => setOverrideValue(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") submitOverride();
                    if (event.key === "Escape") {
                      setShowOverrideInput(false);
                      setOverrideValue("");
                    }
                  }}
                  onBlur={() => {
                    if (!overrideValue) setShowOverrideInput(false);
                  }}
                  placeholder="ENTER OVERRIDE CODE"
                  className={cn(
                    "w-full bg-transparent font-mono text-[0.66rem] uppercase tracking-[0.18em] text-gold outline-none placeholder:text-muted-2",
                    overrideDenied && "text-red",
                  )}
                />
              </div>
            ) : (
              <p
                className={cn(
                  "mt-3.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted-2",
                  showingDenied && "cursor-pointer hover:text-gold",
                )}
                onClick={showingDenied ? () => setShowOverrideInput(true) : undefined}
              >
                {message}
                <span className="ml-1 animate-pulse text-gold">▮</span>
              </p>
            )}
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
  numeral,
  mossy,
  viny,
}: {
  side: "left" | "right";
  animation?: string;
  style: React.CSSProperties;
  numeral?: string;
  mossy?: boolean;
  viny?: boolean;
}) {
  const left = side === "left";
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
      {/* Without a logo the halves read "42" across the seam while closed. */}
      {numeral && (
        <span
          className={cn(
            "absolute top-1/2 -translate-y-1/2 font-display text-[34vmin] leading-none text-gold/12",
            "[-webkit-text-stroke:2px_rgb(254_207_24/0.28)]",
            left ? "right-14" : "left-14",
          )}
        >
          {numeral}
        </span>
      )}
      {/* Decades of neglect, painted over everything above (hazard band
          included, so the stripes read as worn). Mirrored on the right door
          so the corrosion isn't identical twins. */}
      <div className={cn("absolute inset-0", !left && "-scale-x-100")} aria-hidden>
        {/* Soft rust blooms, heaviest low down and along edges. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "radial-gradient(220px 150px at 7% 97%, rgb(96 50 22 / 0.5), transparent 70%)",
              "radial-gradient(180px 120px at 97% 90%, rgb(110 58 24 / 0.42), transparent 70%)",
              "radial-gradient(130px 90px at 88% 5%, rgb(84 44 18 / 0.36), transparent 72%)",
              "radial-gradient(260px 110px at 46% 100%, rgb(74 38 15 / 0.48), transparent 75%)",
              "radial-gradient(100px 70px at 13% 32%, rgb(98 52 22 / 0.26), transparent 70%)",
              "radial-gradient(70px 54px at 70% 54%, rgb(122 66 26 / 0.2), transparent 70%)",
            ].join(", "),
          }}
        />
        {/* Rust pitting — two offset speckle grids. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(rgb(130 72 30 / 0.14) 1px, transparent 1.4px), radial-gradient(rgb(52 28 12 / 0.2) 1px, transparent 1.3px)",
            backgroundSize: "9px 11px, 13px 17px",
            backgroundPosition: "0 0, 4px 7px",
          }}
        />
        {/* Drip streaks running down from the track and fittings. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "linear-gradient(180deg, rgb(92 48 20 / 0.5), transparent 85%)",
              "linear-gradient(180deg, rgb(80 42 18 / 0.4), transparent 80%)",
              "linear-gradient(180deg, rgb(106 56 24 / 0.34), transparent 85%)",
              "linear-gradient(180deg, rgb(70 36 16 / 0.42), transparent 82%)",
            ].join(", "),
            backgroundSize: "3px 36%, 5px 48%, 2px 30%, 4px 26%",
            backgroundPosition: "18% 0, 44% 13%, 69% 0, 87% 47%",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* Faint scratches and a grime vignette. */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: [
              "repeating-linear-gradient(38deg, rgb(233 224 204 / 0.045) 0 1px, transparent 1px 88px)",
              "repeating-linear-gradient(-24deg, rgb(0 0 0 / 0.24) 0 1px, transparent 1px 61px)",
              "radial-gradient(120% 90% at 50% 32%, transparent 52%, rgb(0 0 0 / 0.42) 100%)",
            ].join(", "),
          }}
        />
      </div>
      {mossy && <DoorMoss side={side} />}
      {viny && <DoorCreepers side={side} />}
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
