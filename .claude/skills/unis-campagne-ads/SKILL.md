---
name: "unis-campagne-ads"
description: "Prépare une campagne publicitaire payante UNIS (Google Ads Search et Shopping, Meta Ads Instagram/Facebook) : objectif, ciblage, mots-clés, annonces aux bonnes longueurs, visuels, budget, calendrier, liens UTM et KPI. À utiliser dès qu'on parle de SEA, de publicité, de Google Ads, de Meta Ads, de sponsoriser un post ou de budget pub pour UNIS."
---

# Campagne publicitaire UNIS (SEA et Social Ads)

Le plan de référence est dans `docs/06-sea.md` (Google et Meta, calendrier, UTM) et `docs/11-communication-social-media.md` (Social Ads). Les KPI sont dans `docs/12-paiement-kpi-avis.md`.

## 1. Cadrer

- **Objectif** : ventes d'un drop, inscriptions au Club de Bo, trafic vers une idée cadeau. Un objectif par campagne.
- **Budget et dates** : budget journalier, date de début et de fin, alignés sur le drop ou la date limite (Noël : dernière commande le jeudi 17 décembre). Vérifie les jours de la semaine avec un script.
- **Pays** : Belgique, France, Pays-Bas, Allemagne, Luxembourg ; une campagne par langue.
- **Public** : adultes, **18 ans et plus**, jamais de ciblage par genre. Centres d'intérêt : cadeaux humoristiques, Secret Santa, EVJF/EVG, mode durable, LGBTQIA+ pour la Pride.

## 2. Google Ads

- **Search** : groupes d'annonces par intention (« cadeau secret santa drôle », « string unisexe », « cadeau EVJF »). Mots-clés en expression et exacts, liste de mots-clés négatifs (« gratuit », « enfant », « bébé », « sexy », « lingerie femme »…).
- **Annonce responsive** : 15 titres de **30 caractères maximum** et 4 descriptions de **90 caractères maximum**, comptés avec un script. Au moins un titre avec le prix (« String unisexe à 5 € »), un avec la livraison offerte dès 30 €.
- **Shopping / Performance Max** : flux produits depuis `data/products.csv`, image principale = photo à plat ou Bo (jamais un sous-vêtement porté : règles des régies).

## 3. Meta Ads

- Formats : carrousel (voir le skill `unis-carrousel-insta`), vidéo courte 9:16 de Bo, image 4:5.
- Texte principal de 125 caractères maximum avant « Voir plus », titre de 40 caractères maximum.
- Pas d'image « avant/après » ni de gros plan sur un corps : la politique Meta sur les sous-vêtements est stricte.

## 4. Suivi

- **UTM** sur chaque lien : `utm_source=google|meta&utm_medium=cpc|paid_social&utm_campaign=<aaaa-mm-nom>&utm_content=<annonce>`.
- **KPI** : CTR, coût par clic, taux de conversion, coût par achat, ROAS. Fixe une cible avant le lancement et une règle d'arrêt (ex. ROAS < 2 après 7 jours → on coupe).
- N'invente aucun chiffre : donne des hypothèses marquées comme telles.

## 5. Livrer

Un tableau de campagne (objectif, budget, dates, pays, ciblage), les mots-clés et négatifs, les annonces Google (titres et descriptions avec leur longueur), les annonces Meta, les liens UTM et les KPI cibles. **Ne lance, ne paie et ne publie rien** sans l'accord explicite de l'équipe.
