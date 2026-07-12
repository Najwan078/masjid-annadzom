import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWaktuSholat, useJadwalJumat } from '../hooks/useApi';
import {
  Calendar, Clock, BookOpen, Users, ChevronRight,
  Star, MapPin, Megaphone, TrendingUp, Loader2,
  Sunrise, Sun, SunDim, Sunset, MoonStar
} from 'lucide-react';
import Mosque from '../components/icons/Mosque';
import ScrollReveal from '../components/ScrollReveal';

// Helper — format tanggal Indonesia
const formatTanggal = (iso: string): string => {
  return new Date(iso).toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
};

// Helper to map prayer name to premium vector icon
const getPrayerIcon = (name: string, className = "w-8 h-8") => {
  switch (name.toLowerCase()) {
    case 'subuh':
      return <Sunrise className={className} />;
    case 'dzuhur':
      return <Sun className={className} />;
    case 'ashar':
      return <SunDim className={className} />;
    case 'maghrib':
      return <Sunset className={className} />;
    case 'isya':
      return <MoonStar className={className} />;
    default:
      return <Sun className={className} />;
  }
};

// ────────────────────────────────────────────────
// Hero Section (Elegant Islamic Design with Overlay)
// ────────────────────────────────────────────────
const HeroSection: React.FC = () => {
  const { user } = useAuth();
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Selamat Pagi' : now.getHours() < 15 ? 'Selamat Siang' : now.getHours() < 18 ? 'Selamat Sore' : 'Selamat Malam';

  return (
    <div className="hero-section">
      {/* Decorative slow-spinning Islamic shape */}
      <div className="geo-decoration absolute top-10 left-10"></div>
      <div className="geo-decoration absolute bottom-10 right-10" style={{ animationDirection: 'reverse', animationDuration: '60s' }}></div>

      <div className="hero-content flex flex-col items-center justify-center min-h-screen text-center px-4 pb-20 pt-32 max-w-4xl mx-auto">
        {/* Islamic Greeting Badge */}
        <div className="glass-card px-6 py-2.5 mb-6 animate-fade-in-up">
          <p className="font-arabic text-yellow-300 text-lg md:text-xl tracking-wide">
            السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ
          </p>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 animate-fade-in-up animate-delay-100 leading-tight">
          Masjid{' '}
          <span style={{ background: 'linear-gradient(135deg, #d6ad4c, #f5e2b3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            An-Nadzom
          </span>
        </h1>

        <p className="text-gray-200 text-lg md:text-xl max-w-2xl leading-relaxed mb-3 animate-fade-in-up animate-delay-200">
          {greeting}, <span className="text-yellow-300 font-bold">{user?.name ?? 'Jamaah'}</span>! Selamat datang di
          Sistem Manajemen Digital Masjid An-Nadzom.
        </p>
        
        <p className="text-gray-400 text-sm mb-10 animate-fade-in-up animate-delay-300 font-medium">
          {now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-400">
          <NavLink
            to="/waktu-sholat"
            id="btn-hero-waktu-sholat"
            className="btn-shimmer flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Clock className="w-5 h-5 text-yellow-300 animate-pulse" />
            Lihat Waktu Sholat
          </NavLink>
          <NavLink
            to="/al-quran"
            id="btn-hero-alquran"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          >
            <BookOpen className="w-5 h-5 text-yellow-300" />
            Baca Al-Qur'an
          </NavLink>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────────────────────
// Stats Section (Premium Gold & Green Accents)
// ────────────────────────────────────────────────
const stats = [
  { icon: Users, value: '2.500+', label: 'Jamaah Aktif', color: '#115e3b' },
  { icon: Calendar, value: '52', label: 'Jadwal Jumat / Tahun', color: '#c09633' },
  { icon: Megaphone, value: '12', label: 'Pengurus Aktif', color: '#2b6cb0' },
  { icon: TrendingUp, value: '8+', label: 'Program Kegiatan', color: '#6b46c1' },
];

const StatsSection: React.FC = () => (
  <section className="py-12 px-4 -mt-16 relative z-10">
    <ScrollReveal>
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className="premium-card p-4 sm:p-6 text-center rounded-2xl shadow-xl"
          >
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
              style={{ background: `${s.color}15` }}
            >
              <s.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: s.color }} />
            </div>
            <p className="text-2xl sm:text-3xl font-black mb-1" style={{ color: 'var(--color-text-main)' }}>{s.value}</p>
            <p className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  </section>
);

// ────────────────────────────────────────────────
// Quick Access Cards
// ────────────────────────────────────────────────
const quickAccess = [
  { label: 'Jadwal Jumat', desc: 'Jadwal imam, muadzin & khotib sholat Jumat', icon: Calendar, path: '/jadwal-jumat', color: '#115e3b' },
  { label: 'Hari Raya', desc: 'Informasi Idul Fitri & Idul Adha', icon: Star, path: '/hari-raya', color: '#c09633' },
  { label: 'Waktu Sholat', desc: 'Jadwal 5 waktu sholat wajib harian', icon: Clock, path: '/waktu-sholat', color: '#2b6cb0' },
  { label: 'Baca Al-Qur\'an', desc: 'Baca surah & ayat Al-Qur\'an online', icon: BookOpen, path: '/al-quran', color: '#6b46c1' },
  { label: 'Tentang Kami', desc: 'Sejarah masjid dan susunan pengurus', icon: Mosque, path: '/about', color: '#d53f8c' },
  { label: 'Lokasi', desc: 'Temukan kami di Google Maps', icon: MapPin, path: '/about', color: '#dd6b20' },
];

const QuickAccessSection: React.FC = () => (
  <section className="section-pattern py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <ScrollReveal className="text-center mb-12">
        <p className="text-green-700 font-bold text-xs uppercase tracking-widest mb-2">Akses Cepat</p>
        <h2 className="text-3xl md:text-4xl font-black text-gray-800">
          Layanan Masjid Digital
        </h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto text-sm md:text-base">
          Semua informasi dan layanan masjid dalam satu platform yang mudah diakses.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickAccess.map((item, i) => (
          <ScrollReveal key={i} delay={i * 80}>
            <NavLink
              to={item.path}
              id={`quick-access-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              className="premium-card p-6 group block"
            >
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}12` }}
                >
                  <item.icon className="w-6 h-6" style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 mb-1 group-hover:text-green-700 transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                </div>
                <ChevronRight
                  className="w-4 h-4 text-gray-400 flex-shrink-0 group-hover:text-green-700 group-hover:translate-x-1 transition-all mt-1"
                />
              </div>
            </NavLink>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </section>
);

// ────────────────────────────────────────────────
// Today's Prayer Times Widget (Clean Design)
// ────────────────────────────────────────────────
const PrayerWidget: React.FC = () => {
  const { data: sholatList, isLoading, error } = useWaktuSholat();
  const currentTime = new Date();
  const nowStr = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });

  const checkIsActive = (prayerTimeStr: string): boolean => {
    const [pHour, pMin] = prayerTimeStr.split(':').map(Number);
    const [nHour, nMin] = nowStr.split(':').map(Number);
    const prayerMinutes = pHour * 60 + pMin;
    const nowMinutes = nHour * 60 + nMin;
    return nowMinutes >= prayerMinutes && nowMinutes <= (prayerMinutes + 10);
  };

  const list = (sholatList ?? []).map(s => ({
    ...s,
    is_active: checkIsActive(s.waktu)
  }));

  return (
    <section className="py-16 px-4 bg-white border-y border-gray-200 dark:bg-transparent dark:border-gray-800">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-10">
          <p className="text-green-700 font-bold text-xs uppercase tracking-widest mb-2">Hari Ini</p>
          <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100">Jadwal Waktu Sholat</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-xs md:text-sm">
            {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </ScrollReveal>

        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-green-700" />
          </div>
        ) : error ? (
          <div className="text-center text-red-500 text-sm py-4">Gagal memuat jadwal: {error}</div>
        ) : (
          <ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              {list.map((sholat, i) => (
                <div
                  key={i}
                  className={`prayer-card-clean text-center ${sholat.is_active ? 'active' : ''} ${
                    i === 4 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <div className="flex justify-center mb-3 text-green-700 dark:text-yellow-400" style={{ color: sholat.is_active ? '#ffffff' : undefined }}>
                    {getPrayerIcon(sholat.nama, "w-8 h-8")}
                  </div>
                  <p className="font-arabic text-base mb-1" style={{ color: sholat.is_active ? '#fde68a' : '#c09633' }}>
                    {sholat.nama_arab}
                  </p>
                  <p className="font-bold text-xs md:text-sm mb-1">{sholat.nama}</p>
                  <p className="text-2xl font-black">{sholat.waktu}</p>
                  {sholat.is_active && (
                    <span className="inline-block mt-2 px-2.5 py-0.5 bg-yellow-400/20 text-yellow-300 text-[10px] font-bold rounded-full uppercase tracking-wider">
                      Sekarang
                    </span>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal className="text-center mt-10">
          <NavLink
            to="/waktu-sholat"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-green-700 hover:text-green-800 transition-all border border-green-700/20 hover:bg-green-700/5 dark:text-green-400 dark:border-green-400/20 dark:hover:bg-green-400/5"
          >
            Lihat Detail Lengkap <ChevronRight className="w-4 h-4" />
          </NavLink>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────
// Next Jumat Schedule
// ────────────────────────────────────────────────
const NextJumatSection: React.FC = () => {
  const { data: jadwalList, isLoading } = useJadwalJumat();

  const nextJumat = useMemo(() => {
    if (!jadwalList) return null;
    return jadwalList.find((j) => j.status === 'today' || j.status === 'upcoming');
  }, [jadwalList]);

  if (isLoading || !nextJumat) return null;

  return (
    <section className="section-pattern py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal className="text-center mb-8">
          <p className="text-green-700 font-bold text-xs uppercase tracking-widest mb-2">Mendatang</p>
          <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100">Jadwal Sholat Jumat</h2>
        </ScrollReveal>

        <ScrollReveal>
          <div className="premium-card overflow-hidden">
            <div className="p-6 text-white text-center" style={{ background: 'linear-gradient(135deg, #115e3b, #0a3d25)' }}>
              <p className="font-arabic text-2xl text-yellow-300 mb-2">يَوْمُ الجُمُعَة</p>
              <p className="text-lg font-bold">{formatTanggal(nextJumat.tanggal)}</p>
              <span className={`inline-block mt-2.5 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                nextJumat.status === 'today' ? 'bg-yellow-400 text-gray-900' : 'bg-white/20 text-white'
              }`}>
                {nextJumat.status === 'today' ? '✦ Hari Ini' : 'Mendatang'}
              </span>
            </div>
            <div className="p-8 grid grid-cols-1 sm:grid-cols-3 gap-6" style={{ backgroundColor: 'var(--bg-card)', color: 'var(--color-text-main)' }}>
              {[
                { label: 'Imam', value: nextJumat.imam, icon: '🕌' },
                { label: 'Muadzin', value: nextJumat.muadzin, icon: '📢' },
                { label: 'Khotib', value: nextJumat.khotib, icon: '📖' },
              ].map((item) => (
                <div key={item.label} className="text-center border-b sm:border-b-0 sm:border-r last:border-0 pb-4 sm:pb-0" style={{ borderColor: 'var(--color-border-card)' }}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-[10px] font-bold uppercase tracking-wider mb-1.5" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
                  <p className="font-bold text-sm leading-tight px-2" style={{ color: 'var(--color-text-main)' }}>{item.value}</p>
                </div>
              ))}
            </div>
            <div className="p-5 text-center border-t" style={{ backgroundColor: 'var(--bg-summary-header)', borderColor: 'var(--color-border-card)' }}>
              <NavLink
                to="/jadwal-jumat"
                className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-bold text-sm transition-all"
              >
                Lihat Semua Jadwal <ChevronRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// ────────────────────────────────────────────────
// Verse of the Day
// ────────────────────────────────────────────────
const VerseSection: React.FC = () => (
  <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #070e19 0%, #0a3d25 100%)' }}>
    <div className="max-w-4xl mx-auto text-center">
      <ScrollReveal>
        <div className="glass-card p-8 md:p-14">
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest mb-6">Ayat Pilihan</p>
          <p className="font-arabic text-3xl md:text-5xl text-white leading-relaxed mb-8">
            إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا
          </p>
          <div className="w-16 h-0.5 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, transparent, #c09633, transparent)' }} />
          <p className="text-gray-300 text-base md:text-lg leading-relaxed italic mb-4 max-w-xl mx-auto">
            "Sesungguhnya shalat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman."
          </p>
          <p className="text-yellow-300 font-bold text-sm">QS. An-Nisa: 103</p>
        </div>
      </ScrollReveal>
    </div>
  </section>
);

// ────────────────────────────────────────────────
// Homepage Composite
// ────────────────────────────────────────────────
const HomePage: React.FC = () => {
  return (
    <main className="bg-[#f5f7fa] dark:bg-transparent min-h-screen">
      <HeroSection />
      <StatsSection />
      <QuickAccessSection />
      <PrayerWidget />
      <NextJumatSection />
      <VerseSection />
    </main>
  );
};

export default HomePage;
