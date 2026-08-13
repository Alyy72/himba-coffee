"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Expand, MessageCircle } from "lucide-react";
import { ProductInspectModal } from "@/components/store/ProductInspectModal";
import type { CatalogProduct } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { buildWhatsAppCatalogOrderUrl } from "@/lib/whatsapp";

type CatalogProductCardProps = {
  product: CatalogProduct;
  index: number;
};

export function CatalogProductCard({ product, index }: CatalogProductCardProps) {
  const [open, setOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selection, setSelection] = useState<Record<string, string>>({});

  const gallery = product.gallery?.length ? product.gallery : [product.image];

  const missingRequired = useMemo(() => {
    if (!product.options?.length) return false;
    return product.options.some(
      (opt) => opt.required && !selection[opt.kind],
    );
  }, [product.options, selection]);

  const orderUrl = buildWhatsAppCatalogOrderUrl(product, selection);

  const displayImage = useMemo(() => {
    const colorOpt = product.options?.find((o) => o.kind === "color");
    if (!colorOpt || !selection.color) return activeImage;
    const choice = colorOpt.choices.find((c) => c.label === selection.color);
    return choice?.image ?? activeImage;
  }, [product.options, selection.color, activeImage]);

  function selectOption(kind: string, label: string, image?: string) {
    setSelection((prev) => ({ ...prev, [kind]: label }));
    if (image) {
      setActiveImage(image);
    }
  }

  function openInspect() {
    setActiveImage(displayImage);
    setOpen(true);
  }

  const orderControls = (
    <div className="space-y-5">
      {product.options?.map((opt) => (
        <div key={opt.kind}>
          <p className="mb-3 text-[11px] tracking-[0.2em] text-white/45 uppercase">
            {opt.label}
            {opt.required ? " *" : ""}
          </p>
          <div className="flex flex-wrap gap-2">
            {opt.choices.map((choice) => {
              const selected = selection[opt.kind] === choice.label;
              if (opt.kind === "color" && choice.swatch) {
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() =>
                      selectOption(opt.kind, choice.label, choice.image)
                    }
                    aria-pressed={selected}
                    aria-label={choice.label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                      selected ? "border-white" : "border-white/20",
                    )}
                  >
                    <span
                      className="h-7 w-7 rounded-full border border-white/10"
                      style={{ background: choice.swatch }}
                    />
                  </button>
                );
              }
              return (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() =>
                    selectOption(opt.kind, choice.label, choice.image)
                  }
                  aria-pressed={selected}
                  className={cn(
                    "inline-flex h-10 min-w-11 items-center justify-center border px-3 text-xs tracking-[0.14em] uppercase transition-colors",
                    selected
                      ? "border-white bg-white text-[#0A0A0A]"
                      : "border-white/20 text-white/70 hover:border-white/45 hover:text-white",
                  )}
                >
                  {choice.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {missingRequired ? (
        <p className="text-sm text-white/40">
          Select required options to continue.
        </p>
      ) : null}

      <a
        href={missingRequired ? undefined : orderUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={missingRequired}
        onClick={(e) => {
          if (missingRequired) e.preventDefault();
        }}
        className={cn(
          "inline-flex h-12 w-full items-center justify-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase transition-colors",
          missingRequired
            ? "cursor-not-allowed border border-white/10 text-white/25"
            : "bg-[#F2F2F2] text-[#0A0A0A] hover:bg-white",
        )}
      >
        <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
        Order via WhatsApp
      </a>
    </div>
  );

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.65,
          delay: index * 0.04,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="group flex flex-col border border-white/8 bg-[#0E0E0E] transition-colors duration-300 hover:border-white/18"
      >
        <button
          type="button"
          onClick={openInspect}
          className="relative aspect-[4/5] w-full overflow-hidden bg-[#121212] text-left"
        >
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized
          />
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 bg-black/50 px-2.5 py-1.5 text-[10px] tracking-[0.16em] text-white/70 uppercase backdrop-blur-sm transition-colors group-hover:text-white">
            <Expand className="h-3 w-3" strokeWidth={1.75} />
            View
          </span>
        </button>

        <div className="flex flex-1 flex-col border-t border-white/8 px-5 py-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-base font-medium tracking-[-0.02em] text-[#F2F2F2] md:text-lg">
              {product.name}
            </h3>
            <p className="shrink-0 text-sm tracking-[0.08em] text-white/50">
              {product.priceAed} AED
            </p>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-white/35">
            {product.description}
          </p>

          <div className="mt-5">{orderControls}</div>
        </div>
      </motion.article>

      <ProductInspectModal
        open={open}
        onClose={() => setOpen(false)}
        title={product.name}
        images={gallery}
        activeImage={activeImage}
        onSelectImage={setActiveImage}
      >
        <p className="mb-6 text-sm leading-relaxed text-white/50">
          {product.description}
        </p>
        <p className="mb-6 text-xl font-medium tracking-[-0.02em] text-[#F2F2F2]">
          {product.priceAed} AED
        </p>
        {orderControls}
      </ProductInspectModal>
    </>
  );
}
