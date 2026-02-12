import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX,
  Music,
  Disc
} from 'lucide-react';

// Import Assets
import song1 from '../assets/song/ABBA - Happy New Year.mp3';
import song2 from '../assets/song/ABBA - I Have A Dream.mp3';
import song3 from '../assets/song/Abba - Chiquitita.mp3';
import song4 from '../assets/song/Sunset Rollercoaster - My Jinji.mp3';
import song5 from '../assets/song/What More Can I Say_The Nations.mp3';
import song6 from '../assets/song/Honey, Honey_Abba.mp3';
import song7 from '../assets/song/Angeleyes_abba.mp3';
import song8 from '../assets/song/ABBA - Dancing Queen.mp3';

import cover1 from '../assets/album_cover/happy new year.jpg';
import cover2 from '../assets/album_cover/have a dream.jpg';
import cover3 from '../assets/album_cover/chiquitita.jpg';
import cover4 from '../assets/album_cover/my jinji.jpg';
import cover5 from '../assets/album_cover/What More Can I Say.jpg';
import cover6 from '../assets/album_cover/honey honey.jpg';
import cover7 from '../assets/album_cover/Angeleyes.jpg';
import cover8 from '../assets/album_cover/Dancing Queen.jpg';

// Playlist Data
const playlist = [
  {
    id: 1,
    title: "Honey, Honey",
    artist: "ABBA",
    src: song6,
    cover: cover6,
  },
  {
    id: 2,
    title: "Angeleyes",
    artist: "ABBA",
    src: song7,
    cover: cover7,
  },
  {
    id: 3,
    title: "Dancing Queen",
    artist: "ABBA",
    src: song8,
    cover: cover8,
  },
  {
    id: 4,
    title: "What More Can I Say",
    artist: "The Nations",
    src: song5,
    cover: cover5,
  },
  {
    id: 5,
    title: "Chiquitita",
    artist: "ABBA",
    src: song3,
    cover: cover3,
  },
  {
    id: 6,
    title: "I Have A Dream",
    artist: "ABBA",
    src: song2,
    cover: cover2,
  },
  {
    id: 7,
    title: "Happy New Year",
    artist: "ABBA",
    src: song1,
    cover: cover1,
  },
  {
    id: 8,
    title: "My Jinji",
    artist: "Sunset Rollercoaster",
    src: song4,
    cover: cover4,
  },
];

