import {
  PRICE_AED,
  WHATSAPP_NUMBER,
  type TumblerColor,
  type TumblerVariant,
} from "./tumbler";

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
