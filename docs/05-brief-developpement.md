# Brief de développement : boutique UNIS

## Objectif

Transformer le prototype (`prototype/index.html`, une seule page) en une vraie boutique en ligne, en 4 langues, avec une URL par langue, par saison et par produit, prête pour le SEO et pour les drops saisonniers.

## Choix technique recommandé

**Shopify** (Online Store 2.0) avec **Shopify Markets** pour les langues, les devises et la TVA de l'UE. Thème sur la base de **Dawn**, personnalisé avec le design du prototype. Si la fondatrice préfère ne pas utiliser Shopify, l'alternative est un site statique (Astro) avec un paiement Shopify Buy Button ou Stripe. **Demande avant de choisir.**

## Étapes

### 1. Thème
- Partir de Dawn (`shopify theme init`), créer un thème `unis`.
- Reprendre du prototype : palette, typographies (auto-hébergées en WOFF2), le fil ondulé du logo, la bande des 6 saisons, les cartes produits et le tiroir panier.
- **Thème saisonnier :** un réglage du thème (`settings_schema.json`) « Saison en cours » (valentin, printemps, pride, ete, halloween, noel) qui change les variables CSS `--bg`, `--ink`, `--accent`, `--soft` et la bannière d'accueil. Valeurs : tableau `S` du prototype.
- Sections à créer : `hero-bo` (Bo + titre + 2 boutons), `seasons-strip` (6 saisons, lien vers chaque collection), `duo-picker` (string adulte + mini-string assortis), `size-guide` (tableau des tailles), `promise` (3 colonnes), `waitlist` (inscription Klaviyo ou Shopify Email).

### 2. Langues et URL
- Langues publiées : FR (par défaut), NL, EN, DE, en sous-dossiers `/fr/`, `/nl/`, `/en/`, `/de/`.
- Fichiers `locales/fr.default.json`, `nl.json`, `en.json`, `de.json` : reprendre les textes du dictionnaire `T` + `T2` du prototype.
- Vérifier que chaque page déclare ses 4 versions en `hreflang` plus `x-default` vers `/en/` (Shopify le fait si Markets est bien configuré).

### 3. Catalogue
- Importer `data/products.csv` (Admin > Produits > Importer).
- Collections : `essentiels`, `bo`, et une par saison (`noel`, `saint-valentin`, `printemps`, `pride`, `ete`, `halloween`). Les collections de saisons passées **restent publiées** avec un bandeau « Épuisé » et un lien vers la liste d'attente.
- Métachamp produit `unis.saison` (texte) et `unis.motif` (texte) pour relier string adulte, mini-string et Duo d'un même motif.
- Le lot de 5 et le coffret Bo + Duo : application de bundles (Shopify Bundles) ou produits à part.

### 4. SEO (voir `docs/04-seo.md`)
- Titles et meta descriptions par page et par langue, aux longueurs indiquées.
- JSON-LD : Organization, WebSite, Product + Offer (avec image, sku, priceValidUntil pour les drops), ProductGroup pour les variantes, BreadcrumbList, MerchantReturnPolicy.
- Une page « Bo, l'ours UNIS » et une page « Guide des tailles » dans chaque langue.

### 5. Pages obligatoires
- Conditions générales de vente, politique de retour (exception d'hygiène), vie privée, mentions légales. Textes à faire valider par un juriste : prévois des pages avec `[À COMPLÉTER PAR LE JURISTE]` plutôt que d'inventer du texte juridique.

### 6. Performance
- Photos en WebP < 150 Ko, `loading="lazy"` sauf l'image du hero (`fetchpriority="high"`).
- 5 applications au maximum au lancement.
- Objectif : score Performance mobile ≥ 85 sur PageSpeed Insights pour l'accueil et la collection Noël.

### 7. Vérifications avant mise en ligne
- [ ] Les 4 langues s'affichent avec la bonne URL et le bon `lang`
- [ ] `hreflang` correct sur accueil, collection et produit
- [ ] JSON-LD validé avec le Rich Results Test
- [ ] Lighthouse : Accessibilité 100, SEO 100, Performance ≥ 85 (mobile)
- [ ] Panier : livraison 3,90 €, gratuite dès 30 €
- [ ] Fiche de Bo : mention « Objet de collection, 14 ans et plus » et CE
- [ ] Pages légales présentes et liées dans le pied de page

## Ce qu'il ne faut pas faire sans accord
- Créer le compte Shopify, acheter un domaine ou un thème, installer des applications payantes.
- Publier la boutique ou envoyer des emails.
