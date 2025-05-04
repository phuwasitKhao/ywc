"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  isPast: boolean;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2020",
    title: "Early AI Content Tools",
    description:
      "Basic AI writing assistants help with grammar and simple content generation.",
    isPast: true,
  },
  {
    year: "2022",
    title: "Advanced Language Models",
    description:
      "Large language models begin generating more sophisticated content across various formats.",
    isPast: true,
  },
  {
    year: "2024",
    title: "Creative AI Collaboration",
    description:
      "AI tools focus on augmenting human creativity rather than replacing it.",
    isPast: true,
  },
  {
    year: "2026",
    title: "Specialized Content AI",
    description:
      "Industry-specific AI content tools emerge, with deep expertise in specialized domains.",
    isPast: false,
  },
  {
    year: "2028",
    title: "Human-AI Content Teams",
    description:
      "Standard workflow involves humans directing AI collaborators for various content tasks.",
    isPast: false,
  },
  {
    year: "2030",
    title: "New Creative Professions",
    description:
      "New careers emerge focused on AI-human creative direction and oversight.",
    isPast: false,
  },
];

export default function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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
    <div className="component-section">
      <motion.div ref={containerRef} className="content-container relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4 font-display"
            variants={itemVariants}
          >
            <span className="heading-gradient">Evolution</span> Timeline
          </motion.h2>

          <motion.p
            className="text-lg text-center max-w-3xl mx-auto mb-16 text-gray-300"
            variants={itemVariants}
          >
            How AI and human content creation has evolved and where it might be
            heading
          </motion.p>
        </motion.div>

        <div className="relative">
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-deep via-accent to-teal-light h-full"
            style={{
              scaleY: scrollYProgress,
              originY: "0%",
            }}
          ></motion.div>

          <div className="space-y-24">
            {timelineEvents.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <div key={event.year} className="relative">
                  <motion.div
                    className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full  border-4 border-accent flex items-center justify-center z-10"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <span className="text-sm font-bold">{event.year}</span>
                  </motion.div>

                  <motion.div
                    className={`relative ${
                      isEven
                        ? "md:ml-auto md:mr-[calc(50%+2rem)]"
                        : "md:mr-auto md:ml-[calc(50%+2rem)]"
                    } md:w-[calc(50%-2rem)] p-6 rounded-xl shadow-lg ${
                      event.isPast ? "bg-primary-light" : "bg-primary-light"
                    }`}
                    initial={{
                      opacity: 0,
                      x: isEven ? -50 : 50,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                    }}
                  >
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <p className="text-gray-300">{event.description}</p>

                    {/* Connection line to timeline */}
                    <div
                      className={`hidden md:block absolute top-1/2 ${
                        isEven ? "right-[-2rem]" : "left-[-2rem]"
                      } w-8 h-0.5 bg-accent`}
                    ></div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-4">
            The Future is <span className="text-accent">Collaborative</span>
          </h3>
          <p className="max-w-3xl mx-auto text-lg text-gray-300">
            Rather than full replacement, the most likely outcome is a symbiotic
            relationship where AI enhances human creativity and productivity
            while humans provide direction, emotional depth, and ethical
            oversight.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
