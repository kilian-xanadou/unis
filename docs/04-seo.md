# UNIS : exigences SEO

Audit complet : https://claude.ai/artifact/YTK1JpuuWAEAxng3t7m7v8 (rédigé avant le passage aux strings à 5 € et à Bo ; les règles restent valables).

## Problèmes à régler en priorité
1. **Nom :** « UNIS » se confond avec « uni » (couleur unie) dans les recherches. Trancher le nom (ex. « UNIS Bear ») avant de construire.
2. **Une URL par langue** (`/fr/`, `/nl/`, `/en/`, `/de/`) avec `hreflang` + `x-default` → `/en/`. Le prototype change la langue en JavaScript sur une seule URL : à ne pas reproduire.
3. **Une page permanente par saison**, mise à jour 6 à 8 semaines avant son pic, jamais supprimée ni redirigée.

## Arborescence (FR ; slugs traduits dans les autres langues, sans accents)
```
/fr/
├── /fr/bo/                         (page de Bo, l'ours UNIS)
├── /fr/essentiels/
├── /fr/saisons/
│   ├── /fr/saisons/noel/
│   ├── /fr/saisons/saint-valentin/
│   ├── /fr/saisons/printemps/
│   ├── /fr/saisons/pride/
│   ├── /fr/saisons/ete/
│   └── /fr/saisons/halloween/
├── /fr/coffrets-cadeaux/
├── /fr/guide-des-tailles/
├── /fr/journal/
└── /fr/aide/ (livraison, retours, FAQ, pages légales)
```
NL : `/nl/seizoenen/kerst/` · EN : `/en/seasons/christmas/` · DE : `/de/saisons/weihnachten/`.

## Titles et meta descriptions
- Title < 60 caractères, mot-clé d'abord, « | UNIS » à la fin. Meta 120–155 caractères. Compter avec un script.
- Accueil actuel : FR « String unisexe à 5 € et Bo l'ours | UNIS » (40), NL « Unisex string voor 5 € en Bo de beer | UNIS » (43), EN « €5 unisex thong and Bo the bear | UNIS » (38), DE « Unisex-String für 5 € und Bo der Bär | UNIS » (43).
- Un seul H1 par page, avec le mot-clé.

## Mots-clés de départ (volumes à mesurer dans Keyword Planner, ne pas inventer)
| Page | FR | NL | EN | DE |
| --- | --- | --- | --- | --- |
| Accueil | string unisexe | unisex string | unisex thong | Unisex String |
| Bo | ours en peluche cadeau drôle | grappig knuffelbeer cadeau | funny teddy bear gift | lustiger Teddybär Geschenk |
| Noël | string de noël | kerst string | christmas thong | Weihnachts String |
| Saint-Valentin | cadeau saint-valentin string | valentijnscadeau string | valentine's thong gift | Valentinstag String |
| Guide des tailles | taille string | maat string | thong size guide | String Größentabelle |

## Données structurées
Organization (logo, sameAs), WebSite, Product + Offer (image, sku, price, priceCurrency EUR, availability, priceValidUntil pour les drops), ProductGroup (tailles et coupes), BreadcrumbList, MerchantReturnPolicy (14 jours) et OfferShippingDetails (3,90 €, offerte dès 30 €). Avis (AggregateRating) seulement avec de vrais avis.

## Images
Fichiers nommés `string-unisexe-<saison>-<motif>-<coupe>.webp` et `bo-ours-unis-<saison>.webp`, < 150 Ko, Alt descriptif traduit (8–15 mots), Alt vide pour les images décoratives.

## KPI à 6 mois du lancement
140 pages indexées (35 par langue) · PageSpeed mobile ≥ 85 · 100 % des URL « bonnes » en Core Web Vitals · top 10 sur « string unisexe » (FR) · 15 domaines référents.
