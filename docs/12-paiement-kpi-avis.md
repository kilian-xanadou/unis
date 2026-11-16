# UNIS : paiement, KPI et avis clients

Sources de cours : e-Commerce (moyens de paiement p.225-235, grille de choix p.236, acteurs PSP p.237-240, fraude p.253-258, **Mission 10 : stratégie de paiement p.260-261**, KPI p.110-120, avis clients p.262-267) ; E-gestion session 3 (avis et confiance p.33-48).

## 1. Stratégie de paiement (Mission 10)

Profil UNIS : petit e-commerce belge, panier faible (5 à 30 € sans Bo, 49 à 60 € avec Bo), marge faible sur les strings. C'est le cas n°4 de la mission (petit e-commerce belge, panier de 40 €, faible marge).

| Moyen | Pourquoi | Coût (chiffres du cours) | Décision |
| --- | --- | --- | --- |
| Bancontact (+ Bancontact Pay) | Réflexe belge, plus de 15 M d'utilisateurs | ~0,2 à 0,5 € par transaction (p.225) | **Oui, en premier** |
| Apple Pay / Google Pay | Grille du cours : panier < 30 € → wallet (p.236) | Selon le PSP | **Oui** |
| Visa / Mastercard | Clients hors Belgique | 0,8 à 2,5 % (p.226) | **Oui**, avec 3D Secure |
| iDEAL | Clients néerlandais (persona Sam) | Selon le PSP | **Oui** |
| PayPal | Connu, mais ~2,9 % de commission (p.231) | Trop cher pour un string à 5 € | Non au lancement |
| BNPL (Klarna…) | Augmente le panier, 3 à 6 % de commission (p.233) | Inadapté à des paniers bas | Non |
| Crypto | Aucune demande de la cible | — | Non |

- **PSP :** Mollie (belgo-néerlandais, Bancontact et iDEAL natifs) ou Stripe. Le choix final dépend de la plateforme (WiziShop, Shopify).
- **Antifraude (p.253-258) :** HTTPS, 3D Secure sur les cartes, scoring du PSP. Les commandes avec Bo au-dessus de 100 € sont vérifiées à la main. Un chargeback coûte de 10 à plus de 100 € (p.257) : politique de retour claire pour les éviter.
- **Sur le site :** logos des moyens de paiement et mention « Paiement sécurisé (HTTPS, 3D Secure) » dans le pied de page et le panier.

## 2. Tableau de KPI e-commerce (p.110-120)

Les objectifs restent **à fixer après 4 semaines de données réelles**. Le cours donne des repères : conversion moyenne 1,64 % (Invesp 2023), mode et habillement 2,7 % (Adobe T4 2022), p.113-114.

| KPI | Définition | Outil | Fréquence |
| --- | --- | --- | --- |
| Trafic et sources | Visites par canal (SEO, SEA, social, email) | GA4 + UTM | Hebdo |
| Nouveaux / connus | Part de visiteurs qui reviennent | GA4 | Mensuel |
| Taux de conversion | Commandes ÷ visites | GA4 | Hebdo |
| Panier moyen (AOV) | CA ÷ commandes ; objectif : dépasser 30 € (livraison offerte) | Plateforme | Hebdo |
| Abandon de panier | Paniers non payés ÷ paniers créés | Plateforme | Hebdo |
| Taux de rebond | Pages vues une seule fois | GA4 | Mensuel |
| Taux de retour | Articles retournés ÷ vendus (indicateur du guide des tailles) | Plateforme | Mensuel |
| Rétention | Clients avec 2 commandes et plus | CRM | Trimestriel |
| CAC | Dépense marketing ÷ nouveaux clients | Ads + plateforme | Mensuel |
| LTV | Marge cumulée par client | CRM | Trimestriel |
| Satisfaction | NPS (voir [09-fidelisation-crm.md](09-fidelisation-crm.md)) | Enquête | Mensuel |

Règle de pilotage : **CAC < LTV** (p.120). Démarche « test & learn » (Marketing Digital CJ p.16-18) : planifier, tester, mesurer, apprendre, puis persévérer ou pivoter.

## 3. Avis clients et e-réputation (p.262-267, E-gestion S3 p.33-48)

- **Collecte :** email 21 jours après l'achat, QR code sur la carte du colis. Avis vérifiés uniquement (acheteurs réels).
- **Affichage :** bloc d'avis sur les fiches et la page saison, activé dès les premières commandes. **Aucun avis inventé** (règle du projet et pratique interdite par le droit de la consommation).
- **Réponse :** à tous les avis négatifs sous 48 h : remercier, s'excuser, proposer une solution en privé (même logique que la charte de modération dans [11-communication-social-media.md](11-communication-social-media.md)). Répondre aussi aux avis positifs, sans formule copiée-collée.
- **Fiche Google Business** à créer au lancement (S3 p.53).
