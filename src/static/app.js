// UNIS : panier de démonstration, options produit, menu et liste d'attente (rien n'est envoyé).
(() => {
  const S = JSON.parse(document.getElementById("i18n").textContent);
  const $ = (s, r = document) => r.querySelector(s);
  const eur = (n) => new Intl.NumberFormat(S.locale, { style: "currency", currency: "EUR", minimumFractionDigits: n % 1 ? 2 : 0 }).format(n);
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
  // Le reste de la page devient inerte quand le panier est ouvert : le focus clavier reste dans la fenêtre (WCAG 2.4.3).
  const behind = () => document.querySelectorAll("body > :not(#drawer):not(.scrim):not(.toast):not(script)");
  const open = () => { last = document.activeElement; drawer.classList.add("on"); scrim.classList.add("on"); drawer.setAttribute("aria-hidden", "false"); drawer.inert = false; behind().forEach((e) => (e.inert = true)); $("#closeCart").focus(); };
  const close = () => { drawer.classList.remove("on"); scrim.classList.remove("on"); drawer.setAttribute("aria-hidden", "true"); drawer.inert = true; behind().forEach((e) => (e.inert = false)); last && last.focus(); };
  $("#openCart").onclick = open; $("#closeCart").onclick = close; scrim.onclick = close;
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drawer.classList.contains("on")) close(); });

  // ---------- Base Supabase (chargée seulement quand on en a besoin) ----------
  let sbP = null;
  const sb = () => {
    if (!S.db) return Promise.resolve(null);
    if (!sbP) sbP = new Promise((res, rej) => {
      const s = document.createElement("script");
      s.src = S.db.lib.src; s.integrity = S.db.lib.integrity; s.crossOrigin = "anonymous";
      s.onload = () => res(window.supabase.createClient(S.db.url, S.db.key, { auth: { persistSession: true, detectSessionInUrl: true } }));
      s.onerror = () => { sbP = null; rej(new Error("supabase")); };
      document.head.appendChild(s);
    });
    return sbP;
  };
  const hasSession = () => { try { return Object.keys(localStorage).some((k) => k.startsWith("sb-") && k.endsWith("-auth-token")); } catch (e) { return false; } };
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const say = (f, msg) => { const m = $(".ok", f); m.textContent = msg; m.hidden = false; };

  // ---------- Panier : commande factice (+ tampon du Club si connecté) ----------
  $("#checkout").onclick = async () => {
    const cgv = $("#cgv"), err = $("#cgvErr");
    if (!cgv.checked) { err.hidden = false; cgv.focus(); return; }
    err.hidden = true;
    track("begin_checkout", { currency: "EUR", value: cart.reduce((s, l) => s + l.q * l.price, 0) });
    toast(S.checkoutMsg);
    if (!S.db || !cart.length || !hasSession()) return;
    try {
      const c = await sb();
      const { data } = await c.auth.getSession();
      if (!data.session) return;
      const { error } = await c.rpc("claim_demo_stamp", { p_season: S.stamp.season, p_year: S.stamp.year });
      if (!error) setTimeout(() => toast(fill(S.acc.stampAdded, { s: S.stamp.name })), 2400);
    } catch (e) {}
  };
  $("#cgv").addEventListener("change", () => { if ($("#cgv").checked) $("#cgvErr").hidden = true; });

  // Menu mobile
  const burger = $(".burger"), nav = $("#nav");
  burger.onclick = () => { const o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };

  // ---------- Liste d'attente ----------
  document.querySelectorAll(".waitform").forEach((f) => f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const em = f.elements.email.value.trim(), cut = f.elements.cut ? f.elements.cut.value : "";
    if (!EMAIL.test(em)) { say(f, S.errEmail); f.elements.email.focus(); return; }
    if (!f.elements.consent.checked) { say(f, S.errConsent); f.elements.consent.focus(); return; }
    if (S.db) {
      try {
        const c = await sb();
        const { error } = await c.from("waitlist").insert({ email: em, lang: S.lang, cut_pref: cut || null, page: location.pathname.slice(0, 120) });
        if (error && error.code === "23505") { say(f, S.waitAlready); return; }
        if (error) { say(f, S.acc.errGeneric); return; }
        say(f, S.okWaitSaved);
      } catch (x) { say(f, S.acc.errGeneric); return; }
    } else say(f, S.okWait);
    track("generate_lead", { form: "waitlist", cut_pref: cut });
    f.reset();
  }));

  // ---------- Formulaire de contact ----------
  document.querySelectorAll(".contactform").forEach((f) => f.addEventListener("submit", async (e) => {
    e.preventDefault();
    const el = f.elements;
    const err = (msg, input) => { say(f, msg); input.focus(); };
    if (!el.name.value.trim()) return err(S.errName, el.name);
    if (!EMAIL.test(el.email.value.trim())) return err(S.errEmail, el.email);
    if (!el.message.value.trim()) return err(S.errMsg, el.message);
    if (!el.consent.checked) return err(S.errConsent, el.consent);
    if (S.db) {
      try {
        const c = await sb();
        const { error } = await c.from("contact_messages").insert({ name: el.name.value.trim().slice(0, 80), email: el.email.value.trim(), subject: el.subject.value.slice(0, 80), order_ref: el.order.value.trim().slice(0, 40) || null, message: el.message.value.trim().slice(0, 4000), lang: S.lang });
        if (error) { say(f, S.acc.errGeneric); return; }
      } catch (x) { say(f, S.acc.errGeneric); return; }
    }
    say(f, S.okContact);
    track("contact", { subject: el.subject.value });
    f.reset();
  }));

  // ---------- Cookies : consentement (RGPD) ----------
  // Partager (action clé « acheter, puis partager ») : menu natif sur mobile, sinon copie du lien.
  document.querySelectorAll("[data-share]").forEach((btn) => btn.addEventListener("click", async () => {
    const data = { title: btn.dataset.title, url: btn.dataset.url };
    try {
      if (navigator.share) { await navigator.share(data); }
      else { await navigator.clipboard.writeText(data.url); toast(S.copied); }
      (window.dataLayer = window.dataLayer || []).push({ event: "share", method: navigator.share ? "native" : "copy", content_type: S.page });
    } catch (e) { if (e && e.name !== "AbortError") toast(data.url); }
  }));
  const CK = "unis_consent", SIX_MONTHS = 60 * 60 * 24 * 182;
  const readConsent = () => {
    const m = document.cookie.match(/(?:^|;\s*)unis_consent=([^;]+)/);
    if (!m) return null;
    try { const c = JSON.parse(decodeURIComponent(m[1])); return c.v === S.consentVersion ? c : null; } catch (e) { return null; }
  };
  const uuid = () => (crypto.randomUUID ? crypto.randomUUID() : "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)));
  // Google Consent Mode v2 : tout est refusé par défaut, avant tout outil de mesure.
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  gtag("consent", "default", { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" });
  const loaded = {};
  const applyConsent = (c) => {
    gtag("consent", "update", { analytics_storage: c.a ? "granted" : "denied", ad_storage: c.m ? "granted" : "denied", ad_user_data: c.m ? "granted" : "denied", ad_personalization: c.m ? "granted" : "denied" });
    if (c.a && S.ga4 && !loaded.ga4) {
      loaded.ga4 = 1;
      const s = document.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(S.ga4); document.head.appendChild(s);
      gtag("js", new Date()); gtag("config", S.ga4);
    }
    if (c.m && S.pixel && !loaded.pixel) {
      loaded.pixel = 1;
      !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s); }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", S.pixel); fbq("track", "PageView");
    }
  };
  const bar = $("#cookiebar"), prefs = $("#ck-prefs");
  const showBar = (custom) => {
    const c = readConsent();
    $("#ck-analytics").checked = !!(c && c.a); $("#ck-marketing").checked = !!(c && c.m);
    prefs.hidden = !custom; $("#ck-save").hidden = !custom; $("#ck-custom").hidden = !!custom;
    bar.hidden = false;
    $(".ck", bar).focus();
  };
  const choose = (action) => {
    const a = action === "accept_all" ? true : action === "reject_all" ? false : $("#ck-analytics").checked;
    const m = action === "accept_all" ? true : action === "reject_all" ? false : $("#ck-marketing").checked;
    const prev = readConsent();
    const c = { v: S.consentVersion, id: (prev && prev.id) || uuid(), a, m, t: Date.now() };
    document.cookie = `${CK}=${encodeURIComponent(JSON.stringify(c))}; Max-Age=${SIX_MONTHS}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    bar.hidden = true;
    applyConsent(c);
    track("cookie_consent", { analytics: a, marketing: m });
    if (S.db) sb().then((cl) => cl.from("cookie_consents").insert({ consent_id: c.id, analytics: a, marketing: m, action: action === "save" ? "custom" : action, policy_version: S.consentVersion, lang: S.lang })).catch(() => {});
  };
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-ck]"); if (!b) return;
    if (b.dataset.ck === "customize") { showBar(true); return; }
    choose(b.dataset.ck);
  });
  document.addEventListener("click", (e) => { if (e.target.closest("[data-cookie-open]")) showBar(true); });
  const existing = readConsent();
  if (existing) applyConsent(existing); else bar.hidden = false;

  // ---------- Mon compte ----------
  const acc = $("#account");
  if (acc && S.db) {
    const A = S.acc;
    const setState = (s) => { acc.dataset.state = s; };
    const showUser = async (c, user) => {
      setState("user");
      const { data: p } = await c.from("profiles").select("*").eq("id", user.id).maybeSingle();
      const pf = $("#profileForm").elements, prof = p || {};
      $("#acc-hello").textContent = fill(A.hello, { n: prof.first_name || user.email.split("@")[0] });
      $("#acc-email").textContent = user.email;
      pf.first_name.value = prof.first_name || ""; pf.cut_pref.value = prof.cut_pref || ""; pf.size_pref.value = prof.size_pref || "";
      pf.lang.value = prof.lang || S.lang; pf.newsletter_optin.checked = !!prof.newsletter_optin;
      const { data: stamps } = await c.from("club_stamps").select("season").eq("year", S.stamp.year);
      const got = new Set((stamps || []).map((s) => s.season));
      document.querySelectorAll("#carnet li").forEach((li) => li.classList.toggle("on", got.has(li.dataset.season)));
      $("#club-progress").textContent = fill(A.clubProgress, { n: got.size });
    };
    sb().then(async (c) => {
      const route = async (session) => { if (session && session.user) await showUser(c, session.user); else setState("guest"); };
      const { data } = await c.auth.getSession();
      await route(data.session);
      c.auth.onAuthStateChange(async (ev, session) => {
        if (ev === "PASSWORD_RECOVERY") {
          const pw = window.prompt(A.password + " (8+)");
          if (pw && pw.length >= 8) await c.auth.updateUser({ password: pw });
        }
        if (ev === "SIGNED_IN" || ev === "SIGNED_OUT") route(session);
      });

      $("#loginForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const f = e.target, el = f.elements;
        if (!EMAIL.test(el.email.value.trim())) return say(f, A.errEmail);
        const { error } = await c.auth.signInWithPassword({ email: el.email.value.trim(), password: el.password.value });
        if (error) return say(f, A.errLogin);
        track("login", { method: "email" });
      });
      $("#forgotBtn").addEventListener("click", async () => {
        const f = $("#loginForm"), em = f.elements.email.value.trim();
        if (!EMAIL.test(em)) { say(f, A.errEmail); f.elements.email.focus(); return; }
        await c.auth.resetPasswordForEmail(em, { redirectTo: location.origin + location.pathname });
        say(f, A.resetSent);
      });
      $("#signupForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const f = e.target, el = f.elements;
        if (!EMAIL.test(el.email.value.trim())) return say(f, A.errEmail);
        if (el.password.value.length < 8) return say(f, A.errPassword);
        if (!el.terms.checked) return say(f, A.errTerms);
        const { data: d, error } = await c.auth.signUp({
          email: el.email.value.trim(), password: el.password.value,
          options: { emailRedirectTo: location.origin + location.pathname, data: { first_name: el.first_name.value.trim().slice(0, 80), lang: S.lang, cut_pref: el.cut_pref.value, newsletter_optin: el.newsletter.checked } },
        });
        if (error) return say(f, error.status === 422 || /password/i.test(error.message) ? A.errPassword : A.errGeneric);
        track("sign_up", { method: "email" });
        if (!d.session) { say(f, A.checkEmail); f.reset(); }
      });
      $("#profileForm").addEventListener("submit", async (e) => {
        e.preventDefault();
        const f = e.target, el = f.elements;
        const { data: s } = await c.auth.getSession(); if (!s.session) return setState("guest");
        const { error } = await c.from("profiles").update({ first_name: el.first_name.value.trim().slice(0, 80) || null, cut_pref: el.cut_pref.value || null, size_pref: el.size_pref.value || null, lang: el.lang.value, newsletter_optin: el.newsletter_optin.checked }).eq("id", s.session.user.id);
        say(f, error ? A.errGeneric : A.saved);
        if (!error) $("#acc-hello").textContent = fill(A.hello, { n: el.first_name.value.trim() || s.session.user.email.split("@")[0] });
      });
      $("#logoutBtn").addEventListener("click", async () => { await c.auth.signOut(); setState("guest"); });
      $("#deleteBtn").addEventListener("click", async () => {
        if (!window.confirm(A.deleteConfirm)) return;
        const { error } = await c.rpc("delete_my_account");
        if (error) { toast(A.errGeneric); return; }
        await c.auth.signOut(); setState("guest"); toast(A.deleted);
      });
    }).catch(() => setState("off"));
  }

  // Vidéos : lecture auto en muet, sauf si l'appareil demande de réduire les animations.
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll("video[data-autoplay]").forEach((v) => { v.play().catch(() => {}); });
  }

  render();
})();
