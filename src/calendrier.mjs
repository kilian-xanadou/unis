// Génère data/calendrier-editorial-2027.csv (séparateur ;, UTF-8 avec BOM pour Excel).
// Usage : node src/calendrier.mjs  — les jours de la semaine sont calculés, pas écrits à la main.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// [date, réseau, format, pilier, message, objectif, KPI, source]
const R = [
  ["2026-12-01", "Instagram + TikTok", "Reel 9:16", "Animation", "Calendrier de l'Avent : Bo ouvre une case par jour", "Engagement", "Taux d'engagement", "Swello 01/12 + emailing déc."],
  ["2026-12-02", "Email", "Newsletter 1", "Promotion", "4 cadeaux drôles à moins de 10 € (article du journal)", "Ventes Noël", "Clics, ventes", "docs/10"],
  ["2026-12-06", "Instagram", "Story", "Animation", "Saint-Nicolas : Bo dans la chaussure", "Engagement", "Réponses story", "Swello 06/12"],
  ["2026-12-17", "Instagram + Facebook", "Post + Story", "Information", "Dernier jour pour une livraison avant Noël", "Ventes", "Commandes du jour", "docs/10 (date limite)"],
  ["2026-12-19", "TikTok", "Reel", "Animation", "Journée du pull de Noël : Bo en Pull moche", "Notoriété", "Vues, partages", "Swello 19/12"],
  ["2026-12-30", "Instagram", "Carrousel", "Communauté", "Bilan de l'année : vos plus belles photos #BoPorte", "Engagement", "Sauvegardes", "Conseil Swello décembre"],
  ["2027-01-06", "Email", "Newsletter 2", "Information", "Bien choisir sa taille (article du journal)", "Réduire les retours", "Clics vers le guide des tailles", "docs/10"],
  ["2027-01-13", "Instagram", "Reel", "Promotion", "Soldes : le lot de 5 Essentiels à 20 €", "Ventes", "Ventes du lot", "Emailing janv. (soldes)"],
  ["2027-01-20", "Instagram + TikTok", "Teaser", "Promotion", "Teaser du drop Saint-Valentin, inscription à la liste d'attente", "Inscriptions", "Leads", "Rétroplanning du drop"],
  ["2027-01-21", "Instagram", "Story", "Animation", "Journée des câlins : le câlin de Bo", "Engagement", "Réponses", "Swello 21/01"],
  ["2027-01-27", "Instagram", "Story", "Communauté", "Journée des community managers : coulisses", "Ethos", "Réponses", "Swello 27/01"],
  ["2027-02-02", "Email", "Accès liste d'attente", "Promotion", "Drop Saint-Valentin 24 h avant tout le monde", "Ventes", "Ventes J-1", "Emailing févr."],
  ["2027-02-03", "Tous + Email", "Lancement + Newsletter 3", "Promotion", "Drop Saint-Valentin + Bo édition Cœur (article unisexe)", "Ventes", "Ventes J+1", "Calendrier des drops"],
  ["2027-02-10", "Email + Instagram", "Relance", "Promotion", "Dernières commandes pour le 14 février", "Ventes", "Ventes", "Emailing févr."],
  ["2027-02-14", "Instagram + TikTok", "Reel", "Animation", "Saint-Valentin : Bo et son Duo", "Engagement", "Partages", "Swello 14/02"],
  ["2027-02-21", "Instagram", "Carrousel", "Information", "Journée mondiale pour sauver les ours : Bo pense à ses cousins", "Ethos", "Sauvegardes", "Swello 21/02"],
  ["2027-03-01", "Instagram", "Post", "Communauté", "Journée Zéro discrimination : notre manifeste", "Ethos", "Partages", "Swello 01/03"],
  ["2027-03-10", "Instagram + TikTok", "Teaser", "Promotion", "Teaser du drop Printemps", "Inscriptions", "Leads", "Rétroplanning du drop"],
  ["2027-03-17", "Tous + Email", "Lancement", "Promotion", "Drop Printemps : Fleurs pastel, Menthe, Pêche", "Ventes", "Ventes J+1", "Calendrier des drops"],
  ["2027-03-20", "Instagram", "Story", "Animation", "Journée du bonheur : sondage « ton motif préféré »", "Engagement", "Votes", "Swello 20/03"],
  ["2027-03-31", "Instagram", "Carrousel", "Communauté", "Journée de la visibilité trans : témoignages (avec accord écrit)", "Ethos", "Partages", "Emailing mars"],
  ["2027-04-01", "Instagram + Email", "Post", "Animation", "Poisson d'avril : chasse au code caché sur le site", "Trafic", "Visites", "Swello 01/04 + emailing avril"],
  ["2027-04-15", "TikTok", "Reel", "Information", "Plat ou Poche en 10 secondes", "Éducation", "Taux d'achèvement", "Ligne éditoriale"],
  ["2027-05-02", "Instagram + TikTok", "Reel", "Animation", "Journée mondiale sans pantalon : Bo assume", "Notoriété", "Vues", "Swello 02/05"],
  ["2027-05-04", "Instagram", "Story", "Animation", "Journée du rire : best-of des commentaires", "Engagement", "Réponses", "Swello 04/05"],
  ["2027-05-12", "Tous + Email", "Précommande", "Promotion", "Précommande Pride, 10 % reversés à une association", "Ventes", "Précommandes", "Emailing mai"],
  ["2027-05-17", "Instagram", "Post", "Communauté", "Journée contre l'homophobie (IDAHOBIT)", "Ethos", "Partages", "Swello 17/05"],
  ["2027-06-01", "Tous + Email", "Lancement", "Promotion", "Drop Pride : Arc-en-ciel, Drapeau trans, Fier·e en noir", "Ventes", "Ventes J+1", "Calendrier des drops"],
  ["2027-06-15", "Tous", "Lancement", "Promotion", "Drop Été : Vagues, Orange sanguine, Citron", "Ventes", "Ventes J+1", "Calendrier des drops"],
  ["2027-06-21", "TikTok", "Reel", "Animation", "Fête de la musique : Bo en festival", "Notoriété", "Vues", "Swello 21/06"],
  ["2027-06-30", "Instagram", "Carrousel", "Information", "Journée des réseaux sociaux : où retrouver Bo", "Abonnés", "Nouveaux abonnés", "Swello 30/06"],
  ["2027-07-01", "Email + Instagram", "Post", "Promotion", "Soldes d'été : −20 % sur l'Été (prix le plus bas des 30 jours affiché)", "Ventes", "Ventes", "Emailing juil."],
  ["2027-07-17", "Instagram", "Story", "Animation", "Journée des emojis : devine le motif en emojis", "Engagement", "Réponses", "Swello 17/07"],
  ["2027-07-21", "Instagram", "Post", "Communauté", "Fête nationale : Bo en tricolore", "Notoriété", "Partages", "Swello 21/07"],
  ["2027-07-30", "Instagram", "Reel", "Animation", "Journée de l'amitié : le Duo entre potes", "Ventes Duo", "Clics", "Swello 30/07"],
  ["2027-08-01", "TikTok", "Reel", "Animation", "Journée de la frite belge : Bo et son cornet", "Notoriété", "Vues", "Swello 01/08"],
  ["2027-08-18", "Email + Instagram", "Sondage", "Communauté", "Vote du motif Saint-Valentin 2028", "Engagement", "Votes", "Emailing août"],
  ["2027-08-25", "Tous", "Batching", "Organisation", "Préparation des posts de septembre par lots", "Organisation", "—", "Conseil Swello août"],
  ["2027-09-04", "Instagram", "Carrousel", "Information", "Journée de la santé sexuelle : choisir et entretenir ses sous-vêtements", "Éducation", "Sauvegardes", "Swello 04/09"],
  ["2027-09-08", "Email", "Newsletter", "Promotion", "Rentrée : retour aux Essentiels, lot de 5", "Ventes", "Ventes", "Emailing sept."],
  ["2027-09-09", "Tous", "Reel + concours", "Animation", "Journée mondiale de la peluche : anniversaire de Bo", "Notoriété", "Participations", "Swello 09/09"],
  ["2027-09-24", "Instagram + TikTok", "Teaser", "Promotion", "Teaser du drop Halloween phosphorescent", "Inscriptions", "Leads", "Rétroplanning du drop"],
  ["2027-10-01", "Tous + Email", "Lancement", "Promotion", "Drop Halloween : Fantômes, Phosphorescent, Citrouille", "Ventes", "Ventes J+1", "Calendrier des drops"],
  ["2027-10-01", "Instagram + TikTok + Email", "Reel + carrousel", "Communauté", "Capsule Octobre Rose : Bo porte le ruban rose, 1 € reversé par article", "Ethos + ventes", "Ventes capsule, montant reversé", "Capsule Octobre Rose"],
  ["2027-10-15", "Instagram", "Story", "Information", "Octobre Rose : rappel du dépistage, pour tous les corps (avec l'association)", "Éducation", "Partages", "Capsule Octobre Rose"],
  ["2027-11-03", "Instagram + Email", "Post", "Communauté", "Octobre Rose : montant total reversé et reçu du don", "Ethos", "Engagement", "Capsule Octobre Rose"],
  ["2027-10-03", "Instagram", "Story", "Animation", "Journée du sourire : Bo te sourit", "Engagement", "Réponses", "Swello 03/10"],
  ["2027-10-07", "Instagram", "Carrousel", "Information", "Journée du coton : d'où vient ton string (OEKO-TEX)", "Éducation", "Sauvegardes", "Swello 07/10"],
  ["2027-10-31", "TikTok", "Reel", "Animation", "Halloween : Bo déguisé dans le noir", "Notoriété", "Vues", "Swello 31/10"],
  ["2027-11-01", "Tous + Email", "Lancement", "Promotion", "Drop Noël + Bo édition Noël", "Ventes", "Ventes J+1", "Calendrier des drops"],
  ["2027-11-11", "Instagram", "Post", "Animation", "Journée des célibataires : le string à s'offrir à soi-même", "Ventes", "Clics", "Swello 11/11"],
  ["2027-11-16", "Instagram", "Post", "Communauté", "Journée de la tolérance + 1 an du site", "Ethos", "Partages", "Swello 16/11"],
  ["2027-11-20", "Instagram", "Stories coulisses", "Communauté", "Coulisses de la préparation des colis de Noël", "Ethos", "Vues", "Conseil Swello novembre"],
  ["2027-11-26", "Email + Instagram", "Post", "Promotion", "Black Friday raisonné : mini-string offert, 1 € reversé", "Ventes", "Ventes", "Emailing nov."],
];

const DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const q = (s) => (/[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s);
const head = ["Date", "Jour", "Réseau", "Format", "Pilier", "Message", "Objectif", "KPI", "Source"];
const rows = R.map(([d, ...r]) => [d, DAYS[new Date(d + "T12:00:00Z").getUTCDay()], ...r].map(q).join(";"));
const out = join(dirname(fileURLToPath(import.meta.url)), "..", "data", "calendrier-editorial-2027.csv");
writeFileSync(out, "﻿" + [head.join(";"), ...rows].join("\r\n") + "\r\n");
console.log(`${R.length} lignes écrites dans data/calendrier-editorial-2027.csv`);
