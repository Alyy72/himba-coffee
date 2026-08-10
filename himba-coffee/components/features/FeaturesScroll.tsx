"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const FEATURES = [
  {
    id: "steep",
    title: "The 3-Minute Steep",
    body: "Add coarse grounds. Pour hot water. Wait three to four minutes. Press. A full French Press ritual — anywhere the day takes you.",
  },
  {
    id: "insulated",
    title: "Double-Wall Insulated",
    body: "Built for the Dubai commute. Keeps your brew hot from the first pour to the last sip, through heat, traffic, and long days.",
  },
  {
    id: "engraved",
    title: "Laser Engraved Perfection",
    body: "A silver Himba mountain mark on every tumbler — plus your name, laser-etched beneath it. Personal. Permanent. Precise.",
  },
] as const;

function FeatureBlock({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.35"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  return (
    <motion.article
      ref={ref}
      style={{ opacity, y, scale }}
      className="mx-auto max-w-4xl py-[18vh] md:py-[22vh]"
    >
      <p className="text-[11px] tracking-[0.35em] text-white/35 uppercase">
        0{index + 1}
      </p>
      <h3 className="mt-5 text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-[#F2F2F2]">
        {title}
      </h3>
      <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50 md:text-xl">
        {body}
      </p>
    </motion.article>
  );
}

export function FeaturesScroll() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-[#0A0A0A] px-6 md:px-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]"
      />

      <div className="relative mx-auto max-w-6xl pt-24 md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-[11px] tracking-[0.3em] text-white/40 uppercase"
        >
          Designed for the ritual
        </motion.p>
      </div>

      <div className="relative mx-auto max-w-6xl pb-16">
        {FEATURES.map((feature, index) => (
          <FeatureBlock
            key={feature.id}
            title={feature.title}
            body={feature.body}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
