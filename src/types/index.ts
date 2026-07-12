// ============================================================
// TypeScript Interfaces — Sistem Manajemen Masjid An-Nadzom
// ============================================================

export interface JadwalJumat {
  id: number;
  tanggal: string;
  imam: string;
  muadzin: string;
  khotib: string;
  status: 'upcoming' | 'completed' | 'today';
}

export interface JadwalHariRaya {
  id: number;
  tahun: number;
  jenisHariRaya: 'Idul Fitri' | 'Idul Adha';
  tanggal: string;
  imam: string;
  khotib: string;
  lokasi: string;
}

export interface WaktuSholat {
  nama: string;
  namaArab: string;
  waktu: string;
  isActive: boolean;
  icon: string;
}

export interface Pengurus {
  id: number;
  nama: string;
  jabatan: string;
  periode: string;
  foto?: string;
}

export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: 'Makkiyah' | 'Madaniyah';
  arti: string;
}

export interface Ayat {
  nomor: number;
  arab: string;
  terjemahan: string;
  surahNomor: number;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

export interface StatCard {
  label: string;
  value: string;
  icon: string;
  color: string;
}

export interface User {
  name: string;
  role: 'admin' | 'pengurus' | 'jamaah';
  avatar?: string;
}
