import React, { useState, useEffect, useRef } from 'react';
import { Music, Disc } from 'lucide-react';

export default function MusicPlayer({ isAutoPlayRequested }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isAutoPlayRequested && audioRef.current) {
      audioRef.current.volume = 0.7;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => {
            console.log('Autoplay playback info:', err);
          });
      }
    }
  }, [isAutoPlayRequested]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.7;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log('Play error:', err);
      });
    }
  };

  return (
    <>
      {/* HTML5 Native Audio using local user uploaded anmesh.mp3 */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/anmesh.mp3" type="audio/mp3" />
        <source src="/audio/bg-music.mp3" type="audio/mp3" />
      </audio>

      {/* Floating Music Toggle Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border border-[#c59b27]/40 transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-r from-[#c59b27] to-[#a87e1a] text-white animate-spin-slow ring-4 ring-[#c59b27]/20'
              : 'bg-white/90 text-[#886214] hover:bg-white'
          }`}
          title={isPlaying ? 'Matikan Musik' : 'Putar Musik (Andmesh - Anugerah Terindah)'}
        >
          {isPlaying ? (
            <Disc className="w-6 h-6 animate-spin" />
          ) : (
            <Music className="w-5 h-5" />
          )}
        </button>

        {/* Track Info Banner */}
        <div className="hidden sm:flex flex-col px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#e2c77d]/40 shadow-md text-left">
          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
            Background Music
          </span>
          <span className="text-xs font-bold text-[#886214] truncate max-w-[190px]">
            Andmesh - Anugerah Terindah
          </span>
        </div>
      </div>
    </>
  );
}
