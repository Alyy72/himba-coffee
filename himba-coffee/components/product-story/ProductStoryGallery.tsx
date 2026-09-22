"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import {
  STORY_TUMBLERS,
  type StoryTumbler,
  type StoryTumblerId,
  type TumblerPartId,
} from "@/lib/product-story";
import { cn } from "@/lib/utils";

function useActiveFinish() {
  const [activeId, setActiveId] = useState<StoryTumblerId>(
    STORY_TUMBLERS[0]?.id ?? "snow-white",
  );

  useEffect(() => {
    const nodes = STORY_TUMBLERS.map((t) =>
      document.getElementById(t.id),
    ).filter(Boolean) as HTMLElement[];

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target?.id as StoryTumblerId | undefined;
        if (id) setActiveId(id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.15, 0.35, 0.55] },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

function TiltImage({
  tumbler,
  activePart,
  onPartFocus,
  priority,
}: {
  tumbler: StoryTumbler;
  activePart: TumblerPartId | null;
  onPartFocus: (id: TumblerPartId | null) => void;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), {
    stiffness: 160,
    damping: 18,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), {
    stiffness: 160,
    damping: 18,
  });
  const glare = useMotionTemplate`radial-gradient(circle at ${useTransform(mx, [-0.5, 0.5], [20, 80])}% ${useTransform(my, [-0.5, 0.5], [20, 80])}%, rgba(255,255,255,0.35), transparent 55%)`;

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
      }}
      className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDEBE6]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 45% 40% at 50% 58%, ${tumbler.accent}55, transparent 70%)`,
        }}
      />
      <Image
        src={tumbler.image}
        alt={`Himba Coffee ${tumbler.name} French Press travel tumbler — ${tumbler.finish}`}
        fill
        className="object-contain object-center p-6 sm:p-8"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority={priority}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ background: glare }}
      />

      {tumbler.parts.map((part) => {
        const selected = activePart === part.id;
        return (
          <button
            key={part.id}
            type="button"
            aria-label={`${part.name}: ${part.detail}`}
            aria-pressed={selected}
            onClick={() => onPartFocus(selected ? null : part.id)}
            className="group/hot absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${part.x}%`, top: `${part.y}%` }}
          >
            <span
              className={cn(
                "relative flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300",
                selected
                  ? "scale-110 border-white bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.35)]"
                  : "border-black/40 bg-white/85 group-hover/hot:border-black",
              )}
            >
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  selected ? "bg-[#0A0A0A]" : "bg-black/55",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute inset-0 animate-ping rounded-full bg-black/20",
                  selected && "hidden",
                )}
              />
            </span>

            <span
              className={cn(
                "pointer-events-none absolute top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-[10px] tracking-[0.14em] uppercase md:block",
                part.side === "left" ? "right-6 text-right" : "left-6 text-left",
                selected ? "text-[#0A0A0A]" : "text-[#0A0A0A]/65",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "absolute top-1/2 h-px w-7 -translate-y-1/2",
                  part.side === "left" ? "right-[-1.85rem]" : "left-[-1.85rem]",
                  selected ? "bg-black/50" : "bg-black/20",
                )}
              />
              {part.name}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}

