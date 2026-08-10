"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  VARIANT_CATEGORIES,
  getVariantsByCategory,
  toTumblerVisual,
  type TumblerVariant,
  type TumblerVariantCategoryId,
} from "@/lib/tumbler";

type VariantPickerProps = {
  category: TumblerVariantCategoryId;
  selected: TumblerVariant;
  onCategoryChange: (category: TumblerVariantCategoryId) => void;
  onSelect: (variant: TumblerVariant) => void;
};

export function VariantPicker({
  category,
  selected,
  onCategoryChange,
  onSelect,
}: VariantPickerProps) {
  const variants = getVariantsByCategory(category);

  return (
    <div>
      <p className="mb-4 text-[11px] tracking-[0.22em] text-white/45 uppercase">
        Design
      </p>

      <div
        role="tablist"
        aria-label="Variant categories"
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {VARIANT_CATEGORIES.map((tab) => {
          const active = tab.id === category;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onCategoryChange(tab.id)}
              className={cn(
                "shrink-0 border px-3.5 py-2 text-[10px] tracking-[0.14em] uppercase transition-colors duration-300",
                active
                  ? "border-white/40 bg-white text-[#0A0A0A]"
                  : "border-white/12 text-white/50 hover:border-white/25 hover:text-white/80",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          role="tabpanel"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 grid max-h-[min(42vh,340px)] grid-cols-3 gap-2.5 overflow-y-auto pr-1 sm:grid-cols-4"
        >
          {variants.map((variant) => {
            const isSelected = selected.id === variant.id;
            const visual = toTumblerVisual(variant);
            return (
              <button
                key={variant.id}
                type="button"
                onClick={() => onSelect(variant)}
                aria-pressed={isSelected}
                aria-label={`Variant ${variant.id}: ${variant.name}`}
                className={cn(
                  "group relative flex flex-col overflow-hidden border text-left transition-colors duration-300",
                  isSelected
                    ? "border-white/55 bg-white/[0.06]"
                    : "border-white/8 bg-[#0E0E0E] hover:border-white/22",
                )}
              >
                <span className="relative isolate aspect-[3/4] w-full bg-[#121212]">
                  <Image
                    src={visual.image}
                    alt=""
                    fill
                    sizes="96px"
                    className="object-contain object-center p-1.5 transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                  {visual.tint ? (
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute inset-0",
                        visual.engravingOnLight
                          ? "opacity-[0.4] mix-blend-color"
                          : "opacity-[0.55] mix-blend-soft-light",
                      )}
                      style={{
                        background: `radial-gradient(ellipse 42% 70% at 50% 48%, ${visual.tint} 0%, transparent 72%)`,
                      }}
                    />
                  ) : null}
                </span>
                <span className="flex flex-col gap-0.5 border-t border-white/8 px-2 py-2">
                  <span className="flex items-center justify-between gap-1">
                    <span className="text-[9px] tracking-[0.16em] text-white/35 uppercase">
                      #{variant.id}
                    </span>
                    <span className="text-[9px] tracking-[0.08em] text-white/40 tabular-nums">
                      {variant.priceAed} AED
                    </span>
                  </span>
                  <span
                    className={cn(
                      "line-clamp-2 text-[10px] leading-snug tracking-[0.02em]",
                      isSelected ? "text-white" : "text-white/55",
                    )}
                  >
                    {variant.name}
                  </span>
                </span>
                <span
                  aria-hidden
                  className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full border border-white/20"
                  style={{ background: variant.swatch }}
                />
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
