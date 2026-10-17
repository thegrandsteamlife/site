/* The Grand Steam Life — site behaviour */
(function () {
  "use strict";
  const ROOT = document.body.dataset.root || "";
  const SETTINGS = window.GSL_SETTINGS || { currency: "AUD", checkoutMode: "email", orderEmail: "" };
  const PRODUCTS = window.GSL_PRODUCTS || [];
  const money = (n) => new Intl.NumberFormat("en-AU", { style: "currency", currency: SETTINGS.currency }).format(n);
  const traditionName = { banya: "Banya", sauna: "Sauna", hammam: "Hammam" };

  /* ---------- Mobile navigation ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  /* ---------- Steam room switcher (home page) ---------- */
  const room = document.querySelector(".steam-room");
  if (room) {
    const ROOMS = {
      banya: { title: "Russian banya", origin: "Wet heat from a stone stove, with a venik", temp: "60–90°C", tempV: 70, hum: "40–70%", humV: 55,
        text: "Water on the stones fills the room with heavy, soft steam. A soaked birch or oak venik moves the heat over the body, followed by a cold plunge, snow or a bucket of icy water." },
      sauna: { title: "Finnish sauna", origin: "Dry heat with bursts of löyly", temp: "70–100°C", tempV: 85, hum: "10–20%", humV: 15,
        text: "The air stays dry until a ladle of water hits the stones and a wave of löyly rolls down from the ceiling. Quiet, simple, and usually followed by a lake or a cold shower." },
      hammam: { title: "Hammam", origin: "Warm marble and saturated steam", temp: "40–50°C", tempV: 35, hum: "Near 100%", humV: 98,
        text: "A gentler heat. You lie on warm marble while the steam softens the skin, then a kese scrub and a rich soap wash. Slower, more social and deeply cleansing." }
    };
    const tabs = room.querySelectorAll("[role='tab']");
    const set = (key) => {
      const r = ROOMS[key];
      room.dataset.room = key;
      tabs.forEach((t) => {
        const on = t.dataset.room === key;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      room.querySelector("[data-r='title']").textContent = r.title;
      room.querySelector("[data-r='origin']").textContent = r.origin;
      room.querySelector("[data-r='temp']").textContent = r.temp;
      room.querySelector("[data-r='hum']").textContent = r.hum;
      room.querySelector("[data-r='text']").textContent = r.text;
      room.querySelector("[data-r='tempbar']").style.setProperty("--v", r.tempV + "%");
      room.querySelector("[data-r='humbar']").style.setProperty("--v", r.humV + "%");
    };
    tabs.forEach((t, i) => {
      t.addEventListener("click", () => set(t.dataset.room));
      t.addEventListener("keydown", (e) => {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
        next.focus(); set(next.dataset.room);
      });
    });
    set("banya");
  }

  /* ---------- Cart (stored in this browser) ---------- */
  const KEY = "gsl-cart";
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const save = (c) => { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) { /* storage unavailable */ } };
  let cart = load();

  const drawer = document.createElement("div");
  drawer.innerHTML = `
    <div class="cart-backdrop" hidden data-cart-close></div>
    <aside class="cart" hidden role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div class="cart-head"><h2 id="cart-title">Your cart</h2><button class="cart-close" data-cart-close>Close</button></div>
      <ul class="cart-items"></ul>
      <div class="cart-foot">
        <div class="cart-total"><span>Subtotal</span><span data-cart-total>$0.00</span></div>
        <small>Prices include GST. ${SETTINGS.shippingNote || ""}</small>
        <button class="btn" data-checkout>Send order</button>
      </div>
    </aside>`;
  document.body.appendChild(drawer);
  const panel = drawer.querySelector(".cart");
  const backdrop = drawer.querySelector(".cart-backdrop");
  const list = drawer.querySelector(".cart-items");
  let lastFocus = null;

  const openCart = () => { lastFocus = document.activeElement; panel.hidden = false; backdrop.hidden = false; panel.querySelector(".cart-close").focus(); };
  const closeCart = () => { panel.hidden = true; backdrop.hidden = true; if (lastFocus) lastFocus.focus(); };
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-cart-open]")) openCart();
    if (e.target.closest("[data-cart-close]")) closeCart();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) closeCart(); });

  const render = () => {
    const count = cart.reduce((s, i) => s + i.qty, 0);
    document.querySelectorAll("[data-cart-count]").forEach((el) => (el.textContent = count));
    const total = cart.reduce((s, i) => s + i.qty * i.price, 0);
    drawer.querySelector("[data-cart-total]").textContent = money(total);
    drawer.querySelector("[data-checkout]").disabled = !cart.length;
    if (!cart.length) {
      list.innerHTML = `<li class="cart-empty">Your cart is empty. <a href="${ROOT}shop.html">Browse the shop</a> to add something.</li>`;
      return;
    }
    list.innerHTML = cart.map((i) => `
      <li class="cart-item">
        <img src="${ROOT}assets/img/products/${i.img}" alt="">
        <div><div class="name">${i.name}</div>
          <div class="qty"><button data-dec="${i.id}" aria-label="Remove one ${i.name}">−</button><span>${i.qty}</span><button data-inc="${i.id}" aria-label="Add one ${i.name}">+</button></div>
        </div>
        <div>${money(i.qty * i.price)}</div>
      </li>`).join("");
  };

  const add = (id) => {
    const p = PRODUCTS.find((x) => x.id === id);
    if (!p) return;
    const line = cart.find((x) => x.id === id);
    if (line) line.qty += 1; else cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty: 1 });
    save(cart); render();
  };
  list.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]");
    if (!inc && !dec) return;
    const id = (inc || dec).dataset.inc || (inc || dec).dataset.dec;
    const line = cart.find((x) => x.id === id);
    if (!line) return;
    line.qty += inc ? 1 : -1;
    if (line.qty <= 0) cart = cart.filter((x) => x.id !== id);
    save(cart); render();
  });

  drawer.querySelector("[data-checkout]").addEventListener("click", () => {
    if (!cart.length) return;
    if (SETTINGS.checkoutMode === "stripe" && cart.length === 1) {
      const p = PRODUCTS.find((x) => x.id === cart[0].id);
      if (p && p.stripeLink) { window.location.href = p.stripeLink; return; }
    }
    const lines = cart.map((i) => `${i.qty} × ${i.name} — ${money(i.qty * i.price)}`).join("\n");
    const total = money(cart.reduce((s, i) => s + i.qty * i.price, 0));
    const body = `Hello,\n\nI'd like to order:\n\n${lines}\n\nSubtotal: ${total} (incl. GST)\n\nName:\nDelivery address:\nPhone:\n\nThanks!`;
    window.location.href = `mailto:${SETTINGS.orderEmail}?subject=${encodeURIComponent("Order from The Grand Steam Life website")}&body=${encodeURIComponent(body)}`;
  });

  /* ---------- Product grids ---------- */
  const card = (p) => `
    <article class="product" data-tradition="${p.tradition}">
      <div class="product-art"><img src="${ROOT}assets/img/products/${p.img}" alt="" loading="lazy"></div>
      <h3>${p.name}</h3>
      <div class="tradition">${traditionName[p.tradition]}</div>
      <p>${p.desc}</p>
      <div class="product-foot"><span class="price">${money(p.price)}</span>
        <button class="btn btn--ghost" data-add="${p.id}">Add to cart</button></div>
      <div class="added" aria-live="polite"></div>
    </article>`;

  document.querySelectorAll("[data-products]").forEach((grid) => {
    const ids = (grid.dataset.products || "").split(",").map((s) => s.trim()).filter(Boolean);
    const items = ids.length ? ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) : PRODUCTS;
    grid.innerHTML = items.map(card).join("");
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-add]");
    if (!b) return;
    add(b.dataset.add);
    const note = b.closest(".product").querySelector(".added");
    note.innerHTML = `Added. <a href="#" data-cart-open>View cart</a>`;
  });
  document.addEventListener("click", (e) => { if (e.target.matches("a[data-cart-open]")) e.preventDefault(); });

  const filters = document.querySelector(".filters");
  if (filters) {
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button");
      if (!b) return;
      filters.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      const f = b.dataset.filter;
      document.querySelectorAll(".product").forEach((p) => { p.hidden = f !== "all" && p.dataset.tradition !== f; });
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
  render();
})();
