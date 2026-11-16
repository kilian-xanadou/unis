# UNIS : contexte du projet pour Claude Code

> **Lis d'abord [CONTEXTE-IA.md](CONTEXTE-IA.md)** : décisions de l'équipe (cible, personnalité, limites, objectifs). Il prime sur ce fichier en cas de conflit.

UNIS est une marque e-commerce européenne (Belgique, SRL à créer) qui vend :

- **Bo, l'ours UNIS** : un ours en peluche de collection de 35 cm, à 49 €. Il sert de mannequin à la marque et porte chaque nouveau string.
- **Des strings unisexes bon marché** : le string adulte à 5 € (coupe Plat ou Poche, du XS au 4XL), le mini-string pour Bo à 3 €, le Duo assorti (adulte + Bo, même motif) à 7 €, et le lot de 5 strings adultes à 20 €.
- **Six drops saisonniers par an**, en série limitée et jamais réédités : Saint-Valentin (3 février), Printemps (17 mars), Pride (1er juin), Été (15 juin), Halloween (1er octobre) et Noël (1er novembre). En plus : la **capsule Octobre Rose** (1er octobre, page `/fr/saisons/octobre-rose/`), avec 1 € reversé par article à Think Pink (`pinkCharity` et `pinkDonation` dans `src/config.mjs`). Partenariat en cours de discussion : le site le précise, ne jamais présenter un don comme déjà effectué.

**Site de démonstration en ligne depuis le 16 novembre 2026** (statique, sans paiement ni enregistrement, `noindex`). Le lancement commercial reste prévu en avril 2027.

