import { motion, useTransform } from 'motion/react';
import { Gift, Sparkles, Heart, ArrowRight, ArrowUpRight } from 'lucide-react';

const TextOverlay = ({ scrollProgress }) => {
  // Text block visibility transforms
  const opacity1 = useTransform(scrollProgress, [0, 0.08, 0.18, 0.25], [1, 1, 0, 0]);
  const y1 = useTransform(scrollProgress, [0, 0.08, 0.18, 0.25], [0, 0, -50, -50]);

  const opacity2 = useTransform(scrollProgress, [0.25, 0.32, 0.42, 0.50], [0, 1, 1, 0]);
  const y2 = useTransform(scrollProgress, [0.25, 0.32, 0.42, 0.50], [50, 0, 0, -50]);

  const opacity3 = useTransform(scrollProgress, [0.50, 0.58, 0.68, 0.75], [0, 1, 1, 0]);
  const y3 = useTransform(scrollProgress, [0.50, 0.58, 0.68, 0.75], [50, 0, 0, -50]);

  const opacity4 = useTransform(scrollProgress, [0.75, 0.85, 1], [0, 1, 1]);
  const y4 = useTransform(scrollProgress, [0.75, 0.85, 1], [50, 0, 0]);
  const scale4 = useTransform(scrollProgress, [0.75, 0.85, 1], [0.9, 1, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Block 1: 0% - Opening */}
      <motion.div
        style={{ opacity: opacity1, y: y1 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <h1 className="heading-display heading-xl text-[#1a1614] mb-4">
          HBD
          <br />
          PUTRI
        </h1>
        
        <p className="text-lg md:text-xl text-[#2d2623] font-light tracking-wide">
          Kasi nyalako musik dulu kapan di menu navbar
        </p>

        <span className='text-[#2d2623]'><ArrowUpRight className="w-10 h-10" /></span>
        
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 flex items-center gap-2 text-[#2d2623]/60"
        >
          <span className="text-sm tracking-widest uppercase">Kalau udah scrollmi</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-4 h-4 rotate-90" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Block 2: 30% - Left aligned */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex items-center px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-xl">
          
          <h2 className="heading-display heading-md text-[#1a1614] leading-tight">
            Semoga Tahun ini,
            <br />
            <span className="gradient-text" style={{ WebkitTextFillColor: '#2d2623' }}>
              bisa JJ IPK lagi
            </span>
          </h2>
          
          <div className="mt-6 w-24 h-[2px] bg-[#1a1614]/30" />
        </div>
      </motion.div>

      {/* Block 3: 60% - Right aligned */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex items-center justify-end px-6 md:px-16 lg:px-24"
      >
        <div className="max-w-xl text-right">
          
          <h2 className="heading-display heading-md text-[#1a1614] leading-tight">
            Dan sehat selalu
            <br />
            <span className="text-[#1a1614]">Ituji Kapan</span>
          </h2>
          
          <div className="mt-6 w-24 h-[2px] bg-[#1a1614]/30 ml-auto" />
        </div>
      </motion.div>

      {/* Block 4: 90% - CTA */}
      <motion.div
        style={{ opacity: opacity4, y: y4, scale: scale4 }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 pointer-events-auto"
      >
        
        <h2 className="heading-display heading-lg text-[#1a1614] text-center mb-8">
          HBD
          <br />
          <span className="text-[#f8f8f8]">keep scrolling</span>
        </h2>
      
      </motion.div>
    </div>
  );
};

export default TextOverlay;
