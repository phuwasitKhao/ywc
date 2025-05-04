'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

interface ContentItem {
  title?: string;
  text?: string;
  imageUrl?: string;
  creator: string;
}

interface ComparisonItem {
  type: string;
  aiContent: ContentItem;
  humanContent: ContentItem;
}

const comparisonData: ComparisonItem[] = [
  {
    type: 'Blog Post',
    aiContent: {
      title: 'The Rise of Remote Work',
      text: 'Remote work has experienced unprecedented growth in recent years. Studies show a 44% increase in remote positions since 2020. Organizations benefit from reduced overhead costs while employees enjoy improved work-life balance. However, challenges remain in team communication and maintaining company culture across distributed workforces. Successful implementation requires thoughtful digital infrastructure and clear policies.',
      creator: 'AI',
    },
    humanContent: {
      title: 'My Journey into Remote Work',
      text: "When my office closed in 2020, I was terrified. How would I stay focused at home with two kids and a barking dog? Three years later, I can't imagine returning to a cubicle. Yes, I've had Zoom calls interrupted by my 4-year-old's dinosaur impressions, and yes, I sometimes miss impromptu coffee chats with colleagues. But the freedom to design my workday around my life—not the other way around—has been transformative.",
      creator: 'Human',
    }
  },
  {
    type: 'Art/Design',
    aiContent: {
      imageUrl: '/images/ai-art.jpg',
      title: 'Futuristic Cityscape',
      creator: 'AI',
    },
    humanContent: {
      imageUrl: '/images/human-art.jpg',
      title: 'Urban Dreams',
      creator: 'Human',
    }
  },
  {
    type: 'Code Snippet',
    aiContent: {
      text: `function optimizeImages(images) {
  return images.map(img => {
    const optimized = applyCompressionAlgorithm(img);
    return {
      src: optimized.src,
      size: optimized.size,
      quality: calculateQualityMetrics(optimized)
    };
  }).sort((a, b) => a.size - b.size);
}`,
      creator: 'AI',
    },
    humanContent: {
      text: `function optimizeImages(images) {
  // This approach prioritizes visually important images
  let optimized = [];
  
  // Handle hero images first with higher quality
  const heroImages = images.filter(img => img.isHero);
  heroImages.forEach(img => {
    // My custom approach for hero images
    optimized.push(processHeroImage(img));
  });
  
  // Then process the rest with standard settings
  const standardImages = images.filter(img => !img.isHero);
  optimized = [...optimized, ...standardImages.map(processStandard)];
  
  return optimized;
}`,
      creator: 'Human',
    }
  },
  {
    type: 'Social Media Post',
    aiContent: {
      text: 'Excited to announce our new sustainable packaging initiative! 🌱 Our products will now ship in 100% recyclable materials, reducing our carbon footprint by 35%. #Sustainability #EcoFriendly',
      creator: 'AI',
    },
    humanContent: {
      text: "Ok I'm freaking out!!! 😱 Just got our first batch of eco-packaging and it's GORGEOUS! 6 months of back-and-forth with suppliers was worth it. My dining room is drowning in biodegradable peanuts but I've never been happier. Who else is stupidly excited about cardboard? 🤣 #SmallBusinessLife",
      creator: 'Human',
    }
  }
]