Le nom **UNIS est définitif** (décision de l'équipe, 16 novembre 2026). Ne le dépose nulle part et n'achète aucun domaine sans demander. `unis.eu` est un exemple.

## Où trouver quoi

| Dossier ou fichier | Contenu |
| --- | --- |
| `docs/00-cours-et-livrables.md` | **Ce que chaque cours (E-gestion, e-Commerce, Communication Web, Marketing Digital) demande et où c'est dans le projet**, échéances d'examen |
| `docs/01-business-plan.md` | Modèle économique, prix, coûts, prévisions sur 3 ans, risques |
| `docs/02-marque.md` | Identité, ton, couleurs, typographies, règles pour Bo |
| `docs/03-campagnes-emailing.md` | Calendrier des 12 campagnes et règles d'emailing |
| `docs/04-seo.md` | Exigences SEO : URL, hreflang, titles, données structurées, KPI |
| `docs/05-brief-developpement.md` | **Ce qu'il faut construire**, étape par étape |
| `docs/06-sea.md` | Plan de publicité payante (Google Ads, Meta), calendrier et UTM |
| `docs/07-strategie-digitale.md` | Mission, vision, SWOT, STP, 4P, Business Model Canvas, domaine, plateforme, marketplaces |
| `docs/08-personas-customer-journey.md` | 3 personas (canevas du cours), 3 customer journeys, thèmes de contenu |
| `docs/09-fidelisation-crm.md` | Club de Bo (fidélité), NPS, base clients |
| `docs/10-emailing-newsletters.md` | 3 newsletters + 5 relances automatiques |
| `docs/11-communication-social-media.md` | Plan de communication, ligne éditoriale, modération, crise, Social Ads, influence |
| `docs/12-paiement-kpi-avis.md` | Stratégie de paiement (Mission 10), KPI, avis clients |
| `data/calendrier-editorial-2027.csv` | Calendrier éditorial sur 12 mois (généré par `node src/calendrier.mjs`) |
| `src/` | Générateur du site statique : `config.mjs` (réglages), `i18n.mjs`, `i18n-extra.mjs` et `i18n-account.mjs` (textes 4 langues), `data.mjs` (saisons, prix, URL), `build.mjs`, `static/` |
| `supabase/` | Base de données : `schema.sql` (tables, sécurité RLS) et guide de mise en place |
| `src/legal.mjs` | CGV, vie privée et mentions légales en 4 langues (société fictive : identifiants marqués « fictif ») |
| `site/` | Site généré par `node src/build.mjs` (ne pas modifier à la main) |
| `render.yaml` | Déploiement gratuit sur Render (site statique `unis-demo`) |
| `assets/images/` | Photos du site (WebP < 150 Ko, voir le README du dossier) |
| `prototype/index.html` | Prototype du site en une page (FR, NL, EN, DE, panier JS). C'est la référence de design et de contenu, pas le code de production |
| `assets/images/`, `src/photos.mjs` | Photos du site (WebP) et leur placement ; Alt en 4 langues |
| `assets/emailing/` | Visuels JPG 600 px pour les emails |
| `assets/bo.svg` | Illustration de Bo (provisoire, en attendant les photos) |
| `data/products.csv` | Produits au format d'import Shopify (drop Noël + Essentiels + Bo) |
| `.claude/skills/unis-lancer-collection/` | Skill pour préparer le kit de chaque nouveau drop |

Les versions vivantes (éditables) des documents sont sur claude.ai :
- [Business plan](https://claude.ai/artifact/1ZRaDTkBa2T3SzP7bm3XT2)
- [12 campagnes emailing](https://claude.ai/artifact/MJGzjZFdQw62oR5YXDJKpq)
- [Audit SEO](https://claude.ai/artifact/YTK1JpuuWAEAxng3t7m7v8)
- [Prototype du site](https://claude.ai/artifact/V5zTCRbJ5apvPARKdeH7mr)
- [Visuel Instagram de Bo](https://claude.ai/artifact/UPW8d3h4debd1xPeePKffQ)

En cas d'écart entre ces fichiers et les prix ci-dessus, **les prix de ce CLAUDE.md font foi** (mise à jour du 16 novembre 2026).

## Règles de marque à respecter dans tout le code et le contenu

- **Langues :** FR (par défaut), NL, EN et DE. En anglais, on dit « thong » et non « string ». Tutoiement dans les 4 langues (« du », « je »).
- **Ton :** direct, chaleureux, avec de l'humour mais jamais vulgaire.
- **Pas de genre :** on ne dit jamais « pour homme » ou « pour femme ». On parle de coupe (Plat ou Poche) et de taille (tour de hanches).
- **Bo n'est pas un jouet pour enfants.** C'est un objet de collection pour les 14 ans et plus. Aucun visuel ni texte ne vise les enfants. Les fiches de Bo n'affichent plus de mention d'âge ni de marquage CE (décision du 16/11/2026) ; la conformité reste à vérifier avant la vente réelle.
- **Charte graphique :** [design.md](design.md) (logo au string, palette, typographies, composants).
- **Couleurs :** Bordeaux `#3E031B`, Framboise `#D42A6E`, Rose dragée `#FFE3EE`, Rose bonbon `#FAB8D0`, Miel (Bo) `#C98B4B`. Pages générales en palette de marque (`BASE` dans `src/data.mjs`), pages de drop en palette de marque aussi (les saisons gardent leurs photos et motifs).
- **Typographies :** Bricolage Grotesque (titres, version étroite, `wdth` 75) et Atkinson Hyperlegible (textes). Les héberger sur le site (WOFF2) plutôt que de les charger depuis Google Fonts.
- **Accessibilité :** contraste du texte ≥ 4,5:1, focus clavier visible, cibles tactiles ≥ 44 px, `prefers-reduced-motion` respecté.

## Règles commerciales

- Livraison : 3,90 €, offerte dès 30 € d'achat. Retour sous 14 jours si le string n'a pas été porté et que l'étiquette d'hygiène est intacte.
- Prix TTC affichés, TVA du pays du client (Shopify Markets + OSS).
- Toute réduction affiche le prix le plus bas des 30 derniers jours (directive Omnibus).
- Composition textile sur chaque fiche : coton 95 %, élasthanne 5 %, OEKO-TEX Standard 100.
- N'invente jamais d'avis clients, de chiffres de vente ou de volumes de recherche.

## Conventions de travail

- Ne mets jamais la clé `service_role` de Supabase dans le code : seules l'URL du projet et la clé `anon` (publique) vont dans `src/config.mjs`.
- Demande avant toute action irréversible ou payante (achat de domaine, publication, envoi d'emails, compte Shopify).
- Compte les longueurs des titles et des meta descriptions avec un script (title < 60 caractères, meta 120–155).
- Vérifie les jours de la semaine des dates avec un script.
- Écris les textes en français d'abord, puis adapte-les en NL, EN et DE ; signale que les adaptations doivent être relues par une personne native.
