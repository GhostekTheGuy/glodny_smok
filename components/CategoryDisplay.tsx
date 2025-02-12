"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CategoryDisplayProps {
  category: string
}

export function CategoryDisplay({ category }: CategoryDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (container && text) {
      setIsOverflowing(text.scrollWidth > container.clientWidth)
    }
  }, [containerRef, textRef]) // Updated dependency array

  return (
    <div ref={containerRef} className="overflow-hidden mb-6">
      <AnimatePresence mode="wait">
        <motion.h2
          key={category}
          ref={textRef}
          initial={{ x: -100, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              x: { type: "spring", stiffness: 100, damping: 15 },
              opacity: { duration: 0.5 },
            },
          }}
          exit={{ x: 100, opacity: 0 }}
          className="text-3xl font-bold whitespace-nowrap"
        >
          {category}
        </motion.h2>
      </AnimatePresence>
    </div>
  )
}

