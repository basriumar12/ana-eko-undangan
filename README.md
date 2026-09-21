# Undangan Pernikahan Digital Online (Ana & Eko)

Aplikasi Web Undangan Pernikahan Digital modern, responsif, dan elegan untuk **Ana Nur Wijayanti & Eko Rubiyanto**.

![Mempelai Ana & Eko](/assets/couple.jpg)

## 📌 Detail Acara
- **Mempelai Wanita**: Ana Nur Wijayanti (Anak pertama dari Bpk. Paino & Ibu Siyam)
- **Mempelai Pria**: Eko Rubiyanto (Anak ke-4 dari Bpk. Alm. Japar & Ibu Watini)
- **Akad Nikah**: Minggu, 27 September 2026 | Pukul 09.00 WITA
- **Tempat**: Perumahan Bintang Anugrah Jaya
- **Turut Mengundang**: Keluarga kedua mempelai

---

## 🚀 Fitur Utama
1. **Penerima Tamu Dinamis (`?to=Nama+Tamu`)**:
   - Tampilan nama tamu di sampul undangan otomatis sesuai nama di URL.
2. **Generator Link & Pesan WhatsApp**:
   - Tombol *"Input Tamu / Share WA"* di pojok kanan bawah.
   - Masukkan daftar nama tamu (satu per baris / impor dari Excel), aplikasi langsung menghasilkan link unik + template pesan undangan WhatsApp yang sopan.
3. **Musik Latar / Backsound Audio**:
   - Putar otomatis saat tombol "Buka Undangan" diklik.
   - Tombol floating di kiri bawah untuk menghentikan / memutar lagu sewaktu-waktu.
4. **Database RSVP & Ucapan (Supabase + LocalStorage + Excel Export)**:
   - Form kirim pesan & konfirmasi kehadiran.
   - Tombol **Export Excel** untuk mengunduh seluruh data ucapan dan konfirmasi kehadiran dalam format file `.xlsx`.
   - Terhubung dengan **Supabase** atau LocalStorage jika belum mengkonfigurasi Supabase.
5. **Amplop Digital / Hadiah**:
   - Fitur salin nomor rekening BCA & BRI secara instan.

---

## 🛠️ Cara Menjalankan Projek Lokal

```bash
# 1. Install dependencies
npm install

# 2. Jalankan server pengembangan
npm run dev

# 3. Akses via browser (contoh nama tamu)
http://localhost:5173/?to=Bapak+Budi+dan+Keluarga
```

---

## ⚡ Cara Deploy ke Cloudflare Pages

### Metode 1: Upload Folder Build (`dist`)
1. Jalankan perintah build:
   ```bash
   npm run build
   ```
2. Buka Dashboard **Cloudflare** -> **Workers & Pages** -> **Create Application** -> **Pages** -> **Upload assets**.
3. Drag & drop folder `dist` yang baru dihasilkan.
4. Website undangan Anda langsung aktif dan online!

### Metode 2: Hubungkan ke GitHub Repo
1. Push projek ini ke repository GitHub.
2. Di Cloudflare Pages, pilih **Connect to Git**.
3. Masukkan setting berikut:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Klik **Save and Deploy**.

---

## 🗄️ Menghubungkan Database Supabase (Opsional)
Jika ingin menyimpan data ucapan ke database Supabase:
1. Buat tabel bernama `wishes` di Supabase SQL Editor dengan query:
```sql
create table wishes (
  id uuid default gen_random_uuid() primary key,
  nama text not null,
  kehadiran text not null,
  jumlah_tamu integer default 1,
  pesan text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```
2. Buat file `.env` di direktori projek dan isi dengan credential Supabase Anda:
```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```
