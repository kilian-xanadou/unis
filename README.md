# UNIS : site de démonstration

Site statique en 4 langues (FR, NL, EN, DE) pour UNIS : strings unisexes à 5 € et Bo, l'ours en peluche qui les porte.
**Version démo, en ligne depuis le 16 novembre 2026 :** le panier fonctionne dans le navigateur, mais aucune commande n'est possible et la liste d'attente n'enregistre rien.

## Mettre en ligne sur Render (gratuit)

1. Crée un compte sur [render.com](https://render.com) et relie ton compte GitHub.
2. **New > Blueprint**, choisis le dépôt `unis`. Render lit `render.yaml` et crée le site statique `unis-demo`.
3. Clique sur **Apply**. Le site sera en ligne sur `https://unis-demo.onrender.com` en une ou deux minutes.
4. Si Render te donne une autre adresse, mets-la dans `src/config.mjs` (`siteUrl`), relance le build et pousse.

Chaque `git push` sur `main` redéploie le site automatiquement.

## Modifier le site

```bash
node src/build.mjs     # régénère site/ et vérifie titles, meta et contrastes
node src/serve.mjs     # aperçu sur http://localhost:4321
```

| Fichier | Ce qu'on y change |
| --- | --- |
| `src/config.mjs` | Adresse du site, saison en cours, indexation Google (désactivée pour la démo) |
| `src/i18n.mjs` | Tous les textes, dans les 4 langues |
| `src/data.mjs` | Saisons, motifs, couleurs, prix, URL traduites |
| `src/static/` | Styles (`style.css`) et panier (`app.js`) |
| `assets/images/` | Tes photos (voir le README du dossier) |

## Arborescence du site

`/fr/` accueil · `/fr/bo/` · `/fr/essentiels/` · `/fr/saisons/` + une page par saison (`noel`, `saint-valentin`, `printemps`, `pride`, `ete`, `halloween`) · `/fr/guide-des-tailles/` · `/fr/aide/` · `/fr/a-propos/` · `/fr/contact/` · `/fr/club/` · `/fr/journal/` (3 articles) · pages légales et cookies. Même chose en `/nl/`, `/en/`, `/de/` avec des slugs traduits.

SEO en place : une URL par langue, `hreflang` + `x-default` (EN), canonical, titles < 60 et meta 120–155 caractères (vérifiés au build), JSON-LD (Organization, WebSite, Product + Offer avec livraison et retours, BreadcrumbList, FAQPage), `sitemap.xml` avec alternates, `robots.txt`, 404 personnalisée.

## Avant le vrai lancement

- [ ] Passer `indexable: true` dans `src/config.mjs` et mettre le vrai domaine
- [ ] Remplacer les illustrations par les photos (WebP < 150 Ko)
- [ ] Héberger les polices sur le site (WOFF2) au lieu de Google Fonts
- [ ] Brancher le paiement (Shopify Buy Button ou Stripe) et la liste d'attente (Brevo, Klaviyo…)
- [ ] Faire relire les textes NL, EN et DE par des personnes natives
- [ ] Faire rédiger les pages légales par un juriste (`[À COMPLÉTER PAR LE JURISTE]`)
- [ ] Bandeau cookies et mesure (voir `docs/06-sea.md`)

## Documents du projet

`CLAUDE.md` (contexte et règles) · **`docs/00-cours-et-livrables.md` (ce que chaque cours demande et où c'est)** · `docs/` (business plan, marque, emailing, SEO, brief, SEA, stratégie digitale, personas, fidélité, newsletters, communication, paiement et KPI) · `data/calendrier-editorial-2027.csv` · `data/products.csv` (import Shopify) · `prototype/index.html` (prototype d'origine).
