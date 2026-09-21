import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailOpen, Heart, Calendar } from 'lucide-react';

export default function Cover({ guestName, isOpen, onOpen }) {
  if (isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -100, transition: { duration: 0.8, ease: 'easeInOut' } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#faf7f2] px-4 overflow-y-auto py-8"
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c59b27_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Corner Ornaments */}
        <div className="absolute top-6 left-6 w-20 h-20 border-t-2 border-l-2 border-[#c59b27] pointer-events-none hidden sm:block" />
        <div className="absolute top-6 right-6 w-20 h-20 border-t-2 border-r-2 border-[#c59b27] pointer-events-none hidden sm:block" />
        <div className="absolute bottom-6 left-6 w-20 h-20 border-b-2 border-l-2 border-[#c59b27] pointer-events-none hidden sm:block" />
        <div className="absolute bottom-6 right-6 w-20 h-20 border-b-2 border-r-2 border-[#c59b27] pointer-events-none hidden sm:block" />

        <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#e2c77d]/40 shadow-2xl text-center flex flex-col items-center">
          
          {/* Framed Photo - Not Cropped */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-[260px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#c59b27]/40 shadow-md mb-6 p-1.5 bg-[#fdfbf7] flex items-center justify-center"
          >
            <img 
              src="/assets/couple.jpg" 
              alt="Ana & Eko" 
              className="w-full h-full object-contain rounded-xl"
            />
          </motion.div>

          <p className="text-xs uppercase tracking-[0.3em] text-[#a87e1a] font-semibold mb-2">
            Undangan Pernikahan
          </p>

          <h1 className="font-script text-5xl md:text-6xl text-[#2c2c2c] my-2 font-normal leading-tight">
            Ana & Eko
          </h1>

          <p className="font-serif text-sm md:text-base text-gray-600 flex items-center justify-center gap-2 mb-4">
            <Calendar className="w-4 h-4 text-[#c59b27]" />
            Minggu, 27 September 2026
          </p>

          {/* Guest Name Section */}
          <div className="w-full py-4 px-6 rounded-2xl bg-[#fdfbf7] border border-[#e2c77d]/40 my-3 shadow-inner">
            <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2 className="text-xl md:text-2xl font-semibold text-[#886214] capitalize">
              {guestName || 'Tamu Undangan'}
            </h2>
            <p className="text-[11px] text-gray-400 mt-1 italic">
              *Mohon maaf bila ada kesalahan penulisan nama/gelar
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpen}
            className="mt-3 px-8 py-3.5 bg-gradient-to-r from-[#c59b27] to-[#a87e1a] hover:from-[#a87e1a] hover:to-[#886214] text-white rounded-full font-medium shadow-lg hover:shadow-xl flex items-center gap-2.5 transition-all text-sm tracking-wide cursor-pointer"
          >
            <MailOpen className="w-4 h-4 animate-bounce" />
            Buka Undangan
          </motion.button>

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
