import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Disc, Volume2 } from 'lucide-react';
import { PLAYLIST } from '../constants';
import { Track } from '../types';

const CassettePlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Autoplay blocked", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress || 0);
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-md bg-gray-900 border-4 border-gray-700 rounded-xl p-4 shadow-[0_0_20px_rgba(0,243,255,0.3)] relative overflow-hidden group">
      {/* Decorative tape reels */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex justify-between px-12 items-center">
         <div className={`w-24 h-24 rounded-full border-4 border-gray-500 border-dashed ${isPlaying ? 'animate-spin' : ''}`} style={{animationDuration: '3s'}}></div>
         <div className={`w-24 h-24 rounded-full border-4 border-gray-500 border-dashed ${isPlaying ? 'animate-spin' : ''}`} style={{animationDuration: '3s'}}></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 z-10 relative">
        <h2 className="text-pink-500 text-xl font-bold flex items-center gap-2 uppercase tracking-widest glow-text">
          <Disc className={`${isPlaying ? 'animate-spin' : ''}`} />
          Stereo-FM
        </h2>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-red-500 font-mono">LIVE</span>
        </div>
      </div>

      {/* Track Info (Cassette Label) */}
      <div className={`bg-gradient-to-br ${currentTrack.coverColor} p-4 rounded-lg mb-6 border-2 border-white/20 transform transition-transform duration-500 ${isPlaying ? 'scale-[1.02]' : 'scale-100'}`}>
        <div className="bg-black/30 backdrop-blur-sm p-3 rounded text-center border border-white/10">
          <h3 className="text-white font-bold text-2xl truncate font-mono">{currentTrack.title}</h3>
          <p className="text-gray-200 text-sm uppercase tracking-widest">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Visualizer Bar (Fake) */}
      <div className="flex items-end justify-center gap-1 h-8 mb-4">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className={`w-1 bg-cyan-400 transition-all duration-75 ease-in-out rounded-t-sm ${isPlaying ? 'animate-pulse' : 'opacity-20'}`}
            style={{ 
              height: isPlaying ? `${Math.random() * 100}%` : '20%',
              animationDelay: `${i * 0.05}s`
            }}
          />
        ))}
      </div>

      {/* Controls */}
      <div className="relative z-10 bg-gray-800 p-3 rounded-lg border-t-2 border-gray-600">
        
        {/* Progress */}
        <div className="w-full bg-gray-700 h-2 rounded-full mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-pink-500 to-cyan-500 h-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between px-4">
          <button onClick={prevTrack} className="text-gray-400 hover:text-cyan-400 transition-colors transform active:scale-95">
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-12 h-12 bg-gradient-to-br from-pink-600 to-purple-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-pink-500/50 transition-all transform active:scale-90"
          >
            {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} fill="white" className="ml-1" />}
          </button>

          <button onClick={nextTrack} className="text-gray-400 hover:text-cyan-400 transition-colors transform active:scale-95">
            <SkipForward size={24} />
          </button>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
    </div>
  );
};

export default CassettePlayer;