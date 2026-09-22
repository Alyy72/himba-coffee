"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Star } from "lucide-react";
import { ProductInspectModal } from "@/components/store/ProductInspectModal";
import {
  CATALOG_PRODUCTS,
  catalogDisplayName,
  type CatalogProduct,
} from "@/lib/catalog";
import { buildWhatsAppCatalogOrderUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type ArrivalTab = "featured" | "best" | "hot";

const GOLD = "#C6A15B";

const ARRIVAL_TABS: { id: ArrivalTab; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "best", label: "Best Seller" },
  { id: "hot", label: "Hot Sale" },
];

function money(amount: number) {
  return `${amount.toFixed(2)} AED`;
}

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remain = now == null ? 0 : Math.max(0, target.getTime() - now);
  const days = Math.floor(remain / 86_400_000);
  const hours = Math.floor((remain % 86_400_000) / 3_600_000);
  const mins = Math.floor((remain % 3_600_000) / 60_000);
  const secs = Math.floor((remain % 60_000) / 1000);
  return { days, hours, mins, secs };
}

function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-[#C6A15B]" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3 fill-current" />
      ))}
    </span>
  );
}

function ShopButton({
  href,
  children = "Shop Now",
  onClick,
}: {
  href?: string;
  children?: string;
  onClick?: () => void;
}) {
  const className =
    "inline-flex h-9 items-center px-4 text-[11px] font-medium tracking-[0.08em] text-white uppercase";
  const style = { background: GOLD };
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className} style={style}>
        {children}
      </button>
    );
  }
  return (
    <Link href={href ?? "#arrivals"} className={className} style={style}>
      {children}
    </Link>
  );
}

function ProductTile({
  product,
  sale,
  onOpen,
}: {
  product: CatalogProduct;
  sale?: boolean;
  onOpen: (product: CatalogProduct) => void;
}) {
  return (
    <article className="flex flex-col bg-white">
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="relative aspect-square bg-white"
      >
        {sale ? (
          <span
            className="absolute top-3 left-3 z-10 px-2 py-1 text-[10px] font-medium tracking-[0.08em] text-white uppercase"
            style={{ background: GOLD }}
          >
            Sale
          </span>
        ) : null}
        <Image
          src={product.image}
          alt={product.name}
          fill
          unoptimized
          className="object-contain p-6"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
      </button>
      <div className="px-4 pt-2 pb-5 text-center">
        <h3 className="text-sm text-[#3a3a3a]">{catalogDisplayName(product)}</h3>
        <div className="mt-2 flex justify-center">
          <Stars />
        </div>
        <p className="mt-2 text-sm font-medium" style={{ color: GOLD }}>
          {money(product.priceAed)}
        </p>
      </div>
    </article>
  );
}

