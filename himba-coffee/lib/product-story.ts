import { PREMIUM_PRICE_AED, PRICE_AED } from "@/lib/tumbler";

export type StoryTumblerId =
  | "snow-white"
  | "matte-black"
  | "lavender-botanical"
  | "himalayan-pink";

export type TumblerPartId =
  | "body"
  | "finish"
  | "lining"
  | "lid"
  | "seal"
  | "base"
  | "straw";

export type TumblerPart = {
  id: TumblerPartId;
  name: string;
  detail: string;
  /** Hotspot on product image (% of frame) */
  x: number;
  y: number;
  /** Which side the callout label sits on */
  side: "left" | "right";
};

export type TumblerSpecs = {
  capacityOz: number;
  capacityMl: number;
  heightMm: number;
  diameterMm: number;
  weightG: number;
  material: string;
};

export type StoryTumbler = {
  id: StoryTumblerId;
  name: string;
  finish: string;
  story: string;
  image: `/${string}`;
  /** Lifestyle / in-the-wild shot */
  lifestyleImage: `/${string}`;
  accent: string;
  bodyTone: string;
  strawTone: string;
  priceAed: number;
  priceLabel: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  trust: string;
  specs: TumblerSpecs;
  parts: TumblerPart[];
};

const BASE_SPECS: TumblerSpecs = {
  capacityOz: 16,
  capacityMl: 473,
  heightMm: 185,
  diameterMm: 72,
  weightG: 320,
  material: "304 food-grade stainless · BPA-free",
};

