import type { Province, District, Ward } from '../types';

/**
 * Dummy data đơn vị hành chính (cấu trúc giống API provinces.open-api.vn).
 * Dùng khi offline hoặc để demo.
 */
const dummyWardsHCMQuan1: Ward[] = [
  { name: 'Phường Bến Nghé', code: 26734, division_type: 'phường', codename: 'phuong_ben_nghe' },
  { name: 'Phường Bến Thành', code: 26737, division_type: 'phường', codename: 'phuong_ben_thanh' },
  { name: 'Phường Cầu Kho', code: 26740, division_type: 'phường', codename: 'phuong_cau_kho' },
  { name: 'Phường Cầu Ông Lãnh', code: 26743, division_type: 'phường', codename: 'phuong_cau_ong_lanh' },
  { name: 'Phường Cô Giang', code: 26746, division_type: 'phường', codename: 'phuong_co_giang' },
  { name: 'Phường Đa Kao', code: 26749, division_type: 'phường', codename: 'phuong_da_kao' },
  { name: 'Phường Nguyễn Thái Bình', code: 26752, division_type: 'phường', codename: 'phuong_nguyen_thai_binh' },
  { name: 'Phường Phạm Ngũ Lão', code: 26755, division_type: 'phường', codename: 'phuong_pham_ngu_lao' },
  { name: 'Phường Tân Định', code: 26758, division_type: 'phường', codename: 'phuong_tan_dinh' },
];

const dummyWardsHCMBinhThanh: Ward[] = [
  { name: 'Phường 1', code: 26761, division_type: 'phường', codename: 'phuong_1' },
  { name: 'Phường 2', code: 26764, division_type: 'phường', codename: 'phuong_2' },
  { name: 'Phường 3', code: 26767, division_type: 'phường', codename: 'phuong_3' },
  { name: 'Phường 5', code: 26770, division_type: 'phường', codename: 'phuong_5' },
  { name: 'Phường 6', code: 26773, division_type: 'phường', codename: 'phuong_6' },
  { name: 'Phường 7', code: 26776, division_type: 'phường', codename: 'phuong_7' },
  { name: 'Phường 11', code: 26779, division_type: 'phường', codename: 'phuong_11' },
  { name: 'Phường 12', code: 26782, division_type: 'phường', codename: 'phuong_12' },
  { name: 'Phường 13', code: 26785, division_type: 'phường', codename: 'phuong_13' },
  { name: 'Phường 14', code: 26788, division_type: 'phường', codename: 'phuong_14' },
];

const dummyDistrictsHCM: District[] = [
  {
    name: 'Quận 1',
    code: 760,
    division_type: 'quận',
    codename: 'quan_1',
    wards: dummyWardsHCMQuan1,
  },
  {
    name: 'Quận Bình Thạnh',
    code: 763,
    division_type: 'quận',
    codename: 'quan_binh_thanh',
    wards: dummyWardsHCMBinhThanh,
  },
  {
    name: 'Quận 3',
    code: 766,
    division_type: 'quận',
    codename: 'quan_3',
    wards: [
      { name: 'Phường 1', code: 26800, division_type: 'phường', codename: 'phuong_1' },
      { name: 'Phường 2', code: 26803, division_type: 'phường', codename: 'phuong_2' },
      { name: 'Phường 3', code: 26806, division_type: 'phường', codename: 'phuong_3' },
      { name: 'Phường 4', code: 26809, division_type: 'phường', codename: 'phuong_4' },
      { name: 'Phường 5', code: 26812, division_type: 'phường', codename: 'phuong_5' },
    ],
  },
];

const dummyWardsHNBaDinh: Ward[] = [
  { name: 'Phường Điện Biên', code: 1, division_type: 'phường', codename: 'phuong_dien_bien' },
  { name: 'Phường Đội Cấn', code: 2, division_type: 'phường', codename: 'phuong_doi_can' },
  { name: 'Phường Giảng Võ', code: 3, division_type: 'phường', codename: 'phuong_giang_vo' },
  { name: 'Phường Liễu Giai', code: 4, division_type: 'phường', codename: 'phuong_lieu_giai' },
  { name: 'Phường Ngọc Hà', code: 5, division_type: 'phường', codename: 'phuong_ngoc_ha' },
];

const dummyDistrictsHN: District[] = [
  {
    name: 'Quận Ba Đình',
    code: 1,
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    wards: dummyWardsHNBaDinh,
  },
  {
    name: 'Quận Hoàn Kiếm',
    code: 2,
    division_type: 'quận',
    codename: 'quan_hoan_kiem',
    wards: [
      { name: 'Phường Cửa Đông', code: 10, division_type: 'phường', codename: 'phuong_cua_dong' },
      { name: 'Phường Cửa Nam', code: 11, division_type: 'phường', codename: 'phuong_cua_nam' },
      { name: 'Phường Đồng Xuân', code: 12, division_type: 'phường', codename: 'phuong_dong_xuan' },
      { name: 'Phường Hàng Bạc', code: 13, division_type: 'phường', codename: 'phuong_hang_bac' },
      { name: 'Phường Hàng Bồ', code: 14, division_type: 'phường', codename: 'phuong_hang_bo' },
    ],
  },
];

export const dummyProvinces: Province[] = [
  {
    name: 'Thành phố Hà Nội',
    code: 1,
    division_type: 'thành phố',
    codename: 'thanh_pho_ha_noi',
    phone_code: 24,
    districts: dummyDistrictsHN,
  },
  {
    name: 'Thành phố Hồ Chí Minh',
    code: 79,
    division_type: 'thành phố',
    codename: 'thanh_pho_ho_chi_minh',
    phone_code: 28,
    districts: dummyDistrictsHCM,
  },
  {
    name: 'Tỉnh Đồng Nai',
    code: 75,
    division_type: 'tỉnh',
    codename: 'tinh_dong_nai',
    phone_code: 251,
    districts: [
      {
        name: 'Thành phố Biên Hòa',
        code: 731,
        division_type: 'thành phố',
        codename: 'thanh_pho_bien_hoa',
        wards: [
          { name: 'Phường An Bình', code: 26041, division_type: 'phường', codename: 'phuong_an_binh' },
          { name: 'Phường Bình Đa', code: 26044, division_type: 'phường', codename: 'phuong_binh_da' },
          { name: 'Phường Hố Nai', code: 26047, division_type: 'phường', codename: 'phuong_ho_nai' },
        ],
      },
    ],
  },
];
