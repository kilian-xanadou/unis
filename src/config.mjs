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
};
