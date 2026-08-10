"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VariantPicker } from "@/components/configurator/VariantPicker";
import { TumblerPreview } from "@/components/tumbler/TumblerPreview";
import { EngravingInput } from "@/components/ui/EngravingInput";
import { WhatsAppOrderButton } from "@/components/ui/WhatsAppOrderButton";
import {
  DEFAULT_TUMBLER_VARIANT,
  TUMBLER_VARIANTS,
  toTumblerVisual,
  type TumblerVariant,
  type TumblerVariantCategoryId,
} from "@/lib/tumbler";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";

export function Configurator() {
  const [category, setCategory] = useState<TumblerVariantCategoryId>(
    DEFAULT_TUMBLER_VARIANT.category,
  );
  const [variant, setVariant] = useState<TumblerVariant>(DEFAULT_TUMBLER_VARIANT);
  const [engraving, setEngraving] = useState("");
  const deferredEngraving = useDeferredValue(engraving);
  const orderUrl = buildWhatsAppOrderUrl(variant, engraving);
  const visual = toTumblerVisual(variant);

  useEffect(() => {
    const sources = new Set([
      "/base-black.png",
      "/base-white.png",
      "/base-pink.png",
      ...TUMBLER_VARIANTS.map((option) => toTumblerVisual(option).image),
    ]);
    sources.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  function handleSelect(next: TumblerVariant) {
    setVariant(next);
  }

  function handleCategoryChange(next: TumblerVariantCategoryId) {
    setCategory(next);
  }

  return (
    <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-[#0A0A0A] md:min-h-[calc(100svh-4.25rem)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_40%,rgba(255,255,255,0.04),transparent_60%)]"
      />

      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl md:min-h-[calc(100svh-4.25rem)] lg:grid-cols-2">
        {/* Preview pane */}
        <div className="relative flex min-h-[62svh] items-center justify-center px-6 py-14 lg:min-h-full lg:px-12">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_55%)]"
          />
          <motion.div
            layout
            className="relative w-full max-w-[340px]"
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            <TumblerPreview
              visual={visual}
              engraving={deferredEngraving}
              size="configurator"
              className="max-w-[340px] md:max-w-[400px]"
            />
            <AnimatePresence mode="wait">
              <motion.p
                key={variant.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="mt-8 text-center text-xs tracking-[0.28em] text-white/35 uppercase"
              >
                #{variant.id} · {variant.name}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Controls pane */}
        <div className="flex items-start border-t border-white/8 px-6 py-14 lg:items-center lg:border-t-0 lg:border-l lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[11px] tracking-[0.28em] text-white/40 uppercase">
                Configure
              </p>
              <h2 className="mt-3 text-[clamp(2rem,4vw,3rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-[#F2F2F2]">
                Make it yours.
              </h2>
              <p className="mt-5 text-2xl font-medium tracking-[-0.02em] text-[#C8C8C8]">
                {variant.priceAed} AED
                <span className="ml-2 text-sm font-normal tracking-[0.12em] text-white/40 uppercase">
                  — Fully Customized
                </span>
              </p>
            </motion.div>

            <div className="mt-10">
              <VariantPicker
                category={category}
                selected={variant}
                onCategoryChange={handleCategoryChange}
                onSelect={handleSelect}
              />
            </div>

            <EngravingInput
              value={engraving}
              onChange={setEngraving}
              className="mt-10"
            />

            <div className="mt-10">
              <WhatsAppOrderButton href={orderUrl} />
              <p className="mt-4 text-center text-[11px] leading-relaxed text-white/30 lg:text-left">
                Opens WhatsApp with your variant and engraving pre-filled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
