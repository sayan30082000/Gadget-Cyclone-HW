/**
 * The Gadget Cyclone logo (public/logo.webp, and a lighter public/logo-dark.webp for dark mode).
 * It is a CSS background so each visitor downloads only the version for their theme.
 * Set the height with className (for example "h-10"); the width follows the logo's shape.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="Gadget Cyclone"
      className={`block aspect-[365/120] bg-[url(/logo.webp)] bg-contain bg-left bg-no-repeat dark:bg-[url(/logo-dark.webp)] ${className}`}
    />
  )
}
