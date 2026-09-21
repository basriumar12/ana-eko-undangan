import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Copy, Send, X, Plus, FileSpreadsheet, Check, ExternalLink } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function GuestLinkGenerator({ isOpen, onClose, isStandalonePage = false }) {
  const [namesInput, setNamesInput] = useState('Bapak Ahmad & Keluarga\nIbu Rina\nSaudara Budi');
  const [generatedList, setGeneratedList] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  // Clean root domain URL for guest recipients (stripping /admin or ?mode=admin)
  const getBaseGuestUrl = () => {
    const origin = window.location.origin;
    let path = window.location.pathname.replace(/\/admin\/?$/, '');
    if (!path.startsWith('/')) path = '/' + path;
    if (!path.endsWith('/')) path = path + '/';
    return origin + (path === '/' ? '' : path);
  };

  const handleGenerate = () => {
    const baseUrl = getBaseGuestUrl();

    const list = namesInput
      .split('\n')
      .map(n => n.trim())
      .filter(Boolean)
      .map(name => {
        const encoded = encodeURIComponent(name);
        const url = `${baseUrl}?to=${encoded}`;
        const waMessage = `Bismillah-ir-Rahman-ir-Rahim\n\nYth. ${name},\n\nTanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami (Ana Nur Wijayanti & Eko Rubiyanto).\n\nDetail lengkap acara dan lokasi dapat diakses melalui link undangan digital berikut:\n${url}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih.\n\nSalam hangat,\nAna & Eko`;
        
        return {
          name,
          url,
          waUrl: `https://api.whatsapp.com/send?text=${encodeURIComponent(waMessage)}`
        };
      });

    setGeneratedList(list);
  };

  const handleCopy = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleExportExcel = () => {
    if (generatedList.length === 0) return;
    
    const excelData = generatedList.map((item, idx) => ({
      No: idx + 1,
      'Nama Tamu': item.name,
      'Link Undangan': item.url
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Daftar Link Tamu');
    XLSX.writeFile(workbook, `Daftar_Link_Undangan_Ana_Eko.xlsx`);
  };

  if (!isOpen) return null;

  const content = (
    <div className="p-6 space-y-6">
      <div className="bg-[#fdfbf7] p-4 rounded-2xl border border-[#e2c77d]/40 flex items-center justify-between">
        <div className="text-xs text-[#886214]">
          <span className="font-bold">💡 Petunjuk Admin:</span> Masukkan daftar nama tamu di bawah ini. Hasil link yang dibuat akan mengarah ke alamat undangan penerima (`/?to=Nama+Tamu`).
        </div>
      </div>

      {/* Input TextArea */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
          Daftar Nama Tamu (Satu Nama per Baris)
        </label>
        <textarea
          rows={5}
          value={namesInput}
          onChange={(e) => setNamesInput(e.target.value)}
          placeholder="Contoh:&#10;Bapak Budi & Keluarga&#10;Ibu Siti&#10;Mas Dion"
          className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-[#c59b27] text-sm resize-none font-mono"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleGenerate}
          className="px-6 py-2.5 bg-[#c59b27] hover:bg-[#a87e1a] text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Generate Link Undangan Tamu
        </button>

        {generatedList.length > 0 && (
          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Export Excel Daftar Link
          </button>
        )}
      </div>

      {/* Result List */}
      {generatedList.length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Hasil Link Undangan Tamu ({generatedList.length})
          </h4>
          {generatedList.map((item, idx) => (
            <div 
              key={idx}
              className="p-3.5 bg-[#faf7f2] rounded-2xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-bold text-gray-800 text-sm block">
                  {item.name}
                </span>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#c59b27] hover:underline font-mono text-[11px] truncate max-w-xs flex items-center gap-1 mt-0.5"
                >
                  <span>{item.url}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(item.url, idx)}
                  className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg flex items-center gap-1 hover:bg-gray-50 font-medium text-gray-700 cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 text-[11px]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#c59b27]" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>

                <a
                  href={item.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg flex items-center gap-1 font-medium"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim WA</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isStandalonePage) {
    return content;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white max-w-3xl w-full rounded-3xl shadow-2xl overflow-hidden border border-[#e2c77d]"
        >
          {/* Header */}
          <div className="bg-[#fdfbf7] p-6 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl font-bold text-[#886214]">
                Generator Link Undangan Tamu
              </h3>
              <p className="text-xs text-gray-500">
                Input daftar nama tamu untuk membuat link khusus & pesan WhatsApp otomatis.
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {content}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
