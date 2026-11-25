import { StrictMode } from "react"
import { renderToString } from "react-dom/server"

import App from "./App.tsx"

// Used only at build time: scripts/prerender.mjs puts this HTML into dist/index.html,
// so the page shows its content before the JavaScript has loaded.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

// the build step also reads the shop details, so SEO tags always match src/data/site.ts
export { SITE, HERO_PRODUCTS, heroSrcSet } from "./data/site"
