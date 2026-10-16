export type ProductCategoryId = "tumblers" | "brewing";

export type ProductOptionKind = "color" | "size";

export type ProductOption = {
  id: string;
  label: string;
  /** Optional swatch hex for color chips */
  swatch?: string;
  image?: `/${string}`;
};

export type CatalogProduct = {
  id: string;
  name: string;
  priceAed: number;
  category: ProductCategoryId;
  description: string;
  image: `/${string}`;
  gallery?: `/${string}`[];
  /** Interactive options required before WhatsApp order */
  options?: {
    kind: ProductOptionKind;
    label: string;
    required: boolean;
    choices: ProductOption[];
  }[];
};

export type ProductCategory = {
  id: ProductCategoryId;
  label: string;
  blurb: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "tumblers",
    label: "Tumblers",
    blurb: "French Press travel bottles — steep, press, enjoy.",
  },
  {
    id: "brewing",
    label: "Brewing Equipment",
    blurb: "Precision tools for the ritual at home or on the go.",
  },
];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "tumbler-matte-black",
    name: "Himba Tumbler — Matte Black",
    priceAed: 99,
    category: "tumblers",
    description: "French Press travel tumbler in matte black. Steep. Press. Enjoy.",
    image: "/products/matte-black-tumbler.webp",
    gallery: ["/products/matte-black-tumbler.webp"],
  },
  {
    id: "tumbler-snow-white",
    name: "Himba Tumbler — Snow White",
    priceAed: 99,
    category: "tumblers",
    description: "French Press travel tumbler in Snow White with black lid accents.",
    image: "/products/snow-white-tumbler.webp",
    gallery: ["/products/snow-white-tumbler.webp"],
  },
  {
    id: "tumbler-himalayan-pink",
    name: "Himba Tumbler — Himalayan Pink",
    priceAed: 99,
    category: "tumblers",
    description: "French Press travel tumbler in Himalayan Pink.",
    image: "/products/himalayan-pink-tumbler.webp",
    gallery: ["/products/himalayan-pink-tumbler.webp"],
  },
  {
    id: "coffee-tumbler-bundle",
    name: "Coffee & Tumbler Bundle",
    priceAed: 199,
    category: "tumblers",
    description:
      "Himba whole-bean coffee paired with a matching French Press tumbler — the complete ritual.",
    image: "/products/bundle-black.webp",
    gallery: ["/products/bundle-black.webp", "/products/bundle-white.webp"],
    options: [
      {
        kind: "color",
        label: "Finish",
        required: true,
        choices: [
          {
            id: "black",
            label: "Matte Black",
            swatch: "#111111",
            image: "/products/bundle-black.webp",
          },
          {
            id: "white",
            label: "Snow White",
            swatch: "#F4F4F2",
            image: "/products/bundle-white.webp",
          },
        ],
      },
    ],
  },
  {
    id: "pitcher-namaste",
    name: "Pitcher — Namaste",
    priceAed: 170,
    category: "brewing",
    description:
      "Matte black milk frothing pitcher with laser-etched Namaste mountain mark — built for latte art.",
    image: "/products/pitcher-namaste.webp",
    gallery: ["/products/pitcher-namaste.webp"],
  },
  {
    id: "pitcher-yak",
    name: "Pitcher — Himalayan Yak",
    priceAed: 150,
    category: "brewing",
    description:
      "Matte black milk frothing pitcher with a white Himalayan yak mark — precision spout for latte art.",
    image: "/products/pitcher-yak.webp",
    gallery: ["/products/pitcher-yak.webp"],
  },
  {
    id: "v60-pot",
    name: "V60 Pot",
    priceAed: 40,
    category: "brewing",
    description: "Heat-resistant glass server for clean pour-over brewing.",
    image: "/products/v60-pot.webp",
    gallery: ["/products/v60-pot.webp"],
  },
  {
    id: "v60-dripper-plastic",
    name: "V60 Dripper Plastic",
    priceAed: 25,
    category: "brewing",
    description: "Lightweight clear dripper with spiral ridges and black base.",
    image: "/products/v60-dripper-plastic.webp",
    gallery: ["/products/v60-dripper-plastic.webp"],
  },
  {
    id: "v60-dripper-ceramic",
    name: "V60 Dripper Ceramic",
    priceAed: 40,
    category: "brewing",
    description: "Glazed ceramic V60 dripper for a premium pour-over ritual.",
    image: "/products/v60-dripper-ceramic.webp",
    gallery: [
      "/products/v60-dripper-ceramic.webp",
      "/products/v60-dripper-ceramic-colors.webp",
    ],
  },
  {
    id: "v60-kettle",
    name: "V60 Kettle",
    priceAed: 25,
    category: "brewing",
    description: "Compact gooseneck kettle for precise V60 pouring control.",
    image: "/products/v60-kettle.webp",
    gallery: ["/products/v60-kettle.webp", "/products/v60-kettle-alt.webp"],
  },
  {
    id: "grind",
    name: "Grind",
    priceAed: 60,
    category: "brewing",
    description: "Himba whole-bean coffee — born in the Himalayas, roasted for everywhere.",
    image: "/products/grind.webp",
    gallery: ["/products/grind.webp"],
  },
  {
    id: "coffee-1kg",
    name: "1kg Coffee Beans",
    priceAed: 120,
    category: "brewing",
    description:
      "A full kilo of Himba whole-bean coffee — matte black bag, mountain mark, ready for every brew.",
    image: "/products/coffee-1kg.webp",
    gallery: ["/products/coffee-1kg.webp"],
  },
  {
    id: "moka-pot",
    name: "Moka Pot",
    priceAed: 45,
    category: "brewing",
    description: "Stovetop espresso maker with matte body and wood accents.",
    image: "/products/moka-pot.webp",
    gallery: ["/products/moka-pot.webp", "/products/moka-pot-red.webp"],
  },
];

export function catalogDisplayName(product: CatalogProduct) {
  return product.name
    .replace(/^Himba Tumbler — /, "")
    .replace(/^Pitcher — /, "")
    .replace("Coffee & Tumbler Bundle", "Coffee Bundle");
}

export function getProductsByCategory(category: ProductCategoryId) {
  return CATALOG_PRODUCTS.filter((p) => p.category === category);
}

export function getProductById(id: string) {
  return CATALOG_PRODUCTS.find((p) => p.id === id);
}
