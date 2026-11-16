// Photos du site (WebP générés dans assets/images/, en 600 px et en grand format).
// Textes Alt traduits, 8 à 15 mots (docs/04-seo.md). Les relire avec une personne native.
export const PHOTOS = {
  noel: {
    file: "bo-ours-unis-noel", sizes: [[600, 800], [1086, 1448]],
    alt: {
      fr: "Bo, l'ours en peluche UNIS, assis près du sapin avec bonnet et string de Noël",
      nl: "Bo, de UNIS-knuffelbeer, zit bij de kerstboom met kerstmuts en kerststring",
      en: "Bo the UNIS teddy bear sitting by the Christmas tree in a Santa hat and Christmas thong",
      de: "Bo, der UNIS-Teddybär, sitzt mit Weihnachtsmütze und Weihnachts-String am Tannenbaum",
    },
  },
  noelAllonge: {
    file: "bo-ours-unis-noel-allonge", sizes: [[600, 400], [1200, 800]],
    alt: {
      fr: "Bo allongé sur fond blanc, avec bonnet de Père Noël et string rouge à sapins",
      nl: "Bo ligt op een witte achtergrond met kerstmuts en rode string met dennenbomen",
      en: "Bo lying on a white background in a Santa hat and red tree-print thong",
      de: "Bo liegt vor weißem Hintergrund mit Weihnachtsmütze und rotem Tannen-String",
    },
  },
  halloween: {
    file: "bo-ours-unis-halloween", sizes: [[600, 400], [1200, 800]],
    alt: {
      fr: "Bo allongé avec un chapeau de sorcière et un string à citrouilles d'Halloween",
      nl: "Bo ligt met een heksenhoed en een Halloween-string met pompoenen",
      en: "Bo lying down in a witch hat and a pumpkin-print Halloween thong",
      de: "Bo liegt mit Hexenhut und Halloween-String mit Kürbismuster",
    },
  },
  halloweenDos: {
    file: "bo-ours-unis-halloween-dos", sizes: [[600, 626], [1200, 1252]],
    alt: {
      fr: "Bo vu de dos, avec chapeau de sorcière et string à citrouilles",
      nl: "Bo van achteren gezien, met heksenhoed en pompoenstring",
      en: "Bo seen from behind in a witch hat and pumpkin-print thong",
      de: "Bo von hinten, mit Hexenhut und Kürbis-String",
    },
  },
};

// Quelle photo va où. null = on garde l'illustration SVG.
export const PLACEMENT = {
  hero: { noel: "noelAllonge", halloween: "halloween" },
  season: { noel: "noelAllonge", halloween: "halloween" },
  boPage: "noel",
  club: "halloweenDos",
  boCard: { noel: "noel" },     // carte « Bo » et « Bo édition » de la saison
  boxCard: { noel: "noelAllonge" },
  article: { cadeau: "noel" },
};

export const OG_IMAGE = { file: "og-unis.jpg", width: 1200, height: 630 };
