import { Hero } from "@/components/hero/Hero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FounderStory } from "@/components/story/FounderStory";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <FounderStory />
      <SiteFooter />
    </main>
  );
}
