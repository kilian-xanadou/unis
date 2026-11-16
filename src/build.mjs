// Génère le site statique dans site/. Usage : node src/build.mjs
import { mkdirSync, writeFileSync, copyFileSync, rmSync, cpSync, existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import CFG from "./config.mjs";
import { T } from "./i18n.mjs";
import { X } from "./i18n-extra.mjs";
import { A } from "./i18n-account.mjs";
import { L } from "./legal.mjs";
import { PHOTOS, PLACEMENT, OG_IMAGE, VIDEOS } from "./photos.mjs";
import { ROSE } from "./i18n-rose.mjs";

// Base Supabase branchée ? Sinon le site reste en mode démo (rien n'est enregistré).
const DB = Boolean(CFG.supabaseUrl && CFG.supabaseAnonKey);
const SB_LIB = { src: "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js", integrity: "sha384-GFr3yTh5lJznCbZfpTtXnwboFsxqtTQoeTZCRHhE0579KrRmlCzen5AA8ohaB5ug" };
import { LANGS, DEFAULT_LANG, XDEFAULT, PATHS, SEASONS, BASE, ESS, SIZES, SIZE_TABLE, PRICES, SHIPPING } from "./data.mjs";
import { thong, bear, logoMark, SHAPE } from "./art.mjs";
import { V as VPC } from "./i18n-vpc.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "site");
const SITE = CFG.siteUrl.replace(/\/$/, "");
const BASE_PATH = new URL(SITE + "/").pathname;
// Numéro de version des fichiers CSS/JS (empreinte du contenu) : un fichier modifié change d'URL, donc pas de vieux cache.
const ver = (f) => createHash("sha256").update(readFileSync(join(ROOT, "src/static", f))).digest("hex").slice(0, 10);
const V = { css: ver("style.css"), js: ver("app.js") }; // "/" sur Render, "/unis/" sur GitHub Pages
const LIVE = SEASONS.find((s) => s.id === CFG.currentSeason);

// Capsule Octobre Rose : textes injectés dans les saisons, avec le montant et l'association.
const roseFill = (s, l) => s.split("{x}").join(new Intl.NumberFormat(T[l].locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(CFG.pinkDonation)).split("{c}").join(CFG.pinkCharity || ROSE[l].charityDefault);
for (const l of Object.keys(T)) { const r = ROSE[l]; T[l].season.rose = { title: r.title, phrase: r.phrase, h1: r.h1, intro: roseFill(r.intro, l) }; }

// Photos : <img> responsive, chemin absolu depuis la racine du site.
const photoUrl = (k, w) => { const p = PHOTOS[k]; const s = p.sizes.find((x) => x[0] === w) || p.sizes[p.sizes.length - 1]; return `assets/images/${p.file}-${s[0] === 600 ? 600 : 1200}.webp`; };
function photo(k, l, { sizes = "(max-width: 860px) 100vw, 50vw", eager = false, cls = "" } = {}) {
  const p = PHOTOS[k]; if (!p) return "";
  const [small, big] = p.sizes;
  return `<img${cls ? ` class="${cls}"` : ""} src="${BASE_PATH}assets/images/${p.file}-600.webp" srcset="${BASE_PATH}assets/images/${p.file}-600.webp ${small[0]}w, ${BASE_PATH}assets/images/${p.file}-1200.webp ${big[0]}w" sizes="${sizes}" width="${big[0]}" height="${big[1]}" alt="${esc(p.alt[l])}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}
const warnings = [];

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fill = (s, v = {}) => Object.entries(v).reduce((a, [k, x]) => a.split(`{${k}}`).join(x), s);
const eur = (n, l) => new Intl.NumberFormat(T[l].locale, { style: "currency", currency: "EUR", minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);
const fdate = (iso, l) => new Intl.DateTimeFormat(T[l].locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
const sName = (s, l) => s.name[l];

function pathOf(l, key, sid) {
  if (key === "season") return `${l}/${PATHS[l].seasons}${SEASONS.find((s) => s.id === sid).slug[l]}/`;
  if (key === "article") return `${l}/${X[l].slugs.journal}${X[l].articles[sid].slug}`;
  if (key === "account") return `${l}/${A[l].slug}`;
  if (X[l].slugs[key]) return `${l}/${X[l].slugs[key]}`;
  return `${l}/${PATHS[l][key]}`;
}
const ARTICLES = Object.keys(X.fr.articles); // ordre d'affichage : du plus récent au plus ancien
ARTICLES.sort((a, b) => X.fr.articles[b].date.localeCompare(X.fr.articles[a].date));
const abs = (p) => `${SITE}/${p}`;

// ---------- contrast check (WCAG) ----------
function lum(hex) {
  const c = hex.replace("#", "").match(/../g).map((h) => parseInt(h, 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
for (const p of [BASE, ...SEASONS.map((s) => s.c)]) {
  for (const [fg, bg, what] of [[p.ink, p.bg, "encre/fond"], [p.on, p.accent, "bouton"], [p.ink, p.soft, "encre/doux"], [p.bg, p.ink, "fond/encre"]]) {
    const r = ratio(fg, bg);
    if (r < 4.5) warnings.push(`Contraste ${what} ${fg} sur ${bg} = ${r.toFixed(2)} (< 4,5)`);
  }
}

// ---------- products ----------
function seasonProducts(s, l) {
  const it = s.items[0], m = it.n[l], sn = sName(s, l), yr = String(s === LIVE ? CFG.dropYear : s.next.slice(0, 4)).slice(2);
  const code = `${s.id.toUpperCase()}${yr}-${it.sku || "M1"}`;
  const list = [];
  if (s.box) list.push({ sku: `UNIS-BO-${s.id.toUpperCase()}${yr}`, kind: "bo", name: fill(T[l].boSpecialName, { s: sn }), desc: fill(T[l].boSpecialDesc, { m }), price: PRICES.bo, badge: T[l].collector, item: it, hat: s.id === "noel", bo: true });
  list.push({ sku: `UNIS-${code}-DUO`, kind: "duo", name: fill(T[l].duoName, { m }), desc: T[l].duoDesc, price: PRICES.duo, badge: T[l].bestseller, item: it, sized: true });
  for (const x of s.items) list.push({ sku: `UNIS-${s.id.toUpperCase()}${yr}-${x.sku || x.p.toUpperCase()}`, kind: "adult", name: fill(T[l].adultName, { m: x.n[l] }), desc: T[l].adultDesc, price: PRICES.adult, badge: T[l].limited, item: x, sized: true });
  list.push({ sku: `UNIS-${code}-MINI`, kind: "mini", name: fill(T[l].miniName, { m }), desc: T[l].miniDesc, price: PRICES.mini, badge: T[l].limited, item: it });
  if (s.box) list.push({ sku: `UNIS-BOX-${s.id.toUpperCase()}${yr}`, kind: "bo", name: fill(T[l].boxName, { s: sn }), desc: fill(T[l].boxDesc, { s: sn }), price: PRICES.box, badge: T[l].collector, item: it, hat: s.id === "noel", bo: true });
  const photoFor = (p) => PLACEMENT.itemCard[p.sku] || (p.bo ? (p.sku.startsWith("UNIS-BOX") ? PLACEMENT.boxCard[s.id] : PLACEMENT.boCard[s.id]) : null);
  const miniSku = `UNIS-${code}-MINI`;
  return list.map((p) => ({ ...p, giftAlt: ["adult", "duo"].includes(p.kind) ? `${BASE_PATH}${pathOf(l, "season", s.id)}#p-${miniSku.toLowerCase()}` : null, buyable: s === LIVE, color: it.base || s.c.accent, season: s, photo: photoFor(p), badge: s.capsule ? roseFill(ROSE[l].badge, l) : p.badge }));
}
const boProduct = (l) => ({ sku: "UNIS-BO", kind: "bo", name: T[l].boName, desc: T[l].boDesc, price: PRICES.bo, badge: T[l].collector, item: LIVE.items[0], bo: true, buyable: true, color: "#C98B4B", season: LIVE, photo: PLACEMENT.boCard[LIVE.id] || null });
const essProduct = (l) => ({ sku: "UNIS-ESS", kind: "ess", name: T[l].essName, desc: T[l].essDesc, price: PRICES.adult, badge: T[l].ess, sized: true, buyable: true, color: ESS[0].c , photo: PLACEMENT.itemCard["UNIS-ESS"] });
const lotProduct = (l) => ({ sku: "UNIS-ESS-LOT5", kind: "lot", name: T[l].lotName, desc: T[l].lotDesc, price: PRICES.lot5, badge: T[l].ess, sized: true, sizeOnly: true, buyable: true, color: ESS[1].c , photo: PLACEMENT.itemCard["UNIS-ESS-LOT5"] });

function art(p, l) {
  if (p.photo) return photo(p.photo, l, { sizes: "(max-width: 600px) 100vw, 300px" });
  if (p.kind === "bo") return bear(p.item, p.season.c.accent, p.hat);
  if (p.kind === "ess" || p.kind === "lot") {
    const many = p.kind === "lot" ? ESS.slice(0, 5) : [ESS[0]];
    if (p.kind === "lot") return `<div class="fan">${many.map((e) => `<svg viewBox="0 0 200 160" aria-hidden="true" focusable="false" style="color:${e.c}"><path d="${SHAPE.flat}" fill="currentColor" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/></svg>`).join("")}</div>`;
    return `<svg viewBox="0 0 200 160" aria-hidden="true" focusable="false" class="ess-art" style="color:${ESS[0].c}"><path class="c-flat" d="${SHAPE.flat}" fill="currentColor" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/><path class="c-pouch" d="${SHAPE.pouch}" fill="currentColor" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/><path d="M14 34 Q100 52 186 34" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"/></svg>`;
  }
  if (p.kind === "mini") return `<div class="mini-art">${thong(p.item)}</div>`;
  const pair = (cut) => p.kind === "duo" ? `<div class="duo-art c-${cut}"><div>${thong(p.item, cut)}</div><div>${thong(p.item)}</div></div>` : thong(p.item, cut, `c-${cut}`);
  return pair("flat") + pair("pouch");
}

function card(p, l, ctx) {
  const t = T[l], id = p.sku.toLowerCase();
  const bg = "var(--soft)"; // fond des cartes : couleur de la marque, sur toutes les pages
  const opts = [];
  if (p.kind === "ess") opts.push(`<div class="swatches" role="group" aria-label="${t.color}">${ESS.map((e, i) => `<button type="button" style="--sw:${e.c}" aria-pressed="${i === 0}" data-col="${e.k}" data-hex="${e.c}" aria-label="${e.n[l]}"></button>`).join("")}</div>`);
  if (p.sized && !p.sizeOnly) opts.push(`<div class="seg" role="group" aria-label="${t.cut}"><button type="button" data-cut="flat" aria-pressed="true">${t.flat}</button><button type="button" data-cut="pouch" aria-pressed="false">${t.pouch}</button></div>`);
  if (p.sized) opts.push(`<label class="sr" for="sz-${id}">${t.size}</label><select id="sz-${id}" data-size>${SIZES.map((s) => `<option${s === "M" ? " selected" : ""}>${s}</option>`).join("")}</select>`);
  const action = p.buyable
    ? `<button type="button" class="add" data-add data-sku="${p.sku}" data-name="${esc(p.name)}" data-price="${p.price}" data-color="${p.color}">${t.add}</button>`
    : `<a class="add" href="#liste">${t.notify}</a>`;
  const mention = p.bo ? `<p class="mention">${t.boMention}</p>` : (p.kind !== "bo" ? `<p class="compo">${t.composition}</p>` : "");
  const giftAlt = p.giftAlt && p.buyable ? `<a class="nosize" href="${p.giftAlt}">${VPC[l].noSize}</a>` : "";
  return `<article class="card" id="p-${id}" data-cut="flat">
  <div class="art${p.photo ? " has-photo" : ""}" style="background:${bg}">${art(p, l)}<span class="badge">${esc(p.badge)}</span></div>
  <div class="meta"><h3>${esc(p.name)}</h3><span class="price">${eur(p.price, l)}</span></div>
  <p class="desc">${esc(p.desc)}</p>${mention}
  ${opts.length ? `<div class="opts">${opts.join("")}</div>` : ""}${giftAlt}
  ${action}
</article>`;
}
const grid = (ps, l) => `<div class="grid">${ps.map((p) => card(p, l)).join("")}</div>`;

// ---------- JSON-LD ----------
// Pages qui ne doivent jamais être indexées, même après le lancement.
const PREVIEWS = ["emails", "insta", "fiche-google"];
const NOINDEX = new Set(["404", "account", "cookies", "terms", "privacy", "legal"]);
const ORG = { "@type": "Organization", "@id": `${SITE}/#org`, name: "UNIS", alternateName: ["UNIS strings unisexes", "UNIS et Bo l'ours"], url: `${SITE}/`, logo: { "@type": "ImageObject", url: `${SITE}/assets/logo-512.png`, width: 512, height: 512 }, slogan: "Un fil. Tous les corps. Même les ours." };
const shippingLD = {
  "@type": "OfferShippingDetails",
  shippingRate: { "@type": "MonetaryAmount", value: SHIPPING.fee, currency: "EUR" },
  shippingDestination: ["BE", "FR", "NL", "LU", "DE", "AT"].map((c) => ({ "@type": "DefinedRegion", addressCountry: c })),
  deliveryTime: { "@type": "ShippingDeliveryTime", handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" }, transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 4, unitCode: "DAY" } },
};
const freeShippingLD = { ...shippingLD, shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "EUR" }, eligibleTransactionVolume: { "@type": "PriceSpecification", minPrice: SHIPPING.freeFrom, priceCurrency: "EUR" } };
const returnLD = { "@type": "MerchantReturnPolicy", applicableCountry: ["BE", "FR", "NL", "LU", "DE", "AT"], returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow", merchantReturnDays: 14, returnMethod: "https://schema.org/ReturnByMail" };
function productLD(p, l, url) {
  const offer = { "@type": "Offer", price: p.price.toFixed(2), priceCurrency: "EUR", url, availability: p.buyable ? (p.season && !p.bo ? "https://schema.org/LimitedAvailability" : "https://schema.org/InStock") : "https://schema.org/PreOrder", itemCondition: "https://schema.org/NewCondition", shippingDetails: [shippingLD, freeShippingLD], hasMerchantReturnPolicy: returnLD };
  if (p.season && p.buyable && p.sku !== "UNIS-BO") offer.priceValidUntil = CFG.dropPriceValidUntil;
  return { "@type": "Product", name: p.name, sku: p.sku, description: p.desc, ...(p.photo ? { image: `${SITE}/${photoUrl(p.photo, 1200)}` } : p.bo ? { image: `${SITE}/assets/images/og-unis.jpg` } : {}), brand: { "@type": "Brand", name: "UNIS" }, offers: offer };
}
const crumbsLD = (items) => ({ "@type": "BreadcrumbList", itemListElement: items.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(p) })) });
const faqLD = (faq) => ({ "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });

// ---------- shared blocks ----------
function seasonStrip(l, here, current) {
  return `<ol class="strip">${SEASONS.filter((s) => !s.capsule).map((s) => {
    const isLive = s === LIVE;
    return `<li><a class="season${s.id === current ? " on" : ""}" href="${here(pathOf(l, "season", s.id))}"${s.id === current ? ' aria-current="page"' : ""}>
      <span class="when">${isLive ? `<b class="now">${T[l].live}</b>` : fdate(s.next, l)}</span>
      <span class="name">${sName(s, l)}</span>
      <span class="dot" aria-hidden="true">${[s.c.accent, s.c.soft, s.c.ink].map((c) => `<i style="background:${c}"></i>`).join("")}</span></a></li>`;
  }).join("")}</ol>`;
}
function sizeTable(l) {
  const t = T[l];
  return `<table class="sizes"><caption>${t.sizeCap}</caption><thead><tr><th scope="col">${t.sizeCol}</th><th scope="col">${t.hipCol}</th><th scope="col">${t.waistCol}</th></tr></thead><tbody>${SIZE_TABLE.map(([s, h, w]) => `<tr><th scope="row">${s}</th><td>${h}</td><td>${w}</td></tr>`).join("")}</tbody></table><p class="note">${t.sizeNote}</p>`;
}
function cuts(l) {
  const t = T[l];
  const svg = (k) => `<svg viewBox="0 0 200 160" aria-hidden="true" focusable="false"><path d="${SHAPE[k]}" fill="var(--soft)" stroke="var(--ink)" stroke-width="3"/></svg>`;
  return `${PLACEMENT.cuts ? `<figure class="cuts-photo">${photo(PLACEMENT.cuts, l, { sizes: "(max-width: 820px) 100vw, 560px" })}</figure>` : ""}<div class="cut">${svg("flat")}<div><h3>${t.flat}</h3><p>${t.flatP}</p></div></div><div class="cut">${svg("pouch")}<div><h3>${t.pouch}</h3><p>${t.pouchP}</p></div></div><p>${t.cutsNote}</p>`;
}
function faqBlock(faq, title, id = "faq") {
  return `<section class="faq band" id="${id}" aria-labelledby="h-${id}"><div class="wrap"><h2 id="h-${id}">${title}</h2>${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div></section>`;
}
function waitlist(l) {
  const t = T[l];
  return `<section class="wait band" id="liste" aria-labelledby="h-wait"><div class="wrap box">
  <div><h2 id="h-wait">${t.waitTitle}</h2><p>${t.waitText}</p></div>
  <form class="waitform" novalidate>
    <label for="email">${t.emailLabel}</label>
    <div class="row"><input id="email" name="email" type="email" autocomplete="email" required placeholder="${l === "en" ? "name@example.com" : l === "de" ? "name@beispiel.de" : "prenom@exemple.be"}"><button class="btn primary" type="submit">${t.join}</button></div>
    <label for="cutpref">${X[l].cutPref}</label>
    <select id="cutpref" name="cut"><option value="">${X[l].cutAny}</option><option value="flat">${t.flat}</option><option value="pouch">${t.pouch}</option></select>
    <label class="check"><input type="checkbox" name="consent" required> <span>${t.consent}</span></label>
    <p class="note">${X[l].doubleOptin} ${DB ? A[l].waitNoteReal : t.waitDemo}</p>
    <p class="ok" role="status" hidden></p>
  </form></div></section>`;
}
const REASSURE_ICONS = [
  '<path d="M4 12h16M12 4v16" />', // prix
  '<path d="M4 18 L4 6 M20 18 L20 6 M8 12h8" />', // tailles
  '<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" /><circle cx="7" cy="17" r="1.6"/><circle cx="17" cy="17" r="1.6"/>', // livraison
  '<path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4" />', // retour
  '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.6 2.4 2.6 14.6 0 17M12 3.5c-2.6 2.4-2.6 14.6 0 17" />', // Europe
];
const reassure = (l) => `<ul class="reassure" aria-label="UNIS">${[...X[l].reassure, VPC[l].europe].map((r, i) => `<li><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${REASSURE_ICONS[i]}</svg>${r}</li>`).join("")}</ul>`;
const xmasBar = (l) => `<p class="deadline"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/></svg><span>${VPC[l].xmasBar}</span></p>`;
const shareBtn = (l, title, url) => `<p class="share-row"><button class="btn ghost share" type="button" data-share data-title="${esc(title)}" data-url="${url}">${VPC[l].share}</button></p>`;
const heroInset = (l) => { const k = PLACEMENT.itemCard[seasonProducts(LIVE, l).find((p) => p.kind === "adult")?.sku]; return k ? `<span class="hero-inset">${photo(k, l, { sizes: "160px" })}</span>` : ""; };
const buyBar = (p, l) => p ? `<div class="buybar" id="buybar"><span><b>${esc(p.name)}</b> ${eur(p.price, l)}</span><button type="button" class="btn primary" data-buybar="${p.sku}">${T[l].add}</button></div>` : "";
const PAY = ["Bancontact", "Visa", "Mastercard", "Apple Pay", "Google Pay", "iDEAL"];
const payBadges = () => `<ul class="pay">${PAY.map((p) => `<li>${p}</li>`).join("")}</ul>`;

function faqCats(l, here) {
  const x = X[l];
  return `<section class="faq band" id="faq" aria-labelledby="h-faq"><div class="wrap"><h2 id="h-faq">${T[l].faqTitle}</h2>
  <p class="note">${fill(x.faqUpdated, { d: fdate(CFG.launchDate, l) })}</p>
  ${x.faqCats.map(([cat, qs]) => `<h3 class="faqcat">${cat}</h3>${qs.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}`).join("")}
  <p class="more">${x.faqMore} <a href="${here(pathOf(l, "contact"))}">${x.faqContact}</a></p></div></section>`;
}

function promise(l) {
  const t = T[l];
  return `<section class="promise band" aria-labelledby="h-prom"><div class="wrap"><h2 id="h-prom">${t.promTitle}</h2><div class="cols">${t.prom.map(([h, p]) => `<div><h3>${h}</h3><p>${p}</p></div>`).join("")}</div></div></section>`;
}
const pageHead = (h1, intro, crumbs, here) => `<section class="pagehead"><div class="wrap">
  <nav aria-label="Breadcrumb" class="crumbs"><ol>${crumbs.map(([n, p], i) => i < crumbs.length - 1 ? `<li><a href="${here(p)}">${esc(n)}</a></li>` : `<li aria-current="page">${esc(n)}</li>`).join("")}</ol></nav>
  <h1>${h1}</h1>${intro ? `<p class="lead">${intro}</p>` : ""}</div></section>`;

// ---------- layout ----------
function layout({ l, key, sid, title, desc, body, ld = [], palette = BASE, noAlt = false }) {
  const t = T[l], x = X[l], a = A[l];
  const self = key === "404" ? "404.html" : pathOf(l, key, sid);
  const depth = key === "404" ? 0 : self.split("/").filter(Boolean).length;
  // La 404 peut être servie à n'importe quelle profondeur : liens absolus depuis la racine du site.
  const here = key === "404" ? (p) => BASE_PATH + p : (p) => "../".repeat(depth) + p;
  const alts = noAlt ? "" : LANGS.map((x) => `<link rel="alternate" hreflang="${x}" href="${abs(pathOf(x, key, sid))}">`).join("\n") + `\n<link rel="alternate" hreflang="x-default" href="${abs(pathOf(XDEFAULT, key, sid))}">`;
  const strings = { copied: VPC[l].copied, upsell: VPC[l].upsell, upLot: VPC[l].upLot, upDuo: VPC[l].upDuo, upOr: VPC[l].upOr, upLotUrl: `${BASE_PATH}${pathOf(l, "ess")}#p-unis-ess-lot5`, upDuoUrl: `${BASE_PATH}${pathOf(l, "season", LIVE.id)}#p-${(seasonProducts(LIVE, l).find((p) => p.kind === "duo")?.sku || "").toLowerCase()}`, cart: t.cart, empty: t.empty, shipFree: t.shipFree, shipLeft: t.shipLeft, added: t.added, checkoutMsg: t.checkoutMsg, errEmail: t.errEmail, errConsent: t.errConsent, okWait: t.okWait, flat: t.flat, pouch: t.pouch, minus: t.qtyMinus, plus: t.qtyPlus, locale: t.locale, free: SHIPPING.freeFrom, fee: SHIPPING.fee, shippingFree: x.shippingFree, errName: x.contact.errName, errMsg: x.contact.errMsg, okContact: DB ? a.okContactSaved : x.contact.ok, lang: l, page: key,
    okWaitSaved: a.okWaitSaved, waitAlready: a.waitAlready, acc: a.account,
    db: DB ? { url: CFG.supabaseUrl, key: CFG.supabaseAnonKey, lib: SB_LIB } : null,
    consentVersion: CFG.consentVersion, ga4: CFG.ga4Id, pixel: CFG.metaPixelId,
    stamp: { season: LIVE.id, year: CFG.dropYear, name: sName(LIVE, l) },
    seasons: SEASONS.map((s) => ({ id: s.id, name: sName(s, l), color: s.c.accent })) };
  const nav = [["shop", pathOf(l, "season", LIVE.id)], ["bo", pathOf(l, "bo")], ["ess", pathOf(l, "ess")], ["seasons", pathOf(l, "seasons")], ["size", pathOf(l, "size")], ["help", pathOf(l, "help")]];
  const graph = [ORG, ...ld];
  if (title.length >= 60) warnings.push(`Title trop long (${title.length}) : ${self} « ${title} »`);
  if (desc && (desc.length < 120 || desc.length > 155)) warnings.push(`Meta description hors 120–155 (${desc.length}) : ${self}`);
  const body2 = body(here);
  return `<!DOCTYPE html>
<html lang="${l}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
${desc ? `<meta name="description" content="${esc(desc)}">` : ""}
${CFG.indexable && !NOINDEX.has(key) ? "" : '<meta name="robots" content="noindex, follow">'}
${key === "404" ? "" : `<link rel="canonical" href="${abs(self)}">`}
${alts}
<meta property="og:type" content="website">
<meta property="og:site_name" content="UNIS">
<meta property="og:title" content="${esc(title)}">
${desc ? `<meta property="og:description" content="${esc(desc)}">` : ""}
<meta property="og:url" content="${abs(self)}">
<meta property="og:locale" content="${t.ogLocale}">
<meta property="og:image" content="${SITE}/assets/images/${OG_IMAGE.file}">
<meta property="og:image:width" content="${OG_IMAGE.width}">
<meta property="og:image:height" content="${OG_IMAGE.height}">
<meta property="og:image:alt" content="${esc(PHOTOS.noelAllonge.alt[l])}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${palette.accent}">
<link rel="icon" href="${here("assets/favicon.svg")}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${here("assets/style.css")}?v=${V.css}">
<style>:root{--bg:${palette.bg};--ink:${palette.ink};--accent:${palette.accent};--soft:${palette.soft};--on-accent:${palette.on}}</style>
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
</head>
<body>
<a class="skip" href="#main">${t.skip}</a>
<p class="demo-bar">${t.demo}</p>
<header class="top"><div class="wrap">
  <a class="logo" href="${here(pathOf(l, "home"))}" aria-label="UNIS">${logoMark()}</a>
  <button class="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="${t.menu}"><svg width="26" height="20" viewBox="0 0 26 20" aria-hidden="true"><path d="M2 3h22M2 10h22M2 17h22" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>
  <nav class="main" id="nav" aria-label="${t.menu}">${nav.map(([k, p]) => `<a href="${here(p)}"${p === self ? ' aria-current="page"' : ""}>${t.nav[k]}</a>`).join("")}</nav>
  <details class="lang"><summary aria-label="${t.langLabel}">${l.toUpperCase()}</summary><ul>${LANGS.map((x) => `<li><a href="${here(key === "404" ? pathOf(x, "home") : pathOf(x, key, sid))}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="true"' : ""}>${T[x].langName}</a></li>`).join("")}</ul></details>
  <a class="accbtn" href="${here(pathOf(l, "account"))}" aria-label="${a.navAccount}"${key === "account" ? ' aria-current="page"' : ""}><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg></a>
  <button class="cartbtn" id="openCart" type="button" aria-haspopup="dialog"><span>${t.cart}</span> <b id="count">0</b></button>
</div></header>
<main id="main">
${body2}
</main>
<footer class="foot"><div class="wrap">
  <div class="cols">
    <div><p class="foot-logo">${logoMark()}<span class="sr">UNIS</span></p><p>${t.signature}</p></div>
    <div><p class="ft">${t.footShop}</p><ul><li><a href="${here(pathOf(l, "season", LIVE.id))}">${fill(t.home.shopTitle, { s: sName(LIVE, l) }).split(":")[1]?.trim() || t.nav.shop}</a></li><li><a href="${here(pathOf(l, "bo"))}">${t.boName}</a></li><li><a href="${here(pathOf(l, "ess"))}">${t.nav.ess}</a></li><li><a href="${here(pathOf(l, "seasons"))}">${t.nav.seasons}</a></li><li><a href="${here(pathOf(l, "club"))}">${x.nav.club}</a></li></ul></div>
    <div><p class="ft">${t.footHelp}</p><ul><li><a href="${here(pathOf(l, "size"))}">${t.sizeCap.split(" (")[0]}</a></li><li><a href="${here(pathOf(l, "help"))}">${t.helpPage.shipTitle} · ${t.helpPage.retTitle.split(" ")[0]}</a></li><li><a href="${here(pathOf(l, "help"))}#faq">${t.faqLink}</a></li><li><a href="${here(pathOf(l, "contact"))}">${x.nav.contact}</a></li><li><a href="${here(pathOf(l, "account"))}">${a.navAccount}</a></li><li><button type="button" class="linkbtn" data-cookie-open>${a.cookie.manage}</button></li></ul></div>
    <div><p class="ft">${t.footInfo}</p><ul><li><a href="${here(pathOf(l, "about"))}">${x.nav.about}</a></li><li><a href="${here(pathOf(l, "journal"))}">${x.nav.journal}</a></li>${["terms", "privacy", "legal"].map((k) => `<li><a href="${here(pathOf(l, k))}">${t.legalNav[k]}</a></li>`).join("")}<li><a href="${here(pathOf(l, "cookies"))}">${x.nav.cookies}</a></li></ul></div>
  </div>
  <div class="trust">
    <div><p class="ft">${x.payTitle}</p>${payBadges()}<p class="small">${x.payNote}</p></div>
    <div><p class="ft">${x.guarantee}</p><p class="small"><a href="https://mediationconsommateur.be" rel="noopener">${x.mediation}</a></p></div>
    <div><p class="ft">${x.followTitle}</p><p class="small">${x.followText}</p></div>
  </div>
  <p class="legal">${t.legalLine}</p>
</div></footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="hcart" aria-hidden="true" inert>
  <header><h2 id="hcart">${t.cartTitle}</h2><button class="x" id="closeCart" type="button" aria-label="${t.close}">×</button></header>
  <div class="lines" id="lines"></div>
  <footer>
    <dl class="sums"><div><dt>${x.subtotal}</dt><dd id="subtotal">${eur(0, l)}</dd></div><div><dt>${x.shipping}</dt><dd id="shipCost">${eur(SHIPPING.fee, l)}</dd></div></dl>
    <div class="total"><span>${t.total}</span><span id="total">${eur(0, l)}</span></div>
    <p class="ship" id="shipMsg"></p><p class="upsell" id="upsell" hidden></p>
    <div class="bar"><i id="shipBar"></i></div>
    <label class="check cgv"><input type="checkbox" id="cgv"> <span>${x.cgv} <a href="${here(pathOf(l, "terms"))}">${x.cgvLink}</a></span></label>
    <p class="err" id="cgvErr" role="alert" hidden>${x.errCgv}</p>
    <button class="btn primary" id="checkout" type="button">${t.checkout}</button>
    <p class="note">${x.guest} ${t.checkoutNote}</p>
    ${payBadges()}
  </footer>
</aside>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script type="application/json" id="i18n">${JSON.stringify(strings)}</script>
<div class="cookiebar" id="cookiebar" role="dialog" aria-modal="false" aria-labelledby="ck-title" hidden>
  <div class="ck-inner">
    <h2 id="ck-title" class="h3">${a.cookie.title}</h2>
    <p>${a.cookie.text} <a href="${here(pathOf(l, "cookies"))}">${a.cookie.policy}</a></p>
    <div class="ck-prefs" id="ck-prefs" hidden>
      <label class="check"><input type="checkbox" checked disabled> <span><b>${a.cookie.necessary[0]}</b> (${a.cookie.always}). ${a.cookie.necessary[1]}</span></label>
      <label class="check"><input type="checkbox" id="ck-analytics"> <span><b>${a.cookie.analytics[0]}</b>. ${a.cookie.analytics[1]}</span></label>
      <label class="check"><input type="checkbox" id="ck-marketing"> <span><b>${a.cookie.marketing[0]}</b>. ${a.cookie.marketing[1]}</span></label>
    </div>
    <div class="ck-actions">
      <button type="button" class="btn ck" data-ck="reject_all">${a.cookie.reject}</button>
      <button type="button" class="btn ck" data-ck="customize" id="ck-custom">${a.cookie.customize}</button>
      <button type="button" class="btn ck" data-ck="save" id="ck-save" hidden>${a.cookie.save}</button>
      <button type="button" class="btn ck" data-ck="accept_all">${a.cookie.accept}</button>
    </div>
  </div>
</div>
<script src="${here("assets/app.js")}?v=${V.js}" defer></script>
</body>
</html>
`;
}

// ---------- pages ----------
const pages = [];
const add = (l, key, sid, html) => pages.push({ file: key === "404" ? "404.html" : pathOf(l, key, sid) + "index.html", html, l, key, sid });

for (const l of LANGS) {
  const t = T[l];
  const home = [t.breadcrumbHome, pathOf(l, "home")];
  const liveName = sName(LIVE, l);

  // Accueil
  const homeProducts = [boProduct(l), ...seasonProducts(LIVE, l).filter((p) => ["duo", "adult", "mini"].includes(p.kind)).slice(0, 3), essProduct(l)];
  add(l, "home", null, layout({ l, key: "home", title: t.home.title, desc: t.home.desc,
    ld: [{ "@type": "WebSite", "@id": `${SITE}/#site`, url: `${SITE}/`, name: "UNIS", inLanguage: LANGS, publisher: { "@id": `${SITE}/#org` } }],
    body: (here) => `<section class="hero" aria-labelledby="h1"><div class="wrap">
  <div>
    <p class="drop-tag"><i></i><span>${fill(t.dropLive, { s: liveName })}</span></p>
    <h1 id="h1"><span>${t.home.h1a}</span><span>${t.home.h1b}</span><span class="h1sub">${t.home.h1c}</span></h1>
    <p class="lead">${t.home.lead}</p>
    <div class="ctas"><a class="btn primary" href="${here(pathOf(l, "season", LIVE.id))}#produits">${VPC[l].ctaGift}</a><a class="btn ghost" href="${here(pathOf(l, "bo"))}">${t.home.ctaBo}</a></div>
    <p class="hero-trust">${LIVE.id === "noel" ? VPC[l].heroTrustXmas : VPC[l].heroTrust}</p>
  </div>
  ${PLACEMENT.hero[LIVE.id] ? `<div class="hero-art photo">${photo(PLACEMENT.hero[LIVE.id], l, { eager: true })}${heroInset(l)}<span class="price-chip">${VPC[l].chip} ${eur(PRICES.adult, l)}</span></div>` : `<div class="hero-art" role="img" aria-label="${esc(t.boName)}">${bear(LIVE.items[0], LIVE.c.accent, LIVE.id === "noel")}<span class="price-chip">Bo ${eur(PRICES.bo, l)}</span></div>`}
</div><svg class="thread" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path d="M-10 60 C 150 10, 260 110, 420 60 S 700 10, 820 70 S 1080 110, 1210 40"/></svg></section>
<div class="wrap">${LIVE.id === "noel" ? xmasBar(l) : ""}${reassure(l)}</div>
<section class="forwho" aria-labelledby="hfor"><div class="wrap"><h2 id="hfor">${VPC[l].forTitle}</h2><p class="intro">${VPC[l].forIntro}</p><ul class="forwho-list">${VPC[l].for.map(([h, p, cta, k, sid]) => `<li><h3>${h}</h3><p>${p}</p><a href="${here(pathOf(l, k, sid === "live" ? LIVE.id : sid))}">${cta}</a></li>`).join("")}</ul></div></section>
<section class="seasons" aria-labelledby="hs"><div class="wrap"><header><h2 id="hs">${t.seasonsTitle}</h2><p>${t.seasonsText}</p></header>${seasonStrip(l, here, LIVE.id)}</div></section>
<section class="shop band" aria-labelledby="hshop"><div class="wrap"><h2 id="hshop">${fill(t.home.shopTitle, { s: liveName })}</h2><p class="intro">${t.home.shopIntro}</p>${grid(homeProducts, l)}<p class="more"><a class="btn ghost" href="${here(pathOf(l, "season", LIVE.id))}">${fill(t.home.seeAll, { s: liveName })}</a></p></div></section>
<section class="cuts band" aria-labelledby="hcuts"><div class="wrap"><h2 id="hcuts">${t.cutsTitle}</h2><div class="two"><div>${cuts(l)}</div><div>${sizeTable(l)}</div></div></div></section>
${promise(l)}${waitlist(l)}${faqBlock(t.faq, t.faqTitle)}` }));

  // Bo
  const boPs = [boProduct(l), ...SEASONS.filter((s) => s === LIVE && s.box).flatMap((s) => seasonProducts(s, l).filter((p) => p.bo)), ...seasonProducts(LIVE, l).filter((p) => p.kind === "mini")];
  const boUrl = abs(pathOf(l, "bo"));
  add(l, "bo", null, layout({ l, key: "bo", title: t.bo.title, desc: t.bo.desc,
    ld: [crumbsLD([home, [t.boName, pathOf(l, "bo")]]), ...boPs.map((p) => productLD(p, l, boUrl))],
    body: (here) => `${pageHead(t.bo.h1, "", [home, [t.boName, pathOf(l, "bo")]], here)}
<section class="band"><div class="wrap split"><div class="prose">${t.bo.p.map((p) => `<p>${p}</p>`).join("")}${shareBtn(l, t.bo.title.split(" | ")[0], boUrl)}<h2 class="h3">${t.bo.specsTitle}</h2><ul class="ticks">${t.bo.specs.map((s) => `<li>${s}</li>`).join("")}</ul><h2 class="h3">${t.bo.safetyTitle}</h2><p>${t.bo.safety}</p><p class="mention">${t.boMention}</p></div>
<div class="hero-art small photo">${photo(PLACEMENT.boPage, l, { eager: true })}</div></div></section>
<section class="shop band" aria-labelledby="hbuy"><div class="wrap"><h2 id="hbuy">${t.bo.shopTitle}</h2>${grid(boPs, l)}</div></section>
${waitlist(l)}` }));

  // Essentiels
  const essPs = [essProduct(l), lotProduct(l)];
  const essUrl = abs(pathOf(l, "ess"));
  add(l, "ess", null, layout({ l, key: "ess", title: t.essPage.title, desc: t.essPage.desc,
    ld: [crumbsLD([home, [t.nav.ess, pathOf(l, "ess")]]), ...essPs.map((p) => productLD(p, l, essUrl))],
    body: (here) => `${pageHead(t.essPage.h1, t.essPage.intro, [home, [t.nav.ess, pathOf(l, "ess")]], here)}
<section class="shop band" aria-labelledby="hess"><div class="wrap"><h2 id="hess" class="sr">${VPC[l].productsTitle}</h2>${grid(essPs, l)}<p class="more"><a href="${here(pathOf(l, "size"))}">${t.sizeLink}</a></p></div></section>
<section class="cuts band" aria-labelledby="hcuts"><div class="wrap"><h2 id="hcuts">${t.cutsTitle}</h2><div class="two"><div>${cuts(l)}</div><div>${sizeTable(l)}</div></div></div></section>` }));

  // Saisons (index)
  add(l, "seasons", null, layout({ l, key: "seasons", title: t.seasonsPage.title, desc: t.seasonsPage.desc,
    ld: [crumbsLD([home, [t.nav.seasons, pathOf(l, "seasons")]])],
    body: (here) => `${pageHead(t.seasonsPage.h1, t.seasonsPage.intro, [home, [t.nav.seasons, pathOf(l, "seasons")]], here)}
<section class="band"><div class="wrap"><div class="season-cards">${SEASONS.map((s) => `<a class="scard" href="${here(pathOf(l, "season", s.id))}" style="--sbg:var(--soft);--sink:var(--ink);--sacc:${s.c.accent}">
  <div class="sart">${thong(s.items[0])}</div><div><span class="tag">${s === LIVE ? t.live : fill(t.dropDate, { d: fdate(s.next, l) })}</span><h2 class="h3">${sName(s, l)}</h2><p>${esc(T[l].season[s.id].h1)}</p></div></a>`).join("")}</div></div></section>
${waitlist(l)}` }));

  // Une page par saison
  for (const s of SEASONS) {
    const st = t.season[s.id], live = s === LIVE, sn = sName(s, l);
    const ps = seasonProducts(s, l);
    const url = abs(pathOf(l, "season", s.id));
    const sfaq = [...t.seasonFaq.map(([q, a]) => [fill(q, { s: sn }), a]), live && s.id === "noel" ? t.faqXmas : [fill(t.faqWhen[0], { s: sn }), fill(t.faqWhen[1], { d: fdate(s.next, l) })]];
    const crumbs = [home, [t.nav.seasons, pathOf(l, "seasons")], [sn, pathOf(l, "season", s.id)]];
    add(l, "season", s.id, layout({ l, key: "season", sid: s.id, title: st.title, desc: fill(t.seasonDesc, { p: st.phrase }), palette: BASE,
      ld: [crumbsLD(crumbs), ...ps.map((p) => productLD(p, l, url))],
      body: (here) => `${pageHead(st.h1, st.intro, crumbs, here)}
<div class="wrap">${live && s.id === "noel" ? xmasBar(l) : ""}${reassure(l)}${shareBtn(l, st.title.split(" | ")[0], url)}</div>
${s.capsule ? `<section class="wrap donation"><h2 class="h3">${ROSE[l].donationTitle}</h2><p>${roseFill(ROSE[l].donation, l)}</p><p class="note">${roseFill(ROSE[l].note, l)}</p></section>` : ""}
${live ? "" : `<div class="wrap"><p class="soon-box"><b>${t.soon}</b> ${fill(t.seasonSoon, { d: fdate(s.next, l) })} <a href="#liste">${t.join}</a></p></div>`}
<section class="shop band" id="produits" aria-labelledby="hdrop"><div class="wrap"><h2 id="hdrop" class="sr">${VPC[l].productsTitle}</h2>${grid(ps, l)}</div></section>
${live ? buyBar(ps.find((p) => p.kind === "duo"), l) : ""}
${VIDEOS[s.id] ? `<figure class="wrap season-photo season-video"><video data-autoplay muted loop playsinline controls preload="none" width="${VIDEOS[s.id].width}" height="${VIDEOS[s.id].height}" poster="${BASE_PATH}assets/images/${VIDEOS[s.id].poster}" aria-label="${esc(VIDEOS[s.id].label[l])}"><source src="${BASE_PATH}assets/video/${VIDEOS[s.id].file}-640.mp4" type="video/mp4" media="(max-width: 700px)"><source src="${BASE_PATH}assets/video/${VIDEOS[s.id].file}.mp4" type="video/mp4"></video></figure>` : PLACEMENT.season[s.id] ? `<figure class="wrap season-photo">${photo(PLACEMENT.season[s.id], l, { sizes: "(max-width: 1180px) 100vw, 1180px", eager: true })}</figure>` : ""}
<section class="band"><div class="wrap two"><div class="prose"><h2>${t.chooseTitle}</h2><ul class="ticks">${t.choose.map((c) => `<li>${c}</li>`).join("")}</ul><p><a href="${here(pathOf(l, "size"))}">${t.sizeLink}</a> · <a href="${here(pathOf(l, "ess"))}">${t.nav.ess}</a></p></div><div class="prose"><h2>${t.helpPage.shipTitle}</h2><p>${t.helpPage.ship}</p></div></div></section>
${faqBlock(sfaq, t.faqTitle)}
<section class="seasons band"><div class="wrap"><h2>${t.seasonsTitle}</h2>${seasonStrip(l, here, s.id)}</div></section>
${waitlist(l)}` }));
  }

  // Guide des tailles
  add(l, "size", null, layout({ l, key: "size", title: t.sizePage.title, desc: t.sizePage.desc,
    ld: [crumbsLD([home, [t.sizeCap.split(" (")[0], pathOf(l, "size")]])],
    body: (here) => `${pageHead(t.sizePage.h1, "", [home, [t.sizeCap.split(" (")[0], pathOf(l, "size")]], here)}
<section class="band"><div class="wrap two"><div><h2>${t.sizePage.howTitle}</h2><ol class="steps">${t.sizePage.how.map((x) => `<li>${x}</li>`).join("")}</ol>${sizeTable(l)}</div><div><h2>${t.cutsTitle}</h2>${cuts(l)}</div></div></section>` }));

  // Aide
  add(l, "help", null, layout({ l, key: "help", title: t.helpPage.title, desc: t.helpPage.desc,
    ld: [crumbsLD([home, [t.nav.help, pathOf(l, "help")]]), faqLD(X[l].faqCats.flatMap(([, qs]) => qs))],
    body: (here) => `${pageHead(t.helpPage.h1, "", [home, [t.nav.help, pathOf(l, "help")]], here)}
${PLACEMENT.help ? `<section class="band"><div class="wrap split"><div class="prose"><h2 class="h3">${t.prom[2][0]}</h2><p>${t.prom[2][1]}</p></div><div class="hero-art small photo">${photo(PLACEMENT.help, l)}</div></div></section>` : ""}
<section class="band"><div class="wrap cols3">${[["shipTitle", "ship"], ["retTitle", "ret"], ["payTitle", "pay"]].map(([h, p]) => `<div class="prose"><h2 class="h3">${t.helpPage[h]}</h2><p>${t.helpPage[p]}</p></div>`).join("")}</div></section>
${faqCats(l, here)}` }));

  // ---- Pages ajoutées après les cours ----
  const x = X[l];
  const crumb = (k, name) => [home, [name, pathOf(l, k)]];

  // À propos / manifeste (Communication Web : Qui ? ; e-Commerce p.73-75)
  const va = VPC[l].about;
  add(l, "about", null, layout({ l, key: "about", title: va.title, desc: va.desc,
    ld: [crumbsLD(crumb("about", x.nav.about)), { "@type": "AboutPage", name: va.title, url: abs(pathOf(l, "about")), about: { "@id": `${SITE}/#org` } }],
    body: (here) => `${pageHead(x.about.h1, va.intro, crumb("about", x.nav.about), here)}
<section class="band"><div class="wrap split"><div class="prose"><h2>${va.whyTitle}</h2>${va.why.map((p) => `<p>${p}</p>`).join("")}</div>
<div class="hero-art small" role="img" aria-label="${esc(t.boName)}">${bear(LIVE.items[0], LIVE.c.accent, LIVE.id === "noel")}</div></div></section>
<section class="promise band" aria-labelledby="h-val"><div class="wrap"><h2 id="h-val">${va.howTitle}</h2><div class="cols">${va.how.map(([h, p]) => `<div><h3>${h}</h3><p>${p}</p></div>`).join("")}</div></div></section>
<section class="band"><div class="wrap two"><div class="prose"><h2>${x.about.teamTitle}</h2><p>${x.about.team}</p><h2 class="h3">${va.whatTitle}</h2><p>${va.what}</p><p class="pitch">${va.pitch}</p></div>
<div class="prose" id="regles"><h2>${va.linesTitle}</h2><ul class="ticks">${va.lines.map((r) => `<li>${r}</li>`).join("")}</ul><h2 class="h3">${x.about.rulesTitle}</h2><ul class="ticks">${x.about.rules.map((r) => `<li>${r}</li>`).join("")}</ul><p><a href="${here(pathOf(l, "contact"))}">${x.nav.contact}</a></p></div></div></section>` }));

  // Contact (e-Commerce p.77-84 ; Communication Web : réactivité)
  add(l, "contact", null, layout({ l, key: "contact", title: x.contact.title, desc: x.contact.desc,
    ld: [crumbsLD(crumb("contact", x.nav.contact)), { "@type": "ContactPage", name: x.contact.title, url: abs(pathOf(l, "contact")) }],
    body: (here) => `${pageHead(x.contact.h1, x.contact.intro, crumb("contact", x.nav.contact), here)}
<section class="band"><div class="wrap two">
<form class="contactform" novalidate>
  <label for="c-name">${x.contact.name}</label><input id="c-name" name="name" autocomplete="given-name" required>
  <label for="c-email">${x.contact.email}</label><input id="c-email" name="email" type="email" autocomplete="email" required>
  <label for="c-subject">${x.contact.subject}</label><select id="c-subject" name="subject">${x.contact.subjects.map((s) => `<option>${s}</option>`).join("")}</select>
  <label for="c-order">${x.contact.order}</label><input id="c-order" name="order">
  <label for="c-msg">${x.contact.message}</label><textarea id="c-msg" name="message" rows="6" required></textarea>
  <label class="check"><input type="checkbox" name="consent" required> <span>${x.contact.consent}</span></label>
  <button class="btn primary" type="submit">${x.contact.send}</button>
  <p class="note">${DB ? A[l].contactNoteReal : x.contact.demo}</p>
  <p class="ok" role="status" hidden></p>
</form>
<div class="prose"><h2 class="h3">${T[l].faqTitle}</h2><p><a href="${here(pathOf(l, "help"))}#faq">${t.faqLink}</a> · <a href="${here(pathOf(l, "size"))}">${t.sizeLink}</a></p>
<h2 class="h3">${x.contact.coordTitle}</h2><ul class="plain">${Object.values(L[l].company).map((v) => `<li>${esc(v)}</li>`).join("")}</ul><p>${x.contact.mediationText}</p></div>
</div></section>` }));

  // Club de Bo (E-gestion S5 : programme de fidélité)
  add(l, "club", null, layout({ l, key: "club", title: x.club.title, desc: x.club.desc,
    ld: [crumbsLD(crumb("club", x.nav.club))],
    body: (here) => `${pageHead(x.club.h1, x.club.intro, crumb("club", x.nav.club), here)}
<section class="band"><div class="wrap"><h2>${x.club.stepsTitle}</h2><ol class="stamps">${x.club.steps.map(([h, p], i) => `<li><span class="stamp" aria-hidden="true">${[1, 3, 6][i]}</span><h3>${h}</h3><p>${p}</p></li>`).join("")}</ol></div></section>
<section class="band"><div class="wrap split"><div class="prose"><h2>${x.club.perksTitle}</h2><ul class="ticks">${x.club.perks.map((p) => `<li>${p}</li>`).join("")}</ul><p class="note">${x.club.note}</p></div>
<div class="hero-art small photo">${photo(PLACEMENT.club, l)}</div></div></section>
${waitlist(l)}` }));

  // Journal + articles (content marketing : 1 newsletter = 1 article)
  add(l, "journal", null, layout({ l, key: "journal", title: x.journal.title, desc: x.journal.desc,
    ld: [crumbsLD(crumb("journal", x.nav.journal)), { "@type": "Blog", name: x.journal.h1, url: abs(pathOf(l, "journal")), publisher: { "@id": `${SITE}/#org` } }],
    body: (here) => `${pageHead(x.journal.h1, x.journal.intro, crumb("journal", x.nav.journal), here)}
<section class="band"><div class="wrap"><div class="posts">${ARTICLES.map((id) => { const a = x.articles[id]; return `<article class="post"><p class="note">${fill(x.journal.published, { d: fdate(a.date, l) })}</p><h2 class="h3"><a href="${here(pathOf(l, "article", id))}">${a.h1}</a></h2><p>${a.lead}</p><a class="add" href="${here(pathOf(l, "article", id))}" aria-hidden="true" tabindex="-1">${x.journal.read}</a></article>`; }).join("")}</div></div></section>
${waitlist(l)}` }));

  for (const id of ARTICLES) {
    const a = x.articles[id];
    const crumbs = [home, [x.nav.journal, pathOf(l, "journal")], [a.h1, pathOf(l, "article", id)]];
    const links = { taille: [["size", t.sizeLink], ["ess", t.nav.ess]], cadeau: [["season:" + LIVE.id, fill(t.home.ctaDrop, { s: sName(LIVE, l) })], ["bo", t.boName]], unisexe: [["about", x.nav.about], ["size", t.sizeLink]] }[id] || [];
    add(l, "article", id, layout({ l, key: "article", sid: id, title: a.title, desc: a.desc,
      ld: [crumbsLD(crumbs), { "@type": "BlogPosting", headline: a.h1, description: a.desc, datePublished: a.date, inLanguage: l, mainEntityOfPage: abs(pathOf(l, "article", id)), image: PLACEMENT.article[id] ? `${SITE}/${photoUrl(PLACEMENT.article[id], 1200)}` : `${SITE}/assets/bo.svg`, author: { "@id": `${SITE}/#org` }, publisher: { "@id": `${SITE}/#org` } }],
      body: (here) => `${pageHead(a.h1, a.lead, crumbs, here)}
<section class="band"><div class="wrap prose article">${PLACEMENT.article[id] ? `<figure class="article-photo">${photo(PLACEMENT.article[id], l, { sizes: "(max-width: 760px) 100vw, 760px", eager: true })}</figure>` : ""}<p class="note">${fill(x.journal.published, { d: fdate(a.date, l) })}</p>${a.body.map(([h, p]) => `<h2 class="h3">${h}</h2><p>${p}</p>`).join("")}
<h2 class="h3">${x.journal.related}</h2><p class="ctas">${links.map(([k, label]) => `<a class="btn ghost" href="${here(k.startsWith("season:") ? pathOf(l, "season", k.slice(7)) : pathOf(l, k))}">${label}</a>`).join("")}</p>
<p><a href="${here(pathOf(l, "journal"))}">← ${x.journal.back}</a></p></div></section>
${waitlist(l)}` }));
  }

  // Cookies
  add(l, "cookies", null, layout({ l, key: "cookies", title: x.cookies.title, desc: "",
    ld: [crumbsLD(crumb("cookies", x.nav.cookies))],
    body: (here) => `${pageHead(x.cookies.h1, "", crumb("cookies", x.nav.cookies), here)}
<section class="band"><div class="wrap prose legaltext">${A[l].cookiesBody.map((p) => `<p>${p}</p>`).join("")}<p><button type="button" class="btn ghost" data-cookie-open>${A[l].cookie.manage}</button></p><p><a href="${here(pathOf(l, "privacy"))}">${t.legalNav.privacy}</a></p></div></section>` }));

  // Mon compte (base Supabase : inscription, connexion, profil, Club de Bo, suppression)
  {
    const ac = A[l].account, sizes = SIZES.map((s) => `<option>${s}</option>`).join("");
    const cutOpts = `<option value="">${ac.none}</option><option value="flat">${t.flat}</option><option value="pouch">${t.pouch}</option>`;
    add(l, "account", null, layout({ l, key: "account", title: ac.title, desc: ac.desc,
      ld: [crumbsLD(crumb("account", A[l].navAccount))],
      body: (here) => `${pageHead(ac.h1, ac.intro, crumb("account", A[l].navAccount), here)}
<section class="band"><div class="wrap account" id="account" data-state="${DB ? "loading" : "off"}">
  <p class="soon-box acc-off">${ac.notConfigured}</p>
  <p class="acc-loading">${ac.loading}</p>
  <div class="acc-guest two">
    <form class="accform" id="loginForm" novalidate>
      <h2 class="h3">${ac.login}</h2>
      <label for="li-email">${ac.email}</label><input id="li-email" name="email" type="email" autocomplete="email" required>
      <label for="li-pass">${ac.password}</label><input id="li-pass" name="password" type="password" autocomplete="current-password" required>
      <button class="btn primary" type="submit">${ac.loginBtn}</button>
      <button class="linkbtn" type="button" id="forgotBtn">${ac.forgot}</button>
      <p class="ok" role="status" hidden></p>
    </form>
    <form class="accform" id="signupForm" novalidate>
      <h2 class="h3">${ac.signup}</h2>
      <label for="su-name">${ac.firstName}</label><input id="su-name" name="first_name" autocomplete="given-name" maxlength="80">
      <label for="su-email">${ac.email}</label><input id="su-email" name="email" type="email" autocomplete="email" required>
      <label for="su-pass">${ac.password}</label><input id="su-pass" name="password" type="password" autocomplete="new-password" minlength="8" required aria-describedby="su-pass-hint"><small id="su-pass-hint">${ac.passwordHint}</small>
      <label for="su-cut">${ac.cut}</label><select id="su-cut" name="cut_pref">${cutOpts}</select>
      <label class="check"><input type="checkbox" name="newsletter"> <span>${ac.newsletter}</span></label>
      <label class="check"><input type="checkbox" name="terms" required> <span>${ac.terms} <a href="${here(pathOf(l, "terms"))}">${t.legalNav.terms}</a> · <a href="${here(pathOf(l, "privacy"))}">${t.legalNav.privacy}</a></span></label>
      <button class="btn primary" type="submit">${ac.signupBtn}</button>
      <p class="ok" role="status" hidden></p>
    </form>
  </div>
  <div class="acc-user">
    <h2 id="acc-hello"></h2>
    <div class="two">
      <form class="accform" id="profileForm" novalidate>
        <h3>${ac.profileTitle}</h3>
        <p class="note" id="acc-email"></p>
        <label for="pf-name">${ac.firstName}</label><input id="pf-name" name="first_name" maxlength="80">
        <label for="pf-cut">${ac.cut}</label><select id="pf-cut" name="cut_pref">${cutOpts}</select>
        <label for="pf-size">${ac.size}</label><select id="pf-size" name="size_pref"><option value="">${ac.none}</option>${sizes}</select>
        <label for="pf-lang">${t.langLabel}</label><select id="pf-lang" name="lang">${LANGS.map((x) => `<option value="${x}">${T[x].langName}</option>`).join("")}</select>
        <label class="check"><input type="checkbox" name="newsletter_optin"> <span>${ac.newsletter}</span></label>
        <button class="btn primary" type="submit">${ac.save}</button>
        <p class="ok" role="status" hidden></p>
      </form>
      <div>
        <h3>${ac.clubTitle}</h3>
        <ol class="carnet" id="carnet">${SEASONS.map((s) => `<li data-season="${s.id}" style="--sacc:${s.c.accent}"><span class="stamp" aria-hidden="true"></span>${sName(s, l)}</li>`).join("")}</ol>
        <p id="club-progress"></p>
        <p class="note">${ac.clubDemo} <a href="${here(pathOf(l, "club"))}">${X[l].nav.club}</a></p>
        <p><button class="btn ghost" type="button" id="logoutBtn">${ac.logout}</button></p>
        <details class="danger"><summary>${ac.deleteTitle}</summary><p>${ac.deleteText}</p><button class="btn ghost" type="button" id="deleteBtn">${ac.deleteBtn}</button></details>
      </div>
    </div>
  </div>
</div></section>` }));
  }

  // Pages légales
  for (const k of ["terms", "privacy", "legal"]) {
    const lg = L[l], lp = lg[k];
    const companyHtml = `<ul class="plain">${Object.values(lg.company).map((v) => `<li>${esc(v)}</li>`).join("")}</ul>`;
    // Paragraphes ; ceux qui commencent par "- " sont regroupés en liste.
    const paras = (ps) => {
      let out = "", list = [];
      const flush = () => { if (list.length) { out += `<ul class="ticks">${list.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`; list = []; } };
      for (const p of ps) {
        if (p.startsWith("- ")) { list.push(p.slice(2)); continue; }
        flush();
        out += p === "{company}" ? companyHtml : `<p>${esc(p)}</p>`;
      }
      flush();
      return out;
    };
    const form = k === "terms" ? `<section class="withdraw" id="retractation"><h2 class="h3">${lp.formTitle}</h2><p>${esc(lp.formIntro)}</p><ol class="plain">${lp.form.map((x) => `<li>${esc(x)}</li>`).join("")}</ol></section>` : "";
    add(l, k, null, layout({ l, key: k, title: lp.title, desc: "",
      ld: [crumbsLD([home, [lp.h1, pathOf(l, k)]])],
      body: (here) => `${pageHead(lp.h1, "", [home, [lp.h1, pathOf(l, k)]], here)}
<section class="band"><div class="wrap prose legaltext"><p class="note">${esc(DB ? lg.demoNotice : t.legalDemo)}</p><p class="note">${lg.updated}</p>${lp.sections.map(([h, ps]) => `<h2 class="h3">${esc(h)}</h2>${paras(ps)}`).join("")}${form}</div></section>` }));
  }
}

