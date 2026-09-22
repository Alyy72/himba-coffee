import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { StoreCatalog } from "@/components/store/StoreCatalog";

export const metadata: Metadata = {
  title: "Store",
  description:
    "Shop Himba tumblers and brewing equipment — order via WhatsApp.",
};

export default function StorePage() {
  return (
    <main className="flex-1 bg-[#F3F3F3]">
      <StoreCatalog />
      <SiteFooter />
    </main>
  );
}
