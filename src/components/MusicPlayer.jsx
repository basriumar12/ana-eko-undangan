import React, { useState, useEffect, useRef } from 'react';
import { Music, Pause, Disc } from 'lucide-react';

export default function MusicPlayer({ isAutoPlayRequested }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);
  const audioRef = useRef(null);

  // SoundCloud embed track ID for Batas Senja - Nanti Kita Seperti Ini
  const soundcloudTrackId = '1913087072';
  const soundcloudEmbedUrl = `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${soundcloudTrackId}&color=%23c59b27&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`;

  useEffect(() => {
    if (isAutoPlayRequested) {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // SoundCloud iframe handles playback
        });
      }
    }
  }, [isAutoPlayRequested]);

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (audioRef.current) {
      if (nextState) {
        audioRef.current.play().catch(e => console.log('Audio play error:', e));
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <>
      {/* HTML5 Audio with fallback audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/bg-music.wav" type="audio/wav" />
      </audio>

      {/* SoundCloud Widget Embed Frame (Hidden / Auto-playing when unlocked) */}
      {isAutoPlayRequested && isPlaying && (
        <iframe
          ref={iframeRef}
          width="0"
          height="0"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src={soundcloudEmbedUrl}
          className="hidden"
          title="Batas Senja - Nanti Kita Seperti Ini"
        />
      )}

      {/* Floating Music Toggle Button */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        <button
          onClick={togglePlay}
          className={`w-12 h-12 rounded-full flex items-center justify-center shadow-xl border border-[#c59b27]/40 transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-r from-[#c59b27] to-[#a87e1a] text-white animate-spin-slow ring-4 ring-[#c59b27]/20'
              : 'bg-white/90 text-[#886214] hover:bg-white'
          }`}
          title={isPlaying ? 'Matikan Musik' : 'Putar Musik (Batas Senja - Nanti Kita Seperti Ini)'}
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
          <span className="text-xs font-bold text-[#886214] truncate max-w-[170px]">
            Batas Senja - Nanti Kita Seperti Ini
          </span>
        </div>
      </div>
    </>
  );
}
