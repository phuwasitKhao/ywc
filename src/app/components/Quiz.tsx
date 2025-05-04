'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import confetti from 'canvas-confetti'

interface QuizItem {
  content: string;
  isAI: boolean;
  type: string;
}

const quizItems: QuizItem[] = [
  {
    content: "The city streets glistened with rain, each droplet a tiny mirror reflecting the neon signs above. Sarah pulled her coat tighter, watching her breath form clouds in the cold night air.",
    isAI: false,
    type: "Short story excerpt"
  },
  {
    content: "Research indicates that intermittent fasting may provide numerous health benefits, including improved metabolic health, reduced inflammation, and enhanced cellular repair processes. However, individual responses vary significantly.",
    isAI: true,
    type: "Health article"
  },
  {
    content: "Feeling so blessed today! 🙌 Just hiked up to Mirror Lake and the views were INSANE. Nature is the ultimate therapy. #blessed #adventure #nofilterneeded",
    isAI: false,
    type: "Social media post"
  },
  {
    content: "The quantum fluctuations in the early universe provided the seeds for the cosmic structures we observe today, including galaxies, galaxy clusters, and the cosmic web of dark matter.",
    isAI: true,
    type: "Scientific explanation"
  },
  {
    content: "Sipping coffee on my balcony watching the sunrise paint the sky, I'm reminded how tiny moments can hold immense beauty. Sometimes, we just need to pause to notice them.",
    isAI: true,
    type: "Reflective thought"
  }
]

export default function Quiz() {
  const [currentItem, setCurrentItem] = useState(0)
  const [userAnswers, setUserAnswers] = useState<boolean[]>([])
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [hasVoted, setHasVoted] = useState(false)
  const [alreadyAnswered, setAlreadyAnswered] = useState<boolean[]>(Array(quizItems.length).fill(false))
  
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  })
  
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })
  }
  
  const handleAnswer = (answer: boolean) => {
    if (alreadyAnswered[currentItem]) return
    
    const newAnswers = [...userAnswers]
    newAnswers[currentItem] = answer === quizItems[currentItem].isAI
    setUserAnswers(newAnswers)
    
    const newAlreadyAnswered = [...alreadyAnswered]
    newAlreadyAnswered[currentItem] = true
    setAlreadyAnswered(newAlreadyAnswered)
    
    if (answer === quizItems[currentItem].isAI) {
      setScore(score + 1)
    }
  }
  
  const nextItem = () => {
    if (currentItem < quizItems.length - 1) {
      setCurrentItem(currentItem + 1)
    } else {
      setShowResult(true)
      triggerConfetti()
    }
  }
  
  const resetQuiz = () => {
    setCurrentItem(0)
    setUserAnswers([])
    setShowResult(false)
    setScore(0)
    setAlreadyAnswered(Array(quizItems.length).fill(false))
    setHasVoted(false)
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }
  
  return (
    <motion.div
      ref={ref}
      className="content-container"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-12 font-display"
        variants={itemVariants}
      >
        <span className="heading-gradient">Test Your</span> AI Detection Skills (Pseudo Turing)
      </motion.h2>
       */}

