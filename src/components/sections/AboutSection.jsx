import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Star } from 'lucide-react';
import TextReveal from '../TextReveal';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1614]" />
      
      {/* Decorative Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 md:right-20"
      >
        <Star className="w-8 h-8 text-[#d4a574]/20" strokeWidth={1} />
      </motion.div>
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -150]) }}
        className="absolute bottom-40 left-10 md:left-20"
      >
        <Star className="w-12 h-12 text-[#e8b4b8]/20" strokeWidth={1} />
      </motion.div>

      {/* Gradient Orb */}
      <motion.div
        style={{ opacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#d4a574]/10 to-[#e8b4b8]/10 blur-3xl"
      />

      <div className="relative z-10 w-full container-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Left: Main heading */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-block text-[#d4a574] text-sm tracking-[0.3em] uppercase mb-6"
            >
              Tentang Hari Ini
            </motion.span>

            <TextReveal className="heading-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Hari spesial untuk orang yang paling spesial, cocokmi?
            </TextReveal>

            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-24 h-[2px] bg-gradient-to-r from-[#d4a574] to-[#e8b4b8] mt-8 origin-left"
            />
          </div>

          {/* Right: Description */}
          <div className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 leading-relaxed"
            >
              Setiap tahun yang berlalu membawa kenanangan baru, tawa baru, 
              dan cinta yang semakin dalam. Hari ini, kita merayakan kamu — 
              segala yang kamu perjuangkan dan semua kebahagiaan yang kamu bawa.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-white/70 leading-relaxed"
            >
              Semoga tahun baru kehidupanmu dipenuhi dengan sukacita, 
              kesehatan, dan mimpi-mimpi yang menjadi kenyataan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="pt-4"
            >
              <span className="text-[#d4a574] font-medium">
                — Dengan Chat-GPT(Nda tauka buat kata kata)
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
