import { useState, useCallback } from 'react';

// Components
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import SequenceScroll from './components/SequenceScroll';

// Sections
import AboutSection from './components/sections/AboutSection';
import BentoGallery from './components/sections/BentoGallery';
import StatsSection from './components/sections/StatsSection';
import TestimonialSlider from './components/sections/TestimonialSlider';
import CTASection from './components/sections/CTASection';
import Footer from './components/sections/Footer';

function App() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadProgress = useCallback((progress) => {
    setLoadProgress(progress);
  }, []);

  const handleLoadComplete = useCallback(() => {
    // Small delay for smooth transition
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <div className="relative">
      {/* Preloader */}
      <Preloader progress={loadProgress} isLoading={isLoading} />

      {/* Navbar - Always visible */}
      <Navbar />

      {/* Hero Section with Scroll Sequence */}
      <section id="home">
        <SequenceScroll
          onLoadProgress={handleLoadProgress}
          onLoadComplete={handleLoadComplete}
        />
      </section>

      {/* Content Sections - Overlapping scroll sequence */}
      <div className="-mt-[100vh] relative z-10">
        {/* About Section */}
        <AboutSection />

        {/* Bento Gallery */}
        <BentoGallery />

        {/* Stats Section */}
        <StatsSection />

        {/* Testimonial Slider */}
        <TestimonialSlider />

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
