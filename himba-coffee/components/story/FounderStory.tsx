"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, AtSign, Mail } from "lucide-react";

export function FounderStory() {
  return (
    <section
      id="story"
      className="relative overflow-hidden border-t border-white/8 bg-[#0A0A0A]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_20%,rgba(180,190,210,0.08),transparent_60%)]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(210,190,170,0.22)_0%,rgba(255,255,255,0.06)_40%,transparent_70%)] blur-2xl"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-[0_24px_80px_-12px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.08)]">
              <Image
                src="/founder.jpg"
                alt="Lalit, founder of Himba Coffee"
                fill
                sizes="(max-width: 1024px) 384px, 360px"
                className="object-cover object-[center_20%]"
                priority
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-black/35 via-transparent to-white/5"
              />
            </div>
          </div>

          <div className="mt-7 flex flex-col gap-3.5 px-1">
            <p className="text-sm font-medium tracking-[-0.01em] text-[#F2F2F2]">
              Lalit
              <span className="ml-2 text-xs font-normal tracking-[0.16em] text-white/35 uppercase">
                Founder
              </span>
            </p>
            <a
              href="mailto:Lalitrajbanshi8888@gmail.com"
              className="inline-flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span className="truncate">Lalitrajbanshi8888@gmail.com</span>
            </a>
            <a
              href="https://instagram.com/mrbrewer__2024"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm text-white/55 transition-colors hover:text-white"
            >
              <AtSign className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              @mrbrewer__2024
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.9,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="text-[11px] tracking-[0.28em] text-white/40 uppercase">
            The founder
          </p>
          <h2 className="mt-4 text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-[#F2F2F2]">
            From Nepal to Dubai.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/50">
            Lalit is a barista from Nepal who brought the spirit of the Himalayas
            into the fast-paced coffee culture of the UAE. Himba Coffee was born
            from that journey — a French Press tumbler built for people who want
            a real brew, wherever the day takes them. Born in the mountains.
            Brewed everywhere.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl px-6 pb-24 md:px-10 md:pb-32"
      >
        <div className="flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-14 md:flex-row md:items-end">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-white/40 uppercase">
              Next
            </p>
            <h3 className="mt-3 max-w-md text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-[#F2F2F2]">
              See the bottles in the wild.
            </h3>
          </div>
          <Link
            href="/gallery"
            className="group inline-flex h-14 items-center gap-3 bg-[#F2F2F2] px-8 text-sm font-medium tracking-[0.16em] text-[#0A0A0A] uppercase transition-[transform,background-color] duration-300 hover:bg-white active:scale-[0.98]"
          >
            See the Bottles
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
