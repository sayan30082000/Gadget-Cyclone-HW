import React, { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * InteractiveGridPattern, based on Magic UI's component, rebuilt for Gadget Cyclone (round 6, performance):
 * - the old version drew ~900 SVG squares (2,185 DOM elements on the page, 1.2 s blocked main thread on phones)
 * - now the grid lines are one CSS background and the lit squares are painted on ONE canvas
 * - squares light under the mouse, a tap or a finger drag; `autoGlow` lights a few on their own
 * - the canvas only animates while something is fading, and stops when the hero is off screen
 */
interface InteractiveGridPatternProps {
  /** size of one square in px */
  cell?: number
  className?: string
  /** element whose pointer events light the squares */
  trackRef?: React.RefObject<HTMLElement | null>
  autoGlow?: boolean
}

type Lit = { start: number; dur: number; peak: number }

export function InteractiveGridPattern({ cell = 44, className, trackRef, autoGlow = false }: InteractiveGridPatternProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const target = trackRef?.current ?? wrap
    if (!wrap || !canvas || !target) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const lit = new Map<number, Lit>()
    let cols = 1
    let rows = 1
    let raf = 0
    let visible = true
    let color = "0, 122, 82"
    let hovered = -1

    const readColor = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue("--gc-green").trim() || "#007a52"
      const n = parseInt(hex.replace("#", ""), 16)
      color = `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
    }

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(width / cell)
      rows = Math.ceil(height / cell)
      kick()
    }

    const draw = (now: number) => {
      raf = 0
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const [i, l] of lit) {
        const t = (now - l.start) / l.dur
        if (t >= 1 && i !== hovered) {
          lit.delete(i)
          continue
        }
        // quick fade in, slow fade out (like the old CSS: 100 ms in, 1 s out)
        const a = i === hovered ? l.peak : t < 0.1 ? (t / 0.1) * l.peak : l.peak * (1 - (t - 0.1) / 0.9)
        ctx.fillStyle = `rgba(${color}, ${a.toFixed(3)})`
        ctx.fillRect((i % cols) * cell + 1, Math.floor(i / cols) * cell + 1, cell - 1, cell - 1)
      }
      if (lit.size && visible) raf = requestAnimationFrame(draw)
    }
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(draw)
    }

    const light = (i: number, dur: number, peak: number) => {
      lit.set(i, { start: performance.now(), dur, peak })
      kick()
    }

    const onPointer = (ev: Event) => {
      const e = ev as PointerEvent
      const r = wrap.getBoundingClientRect()
      const c = Math.floor((e.clientX - r.left) / cell)
      const rr = Math.floor((e.clientY - r.top) / cell)
      if (c < 0 || rr < 0 || c >= cols || rr >= rows) return
      const i = rr * cols + c
      if (e.pointerType === "mouse") {
        // mouse: the square under the cursor stays lit, the last one fades out
        if (hovered !== i) {
          if (hovered >= 0) light(hovered, 1000, 0.25)
          hovered = i
          light(i, 1000, 0.25)
        }
        return
      }
      // touch: light a small cross around the finger
      for (const [dx, dy] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const cc = c + dx
        const r2 = rr + dy
        if (cc < 0 || r2 < 0 || cc >= cols || r2 >= rows) continue
        light(r2 * cols + cc, dx === 0 && dy === 0 ? 900 : 600, 0.22)
      }
    }
    const onLeave = () => {
      if (hovered >= 0) light(hovered, 1000, 0.25)
      hovered = -1
    }

    readColor()
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      if (visible) kick()
    })
    io.observe(wrap)
    const mo = new MutationObserver(() => {
      readColor()
      kick()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    target.addEventListener("pointermove", onPointer, { passive: true })
    target.addEventListener("pointerdown", onPointer, { passive: true })
    target.addEventListener("pointerleave", onLeave, { passive: true })

    let timer = 0
    if (autoGlow && !reduce) {
      timer = window.setInterval(() => {
        if (!visible || document.hidden) return
        for (let k = 0; k < 2; k++) light(Math.floor(Math.random() * cols * rows), 1100, 0.2)
      }, 420)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.clearInterval(timer)
      ro.disconnect()
      io.disconnect()
      mo.disconnect()
      target.removeEventListener("pointermove", onPointer)
      target.removeEventListener("pointerdown", onPointer)
      target.removeEventListener("pointerleave", onLeave)
    }
  }, [cell, trackRef, autoGlow])

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage:
          "linear-gradient(to right, var(--gc-line) 1px, transparent 1px), linear-gradient(to bottom, var(--gc-line) 1px, transparent 1px)",
        backgroundSize: `${cell}px ${cell}px`,
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 size-full" />
    </div>
  )
}
