"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { TumblerColor } from "@/lib/tumbler";

type ColorSwatchProps = {
  color: TumblerColor;
  selected: boolean;
  onSelect: (color: TumblerColor) => void;
};

export function ColorSwatch({ color, selected, onSelect }: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(color)}
      aria-pressed={selected}
      aria-label={color.label}
      className="group flex flex-col items-center gap-2.5"
    >
      <span className="relative flex h-12 w-12 items-center justify-center">
        {selected && (
          <motion.span
            layoutId="color-ring"
            className="absolute inset-0 rounded-full border border-white/80"
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          />
        )}
        <span
          className={cn(
            "h-9 w-9 rounded-full border transition-transform duration-300 group-hover:scale-105",
            selected ? "border-transparent" : "border-white/15",
          )}
          style={{
            background: color.swatchBackground,
            backgroundColor: color.swatch,
            boxShadow:
              color.id === "matte-black"
                ? "inset 0 0 0 1px rgba(255,255,255,0.12)"
                : "inset 0 1px 1px rgba(255,255,255,0.25)",
          }}
        />
      </span>
      <span
        className={cn(
          "text-[10px] tracking-[0.14em] uppercase transition-colors duration-300",
          selected ? "text-white" : "text-white/40 group-hover:text-white/70",
        )}
      >
        {color.shortLabel}
      </span>
    </button>
  );
}
