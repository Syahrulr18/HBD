import { motion } from 'motion/react';

import momentsImg from '../../assets/moments.png';
import memoriesImg from '../../assets/memories.png';
import dreamsImg from '../../assets/dreams.jpeg';
import joyImg from '../../assets/joy.png';
import loveImg from '../../assets/love.png';

const galleryItems = [
  { id: 1, span: 'col-span-2 row-span-2', image: momentsImg, label: 'Gambar Pertama', color: '#e8b4b8' },
  { id: 2, span: 'col-span-1 row-span-1', image: memoriesImg, label: 'S', color: '#d4a574' },
  { id: 3, span: 'col-span-1 row-span-2', image: dreamsImg, label: 'Ini ji', color: '#f5e6d3' },
  { id: 4, span: 'col-span-1 row-span-1', image: joyImg, label: 'P', color: '#d4a574' },
  { id: 5, span: 'col-span-2 md:col-span-4 row-span-1', image: loveImg, label: 'Gambar Kedua', color: '#e8b4b8' },
];

const BentoCard = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`${item.span} relative group cursor-pointer`}
      whileHover={{ y: -5 }}
    >
      <motion.div
        whileHover={{ 
          scale: 0.98,
        }}
        transition={{ duration: 0.3 }}
        className="relative h-full min-h-[200px] md:min-h-[250px] rounded-3xl overflow-hidden glass-dark border border-white/5 hover:border-white/20 transition-colors duration-500"
      >
        {/* Image Background */}
        <div className="absolute inset-0 w-full h-full">
            <img 
                src={item.image} 
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" />
            
            {/* Color Overlay on Hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 mix-blend-overlay"
              style={{ backgroundColor: item.color }}
            />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-6">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
          >
              <span className="text-2xl md:text-3xl font-bold tracking-wide text-white drop-shadow-md">
                {item.label}
              </span>
          </motion.div>

          <motion.span
            initial={{ width: 0, opacity: 0 }}
            whileHover={{ width: '4rem', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="h-[3px] mt-2 rounded-full shadow-[0_0_10px_currentColor]"
            style={{ backgroundColor: item.color, color: item.color }}
          />
        </div>

        {/* Border Glow */}
        <div 
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 40px ${item.color}40, 0 0 20px ${item.color}20`,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const BentoGallery = () => {
  return (
    <section id="gallery" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1614]" />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4a574]/5 to-transparent" />

      <div className="relative z-10 w-full container-padding">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-[#d4a574] text-sm tracking-[0.3em] uppercase mb-4"
          >
            Galeri
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-display heading-lg gradient-text leading-tight "
          >
            Tidak ada Foto ta Kocak
          </motion.h2>
        </div>

        {/* Spacer */}
        <div className="h-20 md:h-32 w-full" />

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ">
          {galleryItems.map((item, index) => (
            <BentoCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGallery;
