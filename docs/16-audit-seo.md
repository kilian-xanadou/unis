# UNIS : audit SEO du site de démonstration

> Audit du 16 novembre 2026, sur https://unis-demo.onrender.com/fr/ et sur le code (`src/`, `site/`, `render.yaml`).
> Il complète [04-seo.md](04-seo.md) (exigences) et s'appuie sur [15-value-proposition-canvas.md](15-value-proposition-canvas.md) (segments S1 à S5).
> Aucun volume de recherche, trafic ou backlink n'est inventé : quand une donnée manque, c'est écrit « à mesurer ».

---

## 1. Résumé

**La base technique est saine. Ce qui manque, c'est de quoi se classer : des pages produits, des pages cadeaux par occasion et du contenu plus épais.**

Ce qui marche déjà :

- 100 URL propres, une par langue (`/fr/`, `/nl/`, `/en/`, `/de/`), slugs traduits sans accents.
- `hreflang` réciproque partout (HTML et sitemap), `x-default` vers `/en/`, canonical sur chaque page.
- 100 % des titles sous 60 caractères, toutes les meta remplies sont entre 120 et 155 caractères, aucun doublon de title.
- Un seul H1 par page, avec le mot-clé sur les pages commerciales.
- Toutes les images ont un Alt traduit et un nom de fichier descriptif (`string-unisexe-noel-rennes-plat-1200.webp`).
- Site léger : la page d'accueil pèse environ 10 Ko de HTML compressé, 6 Ko de CSS compressé, 6 Ko de JS compressé.

Le site est en `noindex` **volontairement** (`indexable: false`, [src/config.mjs](../src/config.mjs) ligne 11). C'est le bon réglage pour une démo étudiante. **Ce n'est pas une erreur** : c'est l'interrupteur à basculer le jour du vrai lancement (voir action n° 1).

### Les 5 constats les plus importants

| # | Constat | Gravité |
| --- | --- | --- |
| 1 | **Aucune page produit.** Les produits ne sont que des cartes sur les pages de saison. Le même produit (ex. `UNIS-BO-NOEL27`) est déclaré sur 2 URL différentes. Google Shopping et les résultats enrichis produits n'ont pas de page cible. | Critique (au lancement) |
| 2 | **Les intentions cadeau (S1, S2, S3) n'ont pas de page dédiée.** Pas de page « idées cadeaux », pas de page Secret Santa, EVJF ou couple. La page `/fr/coffrets-cadeaux/` prévue dans 04-seo.md n'existe pas. | Important |
| 3 | **Le nom « UNIS » n'est pas désambiguïsé.** Pas d'`alternateName`, pas de `sameAs`, logo = favicon SVG. Rien n'aide Google à distinguer UNIS de « uni ». | Important |
| 4 | **Contenu du journal mince et daté dans le futur.** 3 articles de 250 à 300 mots, dont les dates de publication (2 décembre 2026, 6 janvier 2027, 3 février 2027) sont toutes postérieures à aujourd'hui. Deux articles promettent un échange gratuit qui n'est pas décidé. | Important |
| 5 | **Polices chargées depuis Google Fonts.** Ressource bloquante en tiers sur chaque page, contraire à la règle du projet (CLAUDE.md) et transfert d'IP à Google signalé sur la page Cookies. | Important |

---

## 2. Contexte et méthode

**Ce que vend UNIS :** des strings unisexes à 5 €, un mini-string pour Bo à 3 €, le Duo à 7 €, le lot de 5 à 20 €, Bo l'ours de collection à 49 € et le coffret à 55 €. Cible : adultes 18+ qui cherchent un cadeau drôle. Marché : Europe, depuis la Belgique.

**Pages analysées :**

- En ligne : `/`, `/fr/`, `/fr/bo/`, `/fr/saisons/noel/`, `/en/`, `/robots.txt`, `/sitemap.xml`, une URL inexistante (`/nope/`), des variantes sans barre finale (`/fr`, `/fr/bo`) et en `http://`.
- Dans le code : les 102 fichiers HTML de `site/`, scannés par script (title, meta, H1, images, Alt, JSON-LD, robots, canonical, nombre de mots).
- Le site en ligne est identique au dossier `site/` local (seules les empreintes `?v=` des CSS/JS diffèrent).

**Outils utilisés :** `curl` (statuts HTTP, en-têtes, poids), un script Node de lecture des pages générées, lecture de `src/build.mjs`, `src/data.mjs`, `src/i18n*.mjs`, `src/photos.mjs`, `render.yaml`.

**Pas fait ici (consigne : rien envoyé à un service externe) :**

- **PageSpeed Insights / Lighthouse** : non lancés. À faire toi-même : `https://pagespeed.web.dev/analysis?url=https%3A%2F%2Funis-demo.onrender.com%2Ffr%2F&form_factor=mobile`, puis la même chose sur `/fr/saisons/noel/` (page la plus lourde, avec la vidéo).
- **Recherche Google du nom « UNIS »** : non faite. À faire en navigation privée, depuis la Belgique : « unis », « unis string », « unis bo ours ».
- **Volumes de recherche et backlinks** : à mesurer (Search Console / Keyword Planner / Ahrefs). Le site est en `noindex`, donc Search Console n'aura aucune donnée avant le lancement.

---

## 3. Audit technique

**Conclusion : l'indexation est bien préparée. Trois réglages restent à faire avant de passer en indexable.**

### 3.1 Constats

