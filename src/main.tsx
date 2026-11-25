import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// keep the browser bar color in step with the theme
const syncThemeColor = () => {
  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute("content", document.documentElement.classList.contains("dark") ? "#0c110f" : "#f7f7f2")
}
syncThemeColor()
new MutationObserver(syncThemeColor).observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
// the production build ships pre-rendered HTML (scripts/prerender.mjs): hydrate it instead of rebuilding it
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
