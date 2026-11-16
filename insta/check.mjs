// Vérifie insta/index.html : HTML bien formé, identifiants uniques, images et emails référencés existants,
// utm_campaign identique à celui de l'email associé. Usage (depuis unis/) : node insta/check.mjs
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { PUBLICATIONS } from "./publications.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const html = readFileSync(resolve(here, "index.html"), "utf8");
const errors = [];

// 1. Équilibre des balises (hors <script>, <style> et commentaires)
const VOID = new Set(["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "source", "track", "wbr"]);
const body = html.replace(/<!--[\s\S]*?-->/g, "").replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, "<$1></$1>");
const stack = [];
let line = 1, last = 0;
for (const m of body.matchAll(/<\/?([a-zA-Z][\w:-]*)\b[^>]*?(\/?)>|<!doctype[^>]*>/gi)) {
  line += (body.slice(last, m.index).match(/\n/g) || []).length; last = m.index;
  if (!m[1]) continue;
  const tag = m[1].toLowerCase(), closing = m[0][1] === "/", selfClosing = m[2] === "/";
  if (VOID.has(tag) || selfClosing) continue;
  if (!closing) { stack.push([tag, line]); continue; }
  const top = stack.pop();
  if (!top || top[0] !== tag) { errors.push(`ligne ${line} : </${tag}> ferme <${top ? top[0] : "rien"}> (ouvert ligne ${top ? top[1] : "?"})`); break; }
}
if (!errors.length && stack.length) errors.push(`balises non fermées : ${stack.map(([t, l]) => `<${t}> l.${l}`).join(", ")}`);
if (!/^<!doctype html>/i.test(html)) errors.push("doctype manquant");
if ((html.match(/<html\b/g) || []).length !== 1 || (html.match(/<body\b/g) || []).length !== 1) errors.push("html/body en double");

// 2. Attributs : guillemets, identifiants uniques
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const dup = ids.filter((x, i) => ids.indexOf(x) !== i);
if (dup.length) errors.push(`id en double : ${[...new Set(dup)].join(", ")}`);
for (const m of html.matchAll(/aria-labelledby="([^"]+)"/g)) if (!ids.includes(m[1])) errors.push(`aria-labelledby vers un id absent : ${m[1]}`);
for (const m of html.matchAll(/href="#([^"]+)"/g)) if (!ids.includes(m[1])) errors.push(`ancre absente : #${m[1]}`);

// 3. Images et liens locaux existants
const srcs = [...html.matchAll(/<img\b[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1]);
const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
for (const tag of imgs) if (!/\salt="[^"]{10,}"/.test(tag)) errors.push(`image sans texte alternatif : ${tag.slice(0, 80)}`);
const locals = [...new Set([...srcs, ...[...html.matchAll(/href="(\.\.\/[^"#?]+)"/g)].map((m) => m[1])])];
for (const p of locals) if (!p.startsWith("../fr/") && !existsSync(resolve(here, p))) errors.push(`fichier introuvable : ${p}`);
const forbidden = ["email-octobre-rose-bo.jpg", "bo-ours-unis-octobre-rose-", "email-halloween-bo-dos-a.jpg"];
for (const p of srcs) if (forbidden.some((f) => p.includes(f))) errors.push(`image interdite : ${p}`);

// 4. utm_campaign = celui de l'email associé
for (const p of PUBLICATIONS) {
  const email = readFileSync(resolve(here, "../emails", p.email), "utf8");
  const camp = (email.match(/utm_campaign=([a-z0-9-]+)/) || [])[1];
  if (camp !== p.campaign) errors.push(`#${p.n} : utm_campaign ${p.campaign} ≠ email ${camp}`);
}
const utms = [...html.matchAll(/utm_source=instagram&amp;utm_medium=social&amp;utm_campaign=([a-z0-9-]+)/g)].length;
if (utms !== PUBLICATIONS.length * 2) errors.push(`${utms} liens UTM trouvés au lieu de ${PUBLICATIONS.length * 2}`);

if (errors.length) { console.error("ÉCHEC\n- " + errors.join("\n- ")); process.exit(1); }
console.log(`OK : HTML bien formé (${ids.length} id uniques), ${srcs.length} balises <img> vers ${new Set(srcs).size} images existantes, ${locals.length - new Set(srcs).size} liens d'emails existants, ${utms} liens UTM conformes.`);
