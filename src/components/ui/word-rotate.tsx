import { useEffect, useState } from "react"
import { AnimatePresence, motion, type MotionProps } from "motion/react"

import { cn } from "@/lib/utils"

interface WordRotateProps {
  words: string[]
  duration?: number
  motionProps?: MotionProps
  className?: string
  /** Controlled index (round 4): lets the hero photo and the word change together. */
  index?: number
}

export function WordRotate({
  words,
  duration = 2500,
  // changed after review: the word now slides inside its own line box (it used to drop onto the next line)
  motionProps = {
    initial: { opacity: 0, y: "-100%" },
    animate: { opacity: 1, y: "0%" },
    exit: { opacity: 0, y: "100%" },
    transition: { duration: 0.3, ease: "easeOut" },
  },
  className,
  index: controlledIndex,
}: WordRotateProps) {
  const [ownIndex, setOwnIndex] = useState(0)
  const controlled = controlledIndex !== undefined
  const index = controlled ? controlledIndex % words.length : ownIndex

  useEffect(() => {
    if (controlled) return
    const interval = setInterval(() => {
      setOwnIndex((prevIndex) => (prevIndex + 1) % words.length)
    }, duration)

    // Clean up interval on unmount
    return () => clearInterval(interval)
  }, [words, duration, controlled])

  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[index]}
          className={cn("block", className)}
          {...motionProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
