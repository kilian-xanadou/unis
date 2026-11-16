# UNIS : plan SEA (publicité payante)

Rédigé le 16 novembre 2026. Aucun volume de recherche ni coût par clic n'est indiqué : ils sont **à mesurer** dans Google Keyword Planner et Google Trends avant de fixer les budgets. Rien ne doit être lancé tant que la boutique n'accepte pas de vraies commandes (le site actuel est une démo).

## 1. Prérequis avant la première campagne

| Élément | Pourquoi | Statut |
| --- | --- | --- |
| Paiement réel (Shopify ou Stripe) | On ne paie pas des clics vers un panier factice | À faire |
| Bandeau cookies + Google Consent Mode v2 | Obligatoire dans l'UE pour mesurer les conversions | À faire |
| GA4 + conversion Google Ads (achat, inscription liste d'attente) | Sans mesure, impossible de piloter | À faire |
| Pixel Meta + API Conversions | Idem pour Instagram et Facebook | À faire |
| Google Merchant Center (flux produits) | Requis pour Shopping et Performance Max | À faire (flux natif Shopify) |
| Nom de marque tranché (ex. « UNIS Bear ») | « UNIS » seul se confond avec « uni » | À décider |

## 2. Règles des régies à respecter

- **Sous-vêtements :** Google et Meta acceptent la lingerie mais refusent les poses suggestives et limitent la diffusion des photos portées. Image principale des annonces et du flux : **Bo qui porte le string** ou **le string à plat**.
- **Bo n'est pas un jouet :** aucune campagne ne cible les mineurs. Âge minimum **18 ans** dans Meta et Google (plus strict que le « 14 ans et plus » du produit, à cause des strings dans la même annonce).
- **Pas de genre :** jamais de ciblage ou de texte « pour homme » / « pour femme ». On cible par centres d'intérêt (cadeaux, humour, Pride, festivals) et par mots-clés.
- **Omnibus :** toute promo dans une annonce affiche le prix le plus bas des 30 derniers jours sur la page d'arrivée.

## 3. Structure des campagnes Google Ads

Une campagne par **langue/pays** (FR : BE + FR + LU ; NL : BE + NL ; DE : DE + AT ; EN : IE + reste UE), pour garder textes, enchères et budgets séparés.

| Campagne | Type | Mots-clés de départ (FR) | Page d'arrivée | Quand |
| --- | --- | --- | --- | --- |
| Marque | Search, exact | unis bear, unis string, bo ours unis | Accueil | Toute l'année |
| Drop en cours | Search, expression | string de noël, cadeau secret santa drôle, string humour cadeau | Page de la saison (`/fr/saisons/noel/`) | De J-14 à la fin du drop |
| Bo, cadeau | Search, expression | ours en peluche cadeau drôle, cadeau humour adulte | `/fr/bo/` | Pics : Noël, Saint-Valentin |
| Shopping / Performance Max | Flux Merchant Center | (automatique) | Fiches produit | Dès que le flux est validé |
| Remarketing | Display / Demand Gen | Visiteurs 30 jours sans achat | Page de la saison | Toute l'année |

Équivalents NL, EN et DE : reprendre le tableau des mots-clés de `docs/04-seo.md`.

**Mots-clés négatifs dès le départ :** gratuit, enfant, bébé, jouet enfant, peluche bébé, porno, xxx, patron couture, tuto. À compléter chaque semaine avec le rapport des termes de recherche.

## 4. Meta (Instagram, Facebook) et TikTok

- **Créa principale :** Bo qui révèle le nouveau motif (format vertical 9:16, 6 à 15 s), puis le string à plat et le prix (5 €, Duo 7 €).
- **Audiences :** 18–45 ans, centres d'intérêt cadeaux humoristiques, Secret Santa, Pride, festivals ; lookalike des inscrits à la liste d'attente dès 1 000 contacts.
- **Remarketing :** vues de la page saison sans achat → annonce Duo à 7 € ; propriétaires de Bo → nouveau mini-string à 3 €.

## 5. Calendrier (aligné sur les drops)

| Drop | Lancement | Campagnes actives |
| --- | --- | --- |
| Saint-Valentin | mer. 3 févr. 2027 | 20 janv. → 14 févr. |
| Printemps | mer. 17 mars 2027 | 10 mars → 15 avril |
| Pride | mar. 1er juin 2027 (précommande 12 mai) | 12 mai → 30 juin |
| Été | mar. 15 juin 2027 | 15 juin → 31 août |
| Halloween | ven. 1er oct. 2027 | 24 sept. → 31 oct. |
| Noël | lun. 1er nov. 2027 | 25 oct. → 20 déc. |

Budget marketing de l'année 1 (business plan) : 60 k€ HT. Répartition proposée, **à valider** : 40 % autour de Noël, 15 % Saint-Valentin, 15 % Pride + Été, 10 % Halloween, 20 % marque et remarketing toute l'année (même logique que la saisonnalité des ventes du business plan).

## 6. Suivi : convention UTM

`?utm_source=<google|meta|tiktok|newsletter>&utm_medium=<cpc|paid_social|email>&utm_campaign=<saison>-<annee>-<langue>&utm_content=<visuel>`

Exemple : `/fr/saisons/noel/?utm_source=google&utm_medium=cpc&utm_campaign=noel-2027-fr`

## 7. KPI à suivre (objectifs à fixer après 4 semaines de données)

Coût par inscription à la liste d'attente · coût par achat · ROAS par campagne · part des commandes avec Bo · panier moyen (seuil de livraison offerte à 30 €).