export function StoreCatalog() {
  const [tab, setTab] = useState<ArrivalTab>("featured");
  const [open, setOpen] = useState<CatalogProduct | null>(null);
  const [activeImage, setActiveImage] = useState("");

  const endOfDay = useMemo(() => {
    const date = new Date();
    date.setHours(23, 59, 59, 999);
    return date;
  }, []);
  const clock = useCountdown(endOfDay);

  const featured = CATALOG_PRODUCTS.slice(0, 4);
  const best = CATALOG_PRODUCTS.filter((p) => p.category === "tumblers");
  const hot = CATALOG_PRODUCTS.filter((p) => p.priceAed <= 60);
  const grid =
    tab === "best" ? best : tab === "hot" ? hot : featured;

  const deals = [
    CATALOG_PRODUCTS.find((p) => p.id === "v60-kettle"),
    CATALOG_PRODUCTS.find((p) => p.id === "moka-pot"),
  ].filter(Boolean) as CatalogProduct[];

  function openProduct(product: CatalogProduct) {
    setActiveImage(product.image);
    setOpen(product);
  }

  const orderUrl = open ? buildWhatsAppCatalogOrderUrl(open) : "#";

  return (
    <div className="bg-[#F3F3F3] text-[#1a1a1a]">
      <div className="mx-auto max-w-6xl px-4 pt-28 pb-16 md:px-8 md:pt-32">
        {/* Hero */}
        <section className="grid items-center gap-8 bg-[#111111] px-8 py-12 text-white md:grid-cols-2 md:px-14 md:py-16">
          <div>
            <p className="text-sm" style={{ color: GOLD }}>
              The Himba ritual
            </p>
            <h1 className="mt-3 max-w-md text-4xl leading-[1.1] font-medium tracking-[-0.03em] md:text-5xl">
              Tumblers, cups & brew.
            </h1>
            <p className="mt-4 max-w-sm text-sm text-white/55">
              French Press travel tumblers and the tools around them — steep,
              press, and take the mountain with you.
            </p>
            <div className="mt-8">
              <ShopButton href="#arrivals" />
            </div>
          </div>
          <div className="relative h-64 md:h-80">
            <Image
              src="/products/tumbler-black-lifestyle.png"
              alt="Himba Matte Black French Press tumbler"
              fill
              priority
              unoptimized
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </section>

        {/* Promo pair */}
        <section className="mt-6 grid gap-4 md:grid-cols-2">
          <article className="relative flex min-h-44 items-center overflow-hidden bg-[#161616] px-7 py-8 text-white">
            <div className="relative z-10 max-w-[55%]">
              <h2 className="text-xl font-medium">French Press Tumblers</h2>
              <p className="mt-2 text-sm text-white/50">
                Snow White, Matte Black, Himalayan Pink.
              </p>
              <div className="mt-5">
                <ShopButton href="#arrivals" />
              </div>
            </div>
            <Image
              src="/products/matte-black-tumbler.png"
              alt="Himba Matte Black tumbler"
              width={180}
              height={220}
              unoptimized
              className="absolute right-4 bottom-0 h-40 w-auto object-contain"
            />
          </article>
          <article className="relative flex min-h-44 items-center overflow-hidden bg-[#161616] px-7 py-8 text-white">
            <div className="relative z-10 max-w-[55%]">
              <h2 className="text-xl font-medium">Brewing Tools</h2>
              <p className="mt-2 text-sm text-white/50">
                V60, moka, pitchers, and whole bean.
              </p>
              <div className="mt-5">
                <ShopButton
                  onClick={() => {
                    setTab("hot");
                    document.getElementById("arrivals")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                />
              </div>
            </div>
            <Image
              src="/products/v60-kettle.png"
              alt="Himba V60 kettle"
              width={180}
              height={220}
              unoptimized
              className="absolute right-2 bottom-2 h-36 w-auto object-contain"
            />
          </article>
        </section>

        {/* New arrivals */}
        <section id="arrivals" className="scroll-mt-28 mt-14">
          <div className="flex flex-col gap-4 border-b border-black/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-medium tracking-[-0.02em]">
              New arrival item
            </h2>
            <div className="flex gap-6 text-sm">
              {ARRIVAL_TABS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "pb-1",
                    tab === item.id
                      ? "border-b-2 font-medium text-[#1a1a1a]"
                      : "text-[#1a1a1a]/40",
                  )}
                  style={tab === item.id ? { borderColor: GOLD } : undefined}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {grid.map((product) => (
              <ProductTile
                key={product.id}
                product={product}
                sale={product.priceAed >= 170 || product.id === "coffee-1kg"}
                onOpen={openProduct}
              />
            ))}
          </div>
        </section>

        {/* Wide feature */}
        <section className="relative mt-12 flex min-h-52 items-center overflow-hidden bg-[#111111] px-8 py-10 text-white md:px-14">
          <div className="relative z-10 max-w-md">
            <h2 className="text-3xl font-medium tracking-[-0.03em] md:text-4xl">
              Coffee & tumbler bundle
            </h2>
            <p className="mt-3 text-sm text-white/55">
              Whole-bean coffee with a matching French Press tumbler — 199 AED.
            </p>
            <div className="mt-6">
              <ShopButton
                onClick={() => {
                  const bundle = CATALOG_PRODUCTS.find(
                    (p) => p.id === "coffee-tumbler-bundle",
                  );
                  if (bundle) openProduct(bundle);
                }}
              />
            </div>
          </div>
          <Image
            src="/products/bundle-black.png"
            alt="Himba coffee and tumbler bundle"
            width={420}
            height={280}
            unoptimized
            className="pointer-events-none absolute right-0 bottom-0 hidden h-52 w-auto object-contain md:block"
          />
        </section>

        {/* Deal of the day */}
        <section className="mt-14">
          <h2 className="text-2xl font-medium tracking-[-0.02em]">
            Deal of the day
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {deals.map((product) => (
              <article
                key={product.id}
                className="grid grid-cols-[140px_1fr] items-center gap-4 bg-white p-4 sm:grid-cols-[180px_1fr]"
              >
                <button
                  type="button"
                  onClick={() => openProduct(product)}
                  className="relative aspect-square"
                >
                  <span
                    className="absolute top-2 left-2 z-10 px-2 py-1 text-[10px] font-medium text-white uppercase"
                    style={{ background: GOLD }}
                  >
                    Sale
                  </span>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    unoptimized
                    className="object-contain p-2"
                  />
                </button>
                <div>
                  <h3 className="text-base font-medium">
                    {catalogDisplayName(product)}
                  </h3>
                  <p className="mt-2 text-sm font-medium" style={{ color: GOLD }}>
                    {money(product.priceAed)}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {(
                      [
                        ["Days", clock.days],
                        ["Hours", clock.hours],
                        ["Mins", clock.mins],
                        ["Secs", clock.secs],
                      ] as const
                    ).map(([label, value]) => (
                      <div key={label} className="min-w-12 text-center">
                        <div className="bg-[#111111] px-2 py-2 text-sm font-medium text-white">
                          {String(value).padStart(2, "0")}
                        </div>
                        <p className="mt-1 text-[10px] tracking-[0.08em] text-black/40 uppercase">
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <ProductInspectModal
        open={Boolean(open)}
        onClose={() => setOpen(null)}
        title={open?.name ?? ""}
        images={open?.gallery?.length ? open.gallery : open ? [open.image] : []}
        activeImage={activeImage}
        onSelectImage={setActiveImage}
      >
        {open ? (
          <>
            <p className="mb-6 text-sm leading-relaxed text-white/50">
              {open.description}
            </p>
            <p className="mb-6 text-xl font-medium text-[#F2F2F2]">
              {money(open.priceAed)}
            </p>
            <a
              href={orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 w-full items-center justify-center gap-2 bg-[#F2F2F2] text-[11px] font-medium tracking-[0.16em] text-[#0A0A0A] uppercase hover:bg-white"
            >
              <MessageCircle className="h-4 w-4" />
              Order via WhatsApp
            </a>
          </>
        ) : null}
      </ProductInspectModal>
    </div>
  );
}
