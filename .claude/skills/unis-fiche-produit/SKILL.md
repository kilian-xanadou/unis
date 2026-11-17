---
name: "unis-fiche-produit"
description: "Écrit ou met à jour la fiche d'un produit UNIS (string, mini-string, Duo, lot, Bo, coffret) en FR, NL, EN et DE : nom, description, points clés, composition, title et meta SEO, texte alternatif, ligne d'import Shopify. À utiliser dès qu'on demande une fiche produit, une description, un nouveau motif ou un nouveau produit UNIS."
---

# Fiche produit UNIS

Les produits sont définis dans `src/data.mjs` (saisons, motifs, prix, SKU) et leurs pages générées par `src/build.mjs` à partir de `src/i18n-pdp/{fr,nl,en,de}.mjs`. L'import Shopify est dans `data/products.csv`.

## 1. Les faits (à ne jamais changer sans demander)

- String adulte : 5 €, coupe Plat ou Poche, du XS au 4XL (tour de hanches). Mini-string pour Bo : 3 €. Duo assorti (adulte + Bo, même motif) : 7 €. Lot de 5 : 20 €. Bo : 49 €, 35 cm. Coffret Bo + Duo : 55 €.
- Composition sur chaque string : coton 95 %, élasthanne 5 %, OEKO-TEX Standard 100.
- Livraison 3,90 €, offerte dès 30 €. Retour 14 jours si non porté et étiquette d'hygiène intacte.
- SKU : `UNIS-<SAISON><AA>-<MOTIF>` (adulte), suffixes `-DUO` et `-MINI`, `UNIS-BO`, `UNIS-ESS`, `UNIS-ESS-LOT5`.
- Bo : objet de collection pour adultes, 18 ans et plus. Pas de mention d'âge ni de marquage CE sur la fiche (décision du 16/11/2026).

## 2. Écrire (FR d'abord)

- **Nom** : « String <Saison> <Motif> » (ex. « String Noël Pull moche »), court et imagé.
- **Accroche** : une phrase drôle qui donne envie, puis 2 phrases concrètes (coupe, matière, pour quoi l'offrir).
- **Points clés** : 3 à 5 puces (coupe et tailles, matière, fabriqué en Europe, motif en série limitée, le Duo assorti pour Bo).
- **Pas de genre** : jamais « pour homme » ou « pour femme ». On parle de coupe et de tour de hanches.
- **Pas d'invention** : aucun avis client, chiffre de vente ou stock inventé. Pas de « plus que 3 en stock » sans donnée réelle.

## 3. SEO

- **Title** : moins de 60 caractères, mot-clé en premier, « | UNIS » à la fin.
- **Meta description** : entre 120 et 155 caractères, avec le prix et une raison de cliquer.
- **URL** traduite dans chaque langue (voir les slugs existants dans `src/i18n-pdp/`).
- **Texte alternatif** de la photo : 8 à 15 mots, ce qu'on voit (« String rouge à motif de rennes, posé à plat sur fond blanc »).
- Compte les longueurs avec un script ; `node src/build.mjs` refuse les titles et metas hors limites.

## 4. Adapter en NL, EN, DE

Tutoiement dans les 4 langues (« je », « you », « du »). En anglais, « thong », jamais « string ». Adapte les jeux de mots au lieu de les traduire mot à mot. Signale que ces versions doivent être relues par une personne native.

## 5. Livrer et intégrer

Rends un tableau par langue (nom, accroche, puces, title, meta, URL, alt), puis la ligne pour `data/products.csv`. Si on te demande de l'intégrer au site : ajoute le motif dans `src/data.mjs`, les textes dans `src/i18n-pdp/`, la photo dans `src/photos.mjs` (`PLACEMENT.itemCard`), puis lance `node src/build.mjs` et vérifie que la page existe dans `site/`.
