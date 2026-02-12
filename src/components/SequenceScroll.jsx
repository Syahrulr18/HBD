import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import TextOverlay from './TextOverlay';

const TOTAL_FRAMES = 240;
const FRAME_PATH = '/sequence/ezgif-frame-';

// Generate frame URLs
const getFrameUrl = (index) => {
  const frameNumber = String(index + 1).padStart(3, '0');
  return `${FRAME_PATH}${frameNumber}.jpg`;
};

const SequenceScroll = ({ onLoadProgress, onLoadComplete }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = [];
      const loadedImages = [];

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const promise = new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            loadedImages[i] = img;
            const progress = ((i + 1) / TOTAL_FRAMES) * 100;
            onLoadProgress?.(progress);
            resolve(img);
          };
          img.onerror = reject;
          img.src = getFrameUrl(i);
        });
        imagePromises.push(promise);
      }

      try {
        await Promise.all(imagePromises);
        setImages(loadedImages);
        setIsLoaded(true);
        onLoadComplete?.();
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, [onLoadProgress, onLoadComplete]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Draw current frame to canvas
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = images[index];

    if (!canvas || !ctx || !img) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Calculate cover fit
    const imgRatio = img.width / img.height;
    const canvasRatio = dimensions.width / dimensions.height;

    let drawWidth, drawHeight, drawX, drawY;

    if (canvasRatio > imgRatio) {
      // Canvas is wider
      drawWidth = dimensions.width;
      drawHeight = dimensions.width / imgRatio;
      drawX = 0;
      drawY = (dimensions.height - drawHeight) / 2;
    } else {
      // Canvas is taller
      drawHeight = dimensions.height;
      drawWidth = dimensions.height * imgRatio;
      drawX = (dimensions.width - drawWidth) / 2;
      drawY = 0;
    }

    // Clear and draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, [images, dimensions]);

  // Update frame on scroll
  useMotionValueEvent(frameIndex, 'change', (latest) => {
    const index = Math.min(Math.max(Math.round(latest), 0), TOTAL_FRAMES - 1);
    if (index !== currentFrame) {
      setCurrentFrame(index);
      requestAnimationFrame(() => drawFrame(index));
    }
  });

  // Draw initial frame when loaded
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      drawFrame(0);
    }
  }, [isLoaded, images, drawFrame]);

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh]"
    >
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden canvas-bg">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Text Overlays */}
        <TextOverlay scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
};

export default SequenceScroll;
