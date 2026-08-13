"use client";

import { motion } from "framer-motion";
import { TumblerPreview } from "@/components/tumbler/TumblerPreview";
import { colorToVisual, PRICE_AED, type TumblerColor } from "@/lib/tumbler";
import { buildWhatsAppStandardOrderUrl } from "@/lib/whatsapp";

type ProductCardProps = {
  color: TumblerColor;
  index: number;
};

/** Legacy tumbler-only card — kept for any remaining imports. Prefer CatalogProductCard. */
export function ProductCard({ color, index }: ProductCardProps) {
  const orderUrl = buildWhatsAppStandardOrderUrl(color);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group flex flex-col border border-white/8 bg-[#0E0E0E] transition-colors duration-300 hover:border-white/18"
    >
      <div className="relative flex flex-1 items-center justify-center px-6 py-12">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_60%)]"
        />
        <TumblerPreview
          visual={colorToVisual(color)}
          size="configurator"
          className="max-w-[180px] md:max-w-[200px]"
        />
      </div>

      <div className="border-t border-white/8 px-6 py-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-medium tracking-[-0.02em] text-[#F2F2F2]">
            {color.label}
          </h3>
          <p className="text-sm tracking-[0.08em] text-white/50">
            {PRICE_AED} AED
          </p>
        </div>
        <p className="mt-2 text-sm text-white/35">
          Standard French Press tumbler
        </p>
        <a
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex h-12 w-full items-center justify-center border border-white/20 text-[11px] font-medium tracking-[0.16em] text-white/80 uppercase transition-colors duration-300 hover:border-white/45 hover:bg-white hover:text-[#0A0A0A]"
        >
          Order via WhatsApp
        </a>
      </div>
    </motion.article>
  );
}
