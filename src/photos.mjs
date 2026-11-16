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
  saintValentin: {
    file: "bo-ours-unis-saint-valentin", sizes: [[600, 327], [1200, 655]],
    alt: {
      fr: "Bo danse avec une rose rouge dans la bouche et un string à cœurs",
      nl: "Bo danst met een rode roos in zijn mond en een string met hartjes",
      en: "Bo dancing with a red rose in his mouth and a heart-print thong",
      de: "Bo tanzt mit einer roten Rose im Mund und einem String mit Herzen",
    },
  },
  octobreRose: {
    file: "bo-ours-unis-octobre-rose", sizes: [[600, 327], [1200, 655]],
    alt: {
      fr: "Bo lève un trophée, avec un string rose brodé du ruban d'Octobre Rose",
      nl: "Bo heft een trofee op, met een roze string met het lintje van Roze Oktober",
      en: "Bo raising a trophy, wearing a pink thong with the Pink October ribbon",
      de: "Bo hebt einen Pokal, mit rosa String und der Schleife des Pink October",
    },
  },
  pochette: {
    file: "pochette-kraft-unis", sizes: [[600, 745], [1200, 1490]],
    alt: {
      fr: "Pochette kraft format boîte aux lettres avec un string emballé dans du papier rose",
      nl: "Kraftenvelop in brievenbusformaat met een string in roze zijdepapier",
      en: "Letterbox-size kraft mailer with a thong wrapped in pink tissue paper",
      de: "Kraftumschlag im Briefkastenformat mit einem String in rosa Seidenpapier",
    },
  },
  prideArcEnCiel: {
    file: "bo-ours-unis-pride-arc-en-ciel", sizes: [[600, 548], [1200, 1097]],
    alt: {
      fr: "Bo allongé sur le ventre, avec un string arc-en-ciel du drop Pride",
      nl: "Bo ligt op zijn buik, met een regenboogstring uit de Pride-drop",
      en: "Bo lying on his tummy in a rainbow thong from the Pride drop",
      de: "Bo liegt auf dem Bauch, mit einem Regenbogen-String aus dem Pride-Drop",
    },
  },
  printemps: {
    file: "bo-ours-unis-printemps", sizes: [[600, 600], [1200, 1200]],
    alt: {
      fr: "Bo assis avec un chapeau de paille, un épi de blé et un string lilas fleuri",
      nl: "Bo zit met een strohoed, een korenaar en een lila string met bloemetjes",
      en: "Bo sitting in a straw hat with a wheat stalk and a lilac floral thong",
      de: "Bo sitzt mit Strohhut, Weizenähre und einem fliederfarbenen Blumen-String",
    },
  },
  stringNoel: {
    file: "string-unisexe-noel-rennes-plat", sizes: [[600, 600], [1200, 1200]],
    alt: {
      fr: "String unisexe rouge à plat, imprimé rennes, sapins et flocons de neige",
      nl: "Rode unisex string plat gelegd, met rendieren, kerstbomen en sneeuwvlokken",
      en: "Red unisex thong laid flat, printed with reindeer, Christmas trees and snowflakes",
      de: "Roter Unisex-String flach gelegt, mit Rentieren, Tannen und Schneeflocken",
    },
  },
  noelStudio: {
    file: "bo-ours-unis-noel-studio", sizes: [[600, 750], [1122, 1402]],
    alt: {
      fr: "Bo debout de face sur fond blanc, gros nœud rouge et string de Noël à rennes",
      nl: "Bo staat recht op een witte achtergrond, met grote rode strik en kerststring",
      en: "Bo standing on a white background with a big red bow and reindeer Christmas thong",
      de: "Bo steht vor weißem Hintergrund, mit großer roter Schleife und Rentier-String",
    },
  },
  stringTrans: {
    file: "string-unisexe-pride-drapeau-trans", sizes: [[600, 400], [1200, 800]],
    alt: {
      fr: "Bo allongé avec un string aux couleurs du drapeau trans, et le même string à plat",
      nl: "Bo ligt met een string in de kleuren van de transvlag, en dezelfde string plat",
      en: "Bo lying in a trans flag thong, next to the same thong laid flat",
      de: "Bo liegt mit einem String in den Farben der Trans-Flagge, daneben derselbe String",
    },
  },
};

// Quelle photo va où. null = on garde l'illustration SVG.
export const PLACEMENT = {
  hero: { noel: "noelAllonge", halloween: "halloween" },
  season: { noel: "noelAllonge", halloween: "halloween", valentin: "saintValentin", rose: "octobreRose", pride: "prideArcEnCiel", printemps: "printemps" },
  boPage: "noelStudio",
  club: "halloweenDos",
  boCard: { noel: "noelStudio", valentin: "saintValentin" },     // carte « Bo » et « Bo édition » de la saison
  boxCard: { noel: "noelAllonge", valentin: "saintValentin" },
  article: { cadeau: "noel" },
  help: "pochette",
  // Photo d'un produit précis, par SKU (strings à plat).
  itemCard: { "UNIS-NOEL27-RENNES": "stringNoel", "UNIS-PRIDE27-TRANS": "stringTrans", "UNIS-PRIDE27-RAINBOW": "prideArcEnCiel" },
};

// Vidéos (MP4 H.264 sans son, lecture auto en muet et en boucle, sauf si l'appareil demande moins d'animations).
export const VIDEOS = {
  noel: {
    file: "bo-revele-drop-noel", poster: "bo-revele-drop-noel-poster.webp", width: 1280, height: 720,
    label: {
      fr: "Vidéo : Bo se retourne avec son bonnet de Noël et révèle le string Rennes du drop de Noël",
      nl: "Video: Bo draait zich om met zijn kerstmuts en toont de rendierstring van de kerstdrop",
      en: "Video: Bo turns around in his Santa hat and reveals the reindeer thong from the Christmas drop",
      de: "Video: Bo dreht sich mit Weihnachtsmütze um und zeigt den Rentier-String des Weihnachts-Drops",
    },
  },
};

export const OG_IMAGE = { file: "og-unis.jpg", width: 1200, height: 630 };
