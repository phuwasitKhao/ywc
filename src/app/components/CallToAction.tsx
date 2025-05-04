'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function CallToAction() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    // Here you would typically send the email to your backend or newsletter service
    // For this demo, we'll just simulate success
    setSubmitted(true)
    setError('')
  }
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  }
  
  const resourceLinks = [
    {
      title: 'AI in Creative Industries',
      url: '#',
      color: 'from-purple-deep to-accent'
    },
    {
      title: 'The Future of Content Jobs',
      url: '#',
      color: 'from-teal-deep to-teal-light'
    },
    {
      title: 'Ethical AI Content Creation',
      url: '#',
      color: 'from-highlight to-orange-500'
    },
  ]
  
  return (
    <motion.div
      ref={ref}
      className="content-container"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div
        className="max-w-4xl mx-auto bg-primary rounded-xl p-8 md:p-12 shadow-2xl"
        variants={itemVariants}
      >
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-6 font-display"
          variants={itemVariants}
        >
          <span className="heading-gradient">Join</span> the Conversation
        </motion.h2>
        
        <motion.p 
          className="text-lg text-center mb-8 text-gray-300"
          variants={itemVariants}
        >
          Stay updated on the evolving relationship between AI and human content creators.
        </motion.p>
        
        {!submitted ? (
          <motion.form 
            onSubmit={handleSubmit}
            className="mb-8"
            variants={itemVariants}
          >
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-6 py-4 rounded-lg bg-primary-light border border-secondary text-white text-lg focus:outline-none focus:ring-2 focus:ring-accent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <motion.button
                type="submit"
                className="px-8 py-4 bg-accent hover:bg-accent-hover text-primary font-bold rounded-lg text-lg interactive"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
            {error && (
              <p className="mt-2 text-highlight">{error}</p>
            )}
            <p className="mt-2 text-sm text-gray-400">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </motion.form>
        ) : (
          <motion.div 
            className="bg-primary-light p-6 rounded-lg mb-8 text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <svg 
              className="w-16 h-16 text-green-500 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <h3 className="text-xl font-bold mb-2">Thank you for subscribing!</h3>
            <p className="text-gray-300">
              ${`We'll keep you updated on the latest trends and discussions about AI and human content creation.`}
            </p>
          </motion.div>
        )}
        
        <motion.div variants={itemVariants}>
          <h3 className="text-xl font-bold mb-4 text-center">Explore Further</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {resourceLinks.map((link) => (
              <motion.a
                key={link.title}
                href={link.url}
                className="block p-4 bg-primary-light rounded-lg text-center shadow-md overflow-hidden relative group interactive"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                <h4 className="font-medium relative z-10">{link.title}</h4>
              </motion.a>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-12 flex justify-center space-x-6"
          variants={itemVariants}
        >
          <motion.a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300 interactive"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Twitter"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </motion.a>
          <motion.a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300 interactive"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </motion.a>
          <motion.a
            href="#"
            className="text-gray-400 hover:text-white transition-colors duration-300 interactive"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}