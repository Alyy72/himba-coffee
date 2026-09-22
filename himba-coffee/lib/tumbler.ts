export type TumblerColorId = "matte-black" | "snow-white" | "himalayan-pink";

export const PRICE_AED = 99;
export const PREMIUM_PRICE_AED = 199;
export const WHATSAPP_NUMBER = "971542943920";
export const ENGRAVING_MAX_LENGTH = 16;

export type BaseBottleImage =
  | "/products/matte-black-base.png"
  | "/products/snow-white-base.png"
  | "/products/himalayan-pink-base.png";

export type TumblerColor = {
  id: TumblerColorId;
  /** Full product name used in store cards & WhatsApp copy */
  label: string;
  /** Short swatch label in the configurator */
  shortLabel: string;
  /** Solid fallback / average tone for the swatch */
  swatch: string;
  /** CSS background for the circular swatch (solids or subtle textures) */
  swatchBackground: string;
  /** Public path to the product base photo */
  image: `/${string}.png`;
  body: string;
  accent: string;
  text: string;
  /** Light bottle faces need a deeper etch so silver still reads */
  engravingOnLight?: boolean;
};

export type TumblerVariantCategoryId =
  | "leopard-prints"
  | "soft-botanical"
  | "solids-metallics";

export type TumblerVariant = {
  id: number;
  name: string;
  /** Real product photo in /public */
  image: `/${string}.png`;
  /** Fallback product photo if a variant PNG is missing */
  baseImage: BaseBottleImage;
  category: TumblerVariantCategoryId;
  /** Dominant tone for tap chips + fallback colorize */
  swatch: string;
  /** Customize price in AED (standard store finishes stay at PRICE_AED) */
  priceAed: number;
  engravingOnLight?: boolean;
};

/** Minimal visual contract for TumblerPreview */
export type TumblerVisual = {
  id: string;
  label: string;
  image: `/${string}.png`;
  /** Soft colorize over the real bottle when a dedicated photo is missing */
  tint?: string;
  engravingOnLight?: boolean;
};

export type VariantCategory = {
  id: TumblerVariantCategoryId;
  label: string;
};

export const VARIANT_CATEGORIES: VariantCategory[] = [
  { id: "leopard-prints", label: "Leopard & Prints" },
  { id: "soft-botanical", label: "Soft & Botanical" },
  { id: "solids-metallics", label: "Solids & Metallics" },
];

/**
 * Variant IDs that have real product PNGs in /public (`variant-N.png`).
 */
export const VARIANT_PHOTOS = new Set<number>([
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
]);

function variant(
  id: number,
  name: string,
  category: TumblerVariantCategoryId,
  swatch: string,
  baseImage: BaseBottleImage,
  options?: { engravingOnLight?: boolean; image?: `/${string}.png` },
): TumblerVariant {
  return {
    id,
    name,
    image: options?.image ?? `/variant-${id}.png`,
    baseImage,
    category,
    swatch,
    priceAed: PREMIUM_PRICE_AED,
    engravingOnLight: options?.engravingOnLight,
  };
}

export const TUMBLER_VARIANTS: TumblerVariant[] = [
  variant(2, "Silver Leopard", "leopard-prints", "#B8B8B8", "/products/matte-black-base.png"),
  variant(3, "Ocean Blue Leopard", "leopard-prints", "#46A0D8", "/products/snow-white-base.png", {
    engravingOnLight: true,
  }),
  variant(4, "Royal Purple Leopard", "leopard-prints", "#5F2840", "/products/matte-black-base.png"),
  variant(5, "Rainbow Neon", "leopard-prints", "#FF78B4", "/products/matte-black-base.png"),
  variant(6, "Lavender Botanical", "soft-botanical", "#D2BEE1", "/products/snow-white-base.png", {
    engravingOnLight: true,
    image: "/products/lavender-botanical-variant.png",
  }),
  variant(7, "Himalayan Pink", "soft-botanical", "#F895AB", "/products/himalayan-pink-base.png", {
    engravingOnLight: true,
    image: "/products/himalayan-pink-variant.png",
  }),
  variant(8, "Deep Navy", "solids-metallics", "#142850", "/products/matte-black-base.png"),
  variant(9, "Burgundy", "solids-metallics", "#4C0A16", "/products/matte-black-base.png"),
  variant(10, "Crimson Metallic", "solids-metallics", "#6E0A14", "/products/matte-black-base.png"),
  variant(11, "Rose Copper", "solids-metallics", "#AA796A", "/products/himalayan-pink-base.png"),
  variant(12, "Mint Green", "soft-botanical", "#88D3B5", "/products/snow-white-base.png", {
    engravingOnLight: true,
  }),
];

export const DEFAULT_TUMBLER_VARIANT = TUMBLER_VARIANTS[0];

export function getVariantsByCategory(
  category: TumblerVariantCategoryId,
): TumblerVariant[] {
  return TUMBLER_VARIANTS.filter((v) => v.category === category);
}

export function hasVariantPhoto(variant: TumblerVariant): boolean {
  return VARIANT_PHOTOS.has(variant.id);
}

/** Resolve the real bottle photo + optional tint for preview/thumbnails. */
export function toTumblerVisual(variant: TumblerVariant): TumblerVisual {
  const hasPhoto = hasVariantPhoto(variant);
  return {
    id: `variant-${variant.id}`,
    label: variant.name,
    image: hasPhoto ? variant.image : variant.baseImage,
    tint: hasPhoto ? undefined : variant.swatch,
    engravingOnLight: variant.engravingOnLight,
  };
}

export const TUMBLER_COLORS: TumblerColor[] = [
  {
    id: "matte-black",
    label: "Matte Black",
    shortLabel: "Black",
    swatch: "#1A1A1A",
    swatchBackground: "#1A1A1A",
    image: "/products/matte-black-base.png",
    body: "linear-gradient(165deg, #2a2a2a 0%, #0d0d0d 45%, #1f1f1f 100%)",
    accent: "#8a8a8a",
    text: "#f5f5f5",
  },
  {
    id: "snow-white",
    label: "Snow White",
    shortLabel: "White",
    swatch: "#F4F4F2",
    swatchBackground: "#F4F4F2",
    image: "/products/snow-white-base.png",
    body: "linear-gradient(165deg, #ffffff 0%, #ecece8 48%, #d8d8d2 100%)",
    accent: "#b8b8b0",
    text: "#1a1a1a",
    engravingOnLight: true,
  },
  {
    id: "himalayan-pink",
    label: "Himalayan Pink",
    shortLabel: "Pink",
    swatch: "#E8B4B8",
    swatchBackground: "#E8B4B8",
    image: "/products/himalayan-pink-base.png",
    body: "linear-gradient(165deg, #f0c9cd 0%, #d99299 48%, #c47a84 100%)",
    accent: "#f5d4d7",
    text: "#3a1f24",
    engravingOnLight: true,
  },
];

/** Standard store finishes (no pattern SKUs). */
export const SOLID_TUMBLER_COLORS = TUMBLER_COLORS;

export const DEFAULT_TUMBLER_COLOR = TUMBLER_COLORS[0];

export function colorToVisual(color: TumblerColor): TumblerVisual {
  return {
    id: color.id,
    label: color.label,
    image: color.image,
    engravingOnLight: color.engravingOnLight,
  };
}
