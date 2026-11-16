# UNIS : satisfaction et fidélisation (CRM)

Sources de cours : E-gestion session 5 (objectifs p.38-46, mécaniques p.49-58, récompenses p.59, 8 étapes p.61, NPS p.66-67, enquêtes p.8-30, tâche p.89) ; Marketing Digital (acquérir un client coûte 6 à 7 fois plus que le fidéliser, CJ p.10).

## Le Club de Bo

Le programme de fidélité colle au modèle « razor-and-blades » : on adopte Bo une fois, puis on revient à chaque drop.

### Objectifs (S5 p.38-46)

| Objectif du cours | Application UNIS |
| --- | --- |
| Mieux connaître les clients | Segment RFM (récence, fréquence, montant) + coupe, taille, langue |
| Vendre plus et plus cher | Pousser le Duo (7 €) et le coffret (55 €), dépasser le seuil de 30 € |
| Rentabilité | Faire acheter les 6 drops plutôt qu'un seul |
| Lutter contre le churn | Relance après 6 mois sans achat |
| Part du portefeuille client | Devenir LA marque de sous-vêtements « cadeau et fun » |

### Mode d'adhésion

Gratuit, automatique au premier achat, avec opt-in séparé pour les emails (case non pré-cochée, S6 p.65). Pas de compte obligatoire pour acheter (e-Commerce p.88) : le Club est lié à l'adresse email.

### Mécanique : le carnet de saisons (cartes à tampons dématérialisées, S5 p.49-58)

- 1 tampon par drop acheté (au moins un article de la saison).
- **3 tampons** : un mini-string pour Bo offert à la commande suivante.
- **6 tampons (les 6 saisons d'une année)** : le **Bo de l'édition suivante à moitié prix** et un certificat « Collectionneur ».
- Propriétaires de Bo : accès au drop **24 h avant** tout le monde (comme la liste d'attente) et vote pour un motif de l'année suivante.
- Note du cours (S5 p.51) : pour les cartes à tampons, la TVA belge impose de conserver les cartes remplies. Ici le carnet est numérique, donc l'historique est gardé dans le CRM.

### Récompenses (S5 p.59)

Récompenses en produit plutôt qu'en remise (UNIS ne casse pas ses prix) : mini-string offert, Bo à moitié prix, accès anticipé, vote, carte d'anniversaire de Bo (un mail le jour de l'anniversaire du client avec la livraison offerte).

### Mise en place en 8 étapes (S5 p.61)

1. Fixer les objectifs ci-dessus et leurs KPI.
2. Choisir la mécanique (carnet de saisons).
3. Définir les récompenses et leur coût (un mini-string revient à 0,60 € d'achat).
4. Choisir l'outil (CRM de la plateforme e-commerce + Klaviyo ou Brevo).
5. Rédiger le règlement (à faire valider par le juriste).
6. Former l'équipe et préparer les réponses du service client.
7. Lancer avec un email aux clients existants et une page sur le site (`/fr/club/`).
8. Mesurer et ajuster chaque trimestre.

## Mesure de la satisfaction

- **NPS** (S5 p.66-67) : « Sur une échelle de 0 à 10, recommanderais-tu UNIS à un·e ami·e ? » envoyé 7 jours après la livraison. NPS = % de promoteurs (9-10) − % de détracteurs (0-6).
- **Enquête courte** : moins de 15 min (S5 p.30), en pratique 3 questions : NPS, « Qu'est-ce qui t'a fait rire ou déçu ? », « Ta taille était-elle juste ? ».
- **Avis produits** : demande d'avis 21 jours après l'achat (déjà prévu dans [03-campagnes-emailing.md](03-campagnes-emailing.md)). Réponse à tous les avis négatifs sous 48 h (S3 p.37). **Aucun avis inventé** : le bloc d'avis du site s'ouvrira avec les premières commandes.

## Base de données clients (S6 p.27-39)

Champs : email, prénom, langue, pays, date et source du consentement, double opt-in confirmé (oui/non), coupe et taille préférées, propriétaire de Bo (oui/non), tampons du carnet, date de dernier achat, nombre de commandes, montant total, segment RFM, date d'anniversaire (facultative). Dédoublonnage par email à chaque import.

## KPI de fidélisation

Taux de réachat à 6 mois · part des clients avec 3 tampons et plus · panier moyen des membres vs non-membres · NPS · taux de churn · LTV, à comparer au coût d'acquisition (CAC < LTV, e-Commerce p.110-120).