// 404 (FR, avec liens vers les 4 langues)
{
  const l = DEFAULT_LANG, t = T[l];
  add(l, "404", null, layout({ l, key: "404", title: t.t404, desc: "", noAlt: true,
    body: (here) => `<section class="pagehead"><div class="wrap split"><div><h1>${t.h404}</h1><p class="lead">${t.p404}</p><p class="ctas">${LANGS.map((x) => `<a class="btn ${x === l ? "primary" : "ghost"}" href="${here(pathOf(x, "seasons"))}" lang="${x}">${T[x].nav.seasons}</a>`).join(" ")}</p></div><div class="hero-art small" aria-hidden="true">${bear(LIVE.items[0], LIVE.c.accent, LIVE.id === "noel")}</div></div></section>` }));
}

// ---------- write ----------
rmSync(OUT, { recursive: true, force: true });
for (const p of pages) { const f = join(OUT, p.file); mkdirSync(dirname(f), { recursive: true }); writeFileSync(f, p.html); }
mkdirSync(join(OUT, "assets"), { recursive: true });
for (const f of ["style.css", "app.js", "favicon.svg", "logo-512.png"]) copyFileSync(join(ROOT, "src/static", f), join(OUT, "assets", f));
copyFileSync(join(ROOT, "assets/bo.svg"), join(OUT, "assets/bo.svg"));
// Visuels (photos WebP) : tout ce qui est dans assets/images/ est publié dans site/assets/images/
if (existsSync(join(ROOT, "assets/video"))) cpSync(join(ROOT, "assets/video"), join(OUT, "assets/video"), { recursive: true });
for (const d of ["emailing", "logo"]) if (existsSync(join(ROOT, "assets", d))) cpSync(join(ROOT, "assets", d), join(OUT, "assets", d), { recursive: true, filter: (f) => !f.endsWith(".md") });
// Aperçus marketing (emails, publications Instagram, fiche Google) : publiés mais jamais indexés.
for (const d of PREVIEWS) if (existsSync(join(ROOT, d))) cpSync(join(ROOT, d), join(OUT, d), { recursive: true, filter: (f) => !f.endsWith(".md") });
if (existsSync(join(ROOT, "assets/images"))) cpSync(join(ROOT, "assets/images"), join(OUT, "assets/images"), { recursive: true, filter: (f) => !f.endsWith(".md") });

