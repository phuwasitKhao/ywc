'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('interactive')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    hover: {
      x: mousePosition.x,
      y: mousePosition.y,
      scale: 1.5,
      backgroundColor: 'rgba(233, 69, 96, 0.8)',
    }
  }

  return (
    <motion.div
      className="custom-cursor"
      variants={variants}
      animate={isHovering ? 'hover' : 'default'}
      transition={{ type: 'spring', stiffness: 500, damping: 28 }}
    />
  )
}