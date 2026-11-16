# UNIS : audit d'accessibilité (WCAG 2.1 AA)

**Date :** 16 novembre 2026. **Pages :** les 25 pages FR (accueil, drops, Bo, Essentiels, tailles, aide, compte, contact, club, journal, pages légales), panier et bandeau cookies.
**Méthode :** contrôle automatique du HTML généré (script), mesures dans le navigateur (ordinateur et mobile 375 px), test du panier au clavier, calcul des contrastes de chaque palette.
**Limites :** pas de test avec un vrai lecteur d'écran (NVDA, VoiceOver). C'est à faire avant le lancement.

## Résumé

7 problèmes trouvés : 0 critique, 3 importants, 4 mineurs. **6 sont corrigés**, 1 reste à faire.

| # | Problème | Critère WCAG | Gravité | Statut |
| --- | --- | --- | --- | --- |
| 1 | Panier ouvert : le focus clavier pouvait sortir de la fenêtre et aller dans la page derrière | 2.4.3 Ordre du focus | 🟡 Important | ✅ Corrigé : la page derrière devient inerte tant que le panier est ouvert |
| 2 | Saut de titre h1 → h3 sur 7 pages (drops, Essentiels) : les lecteurs d'écran perdent la structure | 1.3.1 Information et relations | 🟡 Important | ✅ Corrigé : titre h2 « Les produits » (caché à l'écran, lu par les lecteurs d'écran) |
| 3 | Boutons + et − du panier de 36 px | 2.5.5 Taille de la cible | 🟡 Important | ✅ Corrigé : 44 px |
| 4 | Liens du pied de page (« Gérer les cookies », médiation) de 36 à 39 px de haut | 2.5.5 Taille de la cible | 🟢 Mineur | ✅ Corrigé : 44 px |
| 5 | Lien « Bo » du menu de 38 px de large | 2.5.5 Taille de la cible | 🟢 Mineur | ✅ Corrigé : 44 px minimum |
| 6 | Cases à cocher de 22 px | 2.5.8 Taille minimale (WCAG 2.2) | 🟢 Mineur | ✅ Corrigé : 24 px, et leur texte reste cliquable |
| 7 | Les messages d'erreur des formulaires sont annoncés poliment (`role="status"`) et le champ fautif n'est pas marqué `aria-invalid` | 3.3.1 Identification des erreurs | 🟢 Mineur | À faire : `role="alert"` pour les erreurs et `aria-invalid="true"` sur le champ |

## Ce qui est déjà conforme

- **Langue** déclarée sur chaque page (`lang="fr"`, `nl`, `en`, `de`).
- **Lien d'évitement** « Aller au contenu ».
- **Zones de la page** bien identifiées : en-tête, navigation, contenu principal et pied de page.
- **Images :** toutes les photos ont un texte alternatif dans les 4 langues ; les illustrations décoratives sont masquées aux lecteurs d'écran (`aria-hidden`).
- **Formulaires :** tous les champs ont une étiquette ; les cases de consentement ne sont jamais pré-cochées.
- **Boutons de couleur et de coupe** : chacun a un nom et un état actif ou inactif lisibles par les lecteurs d'écran (`aria-pressed`).
- **Focus visible** sur tous les éléments, avec un contour de 3 px de la couleur d'encre, jamais supprimé.
- **Panier :** il se présente comme une fenêtre de dialogue, le focus va sur « Fermer » à l'ouverture, la touche Échap le ferme et le focus revient au bouton d'ouverture.
- **Messages :** les messages temporaires (« Ajouté au panier », « Lien copié ») sont lus par les lecteurs d'écran sans couper la lecture en cours (`role="status"`).
- **Vidéo :** elle est muette, a des boutons de contrôle et ne se lance pas toute seule si l'appareil demande moins d'animations.
- **Mobile :** pas de défilement horizontal à 375 px, ce qui revient à un zoom de plus de 200 %.

## Contrastes

| Élément | Avant-plan | Fond | Ratio | Requis | OK ? |
| --- | --- | --- | --- | --- | --- |
| Texte, pages générales | Bordeaux `#3E031B` | Rose dragée `#FFE3EE` | 14,2:1 | 4,5:1 | ✅ |
| Bouton principal | Blanc | Framboise `#D42A6E` | 4,8:1 | 4,5:1 | ✅ |
| Texte, drop Noël | Bordeaux | Rose dragée | 14,2:1 | 4,5:1 | ✅ |
| Bouton, drop Noël | Blanc | Rouge `#C8372D` | > 4,5:1 (vérifié au build) | 4,5:1 | ✅ |
| Texte, Halloween | `#F3EEFF` | `#1C1726` | > 4,5:1 (vérifié au build) | 4,5:1 | ✅ |
| Bord du bouton orange sur fond bleu (drop Été) | `#FF6B2C` | `#E3F4FF` | 2,5:1 | 3:1 (composant) | ⚠️ Toléré : le texte du bouton suffit à l'identifier. À revoir si le bouton perd son texte |

La couleur d'accent ne sert jamais à écrire du texte : seulement en fond de bouton, en pastille ou en décoration.

## À faire avant le lancement

1. Corriger le point 7 (erreurs de formulaire).
2. Tester avec NVDA (Windows) et VoiceOver (iPhone) : achat d'un Duo, inscription à la liste d'attente, création de compte.
3. Rédiger la déclaration d'accessibilité, obligatoire pour l'e-commerce avec l'European Accessibility Act depuis le 28 juin 2025.
