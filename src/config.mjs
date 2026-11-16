// Réglages du site. Change ces valeurs puis relance `node src/build.mjs`.
export default {
  // Adresse publique du site, sans barre finale. Provisoire : Render (service "unis-demo").
  // Si Render te donne une autre adresse, ou quand le vrai domaine sera acheté
  // (ex. https://unis.eu), remplace-la ici et relance le build.
  siteUrl: "https://unis-demo.onrender.com",

  // Version de démonstration : les pages portent "noindex" pour que Google
  // n'indexe pas une boutique dont les produits n'existent pas encore.
  // Passe à true le jour du vrai lancement.
  indexable: false,

  // Saison en cours : valentin, printemps, pride, ete, halloween, noel.
  // Elle donne les couleurs du site et le drop mis en avant sur l'accueil.
  currentSeason: "noel",

  // Date de mise en ligne du site (démo).
  launchDate: "2026-11-16",

  // Fin de validité des prix du drop en cours (priceValidUntil dans le JSON-LD).
  dropPriceValidUntil: "2026-12-31",
  // Année du drop en cours (tampons du Club de Bo).
  dropYear: 2026,

  // Base de données Supabase (comptes, liste d'attente, contact, consentements cookies).
  // Supabase > Project Settings > API : "Project URL" et clé "anon public" (publishable).
  // Ces deux valeurs sont publiques par conception : la sécurité vient des règles RLS de supabase/schema.sql.
  // Ne mets JAMAIS ici la clé "service_role" (secrète).
  // Laisser vide = mode démo (rien n'est enregistré).
  supabaseUrl: "",
  supabaseAnonKey: "",

  // Mesure (chargée seulement après accord dans le bandeau cookies). Vide = rien n'est chargé.
  ga4Id: "",        // ex. "G-XXXXXXXXXX"
  metaPixelId: "",  // ex. "123456789012345"

  // Version de la politique cookies : la changer redemande le consentement à tout le monde.
  consentVersion: "2026-11-16",
};
