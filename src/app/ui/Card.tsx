'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  gradient?: string;
}

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  gradient = '',
}: CardProps) {
  
  return (
    <motion.div
      className={`bg-primary p-6 rounded-xl shadow-lg overflow-hidden relative ${className}`}
      whileHover={hoverEffect ? { y: -10, transition: { duration: 0.3 } } : {}}
    >
      {gradient && <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`}></div>}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}