export const STORY_TUMBLERS: StoryTumbler[] = [
  {
    id: "snow-white",
    name: "Snow White",
    finish: "Soft matte enamel",
    story:
      "A quiet canvas for the morning ritual. Fingerprint-resistant enamel that reads luminous under cafe light — minimal, focused, ready for the day.",
    image: "/products/snow-white-tumbler.png",
    lifestyleImage: "/gallery/snow-white.png",
    accent: "#E8E8E4",
    bodyTone: "#F4F4F2",
    strawTone: "#F0F0EC",
    priceAed: PRICE_AED,
    priceLabel: `From ${PRICE_AED} AED`,
    ctaPrimary: { label: "Engrave Snow White", href: "/customize" },
    ctaSecondary: { label: "Add to ritual", href: "/store#tumblers" },
    trust: "1-year craft warranty · Food-grade 304 · Leak-tested",
    specs: { ...BASE_SPECS, weightG: 318 },
    parts: [
      {
        id: "lid",
        name: "Spill-Proof Lid",
        detail:
          "Screw-on lid with a sliding sip gate — press, sip, seal. Built for the commute without a drip.",
        x: 50,
        y: 9,
        side: "right",
      },
      {
        id: "seal",
        name: "Silicone Seal",
        detail:
          "Food-safe gasket locks the lid tight so Snow White stays leak-resistant in a tote or backpack.",
        x: 67,
        y: 15,
        side: "right",
      },
      {
        id: "straw",
        name: "Ivory Straw",
        detail:
          "Reusable straw tinted to Snow White — optional, packable, always on brand.",
        x: 33,
        y: 20,
        side: "left",
      },
      {
        id: "finish",
        name: "Matte Enamel Shell",
        detail:
          "Soft matte white enamel — fingerprint-resistant, quietly luminous, never chalky.",
        x: 28,
        y: 36,
        side: "left",
      },
      {
        id: "body",
        name: "Vacuum Double-Wall",
        detail:
          "Vacuum-insulated body keeps brew hot on the Dubai commute and cold through long afternoons.",
        x: 72,
        y: 56,
        side: "right",
      },
      {
        id: "lining",
        name: "304 Stainless Core",
        detail:
          "Food-grade 304 stainless interior — pure taste, zero aftertaste, daily-ritual durable.",
        x: 70,
        y: 72,
        side: "right",
      },
      {
        id: "base",
        name: "Soft Footpad",
        detail:
          "Quiet base ring steadies the bottle on marble counters, desks, and dashboards.",
        x: 50,
        y: 93,
        side: "left",
      },
    ],
  },
  {
    id: "matte-black",
    name: "Matte Black",
    finish: "Rugged powder coat",
    story:
      "Understated power for the long road. Deep powder coat that hides the miles — bold, travel-ready, and built to disappear into the night skyline.",
    image: "/products/matte-black-tumbler.png",
    lifestyleImage: "/gallery/matte-black.png",
    accent: "#3A3A3A",
    bodyTone: "#141414",
    strawTone: "#1A1A1A",
    priceAed: PRICE_AED,
    priceLabel: `From ${PRICE_AED} AED`,
    ctaPrimary: { label: "Make it Matte Black", href: "/customize" },
    ctaSecondary: { label: "Shop this finish", href: "/store#tumblers" },
    trust: "★ 4.9 traveler rating · Shock-resistant coat · 1-year warranty",
    specs: { ...BASE_SPECS, weightG: 325 },
    parts: [
      {
        id: "lid",
        name: "Blackout Lid",
        detail:
          "Matched matte lid with a low-profile slider — stealth silhouette, secure seal.",
        x: 50,
        y: 9,
        side: "right",
      },
      {
        id: "finish",
        name: "Powder-Coat Armor",
        detail:
          "Deep matte black powder coat — scuff-tolerant, glare-free, built for the long haul.",
        x: 28,
        y: 36,
        side: "left",
      },
      {
        id: "body",
        name: "Vacuum Chassis",
        detail:
          "Double-wall vacuum core holds heat through desert mornings and chill through night drives.",
        x: 72,
        y: 56,
        side: "right",
      },
      {
        id: "lining",
        name: "Gunmetal Interior",
        detail:
          "304 stainless lining polished for clean pours — no metallic aftertaste, ever.",
        x: 70,
        y: 72,
        side: "right",
      },
      {
        id: "seal",
        name: "Travel Gasket",
        detail:
          "High-compression silicone ring — bag-safe even when the bottle is tossed sideways.",
        x: 67,
        y: 15,
        side: "right",
      },
      {
        id: "straw",
        name: "Shadow Straw",
        detail:
          "Near-black reusable straw for iced rituals — packs flush against the bottle.",
        x: 33,
        y: 20,
        side: "left",
      },
      {
        id: "base",
        name: "Grip Foot",
        detail:
          "Rubberized footpad for carbon-fiber desks and sandy cafe tables alike.",
        x: 50,
        y: 93,
        side: "left",
      },
    ],
  },
  {
    id: "lavender-botanical",
    name: "Lavender Botanical",
    finish: "Floral print on soft lavender",
    story:
      "A pause in the afternoon rush. Soft lavender with botanical florals that catch light like petals — dreamy, intentional, unmistakably Himba.",
    image: "/products/lavender-botanical-tumbler.png",
    lifestyleImage: "/gallery/lavender-botanical.png",
    accent: "#D2BEE1",
    bodyTone: "#C8B4D8",
    strawTone: "#B8A0CC",
    priceAed: PREMIUM_PRICE_AED,
    priceLabel: `From ${PREMIUM_PRICE_AED} AED`,
    ctaPrimary: { label: "Customize Botanical", href: "/customize" },
    ctaSecondary: { label: "View premium finishes", href: "/store#tumblers" },
    trust: "Limited botanical print · Premium edition · 1-year warranty",
    specs: {
      ...BASE_SPECS,
      weightG: 322,
      material: "304 stainless · UV-cured botanical print · BPA-free",
    },
    parts: [
      {
        id: "finish",
        name: "Botanical Print",
        detail:
          "UV-cured florals on soft lavender — textured print that catches cafe light like pressed petals.",
        x: 24,
        y: 40,
        side: "left",
      },
      {
        id: "lid",
        name: "Lilac Cap",
        detail:
          "Tone-matched lid with a smooth sip slider — keeps the botanical silhouette unbroken.",
        x: 50,
        y: 9,
        side: "right",
      },
      {
        id: "body",
        name: "Insulated Vessel",
        detail:
          "Same vacuum double-wall as the core line — beauty that still performs on the move.",
        x: 76,
        y: 54,
        side: "right",
      },
      {
        id: "lining",
        name: "Pure Steel Core",
        detail:
          "304 stainless keeps floral notes out of your brew — aroma stays in the cup, not the wall.",
        x: 74,
        y: 70,
        side: "right",
      },
      {
        id: "straw",
        name: "Lavender Straw",
        detail:
          "Soft-violet reusable straw — color-matched to the botanical shell.",
        x: 29,
        y: 22,
        side: "left",
      },
      {
        id: "seal",
        name: "Quiet Seal",
        detail:
          "Silicone gasket tuned for a soft close — no squeak, no drip, no drama.",
        x: 70,
        y: 16,
        side: "right",
      },
      {
        id: "base",
        name: "Studio Footpad",
        detail:
          "Soft ring for marble and wood — protective, silent, gallery-friendly.",
        x: 50,
        y: 93,
        side: "left",
      },
    ],
  },
  {
    id: "himalayan-pink",
    name: "Himalayan Pink",
    finish: "Warm matte blush",
    story:
      "Born of mountain light. A warm matte blush that feels like sunrise on snow — playful, gentle, and made for sweet sips between meetings.",
    image: "/products/himalayan-pink-tumbler.png",
    lifestyleImage: "/gallery/himalayan-pink.png",
    accent: "#E8B4B8",
    bodyTone: "#E8B4B8",
    strawTone: "#D99299",
    priceAed: PRICE_AED,
    priceLabel: `From ${PRICE_AED} AED`,
    ctaPrimary: { label: "Personalize Pink", href: "/customize" },
    ctaSecondary: { label: "Bring it home", href: "/store#tumblers" },
    trust: "Signature Himba blush · Food-grade 304 · 1-year warranty",
    specs: { ...BASE_SPECS, weightG: 319 },
    parts: [
      {
        id: "finish",
        name: "Blush Enamel",
        detail:
          "Warm matte Himalayan pink — soft to the eye, soft to the touch, never sticky.",
        x: 24,
        y: 40,
        side: "left",
      },
      {
        id: "lid",
        name: "Rose-Tint Lid",
        detail:
          "Complementary lid with a confident sip gate — desk-friendly and bag-safe.",
        x: 50,
        y: 9,
        side: "right",
      },
      {
        id: "straw",
        name: "Blush Straw",
        detail:
          "Color-matched reusable straw for iced mountain-inspired rituals.",
        x: 29,
        y: 22,
        side: "left",
      },
      {
        id: "body",
        name: "Double-Wall Heart",
        detail:
          "Vacuum insulation keeps cold drinks crisp and warm drinks patient through long UAE days.",
        x: 76,
        y: 54,
        side: "right",
      },
      {
        id: "lining",
        name: "Mirror Steel",
        detail:
          "Polished 304 stainless — clean pours, zero aftertaste, easy rinse between rituals.",
        x: 74,
        y: 70,
        side: "right",
      },
      {
        id: "seal",
        name: "Soft Gasket",
        detail:
          "Food-safe silicone that seats with a gentle click — reliable without the fight.",
        x: 70,
        y: 16,
        side: "right",
      },
      {
        id: "base",
        name: "Cushion Foot",
        detail:
          "Soft-touch ring for glass desks and tiled kitchens — no scuffs, no slide.",
        x: 50,
        y: 93,
        side: "left",
      },
    ],
  },
];

export function getStoryTumbler(id: StoryTumblerId) {
  return STORY_TUMBLERS.find((t) => t.id === id);
}
