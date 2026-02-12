import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ApplicationProvider, Text } from '@ui-kitten/components';
import { dummyProvinces } from './data/dummy-address';
import { useAddressSelection } from './hooks/useAddressSelection';
import type { Province, SelectedAddress } from './types';
import * as eva from '@eva-design/eva';
import {
  AddressSearchBar,
  AddressStepList,
  ListEmpty,
  SelectedAreaBreadcrumb,
} from './components';

const SECTION_TITLES = {
  province: 'Tỉnh/Thành phố',
  district: 'Quận/Huyện',
  ward: 'Phường/Xã',
} as const;

export interface AddressSelectorViewProps {
  /** Danh sách tỉnh/thành phố. Nếu không truyền sẽ dùng dummy data từ dummy-address.ts */
  data?: Province[];
  /** Callback khi chọn xong địa chỉ (đủ 3 cấp). */
  onComplete?: (address: SelectedAddress) => void;
}

const AddressSelectorView = (props: AddressSelectorViewProps) => {
  const { data, onComplete } = props;
  const provinces = data ?? dummyProvinces;
  const {
    step,
    searchQuery,
    setSearchQuery,
    selected,
    currentList,
    reset,
    goToStep,
    selectProvince,
    selectDistrict,
    selectWard,
  } = useAddressSelection({
    provinces,
    onComplete: (address) => {
      const parts = [
        address.ward?.name,
        address.district?.name,
        address.province?.name,
      ].filter(Boolean);
      console.log('Địa chỉ đã chọn:', parts.join(', '));
      onComplete?.(address);
    },
  });

  return (
    <ApplicationProvider mapping={eva.mapping} theme={eva.light}>
      <View style={styles.container}>
        <AddressSearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={`Tìm ${SECTION_TITLES[step].toLowerCase()}...`}
        />
        <SelectedAreaBreadcrumb
          selected={selected}
          currentStep={step}
          onStepPress={goToStep}
          onReset={reset}
        />
        <View style={styles.sectionTitleWrap}>
          <Text category="s2" appearance="hint">
            {SECTION_TITLES[step]}
          </Text>
        </View>
        <AddressStepList
          data={currentList}
          step={step}
          selected={selected}
          onSelectProvince={selectProvince}
          onSelectDistrict={selectDistrict}
          onSelectWard={selectWard}
          ListEmptyComponent={<ListEmpty />}
        />
      </View>
    </ApplicationProvider>
  );
};

export default AddressSelectorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitleWrap: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
});
