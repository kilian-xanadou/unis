# UNIS : ce que chaque cours demande, et où c'est dans le projet

Mis à jour le 16 novembre 2026, après lecture des supports de 4 cours (E-gestion, e-Commerce & Économie du numérique, Communication Web, Marketing Digital). Les numéros de page sont ceux des PDF.

> **⚠ À vérifier avec le professeur d'E-gestion.** Le briefing d'examen (p.17-21) impose de choisir le business case parmi **4 concepts** : Kite Optics, Wildlife Garden, MDS, Euromex. UNIS n'en fait pas partie, et le webshop de l'exercice doit être construit sur **WiziShop** (compte de groupe, p.22). Il faut donc demander si un concept libre est accepté. Tout le travail ci-dessous (personas, journeys, fidélité, emailing, social media) se réutilise sur n'importe quel concept.

## E-gestion (logiciels E-gestion)

**Examen :** certifications 30 % · oral 40 % · évaluation continue 30 % (briefing p.3).

| Échéance | À faire | Statut |
| --- | --- | --- |
| **18/12/2026, 17h** | Certification **Google Analytics** (≥ 80 %), PDF nommé `HEPL_Ebusiness_(nom_prenom)_GoogleAnalytics` (p.6-10) | À faire par chaque étudiant·e |
| **18/12/2026, 17h** | Certification **HubSpot Marketing de contenu** (≥ 80 %), PDF nommé `HEPL_Ebusiness_(nom_prenom)_Hubspot` | À faire par chaque étudiant·e |
| **18/12/2026, 17h** | Document **Word** de groupe accompagnant le webshop (p.5, p.16) | Contenu prêt, voir ci-dessous |
| Janvier 2027 | Oral : 1 question préparée + 1 question tirée au sort (p.12) | Réviser avec les docs ci-dessous |

**Les 8 sections du Word (briefing p.16) et où les trouver :**

| Section | Document du projet |
| --- | --- |
| 1. Description du concept | [07-strategie-digitale.md](07-strategie-digitale.md) §1-5, [01-business-plan.md](01-business-plan.md) |
| 2. Buyer Persona | [08-personas-customer-journey.md](08-personas-customer-journey.md) (3 personas, canevas S2 p.23-24) |
| 3. Customer Journey | [08-personas-customer-journey.md](08-personas-customer-journey.md) (3 journeys avec déclencheur) |
| 4. Logo | [02-marque.md](02-marque.md) (logo UNIS + fil ondulé). À tester avec la grille de 7 critères (S1 p.26) |
| 5. Stratégie de contenu | [11-communication-social-media.md](11-communication-social-media.md) §2, journal du site (3 articles), 5 thèmes dans le doc 08 |
| 6. Programme de fidélité | [09-fidelisation-crm.md](09-fidelisation-crm.md) (Club de Bo) + page `/fr/club/` |
| 7. Stratégie emailing | [10-emailing-newsletters.md](10-emailing-newsletters.md) (3 newsletters + 5 relances, tâche S6 p.119) + [03-campagnes-emailing.md](03-campagnes-emailing.md) |
| 8. Stratégie social media | [11-communication-social-media.md](11-communication-social-media.md) + [calendrier éditorial](../data/calendrier-editorial-2027.csv) |

**Tâches de séance couvertes :** S1 p.61 (mission, vision, domaine, hébergement, budget, nom, logo) → doc 07 · S2 p.38-42 (3 personas, 3 journeys, 5 thèmes, influenceurs) → doc 08 · S3 p.24 et p.53 (site, marketplace, fonctionnalités, confiance, avis) → docs 07 et 12, site · S5 p.89 (fidélité) → doc 09 · S6 p.119 (3 newsletters + 5 relances) → doc 10.