// Animated Equalizer Bars Component
const EqualizerBars = ({ isPlaying }) => {
  return (
    <div className="flex items-end gap-1 h-8">
      {[1, 2, 3, 4, 5].map((bar) => (
        <motion.div
          key={bar}
          className="w-1.5 bg-[#d4a574] rounded-full"
          animate={isPlaying ? {
            height: ['6px', '32px', '16px', '24px', '6px'],
          } : { height: '6px' }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: bar * 0.1,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ progress, duration, onSeek }) => {
  const barRef = useRef(null);

  const handleClick = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    onSeek(Math.max(0, Math.min(1, percent)) * duration);
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full group">
      <div
        ref={barRef}
        onClick={handleClick}
        className="relative h-2 bg-white/10 rounded-full cursor-pointer overflow-hidden"
      >
        {/* Progress fill */}
        <motion.div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#d4a574] to-[#e8b4b8]"
          style={{ width: `${(progress / duration) * 100}%` }}
          layoutId="progress"
        />
        
        {/* Hover Highlight */}
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <div className="flex justify-between mt-2">
        <span className="text-xs tabular-nums text-white/50 font-medium">{formatTime(progress)}</span>
        <span className="text-xs tabular-nums text-white/50 font-medium">{formatTime(duration)}</span>
      </div>
    </div>
  );
};

// Volume Slider Component
const VolumeSlider = ({ volume, onVolumeChange, isMuted, onToggleMute }) => {
  return (
    <div className="flex items-center gap-3 group">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggleMute}
        className="text-white/60 hover:text-white transition-colors"
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5" />
        )}
      </motion.button>
      
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={isMuted ? 0 : volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
        className="w-24 h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white hover:[&::-webkit-slider-thumb]:scale-125 [&::-webkit-slider-thumb]:transition-transform"
        style={{
            backgroundImage: `linear-gradient(to right, white ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%)`
        }}
      />
    </div>
  );
};

// Main NavMusicPlayer Component
const NavMusicPlayer = () => {
  const audioRef = useRef(new Audio(playlist[0].src));
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);

  const currentSong = playlist[currentSongIndex];

  // Initialize Audio
  useEffect(() => {
    const audio = audioRef.current;
    // Enable looping if single track or playlist logic is different, 
    // but here we want continuous play across tracks
    
    // Attempt to set volume immediately
    audio.volume = volume;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      handleNext();
    };

    const handleError = (e) => {
      console.error("Audio Error:", e);
      // Try to recover or just log
    };

    // Events
    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Initial load
    audio.load();

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
    };
  }, []);

  // Handle Song Change
  useEffect(() => {
    const audio = audioRef.current;
    
    // Construct absolute-ish path check or just trust index change
    // We strictly follow currentSongIndex
    if (!audio.src.includes(encodeURI(currentSong.src.split('/').pop()))) {
        const wasPlaying = isPlaying;
        audio.src = currentSong.src;
        audio.load();
        if (wasPlaying) {
            audio.play().catch(e => {
                console.error("Auto-play on change failed:", e);
                setIsPlaying(false); // Revert state if play fails
            });
        }
    }
  }, [currentSongIndex]);

  // Handle Play/Pause
  useEffect(() => {
    const audio = audioRef.current;
    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Handle Volume
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);


  // Controls
  const handlePlayPause = () => setIsPlaying(!isPlaying);
  
  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const handleSeek = (newTime) => {
    if (isFinite(newTime)) {
        audioRef.current.currentTime = newTime;
        setProgress(newTime);
    }
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <motion.div
        layout
        className="w-full max-w-[500px] bg-[#1a1614]/60 backdrop-blur-2xl border border-white/10 rounded-[1rem] overflow-hidden shadow-2xl relative m-[3px]"
      >
        {/* Decorative Background Elements */}
        {isPlaying && (
          <>
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4a574]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#e8b4b8]/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none animate-pulse" />
          </>
        )}

        <div className="p-6 relative z-10 flex flex-col h-full justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2 text-white/50 text-xs font-semibold tracking-widest uppercase">
               <Disc className={`w-4 h-4 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }} />
               <span>{isPlaying ? 'Now Playing' : 'Paused'}</span>
            </div>
            <EqualizerBars isPlaying={isPlaying} />
          </div>

          {/* Album Art & Info */}
          <div className="flex flex-col items-center mb-8 flex-grow justify-center">
            <motion.div
              layout
              className="relative w-64 h-64 rounded-3xl shadow-2xl mb-6 group shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4a574] to-[#e8b4b8] rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              <img 
                src={currentSong.cover} 
                alt="Album Cover" 
                className="relative w-full h-full object-cover rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] z-10"
              />
              
              {/* Vinyl/Spin Effect Overlay */}
              {isPlaying && (
                <div className="absolute inset-0 rounded-3xl z-20 flex items-center justify-center opacity-30 pointer-events-none">
                    <div className="w-3/4 h-3/4 border border-white/20 rounded-full animate-[spin_4s_linear_infinite]" />
                </div>
              )}
            </motion.div>

            <div className="text-center space-y-2">
              <motion.h3 
                key={currentSong.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold text-white tracking-tight px-4"
              >
                {currentSong.title}
              </motion.h3>
              <motion.p 
                key={currentSong.artist}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-white/60 font-medium text-lg"
              >
                {currentSong.artist}
              </motion.p>
            </div>
          </div>

          {/* Progress & Controls */}
          <div className="space-y-6 w-full">
            <ProgressBar 
              progress={progress} 
              duration={duration || currentSong.duration || 180} 
              onSeek={handleSeek} 
            />

            <div className="flex items-center justify-between px-6">
               {/* Previous */}
               <motion.button 
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={handlePrev} 
                 className="p-4 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition-colors"
               >
                  <SkipBack className="w-8 h-8" fill="currentColor" />
               </motion.button>
               
               {/* Play/Pause */}
               <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.5 }}
                  onClick={handlePlayPause}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4a574] to-[#e8b4b8] text-[#1a1614] flex items-center justify-center shadow-[0_8px_30px_rgba(212,165,116,0.4)] hover:shadow-[0_8px_40px_rgba(212,165,116,0.6)] transition-all"
               >
                  {isPlaying ? (
                    <Pause className="w-8 h-8" fill="currentColor" />
                  ) : (
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  )}
               </motion.button>

               {/* Next */}
               <motion.button 
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.9 }}
                 onClick={handleNext} 
                 className="p-4 rounded-full hover:bg-white/5 text-white/70 hover:text-white transition-colors"
               >
                  <SkipForward className="w-8 h-8" fill="currentColor" />
               </motion.button>
            </div>

            {/* Volume Control */}
            <div className="pt-2 flex justify-center">
                <VolumeSlider 
                  volume={volume} 
                  onVolumeChange={handleVolumeChange} 
                  isMuted={isMuted} 
                  onToggleMute={toggleMute} 
                />
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default NavMusicPlayer;
