# The Grand Steam Life — website

A static website for The Grand Steam Life: banya, sauna and hammam accessories and information.
No build step, no framework. It runs on GitHub Pages as-is.

## Pages
- `index.html` — Home: benefits of banya, sauna and hammam, the ritual, comparison table, safety
- `about.html` — About the brand
- `blog.html` + `blog/*.html` — Blog index and three starter posts
- `shop.html` — Shop with filters and a cart
- `404.html` — Not-found page

## Deploy to GitHub Pages
1. Create a new repository on GitHub (e.g. `grand-steam-life`).
2. Upload the contents of this folder to the root of the repository (keep `.nojekyll`).
3. In the repository go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
5. After a minute or two the site is live at `https://<your-username>.github.io/<repo-name>/`.

### Custom domain (optional)
In **Settings → Pages → Custom domain**, enter e.g. `thegrandsteamlife.com.au`, then add the DNS records GitHub shows you
with your domain registrar. Tick **Enforce HTTPS** once it's available.

## Things to update before launch
- **Placeholder images:** swap the illustrations in `assets/img/placeholders/` for your own photos (see below).
- **Email addresses:** search all files for `thegrandsteamlife.com.au` and replace with your real addresses.
- **Products and prices:** edit `assets/js/products.js`. Each product has a name, tradition (`banya`, `sauna` or `hammam`), price in AUD incl. GST, image and description.
- **Product photos:** add photos to `assets/img/products/` and change each product's `img` to the photo's file name.
- **About page:** add your own story to `about.html`.
- **404 page:** if the site is at `username.github.io/repo-name/` (no custom domain), change the asset and link paths in `404.html` to start with `/repo-name/`.

## How the shop works
GitHub Pages only hosts static files, so there is no server-side checkout. Out of the box:
- Customers add products to a cart (saved in their browser).
- **Send order** opens a pre-filled email to your order address listing the items and subtotal.
- You reply to confirm shipping and send a payment link or invoice.

To take card payments directly, options that work with a static site include:
- **Stripe Payment Links:** create a link per product in Stripe, paste it into that product's `stripeLink`, and set `checkoutMode: "stripe"` in `products.js` (used when the cart holds one product line).
- **Shopify Buy Button, Snipcart or Ecwid:** embeddable carts that handle checkout, GST and shipping for you.

## Adding a blog post
1. Copy one of the files in `blog/` and rename it.
2. Change the title, date, description and content.
3. Add a new `<li>` to the list in `blog.html` (newest at the top).

## Logo files
Made from `GrandSteamLife_Logo_Master.png`, all in `assets/img/`:
- `logo-160.png` — header and footer
- `logo-512.png` — About page
- `favicon-64.png`, `apple-touch-icon.png` — browser tab and phone home-screen icons
- `og-image.jpg` — preview image when the site is shared on social media or in messages

## Brand colours (from the logo)
| Name | Hex | Used for |
|---|---|---|
| Navy | `#0F233C` | Text, buttons, dark sections |
| Copper | `#C8693A` | Accents, cart badge, active nav |
| Deep copper | `#9E4F26` | Links (darker for readability) |
| Wood | `#CC8253` | Numbers and highlights on navy |
| Sand | `#EEE2D1` | Alternate section backgrounds |
| Steam white | `#F5F0E8` | Page background |

Change them in one place: the `:root` block at the top of `assets/css/style.css`.

## Placeholder images
Illustrations in the style of the logo, ready to replace with photos. Keep the same file name, or update the
`src` in the HTML if you change the name or format (e.g. `.svg` to `.jpg`).

| File | Where it appears | Suggested photo |
|---|---|---|
| `banya-interior.svg` | Home (wide band under the hero), blog post cover | Wide shot of a banya or sauna interior (approx. 1600 × 640) |
| `banya.svg` | Home, “Three traditions” | Banya with venik and felt hat (4:3) |
| `hammam.svg` | Home, “Three traditions”; hammam blog post | Hammam interior or peshtemal and kese (4:3) |
| `sauna.svg` | Home, “Three traditions” | Finnish sauna, ideally with a window view (4:3) |
| `veniks.svg` | About page; venik blog post | Veniks drying, or your products on a bench (10:7) |

Product images live in `assets/img/products/` and are set per product in `assets/js/products.js`.
Square or 4:5 photos on a plain background work best.
