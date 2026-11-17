---
name: "unis-verif-marque"
description: "Relit un texte, une page, un email, un post ou un visuel UNIS avant publication et signale tout écart : ton, genre, âge (18+), prix, règles légales (Omnibus, RGPD, composition textile), accessibilité, longueurs SEO et cohérence des 4 langues, avec une correction proposée pour chaque point. À utiliser dès qu'on demande de relire, vérifier, valider ou contrôler un contenu UNIS avant de le publier."
---

# Vérifier un contenu UNIS avant publication

Les règles viennent de `CLAUDE.md`, `CONTEXTE-IA.md`, `design.md`, `docs/02-marque.md` et `docs/18-audit-accessibilite.md`. En cas de conflit, `CONTEXTE-IA.md` prime.

## Ce qu'on contrôle

**Marque et ton**
- Tutoiement (« tu », « je », « you », « du »), direct, chaleureux, drôle sans vulgarité.
- Jamais « pour homme », « pour femme », « pour lui », « pour elle » : on parle de coupe (Plat ou Poche) et de tour de hanches.
- Nom de la marque : UNIS, en capitales. En anglais : « thong », jamais « string ».

**Bo et l'âge**
- Bo est un objet de collection pour adultes, 18 ans et plus. Aucun enfant, aucun décor ou mot lié à l'enfance (« doudou », « chambre d'enfant », « jouet »).
- Pas de mention « 14 ans » ni de marquage CE sur les fiches de Bo.
- Sur un visuel : Bo sans sourcils, aucun texte, logo ou marque lisible.

**Chiffres et légal**
- Prix exacts : string 5 €, mini-string 3 €, Duo 7 €, lot de 5 à 20 €, Bo 49 €, coffret 55 €, livraison 3,90 € offerte dès 30 €.
- Toute réduction affiche le prix le plus bas des 30 derniers jours (Omnibus).
- Composition sur les strings : coton 95 %, élasthanne 5 %, OEKO-TEX Standard 100.
- Aucun avis client, chiffre de vente, volume de recherche ou stock inventé. Octobre Rose : le don à Think Pink est « prévu », jamais présenté comme déjà versé.
- Emails : lien de désinscription et raison de la réception (RGPD).

**Accessibilité et SEO**
- Contraste du texte d'au moins 4,5:1, texte alternatif sur chaque image, boutons d'au moins 44 px.
- Title de moins de 60 caractères, meta description de 120 à 155 caractères (compte avec un script).
- Dates : jour de la semaine vérifié avec un script.

**Langues**
- Les 4 versions disent la même chose (mêmes prix, mêmes dates, même offre). Signale ce qui doit être relu par une personne native.

## Comment rendre le résultat

Un tableau trié par gravité :

| Gravité | Où | Problème | Correction proposée |
| --- | --- | --- | --- |
| Bloquant | … | … | … |
| À corriger | … | … | … |
| Suggestion | … | … | … |

« Bloquant » = illégal, faux ou contraire à une décision de l'équipe (âge, genre, prix, faux avis). Termine par un verdict en une ligne : « Prêt à publier », « Prêt après corrections » ou « À reprendre ». Ne corrige les fichiers que si on te le demande.
