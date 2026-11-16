# UNIS : prompts photo et vidéo pour IA générative

À coller dans une IA d'image (Midjourney, DALL·E, Firefly, Ideogram, Flux…) ou de vidéo (Sora, Runway, Kling, Veo…). Les prompts sont **en anglais**, car ces outils les comprennent mieux ; une ligne en français explique chaque visuel.

Respecte toujours [CONTEXTE-IA.md](../CONTEXTE-IA.md) : drôle, confortable, sexy, **jamais d'enfants**, aucune marque ou personnage d'autrui.

---

## 0. Les deux blocs à ne jamais modifier

### Bo (à garder identique dans tous les prompts, pour un personnage reconnaissable)

Dans les prompts ci-dessous, **remplace `[BO]` par ce bloc**, mot pour mot. Remplace aussi `[SEASON COLOR]`, `[MOTIF]`, `[PROP]`, `[CUT]` et `[SEASON BACKGROUND]` avec les tableaux fournis. Si l'outil le permet, génère d'abord une image de référence de Bo et réutilise-la (« character reference ») pour toutes les suivantes.

> `Bo, a 35 cm honey-brown plush teddy bear (fur color #C98B4B), lighter tan muzzle and inner ears, round glossy black button eyes, small dark-brown stitched nose, gentle closed-mouth smile, soft short plush fur, NO eyebrows, a small satin bow tied around the neck`

Pourquoi « NO eyebrows » : plusieurs photos reçues montrent un ours avec des sourcils clairs, qui ressemble à un personnage de film protégé. Bo doit avoir sa propre tête.

### À ajouter à la fin de chaque prompt (négatif)

> `--no children, kids, toys for kids, nursery, school, text, letters, words, logos, brand names, watermark, famous characters, real celebrities, eyebrows, explicit, nudity, sexual pose, lingerie model, human genitals`

(Dans les outils sans `--no`, colle-le dans le champ « negative prompt », ou ajoute « Avoid: … » à la fin.)

### Formats à demander

| Usage | Format | Paramètre |
| --- | --- | --- |
| Bandeau d'accueil (ordinateur) | 16:9 | `--ar 16:9` |
| Bandeau d'accueil (mobile), fiche produit | 4:5 | `--ar 4:5` |
| Carré produit, post Instagram | 1:1 | `--ar 1:1` |
| Story, Reel, TikTok | 9:16 | `--ar 9:16` |
| En-tête d'email | 2:1 | `--ar 2:1` |

Après génération : convertir en WebP < 150 Ko, nommer selon `docs/04-seo.md` et déposer dans `assets/images/`. Je m'occupe de l'intégration.

---

## 1. Ce qui manque (par priorité)

| # | Visuel | Pourquoi | Statut |
| --- | --- | --- | --- |
| 1 | **Strings à plat, un par motif** (17 motifs + 6 Essentiels) | Image principale de chaque fiche produit (règle des régies pub) | Manquant |
| 2 | **Bo de face, fond blanc, par saison** (Printemps, Pride, Été) | Page saison et carte « Bo » | Manquant |
| 3 | **Packaging** : pochette kraft, boîte de Bo, certificat numéroté | Réassurance, « ce qu'il y a dans la boîte » | Manquant |
| 4 | **Coupe Plat vs Poche** côte à côte | Guide des tailles, FAQ | Manquant |
| 5 | **Mesure du tour de hanches** (schéma ou mains + mètre ruban) | Guide des tailles | Manquant |
| 6 | **Bannières d'accueil** 16:9 et 4:5 par saison | Accueil | Partiel (Noël, Halloween) |
| 7 | **Duo** : string adulte + Bo assortis | Produit le plus vendu | Manquant |
| 8 | **Moments cadeau** (adultes, mains seulement) | Persona « cadeau fun » | Manquant |
| 9 | **En-têtes d'email** 2:1 par campagne | Emailing | Partiel |
| 10 | **Vidéos courtes** 9:16 (voir section 4) | Réseaux sociaux, pubs | Manquant |

---

## 2. Photos de Bo

### 2.1 Bo de face, fond blanc (catalogue), une par saison

*Bo debout, de face, fond blanc uni : image de référence de chaque saison.*

**Prompt A, studio net**
> `Studio product photo of [BO] in [SEASON COLOR] bow, standing upright facing camera, wearing a tiny [MOTIF] thong, seamless pure white background, soft diffused softbox light from the left, subtle floor shadow, sharp focus, 85mm lens, e-commerce catalog style, playful and charming --ar 4:5`

**Prompt B, pose fun**
> `Playful studio photo of [BO] in [SEASON COLOR] bow, mid-dance with one leg raised and arms open, wearing a tiny [MOTIF] thong, plain white background, bright even light, crisp details on the plush fur, joyful, humorous, high-end toy photography --ar 4:5`

