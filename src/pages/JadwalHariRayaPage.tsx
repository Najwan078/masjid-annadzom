import React, { useState } from 'react';
import { JadwalHariRayaAPI } from '../services/api';
import { useHariRaya } from '../hooks/useApi';
import { Star, CalendarDays, Users, Mic2, Loader2, AlertCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const formatTanggal = (iso: string): string =>
  new Date(iso).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

const HariRayaCard: React.FC<{ data: JadwalHariRayaAPI; index: number }> = ({ data, index }) => {
  const isFitri = data.jenis_hari_raya === 'Idul Fitri';
  return (
    <div className="premium-card overflow-hidden animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="h-2" style={{ background: isFitri ? 'linear-gradient(90deg, #115e3b, #167a4d)' : 'linear-gradient(90deg, #c09633, #d6ad4c)' }} />
      <div className="px-6 py-8 text-center text-white relative overflow-hidden" style={{ background: isFitri ? 'linear-gradient(135deg, #115e3b 0%, #0a3d25 100%)' : 'linear-gradient(135deg, #a37f2a 0%, #705416 100%)' }}>
        <div className="absolute top-3 right-4 opacity-15"><Star className="w-16 h-16" /></div>
        <p className="font-arabic text-3xl mb-3 text-yellow-200">{isFitri ? 'عِيدُ الفِطْر' : 'عِيدُ الأَضْحَى'}</p>
        <h2 className="text-xl font-black mb-2">{data.jenis_hari_raya} {data.tahun} M</h2>
        <p className="text-sm opacity-90">{formatTanggal(data.tanggal)}</p>
      </div>
      <div className="p-6 space-y-4" style={{ backgroundColor: 'var(--bg-card)' }}>
        {[
          { icon: <Users className="w-4 h-4 text-green-700" />, label: 'Imam', value: data.imam, bg: 'rgba(17, 94, 59, 0.08)' },
          { icon: <Mic2 className="w-4 h-4 text-yellow-600" />, label: 'Khotib', value: data.khotib, bg: 'rgba(192, 150, 51, 0.08)' },
          { icon: <CalendarDays className="w-4 h-4 text-blue-600" />, label: 'Lokasi', value: data.lokasi, bg: 'rgba(43, 108, 176, 0.08)' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
              {item.icon}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-text-muted)' }}>{item.label}</p>
              <p className="font-bold text-sm leading-tight" style={{ color: 'var(--color-text-main)' }}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-6 pb-6" style={{ backgroundColor: 'var(--bg-card)' }}>
        <div className={`text-center px-4 py-2.5 rounded-lg text-xs font-bold ${
          new Date(data.tanggal) < new Date()
            ? 'bg-gray-100/50 text-gray-500 border border-gray-200'
            : isFitri 
              ? 'bg-green-50/20 text-green-600 border border-green-700/20' 
              : 'bg-yellow-50/20 text-yellow-600 border border-yellow-700/20'
        }`}>
          {new Date(data.tanggal) < new Date() ? '✓ Telah Dilaksanakan' : '⧖ Akan Datang'}
        </div>
      </div>
    </div>
  );
};

const JadwalHariRayaPage: React.FC = () => {
  const { data: hariRayaList, isLoading, error, refetch } = useHariRaya();
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [selectedJenis, setSelectedJenis] = useState<'all' | 'Idul Fitri' | 'Idul Adha'>('all');

  const years = [...new Set((hariRayaList ?? []).map((j) => j.tahun))].sort((a, b) => b - a);

  const filtered = (hariRayaList ?? []).filter((j) => {
    const matchYear = selectedYear === 'all' || j.tahun === selectedYear;
    const matchJenis = selectedJenis === 'all' || j.jenis_hari_raya === selectedJenis;
    return matchYear && matchJenis;
  });

  return (
    <main className="min-h-screen section-pattern pt-24 pb-16">
      {/* Page Header */}
      <div className="gradient-green py-16 px-4 mb-10 text-white text-center">
        <ScrollReveal className="max-w-4xl mx-auto">
          <p className="font-arabic text-yellow-300 text-2xl mb-3">عِيدٌ مُبَارَك</p>
          <h1 className="text-3xl md:text-5xl font-black mb-3">Jadwal Hari Raya</h1>
          <p className="text-green-200 text-sm md:text-base max-w-xl mx-auto">
            Informasi lengkap Sholat Idul Fitri dan Idul Adha Masjid An-Nadzom
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Filter Bar */}
        <ScrollReveal>
          <div className="premium-card p-4 mb-8 flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Filter Tahun</label>
                <select id="filter-tahun-hariraya" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))} className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-green-600 cursor-pointer min-w-[140px]" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--color-text-main)', borderColor: 'var(--color-border-card)' }}>
                  <option value="all">Semua Tahun</option>
                  {years.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Filter Jenis</label>
                <select id="filter-jenis-hariraya" value={selectedJenis} onChange={(e) => setSelectedJenis(e.target.value as typeof selectedJenis)} className="px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-green-600 cursor-pointer min-w-[160px]" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--color-text-main)', borderColor: 'var(--color-border-card)' }}>
                  <option value="all">Semua Hari Raya</option>
                  <option value="Idul Fitri">Idul Fitri</option>
                  <option value="Idul Adha">Idul Adha</option>
                </select>
              </div>
            </div>
            <div className="sm:ml-auto text-right">
              <span className="inline-block px-3 py-1.5 rounded-full border text-xs font-bold"
                style={{ backgroundColor: 'rgba(17, 94, 59, 0.08)', borderColor: 'rgba(17, 94, 59, 0.2)', color: 'var(--color-primary-light)' }}>
                {filtered.length} Jadwal Ditemukan
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Error State */}
        {error && (
          <ScrollReveal>
            <div className="premium-card p-6 mb-6 flex items-center gap-3 border-l-4 border-red-500">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
              <button onClick={refetch} className="ml-auto px-4 py-2 text-xs text-white font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors shadow">Coba Lagi</button>
            </div>
          </ScrollReveal>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="premium-card p-12 text-center rounded-2xl">
            <Loader2 className="w-8 h-8 animate-spin text-green-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm font-medium">Memuat jadwal hari raya...</p>
          </div>
        )}

        {/* Cards Grid */}
        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <ScrollReveal className="col-span-full">
                <div className="premium-card p-12 text-center rounded-2xl">
                  <Star className="w-10 h-10 text-gray-300 mx-auto mb-3 animate-pulse" />
                  <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>Tidak ada jadwal hari raya ditemukan</p>
                </div>
              </ScrollReveal>
            ) : (
              filtered.map((hariRaya, idx) => (
                <ScrollReveal key={hariRaya.id} delay={idx * 80}>
                  <HariRayaCard data={hariRaya} index={idx} />
                </ScrollReveal>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default JadwalHariRayaPage;
