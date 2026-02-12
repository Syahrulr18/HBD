import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const TextReveal = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.9', 'start 0.3'],
  });

  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  return (
    <div ref={containerRef} className={className}>
      <div className="flex flex-wrap gap-x-[0.35em]" style={{ lineHeight: 1.15, paddingBottom: '0.15em' }}>
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-flex">
            {word.split('').map((char, charIndex) => {
              const totalChars = words.slice(0, wordIndex).reduce((acc, w) => acc + w.length, 0) + charIndex;
              const totalLength = text.replace(/\s/g, '').length;
              const start = totalChars / totalLength;
              const end = Math.min(start + 0.1, 1);

              return (
                <Character
                  key={`${wordIndex}-${charIndex}`}
                  char={char}
                  scrollYProgress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </span>
        ))}
      </div>
    </div>
  );
};

const Character = ({ char, scrollYProgress, start, end }) => {
  const y = useTransform(scrollYProgress, [start, end], ['100%', '0%']);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

  return (
    <span className="inline-block">
      <motion.span
        className="inline-block"
        style={{ y, opacity }}
      >
        {char}
      </motion.span>
    </span>
  );
};

export default TextReveal;
