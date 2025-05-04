'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let particles: Particle[] = []
    
    const resizeCanvas = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles()
    }
    
    const createParticles = () => {
      if (!canvas) return
      particles = []
      const numberOfParticles = Math.min(window.innerWidth, window.innerHeight) * 0.1
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.1})`,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25
        })
      }
    }
    
    const drawParticles = () => {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, i) => {
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
        
        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
        
        // Draw connections
        particles.forEach((particle2, j) => {
          if (i !== j) {
            const dx = particle.x - particle2.x
            const dy = particle.y - particle2.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 100) {
              ctx.beginPath()
              ctx.strokeStyle = `rgba(100, 150, 200, ${0.2 * (1 - distance / 100)})`
              ctx.lineWidth = 0.2
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(particle2.x, particle2.y)
              ctx.stroke()
            }
          }
        })
      })
      
      animationFrameId = requestAnimationFrame(drawParticles)
    }
    
    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    drawParticles()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])
  
  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 opacity-30"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.3 }}
      transition={{ duration: 2 }}
    />
  )
}