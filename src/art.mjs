// Illustrations SVG générées au build (reprises du prototype), en attendant les photos.
let uid = 0;
const RAINBOW = ["#E40303", "#FF8C00", "#FFED00", "#008026", "#004DFF", "#750787"];
const TRANS = ["#5BCEFA", "#F5A9B8", "#FFFFFF", "#F5A9B8", "#5BCEFA"];
const stripes = (cols) => cols.map((c, i) => `<stop offset="${i / cols.length}" stop-color="${c}"/><stop offset="${(i + 1) / cols.length}" stop-color="${c}"/>`).join("");

export const SHAPE = {
  flat: "M14 34 Q100 52 186 34 L176 56 Q126 74 108 146 L92 146 Q74 74 24 56 Z",
  pouch: "M14 34 Q100 52 186 34 L176 56 Q132 70 118 108 Q112 146 100 146 Q88 146 82 108 Q68 70 24 56 Z",
};

function inner(item, cut = "flat") {
  const id = "p" + uid++;
  const b = item.base || "#C8B6FF", f = item.fg || "#fff";
  let def = "", fill = b;
  const pat = (w, h, s) => { def = `<pattern id="${id}" width="${w}" height="${h}" patternUnits="userSpaceOnUse"><rect width="${w}" height="${h}" fill="${b}"/>${s}</pattern>`; fill = `url(#${id})`; };
  switch (item.p) {
    case "hearts": pat(26, 24, `<path d="M13 19 C4 12 6 5 10 5 C12 5 13 7 13 8 C13 7 14 5 16 5 C20 5 22 12 13 19Z" fill="${f}"/>`); break;
    case "flowers": pat(28, 28, `<g fill="${f}"><circle cx="14" cy="9" r="4"/><circle cx="19" cy="14" r="4"/><circle cx="14" cy="19" r="4"/><circle cx="9" cy="14" r="4"/></g><circle cx="14" cy="14" r="3" fill="#FFD66B"/>`); break;
    case "waves": pat(40, 16, `<path d="M0 10 Q10 2 20 10 T40 10" fill="none" stroke="${f}" stroke-width="3"/>`); break;
    case "ghosts": pat(34, 34, `<path d="M10 26 V14 a7 7 0 0 1 14 0 V26 l-3.5-3 -3.5 3 -3.5-3Z" fill="${f}"/><circle cx="14.5" cy="15" r="1.3" fill="${b}"/><circle cx="19.5" cy="15" r="1.3" fill="${b}"/>`); break;
    case "trees": pat(30, 32, `<path d="M15 4 L24 24 H6Z" fill="${f}"/><rect x="13.5" y="24" width="3" height="4" fill="${f}"/>`); break;
    case "zigzag": pat(24, 20, `<path d="M0 12 L6 6 L12 12 L18 6 L24 12" fill="none" stroke="${f}" stroke-width="3"/><circle cx="12" cy="17" r="1.6" fill="${f}"/>`); break;
    case "ribbon": pat(30, 34, `<path d="M15 6 C9 6 9 14 15 18 C21 14 21 6 15 6Z M15 18 L9 30 M15 18 L21 30" fill="none" stroke="${f}" stroke-width="3" stroke-linecap="round"/>`); break;
    case "rainbow": def = `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stripes(RAINBOW)}</linearGradient>`; fill = `url(#${id})`; break;
    case "trans": def = `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stripes(TRANS)}</linearGradient>`; fill = `url(#${id})`; break;
    case "rainbowband": def = `<linearGradient id="${id}b">${RAINBOW.map((c, i) => `<stop offset="${i / 5}" stop-color="${c}"/>`).join("")}</linearGradient>`; break;
  }
  const band = item.p === "rainbowband" ? `<path d="M14 34 Q100 52 186 34 L183 42 Q100 60 17 42Z" fill="url(#${id}b)"/>` : "";
  return `<defs>${def}</defs><path d="${SHAPE[cut]}" fill="${fill}" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/>${band}<path d="M14 34 Q100 52 186 34" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="2"/><path d="M24 56 Q100 62 176 56" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="1.5" stroke-dasharray="3 3"/>`;
}

