import React, { useState, useEffect, useRef } from 'react';
import { Music, Disc } from 'lucide-react';

export default function MusicPlayer({ isAutoPlayRequested }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const iframeRef = useRef(null);
  const audioRef = useRef(null);
  const widgetRef = useRef(null);

  // SoundCloud search/track URL for Andmesh - Anugerah Terindah
  const soundcloudTarget = encodeURIComponent('https://soundcloud.com/search?q=Andmesh%20Anugerah%20Terindah');
  const soundcloudEmbedUrl = `https://w.soundcloud.com/player/?url=${soundcloudTarget}&color=%23c59b27&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`;

  useEffect(() => {
    // Initialize SoundCloud Widget API when iframe is available
    if (iframeRef.current && window.SC && window.SC.Widget) {
      try {
        const widget = window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;
        
        widget.bind(window.SC.Widget.Events.READY, () => {
          if (isAutoPlayRequested) {
            widget.play();
            setIsPlaying(true);
          }
        });
      } catch (e) {
        console.warn('SC Widget init error:', e);
      }
    }
  }, [iframeRef.current]);

  useEffect(() => {
    if (isAutoPlayRequested) {
      setIsPlaying(true);
      
      // 1. Play SoundCloud Widget
      if (widgetRef.current) {
        try {
          widgetRef.current.play();
        } catch (e) {
          console.log('Widget play error:', e);
        }
      }

      // 2. Play Native HTML5 audio for mobile Safari & Android Chrome
      if (audioRef.current) {
        audioRef.current.volume = 0.6;
        audioRef.current.play().catch(err => {
          console.log('Mobile audio play info:', err);
        });
      }
    }
  }, [isAutoPlayRequested]);

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    // Toggle SoundCloud widget
    if (widgetRef.current) {
      try {
        if (nextState) {
          widgetRef.current.play();
        } else {
          widgetRef.current.pause();
        }
      } catch (e) {
        console.warn('Widget toggle error:', e);
      }
    }

    // Toggle HTML5 Audio element
    if (audioRef.current) {
      if (nextState) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  };

  return (
    <>
      {/* Native Audio for Mobile Browsers */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/bg-music.mp3" type="audio/mp3" />
        <source src="/audio/bg-music.wav" type="audio/wav" />
      </audio>

      {/* SoundCloud Iframe Widget */}
      <iframe
        ref={iframeRef}
        id="sc-player"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={soundcloudEmbedUrl}
        className="fixed -bottom-96 -left-96 opacity-0 pointer-events-none z-0"
        title="Andmesh - Anugerah Terindah"
      />

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