// Racine : choix de la langue (redirige selon la langue du navigateur, FR par défaut)
writeFileSync(join(OUT, "index.html"), `<!DOCTYPE html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>UNIS : string unisexe à 5 € et Bo l'ours</title>
<meta name="description" content="${esc(T.fr.home.desc)}">
${CFG.indexable ? "" : '<meta name="robots" content="noindex, follow">'}
<link rel="canonical" href="${abs("fr/")}">
${LANGS.map((x) => `<link rel="alternate" hreflang="${x}" href="${abs(x + "/")}">`).join("\n")}
<link rel="alternate" hreflang="x-default" href="${abs(XDEFAULT + "/")}">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<script>(function(){var l=(navigator.language||"fr").slice(0,2).toLowerCase();var ok=${JSON.stringify(LANGS)};location.replace((ok.indexOf(l)>-1?l:"${DEFAULT_LANG}")+"/"+location.search);})();</script>
<style>body{font-family:system-ui,sans-serif;background:#FFE3EE;color:#3E031B;display:grid;place-items:center;min-height:100vh;margin:0}a{display:inline-block;margin:6px;padding:12px 18px;border:2px solid #1B1B3A;border-radius:999px;color:inherit;text-decoration:none;font-weight:700}</style>
</head><body><main><h1>UNIS</h1><p>${LANGS.map((x) => `<a href="${x}/" hreflang="${x}" lang="${x}">${T[x].langName}</a>`).join("")}</p></main></body></html>
`);

// robots.txt + sitemap.xml (avec alternates hreflang)
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n${PREVIEWS.map((d) => `Disallow: /${d}/\n`).join("")}\nSitemap: ${SITE}/sitemap.xml\n`);
const today = CFG.launchDate;
const sm = pages.filter((p) => !NOINDEX.has(p.key)).map((p) => {
  const loc = abs(pathOf(p.l, p.key, p.sid));
  const alts = LANGS.map((x) => `<xhtml:link rel="alternate" hreflang="${x}" href="${abs(pathOf(x, p.key, p.sid))}"/>`).join("") + `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(pathOf(XDEFAULT, p.key, p.sid))}"/>`;
  return `<url><loc>${loc}</loc><lastmod>${today}</lastmod>${alts}</url>`;
});
writeFileSync(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sm.join("\n")}\n</urlset>\n`);
writeFileSync(join(OUT, ".nojekyll"), "");

console.log(`${pages.length} pages générées dans site/ (${LANGS.length} langues). Indexable : ${CFG.indexable}.`);
if (warnings.length) { console.log(`\n${warnings.length} avertissement(s) :`); for (const w of [...new Set(warnings)]) console.log(" - " + w); }
else console.log("Titles, meta descriptions et contrastes : OK.");
