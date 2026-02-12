import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';

export function ListEmpty() {
  return (
    <View style={styles.wrap}>
      <Text category="s1" appearance="hint">
        Không có kết quả phù hợp
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 32,
    alignItems: 'center',
  },
});
