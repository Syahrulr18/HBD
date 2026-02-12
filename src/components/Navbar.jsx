import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram } from 'lucide-react';
import NavMusicPlayer from './NavMusicPlayer';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Memories', href: '#memories' },
  { label: 'Pesan', href: '#cta' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/putriiskyn/', label: 'Instagram' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#1a1614]/95 backdrop-blur-xl shadow-2xl shadow-black/20'
            : 'bg-[#1a1614]/80 backdrop-blur-lg'
        }`}
      >
        {/* Bottom border glow */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4a574]/30 to-transparent" />

        <div className="w-full container-padding">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo Section */}
            <a href="#home" className="relative z-[60] flex items-center gap-3 group">
              {/* Logo Text */}
              <div className="flex flex-col leading-tight">
                <span className="text-lg md:text-xl font-bold tracking-tight">
                  <span className="text-white">Happy</span>
                  <span className="text-[#d4a574]">Birthday</span>
                </span>
              </div>
            </a>

            {/* Right Side - Hamburger Menu Only */}
            <div className="flex items-center">
              {/* Menu Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`relative z-[60] flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-xl transition-all duration-300 ${
                  isOpen
                    ? 'bg-white/10'
                    : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20'
                }`}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={1.5} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={1.5} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[55] bg-[#1a1614] flex flex-col"
          >
            {/* Background Effects - pointer-events-none so they don't block clicks */}
            <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#d4a574]/5 to-transparent pointer-events-none" />

            {/* Close Button Inside Menu */}
            <motion.button
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-10 right-8 md:right-16 z-[70] p-4 rounded-full bg-white/5 hover:bg-white/10 text-white hover:text-[#d4a574] transition-colors cursor-pointer"
            >
              <X className="w-8 h-8" strokeWidth={1.5} />
            </motion.button>

            {/* Menu Content - Split Layout */}
            <div className="relative z-[60] flex-1 flex items-center w-full container-padding pt-24 pb-8 overflow-y-auto min-h-0">
              {/* Left Side - Navigation Menu */}
              <nav className="flex-1 text-center md:text-left">
                <ul className="space-y-4 md:space-y-6">
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="group flex items-center gap-4 cursor-pointer"
                      >
                        <span className="text-xs text-[#d4a574]/50 font-mono group-hover:text-[#d4a574] transition-colors duration-300">0{i + 1}</span>
                        <span className="text-4xl md:text-6xl lg:text-7xl font-bold text-white/80 group-hover:text-[#d4a574] group-hover:translate-x-2 transition-all duration-300">
                          {item.label}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Right Side - Music Player (Now Persistent via overlay below) */}
              <div className="hidden md:flex flex-1 items-center justify-center p-8">
                 {/* Placeholder to keep layout spacing if needed, or just remove */}
              </div>
            </div>

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative z-10 px-8 py-6 border-t border-white/10"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-[#d4a574] transition-all duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
                <p className="flex items-center gap-2 text-xs text-white/40">
                  Untuk Kau
                </p>
              </div>
            </motion.footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Music Player Container */}
      {/* 
         We keep this outside AnimatePresence so it doesn't unmount.
         We position it to match the "Right Side" of the menu.
         We use pointer-events-none when closed so it doesn't block clicks.
      */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.95,
          y: isOpen ? 0 : 20
        }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[60] flex flex-col pointer-events-none"
      >
        <div className="flex-1 flex items-center w-full container-padding pt-24 pb-8 overflow-y-auto min-h-0">
            {/* Spacer for Left Side (Nav) */}
            <div className="hidden md:block flex-1" />

            {/* Right Side - Music Player */}
            <div className="hidden md:flex flex-1 items-center justify-center p-8 pointer-events-none">
              <div className="pointer-events-auto w-full flex justify-center">
                <NavMusicPlayer />
              </div>
            </div>
        </div>
        {/* Spacer for Footer */}
        <div className="h-[88px]" /> 
      </motion.div>
    </>
  );
};

export default Navbar;
