"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { InteractiveTumblerViewer } from "@/components/product-story/InteractiveTumblerViewer";
import {
  STORY_TUMBLERS,
  type StoryTumbler,
  type TumblerPartId,
} from "@/lib/product-story";
import { cn } from "@/lib/utils";

function TumblerStoryBlock({
  tumbler,
  index,
}: {
  tumbler: StoryTumbler;
  index: number;
}) {
  const [activePart, setActivePart] = useState<TumblerPartId | null>(null);
  const active = tumbler.parts.find((p) => p.id === activePart);

  return (
    <motion.article
      id={tumbler.id}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="scroll-mt-28 border-t border-white/8 py-16 md:py-24"
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <InteractiveTumblerViewer
          tumbler={tumbler}
          activePart={activePart}
          onPartFocus={setActivePart}
        />

        <div className="flex flex-col lg:pt-2">
          <p className="text-[11px] tracking-[0.28em] text-white/40 uppercase">
            0{index + 1} · {tumbler.finish}
          </p>
          <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-semibold tracking-[-0.03em] text-[#F2F2F2]">
            {tumbler.name}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/50">
            {tumbler.story}
          </p>

          <div className="mt-10">
            <p className="mb-4 text-[11px] tracking-[0.22em] text-white/40 uppercase">
              Anatomy
            </p>
            <ul className="space-y-2">
              {tumbler.parts.map((part) => {
                const selected = activePart === part.id;
                return (
                  <li key={part.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setActivePart(selected ? null : part.id)
                      }
                      className={cn(
                        "flex w-full items-center justify-between border px-4 py-3 text-left transition-colors",
                        selected
                          ? "border-white/35 bg-white/[0.06]"
                          : "border-white/8 hover:border-white/20",
                      )}
                    >
                      <span
                        className={cn(
                          "text-sm tracking-[-0.01em]",
                          selected ? "text-white" : "text-white/65",
                        )}
                      >
                        {part.name}
                      </span>
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          background: selected ? tumbler.accent : "transparent",
                          boxShadow: selected
                            ? `0 0 0 1px ${tumbler.accent}`
                            : "inset 0 0 0 1px rgba(255,255,255,0.25)",
                        }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="mt-6 border border-white/12 bg-[#121212] px-5 py-5"
              >
                <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase">
                  {active.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {active.detail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/customize"
              className="inline-flex h-12 items-center gap-2 bg-[#F2F2F2] px-6 text-[11px] font-medium tracking-[0.16em] text-[#0A0A0A] uppercase transition-colors hover:bg-white"
            >
              Customize
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/store#tumblers"
              className="inline-flex h-12 items-center border border-white/20 px-6 text-[11px] tracking-[0.16em] text-white/70 uppercase transition-colors hover:border-white/40 hover:text-white"
            >
              Shop Tumblers
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductStoryGallery() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-[11px] tracking-[0.28em] text-white/40 uppercase">
          Product Story · 3D Gallery
        </p>
        <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-[#F2F2F2]">
          Four finishes. Every detail.
        </h1>
        <p className="mt-5 max-w-xl text-lg text-white/45">
          Rotate each tumbler, open the cutaway, and explore every component —
          from vacuum walls to the color-matched straw.
        </p>
      </motion.div>

      <nav className="mt-10 flex gap-2 overflow-x-auto pb-2">
        {STORY_TUMBLERS.map((t) => (
          <a
            key={t.id}
            href={`#${t.id}`}
            className="inline-flex h-10 shrink-0 items-center gap-2 border border-white/15 px-4 text-[10px] tracking-[0.16em] text-white/55 uppercase transition-colors hover:border-white/40 hover:text-white"
          >
            <span
              className="h-2.5 w-2.5 rounded-full border border-white/20"
              style={{ background: t.accent }}
            />
            {t.name}
          </a>
        ))}
      </nav>

      <div>
        {STORY_TUMBLERS.map((tumbler, index) => (
          <TumblerStoryBlock
            key={tumbler.id}
            tumbler={tumbler}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
