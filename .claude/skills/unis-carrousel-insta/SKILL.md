---
name: "unis-carrousel-insta"
description: "Crée un carrousel Instagram UNIS (3 à 7 vignettes 4:5) : accroche, texte de chaque vignette, visuel à utiliser ou prompt, texte alternatif, légende, hashtags, heure de publication et story associée. À utiliser dès qu'on demande un post, un carrousel, une publication ou une story Instagram pour UNIS ou Bo."
---

# Carrousel Instagram UNIS

UNIS vend des strings unisexes à 5 € et Bo, un ours de collection à 49 € qui porte chaque motif. Sur Instagram, le carrousel est le format qui garde le plus longtemps l'attention : chaque vignette doit donner envie de glisser jusqu'à la suivante, et la dernière doit amener vers le site.

## 1. Cadrer

Repère dans la demande, ou propose :

- **L'objectif** : faire connaître un drop, pousser une idée cadeau, rappeler une date limite, raconter Bo, ou faire réagir (sondage, quiz).
- **La page d'arrivée** sur le site (ex. `/fr/saisons/noel/`, `/fr/idees-cadeaux/secret-santa/`, `/fr/quiz/`). Ajoute les UTM : `?utm_source=instagram&utm_medium=social&utm_campaign=<aaaa-mm-sujet>`.
- **La période** : regarde `docs/17-plan-social-noel.md` et `docs/03-campagnes-emailing.md` pour rester aligné avec les emails du moment.

## 2. Écrire les vignettes

- **Vignette 1, l'accroche** : 6 mots maximum en gros titre, une promesse ou une question. Elle doit marcher seule dans le fil (« 4 cadeaux drôles à moins de 10 € »). Ajoute une note manuscrite de Bo (police Caveat), courte et drôle, jamais une info clé.
- **Vignettes du milieu** : une idée par vignette, un titre court, une ligne d'explication, le prix s'il y en a un (prix exacts : string 5 €, mini-string 3 €, Duo 7 €, lot de 5 à 20 €, Bo 49 €, coffret 55 €).
- **Dernière vignette** : l'appel à l'action (« Lien en bio », « Fais le quiz »), la date limite si elle existe (commande avant le jeudi 17 décembre pour Noël).
- Vérifie chaque date et son jour de la semaine avec un script.

## 3. Choisir les visuels

- Prends d'abord les photos existantes : `assets/images/` (WebP) et `assets/emailing/` (JPG). La liste et les textes alternatifs sont dans `src/photos.mjs`.
- S'il manque une image, écris un prompt avec le skill `unis-prompt-visuel`.
- Format 4:5 (1080 × 1350). Le texte tient dans la zone centrale (marge de 100 px) pour ne pas être coupé dans la grille du profil.
- Palette de marque : bordeaux `#3E031B`, framboise `#D42A6E`, rose dragée `#FFE3EE`, rose bonbon `#FAB8D0`. Titres en Bricolage Grotesque étroite, textes en Atkinson Hyperlegible. Contraste du texte d'au moins 4,5:1.

## 4. Légende et accessibilité

- **Légende** : 1re ligne = l'accroche (visible avant « plus »), puis 2 à 4 lignes, l'appel à l'action et 5 à 8 hashtags pertinents (#cadeaudrole #secretsanta #stringunisexe #UNISxBo…). Pas de hashtag inventé pour faire du volume.
- **Texte alternatif** pour chaque vignette : ce qu'on voit, en une phrase.
- Tutoiement, humour sans vulgarité, jamais « pour homme » ou « pour femme ».

## 5. Livrer

Rends un tableau par vignette (n°, visuel ou prompt, titre, sous-titre, prix, texte alternatif), puis la légende, les hashtags, l'heure de publication conseillée et une story 9:16 qui reprend le carrousel avec un sticker (sondage, quiz ou lien).

Pour l'ajouter à l'aperçu du site, ajoute une entrée dans `insta/publications.mjs` (même structure que les autres), puis lance `node insta/build.mjs` et `node insta/check.mjs`.

Écris en français d'abord. Si on demande NL, EN (« thong », jamais « string ») ou DE, signale que la traduction doit être relue par une personne native.

## Interdits

Aucun enfant ni décor d'enfant ; Bo est un objet pour adultes (18 ans et plus). Pas de faux avis, de faux chiffres de vente ou de fausse rareté. Pas de photo de sous-vêtement porté en image principale (les régies la refusent).
