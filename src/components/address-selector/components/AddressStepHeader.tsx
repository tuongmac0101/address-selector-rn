import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { Text, useTheme } from '@ui-kitten/components';

export interface AddressStepHeaderProps {
  title: string;
  onBack?: () => void;
  showBack?: boolean;
}

export function AddressStepHeader({ title, onBack, showBack = true }: AddressStepHeaderProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: theme['border-basic-color-3'] }]}>
      {showBack && onBack ? (
        <TouchableOpacity onPress={onBack} style={styles.backBtn} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
          <ArrowLeft size={24} color={theme['text-basic-color']} />
        </TouchableOpacity>
      ) : (
        <View style={styles.backBtn} />
      )}
      <Text category="h6" style={[styles.title, { color: theme['text-basic-color'] }]}>
        {title}
      </Text>
      <View style={styles.backBtn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
});
