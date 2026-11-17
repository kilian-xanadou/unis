# Publications Instagram UNIS

16 publications, une par envoi de [docs/03-campagnes-emailing.md](../docs/03-campagnes-emailing.md), même message, même offre, même date. Chacune comprend un post 4:5 (ou un carrousel de 3 à 5 vignettes), une story 9:16 avec un sticker, une légende, des textes alternatifs, une heure conseillée, un segment et deux liens UTM (`utm_source=instagram&utm_medium=social&utm_campaign=<nom de l'email>`, `utm_content=feed` ou `story`).

| Fichier | Rôle |
| --- | --- |
| `index.html` | Page d'aperçu, à ouvrir dans un navigateur (images en `../assets/...`) |
| `publications.mjs` | Les données : textes, images, stickers. **C'est ici qu'on modifie** |
| `bonus.mjs` | Les 9 **contenus bonus** (Reels et TikTok) inspirés de la veille réseaux sociaux du 17/11/2026 : Bo répond, Le défilé de 35 cm, Matche ta moitié, Ambassadeurs, Compteur Octobre Rose, L’étagère des drops, Pas des chaussettes, #TuAsÉtéUNIS, Bo en Europe. Affichés en bas de `index.html` |
| `reels/` | Les 9 Reels MP4 1080×1920 sans son (+ affiches), lisibles et téléchargeables sur la page. Ajouter un son de la bibliothèque commerciale au moment de publier |
| `extras.mjs`, `a-la-une/`, `pinterest/` | Les 5 couvertures de stories à la une et les 5 épingles Pinterest (titre, description, lien UTM, texte alternatif) |
| `build.mjs` | Régénère `index.html` et bloque les erreurs (prix, « pour homme/femme », don sans « en cours de discussion », réduction sans prix des 30 jours, hashtags, images interdites) |
| `check.mjs` | Vérifie le HTML (balises, id), les images, les liens vers les emails et les UTM |

```sh
node insta/build.mjs   # depuis le dossier unis/
node insta/check.mjs
```

## Publier (à la main, rien n'est publié automatiquement)

1. **Copier la légende** avec le bouton, la coller dans Instagram.
2. Mettre le lien « Lien bio (post) » dans la bio le jour même (les liens ne sont pas cliquables dans les légendes).
3. Coller le texte alternatif (Paramètres avancés > Accessibilité).
4. Pour la story : ajouter **dans l'application** le sticker décrit (sondage, quiz, compte à rebours) et le sticker lien avec l'UTM « story ». Les cadres pointillés de la maquette montrent seulement l'emplacement.
5. Les publications « mode démo » tombent avant le lancement commercial (avril 2027) : démonstration ou liste d'attente seulement.

## Exporter les visuels en 1080 × 1350 et 1080 × 1920

1. Ouvrir `index.html?export` (par exemple via un petit serveur local lancé depuis `unis/`, ou en ajoutant `?export` à l'adresse du fichier). Chaque visuel s'affiche à 1080 px de large, sans maquette ; les zones de sticker sont vides.
2. Chrome ou Edge : F12 > sélectionner un bloc `.vis` > clic droit > **Capture node screenshot**. Vérifier que le zoom du navigateur est à 100 % : on obtient 1080 × 1350 (post) ou 1080 × 1920 (story).
3. Attendre le chargement des polices (Google Fonts) avant la capture.

Les photos `assets/emailing/*.jpg` ne font que 600 px de large : elles seront agrandies en 1080. Pour un rendu net, les remplacer par des originaux plus grands.

Versions NL, EN (« thong », jamais « string ») et DE : à faire, puis relire par une personne native.
