"use client";

import Link from "next/link";
import { CatalogProductCard } from "@/components/store/CatalogProductCard";
import { PersonalizeBanner } from "@/components/store/PersonalizeBanner";
import {
  getProductsByCategory,
  PRODUCT_CATEGORIES,
} from "@/lib/catalog";

export function StoreCatalog() {
  return (
    <div className="relative mx-auto max-w-6xl">
      <p className="text-[11px] tracking-[0.28em] text-white/40 uppercase">
        Store
      </p>
      <h1 className="mt-4 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-semibold tracking-[-0.035em] text-[#F2F2F2]">
        The full Himba catalog.
      </h1>
      <p className="mt-5 max-w-xl text-lg text-white/45">
        Tumblers, brewing tools, and apparel — order any piece instantly via
        WhatsApp.
      </p>

      <nav className="mt-10 flex flex-wrap gap-2 border-b border-white/8 pb-6">
        {PRODUCT_CATEGORIES.map((cat) => (
          <Link
            key={cat.id}
            href={`#${cat.id}`}
            className="inline-flex h-10 items-center border border-white/15 px-4 text-[11px] tracking-[0.18em] text-white/55 uppercase transition-colors hover:border-white/40 hover:text-white"
          >
            {cat.label}
          </Link>
        ))}
      </nav>

      <div className="mt-12 md:mt-14">
        <PersonalizeBanner />
      </div>

      {PRODUCT_CATEGORIES.map((category) => {
        const products = getProductsByCategory(category.id);
        return (
          <section
            key={category.id}
            id={category.id}
            className="mt-16 scroll-mt-28 border-t border-white/8 pt-14 first:mt-14 md:pt-16"
          >
            <div className="mb-8 flex flex-col gap-2 md:mb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[11px] tracking-[0.28em] text-white/35 uppercase">
                  Category
                </p>
                <h2 className="mt-2 text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-[#F2F2F2]">
                  {category.label}
                </h2>
              </div>
              <p className="max-w-sm text-sm text-white/40">{category.blurb}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {products.map((product, index) => (
                <CatalogProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