<h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-display">
        <span className="heading-gradient">Test Your</span> AI Detection Skills
      </h2>
      <motion.div 
        className="max-w-3xl mx-auto bg-primary rounded-xl p-8 shadow-2xl"
        variants={itemVariants}
      >
        {!showResult ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span>Question {currentItem + 1} of {quizItems.length}</span>
                <span>Score: {score}</span>
              </div>
              <div className="w-full bg-primary-light rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-accent to-teal-light h-2 rounded-full"
                  style={{ width: `${((currentItem + 1) / quizItems.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={currentItem}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-6">
                <span className="text-sm text-accent uppercase tracking-wider">
                  {quizItems[currentItem].type}
                </span>
              </div>
              
              <div className="bg-primary-light p-6 rounded-lg mb-8 text-lg">
                <p>{`"`}{quizItems[currentItem].content}{`"`}</p>
              </div>
              
              <p className="text-center mb-8 text-xl">Was this created by AI or a human?</p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <motion.button
                  onClick={() => handleAnswer(true)}
                  className={`px-6 py-3 rounded-lg font-medium interactive 
                    ${alreadyAnswered[currentItem] 
                      ? quizItems[currentItem].isAI 
                        ? 'bg-green-600' 
                        : 'bg-red-600'
                      : 'bg-purple-deep hover:bg-purple-light'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={alreadyAnswered[currentItem]}
                >
                  AI Created
                </motion.button>
                
                <motion.button
                  onClick={() => handleAnswer(false)}
                  className={`px-6 py-3 rounded-lg font-medium interactive 
                    ${alreadyAnswered[currentItem] 
                      ? !quizItems[currentItem].isAI 
                        ? 'bg-green-600' 
                        : 'bg-red-600'
                      : 'bg-teal-deep hover:bg-teal-light'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={alreadyAnswered[currentItem]}
                >
                  Human Created
                </motion.button>
              </div>
              
              {alreadyAnswered[currentItem] && (
                <div className="text-center mb-8">
                  <p className={`text-lg ${userAnswers[currentItem] ? 'text-green-400' : 'text-red-400'}`}>
                    {userAnswers[currentItem] 
                      ? 'Correct! ' 
                      : 'Incorrect. '}
                    This was created by {quizItems[currentItem].isAI ? 'AI' : 'a human'}.
                  </p>
                </div>
              )}
              
              {alreadyAnswered[currentItem] && (
                <div className="text-center">
                  <motion.button
                    onClick={nextItem}
                    className="px-6 py-3 bg-accent rounded-lg font-medium interactive"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentItem < quizItems.length - 1 ? 'Next Question' : 'See Results'}
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-6">Quiz Complete!</h3>
            
            <div className="mb-8">
              <div className="relative w-48 h-48 mx-auto">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#1a1a2e" 
                    strokeWidth="10" 
                  />
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="45" 
                    fill="none" 
                    stroke="#00b4d8" 
                    strokeWidth="10" 
                    strokeDasharray={`${2 * Math.PI * 45 * score / quizItems.length} ${2 * Math.PI * 45 * (1 - score / quizItems.length)}`}
                    strokeDashoffset={2 * Math.PI * 45 * 0.25}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold">
                    {Math.round(score / quizItems.length * 100)}%
                  </span>
                </div>
              </div>
              <p className="text-xl mt-4">
                You got {score} out of {quizItems.length} correct!
              </p>
            </div>
            
            <p className="mb-8 text-lg">
              {score === quizItems.length 
                ? 'Perfect score! You have a keen eye for detecting AI content.' 
                : score >= quizItems.length / 2 
                  ? 'Good job! You can spot AI content most of the time.' 
                  : 'AI content can be tricky to spot! With practice, you\'ll get better.'}
            </p>
            
            {!hasVoted && (
              <div className="mb-8">
                <p className="mb-4 text-lg">What do you think?</p>
                <div className="flex justify-center gap-4">
                  <motion.button
                    onClick={() => setHasVoted(true)}
                    className="px-6 py-3 bg-purple-deep rounded-lg font-medium interactive"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    AI will replace humans
                  </motion.button>
                  <motion.button
                    onClick={() => setHasVoted(true)}
                    className="px-6 py-3 bg-teal-deep rounded-lg font-medium interactive"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Humans will still be needed
                  </motion.button>
                </div>
              </div>
            )}
            
            {hasVoted && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 text-lg"
              >
                Thanks for sharing your perspective! The future likely involves a collaborative relationship between humans and AI.
              </motion.p>
            )}
            
            <motion.button
              onClick={resetQuiz}
              className="px-6 py-3 bg-accent rounded-lg font-medium interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}