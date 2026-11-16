# UNIS : 12 campagnes emailing (résumé)

**Rendus HTML de tous les emails :** dossier [`emails/`](../emails/index.html), visible en ligne sur `/emails/` (page non indexée). Ils font foi : ce tableau en est le résumé.
Ancienne version longue (objets A/B, corps, relances) : https://claude.ai/artifact/MJGzjZFdQw62oR5YXDJKpq, à ne plus suivre là où elle contredit ce fichier.

Bo porte le motif du mois dans chaque email ; l'offre propose le string à 5 €, le mini-string à 3 € ou le Duo à 7 €. Jours de la semaine vérifiés par script.

> **Avant le lancement commercial (avril 2027)**, les envois de décembre 2026 à mars 2027 ne peuvent servir qu'en démonstration (cours, jury) ou à faire grandir la liste d'attente : aucune vente réelle n'est possible.

| # | Envoi | Campagne | Offre | Fichier |
| --- | --- | --- | --- | --- |
| 1 | Mer. 2 déc. 2026 | Calendrier de l'Avent de Bo : 4 cadeaux drôles à moins de 10 € (newsletter 1) | String 5 €, mini-string 3 €, Duo 7 €, lot de 5 (4 € par personne) | `01` |
| 2 | Mer. 16 déc. 2026 | Dernière livraison avant Noël (commande avant le jeudi 17 décembre) | Duo Secret Santa à 7 € | `02` |
| 3 | Mer. 6 janv. 2027 | Ta taille en 30 secondes + soldes (newsletter 2) | Soldes sur Noël, lot de 5 à 20 € | `03` |
| 4 | Mer. 3 févr. 2027 | Drop Saint-Valentin « À deux, c'est mieux » + pourquoi unisexe (newsletter 3) | Bo édition Cœur, Duo à 7 € | `04` |
| 5 | Mer. 10 févr. 2027 | Rappel Saint-Valentin | Duo à 7 € | `05` |
| 6 | Mar. 16 mars 2027 | Printemps : accès 24 h avant pour la liste d'attente (drop le 17 mars) | Accès anticipé | `06` |
| 7 | Jeu. 1er avril 2027 | Poisson d'avril : chasse au code caché sur le site | Code −15 % caché | `07` |
| 8 | Mer. 12 mai 2027 | La Pride arrive | Précommande ; don à une association LGBTQIA+ **en cours de discussion**, jamais annoncé comme acquis | `08` |
| 9 | Mar. 1er juin 2027 | Drop Pride (l'Été arrive le 15 juin) | Duo Pride à 7 € | `09` |
| 10 | Jeu. 1er juil. 2027 | Soldes d'été, pour toute la bande | −20 % sur l'Été (4 € le string), prix le plus bas des 30 jours affiché | `10` |
| 11 | Mer. 18 août 2027 | Vote « Choisis le motif Saint-Valentin » | Vote via le Club de Bo, règlement publié | `11` |
| 12 | Mer. 8 sept. 2027 | Rentrée : retour aux Essentiels | Lot de 5 à 17 € au lieu de 20 € (Omnibus affiché) | `12` |
| 13 | Ven. 1er oct. 2027 | Drop Halloween + capsule Octobre Rose | Modèle phosphorescent ; 1 € par article Octobre Rose à Think Pink, **partenariat en cours de discussion** | `13` |
| 14 | Mer. 27 oct. 2027 | Halloween : la tenue de la bande | Lot de 5 | `14` |
| 15 | Lun. 1er nov. 2027 | Drop Noël | Bo édition Noël | `15` |
| 16 | Ven. 26 nov. 2027 | Anti-Black Friday : « Pas de −70 %. Juste 5 €. » | Aucune réduction : le prix est déjà bas | `16` |

## Relances automatiques (détail dans docs/10)

| # | Déclencheur | Fichier |
| --- | --- | --- |
| 17 | Bienvenue, après le double opt-in (1 email, **sans réduction**) | `17` |
| 18 | Panier abandonné, 1 h | `18` |
| 19 | Panier abandonné, 24 h | `19` |
| 20 | Après achat, J+7 : avis (NPS) et guide des tailles | `20` |
| 21 | Réactivation, 6 mois sans achat | `21` |

## Corrections apportées le 16 novembre 2026

- **Newsletter 1 :** le coffret à 55 € ne rentre pas dans « moins de 10 € » ; remplacé par le string à 5 €.
- **Mars :** « accès 24 h avant » demande un envoi la veille du drop, donc le 16 mars.
- **Juin :** le drop Été sort le 15 juin, pas le 1er juin.
- **Avril :** « chasse aux œufs » renvoie à l'enfance ; remplacée par « chasse au code ».
- **Dons :** plus aucun « 10 % reversés » ni « 1 € reversé » présenté comme acquis.
- **Novembre :** « mini-string offert » retiré (Bo est déjà vendu avec un mini-string) ; « carte cadeau » retirée en décembre (elle n'existe pas dans l'offre).
- **Événements de tiers** (Black Friday, IDAHOBIT, journée de la visibilité trans) : on peut s'y référer en texte, jamais utiliser un logo ou un visuel officiel.
- **Relances :** on suit la version courte de docs/10 (bienvenue sans −10 %, avis à J+7).

## Règles
- Liste unique segmentée par langue (FR, NL, EN, DE) et comportement ; segment « propriétaires de Bo ».
- RGPD : double opt-in, désinscription visible, règlement publié pour les tirages au sort et les votes.
- Objet < 45 caractères, test A/B sur 20 %, gagnant envoyé 4 h après.
- Omnibus : prix le plus bas des 30 derniers jours à côté de toute réduction.
- Outil conseillé : Klaviyo ou Brevo, relié à Shopify.
