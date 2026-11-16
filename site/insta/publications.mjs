// UNIS · 16 publications Instagram alignées sur les 16 envois de docs/03-campagnes-emailing.md.
// Une entrée = 1 post feed 4:5 (ou carrousel de 3 à 5 vignettes) + 1 story 9:16 avec sticker.
// Chemins d'images relatifs à insta/ (../assets/...). Texte français ; versions NL, EN (« thong »), DE à faire relire par une personne native.
// Régénérer la page : node insta/build.mjs · Vérifier : node insta/check.mjs

export const SITE = "https://unis-demo.onrender.com";

const I = (f) => `../assets/images/${f}`;
const E = (f) => `../assets/emailing/${f}`;

export const PUBLICATIONS = [
  // 1 ─────────────────────────────────────────────────────────────
  {
    n: 1, date: "2026-12-02", heure: "12 h 30", heureWhy: "pause de midi, quand les groupes parlent du tirage au sort",
    email: "01-newsletter-secret-santa-calendrier-avent.html", emailTitle: "4 cadeaux drôles à moins de 10 €",
    campaign: "2026-12-newsletter-secret-santa", page: "/fr/journal/cadeau-secret-santa-drole/",
    segment: "S1 · Le cadeau qui fait rire", demo: true,
    note: "Le doc 17 prévoit ce jour-là la Story ST3 « Quel motif pour qui ? » : la story ci-dessous la reprend telle quelle.",
    feed: {
      format: "Carrousel · 5 vignettes",
      slides: [
        { img: E("secret-santa-pochette.jpg"), fit: "cover", pos: "50% 60%", kicker: "Le calendrier de l'Avent de Bo", title: "4 cadeaux drôles à moins de 10 €", sub: "Glisse pour ouvrir les cases", price: { now: "dès 3 €" },
          alt: "Autour d'une table de fête entre adultes, des mains ouvrent une pochette kraft d'où sort un string rose à petits cœurs." },
        { img: I("string-unisexe-noel-rennes-plat-1200.webp"), fit: "cover", kicker: "Case 1", title: "Le string Rennes disco", sub: "Plat ou Poche, du XS au 4XL", price: { now: "5 €" },
          alt: "String rouge à motif de rennes, de sapins et de flocons, posé à plat sur fond blanc." },
        { img: I("bo-ours-unis-noel-studio-1200.webp"), fit: "cover", pos: "50% 40%", kicker: "Case 2", title: "Le mini-string pour Bo", sub: "Pour qui a déjà son ours", price: { now: "3 €" },
          alt: "Bo, l'ours en peluche miel, debout sur fond blanc, avec un grand nœud rouge et son mini-string de Noël à rennes." },
        { img: E("email-noel-bo-selfie.jpg"), fit: "cover", pos: "50% 45%", kicker: "Case 3", title: "Le Duo assorti", sub: "Ton string + le mini-string de Bo", price: { now: "7 €" },
          alt: "Bo fait un selfie dans un miroir de salon décoré pour Noël, nœud rouge et mini-string à rennes." },
        { img: I("string-unisexe-essentiels-lot-de-5-1200.webp"), fit: "cover", kicker: "Case 4", title: "Le lot de 5 pour l'équipe", sub: "Soit 4 € la tête", price: { now: "20 €" },
          alt: "Six strings unis empilés à plat : bleu encre, lilas, corail, sable, cacao et blanc." },
      ],
    },
    story: {
      img: E("story-noel-bo-selfie-9x16.jpg"), fit: "cover", kicker: "Secret Santa", title: "Quel motif pour qui ?",
      sticker: { type: "quiz", question: "Ta personne de Secret Santa, c'est plutôt…", options: ["La reine ou le roi de la piste", "Pro du pull moche", "Je ne la connais pas du tout"], answer: null,
        script: "Quiz sans bonne réponse (ST3 du doc 17). Écran 2 : Piste de danse → Rennes disco. Pull moche → Pull moche. Inconnue → Bo, une seule taille. Écran 3 : « Envoie ce quiz à ton groupe de Secret Santa » + sticker lien." },
      link: "Voir les 4 idées",
      alt: "Bo, l'ours en peluche miel, se prend en selfie devant un miroir, dans un salon décoré d'un sapin lumineux.",
    },
    caption: `Budget Secret Santa : 10 €. Fou rire : illimité.
Bo a ouvert 4 cases de son calendrier de l'Avent. Glisse pour les voir :
1. Le string Rennes disco, Plat ou Poche : 5 €
2. Le mini-string pour Bo : 3 €
3. Le Duo assorti, string + mini-string : 7 €
4. Le lot de 5 pour toute l'équipe : 20 €, soit 4 € la tête
Du XS au 4XL, 95 % coton certifié OEKO-TEX, fabriqué en Europe.
Pour Noël, commande avant le jeudi 17 décembre. Livraison 3,90 €, offerte dès 30 €.
Les 4 idées t'attendent dans le lien en bio.
Tague la personne qui n'a toujours aucune idée pour son Secret Santa.
#BoPorte #UNIS #SecretSanta #CadeauDrole #UnFilTousLesCorps`,
  },

  // 2 ─────────────────────────────────────────────────────────────
  {
    n: 2, date: "2026-12-16", heure: "8 h 30", heureWhy: "rappel du matin ; story de rappel vers 18 h",
    email: "02-campagne-decembre-derniere-livraison.html", emailTitle: "Noël : tu as jusqu'à demain",
    campaign: "2026-12-derniere-livraison-noel", page: "/fr/saisons/noel/",
    segment: "S1 · Cadeau qui fait rire + S3 · Organisateur·rice de groupe", demo: true,
    note: "Urgence réelle : date limite du jeudi 17 décembre 2026. Le doc 17 prévoit ce jour-là le sondage « Tu as commandé ? » : la story le reprend.",
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: I("bo-ours-unis-noel-allonge-1200.webp"), fit: "contain", bg: "#FFFFFF", kicker: "Dernière ligne droite", title: "Tu as jusqu'à demain", sub: "Commande avant le jeudi 17 décembre pour Noël", price: { now: "7 €", label: "Duo" },
          alt: "Bo, l'ours en peluche miel, allongé sur le côté, bonnet rouge sur la tête et string de Noël rouge." },
      ],
    },
    story: {
      img: I("pochette-kraft-unis-1200.webp"), fit: "cover", kicker: "Jusqu'à demain, jeudi 17 décembre", title: "Ton Secret Santa est prêt ?",
      sticker: { type: "sondage", question: "Tu as commandé ?", options: ["Oui", "Pas encore"],
        script: "Sondage (repris du doc 17, 16/12). Écran 2 pour « Pas encore » : « Il te reste demain. Moi, je dis ça, je dis rien. » + sticker lien." },
      link: "Prendre le Duo à 7 €",
      alt: "Pochette kraft entrouverte sur une table en bois, un string glissé dans du papier de soie rose.",
    },
    caption: `Ton Secret Santa, c'est quand déjà ? Si la réponse est « bientôt » : respire.
Tu as jusqu'à demain, jeudi 17 décembre, pour commander et recevoir ton colis avant le 24.
Le kit de dernière minute :
Duo Secret Santa, string + mini-string, même motif : 7 €
String Rennes disco ou Pull moche : 5 €
Lot de 5 pour toute la bande : 20 €
Tout part dans sa pochette kraft, prête à glisser sous le sapin. Livraison 3,90 €, offerte dès 30 €.
Prends ton Duo via le lien en bio.
Envoie ce post à la personne qui organise le Secret Santa. Elle te dira merci.
#BoPorte #UNIS #SecretSanta #CadeauDrole #NoelEntrePotes`,
  },

  // 3 ─────────────────────────────────────────────────────────────
  {
    n: 3, date: "2027-01-06", heure: "19 h", heureWhy: "soirée, moment calme pour sortir le mètre ruban",
    email: "03-newsletter-taille-soldes-janvier.html", emailTitle: "Ta taille, en 30 secondes",
    campaign: "2027-01-newsletter-taille-soldes", page: "/fr/guide-des-tailles/",
    segment: "S5 · Pour soi (et les personnes qui ont reçu un string à Noël)", demo: true,
    feed: {
      format: "Carrousel · 4 vignettes",
      slides: [
        { img: E("email-essentiels-6-couleurs.jpg"), fit: "cover", kicker: "Nouvelle année, nouveaux basiques", title: "Ta taille, en 30 secondes", sub: "Glisse : 3 étapes, zéro prise de tête", price: { now: "5 €" },
          alt: "Six strings unis empilés à plat : bleu encre, lilas, corail, sable, cacao et blanc." },
        { img: I("string-unisexe-essentiels-lot-de-5-1200.webp"), fit: "cover", kicker: "3 étapes", title: "Un mètre ruban et c'est réglé", list: ["Prends un mètre ruban", "Mesure ton tour de hanches, au plus large", "Lis ta taille, du XS au 4XL"], price: { now: "XS→4XL", small: true },
          alt: "Six strings unis empilés à plat, du bleu encre au blanc, pour illustrer le choix de taille." },
        { img: I("string-unisexe-coupe-plat-poche-1200.webp"), fit: "contain", bg: "#FFFFFF", kicker: "Une coupe, pas un genre", title: "Plat ou Poche ?", list: ["Plat : un avant lisse, sans volume", "Poche : un avant préformé, de la place sans comprimer"], price: { now: "5 €" },
          alt: "Deux strings lilas côte à côte : à gauche la coupe Plat, à droite la coupe Poche avec un avant préformé." },
        { img: E("email-noel-string-fond-rouge.jpg"), fit: "cover", kicker: "Soldes · −30 % sur le drop Noël", title: "Le string Noël à 3,50 €", sub: "Dans la limite des stocks", price: { now: "3,50 €", old: "5 €" }, omnibus: "Prix le plus bas des 30 derniers jours : 5 €",
          alt: "String rouge à motif de rennes et de sapins posé à plat sur fond rouge, entouré de branches de sapin et de boules." },
      ],
    },
    story: {
      img: E("email-essentiels-6-couleurs.jpg"), fit: "cover", kicker: "Ta taille en 30 secondes", title: "Petit quiz taille",
      sticker: { type: "quiz", question: "Entre deux tailles, tu prends…", options: ["La plus petite", "La plus grande"], answer: 1,
        script: "Quiz, bonne réponse : la plus grande. Écran 2 : « Mètre ruban, tour de hanches, tableau. 30 secondes. » + sticker lien vers le guide des tailles." },
      link: "Trouver ma taille",
      alt: "Six strings unis empilés à plat dans les couleurs Essentiels, sur fond blanc.",
    },
    caption: `Ton tour de hanches, tu le connais ? Non ? Ton mètre ruban non plus, il dort au fond d'un tiroir.
Ici, pas de genre : une coupe et un tour de hanches. Glisse pour les 3 étapes :
1. Prends un mètre ruban.
2. Mesure ton tour de hanches, à l'endroit le plus large.
3. Lis ta taille dans le tableau, du XS au 4XL. Entre deux tailles ? Prends la plus grande.
Et c'est les soldes : −30 % sur le drop Noël. Le string passe de 5 € à 3,50 €, dans la limite des stocks (prix le plus bas des 30 derniers jours : 5 €). Le lot de 5 Essentiels reste à 20 €.
Trouve ta taille via le lien en bio.
Quelqu'un a reçu un string UNIS à Noël et hésite sur sa taille ? Envoie-lui ce post.
#BoPorte #UNIS #StringUnisexe #GuideDesTailles #UnFilTousLesCorps`,
  },

  // 4 ─────────────────────────────────────────────────────────────
  {
    n: 4, date: "2027-02-03", heure: "9 h", heureWhy: "ouverture du drop",
    email: "04-newsletter-unisexe-drop-saint-valentin.html", emailTitle: "Pourquoi on ne dit jamais « pour lui »",
    campaign: "2027-02-drop-saint-valentin", page: "/fr/saisons/saint-valentin/",
    segment: "S2 · Couple complice + S4 · Collectionneur·se", demo: true,
    feed: {
      format: "Carrousel · 3 vignettes",
      slides: [
        { img: I("bo-ours-unis-saint-valentin-1200.webp"), fit: "contain", bg: "#FFFFFF", kicker: "Drop Saint-Valentin · aujourd'hui", title: "À deux, c'est mieux. À trois, c'est assorti.", price: { now: "7 €", label: "Duo" },
          alt: "Bo, l'ours en peluche miel, danse sur une patte, une rose rouge entre les dents, en mini-string à cœurs." },
        { img: I("string-unisexe-saint-valentin-coeurs-plat-1200.webp"), fit: "cover", kicker: "Cœurs brodés", title: "Pas de « pour lui ». Pas de « pour elle ».", sub: "Une coupe, Plat ou Poche. Du XS au 4XL.", price: { now: "5 €" },
          alt: "String rose pâle à petits cœurs rouges brodés et ceinture rouge, posé à plat sur fond blanc." },
        { img: I("offrir-bo-coffret-cadeau-1200.webp"), fit: "cover", pos: "50% 45%", kicker: "Coffret cadeau", title: "Bo + le Duo de la saison", sub: "Bo : objet de collection, 14 ans et plus", price: { now: "55 €" },
          alt: "Des mains tendent une boîte à fenêtre où est assis Bo, l'ours en peluche, pendant un dîner entre amis adultes." },
      ],
    },
    story: {
      img: I("string-unisexe-saint-valentin-coeurs-plat-1200.webp"), fit: "cover", kicker: "Drop Saint-Valentin", title: "Le cadeau qui fait rire, puis rougir",
      sticker: { type: "sondage", question: "Pour la Saint-Valentin, tu offres…", options: ["Des fleurs (encore)", "Un Duo assorti"],
        script: "Sondage. Écran 2 : « Les fleurs fanent. Le Duo, lui, se porte. 7 €. » + sticker lien." },
      link: "Découvrir le drop",
      alt: "String rose pâle à petits cœurs rouges brodés, posé à plat sur fond blanc.",
    },
    caption: `Pourquoi on ne dit jamais « pour lui » ? Parce qu'un string n'a pas de genre. Il a une coupe.
Plat ou Poche, du XS au 4XL. Le reste, c'est toi qui décides.
Le drop Saint-Valentin sort aujourd'hui : motifs Cœurs brodés et Rose poétique. Bo édition Cœur les a déjà enfilés.
Duo assorti, ton string + le mini-string de Bo : 7 €
Bo édition Cœur, avec mini-string, boîte et certificat numéroté : 49 €
Coffret cadeau, Bo + le Duo de la saison : 55 €
Série limitée, jamais rééditée. Livraison 3,90 €, offerte dès 30 €.
Bo : objet de collection, 14 ans et plus.
Découvre le drop via le lien en bio.
Tague ta moitié. Ou envoie-lui ce post en privé, c'est plus discret.
#BoPorte #UNIS #SaintValentin #CadeauCouple #UnFilTousLesCorps`,
  },

  // 5 ─────────────────────────────────────────────────────────────
  {
    n: 5, date: "2027-02-10", heure: "19 h 30", heureWhy: "soirée, moment où l'on prépare son cadeau",
    email: "05-campagne-saint-valentin-rappel.html", emailTitle: "Le cadeau qui fait rire, puis rougir",
    campaign: "2027-02-saint-valentin-rappel", page: "/fr/saisons/saint-valentin/",
    segment: "S2 · Couple complice", demo: true,
    note: "Le compte à rebours vise le dimanche 14 février (la fête), pas une date limite de livraison : aucune date de livraison garantie n'est fixée dans les docs.",
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: E("email-saint-valentin-bo-rose.jpg"), fit: "contain", bg: "#FFFFFF", kicker: "Saint-Valentin · dimanche 14 février", title: "D'abord on rit. Après, on verra.", price: { now: "7 €", label: "Duo" },
          alt: "Bo, l'ours en peluche miel, danse sur une patte avec une rose rouge, en mini-string blanc à rayures et cœurs." },
      ],
    },
    story: {
      img: I("offrir-bo-coffret-cadeau-1200.webp"), fit: "cover", pos: "50% 45%", kicker: "Le 14 tombe un dimanche", title: "Commande tôt",
      sticker: { type: "compte à rebours", question: "Saint-Valentin", end: "dimanche 14 février 2027",
        script: "Compte à rebours jusqu'au dimanche 14 février 2027. Texte : « Commande tôt : le 14 tombe un dimanche. » + sticker lien." },
      link: "Offrir le Duo à 7 €",
      alt: "Des mains tendent une boîte à fenêtre où est assis Bo, l'ours en peluche, à une table de dîner entre adultes.",
    },
    caption: `Les fleurs fanent. Les chocolats disparaissent. Le Duo assorti, lui, se porte.
Toi d'un côté, Bo de l'autre, et un clin d'œil qui dure plus longtemps que le dessert.
Duo assorti Cœurs brodés : 7 €
Deux Duos, un pour chacun·e : 14 €
Coffret cadeau, Bo + le Duo de la saison : 55 €, livraison offerte (on dépasse 30 €)
Ton corps, ta taille, ton string. Bo s'occupe du reste.
Le 14 février tombe un dimanche : commande tôt, via le lien en bio.
Envoie ce post à ta moitié. Subtilement, ou pas.
#BoPorte #UNIS #SaintValentin #CadeauCouple #CadeauDrole`,
  },

  // 6 ─────────────────────────────────────────────────────────────
  {
    n: 6, date: "2027-03-16", heure: "18 h", heureWhy: "veille de l'ouverture publique, le jour de l'accès anticipé",
    email: "06-campagne-printemps-acces-avant.html", emailTitle: "Le Printemps ouvre 24 h avant pour toi",
    campaign: "2027-03-drop-printemps", page: "/fr/saisons/printemps/",
    segment: "S4 · Collectionneur·se (liste d'attente, Club de Bo) + S5 · Pour soi", demo: true,
    note: "Publié la veille du drop (17 mars), le jour de l'accès anticipé réservé à la liste d'attente.",
    feed: {
      format: "Carrousel · 4 vignettes",
      slides: [
        { img: I("bo-ours-unis-printemps-studio-1200.webp"), fit: "cover", pos: "50% 35%", kicker: "Ouverture demain, mercredi 17 mars", title: "Bo l'a déjà enfilé", sub: "Nouveau motif. Jamais réédité.", price: { now: "5 €" },
          alt: "Bo, l'ours en peluche miel, debout sur fond blanc, un bouquet de tulipes dans les bras, nœud et mini-string lilas à fleurs." },
        { img: I("string-unisexe-printemps-fleurs-pastel-plat-1200.webp"), fit: "cover", kicker: "Drop Printemps", title: "Fleurs pastel", sub: "Plat ou Poche, XS à 4XL", price: { now: "5 €" },
          alt: "String lilas à petites fleurs blanches, posé à plat sur fond blanc." },
        { img: I("string-unisexe-printemps-menthe-plat-1200.webp"), fit: "cover", kicker: "Drop Printemps", title: "Menthe", sub: "Plat ou Poche, XS à 4XL", price: { now: "5 €" },
          alt: "String vert menthe uni, posé à plat sur fond blanc." },
        { img: I("string-unisexe-printemps-peche-plat-1200.webp"), fit: "cover", kicker: "Drop Printemps", title: "Pêche", sub: "En Duo avec le mini-string de Bo : 7 €", price: { now: "5 €" },
          alt: "String couleur pêche uni, posé à plat sur fond blanc." },
      ],
    },
    story: {
      img: E("bo-printemps-tulipes.jpg"), fit: "cover", pos: "50% 35%", kicker: "Drop Printemps", title: "Ouverture à tout le monde demain",
      sticker: { type: "compte à rebours", question: "Drop Printemps", end: "mercredi 17 mars 2027 (heure à confirmer)",
        script: "Compte à rebours jusqu'à l'ouverture publique du mercredi 17 mars. Texte : « La liste d'attente est déjà dedans. Toi aussi, au prochain drop ? » + sticker lien vers le Club de Bo." },
      link: "Rejoindre la liste d'attente",
      alt: "Bo, l'ours en peluche miel, tient un bouquet de tulipes, nœud lilas et mini-string à fleurs, sur fond blanc.",
    },
    caption: `Nouveau motif. Jamais réédité. Bo l'a déjà enfilé (il n'a pas su attendre).
Le drop Printemps ouvre à tout le monde demain, mercredi 17 mars. La liste d'attente, elle, est déjà dedans depuis aujourd'hui.
Fleurs pastel, Menthe, Pêche :
String Printemps, Plat ou Poche, XS à 4XL : 5 €
Duo assorti avec le mini-string de Bo : 7 €
Bo, avec mini-string, boîte et certificat numéroté : 49 € (objet de collection, 14 ans et plus)
Tu veux passer devant au prochain drop ? Rejoins la liste d'attente via le lien en bio.
Tague l'ami·e fan de Bo qui rate toujours les ouvertures.
#BoPorte #UNIS #DropPrintemps #StringUnisexe #UnFilTousLesCorps`,
  },

  // 7 ─────────────────────────────────────────────────────────────
  {
    n: 7, date: "2027-04-01", heure: "12 h", heureWhy: "milieu de journée, quand les blagues du 1er avril circulent",
    email: "07-campagne-poisson-avril-code-cache.html", emailTitle: "Ceci n'est pas un poisson d'avril",
    campaign: "2027-04-code-cache", page: "/fr/",
    segment: "S3 · Organisateur·rice de groupe + S1 · Cadeau qui fait rire", demo: false,
    note: "Le code lui-même n'est jamais écrit dans la publication. Conditions, durée et prix le plus bas des 30 jours s'affichent sur le site.",
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: E("email-printemps-bo.jpg"), fit: "cover", pos: "45% 50%", kicker: "1er avril", title: "Ceci n'est pas un poisson d'avril", sub: "Bo a caché un code. Pour de vrai.", price: { now: "−15 %", label: "code" }, omnibus: "Prix le plus bas des 30 derniers jours affiché à côté de chaque prix réduit",
          alt: "Bo, l'ours en peluche miel, assis avec un chapeau de paille et un épi de blé dans la bouche, en mini-string pastel à fleurs." },
      ],
    },
    story: {
      img: E("email-printemps-bo.jpg"), fit: "cover", pos: "45% 50%", kicker: "Chasse au code", title: "Où Bo a-t-il caché le code ?",
      sticker: { type: "quiz", question: "Indice : il adore les pages où l'on parle de lui.", options: ["Dans le panier", "Sur la page de Bo", "Sous le canapé"], answer: 1,
        script: "Quiz, bonne réponse : la page de Bo (même indice que l'email). Écran 2 : « Trouve-le avant tes potes. » + sticker lien vers l'accueil." },
      link: "Partir à la chasse",
      alt: "Bo, l'ours en peluche, en chapeau de paille, un épi de blé dans la bouche, l'air de ne rien savoir.",
    },
    caption: `Ceci n'est pas un poisson d'avril. Enfin, un peu.
Bo a planqué un code −15 % quelque part sur le site. Pour de vrai.
Indice : il adore les pages où l'on parle de lui.
Conditions et durée de validité affichées avec le code. À côté de chaque prix réduit, tu verras le prix le plus bas des 30 derniers jours.
Rappel des prix : string 5 €, mini-string 3 €, Duo 7 €, lot de 5 20 €. Livraison 3,90 €, offerte dès 30 €.
Pars à la chasse au code via le lien en bio.
Tague tes potes : trouve-le avant eux, ou donne-leur l'indice, on ne juge pas.
#BoPorte #UNIS #PoissonDAvril #ChasseAuCode #CadeauDrole`,
  },

  // 8 ─────────────────────────────────────────────────────────────
  {
    n: 8, date: "2027-05-12", heure: "18 h 30", heureWhy: "fin de journée",
    email: "08-campagne-pride-precommande.html", emailTitle: "Pride arrive. Bo a déjà sa tenue.",
    campaign: "2027-05-pride-precommande", page: "/fr/saisons/pride/",
    segment: "S5 · Pour soi, confort et valeurs", demo: false,
    note: "Don : « partenariat en cours de discussion », jamais présenté comme acquis. Aucun logo ni visuel officiel d'événement.",
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: I("string-unisexe-pride-drapeau-trans-1200.webp"), fit: "contain", bg: "#FFFFFF", kicker: "Précommande Pride", title: "Tous les corps. Même le tien.", sub: "Envoi à partir du 1er juin", price: { now: "5 €" },
          alt: "Bo, l'ours en peluche miel, allongé sur le ventre en mini-string aux couleurs du drapeau trans, à côté du string assorti posé à plat." },
      ],
    },
    story: {
      img: I("string-unisexe-pride-fier-en-noir-plat-1200.webp"), fit: "cover", kicker: "Précommande Pride", title: "Arc-en-ciel, Drapeau trans, Fier·e en noir",
      sticker: { type: "sondage", question: "Cette année, tu défiles…", options: ["Assorti·e avec Bo", "Depuis mon canapé"],
        script: "Sondage. Écran 2 : « Dans les deux cas, tu as droit à un string qui ne te genre pas. 5 €. » + sticker lien vers la précommande." },
      link: "Précommander",
      alt: "String bleu nuit à ceinture rayée arc-en-ciel, posé à plat sur fond blanc.",
    },
    caption: `Pride arrive. Bo a déjà sa tenue (il a essayé les trois, évidemment).
Chez nous, un string n'a pas de genre : une coupe, Plat ou Poche, et une taille, du XS au 4XL.
La précommande du drop Pride est ouverte : tu réserves aujourd'hui, ton colis part à partir du 1er juin.
Arc-en-ciel, Drapeau trans, Fier·e en noir :
String Pride : 5 €
Duo Pride avec le mini-string de Bo : 7 €
Lot de 5 : 20 €
On aimerait reverser une partie des ventes Pride à une association. Partenariat en cours de discussion : rien n'est signé, aucun don n'est encore promis. On te dira tout, preuve à l'appui.
Précommande via le lien en bio.
Tague ta bande pour défiler assorti·e·s.
#BoPorte #UNIS #Pride #StringUnisexe #UnFilTousLesCorps`,
  },

  // 9 ─────────────────────────────────────────────────────────────
  {
    n: 9, date: "2027-06-01", heure: "9 h", heureWhy: "ouverture du drop",
    email: "09-campagne-drop-pride-ete.html", emailTitle: "Le drop Pride est là",
    campaign: "2027-06-drop-pride", page: "/fr/saisons/pride/",
    segment: "S5 · Pour soi + S3 · Organisateur·rice de groupe", demo: false,
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: I("bo-ours-unis-pride-arc-en-ciel-1200.webp"), fit: "contain", bg: "#FFFFFF", kicker: "Drop Pride · aujourd'hui", title: "Fier·e en Duo. Pour 7 €.", sub: "Série limitée, jamais rééditée", price: { now: "7 €", label: "Duo" },
          alt: "Bo, l'ours en peluche miel, allongé sur le ventre, pattes en l'air, en mini-string arc-en-ciel." },
      ],
    },
    story: {
      img: E("email-ete-bo-hibiscus.jpg"), fit: "cover", pos: "50% 20%", kicker: "Et le 15 juin…", title: "Bo prépare sa valise",
      sticker: { type: "compte à rebours", question: "Drop Été", end: "mardi 15 juin 2027 (heure à confirmer)",
        script: "Compte à rebours jusqu'au drop Été du mardi 15 juin. Écran précédent : visuel du post Pride + sticker lien « Prendre le Duo Pride »." },
      link: "Prendre le Duo Pride",
      alt: "Bo, l'ours en peluche, lunettes de soleil en cœur et fleur d'hibiscus à l'oreille, à côté d'un string et d'un mini-string à hibiscus.",
    },
    caption: `Bo a défilé dans le salon toute la nuit. Il est prêt.
Le drop Pride est ouvert : le string à 5 €, et le Duo assorti à 7 € pour que Bo défile avec toi.
Arc-en-ciel, Drapeau trans ou Fier·e en noir. Série limitée, jamais rééditée.
Lot de 5 pour la bande : 20 €.
Projet de don à une association : partenariat en cours de discussion, rien n'est encore acquis.
Et le mardi 15 juin, drop Été : Hibiscus, Vagues, Orange sanguine et Citron. Bo prépare sa valise.
Prends ton Duo Pride via le lien en bio.
Une bande à habiller pour la marche ? Tague-la.
#BoPorte #UNIS #Pride #DuoAssorti #UnFilTousLesCorps`,
  },

  // 10 ────────────────────────────────────────────────────────────
  {
    n: 10, date: "2027-07-01", heure: "12 h 30", heureWhy: "pause de midi, premier jour des soldes",
    email: "10-campagne-soldes-ete-bande.html", emailTitle: "Soldes : le string Été à 4 €",
    campaign: "2027-07-soldes-ete", page: "/fr/saisons/ete/",
    segment: "S3 · Organisateur·rice de groupe", demo: false,
    note: "Réduction : prix le plus bas des 30 jours affiché sur le visuel et dans la légende.",
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: E("email-ete-hibiscus-fond-rose.jpg"), fit: "cover", kicker: "Soldes d'été · −20 % sur le drop Été", title: "Toute la bande en UNIS. 4 € la tête.", price: { now: "4 €", old: "5 €" }, omnibus: "Prix le plus bas des 30 derniers jours : 5 € le string Été, 7 € le Duo Été",
          alt: "String à grandes fleurs d'hibiscus roses et corail, posé à plat sur un fond rose." },
      ],
    },
    story: {
      img: I("string-unisexe-ete-vagues-plat-1200.webp"), fit: "cover", kicker: "Soldes d'été", title: "Une tenue d'équipe à 4 € la tête",
      sticker: { type: "sondage", question: "Cet été, ta bande part…", options: ["En festival", "En week-end coloc"],
        script: "Sondage. Écran 2 : « Dans les deux cas : string Été à 4 € au lieu de 5 € (prix le plus bas des 30 derniers jours : 5 €). » + sticker lien." },
      link: "Équiper la bande",
      alt: "String bleu à motif de vagues blanches, posé à plat sur fond blanc.",
    },
    caption: `Festival, coloc, enterrement de vie de célibataire : il vous faut une tenue d'équipe. Elle tient dans une poche.
Les soldes commencent : −20 % sur le drop Été.
String Été : 4 € au lieu de 5 €
Duo Été : 5,60 € au lieu de 7 €
5 strings Été pour la bande : 20 €, soit 4 € la tête
Prix le plus bas des 30 derniers jours avant les soldes : 5 € le string Été, 7 € le Duo Été.
Du XS au 4XL : personne ne reste sur le banc. Livraison 3,90 €, offerte dès 30 €.
Équipe ta bande via le lien en bio.
Tague le groupe du week-end : chacun·e choisit sa taille.
#BoPorte #UNIS #SoldesEte #WeekEndEntrePotes #UnFilTousLesCorps`,
  },

  // 11 ────────────────────────────────────────────────────────────
  {
    n: 11, date: "2027-08-18", heure: "19 h", heureWhy: "soirée, format communauté",
    email: "11-campagne-vote-drop-saint-valentin.html", emailTitle: "Choisis le prochain motif de Bo",
    campaign: "2027-08-vote-saint-valentin", page: "/fr/club/",
    segment: "S4 · Collectionneur·se de Bo + toute la communauté", demo: false,
    note: "Le sondage de la story est un sondage d'humeur : le vrai vote (et le tirage au sort, 18+, règlement publié) se fait dans le Club de Bo. Les motifs candidats ne sont pas nommés dans l'email : ils ne le sont pas ici non plus.",
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: I("bo-ours-unis-ete-hibiscus-1200.webp"), fit: "cover", pos: "50% 22%", kicker: "Vote · Saint-Valentin 2028", title: "Bo hésite. Tu tranches.", sub: "Un seul motif sera fabriqué", price: { now: "1 clic", small: true },
          alt: "Bo, l'ours en peluche, lunettes de soleil en cœur et fleur d'hibiscus, regarde un string et un mini-string posés devant lui." },
      ],
    },
    story: {
      img: I("bo-ours-unis-ete-hibiscus-1200.webp"), fit: "cover", pos: "50% 85%", kicker: "Saint-Valentin 2028", title: "Aide Bo à choisir",
      sticker: { type: "sondage", question: "Le prochain motif de Bo, plutôt…", options: ["Tendre", "Coquin"],
        script: "Sondage d'humeur. Écran 2 : « Le vrai vote, c'est dans le Club de Bo. Un clic. » + sticker lien. Mention : tirage au sort réservé aux 18 ans et plus, règlement sur le site." },
      link: "Je vote",
      alt: "Bo, l'ours en peluche, debout en lunettes de soleil en cœur, fleur d'hibiscus et mini-string à hibiscus.",
    },
    caption: `Bo n'arrive pas à choisir son motif. Il a tenté le pile ou face : la pièce a refusé de trancher.
Le drop Saint-Valentin 2028 se prépare déjà, et c'est toi qui votes. Le motif gagnant sera fabriqué en Europe, en série limitée, jamais réédité.
Le vote se fait en un clic dans le Club de Bo. Un tirage au sort est organisé parmi les votant·e·s : participation gratuite, sans obligation d'achat, réservée aux 18 ans et plus. Lot et règlement complet publiés sur le site.
Vote via le lien en bio.
Tague ta bande : plus on est, plus Bo est content.
#BoPorte #UNIS #ClubDeBo #SaintValentin #UnFilTousLesCorps`,
  },

  // 12 ────────────────────────────────────────────────────────────
  {
    n: 12, date: "2027-09-08", heure: "12 h 30", heureWhy: "pause de midi en semaine de rentrée",
    email: "12-campagne-rentree-essentiels.html", emailTitle: "Rentrée : 5 strings pour 17 €",
    campaign: "2027-09-rentree-essentiels", page: "/fr/essentiels/",
    segment: "S5 · Pour soi + S3 · Organisateur·rice de groupe", demo: false,
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: I("string-unisexe-essentiels-lot-de-5-1200.webp"), fit: "cover", kicker: "Rentrée · les Essentiels", title: "Doux comme Bo. Prix d'un café.", sub: "6 couleurs, Plat ou Poche, XS à 4XL", price: { now: "17 €", old: "20 €", label: "lot de 5" }, omnibus: "Prix le plus bas des 30 derniers jours : 20 € le lot de 5",
          alt: "Six strings unis empilés à plat : bleu encre, lilas, corail, sable, cacao et blanc." },
      ],
    },
    story: {
      img: E("email-essentiels-6-couleurs.jpg"), fit: "cover", kicker: "Les Essentiels", title: "Le tri du tiroir, c'est maintenant",
      sticker: { type: "quiz", question: "Les Essentiels existent en combien de couleurs ?", options: ["4", "6", "12"], answer: 1,
        script: "Quiz, bonne réponse : 6 (Encre, Lilas, Corail, Sable, Cacao, Blanc). Écran 2 : « Lot de 5 : 17 € au lieu de 20 € (prix le plus bas des 30 derniers jours : 20 €). » + sticker lien." },
      link: "Prendre mon lot de 5",
      alt: "Six strings Essentiels empilés à plat, du bleu encre au blanc.",
    },
    caption: `La rentrée, c'est le moment de faire le tri dans le tiroir. Oui, celui-là.
Les Essentiels : 6 couleurs (Encre, Lilas, Corail, Sable, Cacao, Blanc), coupes Plat ou Poche, du XS au 4XL.
95 % coton et 5 % élasthanne, certifié OEKO-TEX, fabriqué en Europe.
Lot de 5 Essentiels : 17 € au lieu de 20 € (prix le plus bas des 30 derniers jours : 20 €).
String Essentiel à l'unité : 5 €.
Prends ton lot de 5 via le lien en bio.
Ta ou ton coloc doit renouveler son tiroir ? Tague-la, tague-le.
#BoPorte #UNIS #StringUnisexe #Essentiels #UnFilTousLesCorps`,
  },

  // 13 ────────────────────────────────────────────────────────────
  {
    n: 13, date: "2027-10-01", heure: "9 h", heureWhy: "ouverture du drop et de la capsule",
    email: "13-campagne-drop-halloween-octobre-rose.html", emailTitle: "Fais-toi peur (pour 5 €)",
    campaign: "2027-10-drop-halloween", page: "/fr/saisons/halloween/",
    segment: "S4 · Collectionneur·se de Bo + S5 · Pour soi (capsule Octobre Rose)", demo: false,
    note: "Octobre Rose : « partenariat en cours de discussion », aucun don présenté comme effectué. Le nom de l'association reste dans la légende, pas sur le visuel.",
    feed: {
      format: "Carrousel · 5 vignettes",
      slides: [
        { img: I("bo-ours-unis-halloween-1200.webp"), fit: "contain", bg: "#FFFFFF", kicker: "Drop Halloween · aujourd'hui", title: "Fais-toi peur (pour 5 €)", sub: "Bo, lui, n'a peur de rien", price: { now: "5 €" },
          alt: "Bo, l'ours en peluche miel, allongé avec un chapeau de sorcière, en mini-string noir à citrouilles orange." },
        { img: I("string-unisexe-halloween-fantomes-plat-1200.webp"), fit: "cover", kicker: "Drop Halloween", title: "Fantômes", sub: "Plat ou Poche, XS à 4XL", price: { now: "5 €" },
          alt: "String violet foncé à petits fantômes blancs, posé à plat sur fond blanc." },
        { img: I("string-unisexe-halloween-citrouille-plat-1200.webp"), fit: "cover", kicker: "Drop Halloween", title: "Citrouille", sub: "En Duo avec le mini-string de Bo : 7 €", price: { now: "5 €" },
          alt: "String orange citrouille uni, posé à plat sur fond blanc." },
        { img: I("string-unisexe-halloween-phosphorescent-plat-1200.webp"), fit: "cover", kicker: "Série limitée", title: "Phosphorescent", sub: "Il brille quand la lumière s'éteint", price: { now: "5 €" },
          alt: "String vert fluo uni, posé à plat sur fond blanc." },
        { img: I("string-unisexe-octobre-rose-ruban-plat-1200.webp"), fit: "cover", kicker: "Capsule Octobre Rose", title: "Projet : 1 € par article reversé", sub: "Partenariat en cours de discussion : aucun don encore effectué", price: { now: "5 €" },
          alt: "String rose pâle imprimé de petits rubans roses, ceinture framboise, posé à plat sur fond blanc." },
      ],
    },
    story: {
      img: I("string-unisexe-halloween-phosphorescent-plat-1200.webp"), fit: "cover", kicker: "Drop Halloween", title: "Le Phosphorescent, quiz express",
      sticker: { type: "quiz", question: "Le string Phosphorescent brille…", options: ["Au soleil", "Dans le noir", "Quand tu mens"], answer: 1,
        script: "Quiz, bonne réponse : dans le noir. Écran 2 : visuel de Bo en chapeau de sorcière, « Série limitée, jamais rééditée. 5 €. » + sticker lien." },
      link: "Voir le drop Halloween",
      alt: "String vert fluo uni, posé à plat sur fond blanc.",
    },
    caption: `Fais-toi peur. Bo, lui, n'a peur de rien (sauf de l'aspirateur).
Le drop Halloween est ouvert : Fantômes, Citrouille, et un modèle Phosphorescent en série limitée, pour briller quand la lumière s'éteint.
String Halloween : 5 €
Duo assorti avec le mini-string de Bo : 7 €
Bo, avec mini-string, boîte et certificat numéroté : 49 € (objet de collection, 14 ans et plus)
Aussi aujourd'hui : la capsule Octobre Rose. Notre projet : reverser 1 € par article à Think Pink. Partenariat en cours de discussion : aucun don n'est encore effectué. Dès que l'accord est signé, on publie le montant et la preuve.
Découvre le drop via le lien en bio.
Tague la personne qui a peur du noir. Le Phosphorescent l'aidera.
#BoPorte #UNIS #Halloween #OctobreRose #StringUnisexe`,
  },

  // 14 ────────────────────────────────────────────────────────────
  {
    n: 14, date: "2027-10-27", heure: "18 h 30", heureWhy: "fin de journée, on organise la soirée du week-end",
    email: "14-campagne-halloween-tenue-bande.html", emailTitle: "Ta tenue d'Halloween est prête ?",
    campaign: "2027-10-halloween-bande", page: "/fr/saisons/halloween/",
    segment: "S3 · Organisateur·rice de groupe + S1 · Cadeau qui fait rire", demo: false,
    note: "Le compte à rebours vise la soirée du dimanche 31 octobre. Aucune promesse de livraison : la légende renvoie au délai affiché au panier, comme l'email.",
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: E("email-halloween-bo-dos.jpg"), fit: "contain", bg: "#FFFFFF", kicker: "Halloween · dimanche 31 octobre", title: "Tous en citrouille. 4 € la tête.", price: { now: "20 €", label: "lot de 5" },
          alt: "Bo, l'ours en peluche miel, vu de dos avec un chapeau de sorcière, en mini-string noir à citrouilles." },
      ],
    },
    story: {
      img: I("string-unisexe-halloween-citrouille-plat-1200.webp"), fit: "cover", kicker: "Soirée déguisée ?", title: "Habille toute la bande",
      sticker: { type: "compte à rebours", question: "Soirée d'Halloween", end: "dimanche 31 octobre 2027",
        script: "Compte à rebours jusqu'au dimanche 31 octobre. Texte : « Lot de 5 : 20 €. Vérifie le délai de livraison affiché au panier. » + sticker lien." },
      link: "Habiller la bande",
      alt: "String orange citrouille uni, posé à plat sur fond blanc.",
    },
    caption: `Soirée déguisée ce week-end ? Ton costume est prêt. Ce qu'il y a dessous, beaucoup moins.
Habille toute la bande du même délire : lot de 5 à 20 €, soit 4 € la tête.
String Halloween à l'unité : 5 €
Duo assorti, pour emmener Bo : 7 €
Du XS au 4XL, personne ne reste sur le banc. Livraison 3,90 €, offerte dès 30 €.
Vérifie le délai de livraison affiché au panier avant ta soirée.
Habille la bande via le lien en bio.
Tague le groupe de la soirée : chacun·e choisit sa taille.
#BoPorte #UNIS #Halloween #SoireeDeguisee #UnFilTousLesCorps`,
  },

  // 15 ────────────────────────────────────────────────────────────
  {
    n: 15, date: "2027-11-01", heure: "9 h", heureWhy: "ouverture du drop",
    email: "15-campagne-drop-noel.html", emailTitle: "Bo édition Noël est arrivé",
    campaign: "2027-11-drop-noel", page: "/fr/saisons/noel/",
    segment: "S1 · Cadeau qui fait rire + S4 · Collectionneur·se de Bo", demo: false,
    note: "Aucune date limite de livraison 2027 n'est fixée dans les docs : la publication n'en annonce pas.",
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: I("bo-ours-unis-noel-1200.webp"), fit: "cover", pos: "50% 30%", kicker: "Drop Noël · aujourd'hui", title: "Que le Secret Santa commence", sub: "Nouveau motif, jamais réédité", price: { now: "5 €" },
          alt: "Bo, l'ours en peluche miel, assis près d'un sapin illuminé, bonnet rouge et mini-string rouge à tête de renne." },
      ],
    },
    story: {
      img: I("bo-ours-unis-noel-studio-1200.webp"), fit: "cover", pos: "50% 40%", kicker: "Drop Noël", title: "Le prix juste",
      sticker: { type: "quiz", question: "Le Duo (ton string + le mini de Bo), il coûte…", options: ["7 €", "15 €", "25 €"], answer: 0,
        script: "Quiz (format ST2 du doc 17), bonne réponse : 7 €. Écran 2 : « Et la livraison est offerte dès… » quiz 30 € / 50 € / 80 € (bonne réponse : 30 €). Écran 3 : sticker lien." },
      link: "Voir le drop Noël",
      alt: "Bo, l'ours en peluche miel, debout sur fond blanc, grand nœud rouge et mini-string de Noël.",
    },
    caption: `Bo a enfilé le motif de Noël avant tout le monde. Il appelle ça « contrôle qualité ».
Le drop Noël est ouvert. Nouveau motif, jamais réédité.
String de Noël, Plat ou Poche : 5 €
Duo assorti avec le mini-string de Bo : 7 €
Bo édition Noël, avec mini-string, boîte et certificat numéroté : 49 € (objet de collection, 14 ans et plus)
Coffret cadeau, Bo + le Duo de la saison : 55 €
Livraison 3,90 €, offerte dès 30 €. Drôle devant ta boss, coquin entre potes.
Vois le drop via le lien en bio.
Partage-le avec ton groupe de Secret Santa.
#BoPorte #UNIS #SecretSanta #CadeauDrole #DropNoel`,
  },

  // 16 ────────────────────────────────────────────────────────────
  {
    n: 16, date: "2027-11-26", heure: "12 h 30", heureWhy: "milieu de journée, au pic des promos du jour",
    email: "16-campagne-black-friday-raisonne.html", emailTitle: "Pas de −70 %. Juste 5 €.",
    campaign: "2027-11-black-friday-raisonne", page: "/fr/saisons/noel/",
    segment: "S5 · Pour soi + S1 · Cadeau qui fait rire", demo: false,
    note: "Aucune réduction. « Black Friday » cité en texte seulement, jamais de logo ou visuel officiel. Visuels « Bo de dos » de Noël écartés (texte dans l'image).",
    feed: {
      format: "Post · 1 visuel",
      slides: [
        { img: I("bo-ours-unis-noel-studio-1200.webp"), fit: "cover", pos: "50% 40%", kicker: "Vendredi raisonné", title: "Pas de −70 %. Juste 5 €.", sub: "Toute l'année. Sans faux rabais.", price: { now: "5 €" },
          alt: "Bo, l'ours en peluche miel, debout sur fond blanc, grand nœud rouge et mini-string de Noël, l'air serein." },
      ],
    },
    story: {
      img: I("pochette-kraft-unis-1200.webp"), fit: "cover", kicker: "Vendredi raisonné", title: "Le seul bon plan du jour",
      sticker: { type: "sondage", question: "Un −70 % sur un prix gonflé la veille, tu…", options: ["Fonces", "Flaires l'arnaque"],
        script: "Sondage. Écran 2 : « Chez nous : 5 € toute l'année. 6 strings = 30 € = livraison offerte. » + sticker lien." },
      link: "Voir le drop Noël",
      alt: "Pochette kraft entrouverte sur une table en bois, un string glissé dans du papier de soie rose.",
    },
    caption: `Aujourd'hui, partout, des −70 % sur des prix gonflés la veille. Chez nous, rien ne gonfle. Même pas l'ego de Bo (bon, un peu).
Le string UNIS est à 5 € toute l'année. Pas de compte à rebours, pas de stock « presque épuisé » inventé.
Le seul bon plan du jour (et de tous les jours) : 6 strings = 30 € = livraison offerte.
Lot de 5 : 20 €. Duo assorti : 7 €.
On voudrait aussi reverser 1 € par article à une association. Partenariat en cours de discussion : rien n'est signé, aucun don n'est encore effectué.
Vois le drop Noël via le lien en bio.
Partage avec la personne qui a déjà 14 onglets de promos ouverts.
#BoPorte #UNIS #PasDeBlackFriday #CadeauDrole #UnFilTousLesCorps`,
  },
];
