import React from 'react';
import { motion } from 'framer-motion';
import { Users, HeartHandshake } from 'lucide-react';

export default function TurutMengundang() {
  return (
    <section className="py-16 px-4 bg-white border-t border-b border-[#e2c77d]/30 text-center">
      <div className="max-w-2xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-3xl bg-[#fdfbf7] border border-[#e2c77d]/40 shadow-sm"
        >
          <div className="w-12 h-12 rounded-full bg-white border border-[#c59b27]/30 text-[#c59b27] flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6" />
          </div>

          <h3 className="font-serif text-2xl md:text-3xl text-[#2c2c2c] font-semibold mb-3">
            Turut Mengundang
          </h3>

          <div className="w-12 h-0.5 bg-[#c59b27] mx-auto my-3 opacity-40" />

          <p className="font-serif text-lg md:text-xl text-[#886214] font-medium mt-4">
            Keluarga Kedua Mempelai
          </p>
          <p className="text-xs text-gray-500 mt-2 italic">
            Beserta seluruh segenap sanak saudara & kerabat
          </p>

        </motion.div>

      </div>
    </section>
  );
}
