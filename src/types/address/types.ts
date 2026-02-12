/**
 * DTO từ API provinces.open-api.vn
 * @see https://provinces.open-api.vn/api/
 */


export interface ProvinceDto {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts?: DistrictDto[];
}

/** District từ API - có thể kèm wards khi gọi /d/{code}. */
export interface DistrictDto {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards?: WardDto[];
}

/** Ward từ API. */
export interface WardDto {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
}

/** Province V2 - tỉnh có wards trực tiếp (bỏ quận/huyện). */
export interface ProvinceDtoV2 {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  wards: WardDtoV2[];
}

/** Ward V2 - phường/xã trực thuộc tỉnh. */
export interface WardDtoV2 {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
}

