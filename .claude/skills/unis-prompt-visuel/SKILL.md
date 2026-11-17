---
name: "unis-prompt-visuel"
description: "Écrit les prompts d'IA d'image pour les visuels UNIS (strings posés à plat, Bo en studio, Bo dans la vraie vie, emballage, réseaux), vérifie les images reçues et les met en ligne (WebP, textes alternatifs en 4 langues, placement sur le site). À utiliser dès qu'on parle de photo, visuel, image, prompt Midjourney/DALL·E ou d'images manquantes pour UNIS."
---

# Visuels UNIS : prompts, vérification et mise en ligne

Les prompts déjà écrits sont dans `docs/14-prompts-27-images.md`, la charte dans `design.md` (§7, direction « fanzine »). L'image de référence de Bo est `assets/reference/bo-reference.jpg`.

## 1. Choisir le style

- **Fiche produit** (Google Shopping, cartes du site) : fond blanc pur, vue de dessus, lumière douce, couleurs fidèles, format 1:1.
- **Ambiance** (histoire de Bo, accueil, emails, Instagram) : « photo de téléphone » avec grain, flash direct ou lumière de fenêtre, vrai appartement d'adulte un peu en désordre, cadrage imparfait, format 4:5 (9:16 pour les stories). C'est ce qui évite l'effet « image IA ».

## 2. Écrire le prompt (en anglais, prêt à copier)

- Décris le sujet, la matière, la couleur en hexadécimal, le décor, la lumière, le cadrage, puis `--ar` et une liste `--no`.
- **Bo** : `a 35 cm honey-brown plush teddy bear (fur #C98B4B), lighter tan muzzle, round glossy black button eyes, small dark-brown stitched nose, gentle smile, NO eyebrows`, nœud satiné de la couleur de la saison. Commence par « Use the attached teddy bear as the exact character reference » et rappelle de joindre l'image de référence.
- **String** : `unisex cotton thong with a wide soft elastic waistband`, motif et couleur exacts du drop (voir `src/data.mjs`). Mini-string : `tiny thong sized for a 35 cm teddy bear`.
- **Toujours dans `--no`** : `text, letters, logo, brand name, watermark, children, kids, toys, eyebrows, explicit, nudity`.
- Donne un titre en français et l'emplacement prévu sur le site pour chaque prompt.

## 3. Vérifier une image reçue

Refuse ou signale l'image si : Bo a des sourcils ; un texte, un logo ou une marque est lisible ; un enfant ou un décor d'enfant apparaît ; la couleur ou le motif ne correspond pas au produit ; des visages nets d'inconnus sont visibles ; une main ou un objet est déformé. Signale aussi les petits défauts acceptables pour que la personne décide.

## 4. Mettre en ligne

1. Convertis en WebP 600 px et 1200 px de large, moins de 150 Ko chacun (`sharp`), dans `assets/images/`, nommés en français avec des tirets (`string-unisexe-ete-citron-plat-600.webp`). Le grand format s'appelle toujours `-1200.webp`.
2. Ajoute l'entrée dans `PHOTOS` de `src/photos.mjs` : `file`, `sizes` (largeur et hauteur réelles), `alt` en FR, NL, EN, DE (8 à 15 mots, ce qu'on voit).
3. Place-la dans `PLACEMENT` (carte produit par SKU, page saison, histoire de Bo, quiz, guide des tailles…).
4. `node src/build.mjs`, puis vérifie la page dans l'aperçu local (`.claude/launch.json`, serveur « unis »).
5. Mets à jour `docs/14-prompts-27-images.md` (ce qui est fait, ce qui manque).
