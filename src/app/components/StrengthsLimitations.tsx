'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface Strength {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const aiStrengths: Strength[] = [
  {
    title: 'Speed & Efficiency',
    description: 'AI can generate content in seconds, handling high volumes efficiently without fatigue.',
    icon: '⚡',
    color: 'from-accent to-blue-500',
  },
  {
    title: 'Data Processing',
    description: 'Can analyze and synthesize vast amounts of information beyond human capacity.',
    icon: '📊',
    color: 'from-purple-deep to-purple-light',
  },
  {
    title: 'Consistency',
    description: 'Maintains the same quality and style across multiple pieces without variation.',
    icon: '🔄',
    color: 'from-teal-deep to-teal-light',
  },
  {
    title: 'Scalability',
    description: 'Can produce content in multiple languages and formats simultaneously.',
    icon: '📈',
    color: 'from-highlight to-orange-500',
  },
]

const humanStrengths: Strength[] = [
  {
    title: 'Emotional Intelligence',
    description: 'Humans understand nuanced emotions and can create content that genuinely resonates.',
    icon: '❤️',
    color: 'from-highlight to-red-700',
  },
  {
    title: 'Creative Innovation',
    description: 'Can make unexpected creative leaps and develop truly original concepts.',
    icon: '💡',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    title: 'Cultural Context',
    description: 'Intrinsic understanding of cultural nuances, trends, and societal sensitivities.',
    icon: '🌍',
    color: 'from-teal-deep to-green-600',
  },
  {
    title: 'Ethical Judgment',
    description: 'Can make complex ethical decisions based on values and understand moral implications.',
    icon: '⚖️',
    color: 'from-purple-deep to-blue-700',
  },
]

export default function StrengthsLimitations() {
  const [activeTab, setActiveTab] = useState<'ai' | 'human'>('ai')
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
  
  return (
    <motion.div
      ref={ref}
      className="content-container"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-4 font-display"
        variants={itemVariants}
      >
        <span className="heading-gradient">Strengths</span> & Limitations
      </motion.h2>
      
      <motion.p 
        className="text-lg text-center max-w-3xl mx-auto mb-12 text-gray-300"
        variants={itemVariants}
      >
        AI and humans each bring unique strengths to content creation.
      </motion.p>
      
      <div className="flex justify-center mb-12">
        <motion.div 
          className="bg-primary p-1 rounded-full flex gap-5"
          variants={itemVariants}
        >
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'ai' 
                ? 'bg-accent text-primary' 
                : 'text-white hover:bg-primary-light'
            }`}
          >
            AI Strengths
          </button>
          <button
            onClick={() => setActiveTab('human')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeTab === 'human' 
                ? 'bg-teal-light text-primary' 
                : 'text-white hover:bg-primary-light'
            }`}
          >
            Human Strengths
          </button>
        </motion.div>
      </div>
      
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {(activeTab === 'ai' ? aiStrengths : humanStrengths).map((strength) => (
          <motion.div
            key={strength.title}
            className="bg-primary p-6 rounded-xl shadow-lg overflow-hidden relative"
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${strength.color} opacity-10`}></div>
            <div className="relative z-10">
              <div className="text-4xl mb-4">{strength.icon}</div>
              <h3 className="text-xl font-bold mb-2">{strength.title}</h3>
              <p className="text-gray-300">{strength.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-16 p-6 bg-primary rounded-xl shadow-lg"
        variants={itemVariants}
      >
        <h3 className="text-2xl font-bold mb-4 text-center">The Ideal Future: <span className="text-accent">Collaboration</span></h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-semibold mb-3 text-accent">AI Handles:</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Data-heavy research and analysis</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Repetitive content production</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>Content optimization and personalization</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">✓</span>
                <span>First drafts and formatting</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-3 text-teal-light">Humans Provide:</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-teal-light mr-2">✓</span>
                <span>Creative direction and strategy</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-light mr-2">✓</span>
                <span>Emotional resonance and authenticity</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-light mr-2">✓</span>
                <span>Ethical oversight and brand values</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-light mr-2">✓</span>
                <span>Final editing and quality control</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}