| Gravité | Constat | Où |
| --- | --- | --- |
| Info (voulu) | Toutes les pages portent `<meta name="robots" content="noindex, follow">`. Démo : c'est correct. À basculer au lancement. | [src/config.mjs](../src/config.mjs) l. 11 ; [src/build.mjs](../src/build.mjs) l. 234 et l. 592 |
| Important | Le jour où `indexable` passe à `true`, **toutes** les pages deviennent indexables, y compris `/fr/compte/` (espace client), `/fr/cookies/` et les pages légales. Il n'existe pas de `noindex` par page. | [src/build.mjs](../src/build.mjs) l. 234 |
| Important | Le sitemap liste les 100 pages, dont 20 sans valeur de recherche (compte, cookies, CGV, vie privée, mentions légales × 4 langues). | [src/build.mjs](../src/build.mjs) l. 605–609 |
| Mineur | `lastmod` est la même date pour toutes les URL (`launchDate`, 2026-11-16). Google ignore un `lastmod` qui ne bouge jamais. | [src/build.mjs](../src/build.mjs) l. 604 |
| Important | La racine `/` redirige en JavaScript selon la langue du navigateur (statut 200, pas 301/302). Elle déclare un canonical vers `/fr/` alors que le `x-default` pointe vers `/en/`. Googlebot (navigateur en anglais) sera envoyé sur `/en/`. Signaux contradictoires. | [src/build.mjs](../src/build.mjs) l. 588–599 |
| Mineur | Les URL sans barre finale répondent en 200 au lieu d'une 301 : `/fr` et `/fr/bo` servent la même page que `/fr/` et `/fr/bo/`. Idem pour `/fr/bo/index.html`. Le canonical limite les dégâts. | En ligne ; `render.yaml` |
| OK | `http://` → 301 vers `https://`. HSTS actif (`max-age=315360000; preload`). | En ligne |
| OK | Une URL inexistante renvoie un vrai 404, avec une page utile (liens vers les 4 langues) et `noindex`. | En ligne ; [src/build.mjs](../src/build.mjs) l. 571–575 |
| OK | `robots.txt` autorise tout et déclare le sitemap. Aucun bot bloqué. | `site/robots.txt` |
| OK | Les majuscules (`/FR/BO/`) renvoient 404 : pas de doublon de casse. | En ligne |

### 3.2 Le sitemap par type de page

| Type | Par langue | Total | À garder au lancement ? |
| --- | --- | --- | --- |
| Accueil | 1 | 4 | Oui |
| Bo, Essentiels, index des saisons | 3 | 12 | Oui |
| Pages de saison (6 drops + Octobre Rose) | 7 | 28 | Oui |
| Guide des tailles, aide, à propos, contact, club | 5 | 20 | Oui |
| Journal + 3 articles | 4 | 16 | Oui |
| Compte, cookies, CGV, vie privée, mentions légales | 5 | 20 | **Non** : sortir du sitemap et passer en `noindex` |
| **Total** | 25 | **100** | 80 utiles |

### 3.3 Recommandations

1. Ajouter un drapeau `noindex` par page dans `layout()` (ex. `robots: "noindex"` pour `account`, `cookies`, `terms`, `privacy`, `legal`) et filtrer ces clés dans le sitemap.
2. Remplacer la redirection JavaScript de la racine par une **redirection serveur** vers `/fr/` (règle `routes` de type `redirect` dans `render.yaml`), ou faire de `/` la page `x-default` (sélecteur de langue indexable). Choisir une seule logique.
3. Ajouter une redirection 301 des URL sans barre finale vers la version avec barre (règles `redirect` Render), ou au moins vérifier qu'aucun lien interne ne pointe vers la version sans barre (c'est le cas aujourd'hui : tous les liens internes finissent par `/`).
4. Mettre un `lastmod` réel par page (date de dernière modification du texte ou du drop).

---

## 4. Performance et Core Web Vitals

**Conclusion : le site est léger. Les deux risques sont Google Fonts (bloquant, tiers) et la vidéo de Noël qui se télécharge dès l'ouverture de la page.**

Scores Lighthouse et Core Web Vitals : **à mesurer** (PageSpeed Insights non lancé, voir § 2). Pas de données terrain (CrUX) possibles : le site est trop récent et en `noindex`.

### 4.1 Ce qui a été mesuré

| Mesure | Valeur relevée | Commentaire |
| --- | --- | --- |
| TTFB `/fr/` (curl, Belgique) | 0,44 s | Servi par Cloudflare (`cf-cache-status: HIT`), brotli actif |
| HTML `/fr/` | 37 Ko brut, 10,4 Ko compressé | Correct |
| `style.css` | 25 Ko brut, 6,5 Ko compressé | Correct |
| `app.js` | 18 Ko brut, ~6 Ko compressé, `defer` | Correct |
| Images de l'accueil | 106 Ko (versions 600 px) à 307 Ko (versions 1200 px) | Sur mobile haute densité, le navigateur prend souvent la 1200 px |
| Image LCP de l'accueil | `bo-ours-unis-noel-allonge`, 23 Ko en 600 px, `fetchpriority="high"` | Bien fait |
| Vidéo Noël | 359 Ko (mobile) / 1,25 Mo (desktop) | Lancée par `play()` au chargement |
| Polices Google Fonts | à mesurer | 2 familles variables, CSS bloquant chargé depuis un domaine tiers |

Seuils Google à viser au lancement : LCP ≤ 2,5 s, INP ≤ 200 ms (TBT ≤ 200 ms en labo), CLS ≤ 0,1, FCP ≤ 1,8 s.

### 4.2 Constats

