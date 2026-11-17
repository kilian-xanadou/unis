---
name: "unis-article-seo"
description: "Écrit un article de blog (Journal) ou un guide cadeau UNIS optimisé pour Google : choix du sujet et de l'intention de recherche, plan, texte, FAQ, liens internes, title, meta description et données structurées, en FR puis NL, EN, DE. À utiliser dès qu'on demande un article, un guide, un contenu SEO, une page « idées cadeaux » ou du référencement naturel pour UNIS."
---

# Article SEO UNIS

Les exigences SEO sont dans `docs/04-seo.md`, l'audit dans `docs/16-audit-seo.md`. Les articles existants sont dans `src/i18n-extra.mjs` (`articles` : taille, cadeau, unisexe) et les guides cadeaux dans `src/i18n-pdp/` (`gifts.pages`).

## 1. Choisir le sujet

- Pars d'une **question réelle** d'acheteur : « cadeau Secret Santa drôle pas cher », « comment choisir sa taille de string », « cadeau EVJF original ».
- Une intention par page : informer (guide), comparer (idées cadeaux) ou acheter (page produit). Vérifie qu'aucune page existante ne vise déjà la même requête.
- N'invente jamais de volume de recherche. Si on en a besoin, dis qu'il faut le mesurer (Google Search Console, Keyword Planner).

## 2. Écrire

- **H1** clair avec la requête principale. **Chapô** de 2 phrases qui répond tout de suite.
- **4 à 6 intertitres (H2)** qui sont des questions ou des promesses, paragraphes courts, une liste quand c'est utile.
- **Liens internes** : 3 à 5, avec un texte d'ancre parlant, vers les pages utiles (drop en cours, guide des tailles, quiz `/fr/quiz/`, histoire de Bo, produits).
- **FAQ** : 3 à 5 vraies questions avec des réponses courtes (elles alimentent le balisage `FAQPage`).
- **Un appel à l'action** à la fin (produit, quiz ou idée cadeau).
- Ton UNIS : tutoiement, humour sans vulgarité, aucune référence au genre ni à l'enfance. Aucun avis ni chiffre inventé.

## 3. Balisage

- **Title** : moins de 60 caractères. **Meta description** : 120 à 155 caractères. Compte avec un script.
- **URL** courte, en minuscules, traduite dans chaque langue.
- Données structurées : `BlogPosting` (titre, date, image, auteur UNIS) et `FAQPage` ; `BreadcrumbList` est ajouté par le générateur.
- Photo d'en-tête avec texte alternatif (voir `PLACEMENT.article` dans `src/photos.mjs`).

## 4. Intégrer

Ajoute l'article dans `src/i18n-extra.mjs` (4 langues, même structure que les autres), lance `node src/build.mjs` (il bloque si title ou meta sont hors limites), vérifie la page dans `site/` et ajoute un lien vers elle depuis au moins une page existante pour qu'elle ne soit pas orpheline.

Livre : la requête visée, le plan, le texte complet, la FAQ, title, meta, URL dans les 4 langues. NL, EN (« thong »), DE à faire relire par une personne native.
