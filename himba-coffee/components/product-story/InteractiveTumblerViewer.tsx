"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StoryTumbler, TumblerPartId } from "@/lib/product-story";

type ViewMode = "exterior" | "cutaway";

type InteractiveTumblerViewerProps = {
  tumbler: StoryTumbler;
  activePart: TumblerPartId | null;
  onPartFocus: (id: TumblerPartId | null) => void;
};

export function InteractiveTumblerViewer({
  tumbler,
  activePart,
  onPartFocus,
}: InteractiveTumblerViewerProps) {
  const [mode, setMode] = useState<ViewMode>("exterior");
  const dragging = useRef(false);
  const lastX = useRef(0);
  const rotate = useMotionValue(0);
  const smoothRotate = useSpring(rotate, { stiffness: 120, damping: 22 });
  const glareX = useTransform(smoothRotate, [-40, 40], ["35%", "65%"]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    lastX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current || mode !== "exterior") return;
      const delta = e.clientX - lastX.current;
      lastX.current = e.clientX;
      const next = Math.max(-48, Math.min(48, rotate.get() + delta * 0.35));
      rotate.set(next);
    },
    [mode, rotate],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  return (
    <div className="relative">
      <div className="mb-5 flex flex-wrap items-center gap-2">
        {(
          [
            ["exterior", "3D View"],
            ["cutaway", "Cutaway"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => {
              setMode(id);
              onPartFocus(null);
              if (id === "cutaway") rotate.set(0);
            }}
            className={cn(
              "h-9 border px-4 text-[10px] tracking-[0.18em] uppercase transition-colors",
              mode === id
                ? "border-white bg-white text-[#0A0A0A]"
                : "border-white/20 text-white/55 hover:border-white/40 hover:text-white",
            )}
          >
            {label}
          </button>
        ))}
        {mode === "exterior" && (
          <button
            type="button"
            onClick={() => rotate.set(0)}
            className="ml-auto inline-flex h-9 items-center gap-2 text-[10px] tracking-[0.16em] text-white/40 uppercase transition-colors hover:text-white/70"
          >
            <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
            Reset
          </button>
        )}
      </div>

      <div
        className={cn(
          "relative aspect-[4/5] w-full overflow-hidden border border-white/8 bg-[#0E0E0E]",
          mode === "exterior" && "cursor-grab active:cursor-grabbing",
        )}
        onPointerDown={mode === "exterior" ? onPointerDown : undefined}
        onPointerMove={mode === "exterior" ? onPointerMove : undefined}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.06),transparent_55%)]"
        />

        {mode === "exterior" ? (
          <div className="absolute inset-0 flex items-center justify-center perspective-[1200px]">
            <motion.div
              style={{
                rotateY: smoothRotate,
                transformStyle: "preserve-3d",
              }}
              className="relative h-[88%] w-[58%]"
            >
              <Image
                src={tumbler.image}
                alt={`${tumbler.name} Himba tumbler`}
                fill
                className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
                sizes="(max-width: 768px) 80vw, 420px"
                unoptimized
                draggable={false}
              />
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-y-[8%] w-[18%] rounded-full bg-gradient-to-r from-white/25 to-transparent mix-blend-soft-light"
                style={{ left: glareX }}
              />
            </motion.div>

            {/* Hotspots */}
            {tumbler.parts.map((part) => {
              const active = activePart === part.id;
              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPartFocus(active ? null : part.id);
                  }}
                  style={{ left: `${part.x}%`, top: `${part.y}%` }}
                  className={cn(
                    "absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2",
                  )}
                  aria-pressed={active}
                  aria-label={part.name}
                >
                  <span
                    className={cn(
                      "relative flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300",
                      active
                        ? "border-white bg-white"
                        : "border-white/70 bg-black/40 hover:border-white",
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        active ? "bg-[#0A0A0A]" : "bg-white",
                      )}
                    />
                    {!active && (
                      <span className="absolute inset-0 animate-ping rounded-full bg-white/25" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "hidden whitespace-nowrap border px-2 py-1 text-[9px] tracking-[0.14em] uppercase backdrop-blur-sm transition-colors md:inline-block",
                      active
                        ? "border-white/40 bg-white/10 text-white"
                        : "border-white/15 bg-black/50 text-white/70",
                    )}
                  >
                    {part.name}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <CutawayView
            tumbler={tumbler}
            activePart={activePart}
            onPartFocus={onPartFocus}
          />
        )}

        {mode === "exterior" && (
          <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-[10px] tracking-[0.22em] text-white/30 uppercase">
            Drag to rotate · Tap a point to inspect
          </p>
        )}
      </div>
    </div>
  );
}