export const thong = (item, cut = "flat", cls = "") =>
  `<svg${cls ? ` class="${cls}"` : ""} viewBox="0 0 200 160" aria-hidden="true" focusable="false">${inner(item, cut)}</svg>`;

export function bear(item, bow = "#C8372D", hat = false) {
  const cap = hat ? `<path d="M56 36 Q100 -10 146 36 Z" fill="#C8372D"/><rect x="50" y="30" width="102" height="12" rx="6" fill="#F7F7F2"/><circle cx="104" cy="2" r="9" fill="#F7F7F2"/>` : "";
  return `<svg viewBox="0 -12 200 232" aria-hidden="true" focusable="false"><g fill="#C98B4B"><circle cx="58" cy="36" r="20"/><circle cx="142" cy="36" r="20"/><ellipse cx="100" cy="150" rx="58" ry="56"/><circle cx="100" cy="66" r="46"/><ellipse cx="40" cy="132" rx="16" ry="30" transform="rotate(20 40 132)"/><ellipse cx="160" cy="132" rx="16" ry="30" transform="rotate(-20 160 132)"/><ellipse cx="62" cy="200" rx="26" ry="18"/><ellipse cx="138" cy="200" rx="26" ry="18"/></g><g fill="#E8C49A"><circle cx="58" cy="36" r="10"/><circle cx="142" cy="36" r="10"/><ellipse cx="100" cy="82" rx="20" ry="15"/><ellipse cx="62" cy="202" rx="13" ry="9"/><ellipse cx="138" cy="202" rx="13" ry="9"/></g><circle cx="83" cy="60" r="4.5" fill="#2B1A12"/><circle cx="117" cy="60" r="4.5" fill="#2B1A12"/><ellipse cx="100" cy="76" rx="7" ry="5" fill="#2B1A12"/><path d="M93 88 Q100 94 107 88" fill="none" stroke="#2B1A12" stroke-width="2.5" stroke-linecap="round"/>${cap}<path d="M84 112 L100 120 L84 128Z M116 112 L100 120 L116 128Z" fill="${bow}"/><circle cx="100" cy="120" r="5" fill="${bow}"/><g transform="translate(46 140) scale(0.54)">${inner(item)}</g></svg>`;
}

export const logoThread = (color = "currentColor") =>
  `<svg viewBox="0 0 44 20" aria-hidden="true" focusable="false"><path d="M2 14 C 12 2, 20 2, 22 10 S 34 18, 42 6" fill="none" stroke="${color}" stroke-width="3.2" stroke-linecap="round"/></svg>`;

// Logo UNIS (version 2026-11) : lettres bordeaux, un string framboise passe à travers les lettres.
// ink = couleur des lettres, accent = string.
export const logoMark = (ink = "currentColor", accent = "var(--accent)") =>
  `<svg class="logo-mark" viewBox="0 0 262 84" aria-hidden="true" focusable="false">` +
  `<g fill="${ink}" font-family="'Bricolage Grotesque',system-ui,sans-serif" font-weight="800" font-size="96" text-anchor="middle">` +
  `<text x="40" y="80">U</text><text x="112" y="80">N</text><text x="224" y="80">S</text></g>` +
  `<rect x="157" y="14" width="22" height="66" rx="1.5" fill="${ink}"/>` +
  `<path d="M137 40 Q 148 45 160 40 L 151 70 Q 148 74 145 70 Z" fill="${accent}"/>` +
  `<path d="M58 28 C 90 24, 116 30, 137 40 M160 40 C 182 28, 208 20, 228 22 M151 66 C 176 62, 204 52, 246 44" fill="none" stroke="${accent}" stroke-width="3.2" stroke-linecap="round"/>` +
  `</svg>`;
