// Données du catalogue et de l'arborescence. Palettes et motifs repris du prototype (tableau S).
export const LANGS = ["fr", "nl", "en", "de"];
export const DEFAULT_LANG = "fr";
export const XDEFAULT = "en"; // x-default → /en/ (docs/04-seo.md)

// Slugs traduits, sans accents (docs/04-seo.md)
export const PATHS = {
  fr: { home: "", bo: "bo/", ess: "essentiels/", seasons: "saisons/", size: "guide-des-tailles/", help: "aide/", terms: "conditions-de-vente/", privacy: "vie-privee/", legal: "mentions-legales/" },
  nl: { home: "", bo: "bo/", ess: "essentials/", seasons: "seizoenen/", size: "maatgids/", help: "hulp/", terms: "verkoopvoorwaarden/", privacy: "privacy/", legal: "wettelijke-vermeldingen/" },
  en: { home: "", bo: "bo/", ess: "essentials/", seasons: "seasons/", size: "size-guide/", help: "help/", terms: "terms-of-sale/", privacy: "privacy/", legal: "legal-notice/" },
  de: { home: "", bo: "bo/", ess: "essentials/", seasons: "saisons/", size: "groessentabelle/", help: "hilfe/", terms: "agb/", privacy: "datenschutz/", legal: "impressum/" },
};

export const SEASONS = [
  { id: "valentin", next: "2027-02-03",
    slug: { fr: "saint-valentin", nl: "valentijn", en: "valentines-day", de: "valentinstag" },
    c: { bg: "#FFE9EE", ink: "#3B0A1E", accent: "#E0234E", soft: "#FFB7C8", on: "#FFFFFF" },
    name: { fr: "Saint-Valentin", nl: "Valentijn", en: "Valentine's", de: "Valentinstag" },
    bo: true, box: true,
    items: [
      { n: { fr: "Cœurs brodés", nl: "Geborduurde hartjes", en: "Embroidered hearts", de: "Gestickte Herzen" }, p: "hearts", base: "#E0234E", fg: "#FFE9EE" },
      { n: { fr: "Rose poétique", nl: "Poëtisch roze", en: "Poetic pink", de: "Poetisches Rosa" }, p: "solid", base: "#FF8FAB" },
    ] },
  { id: "printemps", next: "2027-03-17",
    slug: { fr: "printemps", nl: "lente", en: "spring", de: "fruehling" },
    c: { bg: "#EEF6EC", ink: "#1E3324", accent: "#7A5BD8", soft: "#C9E7C1", on: "#FFFFFF" },
    name: { fr: "Printemps", nl: "Lente", en: "Spring", de: "Frühling" },
    items: [
      { n: { fr: "Fleurs pastel", nl: "Pastelbloemen", en: "Pastel blooms", de: "Pastellblüten" }, p: "flowers", base: "#C9B6FF", fg: "#FFFFFF" },
      { n: { fr: "Menthe", nl: "Munt", en: "Mint", de: "Minze" }, p: "solid", base: "#9ED9B8" },
      { n: { fr: "Pêche", nl: "Perzik", en: "Peach", de: "Pfirsich" }, p: "solid", base: "#FFC4A3" },
    ] },
  { id: "pride", next: "2027-06-01",
    slug: { fr: "pride", nl: "pride", en: "pride", de: "pride" },
    c: { bg: "#FFF7E0", ink: "#1B1B3A", accent: "#C42A60", soft: "#FFD66B", on: "#FFFFFF" },
    name: { fr: "Pride", nl: "Pride", en: "Pride", de: "Pride" },
    items: [
      { n: { fr: "Arc-en-ciel", nl: "Regenboog", en: "Rainbow", de: "Regenbogen" }, p: "rainbow" },
      { n: { fr: "Drapeau trans", nl: "Transvlag", en: "Trans flag", de: "Trans-Flagge" }, p: "trans" },
      { n: { fr: "Fier·e en noir", nl: "Trots in zwart", en: "Proud in black", de: "Stolz in Schwarz" }, p: "rainbowband", base: "#1B1B3A" },
    ] },
  { id: "ete", next: "2027-06-15",
    slug: { fr: "ete", nl: "zomer", en: "summer", de: "sommer" },
    c: { bg: "#E3F4FF", ink: "#0C2D48", accent: "#FF6B2C", soft: "#8FD3FF", on: "#0C2D48" },
    name: { fr: "Été", nl: "Zomer", en: "Summer", de: "Sommer" },
    items: [
      { n: { fr: "Vagues", nl: "Golven", en: "Waves", de: "Wellen" }, p: "waves", base: "#1E88E5", fg: "#BDE6FF" },
      { n: { fr: "Orange sanguine", nl: "Bloedsinaasappel", en: "Blood orange", de: "Blutorange" }, p: "solid", base: "#FF6B2C" },
      { n: { fr: "Citron", nl: "Citroen", en: "Lemon", de: "Zitrone" }, p: "solid", base: "#FFE45C" },
    ] },
  { id: "halloween", next: "2027-10-01",
    slug: { fr: "halloween", nl: "halloween", en: "halloween", de: "halloween" },
    c: { bg: "#1C1726", ink: "#F3EEFF", accent: "#FF8A1F", soft: "#4A3A66", on: "#1C1726" },
    name: { fr: "Halloween", nl: "Halloween", en: "Halloween", de: "Halloween" },
    items: [
      { n: { fr: "Fantômes", nl: "Spookjes", en: "Ghosts", de: "Gespenster" }, p: "ghosts", base: "#2A2236", fg: "#F3EEFF" },
      { n: { fr: "Phosphorescent", nl: "Fluo in het donker", en: "Glow in the dark", de: "Leuchtet im Dunkeln" }, p: "solid", base: "#B8FF5C" },
      { n: { fr: "Citrouille", nl: "Pompoen", en: "Pumpkin", de: "Kürbis" }, p: "solid", base: "#FF8A1F" },
    ] },
  { id: "noel", next: "2027-11-01",
    slug: { fr: "noel", nl: "kerst", en: "christmas", de: "weihnachten" },
    c: { bg: "#EAF2EC", ink: "#12301F", accent: "#C8372D", soft: "#BFD9C6", on: "#FFFFFF" },
    name: { fr: "Noël", nl: "Kerst", en: "Christmas", de: "Weihnachten" },
    bo: true, box: true,
    items: [
      { n: { fr: "Rennes disco", nl: "Disco-rendieren", en: "Disco reindeer", de: "Disco-Rentiere" }, p: "trees", base: "#1F5C45", fg: "#D4A24C", sku: "RENNES" },
      { n: { fr: "Pull moche", nl: "Foute kersttrui", en: "Ugly sweater", de: "Hässlicher Pulli" }, p: "zigzag", base: "#C8372D", fg: "#FFFFFF", sku: "PULL" },
    ] },
];