function CutawayView({
  tumbler,
  activePart,
  onPartFocus,
}: {
  tumbler: StoryTumbler;
  activePart: TumblerPartId | null;
  onPartFocus: (id: TumblerPartId | null) => void;
}) {
  const layers: {
    id: TumblerPartId;
    label: string;
    y: number;
    h: number;
    fill: string;
  }[] = [
    { id: "lid", label: "Spill-proof lid", y: 6, h: 10, fill: "#2a2a2a" },
    { id: "seal", label: "Silicone seal", y: 15, h: 3, fill: "#6b6b6b" },
    {
      id: "finish",
      label: "Exterior finish",
      y: 20,
      h: 58,
      fill: tumbler.bodyTone,
    },
    {
      id: "body",
      label: "Vacuum gap",
      y: 28,
      h: 42,
      fill: "rgba(255,255,255,0.08)",
    },
    {
      id: "lining",
      label: "304 steel lining",
      y: 32,
      h: 34,
      fill: "#9a9a9a",
    },
    { id: "base", label: "Base footpad", y: 86, h: 6, fill: "#1f1f1f" },
    {
      id: "straw",
      label: "Matched straw",
      y: 22,
      h: 52,
      fill: tumbler.strawTone,
    },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center px-4 py-8">
      <div className="relative h-full w-full max-w-[280px]">
        {/* Outer silhouette */}
        <div
          className="absolute inset-x-[22%] top-[6%] bottom-[6%] overflow-hidden rounded-[28px] border border-white/20"
          style={{ background: tumbler.bodyTone }}
        >
          {/* Vacuum gap (cutaway) */}
          <div className="absolute inset-y-[12%] left-0 w-[48%] border-r border-dashed border-white/25 bg-black/35" />
          {/* Inner lining */}
          <div
            className="absolute inset-y-[18%] left-[10%] right-[18%] rounded-[18px] border border-white/20"
            style={{
              background:
                "linear-gradient(90deg, #c8c8c8 0%, #8a8a8a 45%, #b0b0b0 100%)",
            }}
          />
          {/* Straw */}
          <div
            className="absolute top-[8%] left-[46%] h-[62%] w-[7%] rounded-full border border-black/10"
            style={{ background: tumbler.strawTone }}
          />
          {/* Lid cap */}
          <div className="absolute inset-x-[18%] top-0 h-[9%] rounded-b-md bg-[#222]" />
        </div>

        {layers.map((layer) => {
          const active = activePart === layer.id;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => onPartFocus(active ? null : layer.id)}
              className={cn(
                "absolute right-0 flex max-w-[42%] items-center gap-2 text-left transition-opacity",
                active ? "opacity-100" : "opacity-70 hover:opacity-100",
              )}
              style={{ top: `${layer.y}%` }}
            >
              <span
                className={cn(
                  "h-px w-6 shrink-0",
                  active ? "bg-white" : "bg-white/40",
                )}
              />
              <span
                className={cn(
                  "text-[9px] leading-tight tracking-[0.12em] uppercase",
                  active ? "text-white" : "text-white/55",
                )}
              >
                {layer.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
