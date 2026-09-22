"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type GalleryShot = {
  id: string;
  title: string;
  caption: string;
  setting: string;
  /** Mobile height + asymmetric md placement */
  className: string;
  image: string;
  alt: string;
};

const SHOTS: GalleryShot[] = [
  {
    id: "lavender-botanical",
    title: "Lavender Botanical",
    caption: "Studio · violet hush",
    setting: "Afternoon light, florals in relief",
    className:
      "min-h-[340px] sm:col-span-2 sm:min-h-[380px] md:col-span-7 md:row-span-2 md:min-h-[520px]",
    image: "/gallery/lavender-botanical.png",
    alt: "Himba Coffee Lavender Botanical tumbler in soft violet studio light",
  },
  {
    id: "matte-black",
    title: "Matte Black",
    caption: "Studio · stealth grain",
    setting: "Low light, powder-coat depth",
    className:
      "min-h-[220px] sm:min-h-[240px] md:col-span-5 md:min-h-[248px]",
    image: "/gallery/matte-black.png",
    alt: "Himba Coffee Matte Black French Press tumbler against dark backdrop",
  },
  {
    id: "snow-white",
    title: "Snow White",
    caption: "Studio · alpine clean",
    setting: "Bright field, enamel glow",
    className:
      "min-h-[260px] sm:min-h-[280px] md:col-span-5 md:min-h-[248px]",
    image: "/gallery/snow-white.png",
    alt: "Himba Coffee Snow White tumbler on a luminous white field",
  },
  {
    id: "himalayan-pink",
    title: "Himalayan Pink",
    caption: "Studio · mountain blush",
    setting: "Warm cast, sunrise tone",
    className:
      "min-h-[300px] sm:col-span-2 sm:min-h-[320px] md:col-span-12 md:min-h-[300px]",
    image: "/gallery/himalayan-pink.png",
    alt: "Himba Coffee Himalayan Pink tumbler with warm blush studio lighting",
  },
];

export function GalleryGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-12 md:gap-4">
      {SHOTS.map((shot, index) => (
        <motion.article
          key={shot.id}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.75,
            delay: index * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`group relative overflow-hidden bg-[#F4F4F2] ${shot.className}`}
        >
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src={shot.image}
              alt={shot.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 70vw"
              className="object-contain object-center p-6 sm:p-8"
              priority={index === 0}
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-90" />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
            <p className="font-sans text-[10px] tracking-[0.22em] text-white/60 uppercase">
              {shot.caption}
            </p>
            <h3 className="font-display mt-1.5 text-xl font-medium tracking-[-0.02em] text-white md:text-2xl">
              {shot.title}
            </h3>
            <p className="mt-1 text-xs text-white/45">{shot.setting}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
