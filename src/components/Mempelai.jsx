import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Mempelai() {
  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      
      <div className="max-w-4xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#a87e1a] font-semibold">
            Pasangan Mempelai
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#2c2c2c] mt-2 mb-4 font-semibold">
            Mempelai Wanita & Pria
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-base text-gray-600 mb-14">
            Maha suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah, perkenankanlah kami menyatukan dua hati dalam ikatan pernikahan suci:
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center relative">
          
          {/* Heart separator badge in center for desktop */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-[#e2c77d] shadow-md items-center justify-center text-[#c59b27]">
            <Heart className="w-6 h-6 fill-[#c59b27]" />
          </div>

          {/* Mempelai Wanita */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center bg-[#fdfbf7] p-6 sm:p-8 rounded-3xl border border-[#e2c77d]/40 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Uncropped framed photo */}
            <div className="w-full max-w-[220px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#c59b27]/30 shadow-md mb-6 p-1.5 bg-white flex items-center justify-center">
              <img 
                src="/assets/ana.jpg" 
                alt="Ana Nur Wijayanti" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#2c2c2c] font-semibold mb-2">
              Ana Nur Wijayanti
            </h3>
            <p className="text-xs text-[#a87e1a] uppercase tracking-wider font-semibold mb-3">
              Mempelai Wanita
            </p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Anak Pertama dari <br />
              <strong className="text-gray-800 font-medium">Bapak Paino</strong> & <strong className="text-gray-800 font-medium">Ibu Siyam</strong>
            </p>
          </motion.div>

          {/* Mempelai Laki-laki */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center bg-[#fdfbf7] p-6 sm:p-8 rounded-3xl border border-[#e2c77d]/40 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Uncropped framed photo */}
            <div className="w-full max-w-[220px] aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#c59b27]/30 shadow-md mb-6 p-1.5 bg-white flex items-center justify-center">
              <img 
                src="/assets/eko.jpg" 
                alt="Eko Rubiyanto" 
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <h3 className="font-serif text-2xl md:text-3xl text-[#2c2c2c] font-semibold mb-2">
              Eko Rubiyanto
            </h3>
            <p className="text-xs text-[#a87e1a] uppercase tracking-wider font-semibold mb-3">
              Mempelai Pria
            </p>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Anak ke-4 dari <br />
              <strong className="text-gray-800 font-medium">Bapak Alm. Japar</strong> & <strong className="text-gray-800 font-medium">Ibu Watini</strong>
            </p>
          </motion.div>

        </div>

      </div>

    </section>
  );
}
