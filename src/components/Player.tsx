import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../services/languageContext';

export default function Player() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { t } = useLanguage();

  // 示例音频：使用一个高质感的环境音流或示例音乐
  const SAMPLE_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setCurrentTime(current);
      setProgress((current / total) * 100);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-full p-6 justify-between bg-white/[0.02]">
      <audio 
        ref={audioRef}
        src={SAMPLE_AUDIO_URL}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="flex justify-between items-start">
        <div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-mono mb-1"
          >
            {t.currently_broadcasting}
          </motion.p>
          <h3 className="font-serif text-2xl font-light italic">Ambient Narrative // Echoes</h3>
        </div>
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5">
          <ListMusic size={16} className="text-white/60" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Visualizer */}
        <div className="flex items-end gap-1 h-12">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-white/20 rounded-full"
              animate={{
                height: isPlaying 
                  ? [
                      10 + Math.random() * 30,
                      5 + Math.random() * 48,
                      15 + Math.random() * 25
                    ]
                  : 4,
                opacity: isPlaying ? [0.2, 0.6, 0.2] : 0.1
              }}
              transition={{
                duration: 0.4 + Math.random() * 0.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div 
            className="h-[2px] w-full bg-white/10 relative overflow-hidden rounded-full cursor-pointer group"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const percent = (e.clientX - rect.left) / rect.width;
              if (audioRef.current) {
                audioRef.current.currentTime = percent * duration;
              }
            }}
          >
            <motion.div 
              className="absolute top-0 left-0 h-full bg-white shadow-[0_0_8px_white]"
              style={{ width: `${progress}%` }}
              transition={{ type: 'spring', bounce: 0, duration: 0.1 }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-white/40">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8">
          <button className="text-white/40 hover:text-white transition-colors">
            <SkipBack size={20} />
          </button>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
          >
            {isPlaying ? (
              <Pause size={24} fill="currentColor" />
            ) : (
              <Play size={24} className="ml-1" fill="currentColor" />
            )}
          </button>
          <button className="text-white/40 hover:text-white transition-colors">
            <SkipForward size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