export default function Comparison() {
  const [activeTab, setActiveTab] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [revealed, setRevealed] = useState(false)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value))
  }
  
  const revealCreator = () => {
    setRevealed(true)
  }
  
  const resetReveal = () => {
    setRevealed(false)
  }
  
  const getSliderBackground = () => {
    return `linear-gradient(to right, rgba(94, 234, 212, 0.3) 0%, rgba(94, 234, 212, 0.3) ${sliderPosition}%, rgba(14, 165, 233, 0.3) ${sliderPosition}%, rgba(14, 165, 233, 0.3) 100%)`
  }

  return (
    <motion.div 
      ref={containerRef}
      className="content-container"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-12 font-display"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 0.2 }}
      >
        <span className="heading-gradient">Interactive</span> Comparison
      </motion.h2>
      
      <div className="bg-primary rounded-xl p-6 shadow-2xl mb-12">
        <div className="flex overflow-x-auto pb-4 mb-6 scrollbar-hide space-x-2">
          {comparisonData.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTab(index)
                resetReveal()
              }}
              className={`px-4 py-2 rounded-full font-medium flex-shrink-0 interactive ${
                activeTab === index
                  ? 'bg-accent text-primary'
                  : 'bg-primary-light hover:bg-secondary-light'
              }`}
            >
              {item.type}
            </button>
          ))}
        </div>
        
        <div className="mb-4 relative">
          <div className="flex flex-col md:flex-row">
            <div 
              className="w-full md:w-1/2 p-4 bg-primary-light rounded-l-lg"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              {comparisonData[activeTab].type === 'Art/Design' ? (
                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                  {comparisonData[activeTab].aiContent.imageUrl && (
                    <Image
                      src={comparisonData[activeTab].aiContent.imageUrl}
                      alt={comparisonData[activeTab].aiContent.title || "AI art"}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-xl font-medium">{comparisonData[activeTab].aiContent.title}</h3>
                  </div>
                </div>
              ) : (
                <div className="h-64 md:h-80 overflow-y-auto p-4 bg-primary rounded-lg">
                  {comparisonData[activeTab].type === 'Code Snippet' ? (
                    <pre className="text-sm text-teal-light font-mono overflow-x-auto">
                      {comparisonData[activeTab].aiContent.text}
                    </pre>
                  ) : (
                    <>
                      {comparisonData[activeTab].aiContent.title && (
                        <h3 className="text-xl font-medium mb-3 text-accent">{comparisonData[activeTab].aiContent.title}</h3>
                      )}
                      <p>{comparisonData[activeTab].aiContent.text}</p>
                    </>
                  )}
                </div>
              )}
              {revealed && (
                <div className="mt-2 inline-block px-3 py-1 bg-purple-deep rounded-full text-sm">
                  Created by: {comparisonData[activeTab].aiContent.creator}
                </div>
              )}
            </div>
            
            <div 
              className="w-full md:w-1/2 p-4 bg-secondary-light rounded-r-lg"
              style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
            >
              {comparisonData[activeTab].type === 'Art/Design' ? (
                <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
                  {comparisonData[activeTab].humanContent.imageUrl && (
                    <Image
                      src={comparisonData[activeTab].humanContent.imageUrl}
                      alt={comparisonData[activeTab].humanContent.title || "Human art"}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-xl font-medium">{comparisonData[activeTab].humanContent.title}</h3>
                  </div>
                </div>
              ) : (
                <div className="h-64 md:h-80 overflow-y-auto p-4 bg-secondary rounded-lg">
                  {comparisonData[activeTab].type === 'Code Snippet' ? (
                    <pre className="text-sm text-accent-hover font-mono overflow-x-auto">
                      {comparisonData[activeTab].humanContent.text}
                    </pre>
                  ) : (
                    <>
                      {comparisonData[activeTab].humanContent.title && (
                        <h3 className="text-xl font-medium mb-3 text-teal-light">{comparisonData[activeTab].humanContent.title}</h3>
                      )}
                      <p>{comparisonData[activeTab].humanContent.text}</p>
                    </>
                  )}
                </div>
              )}
              {revealed && (
                <div className="mt-2 inline-block px-3 py-1 bg-teal-deep rounded-full text-sm">
                  Created by: {comparisonData[activeTab].humanContent.creator}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="relative mt-8 mb-4 px-4">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={handleSliderChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer interactive"
            style={{
              background: getSliderBackground(),
            }}
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>AI Content</span>
            <span>Human Content</span>
          </div>
        </div>
        
        {!revealed && (
          <div className="text-center mt-8">
            <motion.button
              onClick={revealCreator}
              className="px-6 py-3 bg-highlight rounded-lg font-medium interactive"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reveal Creators
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  )
}