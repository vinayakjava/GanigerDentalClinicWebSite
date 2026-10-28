export const PRIMARY_PHONE = "9448932092";
export const SECONDARY_PHONE = "9611739915";
export const WHATSAPP_PHONE = "9448932092";
export const CLINIC_EMAIL = "drlakki34@gmail.com";

export const BRANCH_IDS = ["athani", "ainapur"] as const;
export type BranchId = (typeof BRANCH_IDS)[number];

// Google Maps resolves the English addresses more reliably than the Kannada ones.
export const BRANCH_MAP_QUERIES: Record<BranchId, string> = {
  athani: "Dr. Ganiger's Dental Clinic, Near Ambedkar Circle, Opp. Town Lake, Athani 591304, Belagavi",
  ainapur: "Dr. Ganiger's Dental Clinic, Nehru Chowk, Ainapur 591303, Kagawad, Belagavi",
};

// Day indexes follow Date#getDay(): 0 = Sunday.
export const BRANCH_CLOSED_WEEKDAYS: Record<BranchId, readonly number[]> = {
  athani: [],
  ainapur: [0],
};

export const SERVICE_IDS = [
  "xray",
  "extraction",
  "fillings",
  "gumSurgery",
  "rootCanal",
  "crownBridge",
  "dentures",
  "smileDesign",
  "whitening",
  "children",
  "implants",
  "laser",
  "cleaning",
  "habitAppliances",
  "braces",
  "wisdomTooth",
  "cancerDetection",
  "fullMouthRehab",
  "maxillofacial",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

export const FEATURED_SERVICES: readonly ServiceId[] = [
  "implants",
  "fullMouthRehab",
  "smileDesign",
  "crownBridge",
  "dentures",
  "maxillofacial",
];

export function telHref(phone: string) {
  return `tel:+91${phone}`;
}

export function whatsappHref(text?: string) {
  const query = text ? `?text=${encodeURIComponent(text)}` : "";
  return `https://wa.me/91${WHATSAPP_PHONE}${query}`;
}

export function mapsHref(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
