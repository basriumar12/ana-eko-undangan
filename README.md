# Undangan Pernikahan Digital Online (Ana & Eko)

Aplikasi Web Undangan Pernikahan Digital modern, responsif, dan elegan untuk **Ana Nur Wijayanti & Eko Rubiyanto**.

Dibuat oleh: **Carcoon Dev**  
Repository GitHub: [https://github.com/basriumar12/ana-eko-undangan](https://github.com/basriumar12/ana-eko-undangan)

---

## 📌 Detail Acara
- **Mempelai Wanita**: Ana Nur Wijayanti (Anak pertama dari Bpk. Paino & Ibu Siyam)
- **Mempelai Pria**: Eko Rubiyanto (Anak ke-4 dari Bpk. Alm. Japar & Ibu Watini)
- **Akad Nikah**: Minggu, 27 September 2026 | Pukul 09.00 WITA
- **Tempat**: Perumahan Bintang Anugrah Jaya
- **Turut Mengundang**: Keluarga kedua mempelai
- **Lagu Latar**: Shane Filan - Beautiful In White (`https://soundcloud.com/hiepnhl/beautiful-in-white`)

---

## 🚀 Fitur Utama

1. **Penerima Tamu Dinamis (`/?to=Nama+Tamu`)**:
   - Tampilan nama tamu di sampul undangan otomatis sesuai nama di URL.
2. **Panel Admin & Generator Link WhatsApp (`/admin`)**:
   - Link terpisah khusus pengelola: `/admin` (atau `?mode=admin`).
   - Masukkan daftar nama tamu (satu per baris / impor dari Excel), aplikasi langsung menghasilkan link kustom penerima (`/?to=Nama`) + template pesan undangan WhatsApp yang sopan.
   - Tombol **Export Excel** untuk mengunduh daftar link tamu.
3. **Musik Latar / Backsound Audio**:
   - Lagu **Shane Filan - Beautiful In White**.
   - Putar otomatis saat tombol "Buka Undangan" diklik.
   - Tombol floating di kiri bawah untuk menghentikan / memutar lagu sewaktu-waktu.
4. **Database RSVP & Ucapan (Supabase + LocalStorage + Excel Export)**:
   - Form kirim pesan & konfirmasi kehadiran.
   - Tombol **Export Excel** untuk mengunduh seluruh data ucapan dan konfirmasi kehadiran.

---

## 🛠️ Cara Menjalankan Projek Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan server pengembangan
npm run dev

# 3. Akses via browser (Tampilan Tamu)
http://localhost:5173/?to=Bapak+Budi+dan+Keluarga

# 4. Akses via browser (Panel Admin Generator)
http://localhost:5173/admin
```

---

## ⚡ Cara Deploy ke Cloudflare Pages

1. Buka [Cloudflare Dashboard](https://dash.cloudflare.com) -> **Workers & Pages**.
2. Klik **Create Application** -> pilih **Pages** -> **Connect to Git**.
3. Pilih repository **`basriumar12/ana-eko-undangan`**.
4. Masukkan konfigurasi:
   - **Project Name**: `ana-eko-undangan` (atau `ana-eko`)
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Klik **Save and Deploy**.
