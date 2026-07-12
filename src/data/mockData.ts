import {
  JadwalJumat,
  JadwalHariRaya,
  WaktuSholat,
  Pengurus,
  Surah,
} from '../types';

// ============================================================
// Data Jadwal Sholat Jumat
// ============================================================
export const jadwalJumat: JadwalJumat[] = [
  { id: 1, tanggal: '2026-07-04', imam: 'Ustadz Ahmad Fauzi, S.Ag', muadzin: 'Bpk. Hasan Basri', khotib: 'Dr. Muhammad Ridwan, M.Pd', status: 'completed' },
  { id: 2, tanggal: '2026-07-11', imam: 'Ustadz Syarifuddin, M.Ag', muadzin: 'Bpk. Karim Sulaiman', khotib: 'KH. Abdullah Syafi\'i', status: 'completed' },
  { id: 3, tanggal: '2026-07-18', imam: 'Ustadz Ahmad Fauzi, S.Ag', muadzin: 'Bpk. Wahyu Santoso', khotib: 'Ustadz Dr. Zainuddin, Lc', status: 'today' },
  { id: 4, tanggal: '2026-07-25', imam: 'Ustadz Ibrahim Khalil, M.Si', muadzin: 'Bpk. Hasan Basri', khotib: 'Dr. Muhammad Ridwan, M.Pd', status: 'upcoming' },
  { id: 5, tanggal: '2026-08-01', imam: 'Ustadz Syarifuddin, M.Ag', muadzin: 'Bpk. Karim Sulaiman', khotib: 'KH. Abdullah Syafi\'i', status: 'upcoming' },
  { id: 6, tanggal: '2026-08-08', imam: 'Ustadz Ahmad Fauzi, S.Ag', muadzin: 'Bpk. Wahyu Santoso', khotib: 'Ustadz Dr. Zainuddin, Lc', status: 'upcoming' },
  { id: 7, tanggal: '2026-08-15', imam: 'Ustadz Ibrahim Khalil, M.Si', muadzin: 'Bpk. Hasan Basri', khotib: 'Dr. Muhammad Ridwan, M.Pd', status: 'upcoming' },
  { id: 8, tanggal: '2026-08-22', imam: 'Ustadz Syarifuddin, M.Ag', muadzin: 'Bpk. Karim Sulaiman', khotib: 'KH. Abdullah Syafi\'i', status: 'upcoming' },
];

// ============================================================
// Data Jadwal Hari Raya
// ============================================================
export const jadwalHariRaya: JadwalHariRaya[] = [
  {
    id: 1,
    tahun: 2025,
    jenisHariRaya: 'Idul Fitri',
    tanggal: '2025-03-30',
    imam: 'KH. Abdullah Syafi\'i',
    khotib: 'Dr. Muhammad Ridwan, M.Pd',
    lokasi: 'Masjid An-Nadzom & Halaman Parkir',
  },
  {
    id: 2,
    tahun: 2025,
    jenisHariRaya: 'Idul Adha',
    tanggal: '2025-06-07',
    imam: 'Ustadz Ahmad Fauzi, S.Ag',
    khotib: 'Ustadz Dr. Zainuddin, Lc',
    lokasi: 'Masjid An-Nadzom & Halaman Parkir',
  },
  {
    id: 3,
    tahun: 2026,
    jenisHariRaya: 'Idul Fitri',
    tanggal: '2026-03-20',
    imam: 'KH. Abdullah Syafi\'i',
    khotib: 'Dr. Muhammad Ridwan, M.Pd',
    lokasi: 'Masjid An-Nadzom & Halaman Parkir',
  },
  {
    id: 4,
    tahun: 2026,
    jenisHariRaya: 'Idul Adha',
    tanggal: '2026-05-27',
    imam: 'Ustadz Syarifuddin, M.Ag',
    khotib: 'KH. Abdullah Syafi\'i',
    lokasi: 'Masjid An-Nadzom & Halaman Parkir',
  },
];

// ============================================================
// Data Waktu Sholat (untuk hari ini di Bandung)
// ============================================================
export const waktuSholat: WaktuSholat[] = [
  { nama: 'Subuh', namaArab: 'الفجر', waktu: '04:42', isActive: false, icon: '🌙' },
  { nama: 'Dzuhur', namaArab: 'الظهر', waktu: '12:01', isActive: false, icon: '☀️' },
  { nama: 'Ashar', namaArab: 'العصر', waktu: '15:22', isActive: false, icon: '🌤️' },
  { nama: 'Maghrib', namaArab: 'المغرب', waktu: '18:04', isActive: true, icon: '🌅' },
  { nama: 'Isya', namaArab: 'العشاء', waktu: '19:16', isActive: false, icon: '🌃' },
];

