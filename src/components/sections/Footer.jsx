import { motion } from 'motion/react';
import { Heart, Instagram, Twitter, Mail, Sparkles, Github,} from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/putriiskyn/', label: 'Instagram' },
  { icon: Github, href: 'https://github.com/Syahrulr18', label: 'Github' },
];

const Footer = () => {
  return (
    <footer className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#1a1614]" />
      
      {/* Glowing Divider */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4a574]/50 to-transparent" />
        <motion.div
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4a574] to-transparent blur-sm"
        />
      </div>

      <div className="relative z-10 w-full container-padding">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 mb-8"
          >
            <Sparkles className="w-6 h-6 text-[#d4a574]" strokeWidth={1.5} />
            <span className="text-2xl font-bold text-white">
              HBD<span className="text-[#d4a574]">.</span>
            </span>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-6 mb-10"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full glass hover:bg-white/10 transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-white/70 hover:text-[#d4a574] transition-colors" strokeWidth={1.5} />
              </motion.a>
            ))}
          </motion.div>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-white/50 max-w-md mb-8"
          >
            
          </motion.p>

          {/* Copyright */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-xs text-white/30"
          >
            © {new Date().getFullYear()} Happy Birthday. All moments reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
