export type StoryTumblerId =
  | "pure-white"
  | "matte-black"
  | "lavender-botanical"
  | "soft-pink";

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
  /** Hotspot position on the viewer (% of container) */
  x: number;
  y: number;
};

export type StoryTumbler = {
  id: StoryTumblerId;
  name: string;
  finish: string;
  story: string;
  image: `/${string}`;
  accent: string;
  bodyTone: string;
  strawTone: string;
  parts: TumblerPart[];
};

const SHARED_PARTS = (finishDetail: string): TumblerPart[] => [
  {
    id: "body",
    name: "Double-Wall Body",
    detail:
      "Vacuum-insulated double wall keeps your brew hot on the Dubai commute and cold through long afternoons.",
    x: 72,
    y: 48,
  },
  {
    id: "finish",
    name: "Exterior Finish",
    detail: finishDetail,
    x: 28,
    y: 38,
  },
  {
    id: "lining",
    name: "304 Stainless Lining",
    detail:
      "Food-grade 304 stainless steel interior — pure taste, zero aftertaste, built for daily rituals.",
    x: 74,
    y: 62,
  },
  {
    id: "lid",
    name: "Spill-Proof Lid",
    detail:
      "Screw-on lid with a sliding sip mechanism. Press. Sip. Seal. Built for motion.",
    x: 50,
    y: 12,
  },
  {
    id: "seal",
    name: "Silicone Seal",
    detail:
      "Food-safe silicone gasket locks the lid tight — leak resistance you can trust in a bag.",
    x: 68,
    y: 18,
  },
  {
    id: "base",
    name: "Base Footpad",
    detail:
      "Soft-touch base ring steadies the tumbler on cafe tables, dashboards, and desks.",
    x: 50,
    y: 90,
  },
  {
    id: "straw",
    name: "Color-Matched Straw",
    detail:
      "Reusable straw tinted to match the finish — optional, packable, always on brand.",
    x: 32,
    y: 28,
  },
];

export const STORY_TUMBLERS: StoryTumbler[] = [
  {
    id: "pure-white",
    name: "Pure White",
    finish: "Soft matte enamel",
    story:
      "Minimalist. The blank canvas for your morning ritual. Clean, focused, and ready to take on the day.",
    image: "/base-white.png",
    accent: "#E8E8E4",
    bodyTone: "#F4F4F2",
    strawTone: "#F0F0EC",
    parts: SHARED_PARTS(
      "Soft matte white enamel — fingerprint-resistant, quietly luminous under cafe light.",
    ),
  },
  {
    id: "matte-black",
    name: "Matte Black",
    finish: "Rugged matte powder coat",
    story:
      "Bold. Understated. The adventurer’s essential. Rugged finish for the long road ahead.",
    image: "/base-black.png",
    accent: "#2A2A2A",
    bodyTone: "#141414",
    strawTone: "#1A1A1A",
    parts: SHARED_PARTS(
      "Deep matte black powder coat — rugged, understated, built for the long road.",
    ),
  },
  {
    id: "lavender-botanical",
    name: "Lavender Botanical",
    finish: "Floral print on soft lavender",
    story:
      "Dreamy. Inspired by nature. A calm moment in the afternoon rush, blooming with quiet elegance.",
    image: "/variant-6.png",
    accent: "#D2BEE1",
    bodyTone: "#C8B4D8",
    strawTone: "#B8A0CC",
    parts: SHARED_PARTS(
      "Soft lavender base with botanical florals — textured print that catches light like petals.",
    ),
  },
  {
    id: "soft-pink",
    name: "Soft Pink",
    finish: "Gentle matte blush",
    story:
      "Playful. Gentle. The warm embrace on a cool afternoon. Sweet sips with a touch of charm.",
    image: "/base-pink.png",
    accent: "#E8B4B8",
    bodyTone: "#E8B4B8",
    strawTone: "#D99299",
    parts: SHARED_PARTS(
      "Gentle matte blush pink — warm to the eye, soft to the touch, unmistakably Himba.",
    ),
  },
];