// ============================================================
// Data Pengurus Masjid
// ============================================================
export const pengurusMasjid: Pengurus[] = [
  { id: 1, nama: 'H. Sutrisno Wahyudi, S.H', jabatan: 'Ketua Takmir', periode: '2024 - 2028' },
  { id: 2, nama: 'Ir. Bambang Prasetyo, M.T', jabatan: 'Wakil Ketua', periode: '2024 - 2028' },
  { id: 3, nama: 'Dra. Siti Rahmawati', jabatan: 'Sekretaris', periode: '2024 - 2028' },
  { id: 4, nama: 'Ahmad Fauzan, S.E., M.M', jabatan: 'Bendahara', periode: '2024 - 2028' },
  { id: 5, nama: 'Ustadz Ahmad Fauzi, S.Ag', jabatan: 'Bidang Keagamaan', periode: '2024 - 2028' },
  { id: 6, nama: 'Bpk. Hendra Kusuma', jabatan: 'Bidang Pemeliharaan', periode: '2024 - 2028' },
  { id: 7, nama: 'Ibu Nur Hasanah, S.Pd', jabatan: 'Bidang Pendidikan', periode: '2024 - 2028' },
  { id: 8, nama: 'Bpk. Rizal Hakim', jabatan: 'Bidang Sosial', periode: '2024 - 2028' },
  { id: 9, nama: 'Bpk. Wahyu Santoso', jabatan: 'Bidang Keamanan', periode: '2024 - 2028' },
  { id: 10, nama: 'Ibu Dewi Puspitasari', jabatan: 'Bidang Kebersihan', periode: '2024 - 2028' },
  { id: 11, nama: 'Bpk. Karim Sulaiman', jabatan: 'Muadzin Tetap', periode: '2024 - 2028' },
  { id: 12, nama: 'Bpk. Hasan Basri', jabatan: 'Muadzin Tetap', periode: '2024 - 2028' },
];

// ============================================================
// Data Surah Al-Qur'an (sample)
// ============================================================
export const surahList: Surah[] = [
  { nomor: 1, nama: 'الفاتحة', namaLatin: 'Al-Fatihah', jumlahAyat: 7, tempatTurun: 'Makkiyah', arti: 'Pembukaan' },
  { nomor: 2, nama: 'البقرة', namaLatin: 'Al-Baqarah', jumlahAyat: 286, tempatTurun: 'Madaniyah', arti: 'Sapi Betina' },
  { nomor: 3, nama: 'آل عمران', namaLatin: 'Ali Imran', jumlahAyat: 200, tempatTurun: 'Madaniyah', arti: 'Keluarga Imran' },
  { nomor: 4, nama: 'النساء', namaLatin: 'An-Nisa', jumlahAyat: 176, tempatTurun: 'Madaniyah', arti: 'Wanita' },
  { nomor: 5, nama: 'المائدة', namaLatin: 'Al-Maidah', jumlahAyat: 120, tempatTurun: 'Madaniyah', arti: 'Hidangan' },
  { nomor: 6, nama: 'الأنعام', namaLatin: 'Al-Anam', jumlahAyat: 165, tempatTurun: 'Makkiyah', arti: 'Binatang Ternak' },
  { nomor: 7, nama: 'الأعراف', namaLatin: "Al-A'raf", jumlahAyat: 206, tempatTurun: 'Makkiyah', arti: 'Tempat Tertinggi' },
  { nomor: 36, nama: 'يس', namaLatin: 'Yasin', jumlahAyat: 83, tempatTurun: 'Makkiyah', arti: 'Yasin' },
  { nomor: 55, nama: 'الرحمن', namaLatin: 'Ar-Rahman', jumlahAyat: 78, tempatTurun: 'Madaniyah', arti: 'Yang Maha Pemurah' },
  { nomor: 56, nama: 'الواقعة', namaLatin: "Al-Waqi'ah", jumlahAyat: 96, tempatTurun: 'Makkiyah', arti: 'Hari Kiamat' },
  { nomor: 67, nama: 'الملك', namaLatin: 'Al-Mulk', jumlahAyat: 30, tempatTurun: 'Makkiyah', arti: 'Kerajaan' },
  { nomor: 112, nama: 'الإخلاص', namaLatin: 'Al-Ikhlas', jumlahAyat: 4, tempatTurun: 'Makkiyah', arti: 'Ikhlas' },
  { nomor: 113, nama: 'الفلق', namaLatin: 'Al-Falaq', jumlahAyat: 5, tempatTurun: 'Makkiyah', arti: 'Waktu Subuh' },
  { nomor: 114, nama: 'الناس', namaLatin: 'An-Nas', jumlahAyat: 6, tempatTurun: 'Makkiyah', arti: 'Manusia' },
];

// ============================================================
// Data Ayat Al-Fatihah (Sample)
// ============================================================
export const ayatAlFatihah = [
  { nomor: 1, arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', terjemahan: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.' },
  { nomor: 2, arab: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', terjemahan: 'Segala puji bagi Allah, Tuhan seluruh alam,' },
  { nomor: 3, arab: 'الرَّحْمَٰنِ الرَّحِيمِ', terjemahan: 'Yang Maha Pengasih, Maha Penyayang,' },
  { nomor: 4, arab: 'مَالِكِ يَوْمِ الدِّينِ', terjemahan: 'Pemilik hari pembalasan.' },
  { nomor: 5, arab: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', terjemahan: 'Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.' },
  { nomor: 6, arab: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', terjemahan: 'Tunjukilah kami jalan yang lurus,' },
  { nomor: 7, arab: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', terjemahan: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat.' },
];

export const ayatYasin = [
  { nomor: 1, arab: 'يس', terjemahan: 'Yāsīn.' },
  { nomor: 2, arab: 'وَالْقُرْآنِ الْحَكِيمِ', terjemahan: 'Demi Al-Qur\'an yang penuh hikmah,' },
  { nomor: 3, arab: 'إِنَّكَ لَمِنَ الْمُرْسَلِينَ', terjemahan: 'sungguh, engkau (Muhammad) adalah salah seorang dari rasul-rasul,' },
  { nomor: 4, arab: 'عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ', terjemahan: '(yang berada) di atas jalan yang lurus,' },
  { nomor: 5, arab: 'تَنزِيلَ الْعَزِيزِ الرَّحِيمِ', terjemahan: '(sebagai wahyu) yang diturunkan oleh Yang Mahaperkasa, Maha Penyayang,' },
];