export const BASE = { bg: "#EFEAFF", ink: "#1B1B3A", accent: "#FF5A4E", soft: "#C8B6FF", on: "#1B1B3A" };

export const ESS = [
  { k: "encre", c: "#1B1B3A", n: { fr: "Encre", nl: "Inkt", en: "Ink", de: "Tinte" } },
  { k: "lilas", c: "#C8B6FF", n: { fr: "Lilas", nl: "Lila", en: "Lilac", de: "Flieder" } },
  { k: "corail", c: "#FF5A4E", n: { fr: "Corail", nl: "Koraal", en: "Coral", de: "Koralle" } },
  { k: "sable", c: "#D9C3A5", n: { fr: "Sable", nl: "Zand", en: "Sand", de: "Sand" } },
  { k: "cacao", c: "#5A3A2E", n: { fr: "Cacao", nl: "Cacao", en: "Cocoa", de: "Kakao" } },
  { k: "blanc", c: "#F7F7F2", n: { fr: "Blanc", nl: "Wit", en: "White", de: "Weiß" } },
];
export const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];
export const SIZE_TABLE = [["XS", "82–88", "62–68"], ["S", "88–94", "68–74"], ["M", "94–100", "74–80"], ["L", "100–106", "80–86"], ["XL", "106–113", "86–93"], ["2XL", "113–120", "93–100"], ["3XL", "120–128", "100–108"], ["4XL", "128–136", "108–116"]];
export const PRICES = { bo: 49, adult: 5, mini: 3, duo: 7, lot5: 20, box: 55 };
export const SHIPPING = { fee: 3.9, freeFrom: 30 };
