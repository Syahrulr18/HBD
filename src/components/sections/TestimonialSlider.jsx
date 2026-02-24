import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const memories = [
  {
    id: 1,
    quote: "ke Perpus 21 April 2025",
    author: "Memory #1",
  },
  {
    id: 2,
    quote: "Nonton Chainsaw Man 05 Oktober 2025",
    author: "Memory #2",
  },
  {
    id: 3,
    quote: "Nonton JJK 09 Desember 2025",
    author: "Memory #3",
  },
  {
    id: 4,
    quote: "JJ IPK bahlil, full A di 20 Desember 2025",
    author: "Memory #4",
  },
  {
    id: 5,
    quote: "Pakai Gmeet nda tau kapan pertama ku lupami",
    author: "Memory #5",
  },
  {
    id: 6,
    quote: "Kasih kado TGL 23 Februari 2026",
    author: "Memory #6",
  },
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % memories.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + memories.length) % memories.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section id="memories" className="relative min-h-screen flex items-center py-24 md:py-30 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1614]" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#d4a574]/20 blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-[#e8b4b8]/20 blur-3xl"
      />

      <div className="relative z-10 w-full container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[#d4a574] text-sm tracking-[0.3em] uppercase mb-4"
          >
            Kenangan
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-display heading-lg gradient-text pb-2"
          >
           Dikitji Kapan
          </motion.h2>
        </div>

        {/* Spacer */}
        <div className="h-20 md:h-28 w-full" />

        {/* Slider */}
        <div className="relative ">
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-20"
          >
            <Quote className="w-12 h-12 text-[#d4a574]" strokeWidth={1} />
          </motion.div>

          {/* Slides Container */}
          <div className="relative min-h-[300px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-center px-4 md:px-12">
                  <p className="text-2xl md:text-4xl lg:text-5xl text-white font-light leading-relaxed mb-8">
                    "{memories[current].quote}"
                  </p>
                  <span className="text-[#d4a574] text-lg font-medium">
                    {memories[current].author}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="Previous memory"
            >
              <ChevronLeft className="w-6 h-6 text-white" strokeWidth={1.5} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {memories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > current ? 1 : -1);
                    setCurrent(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? 'bg-[#d4a574] w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to memory ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
              aria-label="Next memory"
            >
              <ChevronRight className="w-6 h-6 text-white" strokeWidth={1.5} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