**Prompt C, clin d'œil complice**
> `Close-up portrait of [BO] in [SEASON COLOR] bow, head slightly tilted, holding a small seasonal prop [PROP], wearing a [MOTIF] thong, white background, warm soft light, shallow depth of field, cheeky and friendly mood --ar 1:1`

À remplacer :

| Saison | [SEASON COLOR] | [MOTIF] | [PROP] |
| --- | --- | --- | --- |
| Printemps | lavender purple | pastel lilac with small white four-petal flowers | a small bunch of tulips |
| Pride | magenta | six horizontal rainbow stripes (red, orange, yellow, green, blue, violet) | a small rainbow flag on a stick |
| Été | bright orange | blue with light-blue wave pattern | tiny sunglasses and a lemon |
| Saint-Valentin | red | red with small white embroidered hearts | a single red rose |
| Halloween | orange | dark plum with small white ghosts | a carved pumpkin |
| Noël | deep red | pine green with small gold Christmas trees | a red Santa hat on the head |
| Octobre Rose | raspberry pink | light pink with small raspberry-pink ribbon symbols | a small pink ribbon pin |

### 2.2 Bo en situation (réseaux sociaux, emails)

*Bo dans un décor adulte de la saison : chambre d'adulte, salon, terrasse. Jamais de chambre d'enfant.*

**Prompt A, selfie miroir**
> `[BO] in [SEASON COLOR] bow taking a mirror selfie with a phone in a stylish adult apartment decorated for [SEASON], wearing a [MOTIF] thong, warm fairy lights, cozy and fun, smartphone photo aesthetic, natural colors --ar 9:16`

**Prompt B, canapé cocooning**
> `[BO] in [SEASON COLOR] bow lounging on a soft sofa with a knitted blanket, wearing a [MOTIF] thong, cozy [SEASON] living room for adults, warm golden-hour light, lifestyle photography, comfortable and cheeky --ar 4:5`

**Prompt C, extérieur**
> `[BO] in [SEASON COLOR] bow sitting on a terrace chair outdoors in [SEASON] setting, wearing a [MOTIF] thong, natural daylight, lifestyle editorial photo, playful, adults-only aesthetic --ar 4:5`

---

## 3. Photos produit et marque

### 3.1 String à plat (fiche produit, image principale)

*Le string seul, posé à plat, vu du dessus. C'est l'image que Google Shopping et les régies acceptent.*

**Prompt A, à plat fond blanc**
> `Flat lay product photo of a single unisex cotton thong, [CUT], fabric printed with [MOTIF], laid perfectly flat on a seamless white background, top-down view, soft even lighting, true-to-life colors, visible soft cotton texture, wide comfortable waistband, e-commerce product shot --ar 1:1`

**Prompt B, fond couleur de saison**
> `Top-down flat lay of a unisex cotton thong, [CUT], printed with [MOTIF], centered on a smooth [SEASON BACKGROUND] paper background, minimal styling, soft shadow, premium but playful product photography --ar 4:5`

**Prompt C, détail matière**
> `Macro close-up of the fabric of a cotton thong printed with [MOTIF], soft cotton texture and wide elastic waistband in focus, shallow depth of field, clean light --ar 1:1`

[CUT] :
- Plat : `flat front cut, smooth fitted front panel`
- Poche : `pouch front cut, shaped three-piece front panel with extra room`

[SEASON BACKGROUND] : lilas pâle `pale lilac #EFEAFF`, rose `blush pink #FFE9EE`, vert Noël `pale sage #EAF2EC`, bleu été `light sky blue #E3F4FF`, Halloween `dark plum #1C1726`.

### 3.2 Les Essentiels (6 couleurs)

> `Flat lay of six unisex cotton thongs arranged in a neat fan, colors: ink navy #1B1B3A, lilac #C8B6FF, coral #FF5A4E, sand #D9C3A5, cocoa brown #5A3A2E, off-white #F7F7F2, seamless white background, top-down, soft light, minimal e-commerce style --ar 4:5`

> `Six cotton thongs in ink navy, lilac, coral, sand, cocoa and off-white, neatly rolled and lined up in a kraft paper box, top-down, natural light, clean Scandinavian product styling --ar 1:1`

### 3.3 Le Duo (string adulte + mini-string de Bo)

> `Flat lay of a matching duo: one adult unisex cotton thong and one tiny thong sized for a teddy bear, both printed with [MOTIF], side by side on white background, [BO] in [SEASON COLOR] bow sitting next to them looking at them, top-down three-quarter view, playful product photography --ar 4:5`

> `[BO] in [SEASON COLOR] bow holding up an adult-size thong printed with [MOTIF] with a surprised happy face, while wearing the tiny matching one, white studio background, humorous product shot --ar 1:1`

