import { createClient } from '@supabase/supabase-js';

// Supabase environment variables (fill in .env for production deployment)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

const LOCAL_STORAGE_KEY = 'wedding_wishes_ana_eko';

// Default initial wishes for visual elegance
const DEFAULT_WISHES = [
  {
    id: '1',
    nama: 'Keluarga Bpk. H. Ahmad',
    kehadiran: 'Hadir',
    jumlah_tamu: 2,
    pesan: 'Selamat untuk Ana & Eko! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin.',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: '2',
    nama: 'Rina & Teman-Teman Kantor',
    kehadiran: 'Hadir',
    jumlah_tamu: 1,
    pesan: 'Happy wedding ya Ana dan Mas Eko! Lancar sampai hari H dan bahagia selalu.',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

export async function fetchWishes() {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase fetch failed, fallback to LocalStorage:', e);
    }
  }

  // Fallback to LocalStorage
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(DEFAULT_WISHES));
    return DEFAULT_WISHES;
  }
  return JSON.parse(saved);
}

export async function submitWish({ nama, kehadiran, jumlah_tamu, pesan }) {
  const newWish = {
    id: Date.now().toString(),
    nama,
    kehadiran,
    jumlah_tamu: parseInt(jumlah_tamu) || 1,
    pesan,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('wishes')
        .insert([newWish])
        .select();
      
      if (!error && data) return data[0];
    } catch (e) {
      console.warn('Supabase insert failed, fallback to LocalStorage:', e);
    }
  }

  // LocalStorage Fallback
  const current = await fetchWishes();
  const updated = [newWish, ...current];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  return newWish;
}
