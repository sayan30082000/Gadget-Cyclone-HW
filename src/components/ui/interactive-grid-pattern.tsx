import React, { useCallback, useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * InteractiveGridPattern (Magic UI), changed for Gadget Cyclone after the mobile review:
 * - hover is pure CSS now, so moving the mouse no longer re-renders ~900 squares
 * - squares also light up on tap / finger drag, because phones have no hover
 * - `autoGlow` lights a few random squares on its own, so the grid feels alive on touch screens too
 */
interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  squares?: [number, number] // [horizontal, vertical]
  className?: string
  squaresClassName?: string
  /** element whose pointer events should light the squares (defaults to the svg) */
  trackRef?: React.RefObject<HTMLElement | null>
  autoGlow?: boolean
}

export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className,
  squaresClassName,
  trackRef,
  autoGlow = false,
  ...props
}: InteractiveGridPatternProps) {
  const [horizontal, vertical] = squares
  const svgRef = useRef<SVGSVGElement>(null)
  const rects = useRef<(SVGRectElement | null)[]>([])
  const timers = useRef(new Map<number, number>())

  const light = useCallback((index: number, ms = 650) => {
    const el = rects.current[index]
    if (!el) return
    el.dataset.on = "1"
    const old = timers.current.get(index)
    if (old) window.clearTimeout(old)
    timers.current.set(
      index,
      window.setTimeout(() => {
        delete el.dataset.on
        timers.current.delete(index)
      }, ms)
    )
  }, [])

  // tap / drag on touch screens (mouse uses CSS :hover)
  useEffect(() => {
    const target = trackRef?.current ?? svgRef.current
    const svg = svgRef.current
    if (!target || !svg) return
    const onPointer = (ev: Event) => {
      const e = ev as PointerEvent
      if (e.pointerType === "mouse") return
      const r = svg.getBoundingClientRect()
      const col = Math.floor((e.clientX - r.left) / width)
      const row = Math.floor((e.clientY - r.top) / height)
      for (let dx = -1; dx <= 1; dx++)
        for (let dy = -1; dy <= 1; dy++) {
          const c = col + dx
          const rr = row + dy
          if (c < 0 || rr < 0 || c >= horizontal || rr >= vertical) continue
          light(rr * horizontal + c, dx === 0 && dy === 0 ? 900 : 500)
        }
    }
    target.addEventListener("pointerdown", onPointer, { passive: true })
    target.addEventListener("pointermove", onPointer, { passive: true })
    return () => {
      target.removeEventListener("pointerdown", onPointer)
      target.removeEventListener("pointermove", onPointer)
    }
  }, [trackRef, width, height, horizontal, vertical, light])

  // ambient glow: a few random squares, only while the grid is on screen
  useEffect(() => {
    if (!autoGlow) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const svg = svgRef.current
    if (!svg) return
    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(svg)
    const id = window.setInterval(() => {
      if (!visible || document.hidden) return
      const r = svg.getBoundingClientRect()
      const cols = Math.min(horizontal, Math.ceil(r.width / width))
      const rows = Math.min(vertical, Math.ceil(r.height / height))
      for (let k = 0; k < 2; k++) {
        const c = Math.floor(Math.random() * cols)
        const rr = Math.floor(Math.random() * rows)
        light(rr * horizontal + c, 1100)
      }
    }, 420)
    return () => {
      window.clearInterval(id)
      io.disconnect()
    }
  }, [autoGlow, horizontal, vertical, width, height, light])

  useEffect(() => {
    const map = timers.current
    return () => map.forEach((t) => window.clearTimeout(t))
  }, [])

  return (
    <svg
      ref={svgRef}
      width={width * horizontal}
      height={height * vertical}
      className={cn("absolute inset-0 h-full w-full border border-gray-400/30", className)}
      {...props}
    >
      {Array.from({ length: horizontal * vertical }).map((_, index) => {
        const x = (index % horizontal) * width
        const y = Math.floor(index / horizontal) * height
        return (
          <rect
            key={index}
            ref={(el) => {
              rects.current[index] = el
            }}
            x={x}
            y={y}
            width={width}
            height={height}
            className={cn(
              "fill-transparent stroke-gray-400/30 transition-[fill] duration-1000 ease-out hover:duration-100 data-[on]:duration-150",
              squaresClassName
            )}
          />
        )
      })}
    </svg>
  )
}
