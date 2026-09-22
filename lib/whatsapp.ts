import {
  PRICE_AED,
  WHATSAPP_NUMBER,
  type TumblerColor,
  type TumblerVariant,
} from "./tumbler";
import type { CatalogProduct } from "./catalog";

function toWhatsAppUrl(message: string): string {
  const params = new URLSearchParams({ text: message });
  return `https://wa.me/${WHATSAPP_NUMBER}?${params.toString()}`;
}

export function buildWhatsAppOrderUrl(
  variant: TumblerVariant,
  engraving: string,
): string {
  const customName = engraving.trim() || "None";
  const message = `Hi Lalit, I want to buy the Himba Tumbler Variant #${variant.id} (${variant.name}) with custom engraving: ${customName}. Price: ${variant.priceAed} AED.`;
  return toWhatsAppUrl(message);
}

export function buildWhatsAppStandardOrderUrl(color: TumblerColor): string {
  const message = `Hi Lalit, I want to buy the ${color.label} Himba Tumbler for ${PRICE_AED} AED.`;
  return toWhatsAppUrl(message);
}

export type CatalogOrderSelection = {
  /** option kind → selected choice label */
  [kind: string]: string | undefined;
};

export function buildWhatsAppCatalogOrderUrl(
  product: CatalogProduct,
  selection: CatalogOrderSelection = {},
): string {
  const parts = [
    `Hi Lalit, I want to buy the ${product.name} for ${product.priceAed} AED.`,
  ];

  if (selection.color) {
    parts.push(`Color: ${selection.color}.`);
  }
  if (selection.size) {
    parts.push(`Size: ${selection.size}.`);
  }

  // Include any other custom keys
  Object.entries(selection).forEach(([key, value]) => {
    if (key === "color" || key === "size" || !value) return;
    parts.push(`${key}: ${value}.`);
  });

  return toWhatsAppUrl(parts.join(" "));
}
