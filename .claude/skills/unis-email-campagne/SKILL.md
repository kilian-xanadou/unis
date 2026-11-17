---
name: "unis-email-campagne"
description: "Rédige et met en forme un email marketing UNIS (newsletter, campagne de drop, relance automatique) : objet, pré-en-tête, texte, bouton, visuels, liens UTM et version HTML au style fanzine du site. À utiliser dès qu'on parle d'email, de newsletter, d'emailing, de relance de panier ou de séquence de bienvenue pour UNIS."
---

# Email marketing UNIS

Les emails existants sont dans `emails/` (21 fichiers HTML et un index) et leur plan dans `docs/03-campagnes-emailing.md` et `docs/10-emailing-newsletters.md`. Un nouvel email doit ressembler aux autres : même gabarit, même ton, même charte.

## 1. Cadrer

- **Type** : newsletter (conseil, contenu), campagne (drop, date limite, soldes) ou relance automatique (bienvenue, panier abandonné 1 h et 24 h, avis à J+7, réactivation à 6 mois).
- **Segment** : à qui il part (inscrits au Club de Bo, clients d'un drop, paniers abandonnés…) et pourquoi maintenant.
- **Une seule action principale** : un seul bouton, vers une seule page.

## 2. Écrire

- **Objet** : 40 caractères maximum, concret ou intrigant, sans majuscules partout ni « !!! ». Propose 3 variantes pour un test A/B.
- **Pré-en-tête** : 40 à 90 caractères, il complète l'objet au lieu de le répéter.
- **Corps** : un titre, 2 à 3 paragraphes courts, le bouton, puis une note manuscrite de Bo (courte, drôle, jamais une info clé). Tutoiement.
- **Prix et règles** exacts : string 5 €, mini-string 3 €, Duo 7 €, lot de 5 à 20 €, Bo 49 €, livraison 3,90 € et offerte dès 30 €, retour 14 jours si non porté et étiquette d'hygiène intacte.
- **Réduction** : affiche le prix le plus bas des 30 derniers jours (directive Omnibus).
- **Liens** : chaque lien porte `utm_source=newsletter&utm_medium=email&utm_campaign=<aaaa-mm-nom>`.

## 3. Mettre en forme

- Copie la structure d'un email proche dans `emails/` (tableaux, largeur 600 px, styles en ligne) pour rester compatible avec Gmail et Outlook.
- Charte : fond rose dragée `#FFE3EE`, texte bordeaux `#3E031B`, bouton framboise `#D42A6E` avec texte blanc, ombre décalée « fanzine ». Visuels en JPG de 600 px dans `assets/emailing/`.
- Chaque image a un texte alternatif ; l'email reste compréhensible images bloquées.
- Pied de page obligatoire : lien de désinscription, adresse de l'entreprise, raison de la réception (RGPD).
- Ajoute la ligne de l'email dans `emails/index.html`.

## 4. Vérifier avant de livrer

- Longueur de l'objet et du pré-en-tête comptée avec un script.
- Jours de la semaine des dates vérifiés avec un script.
- Tous les liens pointent vers une page qui existe sur le site (`site/`).
- Aucun envoi réel : demande toujours avant d'envoyer ou de programmer quoi que ce soit.

Livre l'objet (3 variantes), le pré-en-tête, le texte, le fichier HTML et l'heure d'envoi conseillée. Traductions NL, EN (« thong »), DE à faire relire par une personne native.
