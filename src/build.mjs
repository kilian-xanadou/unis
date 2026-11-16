// Génère le site statique dans site/. Usage : node src/build.mjs
import { mkdirSync, writeFileSync, copyFileSync, rmSync, cpSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import CFG from "./config.mjs";
import { T } from "./i18n.mjs";
import { LANGS, DEFAULT_LANG, XDEFAULT, PATHS, SEASONS, BASE, ESS, SIZES, SIZE_TABLE, PRICES, SHIPPING } from "./data.mjs";
import { thong, bear, logoThread, SHAPE } from "./art.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "site");
const SITE = CFG.siteUrl.replace(/\/$/, "");
const BASE_PATH = new URL(SITE + "/").pathname; // "/" sur Render, "/unis/" sur GitHub Pages
const LIVE = SEASONS.find((s) => s.id === CFG.currentSeason);
const warnings = [];

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const fill = (s, v = {}) => Object.entries(v).reduce((a, [k, x]) => a.split(`{${k}}`).join(x), s);
const eur = (n, l) => new Intl.NumberFormat(T[l].locale, { style: "currency", currency: "EUR" }).format(n);
const fdate = (iso, l) => new Intl.DateTimeFormat(T[l].locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));
const sName = (s, l) => s.name[l];

function pathOf(l, key, sid) {
  if (key === "season") return `${l}/${PATHS[l].seasons}${SEASONS.find((s) => s.id === sid).slug[l]}/`;
  return `${l}/${PATHS[l][key]}`;
}
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
  const it = s.items[0], m = it.n[l], sn = sName(s, l), yr = "27";
  const code = `${s.id.toUpperCase()}${yr}-${it.sku || "M1"}`;
  const list = [];
  if (s.box) list.push({ sku: `UNIS-BO-${s.id.toUpperCase()}${yr}`, kind: "bo", name: fill(T[l].boSpecialName, { s: sn }), desc: fill(T[l].boSpecialDesc, { m }), price: PRICES.bo, badge: T[l].collector, item: it, hat: s.id === "noel", bo: true });
  list.push({ sku: `UNIS-${code}-DUO`, kind: "duo", name: fill(T[l].duoName, { m }), desc: T[l].duoDesc, price: PRICES.duo, badge: T[l].bestseller, item: it, sized: true });
  for (const x of s.items) list.push({ sku: `UNIS-${s.id.toUpperCase()}${yr}-${x.sku || x.p.toUpperCase()}`, kind: "adult", name: fill(T[l].adultName, { m: x.n[l] }), desc: T[l].adultDesc, price: PRICES.adult, badge: T[l].limited, item: x, sized: true });
  list.push({ sku: `UNIS-${code}-MINI`, kind: "mini", name: fill(T[l].miniName, { m }), desc: T[l].miniDesc, price: PRICES.mini, badge: T[l].limited, item: it });
  if (s.box) list.push({ sku: `UNIS-BOX-${s.id.toUpperCase()}${yr}`, kind: "bo", name: fill(T[l].boxName, { s: sn }), desc: fill(T[l].boxDesc, { s: sn }), price: PRICES.box, badge: T[l].collector, item: it, hat: s.id === "noel", bo: true });
  return list.map((p) => ({ ...p, buyable: s === LIVE, color: it.base || s.c.accent, season: s }));
}
const boProduct = (l) => ({ sku: "UNIS-BO", kind: "bo", name: T[l].boName, desc: T[l].boDesc, price: PRICES.bo, badge: T[l].collector, item: LIVE.items[0], bo: true, buyable: true, color: "#C98B4B", season: LIVE });
const essProduct = (l) => ({ sku: "UNIS-ESS", kind: "ess", name: T[l].essName, desc: T[l].essDesc, price: PRICES.adult, badge: T[l].ess, sized: true, buyable: true, color: ESS[0].c });
const lotProduct = (l) => ({ sku: "UNIS-ESS-LOT5", kind: "lot", name: T[l].lotName, desc: T[l].lotDesc, price: PRICES.lot5, badge: T[l].ess, sized: true, sizeOnly: true, buyable: true, color: ESS[1].c });

