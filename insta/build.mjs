// Génère insta/index.html à partir de insta/publications.mjs.
// Usage (depuis le dossier unis/) : node insta/build.mjs
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { PUBLICATIONS, SITE } from "./publications.mjs";
import { BONUS } from "./bonus.mjs";
import { A_LA_UNE, PINS } from "./extras.mjs";

const here = dirname(fileURLToPath(import.meta.url));

// ── Contrôles de contenu (échouent bruyamment) ──────────────────────
const JOURS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const INTERDITES = ["email-octobre-rose-bo.jpg", "bo-ours-unis-octobre-rose-600", "bo-ours-unis-octobre-rose-1200", "email-halloween-bo-dos-a.jpg", "email-noel-bo-dos-a.jpg", "email-noel-bo-dos-b.jpg", "email-je-taime-mon-nounours.jpg"];
const PRIX_OK = new Set(["3", "5", "7", "20", "49", "55", "3,90", "30", "4", "17", "3,50", "5,60", "14", "10", "1"]); // 1 € = projet de don par article
const errors = [];

function frDate(iso) {
  const d = new Date(iso + "T12:00:00Z");
  const j = d.getUTCDate();
  return `${JOURS[d.getUTCDay()]} ${j === 1 ? "1er" : j} ${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function allText(p) {
  const parts = [p.caption, p.story.title, p.story.kicker, p.story.sticker.question, p.story.sticker.script, ...(p.story.sticker.options || []), p.bo.feed, p.bo.story];
  for (const s of p.feed.slides) parts.push(s.title, s.kicker, s.sub || "", s.omnibus || "", ...(s.list || []), s.price.now, s.price.old || "");
  return parts.join("\n");
}

for (const p of PUBLICATIONS) {
  const t = allText(p);
  const where = `#${p.n}`;
  if (/pour (homme|femme)s?\b/i.test(t)) errors.push(`${where} : « pour homme/femme »`);
  if (/\b(enfant|bébé|gamin|jouet)/i.test(t)) errors.push(`${where} : référence à l'enfance`);
  if (/échange (de taille )?gratuit/i.test(t)) errors.push(`${where} : échange gratuit`);
  if (/\bEVJF|EVG\b/.test(t)) errors.push(`${where} : terme genré (EVJF/EVG)`);
  const prixTexte = [p.caption, ...p.feed.slides.map((s) => [s.title, s.sub || "", s.omnibus || "", s.price.now, s.price.old || ""].join(" ")), p.story.title].join("\n"); // les leurres des quiz sont exclus
  for (const m of prixTexte.matchAll(/(\d+(?:,\d+)?)\s?€/g)) if (!PRIX_OK.has(m[1])) errors.push(`${where} : montant non prévu « ${m[0]} »`);
  if (/(reversé|don)/i.test(t) && /(Think Pink|association)/.test(t) && !/en cours de discussion/.test(t)) errors.push(`${where} : don sans « en cours de discussion »`);
  if (/(au lieu de|passe de \d)/.test(p.caption) && !/prix le plus bas des 30 derniers jours/i.test(p.caption)) errors.push(`${where} : réduction sans prix le plus bas des 30 jours`);
  const tags = p.caption.match(/#\w+/g) || [];
  if (tags.length < 5 || tags.length > 10) errors.push(`${where} : ${tags.length} hashtags`);
  if (!tags.includes("#BoPorte") || !tags.includes("#UNIS")) errors.push(`${where} : #BoPorte ou #UNIS manquant`);
  if (/\b(vous|votre|vos)\b/i.test(p.caption.replace(/#\w+/g, ""))) errors.push(`${where} : vouvoiement ?`);
  const slides = p.feed.slides.length;
  if (slides !== 1 && (slides < 3 || slides > 5)) errors.push(`${where} : carrousel de ${slides} vignettes`);
  for (const img of [...p.feed.slides.map((s) => s.img), p.story.img]) if (INTERDITES.some((x) => img.includes(x))) errors.push(`${where} : image interdite ${img}`);
  for (const a of [...p.feed.slides.map((s) => s.alt), p.story.alt]) if (!a || a.length < 30) errors.push(`${where} : texte alternatif trop court`);
  // Notes de Bo (design.md §7) : une par visuel, courte (elle tient sur le bord du Polaroid), sans prix ni info clé.
  if (!p.bo || !p.bo.feed || !p.bo.story) errors.push(`${where} : notes de Bo feed/story manquantes`);
  for (const [k, note] of Object.entries(p.bo || {})) {
    if (note.length > 36) errors.push(`${where} : note de Bo ${k} trop longue (${note.length} car.)`);
    if (/\d|€|%/.test(note)) errors.push(`${where} : note de Bo ${k} avec un chiffre ou un prix (info clé interdite en manuscrit)`);
  }
}
if (PUBLICATIONS.length !== 16) errors.push(`${PUBLICATIONS.length} publications au lieu de 16`);
const dates = PUBLICATIONS.map((p) => p.date);
if (dates.join() !== [...dates].sort().join()) errors.push("publications hors de l'ordre du calendrier");
// Contenus bonus : mêmes règles de marque (textes publics seulement : concept, plans, légende)
for (const b of BONUS) {
  const where = `bonus « ${b.format} »`;
  const t = [b.concept, b.caption, ...b.plans.flat()].join("\n");
  if (/pour (homme|femme)s?\b/i.test(t)) errors.push(`${where} : « pour homme/femme »`);
  if (/\b(enfant|bébé|gamin|jouet)/i.test(t)) errors.push(`${where} : référence à l'enfance`);
  for (const m of t.matchAll(/(\d+(?:,\d+)?)\s?€/g)) if (!PRIX_OK.has(m[1])) errors.push(`${where} : montant non prévu « ${m[0]} »`);
  if (/(reversé|don)/i.test(t) && /Think Pink/.test(t) && !/en cours de discussion/.test(t)) errors.push(`${where} : don sans « en cours de discussion »`);
  const tags = b.caption.match(/#[\wÀ-ÿ]+/g) || [];
  if (tags.length < 5 || tags.length > 10) errors.push(`${where} : ${tags.length} hashtags`);
  if (!tags.includes("#BoPorte") || !tags.includes("#UNIS")) errors.push(`${where} : #BoPorte ou #UNIS manquant`);
  if (INTERDITES.some((x) => b.img.includes(x))) errors.push(`${where} : image interdite`);
  if (!b.alt || b.alt.length < 30) errors.push(`${where} : texte alternatif trop court`);
  if (!b.inspi.length || b.inspi.some(([, u]) => !/^https:\/\/www\.(tiktok|instagram)\.com\//.test(u))) errors.push(`${where} : lien d'inspiration manquant ou invalide`);
}
for (const p of PINS) {
  const t = p.titre + "\n" + p.desc;
  if (/pour (homme|femme)s?\b/i.test(t) || /\b(enfant|bébé|jouet)/i.test(t)) errors.push(`épingle ${p.id} : terme interdit`);
  if (p.titre.length > 100) errors.push(`épingle ${p.id} : titre > 100 caractères`);
  if (p.desc.length > 500) errors.push(`épingle ${p.id} : description > 500 caractères`);
  if (!/utm_source=pinterest/.test(p.lien)) errors.push(`épingle ${p.id} : UTM manquant`);
  for (const m of t.matchAll(/(\d+(?:,\d+)?)\s?€/g)) if (!PRIX_OK.has(m[1])) errors.push(`épingle ${p.id} : montant non prévu « ${m[0]} »`);
}
if (BONUS.length !== 9) errors.push(`${BONUS.length} contenus bonus au lieu de 9`);
if (errors.length) { console.error("Contrôles en échec :\n- " + errors.join("\n- ")); process.exit(1); }

// ── Rendu ───────────────────────────────────────────────────────────
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const utm = (p, content) => `${SITE}${p.page}?utm_source=instagram&utm_medium=social&utm_campaign=${p.campaign}&utm_content=${content}`;

const LOGO = `<svg class="logo" viewBox="0 0 262 84" role="img" aria-label="UNIS"><g fill="#3E031B" font-family="'Bricolage Grotesque',system-ui,sans-serif" font-weight="800" font-size="96" text-anchor="middle"><text x="40" y="80">U</text><text x="112" y="80">N</text><text x="224" y="80">S</text></g><rect x="157" y="14" width="22" height="66" rx="1.5" fill="#3E031B"/><path d="M137 40 Q 148 45 160 40 L 151 70 Q 148 74 145 70 Z" fill="#D42A6E"/><path d="M58 28 C 90 24, 116 30, 137 40 M160 40 C 182 28, 208 20, 228 22 M151 66 C 176 62, 204 52, 246 44" fill="none" stroke="#D42A6E" stroke-width="3.2" stroke-linecap="round"/></svg>`;
// Icône de profil de la maquette : le string framboise sur carré bordeaux (icône UNIS, cf. design.md).
const AVATAR = `<svg class="avatar" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#3E031B"/><path d="M6 15 C 13 13, 17 15, 20 17 C 23 15, 27 13, 34 15" fill="none" stroke="#D42A6E" stroke-width="2.6" stroke-linecap="round"/><path d="M15 16 Q 20 19 25 16 L 21 28 Q 20 30 19 28 Z" fill="#D42A6E"/></svg>`;

function price(pr) {
  return `<div class="pill${pr.small ? " pill-s" : ""}">${pr.label ? `<span class="pill-l">${esc(pr.label)}</span>` : ""}${pr.old ? `<s>${esc(pr.old)}</s>` : ""}<b>${esc(pr.now)}</b></div>`;
}

function photo(o, alt) {
  const style = `object-fit:${o.fit || "cover"};object-position:${o.pos || "50% 50%"};background:${o.bg || "#FFFFFF"}`;
  return `<img src="${esc(o.img)}" alt="${esc(alt)}" style="${style}" loading="lazy" decoding="async">`;
}

// Note manuscrite de Bo, écrite sur le bord blanc du Polaroid (décorative, masquée aux lecteurs d'écran).
const boNote = (t) => t ? `<p class="bo" aria-hidden="true">${esc(t)} <span>— Bo</span></p>` : "";

function feedSlide(s, i, total, note) {
  return `<div class="vis feed" data-slide="${i + 1}">
  <div class="vis-top">${LOGO}<span class="kick">${esc(s.kicker)}</span></div>
  <div class="ph">${photo(s, s.alt)}${boNote(i === 0 ? note : "")}${price(s.price)}</div>
  <div class="txt">
    <p class="ttl"><span class="hl">${esc(s.title)}</span></p>
    ${s.sub ? `<p class="sub">${esc(s.sub)}</p>` : ""}
    ${s.list ? `<ol class="steps">${s.list.map((x) => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}
    ${s.omnibus ? `<p class="omni">${esc(s.omnibus)}</p>` : ""}
  </div>
  ${total > 1 ? `<span class="count" aria-hidden="true">${i + 1}/${total}</span>` : ""}
</div>`;
}

function sticker(st) {
  const t = st.type;
  let body = "";
  if (t === "sondage") body = `<p class="sq">${esc(st.question)}</p><div class="opts two">${st.options.map((o) => `<span>${esc(o)}</span>`).join("")}</div>`;
  else if (t === "quiz") body = `<p class="sq">${esc(st.question)}</p><div class="opts">${st.options.map((o, i) => `<span${st.answer === i ? ' class="ok"' : ""}>${esc(o)}${st.answer === i ? " ✓" : ""}</span>`).join("")}</div>`;
  else if (t === "compte à rebours") body = `<p class="sq">${esc(st.question)}</p><p class="cd">${esc(st.end)}</p>`;
  return `<div class="stk" data-type="${esc(t)}"><span class="stk-t">Sticker ${esc(t)}</span>${body}</div>`;
}

function storyVis(p) {
  const s = p.story;
  return `<div class="vis story">
  <div class="vis-top">${LOGO}<span class="kick">${esc(s.kicker)}</span></div>
  <div class="ph">${photo(s, s.alt)}${boNote(p.bo.story)}</div>
  <div class="txt"><p class="ttl"><span class="hl">${esc(s.title)}</span></p></div>
  ${sticker(s.sticker)}
  <div class="lnk"><span class="stk-t">Sticker lien</span>${esc(s.link)}</div>
</div>`;
}

function bonusCard(b, i) {
  return `<article class="pub bonus" id="bonus-${b.id}" aria-labelledby="hb-${b.id}">
  <header class="pub-h">
    <p class="kicker"><span class="num">B${i + 1}</span>${esc(b.type)}</p>
    <h3 id="hb-${b.id}"><span class="hl">${esc(b.format)}</span></h3>
  </header>
  <div class="bonus-g">
    <figure class="bonus-ph">${b.video ? `<video controls muted playsinline preload="none" width="1080" height="1920" poster="${esc(b.poster)}" aria-label="Reel ${esc(b.format)} (sans son)"><source src="${esc(b.video)}" type="video/mp4"></video><figcaption><a href="${esc(b.video)}" download>Télécharger le Reel (MP4 1080×1920)</a></figcaption>` : photo(b, b.alt)}</figure>
    <div class="bonus-t">
      <p><b>La mécanique qu'on reprend :</b> ${esc(b.mecanique)}</p>
      <p><b>Version UNIS :</b> ${esc(b.concept)}</p>
      <table class="plans"><caption>Déroulé</caption><thead><tr><th scope="col">Moment</th><th scope="col">À l'écran</th><th scope="col">Texte, son ou consigne</th></tr></thead><tbody>${b.plans.map(([a, c, d]) => `<tr><th scope="row">${esc(a)}</th><td>${esc(c)}</td><td>${esc(d)}</td></tr>`).join("")}</tbody></table>
      <div class="capbox"><p class="cap-h">Légende</p><pre id="capb-${b.id}" class="cap">${esc(b.caption)}</pre><button type="button" class="copy" data-target="capb-${b.id}">Copier la légende</button> <span class="copied" role="status"></span></div>
      <dl class="meta"><dt>Quand</dt><dd>${esc(b.quand)}</dd><dt>À mesurer</dt><dd>${esc(b.kpi)}</dd><dt>Garde-fous</dt><dd>${esc(b.garde)}</dd>${b.prompt ? `<dt>Prompt visuel</dt><dd><code>${esc(b.prompt)}</code></dd>` : ""}</dl>
      <p class="inspi"><b>Inspirations</b> (à regarder pour la mécanique, ne rien copier ni repartager) :</p>
      <ul class="inspi-l">${b.inspi.map(([l, u]) => `<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(l)}</a></li>`).join("")}</ul>
    </div>
  </div>
</article>`;
}

function article(p) {
  const total = p.feed.slides.length;
  const feedUrl = utm(p, "feed");
  const storyUrl = utm(p, "story");
  const capId = `cap-${p.n}`;
  return `<article class="pub" id="pub-${p.n}" aria-labelledby="h-${p.n}">
  <header class="pub-h">
    <p class="kicker"><span class="num">${String(p.n).padStart(2, "0")}</span>${esc(frDate(p.date))}${p.demo ? ` <span class="badge" title="Avant le lancement commercial d'avril 2027 : démonstration ou liste d'attente seulement">mode démo</span>` : ""}</p>
    <h2 id="h-${p.n}"><span class="hl">${esc(p.emailTitle)}</span></h2>
    <p class="email-l">Email associé : <a href="../emails/${esc(p.email)}">${esc(p.email)}</a></p>
  </header>
  <div class="pub-g">
    <section class="mock" aria-label="Maquette du post feed">
      <div class="frame">
        <div class="frame-h">${AVATAR}<span class="handle">@unis</span><span class="fmt">${esc(p.feed.format)}</span></div>
        <div class="car${total > 1 ? " multi" : ""}" ${total > 1 ? `tabindex="0" aria-label="Carrousel de ${total} vignettes, défile horizontalement"` : ""}>
          ${p.feed.slides.map((s, i) => feedSlide(s, i, total, p.bo.feed)).join("\n")}
        </div>
        ${total > 1 ? `<div class="car-nav"><button type="button" class="prev" aria-label="Vignette précédente">←</button><span class="car-pos" aria-live="polite">1 / ${total}</span><button type="button" class="next" aria-label="Vignette suivante">→</button></div>` : ""}
        <p class="frame-cap"><b>@unis</b> ${esc(p.caption.split("\n")[0])} <span class="more">… voir la légende complète</span></p>
      </div>
    </section>
    <section class="mock mock-story" aria-label="Maquette de la story">
      <div class="frame">
        <div class="frame-h">${AVATAR}<span class="handle">@unis</span><span class="fmt">Story 9:16</span></div>
        ${storyVis(p)}
      </div>
    </section>
    <section class="info" aria-label="Légende et réglages">
      <div class="cap-h"><h3>Légende</h3><button type="button" class="copy" data-target="${capId}">Copier la légende</button><span class="copied" role="status" aria-live="polite"></span></div>
      <pre class="cap" id="${capId}">${esc(p.caption)}</pre>
      <dl>
        <dt>Segment</dt><dd>${esc(p.segment)}</dd>
        <dt>Heure conseillée</dt><dd>${esc(p.heure)} · ${esc(p.heureWhy)}</dd>
        <dt>Lien bio (post)</dt><dd><code>${esc(feedUrl)}</code></dd>
        <dt>Sticker lien (story)</dt><dd><code>${esc(storyUrl)}</code></dd>
        <dt>Texte alternatif</dt><dd>${total > 1 ? `<ol class="alts">${p.feed.slides.map((s) => `<li>${esc(s.alt)}</li>`).join("")}</ol>` : esc(p.feed.slides[0].alt)}</dd>
        <dt>Alt story</dt><dd>${esc(p.story.alt)}</dd>
        <dt>Story, déroulé</dt><dd>${esc(p.story.sticker.script)}</dd>
      </dl>
      ${p.note ? `<p class="note">${esc(p.note)}</p>` : ""}
    </section>
  </div>
</article>`;
}

const toc = PUBLICATIONS.map((p) => `<li><a href="#pub-${p.n}"><span class="num">${String(p.n).padStart(2, "0")}</span>${esc(frDate(p.date))} · ${esc(p.emailTitle)}</a></li>`).join("\n");

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Publications Instagram UNIS</title>
<meta name="description" content="Aperçu des 16 publications Instagram UNIS alignées sur la stratégie emailing : visuels 4:5 et 9:16, légendes, textes alternatifs et liens UTM.">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&amp;family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&amp;display=swap">
<style>
/* Direction « fanzine / fait main » (design.md §7). Caveat (écriture de Bo) : 1er chemin = site publié (site/assets/fonts), 2e = dépôt (src/static/fonts) */
@font-face { font-family:"Caveat"; font-style:normal; font-weight:700; font-display:swap; src:url("../assets/fonts/caveat-latin-700-normal.woff2") format("woff2"), url("../src/static/fonts/caveat-latin-700-normal.woff2") format("woff2"); unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD; }
@font-face { font-family:"Caveat"; font-style:normal; font-weight:700; font-display:swap; src:url("../assets/fonts/caveat-latin-ext-700-normal.woff2") format("woff2"), url("../src/static/fonts/caveat-latin-ext-700-normal.woff2") format("woff2"); unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+1E00-1E9F,U+20A0-20AB,U+20AD-20C0,U+2C60-2C7F,U+A720-A7FF; }
:root { --ink:#3E031B; --accent:#D42A6E; --bg:#FFE3EE; --soft:#FAB8D0; --logo:#FDD2E3; --paper:#FFFFFF; --muted:#6B2A44; --postit:#FFE89A; --tape:#F6E7B8cc; --hand:"Caveat","Comic Sans MS",cursive; --grain:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .24 0 0 0 0 .01 0 0 0 0 .1 0 0 0 .05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); }
@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) { --ink:#FFE3EE; --accent:#FF9CC3; --bg:#1A0510; --soft:#45122A; --paper:#2A0917; --muted:#F6C3D7; } }
:root[data-theme="dark"] { --ink:#FFE3EE; --accent:#FF9CC3; --bg:#1A0510; --soft:#45122A; --paper:#2A0917; --muted:#F6C3D7; }
* { box-sizing:border-box; }
body { margin:0; background-color:var(--bg); background-image:var(--grain); color:var(--ink); font:17px/1.55 'Atkinson Hyperlegible', Arial, sans-serif; }
h1, h2, h3 { font-family:'Bricolage Grotesque', Arial, sans-serif; font-weight:800; font-stretch:75%; line-height:1.1; margin:0; }
a { color:var(--accent); font-weight:700; }
a:focus-visible, button:focus-visible, .car:focus-visible { outline:3px solid var(--ink); outline-offset:2px; }
.wrap { max-width:1320px; margin:0 auto; padding:32px 16px 64px; }
.top { display:flex; flex-wrap:wrap; gap:16px 32px; align-items:center; justify-content:space-between; }
.top .logo { width:180px; height:auto; }
h1 { font-size:clamp(32px, 6vw, 54px); }
.lead { max-width:65ch; }
.toc { columns:2 300px; padding:0; list-style:none; font-size:15px; margin:24px 0 0; }
.toc li { break-inside:avoid; margin:0 0 6px; }
.toc a { text-decoration:none; color:var(--ink); }
.toc a:hover { text-decoration:underline; }
.num { display:inline-block; min-width:34px; padding:2px 8px; border-radius:40% 55% 45% 60% / 55% 45% 60% 40%; background:var(--postit); color:#3E031B; border:2px solid #3E031B; text-align:center; margin-right:8px; font-weight:700; font-size:14px; transform:rotate(-6deg); }
.pub { position:relative; background:var(--paper); border-radius:4px; border:1px solid #3E031B22; box-shadow:0 10px 24px #3E031B1f, 0 2px 0 #3E031B10; padding:28px 24px 24px; margin:40px 0; }
.pub::before { content:""; position:absolute; top:-12px; left:50%; width:92px; height:26px; background:var(--tape); transform:translateX(-50%) rotate(-4deg); box-shadow:0 1px 2px #0001; pointer-events:none; }
.pub:nth-of-type(even)::before { left:22%; transform:translateX(-50%) rotate(5deg); }
.pub-h h2 .hl, h1 .hl { background-image:linear-gradient(176deg, transparent 56%, var(--soft) 56%, var(--soft) 90%, transparent 90%); -webkit-box-decoration-break:clone; box-decoration-break:clone; padding:0 6px; }
.pub-h .kicker { margin:0; font-weight:700; color:var(--muted); font-size:15px; }
.pub-h h2 { font-size:30px; margin:8px 0 4px; }
.email-l { margin:0 0 16px; font-size:15px; }
.badge { display:inline-block; margin-left:8px; padding:2px 10px; border-radius:4px; border:2px dashed var(--ink); font-size:13px; color:var(--ink); }
.pub-g { display:grid; grid-template-columns:minmax(0, 380px) minmax(0, 250px) minmax(0, 1fr); gap:24px; align-items:start; }
@media (max-width:1100px) { .pub-g { grid-template-columns:minmax(0, 380px) minmax(0, 250px); } .info { grid-column:1 / -1; } }
@media (max-width:680px) { .pub-g { grid-template-columns:minmax(0, 1fr); } .mock-story { max-width:300px; } }
.frame { background:#FFFFFF; color:#3E031B; border-radius:28px; padding:12px; box-shadow:0 0 0 1.5px var(--soft); }
.frame-h { display:flex; align-items:center; gap:8px; padding:2px 4px 10px; font-size:15px; }
.avatar { width:32px; height:32px; flex:none; }
.handle { font-weight:700; }
.fmt { margin-left:auto; font-size:13px; color:#6B2A44; }
.frame-cap { margin:10px 4px 2px; font-size:14px; line-height:1.45; }
.frame-cap .more { color:#6B2A44; }
.car { display:flex; overflow-x:auto; scroll-snap-type:x mandatory; border-radius:18px; scrollbar-width:thin; }
.car > .vis { flex:0 0 100%; scroll-snap-align:start; }
.car-nav { display:flex; align-items:center; justify-content:center; gap:12px; margin-top:8px; }
.car-nav button { min-width:44px; min-height:44px; border-radius:10px; border:2.5px solid #3E031B; background:#FFFFFF; color:#3E031B; font:inherit; font-weight:700; cursor:pointer; box-shadow:3px 3px 0 #3E031B; }
.car-nav button:active { transform:translate(2px, 2px); box-shadow:1px 1px 0 #3E031B; }
.car-pos { font-size:14px; min-width:48px; text-align:center; }

/* ── Visuels (unités cqw : se mettent à l'échelle de leur largeur) ── */
.vis { container-type:inline-size; position:relative; width:100%; background-color:#FDD2E3; background-image:var(--grain); color:#3E031B; overflow:hidden; border-radius:18px; font-family:'Atkinson Hyperlegible', Arial, sans-serif; }
.vis.feed { aspect-ratio:4 / 5; }
.vis.story { aspect-ratio:9 / 16; }
.vis-top { position:absolute; left:5cqw; right:5cqw; top:4.5cqw; display:flex; align-items:center; justify-content:space-between; gap:3cqw; }
.vis .logo { width:24cqw; height:auto; flex:none; }
.kick { background:#FFFFFF; border:.45cqw solid #3E031B; border-radius:1.2cqw; box-shadow:.8cqw .8cqw 0 #3E031B; padding:1cqw 2.6cqw; font-weight:700; font-size:3.1cqw; line-height:1.2; text-align:right; max-width:60cqw; transform:rotate(1.5deg); }
/* Photo façon Polaroid : cadre blanc, scotch en haut, inclinaison de −1,5° à +1,5° */
.ph { position:absolute; left:6cqw; right:6cqw; top:16.5cqw; height:69cqw; background:#FFFFFF; padding:2.4cqw 2.4cqw 8.6cqw; border:.15cqw solid #3E031B22; box-shadow:0 2.2cqw 4.4cqw #3E031B2e, 0 .4cqw 0 #3E031B14; transform:rotate(-1.5deg); }
.ph::before { content:""; position:absolute; z-index:2; top:-2.6cqw; left:50%; width:22cqw; height:5.4cqw; background:var(--tape); transform:translateX(-50%) rotate(-4deg); box-shadow:0 .2cqw .4cqw #0001; }
.car > .vis:nth-child(even) .ph, .story .ph { transform:rotate(1.2deg); }
.car > .vis:nth-child(even) .ph::before { left:24%; transform:translateX(-50%) rotate(6deg); }
.ph img { display:block; width:100%; height:100%; border-radius:0; }
/* Note de Bo : Caveat Framboise, sur le bord du Polaroid, jamais une info clé */
.bo { position:absolute; left:3cqw; right:20.5cqw; bottom:1.8cqw; margin:0; font-family:var(--hand); font-weight:700; font-size:4.3cqw; line-height:1; color:#D42A6E; white-space:nowrap; transform:rotate(-2deg); transform-origin:left center; }
.bo span { font-size:.85em; }
/* Sticker prix : ovale jaune post-it, contour bordeaux, ombre dure */
.pill { position:absolute; z-index:3; right:-3.5cqw; bottom:-6.5cqw; width:24cqw; height:22cqw; border-radius:40% 55% 45% 60% / 55% 45% 60% 40%; background:#FFE89A; color:#3E031B; border:.55cqw solid #3E031B; display:flex; flex-direction:column; align-items:center; justify-content:center; transform:rotate(-8deg); box-shadow:.9cqw .9cqw 0 #3E031B; font-family:'Bricolage Grotesque', Arial, sans-serif; font-stretch:75%; line-height:1; text-align:center; }
.pill b { font-size:7.4cqw; font-weight:800; white-space:nowrap; }
.pill-s b { font-size:5cqw; }
.pill s { font-size:3.6cqw; font-weight:700; opacity:.92; margin-bottom:.6cqw; }
.pill-l { font-family:'Atkinson Hyperlegible', Arial, sans-serif; font-size:3cqw; font-weight:700; margin-bottom:.6cqw; }
.txt { position:absolute; left:6cqw; right:27cqw; top:90cqw; }
.ttl .hl { background-image:linear-gradient(176deg, transparent 54%, #FAB8D0 54%, #FAB8D0 90%, transparent 90%); -webkit-box-decoration-break:clone; box-decoration-break:clone; padding:0 1cqw; }
.ttl { margin:0; font-family:'Bricolage Grotesque', Arial, sans-serif; font-weight:800; font-stretch:75%; font-size:8.2cqw; line-height:.98; letter-spacing:-.01em; }
.sub { margin:1.8cqw 0 0; font-size:3.4cqw; line-height:1.3; font-weight:700; }
.steps { margin:1.6cqw 0 0; padding-left:4.2cqw; font-size:3.1cqw; line-height:1.3; font-weight:700; }
.omni { margin:1.6cqw 0 0; font-size:2.6cqw; line-height:1.3; }
.count { position:absolute; right:5cqw; bottom:4cqw; font-size:2.8cqw; font-weight:700; background:#FFFFFF; border:.35cqw solid #3E031B; border-radius:1cqw; padding:.4cqw 1.8cqw; }
/* Story : même grammaire, plus haute */
.story .ph { top:16.5cqw; height:79cqw; }
.story .txt { top:99cqw; right:6cqw; }
.story .ttl { font-size:9cqw; }
.stk { position:absolute; left:10cqw; right:10cqw; bottom:19cqw; background:#FFFFFF; border:.6cqw dashed #D42A6E; border-radius:2cqw; padding:2.6cqw 3.4cqw; text-align:center; }
.stk-t { display:block; font-size:2.5cqw; font-weight:700; color:#D42A6E; text-transform:uppercase; letter-spacing:.06em; margin-bottom:1cqw; }
.sq { margin:0 0 1.6cqw; font-family:'Bricolage Grotesque', Arial, sans-serif; font-weight:800; font-stretch:75%; font-size:4.6cqw; line-height:1.05; }
.opts { display:flex; flex-direction:column; gap:1cqw; }
.opts.two { flex-direction:row; }
.opts span { flex:1; border-radius:1.6cqw; background:#FFE3EE; padding:1.1cqw 2cqw; font-size:3.1cqw; font-weight:700; line-height:1.2; }
.opts span.ok { background:#3E031B; color:#FFFFFF; }
.cd { margin:0; font-family:'Bricolage Grotesque', Arial, sans-serif; font-weight:800; font-stretch:75%; font-size:5.4cqw; color:#D42A6E; line-height:1.05; }
.lnk { position:absolute; left:22cqw; right:22cqw; bottom:5.5cqw; background:#D42A6E; color:#FFFFFF; border:.55cqw solid #3E031B; box-shadow:.9cqw .9cqw 0 #3E031B; border-radius:2.4cqw; padding:1.6cqw 3cqw; text-align:center; font-weight:700; font-size:3.4cqw; line-height:1.2; }
.lnk .stk-t { color:#FFFFFF; margin-bottom:.3cqw; font-size:2.2cqw; }

/* ── Colonne d'infos ── */
.cap-h { display:flex; flex-wrap:wrap; align-items:center; gap:12px; }
.cap-h h3 { font-size:24px; }
.copy { min-height:52px; padding:0 24px; border-radius:12px; border:2.5px solid #3E031B; background:#D42A6E; color:#FFFFFF; font:inherit; font-weight:700; cursor:pointer; box-shadow:4px 4px 0 #3E031B; transition:transform .12s, box-shadow .12s; }
.copy:active { transform:translate(3px, 3px); box-shadow:1px 1px 0 #3E031B; }
.copied { font-size:14px; font-weight:700; color:var(--muted); }
.cap { white-space:pre-wrap; font:16px/1.55 'Atkinson Hyperlegible', Arial, sans-serif; background:var(--bg); border:2px dashed color-mix(in srgb, var(--ink) 35%, transparent); border-radius:4px; padding:14px 16px; margin:12px 0 16px; max-width:65ch; }
dl { display:grid; grid-template-columns:max-content minmax(0, 1fr); gap:6px 14px; margin:0; font-size:15px; }
dt { font-weight:700; } dd { margin:0; }
@media (max-width:520px) { dl { grid-template-columns:minmax(0, 1fr); } dd { margin-bottom:6px; } }
code { font-size:13px; word-break:break-all; }
.alts { margin:0; padding-left:20px; }
.note { background:var(--postit); color:#3E031B; padding:10px 14px; border-radius:2px; font-size:14px; margin:16px 0 0; box-shadow:0 6px 14px #3E031B1a; }
footer { margin-top:48px; font-size:14px; color:var(--muted); max-width:80ch; }

/* ── Mode export (?export) : chaque visuel à 1080 px de large, sans maquette ni zone sticker ── */
body.export .wrap > :not(main) , body.export .pub-h, body.export .info, body.export .frame-h, body.export .frame-cap, body.export .car-nav, body.export .count { display:none; }
body.export .wrap { max-width:none; padding:0; }
body.export .pub { background:none; padding:0; margin:0; }
body.export .pub-g { display:block; }
body.export .mock, body.export .mock-story { max-width:none; }
body.export .frame { background:none; box-shadow:none; padding:0; border-radius:0; }
body.export .car { display:block; overflow:visible; border-radius:0; }
body.export .vis { width:1080px; border-radius:0; margin:0 0 40px; }
body.export .pub::before { display:none; }
@media (prefers-reduced-motion: reduce) { .copy { transition:none; } }
body.export .stk, body.export .lnk { visibility:hidden; }
@media (prefers-reduced-motion: no-preference) { .car { scroll-behavior:smooth; } }
/* Stories à la une et Pinterest */
.une, .pins { list-style:none; padding:0; display:grid; gap:24px; margin:24px 0 0; }
.une { grid-template-columns:repeat(auto-fill, minmax(180px, 1fr)); }
.pins { grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); }
.une li, .pins li { background:var(--paper); padding:12px; border-radius:6px; box-shadow:0 4px 14px #3E031B1f; font-size:15px; }
.une img, .pins img { display:block; width:100%; height:auto; border-radius:4px; }
.une img { aspect-ratio:9/16; object-fit:cover; } .pins img { aspect-ratio:2/3; }
.une h3, .pins h3 { font-size:22px; margin:10px 0 4px; } .pin-l { margin:6px 0; } .pin-l code { font-size:12px; word-break:break-all; }
/* Contenus bonus */
.to-bonus { margin:16px 0 0; font-weight:700; }
.bonus-s { margin-top:64px; }
.bonus-s > h2 { font-size:clamp(30px, 5vw, 46px); }
.bonus-s .pub-h h3 { font-size:28px; margin:8px 0 4px; }
.bonus-s .pub-h h3 .hl { background-image:linear-gradient(176deg, transparent 56%, var(--soft) 56%, var(--soft) 90%, transparent 90%); }
.bonus-g { display:grid; gap:24px; margin-top:16px; }
@media (min-width:860px) { .bonus-g { grid-template-columns:300px 1fr; align-items:start; } }
.bonus-ph { margin:0; background:#fff; padding:10px 10px 28px; box-shadow:0 4px 14px #3E031B26; transform:rotate(-1.5deg); max-width:300px; }
.bonus-ph video { display:block; width:100%; height:auto; aspect-ratio:9/16; background:#000; }
.bonus-ph figcaption { font-size:14px; margin-top:8px; text-align:center; }
.bonus-ph img { display:block; width:100%; aspect-ratio:9/16; height:auto; }
.plans { width:100%; border-collapse:collapse; font-size:15px; margin:12px 0 16px; }
.plans caption { text-align:left; font-weight:700; margin-bottom:6px; }
.plans th, .plans td { border-top:1px solid #3E031B33; padding:8px 10px 8px 0; text-align:left; vertical-align:top; }
.plans thead th { border-top:0; color:var(--muted); font-size:14px; }
.capbox .cap-h { font-weight:700; margin:0 0 4px; }
.bonus .cap { white-space:pre-wrap; font:15px/1.5 'Atkinson Hyperlegible', Arial, sans-serif; background:var(--bg); padding:12px; border-radius:6px; margin:0 0 8px; }
.meta { display:grid; grid-template-columns:max-content 1fr; gap:6px 14px; font-size:15px; margin:16px 0; }
.meta dt { font-weight:700; } .meta dd { margin:0; } .meta code { font-size:13px; word-break:break-word; }
.inspi { margin:8px 0 4px; font-size:15px; } .inspi-l { margin:0; padding-left:20px; font-size:15px; }
@media (max-width:600px) { .meta { grid-template-columns:1fr; } .plans { font-size:14px; } }
@media (prefers-reduced-motion: reduce) { .bonus-ph { transform:none; } }
</style>
</head>
<body>
<p style="margin:16px auto 0;max-width:1080px;padding:0 16px;font-family:Arial,sans-serif"><a href="../fr/coulisses/" style="color:#3E031B;font-weight:700">← Coulisses du projet</a> · <a href="../fr/" style="color:#3E031B;font-weight:700">Site UNIS</a></p>
<div class="wrap">
  <header class="top">
    <div>
      <h1><span class="hl">Les publications Instagram UNIS</span></h1>
      <p class="lead">16 publications, une par envoi de la stratégie emailing (docs/03), dans l'ordre du calendrier. Chacune : un post 4:5 (ou un carrousel) et une story 9:16 avec son sticker, la légende prête à copier, le texte alternatif, l'heure conseillée et les liens UTM. Maquettes UNIS, rien n'est publié.</p>
    </div>
    ${LOGO}
  </header>
  <nav aria-label="Calendrier des publications"><ol class="toc">${toc}</ol><p class="to-bonus"><a href="#contenus-bonus">Contenus bonus : 9 Reels inspirés de la veille réseaux sociaux ↓</a> · <a href="#a-la-une">Stories à la une ↓</a> · <a href="#pinterest">Épingles Pinterest ↓</a></p></nav>
  <main>
${PUBLICATIONS.map(article).join("\n")}
    <section class="bonus-s" id="contenus-bonus" aria-labelledby="h-bonus">
      <h2 id="h-bonus"><span class="hl">Contenus bonus</span></h2>
      <p class="lead">9 formats vidéo courts (Reels Instagram et TikTok, 9:16), en plus du calendrier emailing. Chacun reprend la mécanique d'exemples repérés dans la veille du 17 novembre 2026 (Duolingo, Ryanair, MeUndies, Parade, Who Gives A Crap, collectionneurs Jellycat, sketchs Secret Santa, ours voyageurs), adaptée à Bo et aux règles de la marque. Rien n'est publié ; les commentaires et réactions montrés en démo seront remplacés par de vrais une fois le compte lancé.</p>
      <ol class="toc bonus-toc">${BONUS.map((b, i) => `<li><a href="#bonus-${b.id}"><span class="num">B${i + 1}</span>${esc(b.format)}</a></li>`).join("")}</ol>
${BONUS.map(bonusCard).join("\n")}
    </section>
    <section class="bonus-s" id="a-la-une" aria-labelledby="h-une">
      <h2 id="h-une"><span class="hl">Stories à la une</span></h2>
      <p class="lead">Les 5 cercles sous la bio du profil. Couverture 1080×1920 (Instagram la rogne en rond autour de l'icône) et ce qu'on range dans chaque cercle.</p>
      <ul class="une">${A_LA_UNE.map((a) => `<li><img src="a-la-une/${a.id}.jpg" alt="Couverture à la une « ${esc(a.label)} » : icône bordeaux sur cercle rose" loading="lazy" width="1080" height="1920"><h3>${esc(a.label)}</h3><p>${esc(a.contenu)}</p><a href="a-la-une/${a.id}.jpg" download>Télécharger</a></li>`).join("")}</ul>
    </section>
    <section class="bonus-s" id="pinterest" aria-labelledby="h-pin">
      <h2 id="h-pin"><span class="hl">Épingles Pinterest</span></h2>
      <p class="lead">5 épingles 1000×1500 pour un tableau « Idées cadeaux drôles ». Pinterest est un moteur de recherche : le titre et la description reprennent les mots que les gens tapent pour chercher un cadeau. Lien avec UTM vers la page qui répond.</p>
      <ul class="pins">${PINS.map((p) => `<li><img src="pinterest/${p.id}.jpg" alt="${esc(p.alt)}" loading="lazy" width="1000" height="1500"><h3>${esc(p.titre)}</h3><p>${esc(p.desc)}</p><p class="pin-l"><b>Lien :</b> <code>${esc(p.lien)}</code></p><p class="pin-l"><b>Texte alternatif :</b> ${esc(p.alt)}</p><a href="pinterest/${p.id}.jpg" download>Télécharger l'image</a></li>`).join("")}</ul>
    </section>
  </main>
  <footer>
    <p>Heures conseillées : point de départ à ajuster avec les statistiques du compte (aucune donnée d'audience à ce jour). Les publications « mode démo » tombent avant le lancement commercial d'avril 2027 : démonstration ou liste d'attente seulement. Instagram ne rend pas les liens cliquables dans les légendes : le lien UTM du jour va dans la bio et dans le sticker lien. Exports : ouvrir cette page avec <code>?export</code> (voir insta/README.md). Versions NL, EN (« thong ») et DE à faire relire par une personne native.</p>
    <p>Un fil. Tous les corps. Même les ours.</p>
  </footer>
</div>
<script>
(function () {
  if (/[?&]export\\b/.test(location.search)) document.body.classList.add("export");
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
    return legacyCopy(text);
  }
  // Repli pour file:// et les navigateurs sans API presse-papiers
  function legacyCopy(text) {
    return new Promise(function (ok, ko) {
      var t = document.createElement("textarea");
      t.value = text; t.setAttribute("readonly", ""); t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      try { document.execCommand("copy") ? ok() : ko(); } catch (e) { ko(e); }
      document.body.removeChild(t);
    });
  }
  document.querySelectorAll("button.copy").forEach(function (b) {
    b.addEventListener("click", function () {
      var pre = document.getElementById(b.dataset.target);
      var status = b.parentNode.querySelector(".copied");
      copyText(pre.textContent).then(function () { status.textContent = "Légende copiée."; }, function () { status.textContent = "Copie impossible : sélectionne le texte à la main."; });
      setTimeout(function () { status.textContent = ""; }, 3000);
    });
  });
  document.querySelectorAll(".frame").forEach(function (f) {
    var car = f.querySelector(".car.multi"); if (!car) return;
    var pos = f.querySelector(".car-pos"), n = car.children.length;
    var cur = 0, timer;
    function idx() { return Math.round(car.scrollLeft / car.clientWidth); }
    function go(d) { cur = Math.max(0, Math.min(n - 1, cur + d)); pos.textContent = (cur + 1) + " / " + n; car.scrollTo({ left: car.children[cur].offsetLeft - car.children[0].offsetLeft }); }
    car.addEventListener("scroll", function () { clearTimeout(timer); timer = setTimeout(function () { cur = idx(); }, 150); }, { passive: true });
    f.querySelector(".prev").addEventListener("click", function () { go(-1); });
    f.querySelector(".next").addEventListener("click", function () { go(1); });
    car.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") { e.preventDefault(); go(1); } if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); } });
    car.addEventListener("scrollend", function () { cur = idx(); pos.textContent = (cur + 1) + " / " + n; });
  });
})();
</script>
</body>
</html>
`;

writeFileSync(join(here, "index.html"), html);
console.log(`insta/index.html écrit : ${PUBLICATIONS.length} publications + ${BONUS.length} contenus bonus, ${PUBLICATIONS.reduce((a, p) => a + p.feed.slides.length, 0)} vignettes feed, ${PUBLICATIONS.length} stories.`);
for (const p of PUBLICATIONS) console.log(`  #${String(p.n).padStart(2, "0")} ${frDate(p.date)} · ${p.campaign}`);
