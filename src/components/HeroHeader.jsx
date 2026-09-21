import React from 'react';
import { motion } from 'framer-motion';

export default function HeroHeader() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 bg-[#faf7f2] overflow-hidden">
      
      {/* Decorative Golden Ornaments */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#c59b27] to-transparent opacity-40" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <p className="font-serif italic text-[#a87e1a] text-lg md:text-xl mb-4">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-6 font-medium">
          The Wedding of
        </p>

        {/* Hero Photo - Full Uncropped Card */}
        <div className="relative w-full max-w-sm rounded-3xl p-2 bg-white border border-[#e2c77d]/60 shadow-xl mb-8">
          <div className="w-full rounded-2xl overflow-hidden bg-[#fdfbf7] flex items-center justify-center p-1 border border-[#c59b27]/20">
            <img 
              src="/assets/couple.jpg" 
              alt="Ana & Eko" 
              className="w-full h-auto max-h-[380px] object-contain rounded-xl shadow-sm"
            />
          </div>
        </div>

        <h1 className="font-script text-6xl md:text-8xl text-[#2c2c2c] my-4 leading-none">
          Ana & Eko
        </h1>

        <p className="font-serif text-lg md:text-xl text-[#886214] font-medium tracking-wide">
          Minggu, 27 September 2026
        </p>

        <div className="my-8 max-w-lg mx-auto p-6 rounded-2xl bg-white/70 border border-[#e2c77d]/30 shadow-sm">
          <p className="font-serif italic text-sm md:text-base text-gray-700 leading-relaxed">
            "Dan di antara tanda-tanda (kebesaran-Nya) ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
          </p>
          <span className="block mt-3 text-xs uppercase tracking-wider text-[#a87e1a] font-semibold">
            — Q.S. Ar-Rum: 21 —
          </span>
        </div>

      </motion.div>
    </section>
  );
}
