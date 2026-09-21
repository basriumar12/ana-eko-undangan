import React from 'react';
import { Heart, Code2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-16 px-4 bg-[#2c2c2c] text-white text-center relative overflow-hidden">
      <div className="max-w-2xl mx-auto space-y-6">
        
        <h2 className="font-script text-5xl md:text-6xl text-[#e2c77d]">
          Ana & Eko
        </h2>

        <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
        </p>

        <div className="w-16 h-0.5 bg-[#c59b27] mx-auto opacity-50" />

        <div className="space-y-2">
          <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <span>Dibuat dengan</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>untuk Pernikahan Ana Nur Wijayanti & Eko Rubiyanto</span>
          </p>

          <p className="text-xs font-semibold text-[#e2c77d] flex items-center justify-center gap-1">
            <Code2 className="w-4 h-4 text-[#c59b27]" />
            Dibuat oleh <span className="underline decoration-[#c59b27] underline-offset-4 font-bold text-white">Carcoon Dev</span>
          </p>
        </div>

        <p className="text-[11px] text-gray-500">
          © 2026 Undangan Digital • Powered by Carcoon Dev
        </p>

      </div>
    </footer>
  );
}