| Gravité | Constat | Où |
| --- | --- | --- |
| Important | Feuille de style Google Fonts chargée en `<link rel="stylesheet">` depuis `fonts.googleapis.com` : requête bloquante vers 2 domaines tiers. CLAUDE.md demande d'héberger les polices en WOFF2. La page Cookies reconnaît le transfert d'IP à Google. | [src/build.mjs](../src/build.mjs) l. 250–252 ; [src/i18n-extra.mjs](../src/i18n-extra.mjs) l. 98 |
| Important | La vidéo du drop de Noël est lancée par `v.play()` pour toutes les vidéos `data-autoplay`, même sous la ligne de flottaison. Sur mobile : ~359 Ko téléchargés sans que la vidéo soit visible. | [src/static/app.js](../src/static/app.js) l. 294–297 ; [src/build.mjs](../src/build.mjs) l. 397 |
| Mineur | CSS et JS versionnés par empreinte (`?v=`), mais cache limité à 1 jour (`max-age=86400`). Ils pourraient être en cache 1 an (`immutable`). | `render.yaml` |
| OK | Images en WebP, `srcset` 600/1200, `width`/`height` fixés (pas de CLS), `loading="lazy"` hors hero. | [src/build.mjs](../src/build.mjs) l. 36–40 |

### 4.3 Recommandations