**Restant à faire par le groupe :** export AnswerThePublic, création du webshop sur WiziShop (le cours ne donne pas de format d'import ; `data/products.csv` est au format Shopify), fiche Google Business.

## e-Commerce & Économie du numérique

| Élément du cours | Où |
| --- | --- |
| Business Model Canvas (p.24 ; ÉN p.78-79) et liste des 48 business models (p.26-30) | [07-strategie-digitale.md](07-strategie-digitale.md) §5 |
| Mission « Votre projet : Business Model » (Excel sur Teams, p.31) | Reprendre le §5 du doc 07 dans le fichier Excel |
| Marketplaces, Amazon FBA (p.32-51) | Doc 07 §7 |
| Contenu du site : accueil, fiche produit, À propos, Contact, FAQ, pages obligatoires (p.62-89) | **Site** : pages À propos, Contact, FAQ par rubriques, CGV, vie privée, cookies, mentions légales |
| Choix de plateforme (p.93-107) | Doc 07 §6 |
| KPI (p.110-120) | [12-paiement-kpi-avis.md](12-paiement-kpi-avis.md) §2 |
| SEO, GEO, SEA (p.126-222) | [04-seo.md](04-seo.md), [06-sea.md](06-sea.md), site (balises, sitemap, FAQ en questions) |
| Paiement, fraude, **Mission 10** (p.224-261) | Doc 12 §1, logos de paiement sur le site |
| Avis clients (p.262-267) | Doc 12 §3 |

## Communication Web

| Élément du cours | Où |
| --- | --- |
| Plan de communication (Lasswell, SMART, entonnoir, 4 piliers) | [11-communication-social-media.md](11-communication-social-media.md) §1 |
| Ligne éditoriale, hashtags, emojis, check-list vidéo, titraille | Doc 11 §2 |
| Calendrier éditorial sur 12 mois (modèle tableur) + calendrier social media | [data/calendrier-editorial-2027.csv](../data/calendrier-editorial-2027.csv) (généré par `node src/calendrier.mjs`) |
| Charte de modération et gestion de crise | Doc 11 §4-5 ; version courte sur le site (À propos > Règles de la communauté) |
| FAQ (rubriques, accordéon, registre Quoi/Comment/Pourquoi, lien contact) | **Site** : page Aide |

## Marketing Digital

| Élément du cours | Où |
| --- | --- |
| Customer journey, SONCAS, carte d'empathie, checklist de contenus | Doc 08 |
| Social Ads : structure en 4 niveaux, audiences, pixel, remarketing | Doc 11 §6 ; événements de mesure émis par le site dans `window.dataLayer` (rien n'est envoyé) |
| Google Ads : triptyque mot-clé / annonce / landing page | [06-sea.md](06-sea.md) ; pages saisons avec bloc de réassurance |
| Emailing : 10 commandements, double opt-in | Doc 10 ; formulaire du site (double opt-in annoncé, segmentation par coupe) |
| Vidéo RS et influence : mascotte, hook 3 s, 7 étapes | Doc 11 §7 |

## Ce qui a changé sur le site

- Nouvelles pages dans les 4 langues : **À propos** (manifeste, valeurs, règles de la communauté), **Contact** (formulaire démo, délai de réponse, médiation), **Club de Bo** (fidélité), **Journal** + 3 articles, **Cookies**.
- **Bandeau de réassurance** (5 €, XS–4XL, livraison offerte dès 30 €, retour 14 jours) sur l'accueil et les pages saisons.
- **Pied de page** : moyens de paiement, paiement sécurisé, garantie légale de 2 ans, service de médiation, hashtags.
- **Panier** : sous-total, frais de livraison, total, case d'acceptation des CGV obligatoire, achat sans compte.
- **Liste d'attente** : double opt-in annoncé, coupe préférée (segmentation).
- **FAQ** classée par rubriques avec date de mise à jour et lien vers le contact.
- **Mesure** : événements `view_item_list`, `add_to_cart`, `begin_checkout`, `generate_lead`, `contact` dans `window.dataLayer`, prêts pour GA4 et le pixel Meta après accord cookies.

## Limites

Plusieurs supports sont en grande partie des images (Google Ads, Communication Web, une partie d'e-Commerce et d'Économie du numérique) : leur contenu visuel n'a pas pu être lu. Les chiffres cités viennent des cours et gardent leurs sources et leurs dates d'origine.
