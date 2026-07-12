import React, { useState } from 'react';
import { SurahAPI, AyatAPI } from '../services/api';
import { useSurahList, useAyat } from '../hooks/useApi';
import { Search, BookOpen, MapPin, Hash, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

const SurahCard: React.FC<{ surah: SurahAPI; isSelected: boolean; onClick: () => void }> = ({ surah, isSelected, onClick }) => (
  <button
    id={`surah-${surah.nomor}`}
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer ${isSelected ? 'text-white shadow-md' : 'text-gray-700 dark:text-gray-300'}`}
    style={
      isSelected 
        ? { background: 'linear-gradient(135deg, #115e3b, #167a4d)' } 
        : { backgroundColor: 'transparent' }
    }
  >
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
        style={{ background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(17, 94, 59, 0.08)', color: isSelected ? 'white' : '#115e3b' }}>
        {surah.nomor}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-sm truncate" style={{ color: isSelected ? 'white' : 'var(--color-text-main)' }}>{surah.nama_latin}</p>
        <p className="text-[10px] font-semibold" style={{ color: isSelected ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)' }}>{surah.jumlah_ayat} ayat • {surah.tempat_turun}</p>
      </div>
      <p className="font-arabic text-lg flex-shrink-0" style={{ color: isSelected ? '#fde68a' : '#c09633' }}>{surah.nama}</p>
    </div>
  </button>
);

const AyatView: React.FC<{ surah: SurahAPI }> = ({ surah }) => {
  const { data: ayatList, isLoading, error } = useAyat(surah.nomor);

  return (
    <div className="animate-fade-in">
      {/* Header Surah */}
      <div className="rounded-2xl p-8 text-center text-white mb-6 shadow-md" style={{ background: 'linear-gradient(135deg, #115e3b, #0a3d25)' }}>
        <p className="font-arabic text-5xl text-yellow-300 mb-3">{surah.nama}</p>
        <h2 className="text-2xl font-black mb-1">{surah.nama_latin}</h2>
        <p className="text-green-200 text-xs font-semibold uppercase tracking-wider">{surah.arti}</p>
        <div className="flex items-center justify-center gap-4 mt-5 text-xs text-green-200/80 font-semibold">
          <span className="flex items-center gap-1"><Hash className="w-3.5 h-3.5" /> Surah {surah.nomor}</span>
          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {surah.tempat_turun}</span>
          <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> {surah.jumlah_ayat} Ayat</span>
        </div>
      </div>

      {surah.nomor !== 1 && surah.nomor !== 9 && (
        <div className="text-center py-5 mb-6 rounded-xl border" style={{ backgroundColor: 'rgba(17, 94, 59, 0.08)', borderColor: 'rgba(17, 94, 59, 0.15)' }}>
          <p className="font-arabic text-3xl" style={{ color: 'var(--color-primary-light)' }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
        </div>
      )}

      {isLoading && (
        <div className="text-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-green-700 mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-medium">Memuat ayat...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50/20 border border-red-200">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-600 text-sm font-medium">{error}</p>
        </div>
      )}

      {!isLoading && !error && ayatList.length === 0 && (
        <div className="text-center py-16">
          <p className="font-arabic text-4xl text-gray-300 mb-4">{surah.nama}</p>
          <p className="text-gray-500 text-sm font-semibold">Gagal memuat atau ayat tidak ditemukan.</p>
        </div>
      )}

      {!isLoading && ayatList.length > 0 && (
        <div className="space-y-0 rounded-2xl overflow-hidden premium-card">
          {ayatList.map((a: AyatAPI) => (
            <div key={a.nomor} className="quran-ayat px-6 py-6 border-b transition-colors" style={{ borderColor: 'var(--color-border-card)' }}>
              <div className="flex items-start gap-4">
                <div className="ayat-number flex-shrink-0 mt-1">{a.nomor}</div>
                <div className="flex-1">
                  <p className="font-arabic text-3xl text-right leading-relaxed mb-4" style={{ color: 'var(--color-text-main)' }}>{a.arab}</p>
                  <p className="text-sm leading-relaxed italic border-l-2 pl-3" style={{ borderColor: 'rgba(17,94,59,0.3)', color: 'var(--color-text-muted)' }}>{a.terjemahan}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AlQuranPage: React.FC = () => {
  const { data: surahList, isLoading: surahLoading, error: surahError } = useSurahList();
  const [selectedSurah, setSelectedSurah] = useState<SurahAPI | null>(null);
  const [search, setSearch] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const currentSurah = selectedSurah ?? surahList?.[0] ?? null;

  const filtered = (surahList ?? []).filter(
    (s) => s.nama_latin.toLowerCase().includes(search.toLowerCase()) || s.nama.includes(search) || s.arti.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen section-pattern pt-20">
      <div className="px-4 py-12 text-white text-center gradient-green">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <p className="font-arabic text-2xl text-yellow-300 mb-2">الْقُرْآنُ الْكَرِيم</p>
          <h1 className="text-3xl font-black">Baca Al-Qur'an</h1>
          <p className="text-green-200 text-sm mt-1">Membaca, memahami, dan merenungkan firman Allah SWT</p>
        </div>
      </div>

      <div className="lg:hidden px-4 py-3 border-b flex items-center justify-between" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-border-card)' }}>
        <button id="btn-toggle-sidebar" onClick={() => setShowSidebar(!showSidebar)} className="flex items-center gap-2 text-sm font-bold text-green-700 cursor-pointer">
          {showSidebar ? <ArrowLeft className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
          {showSidebar ? 'Baca Surah' : 'Daftar Surah'}
        </button>
        {!showSidebar && currentSurah && <span className="text-sm font-bold" style={{ color: 'var(--color-text-main)' }}>{currentSurah.nama_latin}</span>}
      </div>

      <div className="max-w-7xl mx-auto flex min-h-screen">
        {/* Sidebar */}
        <aside className={`${showSidebar ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-80 xl:w-96 border-r flex-shrink-0`}
          style={{ height: 'calc(100vh - 128px)', position: 'sticky', top: '80px', zIndex: 10, backgroundColor: 'var(--bg-card)', borderColor: 'var(--color-border-card)' }}>
          <div className="p-4 border-b" style={{ borderColor: 'var(--color-border-card)' }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                id="search-surah" 
                type="text" 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                placeholder="Cari surah..." 
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-green-600" 
                style={{ backgroundColor: 'var(--bg-app)', color: 'var(--color-text-main)', borderColor: 'var(--color-border-card)' }}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            {surahLoading && <div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin text-green-700 mx-auto" /></div>}
            {surahError && <p className="text-red-500 text-sm text-center py-4">{surahError}</p>}
            {filtered.map((surah) => (
              <SurahCard key={surah.nomor} surah={surah} isSelected={currentSurah?.nomor === surah.nomor}
                onClick={() => { setSelectedSurah(surah); setShowSidebar(false); }} />
            ))}
          </div>
        </aside>

        {/* Reader */}
        <div className={`${showSidebar ? 'hidden' : 'flex'} lg:flex flex-1 flex-col`}>
          <div className="flex-1 p-6 lg:p-10 max-w-3xl mx-auto w-full">
            {currentSurah ? <AyatView surah={currentSurah} /> : (
              <div className="text-center py-16 p-8 premium-card">
                <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>Pilih surah dari daftar untuk mulai membaca</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default AlQuranPage;
