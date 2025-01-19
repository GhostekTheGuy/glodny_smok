'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

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
  }, [category])

  return (
    <div ref={containerRef} className="overflow-hidden mb-6">
      <motion.h2
        ref={textRef}
        className="text-3xl font-bold whitespace-nowrap"
        animate={isOverflowing ? {
          x: [0, -100, 0],
          transition: {
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 5,
              ease: "linear",
            },
          },
        } : {}}
      >
        {category}
      </motion.h2>
    </div>
  )
}

