/* ------------------------------------------------------------------
   The Grand Steam Life — product catalogue
   Edit this file to change products, prices and checkout settings.
   Prices are in AUD and include GST.
   To use a photo instead of an illustration, put it in assets/img/products/
   and change "img" to its file name (e.g. "birch-venik.jpg").
------------------------------------------------------------------- */

window.GSL_SETTINGS = {
  currency: "AUD",
  // "email": checkout opens a pre-filled order email (works on GitHub Pages with no backend).
  // "stripe": each product's stripeLink is used when the cart holds a single product line.
  checkoutMode: "email",
  orderEmail: "orders@thegrandsteamlife.com.au", // TODO: replace with your real address
  shippingNote: "Shipping is calculated when we confirm your order."
};

window.GSL_PRODUCTS = [
  { id: "birch-venik", name: "Birch venik", tradition: "banya", price: 29,
    img: "venik.svg",
    desc: "The classic Russian banya whisk. Soft, fragrant leaves for a gentle steaming. Soak before use.",
    stripeLink: "" },
  { id: "oak-venik", name: "Oak venik", tradition: "banya", price: 32,
    img: "venik.svg",
    desc: "Broader, sturdier leaves that hold heat well and last longer. Good for stronger steaming.",
    stripeLink: "" },
  { id: "eucalyptus-venik", name: "Eucalyptus venik", tradition: "banya", price: 34,
    img: "venik.svg",
    desc: "An Australian take on the venik. Strong, clear aroma that opens up in the steam.",
    stripeLink: "" },
  { id: "felt-hat", name: "Felt banya hat", tradition: "banya", price: 45,
    img: "hat.svg",
    desc: "Pure wool felt keeps your head cooler in high heat, so you can stay on the top bench longer.",
    stripeLink: "" },
  { id: "peshtemal", name: "Cotton peshtemal", tradition: "hammam", price: 49,
    img: "towel.svg",
    desc: "The flat-woven Turkish hammam towel. Light, quick-drying and absorbent.",
    stripeLink: "" },
  { id: "kese-mitt", name: "Kese scrub mitt", tradition: "hammam", price: 22,
    img: "mitt.svg",
    desc: "The traditional hammam exfoliating mitt. Use on warm, steamed skin for best results.",
    stripeLink: "" },
  { id: "black-soap", name: "Olive black soap, 250 g", tradition: "hammam", price: 26,
    img: "soap.svg",
    desc: "Soft olive oil soap to apply before the kese scrub. Leave on for five minutes, then rinse.",
    stripeLink: "" },
  { id: "bucket-ladle", name: "Linden bucket and ladle", tradition: "sauna", price: 119,
    img: "bucket.svg",
    desc: "Hand-coopered linden bucket with a long-handled ladle for pouring water onto the stones.",
    stripeLink: "" },
  { id: "thermo-hygrometer", name: "Thermometer and hygrometer", tradition: "sauna", price: 59,
    img: "gauge.svg",
    desc: "Read temperature and humidity at a glance, set in a timber frame that stays cool to touch.",
    stripeLink: "" },
  { id: "sand-timer", name: "15-minute sand timer", tradition: "sauna", price: 25,
    img: "timer.svg",
    desc: "Heat-safe glass in a wall mount. Keeps each round honest without bringing a phone inside.",
    stripeLink: "" },
  { id: "sauna-oil", name: "Fir and eucalyptus sauna oil, 50 ml", tradition: "sauna", price: 28,
    img: "oil.svg",
    desc: "A few drops in the ladle water. Forest-fresh scent for banya and sauna stones.",
    stripeLink: "" },
  { id: "felt-mat", name: "Felt seat mat", tradition: "sauna", price: 35,
    img: "mat.svg",
    desc: "Wool felt mat for the bench. Hygienic, comfortable on hot timber, and washable.",
    stripeLink: "" }
];
