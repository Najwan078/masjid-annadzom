import React, { useState, useEffect } from 'react';
import { useWaktuSholat } from '../hooks/useApi';
import { WaktuSholatAPI } from '../services/api';
import { MapPin, RefreshCw, Info, Loader2, Sunrise, Sun, SunDim, Sunset, MoonStar } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

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

const WaktuSholatPage: React.FC = () => {
  const { data: sholatList, isLoading, error, refetch } = useWaktuSholat();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  const nowStr = currentTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });

  const checkIsActive = (prayerTimeStr: string): boolean => {
    const [pHour, pMin] = prayerTimeStr.split(':').map(Number);
    const [nHour, nMin] = nowStr.split(':').map(Number);
    const prayerMinutes = pHour * 60 + pMin;
    const nowMinutes = nHour * 60 + nMin;
    return nowMinutes >= prayerMinutes && nowMinutes <= (prayerMinutes + 10);
  };

  const getNextPrayer = (): WaktuSholatAPI | null => {
    if (!sholatList || sholatList.length === 0) return null;
    const next = sholatList.find((s) => s.waktu > nowStr);
    return next ?? sholatList[0]; // Jika sudah lewat Isya, sholat berikutnya adalah Subuh
  };

  const nextPrayer = getNextPrayer();
  const list = (sholatList ?? []).map(s => ({
    ...s,
    is_active: checkIsActive(s.waktu)
  }));

  return (
    <main className="min-h-screen section-pattern pt-24 pb-16">
      {/* Page Header */}
      <div className="gradient-green py-16 px-4 mb-10 text-white text-center">
        <ScrollReveal className="max-w-4xl mx-auto">
          <p className="font-arabic text-yellow-300 text-2xl mb-3">أَوْقَاتُ الصَّلَاة</p>
          <h1 className="text-3xl md:text-5xl font-black mb-3">Jadwal Waktu Sholat</h1>
          <div className="flex items-center justify-center gap-2 text-green-200 text-sm">
            <MapPin className="w-4 h-4 text-yellow-400" />
            <span>Kota Bandung, Jawa Barat, Indonesia</span>
          </div>
        </ScrollReveal>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        {/* Live Clock Card (Premium & Clean) */}
        <ScrollReveal>
          <div className="premium-card p-8 text-center mb-8 rounded-3xl">
            <p className="text-sm font-semibold mb-2 uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>
              {currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-6xl md:text-7xl font-black tracking-tight mb-2" style={{ fontFeatureSettings: '"tnum"', color: 'var(--color-text-main)' }}>
              {formatTime(currentTime)}
            </p>
            {nextPrayer && (
              <div className="inline-block px-4 py-1.5 rounded-full font-semibold text-xs border"
                style={{ backgroundColor: 'rgba(17, 94, 59, 0.08)', color: 'var(--color-primary-light)', borderColor: 'rgba(17, 94, 59, 0.2)' }}>
                Sholat berikutnya: <span className="font-bold">{nextPrayer.nama} ({nextPrayer.waktu})</span>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* Loading State */}
        {isLoading && (
          <div className="premium-card p-12 text-center rounded-2xl mb-8">
            <Loader2 className="w-8 h-8 animate-spin text-green-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Memuat jadwal waktu sholat...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <ScrollReveal>
            <div className="premium-card p-6 mb-8 rounded-2xl flex items-center gap-3 border-l-4 border-red-500">
              <Info className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
              <button onClick={refetch} className="ml-auto px-4 py-2 text-xs text-white font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors shadow">Coba Lagi</button>
            </div>
          </ScrollReveal>
        )}

        {/* Prayer Cards Grid (Modern Theme) */}
        {!isLoading && list.length > 0 && (
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-8">
              {list.map((sholat, i) => (
                <div
                  key={i}
                  id={`prayer-${sholat.nama.toLowerCase()}`}
                  className={`prayer-card-clean text-center ${sholat.is_active ? 'active scale-105' : ''}`}
                >
                  <div className="flex justify-center mb-4 text-green-700 dark:text-yellow-400" style={{ color: sholat.is_active ? '#ffffff' : undefined }}>
                    {getPrayerIcon(sholat.nama, "w-10 h-10")}
                  </div>
                  <p className="font-arabic text-lg mb-1 leading-tight" style={{ color: sholat.is_active ? '#fde68a' : '#c09633' }}>
                    {sholat.nama_arab}
                  </p>
                  <p className={`font-semibold text-xs md:text-sm mb-2 ${sholat.is_active ? 'text-white' : 'text-gray-500'}`}>
                    {sholat.nama}
                  </p>
                  <p className="text-2xl font-black">
                    {sholat.waktu}
                  </p>
                  {sholat.is_active && (
                    <div className="mt-3 flex items-center justify-center gap-1.5">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
                      <span className="text-yellow-300 text-[10px] font-bold uppercase tracking-wider">Sekarang</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Summary List Card */}
        {!isLoading && list.length > 0 && (
          <ScrollReveal delay={200}>
            <div className="premium-card rounded-2xl overflow-hidden mb-6">
              <div className="p-5 border-b flex items-center gap-2" style={{ backgroundColor: 'var(--bg-summary-header)', borderColor: 'var(--color-border-card)' }}>
                <Info className="w-4 h-4 text-green-700" />
                <h2 className="font-bold text-sm" style={{ color: 'var(--color-text-main)' }}>Ringkasan Waktu Sholat</h2>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--color-border-card)' }}>
                {list.map((sholat, i) => (
                  <div key={i} 
                    className="flex items-center justify-between px-6 py-4 transition-colors"
                    style={{ 
                      backgroundColor: sholat.is_active ? 'rgba(17, 94, 59, 0.08)' : 'transparent',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-green-700 dark:text-yellow-400" style={{ color: sholat.is_active ? 'var(--color-primary-light)' : undefined }}>
                        {getPrayerIcon(sholat.nama, "w-5 h-5")}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: 'var(--color-text-main)' }}>{sholat.nama}</p>
                        <p className="font-arabic text-xs" style={{ color: '#c09633' }}>{sholat.nama_arab}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-lg" style={{ color: sholat.is_active ? 'var(--color-primary-light)' : 'var(--color-text-main)' }}>{sholat.waktu}</p>
                      {sholat.is_active && <span className="font-bold text-xs" style={{ color: 'var(--color-primary-light)' }}>● Aktif</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Keterangan */}
        <ScrollReveal delay={250}>
          <div className="premium-card px-5 py-4 rounded-xl flex items-start gap-3">
            <RefreshCw className="w-4 h-4 text-green-700 mt-0.5 flex-shrink-0" />
            <p className="text-xs leading-relaxed font-medium" style={{ color: 'var(--color-text-muted)' }}>
              Jadwal waktu sholat bersumber dari database masjid. Waktu dapat berbeda ±2 menit dari jadwal resmi Kementerian Agama RI.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
};

export default WaktuSholatPage;
