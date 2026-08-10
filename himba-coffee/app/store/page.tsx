import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PersonalizeBanner } from "@/components/store/PersonalizeBanner";
import { ProductCard } from "@/components/store/ProductCard";
import { PRICE_AED, SOLID_TUMBLER_COLORS } from "@/lib/tumbler";

export const metadata: Metadata = {
  title: "Store",
  description: `Shop Himba French Press tumblers — three finishes, ${PRICE_AED} AED flat.`,
};

export default function StorePage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_80%_0%,rgba(255,255,255,0.05),transparent_50%)]"
        />

        <div className="relative mx-auto max-w-6xl">
          <p className="text-[11px] tracking-[0.28em] text-white/40 uppercase">
            Store
          </p>
          <h1 className="mt-4 max-w-2xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-[#F2F2F2]">
            Three finishes. One price.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-white/45">
            Every standard Himba tumbler is {PRICE_AED} AED — steep, press, and
            enjoy. Order instantly via WhatsApp.
          </p>

          <div className="mt-14 md:mt-16">
            <PersonalizeBanner />
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {SOLID_TUMBLER_COLORS.map((color, index) => (
              <ProductCard key={color.id} color={color} index={index} />
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
