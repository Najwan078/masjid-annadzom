import { useState, useEffect, useCallback } from 'react';
import {
  jadwalJumatApi, JadwalJumatAPI,
  hariRayaApi, JadwalHariRayaAPI,
  waktuSholatApi, WaktuSholatAPI,
  pengurusApi, PengurusAPI,
  alQuranApi, SurahAPI, AyatAPI,
} from '../services/api';

// ─────────────────────────────────────────────────────────
// Generic API Hook
// ─────────────────────────────────────────────────────────

interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApiData<T>(fetcher: () => Promise<T>): ApiState<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// ─────────────────────────────────────────────────────────
// Custom Hooks per feature
// ─────────────────────────────────────────────────────────

export const useJadwalJumat = () =>
  useApiData<JadwalJumatAPI[]>(jadwalJumatApi.getAll);

export const useHariRaya = () =>
  useApiData<JadwalHariRayaAPI[]>(hariRayaApi.getAll);

export const useWaktuSholat = () =>
  useApiData<WaktuSholatAPI[]>(waktuSholatApi.getAll);

export const usePengurus = () =>
  useApiData<PengurusAPI[]>(pengurusApi.getAll);

export const useSurahList = () =>
  useApiData<SurahAPI[]>(alQuranApi.getSurahList);

export const useAyat = (surahNomor: number) => {
  const [data, setData] = useState<AyatAPI[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAyat = useCallback(async () => {
    if (!surahNomor) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await alQuranApi.getAyat(surahNomor);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat ayat');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, [surahNomor]);

  useEffect(() => {
    fetchAyat();
  }, [fetchAyat]);

  return { data, isLoading, error, refetch: fetchAyat };
};