function art(p) {
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
  const bg = p.kind === "ess" || p.kind === "lot" ? "#F1EEF8" : (p.season?.c.soft || "#F1EEF8");
  const opts = [];
  if (p.kind === "ess") opts.push(`<div class="swatches" role="group" aria-label="${t.color}">${ESS.map((e, i) => `<button type="button" style="--sw:${e.c}" aria-pressed="${i === 0}" data-col="${e.k}" data-hex="${e.c}" aria-label="${e.n[l]}"></button>`).join("")}</div>`);
  if (p.sized && !p.sizeOnly) opts.push(`<div class="seg" role="group" aria-label="${t.cut}"><button type="button" data-cut="flat" aria-pressed="true">${t.flat}</button><button type="button" data-cut="pouch" aria-pressed="false">${t.pouch}</button></div>`);
  if (p.sized) opts.push(`<label class="sr" for="sz-${id}">${t.size}</label><select id="sz-${id}" data-size>${SIZES.map((s) => `<option${s === "M" ? " selected" : ""}>${s}</option>`).join("")}</select>`);
  const action = p.buyable
    ? `<button type="button" class="add" data-add data-sku="${p.sku}" data-name="${esc(p.name)}" data-price="${p.price}" data-color="${p.color}">${t.add}</button>`
    : `<a class="add" href="#liste">${t.notify}</a>`;
  const mention = p.bo ? `<p class="mention">${t.boMention}</p>` : (p.kind !== "bo" ? `<p class="compo">${t.composition}</p>` : "");
  return `<article class="card" data-cut="flat">
  <div class="art" style="background:${bg}">${art(p)}<span class="badge">${esc(p.badge)}</span></div>
  <div class="meta"><h3>${esc(p.name)}</h3><span class="price">${eur(p.price, l)}</span></div>
  <p class="desc">${esc(p.desc)}</p>${mention}
  ${opts.length ? `<div class="opts">${opts.join("")}</div>` : ""}
  ${action}
</article>`;
}
const grid = (ps, l) => `<div class="grid">${ps.map((p) => card(p, l)).join("")}</div>`;

