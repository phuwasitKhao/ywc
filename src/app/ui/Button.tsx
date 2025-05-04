'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

export default function Button({
  children,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  variant = 'primary',
}: ButtonProps) {
  
  let variantClasses = '';
  
  switch (variant) {
    case 'primary':
      variantClasses = 'bg-accent hover:bg-accent-hover text-primary font-medium';
      break;
    case 'secondary':
      variantClasses = 'bg-teal-deep hover:bg-teal-light text-white font-medium';
      break;
    case 'tertiary':
      variantClasses = 'bg-transparent border border-accent text-accent hover:bg-accent/10';
      break;
    default:
      variantClasses = 'bg-accent hover:bg-accent-hover text-primary font-medium';
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-lg transition-all duration-300 interactive ${variantClasses} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.button>
  )
}