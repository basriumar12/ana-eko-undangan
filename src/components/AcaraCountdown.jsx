import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Calendar, ExternalLink, Navigation } from 'lucide-react';

export default function AcaraCountdown() {
  // Target Date: 27 September 2026, 09:00 WITA (UTC+8)
  const targetDate = new Date('2026-09-27T09:00:00+08:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Exact Google Maps link provided by user
  const mapSearchUrl = "https://maps.app.goo.gl/Yk4tsRjppnoun5WX8?g_st=aw";

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Akad Nikah Ana & Eko')}&dates=20260927T010000Z/20260927T040000Z&details=${encodeURIComponent('Pernikahan Ana Nur Wijayanti & Eko Rubiyanto')}&location=${encodeURIComponent('Perumahan Bintang Anugrah Jaya')}`;

  return (
    <section className="py-20 px-4 bg-[#faf7f2] relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#a87e1a] font-semibold">
            Rangkaian Acara
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#2c2c2c] mt-2 mb-4 font-semibold">
            Waktu & Lokasi
          </h2>
          <p className="max-w-md mx-auto text-sm text-gray-600 mb-12">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara kami:
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto mb-14">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white p-3 md:p-4 rounded-2xl border border-[#e2c77d]/40 shadow-sm text-center"
            >
              <span className="font-serif text-2xl md:text-4xl font-bold text-[#886214] block">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Card Detail Akad Nikah */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto bg-white p-8 md:p-10 rounded-3xl border border-[#e2c77d]/50 shadow-xl relative"
        >
          <div className="inline-block p-3 rounded-full bg-[#fdfbf7] border border-[#c59b27]/30 text-[#c59b27] mb-4">
            <Calendar className="w-8 h-8" />
          </div>

          <h3 className="font-serif text-3xl text-[#2c2c2c] font-bold mb-2">
            Akad Nikah
          </h3>

          <div className="w-16 h-0.5 bg-[#c59b27] mx-auto my-4 opacity-40" />

          <div className="space-y-4 text-gray-700 text-sm md:text-base my-6">
            <div className="flex items-center justify-center gap-2 text-[#886214] font-semibold text-lg">
              <Calendar className="w-5 h-5" />
              <span>Minggu, 27 September 2026</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-[#c59b27]" />
              <span>Pukul 09.00 WITA - Selesai</span>
            </div>

            <div className="flex items-start justify-center gap-2 text-gray-600 max-w-md mx-auto pt-2">
              <MapPin className="w-5 h-5 text-[#c59b27] shrink-0 mt-0.5" />
              <span className="font-medium text-gray-800">
                Perumahan Bintang Anugrah Jaya
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8 pt-4 border-t border-gray-100">
            <a
              href={mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#c59b27] hover:bg-[#a87e1a] text-white rounded-full font-medium shadow-md flex items-center justify-center gap-2 text-xs md:text-sm transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4" />
              Petunjuk Lokasi (Google Maps)
            </a>

            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#fdfbf7] border border-[#c59b27]/40 text-[#886214] hover:bg-[#f7f0df] rounded-full font-medium flex items-center justify-center gap-2 text-xs md:text-sm transition-all cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" />
              Simpan ke Kalender
            </a>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
