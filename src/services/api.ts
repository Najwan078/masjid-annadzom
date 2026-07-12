// ─────────────────────────────────────────────────────────
// HTTP Client — Masjid An-Nadzom API Service
// Base URL: /api  (diproxy ke FastAPI :8000 via Vite)
// ─────────────────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

// ── Token Management ─────────────────────────────────────

export const getToken = (): string | null =>
  localStorage.getItem('masjid_token');

export const setToken = (token: string): void =>
  localStorage.setItem('masjid_token', token);

export const removeToken = (): void =>
  localStorage.removeItem('masjid_token');

// ── Core Fetch Wrapper ────────────────────────────────────

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    removeToken();
    localStorage.removeItem('masjid_user');
    window.location.href = '/login';
    throw new Error('Sesi berakhir. Silakan login kembali.');
  }

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody?.detail ?? `Request gagal: ${response.status}`);
  }

  // 204 No Content
  if (response.status === 204) return undefined as T;

  return response.json() as Promise<T>;
}

// ── Auth ──────────────────────────────────────────────────

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user_name: string;
  user_role: string;
}

export const authApi = {
  login: (username: string, password: string) =>
    apiFetch<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  me: () => apiFetch<{ id: number; username: string; name: string; role: string }>('/auth/me'),
};

// ── Jadwal Jumat ──────────────────────────────────────────

export interface JadwalJumatAPI {
  id: number;
  tanggal: string;
  imam: string;
  muadzin: string;
  khotib: string;
  status: 'upcoming' | 'completed' | 'today';
}

export const jadwalJumatApi = {
  getAll: () => apiFetch<JadwalJumatAPI[]>('/jadwal-jumat'),
  getById: (id: number) => apiFetch<JadwalJumatAPI>(`/jadwal-jumat/${id}`),
  create: (data: Omit<JadwalJumatAPI, 'id'>) =>
    apiFetch<JadwalJumatAPI>('/jadwal-jumat', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Omit<JadwalJumatAPI, 'id'>>) =>
    apiFetch<JadwalJumatAPI>(`/jadwal-jumat/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch<void>(`/jadwal-jumat/${id}`, { method: 'DELETE' }),
};

// ── Jadwal Hari Raya ──────────────────────────────────────

export interface JadwalHariRayaAPI {
  id: number;
  tahun: number;
  jenis_hari_raya: 'Idul Fitri' | 'Idul Adha';
  tanggal: string;
  imam: string;
  khotib: string;
  lokasi: string;
}

export const hariRayaApi = {
  getAll: () => apiFetch<JadwalHariRayaAPI[]>('/hari-raya'),
  getById: (id: number) => apiFetch<JadwalHariRayaAPI>(`/hari-raya/${id}`),
  create: (data: Omit<JadwalHariRayaAPI, 'id'>) =>
    apiFetch<JadwalHariRayaAPI>('/hari-raya', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Omit<JadwalHariRayaAPI, 'id'>>) =>
    apiFetch<JadwalHariRayaAPI>(`/hari-raya/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch<void>(`/hari-raya/${id}`, { method: 'DELETE' }),
};

// ── Waktu Sholat ──────────────────────────────────────────

export interface WaktuSholatAPI {
  id: number;
  nama: string;
  nama_arab: string;
  waktu: string;
  is_active: boolean;
  icon: string;
}

export const waktuSholatApi = {
  getAll: () => apiFetch<WaktuSholatAPI[]>('/waktu-sholat'),
  update: (id: number, data: { waktu?: string; is_active?: boolean }) =>
    apiFetch<WaktuSholatAPI>(`/waktu-sholat/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
};

// ── Pengurus ──────────────────────────────────────────────

export interface PengurusAPI {
  id: number;
  nama: string;
  jabatan: string;
  periode: string;
  foto?: string;
}

export const pengurusApi = {
  getAll: () => apiFetch<PengurusAPI[]>('/pengurus'),
  getById: (id: number) => apiFetch<PengurusAPI>(`/pengurus/${id}`),
  create: (data: Omit<PengurusAPI, 'id'>) =>
    apiFetch<PengurusAPI>('/pengurus', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: Partial<Omit<PengurusAPI, 'id'>>) =>
    apiFetch<PengurusAPI>(`/pengurus/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) =>
    apiFetch<void>(`/pengurus/${id}`, { method: 'DELETE' }),
};

// ── Al-Qur'an ─────────────────────────────────────────────

export interface SurahAPI {
  id: number;
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: 'Makkiyah' | 'Madaniyah';
  arti: string;
}

export interface AyatAPI {
  id: number;
  surah_nomor: number;
  nomor: number;
  arab: string;
  terjemahan: string;
}

export const alQuranApi = {
  getSurahList: async (): Promise<SurahAPI[]> => {
    const res = await fetch('https://equran.id/api/v2/surat');
    if (!res.ok) throw new Error('Gagal memuat daftar surah online.');
    const json = await res.json();
    return json.data.map((s: any) => ({
      id: s.nomor,
      nomor: s.nomor,
      nama: s.nama,
      nama_latin: s.namaLatin,
      jumlah_ayat: s.jumlahAyat,
      tempat_turun: s.tempatTurun === 'Mekah' ? 'Makkiyah' : 'Madaniyah',
      arti: s.arti,
    })) as SurahAPI[];
  },

  getSurah: async (nomor: number): Promise<SurahAPI> => {
    const res = await fetch(`https://equran.id/api/v2/surat/${nomor}`);
    if (!res.ok) throw new Error('Gagal memuat detail surah online.');
    const json = await res.json();
    const s = json.data;
    return {
      id: s.nomor,
      nomor: s.nomor,
      nama: s.nama,
      nama_latin: s.namaLatin,
      jumlah_ayat: s.jumlahAyat,
      tempat_turun: s.tempatTurun === 'Mekah' ? 'Makkiyah' : 'Madaniyah',
      arti: s.arti,
    } as SurahAPI;
  },

  getAyat: async (surahNomor: number): Promise<AyatAPI[]> => {
    const res = await fetch(`https://equran.id/api/v2/surat/${surahNomor}`);
    if (!res.ok) throw new Error('Gagal memuat ayat online.');
    const json = await res.json();
    return json.data.ayat.map((a: any) => ({
      id: a.nomorAyat,
      surah_nomor: surahNomor,
      nomor: a.nomorAyat,
      arab: a.teksArab,
      terjemahan: a.teksIndonesia,
    })) as AyatAPI[];
  },
};
