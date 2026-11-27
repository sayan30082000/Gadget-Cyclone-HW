// Build step (runs after `vite build`):
// 1. renders the page to HTML and puts it inside dist/index.html, so visitors, Google and
//    Facebook/WhatsApp previews get real content right away; React then "hydrates" it.
// 2. adds the SEO tags that need the live URL or shop details (from src/data/site.ts).
// 3. writes robots.txt and sitemap.xml.
import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const dist = path.resolve("dist")
const ssrDir = path.resolve("dist-ssr")
const { render, SITE, HERO_PRODUCTS, heroSrcSet } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href)

// SITE_URL and BASE_PATH are set by the GitHub Pages build; Netlify uses SITE.url and "/"
const url = (process.env.SITE_URL || SITE.url).replace(/\/$/, "")
const base = process.env.BASE_PATH || "/"
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;")

const indexPath = path.join(dist, "index.html")
let html = fs.readFileSync(indexPath, "utf8")

// 1. pre-rendered page
const app = render()
if (!html.includes('<div id="root"></div>')) throw new Error("root div not found in dist/index.html")
html = html.replace('<div id="root"></div>', `<div id="root">${app}</div>`)

// 2a. fonts the first screen needs (so text does not swap late)
const wanted = [/^newsreader-latin-400-normal-.*\.woff2$/, /^newsreader-latin-400-italic-.*\.woff2$/, /^inter-latin-400-normal-.*\.woff2$/, /^jetbrains-mono-latin-700-normal-.*\.woff2$/]
const assets = fs.readdirSync(path.join(dist, "assets"))
const fonts = wanted.map((re) => assets.find((f) => re.test(f))).filter(Boolean)

// 2b. local business data for Google (only fields the owner has filled in)
const business = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: SITE.name,
  description: "Phone accessories: earbuds, chargers, cables, power banks, covers, smart watches and speakers.",
  url,
  image: `${url}/og-image.png`,
  logo: `${url}/logo.png`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Finlay Square, 4th floor, 2 No. Gate",
    addressLocality: "Chattogram",
    addressCountry: "BD",
  },
  areaServed: "Chattogram",
  paymentAccepted: "Cash",
  hasMap: SITE.mapsUrl,
  ...(SITE.phone ? { telephone: SITE.phone } : {}),
  ...(SITE.hours ? { openingHours: SITE.hours } : {}),
  ...(SITE.facebookUrl ? { sameAs: [SITE.facebookUrl] } : {}),
}

const first = HERO_PRODUCTS[0]
const head = [
  `<link rel="canonical" href="${url}/" />`,
  `<meta property="og:url" content="${url}/" />`,
  `<meta property="og:image" content="${url}/og-image.png" />`,
  `<meta name="twitter:image" content="${url}/og-image.png" />`,
  `<link rel="preload" as="image" imagesrcset="${esc(heroSrcSet(first.cutout))}" imagesizes="(min-width: 1024px) 36vw, 80vw" fetchpriority="high" />`,
  ...fonts.map((f) => `<link rel="preload" href="${base}assets/${f}" as="font" type="font/woff2" crossorigin />`),
  `<script type="application/ld+json">${JSON.stringify(business)}</script>`,
].join("\n    ")
html = html.replace("</head>", `    ${head}\n  </head>`)
fs.writeFileSync(indexPath, html)

// 3. crawler files
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${url}/sitemap.xml\n`)
fs.writeFileSync(
  path.join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>\n</urlset>\n`
)

// the not-found page links to the logo and the home page; point them at the right folder
if (base !== "/") {
  const notFound = path.join(dist, "404.html")
  fs.writeFileSync(notFound, fs.readFileSync(notFound, "utf8").replace(/(href|src|srcset)="\//g, `$1="${base}`))
}

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerendered ${Math.round(app.length / 1024)} KB of HTML, ${fonts.length} font preloads, SEO tags for ${url}`)