### 3.4 Coupe Plat vs Poche

> `Two unisex cotton thongs side by side on white background, left one with a smooth flat fitted front, right one with a shaped pouch front, same solid lilac color #C8B6FF, same wide soft waistband, top-down technical product photo, clean and clear comparison --ar 16:9`

> `Clean vector-style illustration comparing two thong cuts, flat front versus pouch front, outlined in navy #1B1B3A with lilac fill, minimalist infographic style, white background, no text --ar 16:9`

### 3.5 Packaging

**Pochette kraft (format boîte aux lettres)**
> `A slim recycled kraft paper mailer envelope sealed with a round coral sticker, a folded thong in pastel tissue paper peeking out, on a light wooden table, natural daylight, eco-friendly unboxing aesthetic --ar 4:5`

**Boîte de Bo**
> `A pale lilac gift box #EFEAFF with a clear window showing [BO] in red bow inside, a small numbered certificate card and a gift tag beside it, white background, soft studio light, premium collectible packaging --ar 4:5`

**Boîte de Bo, version corrigée (sans aucun texte)** : la première image reçue portait un faux nom de marque (« Lollethor's ») et un certificat au texte illisible. Ce prompt l'évite ; on ajoutera le logo UNIS au montage.
> `A completely blank pale lilac gift box #EFEAFF with a large clear front window, plain smooth surfaces with only a thin silver embossed border, absolutely no text, no letters, no logo, no brand name anywhere on the box; inside the window [BO] in red bow wearing a Santa hat and a small red thong with a reindeer print; beside the box a plain cream card with a thin navy border and no writing, and a small blank lilac tag on a red ribbon; seamless white background, soft studio light, premium collectible packaging photo --ar 4:5 --no text, letters, words, logo, brand name, writing, typography`

**Certificat numéroté**
> `Close-up of an elegant cream certificate card with a navy border and an embossed bear paw seal, a handwritten-style serial number area left blank, on a lilac surface, soft light --ar 1:1`

### 3.6 Guide des tailles

> `Adult hands measuring the widest part of the hips over plain grey leggings with a soft yellow tape measure, neutral background, clean lifestyle photo, inclusive and body-positive, cropped from waist to thighs, no face --ar 4:5`

> `Minimal flat illustration of a soft tape measure wrapped around a simple body silhouette at hip level, navy and coral colors, white background, no text, no gender cues --ar 1:1`

### 3.7 Moments cadeau (adultes, mains seulement)

> `Close-up of adult hands exchanging a small wrapped gift with a coral ribbon at a festive dinner table with friends, warm bokeh lights, laughter mood, faces out of frame, Secret Santa vibe --ar 4:5`

> `Adult hands opening a kraft mailer to reveal a playful printed thong, confetti on the table, friends laughing in blurred background, candid party photo, warm light --ar 4:5`

### 3.8 Bannières d'accueil

> `Wide hero banner: [BO] in [SEASON COLOR] bow standing on the right third of the frame wearing a [MOTIF] thong, large empty space on the left for text, [SEASON BACKGROUND] seamless background, soft studio light, clean and modern --ar 16:9`

> `Vertical hero: [BO] in [SEASON COLOR] bow centered in the lower half, wearing a [MOTIF] thong, empty top area for headline, [SEASON BACKGROUND] background --ar 4:5`

### 3.9 En-têtes d'email

> `Email header: [BO] in [SEASON COLOR] bow peeking in from the right edge, wearing a [MOTIF] thong, plain [SEASON BACKGROUND] background, lots of empty space on the left, bright friendly lighting --ar 2:1`

---

## 4. Vidéos (9:16, 9 à 20 secondes)

Règles du cours (Vidéo RS) : **message et Bo dans les 3 premières secondes**, compréhensible **sans le son** (sous-titres), logo discret, son tendance si possible. Les textes à l'écran sont ajoutés au montage (CapCut, Canva), **pas générés par l'IA** (elle écrit mal).

### 4.1 « Bo révèle le drop » (lancement de chaque saison, 12 s)

| Plan | Durée | Image | Texte à l'écran |
| --- | --- | --- | --- |
| 1 | 0–3 s | Bo de dos, la tête tournée vers la caméra, clin d'œil | « Nouveau drop. » |
| 2 | 3–7 s | Bo se retourne d'un coup, il porte le nouveau motif | « [Nom du motif] » |
| 3 | 7–10 s | Gros plan sur le string à plat, puis sur le Duo | « 5 € · Duo 7 € » |
| 4 | 10–12 s | Bo fait coucou | « Série limitée. Lien en bio. » |

**Prompts vidéo**
- Plan 1 : `Vertical video, [BO] in [SEASON COLOR] bow seen from behind in a [SEASON BACKGROUND] studio, turns his head over his shoulder toward camera and winks, playful, smooth camera, 3 seconds`
- Plan 2 : `Vertical video, [BO] in [SEASON COLOR] bow spins around energetically to face camera revealing a [MOTIF] thong, confetti falls, bright studio light, joyful, 4 seconds`
- Plan 3 : `Vertical video, slow top-down dolly over a flat-lay cotton thong printed with [MOTIF] on white background, then a tiny matching thong slides into frame, 3 seconds`
- Plan 4 : `Vertical video, [BO] in [SEASON COLOR] bow waves both paws at camera and does a little hop, white background, cheerful, 2 seconds`

### 4.2 « Plat ou Poche en 10 secondes » (éducatif, 10 s)

| Plan | Image | Texte à l'écran |
| --- | --- | --- |
| 0–2 s | Bo se gratte la tête devant deux strings | « Plat ou Poche ? » |
| 2–5 s | Gros plan string Plat | « Plat : avant lisse, ligne nette » |
| 5–8 s | Gros plan string Poche | « Poche : avant préformé, plus de place » |
| 8–10 s | Bo pointe les deux | « Pas de genre. Juste ta coupe. » |

- `Vertical video, [BO] in lilac bow scratches his head looking puzzled at two thongs on a table, white studio, humorous, 2 seconds`
- `Vertical video, slow push-in on a flat-front unisex cotton thong in lilac on white background, soft light, 3 seconds`
- `Vertical video, slow push-in on a pouch-front unisex cotton thong in lilac on white background, soft light, 3 seconds`
- `Vertical video, [BO] in lilac bow points at both thongs alternately and gives a thumbs up, 2 seconds`

### 4.3 Déballage (unboxing, 15 s)

- `Vertical POV video, adult hands open a slim kraft mailer on a wooden table, pull out a thong in tissue paper, then a lilac gift box with a teddy bear visible through the window, natural daylight, satisfying ASMR unboxing, 15 seconds`

Texte : « Ça rentre dans ta boîte aux lettres » → « Bo dans sa boîte » → « Livraison offerte dès 30 € ».

### 4.4 Secret Santa (Noël, 12 s)

- Plan 1 : `Vertical video, festive adult dinner with friends, a wrapped gift is passed around the table, warm bokeh, faces partially out of frame, 3 seconds`
- Plan 2 : `Vertical video, adult hands unwrap the gift revealing [BO] in red bow wearing a green thong with gold tree print, everyone laughs (blurred), 5 seconds`
- Plan 3 : `Vertical video, [BO] in red bow with Santa hat on a table among Christmas decorations, gives a wink, 4 seconds`

Texte : « Ton Secret Santa à moins de 10 € » → « Le Duo à 7 € » → « Commande avant le 17 décembre ».

### 4.5 Octobre Rose (15 s, ton sincère)

- Plan 1 : `Vertical video, [BO] in raspberry-pink bow wearing a light pink thong with a small pink ribbon symbol, raises a golden trophy with both paws, plain white background, uplifting, 4 seconds`
- Plan 2 : `Vertical video, close-up of a pink ribbon pin on a soft pink fabric, gentle slow motion, soft light, 3 seconds`
- Plan 3 : `Vertical video, [BO] in raspberry-pink bow places a paw on his heart, calm and warm mood, white background, 4 seconds`

Texte : « Octobre Rose » → « 1 € reversé par article » → « Le dépistage concerne tous les corps. » (+ mention du partenariat tel qu'il est réellement).

### 4.6 Rendez-vous #BoDuJeudi (série hebdo, 6–9 s)

Une situation drôle par semaine, toujours dans un décor adulte :
- `Vertical video, [BO] in coral bow sitting at a laptop on a desk in a home office, sipping from a tiny mug, then looks at camera surprised, morning light, humorous, 6 seconds`
- `Vertical video, [BO] in coral bow on a yoga mat attempting a stretch and tipping over softly, bright living room, funny, 6 seconds`
- `Vertical video, [BO] in coral bow in a laundromat watching a washing machine spin with colorful thongs inside, playful, 8 seconds`

---

## 5. Checklist avant de valider un visuel

- [ ] Bo a la même tête que d'habitude : couleur miel, yeux noirs ronds, pas de sourcils, nœud au cou.
- [ ] Aucun enfant, aucune chambre d'enfant, aucun jouet d'enfant.
- [ ] Aucun texte généré par l'IA dans l'image (on l'ajoute au montage), aucun logo ou marque.
- [ ] Le motif du string correspond à un produit qui existe (voir `src/data.mjs`).
- [ ] Rien d'explicite : drôle et coquin, jamais vulgaire.
- [ ] Format adapté à l'usage (tableau de la section 0).
- [ ] Les humains éventuels sont adultes, sans visage reconnaissable, ou avec leur accord écrit.
