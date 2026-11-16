# Visuels du site

Dépose ici les photos du site. Elles sont copiées dans `site/assets/images/` à chaque build.

## Règles (docs/04-seo.md)

- Format **WebP**, moins de **150 Ko**, 1600 px de large au maximum.
- Noms de fichiers en minuscules, sans accents, avec des tirets :
  - `bo-ours-unis-<saison>.webp` (ex. `bo-ours-unis-noel.webp`)
  - `string-unisexe-<saison>-<motif>-<coupe>.webp` (ex. `string-unisexe-noel-rennes-disco-plat.webp`)
  - `string-unisexe-essentiel-<couleur>-<coupe>.webp`
- Image principale de chaque produit : **Bo qui porte le motif**, ou le **string à plat**. Pas de photo portée en image principale (les régies publicitaires les refusent souvent).
- Jamais d'enfants, de chambre d'enfant ni de jouets dans le décor.
- Texte Alt traduit dans les 4 langues, 8 à 15 mots, à fournir avec chaque photo.

Tant qu'il n'y a pas de photos, le site utilise les illustrations SVG générées dans `src/art.mjs`.
