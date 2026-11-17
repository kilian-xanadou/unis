// UNIS · Stories « à la une » (couvertures 1080×1920) et épingles Pinterest (1000×1500).
// Images générées dans insta/a-la-une/ et insta/pinterest/. Affichées dans insta/index.html (node insta/build.mjs).

export const A_LA_UNE = [
  { id: "bo", label: "Bo", contenu: "Qui est Bo, ses tenues de saison, le Reel « Bo répond » de la semaine, lien vers L'histoire de Bo." },
  { id: "drops", label: "Drops", contenu: "Le drop en cours, le prochain (date et compte à rebours), L'étagère des drops." },
  { id: "tailles", label: "Tailles", contenu: "Mesurer son tour de hanches (photo du guide), le tableau XS à 4XL, coupe Plat ou Poche, lien vers le guide des tailles." },
  { id: "livraison", label: "Livraison", contenu: "Pochette kraft dans la boîte aux lettres, 3,90 €, offerte dès 30 €, retour 14 jours si non porté avec l'étiquette d'hygiène intacte." },
  { id: "santa", label: "Secret Santa", contenu: "Les idées à 5 € et 7 €, le quiz de Bo, la date limite (jeudi 17 décembre), les réactions #TuAsÉtéUNIS repartagées avec accord." },
];

const U = (p, c) => `https://unis-demo.onrender.com${p}?utm_source=pinterest&utm_medium=social&utm_campaign=2026-12-pinterest-cadeaux&utm_content=${c}`;
export const PINS = [
  { id: "secret-santa", titre: "Cadeau Secret Santa drôle à 5 € : le string unisexe UNIS", desc: "Un cadeau de Secret Santa qui fait rire toute la salle et qu'on porte vraiment : un string unisexe à 5 €, du XS au 4XL, dans sa pochette kraft. Commande avant le jeudi 17 décembre pour Noël.", lien: U("/fr/idees-cadeaux/secret-santa/", "secret-santa"), alt: "Deux mains se passent une pochette kraft fermée d'un sticker rose, pendant une fête de bureau." },
  { id: "couple", titre: "Cadeau de couple original : le Duo assorti à 7 €", desc: "Un string pour ta moitié et le mini-string assorti pour Bo, l'ours UNIS, dans le même motif. Le cadeau qui fait rire puis rougir, pour un couple, des colocs ou ta meilleure amie.", lien: U("/fr/idees-cadeaux/couple/", "couple"), alt: "Le Duo Rennes disco à plat : un string adulte et le mini-string de Bo, même motif." },
  { id: "bande", titre: "Cadeau pour toute la bande : le lot de 5 strings à 20 €", desc: "5 strings unisexes au choix parmi 6 couleurs, du XS au 4XL, soit 4 € par personne. Pour un enterrement de vie de célibataire, une équipe ou une bande d'amis qui assume.", lien: U("/fr/produits/lot-de-5-strings/", "bande"), alt: "Six strings unis empilés à plat : noir, lilas, corail, sable, cacao et crème." },
  { id: "bo", titre: "Bo, l'ours de collection qui porte chaque nouveau motif", desc: "Bo est un ours en peluche de collection de 35 cm (49 €) pour adultes. Il enfile chaque string de saison avant tout le monde : on l'adopte une fois, on l'habille à chaque drop.", lien: U("/fr/histoire-de-bo/", "bo"), alt: "Bo sur le canapé avec un bonnet de Noël et le string Rennes, guirlande lumineuse derrière." },
  { id: "quiz", titre: "Quel cadeau drôle offrir ? Le quiz de Bo en 1 minute", desc: "Six questions, une minute, et Bo te dit quoi offrir : string à 5 €, Duo à 7 €, lot de 5 ou Bo lui-même. Gratuit, sans inscription.", lien: U("/fr/quiz/", "quiz"), alt: "Bo, crayon à la bouche, réfléchit au bon cadeau devant des paquets kraft et un post-it rose." },
];
