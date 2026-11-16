# UNIS : newsletters et relances automatiques

Complète [03-campagnes-emailing.md](03-campagnes-emailing.md). Sources de cours : E-gestion session 6 (types d'emails p.8-13, base de données p.27-39, moments clés p.47-56, légal p.65-68, KPI p.78, A/B test et landing page p.81-114, **tâche p.119 : 3 newsletters mensuelles avec chacune un article de blog différent + 5 relances automatiques**) ; Marketing Digital « Emailing » (10 commandements p.7-20, ratio texte/images 60/40 p.17, KPI p.21-24).

## Règles appliquées (les 10 commandements du cours)

1. **Liste fiable :** double opt-in, case non pré-cochée, lien de désinscription dans chaque email (S6 p.65-67). Pas de dark pattern (S6 p.68).
2. **Segmentation :** langue, coupe, propriétaire de Bo, membre du Club.
3. **Objet** < 45 caractères, testé en A/B sur 20 % de la liste.
4. **Pre-header** qui complète l'objet.
5. **Personnalisation :** prénom, Bo porte le motif de la saison.
6. **CTA** visible sans scroller, qui mène à la page de la saison ou de l'article (landing page dédiée, S6 p.81-114).
7. **Concision :** 80 à 150 mots, ratio texte/images 60/40.
8. **Contenu soigné :** relu dans les 4 langues.
9. **Automatisation** (trigger marketing) : les 5 relances ci-dessous.
10. **Tests :** rendu mobile, liens, UTM.

## 3 newsletters mensuelles (1 newsletter = 1 article du journal)

> Rendus HTML : `emails/01`, `emails/03` et `emails/04` (fusionnées avec les campagnes de décembre, janvier et février). Relances : `emails/17` à `emails/21`.

| | Newsletter 1 | Newsletter 2 | Newsletter 3 |
| --- | --- | --- | --- |
| Date | Mer. 2 déc. 2026 | Mer. 6 janv. 2027 | Mer. 3 févr. 2027 |
| Segment | Toute la liste FR | Toute la liste FR | Toute la liste FR, propriétaires de Bo en premier |
| Objet A | 4 cadeaux drôles à moins de 10 € | Ta taille, en 30 secondes | Pourquoi on ne dit jamais « pour lui » |
| Objet B | Secret Santa : Bo a une idée | Plat ou Poche ? On t'explique | Un string, tous les corps |
| Pre-header | Et ils arrivent avant le 24 décembre. | Mètre ruban, 3 étapes, zéro prise de tête. | Le drop Saint-Valentin sort aujourd'hui. |
| Article lié | [Idées cadeaux Secret Santa](../site/fr/journal/cadeau-secret-santa-drole/index.html) | [Bien choisir sa taille](../site/fr/journal/choisir-sa-taille-de-string/index.html) | [Unisexe : coupe plutôt que genre](../site/fr/journal/string-unisexe-coupe-pas-genre/index.html) |
| Corps (résumé) | Bo présente 4 idées de cadeaux à moins de 10 € : string 5 €, Duo 7 €, mini-string 3 €, lot de 5 (4 € par personne). Rappel : commande avant le jeudi 17 décembre. | 3 étapes pour mesurer ses hanches, le tableau XS–4XL, le retour sous 14 jours si le string n'est pas porté. | Le manifeste en 100 mots, puis le drop Cœurs brodés et Bo édition Cœur. |
| CTA | Voir les idées | Trouver ma taille | Découvrir le drop |
| KPI | Ouverture, clic, achats | Clic vers le guide, taux de retour | Ventes du drop à J+1 |

## 5 relances automatiques

| # | Déclencheur | Délai | Objet A | Contenu | CTA |
| --- | --- | --- | --- | --- | --- |
| 1 | Inscription (double opt-in confirmé) | Immédiat | Bienvenue, Bo t'attendait | Qui est Bo, les 2 coupes, le prochain drop, le Club | Voir le drop du moment |
| 2 | Panier abandonné | 1 h | Bo garde ton panier au chaud | Rappel des articles, livraison offerte dès 30 € | Reprendre mon panier |
| 3 | Panier abandonné, toujours pas d'achat | 24 h | Il reste encore des [motif] | Stock réel du drop (jamais d'urgence inventée) | Finaliser ma commande |
| 4 | Commande livrée | J+7 | Alors, ça te va ? | NPS en 1 clic + lien vers le guide des tailles et le Club de Bo | Donner mon avis |
| 5 | Aucun achat depuis 6 mois | 6 mois | Bo a changé de tenue | Les drops manqués + le drop en cours, 1 tampon offert au Club | Revenir voir Bo |

Relance d'anniversaire (moment clé, S6 p.47-56) en option : livraison offerte le mois de l'anniversaire.

## KPI (S6 p.78, MD p.21-24)

Taux de délivrabilité, d'ouverture, de clic, de désabonnement, de plainte, de conversion et chiffre d'affaires par email. Le cours ne donne pas de valeurs de référence lisibles : les objectifs seront fixés après 4 envois.
