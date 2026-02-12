import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, ArrowRight, PartyPopper } from 'lucide-react';

const CTASection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const handleWhatsAppPress = () => {
    window.open("https://wa.me/qr/GVMASZ5M776PM1", "_blank");
  };


  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-animate" />
      
      {/* Noise Overlay */}
      <div className="absolute inset-0 noise-overlay" />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: i % 2 === 0 ? '#d4a574' : '#e8b4b8',
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Gradient Orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#d4a574]/20 blur-[100px]"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#e8b4b8]/20 blur-[100px]"
      />

      <div className="relative z-10 w-full container-padding flex items-center justify-center min-h-[60vh]">
        <motion.div
          style={{ scale, opacity }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="inline-block mb-8"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <PartyPopper className="w-16 h-16 md:w-20 md:h-20 text-[#d4a574]" strokeWidth={1} />
            </motion.div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="heading-display heading-xl gradient-text mb-6"
          >
            Udahmi
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-white/70 font-light mb-12 "
          >
            Ituji Kapan
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="magnetic-btn group text-lg px-10 py-5"
              onClick={handleWhatsAppPress}
            >
              <Sparkles className="w-5 h-5" />
              <span>Kesan Pesan</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Decorative Line */}
          <div className="flex justify-center mt-16">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#d4a574] to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
