import React, { useState } from 'react';
import { JadwalJumatAPI } from '../services/api';
import { useJadwalJumat } from '../hooks/useApi';
import { Calendar, Search, Filter, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const formatTanggal = (iso: string): string =>
  new Date(iso).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

const StatusBadge: React.FC<{ status: JadwalJumatAPI['status'] }> = ({ status }) => {
  const config = {
    today:     { label: '✦ Hari Ini', cls: 'badge-premium-today' },
    upcoming:  { label: 'Mendatang',  cls: 'badge-premium-upcoming' },
    completed: { label: 'Selesai',    cls: 'badge-premium-completed' },
  };
  const { label, cls } = config[status];
  return (
    <span className={`badge-premium ${cls}`}>
      {label}
    </span>
  );
};

const JadwalJumatPage: React.FC = () => {
  const { data: jadwalList, isLoading, error, refetch } = useJadwalJumat();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | JadwalJumatAPI['status']>('all');

  const filtered = (jadwalList ?? []).filter((j) => {
    const q = search.toLowerCase();
    const matchSearch =
      j.imam.toLowerCase().includes(q) ||
      j.khotib.toLowerCase().includes(q) ||
      j.muadzin.toLowerCase().includes(q) ||
      j.tanggal.includes(q);
    const matchStatus = filterStatus === 'all' || j.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <main className="min-h-screen section-pattern pt-24 pb-16">
      {/* Page Header */}
      <div className="gradient-green py-16 px-4 mb-10 text-white text-center">
        <ScrollReveal className="max-w-4xl mx-auto">
          <p className="font-arabic text-yellow-300 text-2xl mb-3">صَلَاةُ الجُمُعَة</p>
          <h1 className="text-3xl md:text-5xl font-black mb-3">Jadwal Sholat Jumat</h1>
          <p className="text-green-200 text-sm md:text-base max-w-xl mx-auto">
            Daftar lengkap jadwal Imam, Muadzin, dan Khotib Sholat Jumat Masjid An-Nadzom
          </p>
        </ScrollReveal>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Filter Bar */}
        <ScrollReveal>
          <div className="premium-card p-4 mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                id="search-jadwal-jumat"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari imam, khotib, muadzin..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-green-600 transition-colors"
                style={{ backgroundColor: 'var(--bg-app)', color: 'var(--color-text-main)', borderColor: 'var(--color-border-card)' }}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                id="filter-status-jumat"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)}
                className="pl-10 pr-10 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-green-600 appearance-none cursor-pointer min-w-[160px]"
                style={{ backgroundColor: 'var(--bg-app)', color: 'var(--color-text-main)', borderColor: 'var(--color-border-card)' }}
              >
                <option value="all">Semua Status</option>
                <option value="today">Hari Ini</option>
                <option value="upcoming">Mendatang</option>
                <option value="completed">Selesai</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </ScrollReveal>

        {/* Error State */}
        {error && (
          <ScrollReveal>
            <div className="premium-card p-6 mb-6 flex items-center gap-3 border-l-4 border-red-500">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <div>
                <p className="text-red-700 font-bold">Gagal memuat data</p>
                <p className="text-red-500 text-xs mt-0.5">{error}</p>
              </div>
              <button onClick={refetch} className="ml-auto px-4 py-2 text-xs text-white font-bold rounded-lg bg-red-600 hover:bg-red-700 transition-colors shadow">
                Coba Lagi
              </button>
            </div>
          </ScrollReveal>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="premium-card p-12 text-center rounded-2xl">
            <Loader2 className="w-8 h-8 animate-spin text-green-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm font-medium">Memuat jadwal dari server...</p>
          </div>
        )}

        {/* Summary Chips */}
        {!isLoading && !error && (
          <ScrollReveal className="flex gap-3 mb-6 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl border"
              style={{ backgroundColor: 'rgba(17, 94, 59, 0.08)', borderColor: 'rgba(17, 94, 59, 0.2)', color: 'var(--color-primary-light)' }}>
              <Calendar className="w-4 h-4 text-green-700" />
              <span className="text-xs font-bold">{filtered.length} Jadwal Ditemukan</span>
            </div>
          </ScrollReveal>
        )}

        {/* Table (Premium Styled) */}
        {!isLoading && !error && (
          <ScrollReveal delay={100}>
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table-premium">
                  <thead>
                    <tr>
                      {['No', 'Tanggal', 'Imam', 'Muadzin', 'Khotib', 'Status'].map((col) => (
                        <th key={col} className="px-5 py-4 text-left text-white text-xs font-bold tracking-wider">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-5 py-12 text-center text-gray-400">
                          <div className="flex flex-col items-center gap-3">
                            <Calendar className="w-10 h-10 text-gray-300" />
                            <p className="text-sm font-medium">Tidak ada jadwal yang cocok</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filtered.map((jadwal, idx) => (
                        <tr key={jadwal.id} className={`transition-colors ${jadwal.status === 'today' ? 'bg-yellow-50/50' : 'hover:bg-gray-50/50'}`}>
                          <td className="px-5 py-4 text-gray-500 text-xs w-12 font-bold">{idx + 1}</td>
                          <td className="px-5 py-4">
                            <p className="font-bold text-gray-800 text-sm">{formatTanggal(jadwal.tanggal)}</p>
                          </td>
                          <td className="px-5 py-4 text-gray-700 text-sm font-medium">{jadwal.imam}</td>
                          <td className="px-5 py-4 text-gray-700 text-sm">{jadwal.muadzin}</td>
                          <td className="px-5 py-4 text-gray-800 text-sm font-bold">{jadwal.khotib}</td>
                          <td className="px-5 py-4"><StatusBadge status={jadwal.status} /></td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        )}

        <p className="text-center text-gray-400 text-xs mt-8 font-medium">
          * Jadwal dapat berubah sewaktu-waktu. Silakan konfirmasi kepada pengurus masjid.
        </p>
      </div>
    </main>
  );
};

export default JadwalJumatPage;
