import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProductStoryGallery } from "@/components/product-story/ProductStoryGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Product story & 3D gallery — Pure White, Matte Black, Lavender Botanical, and Soft Pink Himba tumblers in detail.",
};

export default function GalleryPage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 pt-16 pb-8 md:px-10 md:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(160,170,190,0.1),transparent_55%)]"
        />
        <ProductStoryGallery />
      </section>

      <section className="relative overflow-hidden border-t border-white/8 bg-[#0A0A0A] px-6 py-20 md:px-10 md:py-28">
        <div className="relative mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.28em] text-white/40 uppercase">
            In the wild
          </p>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-[#F2F2F2]">
            Bottles where the day happens.
          </h2>
          <div className="mt-12 md:mt-16">
            <GalleryGrid />
          </div>

          <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-14 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] tracking-[0.28em] text-white/40 uppercase">
                Ready
              </p>
              <h3 className="mt-3 max-w-md text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-[#F2F2F2]">
                Take one home.
              </h3>
            </div>
            <Link
              href="/store#tumblers"
              className="group inline-flex h-14 items-center gap-3 bg-[#F2F2F2] px-8 text-sm font-medium tracking-[0.16em] text-[#0A0A0A] uppercase transition-[transform,background-color] duration-300 hover:bg-white active:scale-[0.98]"
            >
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
