"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function PersonalizeBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden border border-white/12 bg-[linear-gradient(120deg,#141414_0%,#1a1c20_50%,#121212_100%)] px-8 py-12 md:px-14 md:py-16"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_90%_20%,rgba(200,210,230,0.1),transparent_45%)]"
      />
      <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="text-[11px] tracking-[0.28em] text-white/40 uppercase">
            Free engraving
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-[#F2F2F2]">
            Want it personalized? Engrave your name for free.
          </h2>
          <p className="mt-4 text-base text-white/45">
            Pick a finish, add up to 16 characters in silver laser engraving, and
            order in one tap.
          </p>
        </div>
        <Link
          href="/customize"
          className="group inline-flex h-14 shrink-0 items-center gap-3 bg-[#F2F2F2] px-8 text-sm font-medium tracking-[0.16em] text-[#0A0A0A] uppercase transition-[transform,background-color] duration-300 hover:bg-white active:scale-[0.98]"
        >
          Customize
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
