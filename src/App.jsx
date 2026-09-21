import React, { useState, useEffect } from 'react';
import Cover from './components/Cover';
import MusicPlayer from './components/MusicPlayer';
import HeroHeader from './components/HeroHeader';
import Mempelai from './components/Mempelai';
import AcaraCountdown from './components/AcaraCountdown';
import TurutMengundang from './components/TurutMengundang';
import LoveStoryGallery from './components/LoveStoryGallery';
import RsvpWishes from './components/RsvpWishes';
import Footer from './components/Footer';
import GuestLinkGenerator from './components/GuestLinkGenerator';
import { Users } from 'lucide-react';

export default function App() {
  const [guestName, setGuestName] = useState('');
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isMusicRequested, setIsMusicRequested] = useState(false);

  useEffect(() => {
    // Parse URL parameter ?to=Nama+Tamu
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to');
    if (toParam) {
      setGuestName(toParam);
    }
  }, []);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    setIsMusicRequested(true);
    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] relative text-[#2c2c2c] font-sans selection:bg-[#d4af37] selection:text-white">
      
      {/* Opening Cover Overlay */}
      <Cover
        guestName={guestName}
        isOpen={isInvitationOpen}
        onOpen={handleOpenInvitation}
      />

      {/* Main Invitation Web Page */}
      {isInvitationOpen && (
        <main className="w-full">
          <HeroHeader />
          <Mempelai />
          <AcaraCountdown />
          <TurutMengundang />
          <LoveStoryGallery />
          <RsvpWishes guestName={guestName} />
          <Footer />

          {/* Background Music Control */}
          <MusicPlayer isAutoPlayRequested={isMusicRequested} />

          {/* Guest Link Generator Floating Button */}
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setIsGeneratorOpen(true)}
              className="px-4 py-3 rounded-full bg-gradient-to-r from-[#c59b27] to-[#886214] text-white shadow-xl hover:shadow-2xl flex items-center gap-2 text-xs font-semibold transition-all duration-300 hover:scale-105 border border-white/30 cursor-pointer"
              title="Input Nama Tamu & Buat Link Undangan WhatsApp"
            >
              <Users className="w-4 h-4" />
              <span>Input Tamu / Share WA</span>
            </button>
          </div>

          {/* Guest Link Generator Modal */}
          <GuestLinkGenerator
            isOpen={isGeneratorOpen}
            onClose={() => setIsGeneratorOpen(false)}
          />
        </main>
      )}

    </div>
  );
}
