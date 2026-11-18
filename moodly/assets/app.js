// MOODLY : menu mobile, sélecteur de mood, panier (localStorage), quiz, newsletter.
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const eur = (n) => n.toFixed(2).replace(".", ",").replace(",00", "") + " €";
  const toast = (t) => { const el = $("[data-toast]"); if (!el) return; el.textContent = t; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2200); };

  // Menu mobile
  const mb = $(".menu-btn"), nav = $("#nav");
  mb && mb.addEventListener("click", () => { const o = nav.classList.toggle("open"); mb.setAttribute("aria-expanded", o); });

  // Sélecteur de mood (accueil) : la couleur de la page suit le mood choisi.
  const hero = $("[data-hero]");
  if (hero) $$("[data-pick]").forEach((b) => b.addEventListener("click", () => {
    const id = b.dataset.pick, c = $(`[data-can="${id}"]`);
    $$("[data-pick]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    $$(".hc").forEach((x) => x.classList.toggle("on", x === c));
    hero.style.setProperty("--m", c.dataset.color);
    $("[data-hero-name]").textContent = c.dataset.name;
    $("[data-hero-flavor]").textContent = c.dataset.flavor;
    const l = $("[data-hero-link]"); l.href = l.href.replace(/produits\/[a-z]+\//, `produits/${id}/`); l.textContent = `Découvrir ${c.dataset.name}`;
    document.querySelectorAll(".brand .logo circle").forEach(() => {});
  }));

  // Format sur la fiche produit (canette ou pack de 6)
  $$("[data-fmt]").forEach((b) => b.addEventListener("click", () => {
    $$("[data-fmt]").forEach((x) => { x.setAttribute("aria-pressed", x === b); x.classList.toggle("on", x === b); });
    const add = $(".pdp [data-add]"); const six = b.dataset.fmt === "six";
    add.dataset.price = b.dataset.price; add.dataset.sku = add.dataset.sku.replace(/-6$/, "") + (six ? "-6" : "");
    add.dataset.name = add.dataset.name.replace(/ \(pack de 6\)$/, "") + (six ? " (pack de 6)" : "");
  }));

  // Panier
  const KEY = "mood_cart";
  let cart = []; try { cart = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { cart = []; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} render(); };
  const render = () => {
    const n = cart.reduce((a, i) => a + i.q, 0), tot = cart.reduce((a, i) => a + i.q * i.p, 0);
    $$("[data-cart-count]").forEach((e) => e.textContent = n);
    const list = $("[data-cart-list]"); if (!list) return;
    list.innerHTML = cart.length ? cart.map((i, k) => `<li><span class="sw" style="background:${i.c}"></span><span style="flex:1">${i.n}<br><small>${eur(i.p)}</small></span><button type="button" data-dec="${k}" aria-label="Retirer un ${i.n}">−</button><b>${i.q}</b><button type="button" data-inc="${k}" aria-label="Ajouter un ${i.n}">+</button></li>`).join("") : "<li>Ton panier est vide. Choisis ton mood !</li>";
    $("[data-cart-total]").textContent = eur(tot);
    $("[data-cart-ship]").textContent = tot >= 35 ? "Livraison offerte 🎉" : tot ? `Plus que ${eur(35 - tot)} pour la livraison offerte.` : "";
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("[data-add]");
    if (a) { const d = a.dataset, f = cart.find((i) => i.s === d.sku); f ? f.q++ : cart.push({ s: d.sku, n: d.name, p: +d.price, c: d.color, q: 1 }); save(); toast(`${d.name} ajouté au panier`); }
    const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]");
    if (inc) { cart[+inc.dataset.inc].q++; save(); }
    if (dec) { const k = +dec.dataset.dec; cart[k].q--; if (cart[k].q <= 0) cart.splice(k, 1); save(); }
    if (e.target.closest("[data-cart-open]")) { $("#cart").hidden = false; $("[data-cart-close]").focus(); }
    if (e.target.closest("[data-cart-close]") || e.target.id === "cart") { $("#cart").hidden = true; $("[data-cart-open]").focus(); }
    if (e.target.closest("[data-checkout]")) toast("Démonstration : aucune commande n'est envoyée.");
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && $("#cart") && !$("#cart").hidden) { $("#cart").hidden = true; $("[data-cart-open]").focus(); } });
  render();

  // Quiz : le mood le plus choisi gagne (égalité : le premier rencontré).
  const quiz = $("[data-quiz]");
  if (quiz) quiz.addEventListener("submit", (e) => {
    e.preventDefault();
    const moods = JSON.parse(quiz.dataset.moods), score = {};
    const answers = $$("input:checked", quiz).map((i) => i.value);
    const out = $("[data-result]");
    if (answers.length < 4) { out.hidden = false; out.style.setProperty("--c", "#fff"); out.innerHTML = `<p>Réponds aux quatre questions pour découvrir ton mood.</p>`; out.focus(); return; }
    answers.forEach((v) => score[v] = (score[v] || 0) + 1);
    const best = Object.keys(score).sort((a, b) => score[b] - score[a])[0], m = moods.find((x) => x.id === best);
    out.hidden = false; out.style.setProperty("--c", m.color);
    out.innerHTML = `<p class="kicker">Ton mood du jour</p><h2>${m.name}</h2><p><b>${m.flavor}</b> · ${m.hook}</p><div class="ctas"><a class="btn" href="${m.url}">Découvrir ${m.name}</a><button class="btn ghost" type="reset">Recommencer</button></div>`;
    out.focus();
  });
  quiz && quiz.addEventListener("reset", () => { const o = $("[data-result]"); o.hidden = true; });

  // Newsletter (démo : rien n'est envoyé)
  const nl = $("[data-newsletter]");
  nl && nl.addEventListener("submit", (e) => { e.preventDefault(); const i = $("input", nl), m = $("[data-nl-msg]", nl); if (!i.checkValidity()) { m.textContent = "Vérifie ton adresse email."; i.setAttribute("aria-invalid", "true"); i.focus(); return; } i.removeAttribute("aria-invalid"); m.textContent = "C'est noté ! (démo : aucun email n'est envoyé)"; nl.reset(); });
})();
