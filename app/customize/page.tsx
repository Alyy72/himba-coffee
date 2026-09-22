import type { Metadata } from "next";
import { Configurator } from "@/components/configurator/Configurator";
import { SiteFooter } from "@/components/layout/SiteFooter";

export const metadata: Metadata = {
  title: "Customize",
  description:
    "Configure your Himba tumbler — choose from 12 real designs, add free laser engraving, order via WhatsApp.",
};

export default function CustomizePage() {
  return (
    <main className="flex-1">
      <Configurator />
      <SiteFooter />
    </main>
  );
}
