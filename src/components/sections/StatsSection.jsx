import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Calendar, Heart, Star, Gift } from 'lucide-react';

const stats = [
  { 
    icon: Calendar, 
    value: 365, 
    suffix: '', 
    label: 'Hari',
    color: '#d4a574',
  },
  { 
    icon: Heart, 
    value: 3, 
    suffix: '', 
    label: '3 kali jaki ketemu kapan',
    color: '#e8b4b8',
  },
  { 
    icon: Star, 
    value: 52, 
    suffix: '', 
    label: 'Minggu',
    color: '#f5e6d3',
  },
  { 
    icon: Gift, 
    value: 1, 
    suffix: '', 
    label: 'Special Day',
    color: '#d4a574',
  },
];

const CountUp = ({ target, suffix, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target, isInView]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

const StatCard = ({ stat, index }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group h-full"
    >
      <div className="relative h-full min-h-[300px] p-8 md:p-10 rounded-3xl glass-dark text-center overflow-hidden flex flex-col items-center justify-center">
        {/* Background Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${stat.color}15 0%, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 10 }}
          className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6"
          style={{ backgroundColor: `${stat.color}20` }}
        >
          <stat.icon
            className="w-8 h-8"
            style={{ color: stat.color }}
            strokeWidth={1.5}
          />
        </motion.div>

        {/* Number */}
        <div className="relative z-10">
          <span 
            className="heading-display text-4xl md:text-5xl lg:text-6xl font-bold"
            style={{ color: stat.color }}
          >
            <CountUp target={stat.value} suffix={stat.suffix} isInView={isInView} />
          </span>
        </div>

        {/* Label */}
        <p className="relative z-10 mt-4 text-lg text-white/60 font-medium">
          {stat.label}
        </p>

        {/* Bottom Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full origin-center"
          style={{ backgroundColor: stat.color }}
        />
      </div>
    </motion.div>
  );
};

const StatsSection = () => {
  return (
    <section className="relative py-32 md:py-48 min-h-[60vh] flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1614]" />



      <div className="relative z-10 w-full container-padding">
        {/* Header */}
        <div className="text-center mb-12 px-4">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[#d4a574] text-sm tracking-[0.3em] uppercase mb-4"
          >
            Dalam Angka
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-display heading-md text-white "
          >
            Celebrating Every Moment
          </motion.h2>
        </div>

        {/* Spacer to guarantee distance */}
        <div className="h-24 md:h-32 w-full" />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
