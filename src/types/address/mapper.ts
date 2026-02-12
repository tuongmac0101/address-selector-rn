/**
 * Map DTO từ provinces.open-api.vn sang type dùng trong Address Selector.
 */
import { District, Province, Ward } from '../../components/address-selector/types';
import type { ProvinceDto, ProvinceDtoV2, DistrictDto, WardDto, WardDtoV2 } from './types';
/** V1: WardDto → Ward (view). */
export function mapWardDtoToWard(d: WardDto): Ward {
  return {
    name: d.name,
    code: d.code,
    division_type: d.division_type,
    codename: d.codename,
  };
}

/** V2: WardDtoV2 → Ward (view). */
export function mapWardDtoV2ToWard(d: WardDtoV2): Ward {
  return {
    name: d.name,
    code: d.code,
    division_type: d.division_type,
    codename: d.codename,
  };
}

export function mapDistrictDtoToDistrict(d: DistrictDto): District {
  return {
    name: d.name,
    code: d.code,
    division_type: d.division_type,
    codename: d.codename,
    wards: (d.wards ?? []).map(mapWardDtoToWard),
  };
}

/** V1: ProvinceDto → Province (view). */
export function mapProvinceDtoToProvince(p: ProvinceDto): Province {
  return {
    name: p.name,
    code: p.code,
    division_type: p.division_type,
    codename: p.codename,
    phone_code: p.phone_code,
    districts: (p.districts ?? []).map(mapDistrictDtoToDistrict),
  };
}

/** V2: ProvinceDtoV2 → Province (view, districts rỗng). */
export function mapProvinceDtoV2ToProvince(p: ProvinceDtoV2): Province {
  return {
    name: p.name,
    code: p.code,
    division_type: p.division_type,
    codename: p.codename,
    phone_code: p.phone_code,
    districts: [],
  };
}
