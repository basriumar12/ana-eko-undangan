import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2, Download, UserCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import * as XLSX from 'xlsx';
import { fetchWishes, submitWish } from '../lib/supabase';

export default function RsvpWishes({ guestName }) {
  const [wishes, setWishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: guestName || '',
    kehadiran: 'Hadir',
    jumlah_tamu: 1,
    pesan: ''
  });
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (guestName && !form.nama) {
      setForm(prev => ({ ...prev, nama: guestName }));
    }
    loadData();
  }, [guestName]);

  const loadData = async () => {
    const data = await fetchWishes();
    setWishes(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nama || !form.pesan) return;

    setLoading(true);
    try {
      const result = await submitWish(form);
      if (result) {
        setSubmittedSuccess(true);
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setForm(prev => ({ ...prev, pesan: '' }));
        await loadData();
      }
    } catch (err) {
      console.error('Submit RSVP error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    if (wishes.length === 0) return;
    
    const excelData = wishes.map((w, index) => ({
      No: index + 1,
      Nama: w.nama,
      Kehadiran: w.kehadiran,
      'Jumlah Tamu': w.jumlah_tamu,
      Ucapan: w.pesan,
      Tanggal: new Date(w.created_at).toLocaleString('id-ID')
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Daftar RSVP & Ucapan');
    XLSX.writeFile(workbook, `RSVP_Pernikahan_Ana_Eko_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <section className="py-20 px-4 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-[#a87e1a] font-semibold">
            Konfirmasi Kehadiran & Doa
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-[#2c2c2c] mt-2 mb-4 font-semibold">
            RSVP & Ucapan Selamat
          </h2>
          <p className="max-w-md mx-auto text-sm text-gray-600">
            Doa restu Anda merupakan hadiah terindah bagi kami yang akan mengarungi bahtera rumah tangga.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Form RSVP */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 bg-[#fdfbf7] p-6 md:p-8 rounded-3xl border border-[#e2c77d]/40 shadow-sm"
          >
            <h3 className="font-serif text-2xl text-[#2c2c2c] font-semibold mb-6 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#c59b27]" />
              Kirim Konfirmasi & Ucapan
            </h3>

            {submittedSuccess && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Terima kasih! Ucapan & konfirmasi Anda telah terikirim.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Nama Anda
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama Anda"
                  value={form.nama}
                  onChange={(e) => setForm({ ...form, nama: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#c59b27]/50 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                    Konfirmasi Kehadiran
                  </label>
                  <select
                    value={form.kehadiran}
                    onChange={(e) => setForm({ ...form, kehadiran: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#c59b27]/50 text-sm"
                  >
                    <option value="Hadir">Hadir</option>
                    <option value="Tidak Hadir">Tidak Hadir</option>
                    <option value="Ragu-ragu">Masih Ragu-ragu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                    Jumlah Tamu
                  </label>
                  <select
                    value={form.jumlah_tamu}
                    onChange={(e) => setForm({ ...form, jumlah_tamu: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#c59b27]/50 text-sm"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4+ Orang</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
                  Pesan / Ucapan & Doa
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tuliskan doa & ucapan selamat untuk Ana & Eko..."
                  value={form.pesan}
                  onChange={(e) => setForm({ ...form, pesan: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#c59b27]/50 text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-[#c59b27] to-[#a87e1a] text-white rounded-xl font-medium shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm transition-all"
              >
                <Send className="w-4 h-4" />
                {loading ? 'Mengirim...' : 'Kirim Ucapan & RSVP'}
              </button>
            </form>
          </motion.div>

          {/* List Ucapan & Excel Export */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-6 flex flex-col h-full bg-[#faf7f2] p-6 rounded-3xl border border-[#e2c77d]/40"
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
              <h3 className="font-serif text-xl font-semibold text-[#2c2c2c] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#c59b27]" />
                Ucapan & Doa ({wishes.length})
              </h3>

              <button
                onClick={handleExportExcel}
                className="px-3 py-1.5 bg-white border border-[#c59b27]/40 hover:bg-[#f7f0df] text-[#886214] text-xs rounded-lg flex items-center gap-1.5 font-medium transition-colors"
                title="Download data RSVP ke file Excel"
              >
                <Download className="w-3.5 h-3.5" />
                Export Excel
              </button>
            </div>

            <div className="flex-1 overflow-y-auto max-h-[380px] space-y-3 pr-1">
              {wishes.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-gray-100 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-gray-800">
                      {item.nama}
                    </span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                      item.kehadiran === 'Hadir' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : item.kehadiran === 'Tidak Hadir'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.kehadiran} ({item.jumlah_tamu} orang)
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed italic">
                    "{item.pesan}"
                  </p>
                  <p className="text-[10px] text-gray-400 text-right">
                    {new Date(item.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              ))}
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
