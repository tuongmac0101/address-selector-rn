import { useCallback, useEffect, useMemo, useState } from 'react';
import type { District, Province, Ward } from '../types';

export interface UseAddressApiOptions {
  /** Danh sách tỉnh/thành khởi tạo (dùng khi offline/demo). Nếu không truyền sẽ dùng dummy. */
  initialProvinces?: Province[];
}

export interface UseAddressApiResult {
  /** Danh sách tỉnh/thành (đã map sang Province). */
  provinces: Province[];
  /** Cache quận/huyện theo mã tỉnh. */
  districtsByProvinceCode: Record<number, District[]>;
  /** Cache phường/xã theo mã quận/huyện. */
  wardsByDistrictCode: Record<number, Ward[]>;
  /** Cache phường/xã theo mã tỉnh (V2 - bỏ quận/huyện). */
  wardsByProvinceCode: Record<number, Ward[]>;
  /** Đang tải danh sách tỉnh. */
  loadingProvinces: boolean;
  /** Đang tải quận/huyện (khi gọi fetchDistricts). */
  loadingDistricts: boolean;
  /** Đang tải phường/xã (khi gọi fetchWards). */
  loadingWards: boolean;
  /** Lỗi khi gọi API (tỉnh). */
  error: Error | null;
  /** Gọi lại API lấy tỉnh. */
  refetchProvinces: () => Promise<void>;
  /** Lấy quận/huyện theo mã tỉnh (cache hoặc gọi API). */
  fetchDistricts: (provinceCode: number) => Promise<District[]>;
  /** Lấy phường/xã theo mã quận/huyện (cache hoặc gọi API). */
  fetchWards: (districtCode: number) => Promise<Ward[]>;
  /** Lấy phường/xã theo mã tỉnh (V2 - bỏ quận/huyện). */
  fetchWardsByProvince: (provinceCode: number) => Promise<Ward[]>;
}

function buildCachesFromProvinces(provinces: Province[]) {
  const districtsByProvinceCode: Record<number, District[]> = {};
  const wardsByDistrictCode: Record<number, Ward[]> = {};
  const wardsByProvinceCode: Record<number, Ward[]> = {};
  for (const p of provinces) {
    districtsByProvinceCode[p.code] = p.districts ?? [];
    const allWards: Ward[] = [];
    for (const d of p.districts ?? []) {
      wardsByDistrictCode[d.code] = d.wards ?? [];
      allWards.push(...(d.wards ?? []));
    }
    wardsByProvinceCode[p.code] = allWards;
  }
  return { districtsByProvinceCode, wardsByDistrictCode, wardsByProvinceCode };
}

export function useAddressApi(options: UseAddressApiOptions = {}): UseAddressApiResult {
  const { initialProvinces = [] } = options;

  const caches = useMemo(
    () => (initialProvinces.length > 0 ? buildCachesFromProvinces(initialProvinces) : null),
    [initialProvinces]
  );

  const [provinces, setProvinces] = useState<Province[]>(initialProvinces);
  const [districtsByProvinceCode, setDistrictsByProvinceCode] = useState<Record<number, District[]>>(
    () => caches?.districtsByProvinceCode ?? {}
  );
  const [wardsByDistrictCode, setWardsByDistrictCode] = useState<Record<number, Ward[]>>(
    () => caches?.wardsByDistrictCode ?? {}
  );
  const [wardsByProvinceCode, setWardsByProvinceCode] = useState<Record<number, Ward[]>>(
    () => caches?.wardsByProvinceCode ?? {}
  );
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (initialProvinces.length > 0) {
      const { districtsByProvinceCode: d, wardsByDistrictCode: wd, wardsByProvinceCode: wp } =
        buildCachesFromProvinces(initialProvinces);
      setProvinces(initialProvinces);
      setDistrictsByProvinceCode(d);
      setWardsByDistrictCode(wd);
      setWardsByProvinceCode(wp);
    }
  }, [initialProvinces]);

  const fetchProvinces = useCallback(async () => {
    if (initialProvinces.length > 0) return;
    setLoadingProvinces(true);
    setError(null);
    try {
      // TODO: gọi API thật khi có
      setProvinces([]);
    } catch (e) {
      setError(e instanceof Error ? e : new Error(String(e)));
      setProvinces([]);
    } finally {
      setLoadingProvinces(false);
    }
  }, [initialProvinces.length]);

  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  const fetchDistricts = useCallback(
    async (provinceCode: number): Promise<District[]> => {
      const cached = districtsByProvinceCode[provinceCode];
      if (cached?.length) return cached;
      if (caches) {
        return caches.districtsByProvinceCode[provinceCode] ?? [];
      }
      setLoadingDistricts(true);
      try {
        // TODO: gọi API thật
        return [];
      } catch {
        return [];
      } finally {
        setLoadingDistricts(false);
      }
    },
    [districtsByProvinceCode, caches]
  );

  const fetchWards = useCallback(
    async (districtCode: number): Promise<Ward[]> => {
      const cached = wardsByDistrictCode[districtCode];
      if (cached?.length) return cached;
      if (caches) {
        return caches.wardsByDistrictCode[districtCode] ?? [];
      }
      setLoadingWards(true);
      try {
        // TODO: gọi API thật
        return [];
      } catch {
        return [];
      } finally {
        setLoadingWards(false);
      }
    },
    [wardsByDistrictCode, caches]
  );

  const fetchWardsByProvince = useCallback(
    async (provinceCode: number): Promise<Ward[]> => {
      const cached = wardsByProvinceCode[provinceCode];
      if (cached?.length) return cached;
      if (caches) {
        return caches.wardsByProvinceCode[provinceCode] ?? [];
      }
      setLoadingWards(true);
      try {
        // TODO: gọi API thật
        return [];
      } catch {
        return [];
      } finally {
        setLoadingWards(false);
      }
    },
    [wardsByProvinceCode, caches]
  );

  return {
    provinces,
    districtsByProvinceCode,
    wardsByDistrictCode,
    wardsByProvinceCode,
    loadingProvinces,
    loadingDistricts,
    loadingWards,
    error,
    refetchProvinces: fetchProvinces,
    fetchDistricts,
    fetchWards,
    fetchWardsByProvince,
  };
}
