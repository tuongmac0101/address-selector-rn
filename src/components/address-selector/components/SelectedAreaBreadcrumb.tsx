import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from '@ui-kitten/components';
import { ChevronDown } from 'lucide-react-native';
import type { AddressStep, SelectedAddress } from '../types';

const STEP_LABELS: Record<AddressStep, string> = {
  province: 'Tỉnh / Thành phố',
  district: 'Quận / Huyện',
  ward: 'Phường / Xã',
};

export interface SelectedAreaBreadcrumbProps {
  selected: SelectedAddress;
  currentStep: AddressStep;
  onStepPress?: (step: AddressStep) => void;
  onReset?: () => void;
}

export function SelectedAreaBreadcrumb({
  selected,
  currentStep,
  onStepPress,
  onReset,
}: SelectedAreaBreadcrumbProps) {
  const theme = useTheme();
  const primaryColor = theme['color-primary-500'] ?? '#E53935';
  const cardBg = theme['background-basic-color-2'] ?? '#F7F9FC';
  const borderColor = theme['border-basic-color-3'] ?? '#EDF1F7';

  const parts: { step: AddressStep; label: string; stepLabel: string }[] = [];
  if (selected.province) {
    parts.push({ step: 'province', label: selected.province.name, stepLabel: STEP_LABELS.province });
    if (selected.district) {
      parts.push({ step: 'district', label: selected.district.name, stepLabel: STEP_LABELS.district });
    }
    if (selected.ward) {
      parts.push({ step: 'ward', label: selected.ward.name, stepLabel: STEP_LABELS.ward });
    }
  }

  return (
    <View style={[styles.container, { borderBottomColor: borderColor }]}>
      <View style={styles.headerRow}>
        <Text category="c1" style={[styles.label, { color: theme['text-hint-color'] }]}>
          Khu vực được chọn
        </Text>
        {onReset && (selected.province || selected.district || selected.ward) ? (
          <TouchableOpacity onPress={onReset} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text category="s2" style={{ color: primaryColor }}>
              Thiết lập lại
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {parts.length === 0 ? (
        <View style={[styles.placeholderCard, { backgroundColor: cardBg, borderColor }]}>
          <Text category="s2" style={[styles.placeholder, { color: theme['text-hint-color'] }]}>
            Chưa chọn — bấm vào danh sách bên dưới
          </Text>
        </View>
      ) : (
        <View style={styles.stepCards}>
          {parts.map(({ step, label, stepLabel }, index) => {
            const isActive = step === currentStep;
            const isClickable = !!onStepPress;
            return (
              <React.Fragment key={step}>
                {index > 0 && (
                  <View style={styles.chevronWrap}>
                    <ChevronDown size={16} color={theme['text-hint-color']} />
                  </View>
                )}
                <TouchableOpacity
                  disabled={!isClickable}
                  onPress={() => isClickable && onStepPress?.(step)}
                  activeOpacity={isClickable ? 0.7 : 1}
                  style={[
                    styles.stepCard,
                    { backgroundColor: cardBg, borderColor: isActive ? primaryColor : borderColor },
                    isActive && styles.stepCardActive,
                  ]}
                >
                  <Text
                    category="c1"
                    style={[styles.stepCardLabel, { color: theme['text-hint-color'] }]}
                    numberOfLines={1}
                  >
                    {stepLabel}
                  </Text>
                  <Text
                    category="s1"
                    numberOfLines={1}
                    style={[styles.stepCardValue, isActive && { color: primaryColor }]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    textTransform: 'uppercase',
  },
  placeholderCard: {
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  placeholder: {
    fontStyle: 'italic',
  },
  stepCards: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  stepCard: {
    marginBottom: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  stepCardActive: {
    borderWidth: 2,
  },
  stepCardLabel: {
    marginBottom: 2,
  },
  stepCardValue: {
    fontWeight: '600',
  },
  chevronWrap: {
    marginVertical: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