1. Télécharger Bricolage Grotesque et Atkinson Hyperlegible en WOFF2 (sous-ensemble latin), les servir depuis `/assets/fonts/`, précharger la police des titres, `font-display: swap`. Supprimer les 3 lignes Google Fonts et la phrase de la page Cookies.
2. Lancer la vidéo seulement quand elle entre dans l'écran (`IntersectionObserver`), et garder `preload="none"` tant qu'elle n'est pas visible.
3. Passer `/assets/*` en `Cache-Control: public, max-age=31536000, immutable` (les fichiers changent d'URL à chaque modification).
4. Lancer PageSpeed mobile sur `/fr/` et `/fr/saisons/noel/` et reporter les scores dans le tableau KPI (§ 11).

---

## 5. On-page : titles, meta, Hn

**Conclusion : le travail on-page est propre. Il reste à mieux cibler 4 pages et à remplir 16 meta descriptions.**

### 5.1 Ce qui a été vérifié (script sur les 102 pages)

- **Titles** : 100 % sous 60 caractères, aucun doublon, mot-clé en tête, « | UNIS » à la fin.
- **Meta descriptions** : 84 pages sur 100 en ont une, toutes entre 132 et 155 caractères.
- **H1** : exactement un par page.
- **Le contrôle est automatisé** dans le build ([src/build.mjs](../src/build.mjs) l. 224–225). Garde-le.

### 5.2 Constats

| Gravité | Constat | Où |
| --- | --- | --- |
| Mineur | 16 pages sans meta description : cookies, CGV, vie privée, mentions légales × 4 langues (`desc: ""`). Pas grave si elles passent en `noindex`. | [src/build.mjs](../src/build.mjs) l. 483, l. 563 |
| Important | Title de Bo : « Bo, l'ours en peluche cadeau drôle \| UNIS ». La requête « ours en peluche » est dominée par l'achat pour enfant. Ça attire la mauvaise cible et frôle la ligne rouge n° 1 (aucune association entre Bo et l'enfance). | [src/i18n.mjs](../src/i18n.mjs) l. 59 |
| Mineur | H1 du journal : « Le journal de Bo ». Aucun mot-clé. | [src/i18n-extra.mjs](../src/i18n-extra.mjs) (bloc `journal`) |
| Mineur | `og:image` identique sur toutes les pages (Bo allongé, Noël), même sur Pride ou Halloween. Les partages sociaux (action clé « partager ») perdent le motif de la saison. | [src/build.mjs](../src/build.mjs) l. 243–246 |
| Mineur | Ancres génériques sur l'accueil : « Voir le drop du moment », « Rencontrer Bo ». Le bloc « Pour le Secret Santa » renvoie vers la page de saison, pas vers l'article Secret Santa. | [src/i18n-vpc.mjs](../src/i18n-vpc.mjs) l. 12–18 |

### 5.3 Titles et meta proposés (longueurs comptées par script)

| Page | Title actuel | Title proposé | Long. |
| --- | --- | --- | --- |
| `/fr/bo/` | Bo, l'ours en peluche cadeau drôle \| UNIS | Bo, l'ours en peluche de collection à 49 € \| UNIS | 49 |
| `/fr/journal/` | Journal UNIS : tailles, cadeaux et coulisses \| UNIS | Le journal de Bo : tailles, cadeaux, coulisses \| UNIS | 53 |
| Nouvelle page hub cadeaux | — | Idées cadeaux drôles à petit prix \| UNIS | 40 |
| Nouvelle page Secret Santa | — | Cadeau Secret Santa drôle à 5 € \| UNIS | 38 |
| Nouvelle page EVJF/EVG | — | Cadeau EVJF et EVG drôle pour toute la bande \| UNIS | 51 |
| Nouvelle page couple | — | Cadeau Saint-Valentin couple drôle et assorti \| UNIS | 52 |
| Nouvelle page coffret | — | Coffret cadeau Bo + Duo assorti, 55 € \| UNIS | 44 |
| Exemple de fiche produit | — | String Rennes disco unisexe, 5 € \| UNIS | 39 |

Meta proposées :

- **Bo (153 car.)** : « Bo, l'ours en peluche de collection de 35 cm qui porte nos strings. 49 €, mini-string, boîte et certificat numéroté. Objet de collection, 14 ans et plus. »
- **Secret Santa (131 car.)** : « Secret Santa à 10 € ? Offre un string unisexe à 5 € ou le Duo à 7 €. Drôle, pas vulgaire, du XS au 4XL. Livraison offerte dès 30 €. »
- **Saint-Valentin couple (134 car.)** : « Un cadeau de Saint-Valentin qui fait rire, puis rougir : le Duo assorti à 7 € ou le coffret Bo à 55 €. Strings unisexes, du XS au 4XL. »

Les versions NL, EN et DE sont à adapter puis à faire relire par une personne native.

---

## 6. Images et Alt

**Conclusion : c'est le point le plus abouti du site. Une seule vraie faiblesse : les produits sans photo déclarent l'illustration de Bo comme image produit.**

| Zone | Images | Sans Alt | Commentaire |
| --- | --- | --- | --- |
| Accueil (×4 langues) | 5 | 0 | Alt descriptifs, traduits |
| Pages de saison | 3 à 5 | 0 | Noms de fichiers au format `string-unisexe-<saison>-<motif>-<coupe>` |
| Bo | 4 | 0 | `bo-ours-unis-<saison>` |
| Illustrations SVG (strings dessinés, icônes) | — | — | `aria-hidden="true"` : bon choix pour du décoratif |
| Vidéo Noël | 1 | — | `aria-label` traduit, `poster` en WebP |

| Gravité | Constat | Où |
| --- | --- | --- |
| Important | Dans le JSON-LD, les produits sans photo prennent `bo.svg` comme image : le Duo Rennes disco, le string Pull moche et le mini-string ont l'illustration de l'ours comme image produit. Google Shopping refuse ou déclasse une image qui ne montre pas le produit. | [src/build.mjs](../src/build.mjs) l. 138 |
| Mineur | Pas de sitemap d'images. Avec des noms de fichiers aussi bons, un sitemap d'images aiderait Google Images (Bo est très visuel). | [src/build.mjs](../src/build.mjs) l. 602–610 |

Recommandation : une photo « à plat » par produit avant le lancement (le brief existe dans [14-prompts-27-images.md](14-prompts-27-images.md)). En attendant, ne pas déclarer d'image plutôt qu'une image fausse.

---

## 7. Contenu et mots-clés

**Conclusion : les pages saisons ont assez de texte. Le journal, le guide des tailles et Bo sont trop courts pour se classer, et il manque une page par intention cadeau.**

### 7.1 Volume de texte relevé (mots dans `<main>`, FR)

| Page | Mots | Diagnostic |
| --- | --- | --- |
| Accueil | 1 014 | Bien |
| Pages de saison | 580 à 640 | Correct |
| Bo | 422 | Court pour une page phare. Manque l'histoire, les éditions passées, la FAQ collection |
| Guide des tailles | 148 | Très court. Ajouter la mesure illustrée, les cas « entre deux tailles », la différence Plat/Poche |
| Articles du journal | 246 à 299 | Minces. Viser 800 à 1 200 mots par article |
| Essentiels | 234 | Court pour la page qui porte « string unisexe » |

### 7.2 Constats de contenu

| Gravité | Constat | Où |
| --- | --- | --- |
| Important | Les 3 articles ont une date de publication future : 2 décembre 2026, 6 janvier 2027, 3 février 2027. Le site affiche « Publié le 6 janvier 2027 » le 16 novembre 2026, et le JSON-LD `BlogPosting` déclare la même date. Google peut ignorer ou mal dater ces pages. | [src/i18n-extra.mjs](../src/i18n-extra.mjs) l. 76, 82, 88 (et l. 172–184, 268–280, 364–376 pour NL, EN, DE) |
| Important | Deux articles promettent un échange gratuit : « l'échange est gratuit de toute façon » (article taille) et « Si la taille ne va pas, l'échange est gratuit » (article Secret Santa). Les CGV disent aussi que l'échange de taille est pris en charge. Or CONTEXTE-IA.md dit que ce n'est **pas décidé** et interdit de l'annoncer. Promesse non tenue = risque de confiance et d'avis négatifs. | [src/i18n-extra.mjs](../src/i18n-extra.mjs) l. 81 et l. 87 ; [src/legal.mjs](../src/legal.mjs) l. 29 |
| Important | Aucune page n'est construite autour des occasions cadeau (Secret Santa, EVJF, couple, anniversaire), alors que S1, S2 et S3 sont les moteurs d'acquisition (VPC § 2.2). | Arborescence |
| Mineur | Le journal annonce « un nouvel article par mois » avec seulement 3 articles. | [src/i18n-extra.mjs](../src/i18n-extra.mjs) l. 70 |

### 7.3 Intentions de recherche

| Intention | Exemple de requête | Page qui doit répondre |
| --- | --- | --- |
| Transactionnelle | « string unisexe », « acheter string de noël » | Essentiels, pages de saison, fiches produits |
| Commerciale (comparer, choisir) | « idée cadeau secret santa 10 € », « cadeau couple drôle » | Pages cadeaux par occasion (à créer) |
| Informationnelle | « comment choisir sa taille de string », « string homme ou femme différence » | Journal, guide des tailles |
| Marque | « unis string », « bo l'ours unis » | Accueil, Bo |

---

## 8. Stratégie de mots-clés par segment

**Principe : un segment = une intention = une page cible. Les volumes sont tous « à mesurer (Search Console / Keyword Planner) ».** Avant de produire une page, vérifie dans Keyword Planner (Belgique + France, puis Pays-Bas et Allemagne) quelle variante a du volume, et regarde la SERP : si Google n'affiche que des marketplaces, vise plutôt la longue traîne.

### 8.1 Tableau des mots-clés

| Segment | Mot-clé principal (FR) | Variantes et longue traîne | Volume | Page cible | Statut |
| --- | --- | --- | --- | --- | --- |
| **S1** Cadeau qui fait rire | cadeau Secret Santa drôle | idée cadeau Secret Santa 10 €, cadeau drôle collègue, cadeau à moins de 5 €, cadeau drôle pas vulgaire, cadeau Noël drôle | à mesurer (Search Console / Keyword Planner) | `/fr/idees-cadeaux/secret-santa/` | **À créer** (l'article actuel devient un satellite) |
| S1 | string de Noël | string de Noël drôle, string rennes, cadeau Noël string | à mesurer (Search Console / Keyword Planner) | `/fr/saisons/noel/` | Existe, à enrichir |
| **S2** Couple complice | cadeau Saint-Valentin couple | cadeau Saint-Valentin original, cadeau couple drôle, sous-vêtements assortis couple, cadeau Saint-Valentin pas cher | à mesurer (Search Console / Keyword Planner) | `/fr/saisons/saint-valentin/` + `/fr/idees-cadeaux/couple/` | Saison existe ; page couple **à créer** |
| **S3** Organisateur·rice de groupe | cadeau EVJF drôle | idée EVJF drôle, cadeau EVG drôle, cadeau groupe d'amis pas cher, tenue assortie EVJF, cadeau pour toute la bande | à mesurer (Search Console / Keyword Planner) | `/fr/idees-cadeaux/evjf-evg/` | **À créer** |
| S3 | lot de strings | lot de 5 strings, strings pas chers en lot | à mesurer (Search Console / Keyword Planner) | `/fr/essentiels/` (ou fiche « Lot de 5 ») | Existe, à enrichir |
| **S4** Collectionneur·se de Bo | Bo l'ours peluche | Bo l'ours UNIS, peluche de collection, ours en peluche numéroté, peluche édition limitée, ours de collection adulte | à mesurer (Search Console / Keyword Planner) | `/fr/bo/` + `/fr/bo/editions/` | Bo existe ; page éditions **à créer** |
| **S5** Pour soi | string unisexe | string coton confortable, string grande taille, string 4XL, sous-vêtement non genré, string OEKO-TEX, string fabriqué en Europe | à mesurer (Search Console / Keyword Planner) | `/fr/essentiels/` + `/fr/journal/string-unisexe-coupe-pas-genre/` | Existent, à enrichir |
| S5 | taille de string | comment choisir sa taille de string, guide des tailles string | à mesurer (Search Console / Keyword Planner) | `/fr/guide-des-tailles/` | Existe, trop court |
| **Marque** | UNIS string | UNIS Bo, strings UNIS, UNIS ours | à mesurer (Search Console / Keyword Planner) | Accueil | Existe |

Équivalents NL / EN / DE : partir du tableau de [04-seo.md](04-seo.md) (« unisex string », « unisex thong », « Unisex String », « grappig Secret Santa cadeau », « Wichtelgeschenk lustig »…), puis faire valider chaque terme par une personne native et par Keyword Planner du pays.

### 8.2 Garde-fous de marque sur les mots-clés

- **« ours en peluche »** seul vise surtout les enfants. Toujours l'associer à « collection », « adulte », « numéroté » ou « cadeau drôle ». Ne jamais cibler « peluche bébé », « doudou », « cadeau enfant ».
- **« string homme » / « string femme »** : forte demande probable (à mesurer), mais la marque interdit de genrer un produit. Ne crée pas de page « string homme ». Tu peux capter la question dans l'article « coupe plutôt que genre » (« Homme ou femme ? Chez nous, c'est Plat ou Poche »). Décision à valider par l'équipe.
- **En anglais**, toujours « thong », jamais « string ».
- **Pas de marques d'autrui** dans les mots-clés (ni noms de jeux, films, célébrités).

### 8.3 Le problème du nom « UNIS »

« UNIS » se confond avec « uni » (couleur unie) et avec d'autres sens courants. Ce que le site peut faire :

1. Ne jamais compter sur « unis » seul. Toujours viser **« UNIS » + un mot produit** : « UNIS string », « Bo l'ours UNIS ».
2. Ajouter dans le JSON-LD `Organization` et `WebSite` un `alternateName` (ex. « UNIS strings », « UNIS Bo »), un vrai logo PNG carré et les `sameAs` des réseaux sociaux dès qu'ils existent. Voir § 10.
3. Faire de **Bo** un second actif de marque : c'est un nom court, mais combiné à « ours » ou « UNIS », il est plus distinctif.
4. Choisir un nom de domaine distinctif au lancement (piste de 04-seo.md : « UNIS Bear »). Décision à prendre par l'équipe ; aucun domaine à acheter sans accord.
5. Mesurer après le lancement : impressions sur requêtes de marque dans Search Console.

### 8.4 Pages et articles à créer

**Pages commerciales (priorité haute) :**

| Page | Segment | Contenu clé |
| --- | --- | --- |
| `/fr/idees-cadeaux/` (hub) | S1, S2, S3 | Une carte par occasion, par budget (3 €, 5 €, 7 €, 20 €, 49 €) |
| `/fr/idees-cadeaux/secret-santa/` | S1 | Budget 10 €, date limite de commande Noël, « drôle devant ta boss », produits du drop |
| `/fr/idees-cadeaux/evjf-evg/` | S3 | Lot de 5 à 20 €, « 4 € la tête », tailles XS–4XL, Bo mascotte du week-end |
| `/fr/idees-cadeaux/couple/` | S2 | Duo assorti, coffret 55 €, ton « rire puis rougir » |
| `/fr/coffrets-cadeaux/` | S1, S2, S4 | Prévue dans 04-seo.md, absente |
| `/fr/bo/editions/` | S4 | Toutes les tenues de Bo, par saison, « jamais réédité » |
| Fiches produits (§ 9) | Tous | Une URL par produit vendu |

**Articles du journal (un par mois, 800 à 1 200 mots) :**

| Article | Segment | Mois de publication conseillé |
| --- | --- | --- |
| Cadeau drôle pour un·e collègue : drôle, pas gênant | S1 | Mi-novembre |
| Jusqu'à quand commander pour Noël ? | S1 | Fin novembre |
| 10 idées de cadeaux Saint-Valentin drôles pour un couple | S2 | Mi-janvier |
| Organiser un EVJF ou un EVG drôle sans se ruiner | S3 | Avril |
| Bo, l'histoire d'un ours de collection numéroté | S4 | Avant chaque drop |
| String en coton : confort, entretien et certification OEKO-TEX | S5 | Toute l'année |
| Grande taille : un string du XS au 4XL, pour de vrai | S5 | Juin (Pride) |

Chaque article renvoie vers sa page commerciale avec une ancre descriptive, et chaque page commerciale renvoie vers son article.

---

## 9. Architecture et maillage interne

**Conclusion : l'arborescence est claire et peu profonde. Il manque un étage « produits » et un étage « idées cadeaux ».**

### 9.1 Arborescence actuelle (FR, identique dans les 3 autres langues)

```
/fr/
├── bo/
├── essentiels/
├── saisons/
│   ├── saint-valentin/  printemps/  pride/  ete/
│   ├── halloween/  octobre-rose/  noel/
├── guide-des-tailles/
├── aide/
├── a-propos/  contact/  club/
├── journal/
│   ├── cadeau-secret-santa-drole/
│   ├── choisir-sa-taille-de-string/
│   └── string-unisexe-coupe-pas-genre/
├── compte/  cookies/
└── conditions-de-vente/  vie-privee/  mentions-legales/
```

### 9.2 Constats

| Gravité | Constat | Où |
| --- | --- | --- |
| Critique (au lancement) | Pas de fiche produit. Les produits vivent sur les pages de saison, de Bo et des Essentiels. Le JSON-LD `Product` déclare l'URL de la page de liste comme URL d'offre. Le même SKU (`UNIS-BO-NOEL27`, `UNIS-BOX-NOEL27`, `UNIS-NOEL27-RENNES-MINI`) apparaît sur `/fr/bo/` **et** sur `/fr/saisons/noel/` avec deux URL d'offre différentes. Google ne sait pas quelle page est la page du produit. | [src/build.mjs](../src/build.mjs) l. 356–359 et l. 384–391 |
| Important | Pas d'étage « idées cadeaux » (§ 8.4). | — |
| Mineur | Le menu principal ne contient ni le journal ni les cadeaux. Le journal n'est lié que depuis le pied de page. | [src/build.mjs](../src/build.mjs) l. 222 et l. 276 |
| OK | Fil d'Ariane HTML + `BreadcrumbList` sur toutes les pages internes. | [src/build.mjs](../src/build.mjs) l. 140, l. 204–206 |
| OK | Le sélecteur de langue pointe vers la page équivalente (pas vers l'accueil). | [src/build.mjs](../src/build.mjs) l. 264 |
| OK | Toutes les pages sont à 1 ou 2 clics de l'accueil. | — |

### 9.3 Arborescence recommandée au lancement

```
/fr/
├── produits/                         (nouveau)
│   ├── bo/                           (ou garder /fr/bo/ comme fiche de Bo)
│   ├── string-essentiel/
│   ├── lot-de-5-strings/
│   ├── coffret-cadeau-<saison>/
│   └── string-<saison>-<motif>/      (ex. string-noel-rennes-disco)
├── idees-cadeaux/                    (nouveau hub)
│   ├── secret-santa/
│   ├── couple/
│   └── evjf-evg/
├── coffrets-cadeaux/                 (prévu dans 04-seo.md)
├── bo/  └── editions/                (nouveau)
├── essentiels/  saisons/…            (existant)
├── guide-des-tailles/  aide/  journal/…
```

Slugs traduits sans accents dans les 4 langues, avec `hreflang` comme aujourd'hui.

**Règle pour les drops passés :** la page de saison reste en ligne toute l'année (règle de 04-seo.md). Les fiches produits d'un drop épuisé restent en ligne avec `availability: SoldOut` et un lien vers le drop suivant, sans redirection.

### 9.4 Règles de maillage

1. Chaque page de saison lie ses fiches produits, l'idée cadeau qui lui correspond et le guide des tailles.
2. Chaque fiche produit lie sa saison, Bo (pour le Duo et le mini-string) et le guide des tailles.
3. Les ancres décrivent la cible : « idées de cadeaux Secret Santa » plutôt que « voir le drop du moment ».
4. Ajouter « Idées cadeaux » au menu principal entre octobre et février.

---

## 10. Données structurées

**Conclusion : le JSON-LD est riche et valide en JSON. Il faut le rattacher à des fiches produits et désambiguïser la marque.**

### 10.1 Ce qui existe

| Type | Pages | Où |
| --- | --- | --- |
| Organization | Toutes | [src/build.mjs](../src/build.mjs) l. 126 |
| WebSite | Accueil | l. 338 |
| Product + Offer + OfferShippingDetails + MerchantReturnPolicy | Bo, Essentiels, saisons | l. 127–139 |
| BreadcrumbList | Pages internes | l. 140 |
| FAQPage | Aide | l. 141, l. 412 |
| Blog, BlogPosting | Journal | l. 464, l. 474 |
| AboutPage, ContactPage | À propos, contact | l. 425, l. 435 |

Points positifs : livraison 3,90 € et gratuité dès 30 € décrites, retour 14 jours, `PreOrder` pour les drops à venir, `priceValidUntil` sur le drop en cours. Aucun `AggregateRating` inventé.

### 10.2 Constats

| Gravité | Constat | Où |
| --- | --- | --- |
| Important | `Organization` sans `alternateName`, sans `sameAs`, logo = `favicon.svg`. Google recommande un logo d'au moins 112 × 112 px ; un PNG carré est plus sûr. | [src/build.mjs](../src/build.mjs) l. 126 |
| Important | `image` des produits sans photo = `bo.svg` (§ 6). | l. 138 |
| Important | Un même produit est décrit sur plusieurs pages avec des `offers.url` différentes (§ 9.2). | l. 136, l. 359, l. 391 |
| Mineur | Le Bo permanent (`UNIS-BO`) reçoit `priceValidUntil` = fin du drop de Noël, alors qu'il n'est pas saisonnier : `boProduct()` porte `season: LIVE`. | l. 87 et l. 137 |
| Mineur | Le SKU du drop de Noël 2026 porte « 27 » (`yr = "27"` codé en dur) alors que `dropYear` vaut 2026. | l. 76 ; [src/config.mjs](../src/config.mjs) l. 24 |
| Mineur | Pas de `ProductGroup` pour les variantes taille × coupe, alors que 04-seo.md le prévoit. | — |
| Mineur | `BlogPosting.datePublished` dans le futur (§ 7.2). | l. 474 |

### 10.3 Exemple de JSON-LD pour une fiche produit (prix réels)

```json
{
  "@context": "https://schema.org",
  "@type": "ProductGroup",
  "name": "String unisexe Rennes disco",
  "productGroupID": "UNIS-NOEL26-RENNES",
  "brand": { "@type": "Brand", "name": "UNIS" },
  "material": "95 % coton, 5 % élasthanne, OEKO-TEX Standard 100",
  "variesBy": ["https://schema.org/size", "https://schema.org/pattern"],
  "hasVariant": [
    {
      "@type": "Product",
      "sku": "UNIS-NOEL26-RENNES-PLAT-M",
      "name": "String unisexe Rennes disco, coupe Plat, M",
      "size": "M",
      "image": "https://<domaine>/assets/images/string-unisexe-noel-rennes-plat-1200.webp",
      "offers": {
        "@type": "Offer",
        "url": "https://<domaine>/fr/produits/string-noel-rennes-disco/?taille=M&coupe=plat",
        "price": "5.00",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/LimitedAvailability",
        "priceValidUntil": "2026-12-31"
      }
    }
  ]
}
```

Garder les blocs `shippingDetails` et `hasMerchantReturnPolicy` actuels dans chaque `Offer`.

Pour l'organisation :

```json
{
  "@type": "Organization",
  "name": "UNIS",
  "alternateName": ["UNIS strings", "UNIS Bo"],
  "logo": "https://<domaine>/assets/logo-unis-512.png",
  "sameAs": ["<URL Instagram>", "<URL TikTok>"]
}
```

Ne remplis `sameAs` qu'avec des comptes qui existent vraiment.

### 10.4 Avis, local, mobile

- **Avis** : aucun aujourd'hui, et c'est normal. Après le lancement, collecter de vrais avis (voir [12-paiement-kpi-avis.md](12-paiement-kpi-avis.md)) avant d'ajouter `AggregateRating`.
- **Google Business Profile** : pas pertinent tant qu'il n'y a pas d'adresse physique ou de point de retrait. Les identifiants de société sont fictifs sur la démo : ne rien déclarer avant la création de la SRL.
- **Mobile** : `viewport` présent, cibles tactiles de 44 px prévues par la charte. À confirmer avec le test Lighthouse.
- **Obligation sectorielle** : sur chaque fiche de Bo, la mention « Objet de collection, 14 ans et plus. Marquage CE (tests EN 71 prévus). » est bien présente ([src/build.mjs](../src/build.mjs) l. 114 et l. 361).

---

## 11. Plan d'action priorisé

### 11.1 Gains rapides (moins d'une journée chacun)

| # | Action | Section | Impact | Effort | Quand |
| --- | --- | --- | --- | --- | --- |
| 1 | **Au lancement** : passer `indexable: true` dans `src/config.mjs`, relancer le build, soumettre le sitemap dans Search Console. Pas avant. | 3 | Critique | Très faible | Jour J (avril 2027) |
| 2 | Ajouter un `noindex` par page (compte, cookies, légal) et les sortir du sitemap. À faire **avant** l'action 1. | 3 | Important | Faible | Avant le lancement |
| 3 | Corriger les dates des articles (date réelle de publication, jamais dans le futur). | 7, 10 | Important | Très faible | Maintenant |
| 4 | Retirer la promesse « échange gratuit » des 2 articles et des CGV (4 langues), tant que l'équipe n'a pas décidé. | 7 | Important | Très faible | Maintenant |
| 5 | Ajouter `alternateName`, un logo PNG 512 × 512 et `sameAs` (quand les comptes existent) à `Organization`. | 8.3, 10 | Important | Faible | Maintenant |
| 6 | Ne plus déclarer `bo.svg` comme image d'un produit qui n'est pas Bo. | 6, 10 | Important | Très faible | Maintenant |
| 7 | Changer le title de Bo vers « Bo, l'ours en peluche de collection à 49 € \| UNIS » (et équivalents NL/EN/DE). | 5 | Important | Très faible | Maintenant |
| 8 | Lancer la vidéo au défilement (`IntersectionObserver`) au lieu du chargement. | 4 | Moyen | Faible | Maintenant |
| 9 | Cache 1 an `immutable` sur `/assets/*` dans `render.yaml`. | 4 | Moyen | Très faible | Maintenant |
| 10 | Corriger le SKU « 27 » codé en dur et le `priceValidUntil` du Bo permanent. | 10 | Faible | Très faible | Maintenant |
| 11 | Ancres descriptives sur l'accueil ; le bloc Secret Santa pointe vers la page Secret Santa. | 5, 9 | Faible | Très faible | Avec l'action 14 |

### 11.2 Chantiers (plusieurs jours)

| # | Action | Section | Impact | Effort | Quand |
| --- | --- | --- | --- | --- | --- |
| 12 | Créer une **fiche produit par produit** (URL, H1, photo à plat, `ProductGroup`), et faire des pages de saison des pages de liste. | 9, 10 | Critique | Élevé | Avant le lancement |
| 13 | Héberger les polices en WOFF2 et supprimer Google Fonts. | 4 | Important | Moyen | Avant le lancement |
| 14 | Créer le hub `/idees-cadeaux/` et les pages Secret Santa, couple, EVJF/EVG, plus `/coffrets-cadeaux/` (4 langues). | 8.4 | Important | Moyen | Secret Santa d'abord (pic de novembre-décembre), couple avant mi-janvier |
| 15 | Remplacer la redirection JS de la racine par une redirection serveur, et rediriger en 301 les URL sans barre finale. | 3 | Moyen | Faible | Avant le lancement |
| 16 | Allonger Bo, Essentiels, guide des tailles et les 3 articles (800 à 1 200 mots pour les articles). | 7 | Important | Moyen | Avant le lancement |
| 17 | Publier un article par mois selon le tableau § 8.4. | 8.4 | Important | Continu | Dès maintenant |
| 18 | `og:image` propre à chaque saison (partage = action clé). | 5 | Moyen | Faible | Avant le lancement |
| 19 | `lastmod` réel et sitemap d'images. | 3, 6 | Faible | Faible | Avant le lancement |
| 20 | Choisir le nom de domaine définitif (décision d'équipe, rien à acheter sans accord). | 8.3 | Important | Décision | Avant le lancement |
| 21 | Netlinking propre : presse étudiante et locale belge, partenaires de la capsule Octobre Rose (une fois l'accord signé), blogs cadeaux. Jamais de liens achetés. | — | Important | Continu | Après le lancement |

### 11.3 KPI à suivre

| Indicateur | Outil | Valeur actuelle mesurée | Objectif à 6 mois du lancement |
| --- | --- | --- | --- |
| Pages indexées | Search Console | 0 (noindex volontaire) ; 100 URL dans le sitemap, dont 80 utiles | 80 pages utiles indexées + les fiches produits (objectif 04-seo.md : 140) |
| Titles < 60 caractères | Script du build | 100 % | 100 % |
| Meta descriptions 120–155 | Script du build | 84 / 100 pages (les 16 manquantes sont des pages à passer en noindex) | 100 % des pages indexables |
| Images avec Alt | Script | 100 % | 100 % |
| PageSpeed mobile (accueil, Noël) | PageSpeed Insights | à mesurer | ≥ 85 (04-seo.md) |
| URL « bonnes » en Core Web Vitals | Search Console | à mesurer (pas de données avant indexation) | 100 % |
| Position sur « string unisexe » (FR) | Search Console | à mesurer | Top 10 (04-seo.md) |
| Impressions sur requêtes de marque (« UNIS string », « Bo l'ours ») | Search Console | à mesurer | En hausse chaque mois |
| Clics organiques vers les pages cadeaux | Search Console / GA4 | à mesurer (pages à créer) | À fixer après 2 mois de données |
| Domaines référents | Ahrefs ou Search Console (liens) | à mesurer | 15 (04-seo.md) |
| Inscriptions venant du SEO | GA4 (après consentement) | à mesurer | Contribution aux 500 inscrits |

---

## 12. Outils et sources

**Utilisés pour cet audit :**

- `curl` sur le site en ligne, le 16 novembre 2026 : statuts, redirections, en-têtes, poids compressés.
- Script Node (lecture seule) sur les 102 fichiers HTML de `site/`.
- Lecture du code : `src/build.mjs`, `src/config.mjs`, `src/data.mjs`, `src/i18n.mjs`, `src/i18n-extra.mjs`, `src/i18n-vpc.mjs`, `src/photos.mjs`, `src/legal.mjs`, `src/static/app.js`, `render.yaml`.

**Recommandés pour la suite (non utilisés ici) :**

- PageSpeed Insights / Lighthouse : performance et Core Web Vitals.
- Google Search Console : indexation, requêtes, positions (après le lancement).
- Google Keyword Planner : volumes par pays et par langue.
- Test des résultats enrichis de Google et validateur Schema.org : JSON-LD.
- Ahrefs ou équivalent : backlinks et concurrents.

**Pages consultées le 16 novembre 2026 :**

- https://unis-demo.onrender.com/
- https://unis-demo.onrender.com/fr/ et `/fr` (sans barre)
- https://unis-demo.onrender.com/fr/bo/ et `/fr/bo`, `/fr/bo/index.html`
- https://unis-demo.onrender.com/fr/saisons/noel/
- https://unis-demo.onrender.com/en/
- https://unis-demo.onrender.com/robots.txt
- https://unis-demo.onrender.com/sitemap.xml
- https://unis-demo.onrender.com/nope/ (test 404)
- http://unis-demo.onrender.com/fr/ (test HTTPS)
- https://unis-demo.onrender.com/assets/style.css, `/assets/app.js`, une image WebP (en-têtes de cache)
