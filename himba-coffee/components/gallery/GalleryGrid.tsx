"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type GalleryShot = {
  id: string;
  title: string;
  caption: string;
  setting: string;
  span: string;
  tone: string;
  image?: string;
};

const SHOTS: GalleryShot[] = [
  {
    id: "lavender-botanical",
    title: "Lavender Botanical",
    caption: "Studio · soft violet light",
    setting: "Himba tumbler in the wild",
    span: "md:col-span-2 md:row-span-2",
    tone: "linear-gradient(160deg, #d8c8e0 0%, #b8a0c4 55%, #7a6288 100%)",
    image: "/gallery/lavender-botanical.png",
  },
  {
    id: "matte-black",
    title: "Matte Black",
    caption: "Studio · stealth finish",
    setting: "Himba tumbler in the wild",
    span: "md:col-span-1 md:row-span-1",
    tone: "linear-gradient(160deg, #1a1a1a 0%, #0c0c0c 55%, #222 100%)",
    image: "/gallery/matte-black.png",
  },
  {
    id: "snow-white",
    title: "Snow White",
    caption: "Studio · clean light",
    setting: "Himba tumbler in the wild",
    span: "md:col-span-1 md:row-span-1",
    tone: "linear-gradient(160deg, #f0f0ec 0%, #cfcfc8 55%, #9a9a92 100%)",
    image: "/gallery/snow-white.png",
  },
  {
    id: "himalayan-pink",
    title: "Himalayan Pink",
    caption: "Studio · soft blush",
    setting: "Himba tumbler in the wild",
    span: "md:col-span-2 md:row-span-1",
    tone: "linear-gradient(160deg, #f0c9cd 0%, #d99299 55%, #a85d68 100%)",
    image: "/gallery/himalayan-pink.png",
  },
];

export function GalleryGrid() {
  return (
    <div className="grid auto-rows-[220px] grid-cols-1 gap-3 md:auto-rows-[240px] md:grid-cols-3 md:gap-4">
      {SHOTS.map((shot, index) => (
        <motion.article
          key={shot.id}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.7,
            delay: index * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`group relative overflow-hidden ${shot.span}`}
          style={{ background: shot.tone }}
        >
          {shot.image ? (
            <Image
              src={shot.image}
              alt={`${shot.title} Himba tumbler`}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              priority={index === 0}
            />
          ) : (
            <>
              <div
                aria-hidden
                className="absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-55"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0.35), transparent 50%)",
                }}
              />
              <div
                aria-hidden
                className="absolute top-1/2 left-1/2 h-[68%] w-[22%] -translate-x-1/2 -translate-y-1/2 rounded-[1.5rem] border border-white/15 bg-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)] backdrop-blur-[1px]"
              />
            </>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-5 md:p-6">
            <p className="text-[10px] tracking-[0.22em] text-white/55 uppercase">
              {shot.caption}
            </p>
            <h3 className="mt-1.5 text-lg font-medium tracking-[-0.02em] text-white md:text-xl">
              {shot.title}
            </h3>
            <p className="mt-1 text-xs text-white/40">{shot.setting}</p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
