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
import { Settings, Heart, Users, ArrowLeft } from 'lucide-react';

export default function App() {
  const [guestName, setGuestName] = useState('');
  const [isInvitationOpen, setIsInvitationOpen] = useState(false);
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [isMusicRequested, setIsMusicRequested] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      
      // Check if URL is for Admin (/admin or ?mode=admin or ?admin=true)
      if (path.endsWith('/admin') || params.get('mode') === 'admin' || params.has('admin')) {
        setIsAdminPage(true);
      } else {
        setIsAdminPage(false);
        const toParam = params.get('to');
        if (toParam) {
          setGuestName(toParam);
        }
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    setIsMusicRequested(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user accesses Admin route (/admin or ?mode=admin)
  if (isAdminPage) {
    return (
      <div className="min-h-screen bg-[#faf7f2] text-[#2c2c2c] p-4 sm:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-3xl border border-[#e2c77d]/40 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fdfbf7] border border-[#c59b27]/40 text-[#c59b27] flex items-center justify-center">
                <Settings className="w-5 h-5 animate-spin-slow" />
              </div>
              <div>
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#886214]">
                  Panel Admin & Generator Link Tamu
                </h1>
                <p className="text-xs text-gray-500">
                  Link Khusus Pengelola • Hasilkan link unik untuk setiap tamu penerima undangan
                </p>
              </div>
            </div>

            <a
              href="/"
              className="px-4 py-2 bg-[#fdfbf7] hover:bg-[#f7f0df] border border-[#c59b27]/30 text-[#886214] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Lihat Tampilan Undangan
            </a>
          </div>

          {/* Embedded Guest Link Generator */}
          <div className="bg-white rounded-3xl border border-[#e2c77d]/40 shadow-md overflow-hidden">
            <GuestLinkGenerator isOpen={true} onClose={null} isStandalonePage={true} />
          </div>
        </div>
      </div>
    );
  }

  // Recipient / Guest View (Clean invitation experience)
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
        </main>
      )}

    </div>
  );
}
