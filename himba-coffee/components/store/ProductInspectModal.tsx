"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ProductInspectModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  images: string[];
  activeImage: string;
  onSelectImage: (src: string) => void;
  children?: React.ReactNode;
};

export function ProductInspectModal({
  open,
  onClose,
  title,
  images,
  activeImage,
  onSelectImage,
  children,
}: ProductInspectModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92svh] w-full max-w-3xl flex-col overflow-hidden border border-white/10 bg-[#0E0E0E] sm:mx-6"
          >
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
              <p className="text-sm tracking-[0.18em] text-white/70 uppercase">
                {title}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center text-white/50 transition-colors hover:text-white"
                aria-label="Close product view"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="overflow-y-auto">
              <div className="relative mx-auto aspect-square w-full max-w-xl bg-[#121212]">
                <Image
                  src={activeImage}
                  alt={title}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 768px) 100vw, 640px"
                  unoptimized
                />
              </div>

              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-5 py-4">
                  {images.map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => onSelectImage(src)}
                      className={cn(
                        "relative h-16 w-16 shrink-0 overflow-hidden border transition-colors",
                        activeImage === src
                          ? "border-white/60"
                          : "border-white/15 hover:border-white/35",
                      )}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="64px"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}

              {children && (
                <div className="border-t border-white/8 px-5 py-6">{children}</div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
