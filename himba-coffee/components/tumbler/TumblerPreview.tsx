"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TumblerVisual } from "@/lib/tumbler";

type TumblerPreviewProps = {
  visual: TumblerVisual;
  engraving?: string;
  className?: string;
  size?: "hero" | "configurator";
};

export function TumblerPreview({
  visual,
  engraving = "",
  className,
  size = "hero",
}: TumblerPreviewProps) {
  const isHero = size === "hero";
  const name = engraving.trim();
  const tint = visual.tint;

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[220px]",
        /* Real product shots are 768×1024 (3:4) */
        "aspect-[3/4]",
        isHero && "max-w-[300px] md:max-w-[360px]",
        !isHero && "max-w-[340px] md:max-w-[420px]",
        className,
      )}
      style={
        {
          /* Anchored under “BREWED EVERYWHERE” at the bottle base */
          "--engraving-top": "89%",
          "--engraving-width": "28%",
        } as React.CSSProperties
      }
    >
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={visual.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-[1] isolate"
        >
          {/* Always a real product photo — silhouette, cap, grip, branding */}
          <Image
            src={visual.image}
            alt={`${visual.label} Himba tumbler`}
            fill
            priority={
              isHero ||
              visual.id === "matte-black" ||
              visual.id === "variant-2"
            }
            sizes="(max-width: 768px) 340px, 420px"
            className="object-contain object-center"
          />

          {/* Soft finish tint when a dedicated variant PNG is not available yet */}
          {tint ? (
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0",
                visual.engravingOnLight
                  ? "opacity-[0.42] mix-blend-color"
                  : "opacity-[0.55] mix-blend-soft-light",
              )}
              style={{
                background: `radial-gradient(ellipse 42% 70% at 50% 48%, ${tint} 0%, transparent 72%)`,
              }}
            />
          ) : null}
        </motion.div>
      </AnimatePresence>

      <div
        className="pointer-events-none absolute z-[2] flex items-start justify-center"
        style={{
          top: "var(--engraving-top)",
          left: "50%",
          width: "var(--engraving-width)",
          transform: "translateX(-50%)",
        }}
        aria-hidden={!name}
      >
        <p
          className={cn(
            "w-full truncate text-center font-medium uppercase",
            visual.engravingOnLight
              ? "laser-engraving laser-engraving--on-light"
              : "laser-engraving",
            isHero
              ? "text-[clamp(0.5rem,1.35vw,0.7rem)] tracking-[0.2em]"
              : "text-[clamp(0.55rem,1.2vw,0.78rem)] tracking-[0.18em]",
          )}
        >
          {name || "\u00A0"}
        </p>
      </div>
    </div>
  );
}
