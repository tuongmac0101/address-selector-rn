import { useCallback, useEffect, useMemo, useState } from 'react';
import { matchVietnameseSearch } from '../helpers/normalizeVietnamese';
import { useAddressApi } from './useAddressApi';
import type { AddressStep, District, Province, SelectedAddress, Ward } from '../types';

const STEPS: AddressStep[] = ['province', 'district', 'ward'];

export interface UseAddressSelectionOptions {
  /** Nguồn tỉnh (dùng khi không set apiVersion). Mặc định dummy. */
  provinces?: Province[];
  /** Callback khi chọn xong địa chỉ (đủ 3 cấp). */
  onComplete?: (address: SelectedAddress) => void;
}

export function useAddressSelection(options: UseAddressSelectionOptions = {}) {
  const { provinces: provincesFromOptions, onComplete } = options;

  const api = useAddressApi({ initialProvinces: provincesFromOptions ?? [] });

  const provinces = api.provinces;
  const steps = STEPS;
  const [step, setStep] = useState<AddressStep>('province');
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<SelectedAddress>({
    province: null,
    district: null,
    ward: null,
  });

  useEffect(() => {
    if (!selected.province) return;
    if (step === 'district') api.fetchDistricts(selected.province.code);
    if (step === 'ward') {
      api.fetchWardsByProvince(selected.province.code);
    }
  }, [step, selected.province?.code]);

  useEffect(() => {
    if (!selected.district) return;
    if (step === 'ward') api.fetchWards(selected.district.code);
  }, [step, selected.district?.code]);

  const stepIndex = steps.indexOf(step);
  const canGoBack = stepIndex > 0;
  const isComplete =
    step === 'ward' &&
    selected.province &&
    selected.ward &&
    selected.district;

  const goBack = useCallback(() => {
    if (!canGoBack) return;
    const prevStep = steps[stepIndex - 1];
    setStep(prevStep);
    setSearchQuery('');
    setSelected((prev) => {
      const next = { ...prev };
      if (prevStep === 'province') {
        next.province = null;
        next.district = null;
        next.ward = null;
      } else if (prevStep === 'district') {
        next.district = null;
        next.ward = null;
      } else {
        next.ward = null;
      }
      return next;
    });
  }, [canGoBack, stepIndex, steps]);

  const reset = useCallback(() => {
    setStep('province');
    setSearchQuery('');
    setSelected({ province: null, district: null, ward: null });
  }, []);

  /** Chuyển bước (tap breadcrumb): chỉ đổi danh sách hiển thị, xóa các cấp dưới. */
  const goToStep = useCallback((targetStep: AddressStep) => {
    setStep(targetStep);
    setSearchQuery('');
    setSelected((prev) => {
      const next = { ...prev };
      if (targetStep === 'province') {
        next.district = null;
        next.ward = null;
      } else if (targetStep === 'district') {
        next.ward = null;
      }
      return next;
    });
  }, []);

  const selectProvince = useCallback(
    (p: Province) => {
      setSelected((prev) => ({
        ...prev,
        province: p,
        district: null,
        ward: null,
      }));
      setSearchQuery('');
      setStep('ward');
      api.fetchWardsByProvince(p.code);
    },
    [api]
  );

  const selectDistrict = useCallback(
    (d: District) => {
      setSelected((prev) => ({
        ...prev,
        district: d,
        ward: null,
      }));
      setStep('ward');
      setSearchQuery('');
      api.fetchWards(d.code);
    },
    [api]
  );

  const selectWard = useCallback(
    (w: Ward) => {
      setSearchQuery('');
      setSelected((prev) => {
        const final: SelectedAddress = { ...prev, ward: w };
        onComplete?.(final);
        return final;
      });
    },
    [onComplete]
  );

  const listProvince = useMemo(() => {
    return provinces.filter((p) => matchVietnameseSearch(p.name, searchQuery));
  }, [provinces, searchQuery]);

  const listDistrict = useMemo(() => {
    if (!selected.province) return [];
    const list = api.districtsByProvinceCode[selected.province.code] ?? [];
    return list.filter((d) => matchVietnameseSearch(d.name, searchQuery));
  }, [selected.province, api.districtsByProvinceCode, searchQuery]);

  const listWard = useMemo(() => {
    if (!selected.province) return [];
    const list = api.wardsByProvinceCode[selected.province.code] ?? [];
    return list.filter((w) => matchVietnameseSearch(w.name, searchQuery));
  }, [selected.province, api.wardsByProvinceCode, searchQuery]);

  const currentList = useMemo(() => {
    if (step === 'province') return listProvince;
    if (step === 'district') return listDistrict;
    return listWard;
  }, [step, listProvince, listDistrict, listWard]);

  const stepTitle = useMemo(() => {
    if (step === 'province') return 'Chọn Tỉnh / Thành phố';
    if (step === 'district') return 'Chọn Quận / Huyện';
    return 'Chọn Phường / Xã';
  }, [step]);

  return {
    step,
    stepTitle,
    stepIndex,
    searchQuery,
    setSearchQuery,
    selected,
    canGoBack,
    goBack,
    reset,
    goToStep,
    isComplete,
    currentList,
    selectProvince,
    selectDistrict,
    selectWard,
    listProvince,
    listDistrict,
    listWard,
    loadingProvinces: api.loadingProvinces,
    loadingDistricts: api.loadingDistricts,
    loadingWards: api.loadingWards,
    error: api.error,
    refetchProvinces: api.refetchProvinces,
  };
}
