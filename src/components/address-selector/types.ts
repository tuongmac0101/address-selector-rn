/**
 * Types cho đơn vị hành chính Việt Nam (API provinces.open-api.vn)
 */

export interface Ward {
  name: string;
  code: number;
  division_type: string;
  codename: string;
}

export interface District {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  wards: Ward[];
}

export interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: District[];
}

export type AddressStep = 'province' | 'district' | 'ward';

export interface SelectedAddress {
  province: Province | null;
  district: District | null;
  ward: Ward | null;
}

export interface AddressSelectionState {
  step: AddressStep;
  searchQuery: string;
  selected: SelectedAddress;
}
