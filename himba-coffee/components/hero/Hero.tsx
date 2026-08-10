"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TumblerPreview } from "@/components/tumbler/TumblerPreview";
import { colorToVisual, DEFAULT_TUMBLER_COLOR } from "@/lib/tumbler";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] w-full flex-col overflow-hidden bg-[#0A0A0A] md:min-h-[calc(100svh-4.25rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(120,130,150,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_80%_100%,rgba(70,45,30,0.35),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0A0A0A_0%,#111318_42%,#0A0A0A_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <svg
          className="absolute bottom-0 left-0 h-[38%] w-full text-white/[0.04]"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,288 L220,160 L420,220 L680,80 L920,180 L1140,100 L1440,200 L1440,320 L0,320 Z" />
          <path
            d="M0,300 L180,210 L400,250 L700,140 L960,210 L1200,150 L1440,230 L1440,320 L0,320 Z"
            className="opacity-60"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-10 pt-10 md:px-10 md:pt-14">
        <div className="grid flex-1 items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-6">
          <div className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.88] font-semibold tracking-[-0.04em] text-[#F2F2F2]"
            >
              Himba
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 max-w-[16ch] text-[clamp(1.35rem,3.2vw,2.15rem)] leading-[1.15] font-medium tracking-[-0.02em] text-[#C8C8C8]"
            >
              Born in the Himalayas. Brewed Everywhere.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-4 max-w-md text-base leading-relaxed text-white/50 md:text-lg"
            >
              The ultimate French Press tumbler. Steep. Press. Enjoy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
            >
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center bg-[#F2F2F2] px-7 text-sm font-medium tracking-[0.14em] text-[#0A0A0A] uppercase transition-[transform,background-color] duration-300 hover:bg-white active:scale-[0.98]"
              >
                Customize Yours
              </Link>
              <a
                href="#story"
                className="inline-flex h-12 items-center justify-center border border-white/20 px-7 text-sm tracking-[0.14em] text-white/70 uppercase transition-colors duration-300 hover:border-white/40 hover:text-white"
              >
                Our Story
              </a>
            </motion.div>
          </div>

          <div className="order-1 flex items-center justify-center md:order-2">
            <motion.div
              initial={{ y: "45%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 1.35,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TumblerPreview
                  visual={colorToVisual(DEFAULT_TUMBLER_COLOR)}
                  size="hero"
                />
              </motion.div>
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-x-16 -bottom-6 h-24 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12),transparent_70%)] blur-xl"
              />
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-auto flex justify-center pt-8"
        >
          <a
            href="#story"
            className="group flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] text-white/35 uppercase"
          >
            Scroll
            <ChevronDown className="h-4 w-4 transition-transform duration-500 group-hover:translate-y-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
