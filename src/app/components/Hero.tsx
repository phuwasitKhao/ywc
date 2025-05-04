"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Content types for typewriter effect
const contentTypes: string[] = [
  "Articles",
  "Images",
  "Videos",
  "Code",
  "Music",
  "Designs",
];

export default function Hero() {
  const [currentType, setCurrentType] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(200);

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, delta, currentType, isDeleting]);

  const tick = () => {
    const i = currentType % contentTypes.length;
    const fullText = contentTypes[i];

    if (isDeleting) {
      setText(fullText.substring(0, text.length - 1));
      setDelta(100);
    } else {
      setText(fullText.substring(0, text.length + 1));
      setDelta(200);
    }

    if (!isDeleting && text === fullText) {
      setDelta(2000);
      setIsDeleting(true);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setCurrentType(currentType + 1);
      setDelta(500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    // <div className="component-section">
      <div className="content-container min-h-screen flex flex-col justify-center">
        <motion.div
          ref={ref}
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-display mb-6"
            variants={childVariants}
          >
            <span className="heading-gradient">AI vs Human:</span>
            <br />
            The Future of Content Creation
          </motion.h1>

          <motion.div
            className="h-20 flex items-center justify-center text-2xl md:text-3xl font-light mb-8"
            variants={childVariants}
          >
            <span className="mr-2">Creating </span>
            <span className="text-accent font-medium relative">
              {text}
              <span className="absolute right-[-4px] top-0 border-r-2 border-accent h-full"></span>
            </span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-300 mb-10"
            variants={childVariants}
          >
            Will AI replace human content creators, or will we find a new
            symbiotic relationship? Explore the evolving landscape of creativity
            in the age of artificial intelligence.
          </motion.p>

          <motion.div variants={childVariants}>
            <motion.a
              href="#comparison"
              className="interactive bg-gradient-to-r from-purple-deep to-accent px-8 py-4 rounded-full font-medium text-white shadow-lg hover:shadow-xl hover:from-purple-light hover:to-accent-hover"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore the Comparison
            </motion.a>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            variants={childVariants}
          >
            <p className="mb-2 text-sm">Scroll to explore</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 5V19M12 19L5 12M12 19L19 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    // </div>
  );
}