function SpecStrip({ tumbler }: { tumbler: StoryTumbler }) {
  const items = [
    {
      label: "Capacity",
      value: `${tumbler.specs.capacityOz} oz / ${tumbler.specs.capacityMl} ml`,
    },
    {
      label: "Size",
      value: `${tumbler.specs.heightMm} × ${tumbler.specs.diameterMm} mm`,
    },
    { label: "Weight", value: `${tumbler.specs.weightG} g` },
    { label: "Material", value: tumbler.specs.material },
  ];

  return (
    <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label} className="bg-[#0A0A0A] px-4 py-4">
          <dt className="text-[10px] tracking-[0.2em] text-white/35 uppercase">
            {item.label}
          </dt>
          <dd className="mt-2 text-sm leading-snug text-white/80">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function TumblerStoryBlock({
  tumbler,
  index,
}: {
  tumbler: StoryTumbler;
  index: number;
}) {
  const [activePart, setActivePart] = useState<TumblerPartId | null>(
    tumbler.parts[0]?.id ?? null,
  );
  const active = tumbler.parts.find((p) => p.id === activePart);
  const reverse = index % 2 === 1;

  return (
    <motion.article
      id={tumbler.id}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.85,
        delay: 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="scroll-mt-32 border-t border-white/8 py-20 md:py-28"
    >
      <div
        className={cn(
          "grid items-start gap-12 lg:grid-cols-2 lg:gap-16",
          reverse && "lg:[&>*:first-child]:order-2",
        )}
      >
        <TiltImage
          tumbler={tumbler}
          activePart={activePart}
          onPartFocus={setActivePart}
          priority={index === 0}
        />

        <div className="flex flex-col lg:pt-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-sans text-[11px] tracking-[0.28em] text-white/40 uppercase">
                0{index + 1} · {tumbler.finish}
              </p>
              <h2 className="font-display mt-3 text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-medium tracking-[-0.03em] text-[#F2F2F2]">
                {tumbler.name}
              </h2>
            </div>
            <p className="font-display text-2xl tracking-[-0.02em] text-white/85">
              {tumbler.priceLabel}
            </p>
          </div>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/50">
            {tumbler.story}
          </p>

          <div className="mt-5 flex items-center gap-2 text-[11px] tracking-[0.08em] text-white/40">
            <ShieldCheck className="h-3.5 w-3.5 text-white/45" strokeWidth={1.5} />
            <span>{tumbler.trust}</span>
          </div>

          <SpecStrip tumbler={tumbler} />

          <div className="mt-10">
            <p className="mb-3 font-sans text-[11px] tracking-[0.22em] text-white/40 uppercase">
              Annotated anatomy
            </p>
            <p className="mb-5 text-sm text-white/40">
              Tap a hotspot on the bottle — or choose a part below.
            </p>
            <div className="flex flex-wrap gap-2">
              {tumbler.parts.map((part) => {
                const selected = activePart === part.id;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setActivePart(part.id)}
                    className={cn(
                      "border px-3 py-2 text-[10px] tracking-[0.14em] uppercase transition-colors",
                      selected
                        ? "border-white bg-white text-[#0A0A0A]"
                        : "border-white/15 text-white/55 hover:border-white/35 hover:text-white",
                    )}
                  >
                    {part.name}
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-6 border border-white/12 bg-gradient-to-br from-white/[0.06] to-transparent px-5 py-5"
              >
                <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase">
                  {active.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  {active.detail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href={tumbler.ctaPrimary.href}
              className="group relative inline-flex h-12 items-center overflow-hidden bg-[#F2F2F2] px-6 text-[11px] font-medium tracking-[0.16em] text-[#0A0A0A] uppercase"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100"
              />
              <span className="relative z-10 flex items-center gap-2">
                {tumbler.ctaPrimary.label}
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href={tumbler.ctaSecondary.href}
              className="group inline-flex h-12 items-center border border-white/20 px-6 text-[11px] tracking-[0.16em] text-white/70 uppercase transition-colors hover:border-white hover:bg-white hover:text-[#0A0A0A]"
            >
              {tumbler.ctaSecondary.label}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function ProductStoryGallery() {
  const activeId = useActiveFinish();

  return (
    <div className="relative mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-sans text-[11px] tracking-[0.28em] text-white/40 uppercase">
          Product Story
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-[clamp(2.75rem,6.5vw,4.75rem)] leading-[0.96] font-medium tracking-[-0.035em] text-[#F2F2F2]">
          Four finishes.
          <span className="text-white/45"> Every detail.</span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/45">
          Explore Snow White, Matte Black, Lavender Botanical, and Himalayan
          Pink — annotated, specified, and ready to make yours.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] tracking-[0.12em] text-white/35 uppercase">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3 w-3 fill-white/50 text-white/50" />
            4.9 average
          </span>
          <span className="h-3 w-px bg-white/15" />
          <span>1-year warranty</span>
          <span className="h-3 w-px bg-white/15" />
          <span>Food-grade 304</span>
        </div>
      </motion.div>

      {/* Sticky finish mini-nav */}
      <div className="sticky top-20 z-30 -mx-2 mt-12 mb-2 md:top-24">
        <nav
          aria-label="Finish navigator"
          className="flex gap-1.5 overflow-x-auto rounded-full border border-white/12 bg-[#0A0A0A]/80 p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
        >
          {STORY_TUMBLERS.map((t) => {
            const active = activeId === t.id;
            return (
              <a
                key={t.id}
                href={`#${t.id}`}
                className={cn(
                  "relative inline-flex h-9 shrink-0 items-center gap-2 rounded-full px-3.5 text-[10px] tracking-[0.14em] uppercase transition-colors",
                  active
                    ? "text-[#0A0A0A]"
                    : "text-white/50 hover:text-white/80",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="gallery-finish-pill"
                    className="absolute inset-0 rounded-full bg-[#F2F2F2]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span
                  className="relative z-10 h-2 w-2 rounded-full border border-black/10"
                  style={{ background: t.accent }}
                />
                <span className="relative z-10">{t.name}</span>
              </a>
            );
          })}
        </nav>
      </div>

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
