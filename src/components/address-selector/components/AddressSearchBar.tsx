import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '@ui-kitten/components';

export interface AddressSearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  editable?: boolean;
}

export function AddressSearchBar({
  value,
  onChangeText,
  placeholder = 'Tìm kiếm...',
  editable = true,
}: AddressSearchBarProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme['background-basic-color-2'] }]}>
      <Search size={20} color={theme['text-hint-color']} style={styles.icon} />
      <TextInput
        style={[styles.input, { color: theme['text-basic-color'] }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={theme['text-hint-color']}
        editable={editable}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 4,
  },
});
