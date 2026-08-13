export type ProductCategoryId = "tumblers" | "brewing" | "apparel";

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
  {
    id: "apparel",
    label: "Apparel",
    blurb: "Wear the mountain. Press · Sip · Enjoy.",
  },
];

export const TSHIRT_SIZES = ["S", "M", "L", "XL"] as const;
export type TshirtSize = (typeof TSHIRT_SIZES)[number];

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: "tumbler-matte-black",
    name: "Himba Tumbler — Matte Black",
    priceAed: 99,
    category: "tumblers",
    description: "French Press travel tumbler in matte black. Steep. Press. Enjoy.",
    image: "/products/tumbler-black.png",
    gallery: [
      "/products/tumbler-black.png",
      "/products/tumbler-black-lifestyle.png",
    ],
  },
  {
    id: "tumbler-snow-white",
    name: "Himba Tumbler — Snow White",
    priceAed: 99,
    category: "tumblers",
    description: "French Press travel tumbler in snow white with black lid accents.",
    image: "/products/tumbler-white.png",
    gallery: ["/products/tumbler-white.png"],
  },
  {
    id: "tumbler-himalayan-pink",
    name: "Himba Tumbler — Himalayan Pink",
    priceAed: 99,
    category: "tumblers",
    description: "French Press travel tumbler in soft Himalayan pink.",
    image: "/products/tumbler-pink.png",
    gallery: ["/products/tumbler-pink.png"],
  },
  {
    id: "coffee-tumbler-bundle",
    name: "Coffee & Tumbler Bundle",
    priceAed: 199,
    category: "tumblers",
    description:
      "Himba whole-bean coffee paired with a matching French Press tumbler — the complete ritual.",
    image: "/products/bundle-black.png",
    gallery: ["/products/bundle-black.png", "/products/bundle-white.png"],
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
            image: "/products/bundle-black.png",
          },
          {
            id: "white",
            label: "Pure White",
            swatch: "#F4F4F2",
            image: "/products/bundle-white.png",
          },
        ],
      },
    ],
  },
  {
    id: "pitcher",
    name: "Pitcher",
    priceAed: 170,
    category: "brewing",
    description: "Precision milk frothing pitcher with geometric handle — built for latte art.",
    image: "/products/pitcher.png",
    gallery: ["/products/pitcher.png"],
  },
  {
    id: "v60-pot",
    name: "V60 Pot",
    priceAed: 40,
    category: "brewing",
    description: "Heat-resistant glass server for clean pour-over brewing.",
    image: "/products/v60-pot.png",
    gallery: ["/products/v60-pot.png"],
  },
  {
    id: "v60-dripper-plastic",
    name: "V60 Dripper Plastic",
    priceAed: 25,
    category: "brewing",
    description: "Lightweight clear dripper with spiral ridges and black base.",
    image: "/products/v60-dripper-plastic.png",
    gallery: ["/products/v60-dripper-plastic.png"],
  },
  {
    id: "v60-dripper-ceramic",
    name: "V60 Dripper Ceramic",
    priceAed: 40,
    category: "brewing",
    description: "Glazed ceramic V60 dripper for a premium pour-over ritual.",
    image: "/products/v60-dripper-ceramic.png",
    gallery: [
      "/products/v60-dripper-ceramic.png",
      "/products/v60-dripper-ceramic-colors.png",
    ],
  },
  {
    id: "v60-kettle",
    name: "V60 Kettle",
    priceAed: 25,
    category: "brewing",
    description: "Compact gooseneck kettle for precise V60 pouring control.",
    image: "/products/v60-kettle.png",
    gallery: ["/products/v60-kettle.png", "/products/v60-kettle-alt.png"],
  },
  {
    id: "grind",
    name: "Grind",
    priceAed: 60,
    category: "brewing",
    description: "Himba whole-bean coffee — born in the Himalayas, roasted for everywhere.",
    image: "/products/grind.png",
    gallery: ["/products/grind.png"],
  },
  {
    id: "coffee-1kg",
    name: "1kg Coffee Beans",
    priceAed: 120,
    category: "brewing",
    description:
      "A full kilo of Himba whole-bean coffee — matte black bag, mountain mark, ready for every brew.",
    image: "/products/coffee-1kg.png",
    gallery: ["/products/coffee-1kg.png"],
  },
  {
    id: "moka-pot",
    name: "Moka Pot",
    priceAed: 45,
    category: "brewing",
    description: "Stovetop espresso maker with matte body and wood accents.",
    image: "/products/moka-pot.png",
    gallery: ["/products/moka-pot.png", "/products/moka-pot-red.png"],
  },
  {
    id: "t-shirt",
    name: "Himba T-Shirt — Black",
    priceAed: 60,
    category: "apparel",
    description: "Premium black crew-neck tee with the Himba mountain wordmark.",
    image: "/products/tee-black.png",
    gallery: ["/products/tee-black.png", "/products/tee-design.png"],
    options: [
      {
        kind: "size",
        label: "Size",
        required: true,
        choices: TSHIRT_SIZES.map((size) => ({
          id: size,
          label: size,
        })),
      },
    ],
  },
  {
    id: "t-shirt-white",
    name: "Himba T-Shirt — White",
    priceAed: 60,
    category: "apparel",
    description: "Premium white crew-neck tee with the Himba mountain wordmark in black.",
    image: "/products/tee-white-flat.png",
    gallery: ["/products/tee-white-flat.png", "/products/tee-white.png"],
    options: [
      {
        kind: "size",
        label: "Size",
        required: true,
        choices: TSHIRT_SIZES.map((size) => ({
          id: size,
          label: size,
        })),
      },
    ],
  },
];

export function getProductsByCategory(category: ProductCategoryId) {
  return CATALOG_PRODUCTS.filter((p) => p.category === category);
}

export function getProductById(id: string) {
  return CATALOG_PRODUCTS.find((p) => p.id === id);
}