// ---------- JSON-LD ----------
const ORG = { "@type": "Organization", "@id": `${SITE}/#org`, name: "UNIS", url: `${SITE}/`, logo: `${SITE}/assets/favicon.svg`, slogan: "Un fil. Tous les corps. Même les ours." };
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
  if (p.season && p.buyable) offer.priceValidUntil = CFG.dropPriceValidUntil;
  return { "@type": "Product", name: p.name, sku: p.sku, description: p.desc, image: `${SITE}/assets/bo.svg`, brand: { "@type": "Brand", name: "UNIS" }, offers: offer };
}
const crumbsLD = (items) => ({ "@type": "BreadcrumbList", itemListElement: items.map(([name, p], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(p) })) });
const faqLD = (faq) => ({ "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) });

// ---------- shared blocks ----------
function seasonStrip(l, here, current) {
  return `<ol class="strip">${SEASONS.map((s) => {
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
  return `<div class="cut">${svg("flat")}<div><h3>${t.flat}</h3><p>${t.flatP}</p></div></div><div class="cut">${svg("pouch")}<div><h3>${t.pouch}</h3><p>${t.pouchP}</p></div></div><p>${t.cutsNote}</p>`;
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
    <label class="check"><input type="checkbox" name="consent" required> <span>${t.consent}</span></label>
    <p class="note">${t.waitDemo}</p>
    <p class="ok" role="status" hidden></p>
  </form></div></section>`;
}
function promise(l) {
  const t = T[l];
  return `<section class="promise band" aria-labelledby="h-prom"><div class="wrap"><h2 id="h-prom">${t.promTitle}</h2><div class="cols">${t.prom.map(([h, p]) => `<div><h3>${h}</h3><p>${p}</p></div>`).join("")}</div></div></section>`;
}
const pageHead = (h1, intro, crumbs, here) => `<section class="pagehead"><div class="wrap">
  <nav aria-label="Breadcrumb" class="crumbs"><ol>${crumbs.map(([n, p], i) => i < crumbs.length - 1 ? `<li><a href="${here(p)}">${esc(n)}</a></li>` : `<li aria-current="page">${esc(n)}</li>`).join("")}</ol></nav>
  <h1>${h1}</h1>${intro ? `<p class="lead">${intro}</p>` : ""}</div></section>`;

// ---------- layout ----------
function layout({ l, key, sid, title, desc, body, ld = [], palette = LIVE.c, noAlt = false }) {
  const t = T[l];
  const self = key === "404" ? "404.html" : pathOf(l, key, sid);
  const depth = key === "404" ? 0 : self.split("/").filter(Boolean).length;
  // La 404 peut être servie à n'importe quelle profondeur : liens absolus depuis la racine du site.
  const here = key === "404" ? (p) => BASE_PATH + p : (p) => "../".repeat(depth) + p;
  const alts = noAlt ? "" : LANGS.map((x) => `<link rel="alternate" hreflang="${x}" href="${abs(pathOf(x, key, sid))}">`).join("\n") + `\n<link rel="alternate" hreflang="x-default" href="${abs(pathOf(XDEFAULT, key, sid))}">`;
  const strings = { cart: t.cart, empty: t.empty, shipFree: t.shipFree, shipLeft: t.shipLeft, added: t.added, checkoutMsg: t.checkoutMsg, errEmail: t.errEmail, errConsent: t.errConsent, okWait: t.okWait, flat: t.flat, pouch: t.pouch, minus: t.qtyMinus, plus: t.qtyPlus, locale: t.locale, free: SHIPPING.freeFrom };
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
${CFG.indexable && key !== "404" ? "" : '<meta name="robots" content="noindex, follow">'}
${key === "404" ? "" : `<link rel="canonical" href="${abs(self)}">`}
${alts}
<meta property="og:type" content="website">
<meta property="og:site_name" content="UNIS">
<meta property="og:title" content="${esc(title)}">
${desc ? `<meta property="og:description" content="${esc(desc)}">` : ""}
<meta property="og:url" content="${abs(self)}">
<meta property="og:locale" content="${t.ogLocale}">
<meta name="theme-color" content="${palette.accent}">
<link rel="icon" href="${here("assets/favicon.svg")}" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${here("assets/style.css")}">
<style>:root{--bg:${palette.bg};--ink:${palette.ink};--accent:${palette.accent};--soft:${palette.soft};--on-accent:${palette.on}}</style>
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}</script>
</head>
<body>
<a class="skip" href="#main">${t.skip}</a>
<p class="demo-bar">${t.demo}</p>
<header class="top"><div class="wrap">
  <a class="logo" href="${here(pathOf(l, "home"))}" aria-label="UNIS">UN${logoThread("var(--accent)")}IS</a>
  <button class="burger" type="button" aria-expanded="false" aria-controls="nav" aria-label="${t.menu}"><svg width="26" height="20" viewBox="0 0 26 20" aria-hidden="true"><path d="M2 3h22M2 10h22M2 17h22" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>
  <nav class="main" id="nav" aria-label="${t.menu}">${nav.map(([k, p]) => `<a href="${here(p)}"${p === self ? ' aria-current="page"' : ""}>${t.nav[k]}</a>`).join("")}</nav>
  <details class="lang"><summary aria-label="${t.langLabel}">${l.toUpperCase()}</summary><ul>${LANGS.map((x) => `<li><a href="${here(key === "404" ? pathOf(x, "home") : pathOf(x, key, sid))}" hreflang="${x}" lang="${x}"${x === l ? ' aria-current="true"' : ""}>${T[x].langName}</a></li>`).join("")}</ul></details>
  <button class="cartbtn" id="openCart" type="button" aria-haspopup="dialog"><span>${t.cart}</span> <b id="count">0</b></button>
</div></header>
<main id="main">
${body2}
</main>
<footer class="foot"><div class="wrap">
  <div class="cols">
    <div><p class="foot-logo">UNIS</p><p>${t.signature}</p></div>
    <div><p class="ft">${t.footShop}</p><ul><li><a href="${here(pathOf(l, "season", LIVE.id))}">${fill(t.home.shopTitle, { s: sName(LIVE, l) }).split(":")[1]?.trim() || t.nav.shop}</a></li><li><a href="${here(pathOf(l, "bo"))}">${t.boName}</a></li><li><a href="${here(pathOf(l, "ess"))}">${t.nav.ess}</a></li><li><a href="${here(pathOf(l, "seasons"))}">${t.nav.seasons}</a></li></ul></div>
    <div><p class="ft">${t.footHelp}</p><ul><li><a href="${here(pathOf(l, "size"))}">${t.sizeCap.split(" (")[0]}</a></li><li><a href="${here(pathOf(l, "help"))}">${t.helpPage.shipTitle} · ${t.helpPage.retTitle.split(" ")[0]}</a></li><li><a href="${here(pathOf(l, "help"))}#faq">${t.faqLink}</a></li></ul></div>
    <div><p class="ft">${t.footInfo}</p><ul>${["terms", "privacy", "legal"].map((k) => `<li><a href="${here(pathOf(l, k))}">${t.legalNav[k]}</a></li>`).join("")}</ul></div>
  </div>
  <p class="legal">${t.legalLine}</p>
</div></footer>
<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" role="dialog" aria-modal="true" aria-labelledby="hcart" aria-hidden="true" inert>
  <header><h2 id="hcart">${t.cartTitle}</h2><button class="x" id="closeCart" type="button" aria-label="${t.close}">×</button></header>
  <div class="lines" id="lines"></div>
  <footer>
    <div class="total"><span>${t.total}</span><span id="total">${eur(0, l)}</span></div>
    <p class="ship" id="shipMsg"></p>
    <div class="bar"><i id="shipBar"></i></div>
    <button class="btn primary" id="checkout" type="button">${t.checkout}</button>
    <p class="note">${t.checkoutNote}</p>
  </footer>
</aside>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
<script type="application/json" id="i18n">${JSON.stringify(strings)}</script>
<script src="${here("assets/app.js")}" defer></script>
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
    <div class="ctas"><a class="btn primary" href="${here(pathOf(l, "season", LIVE.id))}">${fill(t.home.ctaDrop, { s: liveName })}</a><a class="btn ghost" href="${here(pathOf(l, "bo"))}">${t.home.ctaBo}</a></div>
  </div>
  <div class="hero-art" role="img" aria-label="${esc(t.boName)}">${bear(LIVE.items[0], LIVE.c.accent, LIVE.id === "noel")}<span class="price-chip">Bo ${eur(PRICES.bo, l)}</span></div>
</div><svg class="thread" viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden="true"><path d="M-10 60 C 150 10, 260 110, 420 60 S 700 10, 820 70 S 1080 110, 1210 40"/></svg></section>
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
<section class="band"><div class="wrap split"><div class="prose">${t.bo.p.map((p) => `<p>${p}</p>`).join("")}<h2 class="h3">${t.bo.specsTitle}</h2><ul class="ticks">${t.bo.specs.map((s) => `<li>${s}</li>`).join("")}</ul><h2 class="h3">${t.bo.safetyTitle}</h2><p>${t.bo.safety}</p><p class="mention">${t.boMention}</p></div>
<div class="hero-art small" role="img" aria-label="${esc(t.boName)}">${bear(LIVE.items[0], LIVE.c.accent, LIVE.id === "noel")}</div></div></section>
<section class="shop band" aria-labelledby="hbuy"><div class="wrap"><h2 id="hbuy">${t.bo.shopTitle}</h2>${grid(boPs, l)}</div></section>
${waitlist(l)}` }));

  // Essentiels
  const essPs = [essProduct(l), lotProduct(l)];
  const essUrl = abs(pathOf(l, "ess"));
  add(l, "ess", null, layout({ l, key: "ess", title: t.essPage.title, desc: t.essPage.desc,
    ld: [crumbsLD([home, [t.nav.ess, pathOf(l, "ess")]]), ...essPs.map((p) => productLD(p, l, essUrl))],
    body: (here) => `${pageHead(t.essPage.h1, t.essPage.intro, [home, [t.nav.ess, pathOf(l, "ess")]], here)}
<section class="shop band"><div class="wrap">${grid(essPs, l)}<p class="more"><a href="${here(pathOf(l, "size"))}">${t.sizeLink}</a></p></div></section>
<section class="cuts band" aria-labelledby="hcuts"><div class="wrap"><h2 id="hcuts">${t.cutsTitle}</h2><div class="two"><div>${cuts(l)}</div><div>${sizeTable(l)}</div></div></div></section>` }));

  // Saisons (index)
  add(l, "seasons", null, layout({ l, key: "seasons", title: t.seasonsPage.title, desc: t.seasonsPage.desc,
    ld: [crumbsLD([home, [t.nav.seasons, pathOf(l, "seasons")]])],
    body: (here) => `${pageHead(t.seasonsPage.h1, t.seasonsPage.intro, [home, [t.nav.seasons, pathOf(l, "seasons")]], here)}
<section class="band"><div class="wrap"><div class="season-cards">${SEASONS.map((s) => `<a class="scard" href="${here(pathOf(l, "season", s.id))}" style="--sbg:${s.c.bg};--sink:${s.c.ink};--sacc:${s.c.accent}">
  <div class="sart">${thong(s.items[0])}</div><div><span class="tag">${s === LIVE ? t.live : fill(t.dropDate, { d: fdate(s.next, l) })}</span><h2 class="h3">${sName(s, l)}</h2><p>${esc(T[l].season[s.id].h1)}</p></div></a>`).join("")}</div></div></section>
${waitlist(l)}` }));

  // Une page par saison
  for (const s of SEASONS) {
    const st = t.season[s.id], live = s === LIVE, sn = sName(s, l);
    const ps = seasonProducts(s, l);
    const url = abs(pathOf(l, "season", s.id));
    const sfaq = [...t.seasonFaq.map(([q, a]) => [fill(q, { s: sn }), a]), live && s.id === "noel" ? t.faqXmas : [fill(t.faqWhen[0], { s: sn }), fill(t.faqWhen[1], { d: fdate(s.next, l) })]];
    const crumbs = [home, [t.nav.seasons, pathOf(l, "seasons")], [sn, pathOf(l, "season", s.id)]];
    add(l, "season", s.id, layout({ l, key: "season", sid: s.id, title: st.title, desc: fill(t.seasonDesc, { p: st.phrase }), palette: s.c,
      ld: [crumbsLD(crumbs), ...ps.map((p) => productLD(p, l, url))],
      body: (here) => `${pageHead(st.h1, st.intro, crumbs, here)}
${live ? "" : `<div class="wrap"><p class="soon-box"><b>${t.soon}</b> ${fill(t.seasonSoon, { d: fdate(s.next, l) })} <a href="#liste">${t.join}</a></p></div>`}
<section class="shop band" aria-label="${esc(sn)}"><div class="wrap">${grid(ps, l)}</div></section>
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
    ld: [crumbsLD([home, [t.nav.help, pathOf(l, "help")]]), faqLD(t.faq)],
    body: (here) => `${pageHead(t.helpPage.h1, "", [home, [t.nav.help, pathOf(l, "help")]], here)}
<section class="band"><div class="wrap cols3">${[["shipTitle", "ship"], ["retTitle", "ret"], ["payTitle", "pay"]].map(([h, p]) => `<div class="prose"><h2 class="h3">${t.helpPage[h]}</h2><p>${t.helpPage[p]}</p></div>`).join("")}</div></section>
${faqBlock(t.faq, t.faqTitle)}` }));

  // Pages légales
  for (const k of ["terms", "privacy", "legal"]) {
    const lp = t.legalPages[k];
    const content = (sec, i) => {
      if (k === "privacy" && i === 1) return `<p>${t.legalDemo}</p><p>${t.legalFonts}</p><p class="draft">${t.legalDraft}</p>`;
      if (k === "legal" && i === 0) return `<p>${t.publisher}</p>`;
      if (k === "legal" && i === 1) return `<p>${t.host}</p>`;
      if (k === "terms" && i === 3) return `<p>${t.helpPage.ret}</p><p class="draft">${t.legalDraft}</p>`;
      if (k === "terms" && i === 2) return `<p>${t.helpPage.ship}</p><p class="draft">${t.legalDraft}</p>`;
      return `<p class="draft">${t.legalDraft}</p>`;
    };
    add(l, k, null, layout({ l, key: k, title: lp.title, desc: "",
      ld: [crumbsLD([home, [lp.h1, pathOf(l, k)]])],
      body: (here) => `${pageHead(lp.h1, "", [home, [lp.h1, pathOf(l, k)]], here)}
<section class="band"><div class="wrap prose legaltext">${k !== "legal" ? `<p class="note">${t.legalDemo}</p>` : ""}${lp.sections.map((s, i) => `<h2 class="h3">${s}</h2>${content(s, i)}`).join("")}</div></section>` }));
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
for (const f of ["style.css", "app.js", "favicon.svg"]) copyFileSync(join(ROOT, "src/static", f), join(OUT, "assets", f));
copyFileSync(join(ROOT, "assets/bo.svg"), join(OUT, "assets/bo.svg"));
// Visuels (photos WebP) : tout ce qui est dans assets/images/ est publié dans site/assets/images/
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
<script>(function(){var l=(navigator.language||"fr").slice(0,2).toLowerCase();var ok=${JSON.stringify(LANGS)};location.replace((ok.indexOf(l)>-1?l:"${DEFAULT_LANG}")+"/");})();</script>
<style>body{font-family:system-ui,sans-serif;background:#EFEAFF;color:#1B1B3A;display:grid;place-items:center;min-height:100vh;margin:0}a{display:inline-block;margin:6px;padding:12px 18px;border:2px solid #1B1B3A;border-radius:999px;color:inherit;text-decoration:none;font-weight:700}</style>
</head><body><main><h1>UNIS</h1><p>${LANGS.map((x) => `<a href="${x}/" hreflang="${x}" lang="${x}">${T[x].langName}</a>`).join("")}</p></main></body></html>
`);

// robots.txt + sitemap.xml (avec alternates hreflang)
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
const today = CFG.launchDate;
const sm = pages.filter((p) => p.key !== "404").map((p) => {
  const loc = abs(pathOf(p.l, p.key, p.sid));
  const alts = LANGS.map((x) => `<xhtml:link rel="alternate" hreflang="${x}" href="${abs(pathOf(x, p.key, p.sid))}"/>`).join("") + `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(pathOf(XDEFAULT, p.key, p.sid))}"/>`;
  return `<url><loc>${loc}</loc><lastmod>${today}</lastmod>${alts}</url>`;
});
writeFileSync(join(OUT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sm.join("\n")}\n</urlset>\n`);
writeFileSync(join(OUT, ".nojekyll"), "");

console.log(`${pages.length} pages générées dans site/ (${LANGS.length} langues). Indexable : ${CFG.indexable}.`);
if (warnings.length) { console.log(`\n${warnings.length} avertissement(s) :`); for (const w of [...new Set(warnings)]) console.log(" - " + w); }
else console.log("Titles, meta descriptions et contrastes : OK.");
