// UNIS : panier de démonstration, options produit, menu et liste d'attente (rien n'est envoyé).
(() => {
  const S = JSON.parse(document.getElementById("i18n").textContent);
  const $ = (s, r = document) => r.querySelector(s);
  const eur = (n) => new Intl.NumberFormat(S.locale, { style: "currency", currency: "EUR" }).format(n);
  const fill = (s, v) => s.replace(/\{(\w)\}/g, (_, k) => v[k]);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  // Événements de mesure (noms GA4 / équivalents pixel Meta). Démo : ils restent dans window.dataLayer,
  // rien n'est envoyé. Au lancement, GA4 et le pixel les liront après accord du bandeau cookies.
  window.dataLayer = window.dataLayer || [];
  const track = (event, data = {}) => window.dataLayer.push({ event, lang: S.lang, page_type: S.page, ...data });
  if (document.querySelector(".card [data-add]")) track("view_item_list");

  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("unis-cart") || "[]"); } catch (e) {}
  const save = () => { try { localStorage.setItem("unis-cart", JSON.stringify(cart)); } catch (e) {} };

  function render() {
    const n = cart.reduce((s, l) => s + l.q, 0), sum = cart.reduce((s, l) => s + l.q * l.price, 0);
    $("#count").textContent = n;
    $("#lines").innerHTML = cart.length ? cart.map((l, i) => `<div class="line"><span class="sw" style="background:${esc(l.color)}"></span><div><b>${esc(l.name)}</b>${l.opt ? `<small>${esc(l.opt)}</small>` : ""}<div class="qty"><button type="button" data-dec="${i}" aria-label="${esc(S.minus)}">−</button><span>${l.q}</span><button type="button" data-inc="${i}" aria-label="${esc(S.plus)}">+</button></div></div><b>${eur(l.q * l.price)}</b></div>`).join("") : `<p class="empty">${esc(S.empty)}</p>`;
    const ship = sum === 0 || sum >= S.free ? 0 : S.fee;
    $("#subtotal").textContent = eur(sum);
    $("#shipCost").textContent = sum >= S.free ? S.shippingFree : eur(S.fee);
    $("#total").textContent = eur(sum + ship);
    $("#shipMsg").textContent = sum >= S.free ? S.shipFree : fill(S.shipLeft, { x: eur(S.free - sum) });
    $("#shipBar").style.width = Math.min(100, (sum / S.free) * 100) + "%";
  }

  let tt;
  const toast = (m) => { const e = $("#toast"); e.textContent = m; e.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => e.classList.remove("on"), 2200); };

  document.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    const cut = e.target.closest("[data-cut]:not(.card)");
    if (cut && card) {
      card.dataset.cut = cut.dataset.cut;
      card.querySelectorAll("button[data-cut]").forEach((b) => b.setAttribute("aria-pressed", b === cut));
      return;
    }
    const sw = e.target.closest("[data-col]");
    if (sw && card) {
      card.querySelectorAll("[data-col]").forEach((b) => b.setAttribute("aria-pressed", b === sw));
      const a = $(".ess-art", card); if (a) a.style.color = sw.dataset.hex;
      return;
    }
    const add = e.target.closest("[data-add]");
    if (add && card) {
      const opt = [];
      const col = $("[data-col][aria-pressed=true]", card);
      if (col) opt.push(col.getAttribute("aria-label"));
      if ($("button[data-cut]", card)) opt.push(card.dataset.cut === "pouch" ? S.pouch : S.flat);
      const size = $("[data-size]", card); if (size) opt.push(size.value);
      const id = add.dataset.sku + "|" + opt.join("|");
      const ex = cart.find((l) => l.id === id);
      if (ex) ex.q++; else cart.push({ id, name: add.dataset.name, price: +add.dataset.price, color: col ? col.dataset.hex : add.dataset.color, opt: opt.join(", "), q: 1 });
      save(); render(); toast(S.added);
      track("add_to_cart", { currency: "EUR", value: +add.dataset.price, items: [{ item_id: add.dataset.sku, item_name: add.dataset.name, price: +add.dataset.price, quantity: 1 }] });
      return;
    }
    const inc = e.target.closest("[data-inc]");
    if (inc) { cart[+inc.dataset.inc].q++; save(); render(); return; }
    const dec = e.target.closest("[data-dec]");
    if (dec) { const i = +dec.dataset.dec; if (!--cart[i].q) cart.splice(i, 1); save(); render(); return; }
  });

  // Tiroir panier
  const drawer = $("#drawer"), scrim = $("#scrim"); let last;
  const open = () => { last = document.activeElement; drawer.classList.add("on"); scrim.classList.add("on"); drawer.setAttribute("aria-hidden", "false"); drawer.inert = false; $("#closeCart").focus(); };
  const close = () => { drawer.classList.remove("on"); scrim.classList.remove("on"); drawer.setAttribute("aria-hidden", "true"); drawer.inert = true; last && last.focus(); };
  $("#openCart").onclick = open; $("#closeCart").onclick = close; scrim.onclick = close;
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("on")) close(); });
  $("#checkout").onclick = () => {
    const cgv = $("#cgv"), err = $("#cgvErr");
    if (!cgv.checked) { err.hidden = false; cgv.focus(); return; }
    err.hidden = true;
    track("begin_checkout", { currency: "EUR", value: cart.reduce((s, l) => s + l.q * l.price, 0) });
    toast(S.checkoutMsg);
  };
  $("#cgv").addEventListener("change", () => { if ($("#cgv").checked) $("#cgvErr").hidden = true; });

  // Menu mobile
  const burger = $(".burger"), nav = $("#nav");
  burger.onclick = () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };

  // Liste d'attente (démo)
  document.querySelectorAll(".waitform").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    const m = $(".ok", f), em = f.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { m.textContent = S.errEmail; m.hidden = false; f.email.focus(); return; }
    if (!f.consent.checked) { m.textContent = S.errConsent; m.hidden = false; f.consent.focus(); return; }
    m.textContent = S.okWait; m.hidden = false;
    track("generate_lead", { form: "waitlist", cut_pref: f.cut ? f.cut.value : "" });
    f.reset();
  }));

  // Formulaire de contact (démo)
  document.querySelectorAll(".contactform").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    const m = $(".ok", f);
    const err = (msg, el) => { m.textContent = msg; m.hidden = false; el.focus(); };
    if (!f.name.value.trim()) return err(S.errName, f.name);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim())) return err(S.errEmail, f.email);
    if (!f.message.value.trim()) return err(S.errMsg, f.message);
    if (!f.consent.checked) return err(S.errConsent, f.consent);
    m.textContent = S.okContact; m.hidden = false;
    track("contact", { subject: f.subject.value });
    f.reset();
  }));

  render();
})();
