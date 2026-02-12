import React, { useCallback, useMemo } from 'react';
import {
  SectionList,
  ListRenderItemInfo,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Check } from 'lucide-react-native';
import { Text, useTheme } from '@ui-kitten/components';
import { getFirstLetterForGroup } from '../helpers/normalizeVietnamese';
import type { District, Province, SelectedAddress, Ward } from '../types';

type ListItem = Province | District | Ward;

function isProvince(item: ListItem): item is Province {
  return 'phone_code' in item && 'districts' in item;
}

function isDistrict(item: ListItem): item is District {
  return 'wards' in item && !('phone_code' in item);
}

export interface AddressStepListProps {
  data: ListItem[];
  step: 'province' | 'district' | 'ward';
  selected: SelectedAddress;
  onSelectProvince?: (p: Province) => void;
  onSelectDistrict?: (d: District) => void;
  onSelectWard?: (w: Ward) => void;
  ListEmptyComponent?: React.ReactNode;
}

interface Section {
  title: string;
  data: ListItem[];
}

function groupByLetter(items: ListItem[]): Section[] {
  const map = new Map<string, ListItem[]>();
  for (const item of items) {
    const letter = getFirstLetterForGroup(item.name);
    if (!map.has(letter)) map.set(letter, []);
    map.get(letter)!.push(item);
  }
  const sorted = Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  return sorted.map(([title, data]) => ({ title, data }));
}

export function AddressStepList({
  data,
  step,
  selected,
  onSelectProvince,
  onSelectDistrict,
  onSelectWard,
  ListEmptyComponent,
}: AddressStepListProps) {
  const theme = useTheme();
  const primaryColor = theme['color-primary-500'] ?? '#E53935';

  const sections = useMemo(() => groupByLetter(data), [data]);

  const isItemSelected = useCallback(
    (item: ListItem): boolean => {
      if (step === 'province' && isProvince(item) && selected.province?.code === item.code) return true;
      if (step === 'district' && isDistrict(item) && selected.district?.code === item.code) return true;
      if (step === 'ward' && !isProvince(item) && !isDistrict(item) && selected.ward?.code === (item as Ward).code)
        return true;
      return false;
    },
    [step, selected]
  );

  const handlePress = useCallback(
    (item: ListItem) => {
      if (step === 'province' && isProvince(item)) onSelectProvince?.(item);
      else if (step === 'district' && isDistrict(item)) onSelectDistrict?.(item);
      else if (step === 'ward' && !isProvince(item) && !isDistrict(item)) onSelectWard?.(item as Ward);
    },
    [step, onSelectProvince, onSelectDistrict, onSelectWard]
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<ListItem>) => {
      const name = item.name;
      const selectedItem = isItemSelected(item);
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handlePress(item)}
          style={[styles.row, { borderBottomColor: theme['border-basic-color-3'] }]}
        >
          <Text
            category="s1"
            style={[styles.itemText, selectedItem && { color: primaryColor }]}
          >
            {name}
          </Text>
          {selectedItem ? (
            <Check size={20} color={primaryColor} strokeWidth={2.5} />
          ) : null}
        </TouchableOpacity>
      );
    },
    [theme, primaryColor, isItemSelected, handlePress]
  );

  const renderSectionHeader = useCallback(
    ({ section }: { section: Section }) => (
      <View style={[styles.sectionHeader, { backgroundColor: theme['background-basic-color-2'] }]}>
        <Text category="s2" style={[styles.sectionTitle, { color: theme['text-hint-color'] }]}>
          {section.title}
        </Text>
      </View>
    ),
    [theme]
  );

  const keyExtractor = useCallback((item: ListItem) => String(item.code), []);

  if (data.length === 0 && ListEmptyComponent) {
    return <View style={styles.listContent}>{ListEmptyComponent}</View>;
  }

  return (
    <SectionList
      sections={sections}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={keyExtractor}
      stickySectionHeadersEnabled={false}
      contentContainerStyle={styles.listContent}
      ListEmptyComponent={ListEmptyComponent as React.ReactElement}
      keyboardShouldPersistTaps="handled"
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  sectionHeader: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemText: {},
});
