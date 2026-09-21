import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Check, CreditCard } from 'lucide-react';

export default function GiftEnvelope() {
  const [copiedBank, setCopiedBank] = useState(null);

  const bankAccounts = [
    {
      bank: 'Bank BCA',
      number: '8830192841',
      name: 'Ana Nur Wijayanti'
    },
    {
      bank: 'Bank BRI',
      number: '012901039482501',
      name: 'Eko Rubiyanto'
    }
  ];

  const handleCopy = (number, key) => {
    navigator.clipboard.writeText(number);
    setCopiedBank(key);
    setTimeout(() => setCopiedBank(null), 2500);
  };

  return (
    <section className="py-20 px-4 bg-[#faf7f2] relative overflow-hidden">
      <div className="max-w-3xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#a87e1a] font-semibold">
            Tanda Kasih
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#2c2c2c] mt-2 mb-4 font-semibold">
            Amplop Digital
          </h2>
          <p className="max-w-md mx-auto text-sm text-gray-600 mb-12">
            Doa restu Anda merupakan karunia terindah bagi kami. Bagi yang ingin memberikan tanda kasih secara digital:
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {bankAccounts.map((account, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-white p-6 rounded-3xl border border-[#e2c77d]/40 shadow-sm flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-full bg-[#fdfbf7] border border-[#c59b27]/30 text-[#c59b27] flex items-center justify-center mb-4">
                <CreditCard className="w-6 h-6" />
              </div>

              <span className="font-serif text-xl font-bold text-[#886214] mb-1">
                {account.bank}
              </span>

              <span className="font-mono text-lg font-semibold text-gray-800 tracking-wider my-2">
                {account.number}
              </span>

              <span className="text-xs text-gray-500 mb-4">
                a.n. {account.name}
              </span>

              <button
                onClick={() => handleCopy(account.number, idx)}
                className="w-full py-2.5 px-4 bg-[#fdfbf7] hover:bg-[#f7f0df] border border-[#c59b27]/30 text-[#886214] text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                {copiedBank === idx ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Tersalin ke Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Salin No. Rekening
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
