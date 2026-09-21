import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Heart } from 'lucide-react';

export default function LoveStoryGallery() {
  const [selectedImg, setSelectedImg] = useState(null);

  const photos = [
    {
      src: '/assets/couple.jpg',
      title: 'Ana & Eko',
      desc: 'Momen Kebersamaan Kasih Sayang'
    },
    {
      src: '/assets/ana.jpg',
      title: 'Ana Nur Wijayanti',
      desc: 'Mempelai Wanita'
    },
    {
      src: '/assets/eko.jpg',
      title: 'Eko Rubiyanto',
      desc: 'Mempelai Pria'
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#faf7f2] relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#a87e1a] font-semibold">
            Dokumentasi Kebahagiaan
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#2c2c2c] mt-2 mb-4 font-semibold">
            Galeri Foto
          </h2>
          <p className="max-w-md mx-auto text-sm text-gray-600 mb-12">
            Momen terindah yang mengabadikan perjalanan cinta kami menuju hari bahagia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {photos.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              onClick={() => setSelectedImg(item)}
              className="group cursor-pointer bg-white p-4 rounded-3xl border border-[#e2c77d]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between"
            >
              <div className="w-full h-80 rounded-2xl overflow-hidden bg-[#fdfbf7] p-2 flex items-center justify-center border border-[#c59b27]/20">
                <img 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-serif font-semibold text-lg text-[#2c2c2c]">{item.title}</p>
                <p className="text-xs text-[#a87e1a] font-medium">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-3xl w-full flex flex-col items-center">
              <button
                onClick={() => setSelectedImg(null)}
                className="absolute -top-12 right-0 text-white hover:text-[#c59b27] p-2"
              >
                <X className="w-8 h-8" />
              </button>
              <img
                src={selectedImg.src}
                alt={selectedImg.title}
                className="max-h-[85vh] rounded-2xl shadow-2xl object-contain border-2 border-[#c59b27] bg-black/50"
              />
              <div className="text-center mt-4 text-white">
                <h3 className="font-serif text-2xl">{selectedImg.title}</h3>
                <p className="text-sm text-gray-300">{selectedImg.desc}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
