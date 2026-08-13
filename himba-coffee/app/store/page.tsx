import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StoreCatalog } from "@/components/store/StoreCatalog";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Shop Himba tumblers, brewing equipment, and apparel — order via WhatsApp.",
};

export default function StorePage() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden bg-[#0A0A0A] px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_35%_at_80%_0%,rgba(255,255,255,0.05),transparent_50%)]"
        />
        <StoreCatalog />
      </section>
      <SiteFooter />
    </main>
  );
}
