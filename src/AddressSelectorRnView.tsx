import { requireNativeView } from 'expo';
import * as React from 'react';

import { AddressSelectorRnViewProps } from './AddressSelectorRn.types';

const NativeView: React.ComponentType<AddressSelectorRnViewProps> =
  requireNativeView('AddressSelectorRn');

export default function AddressSelectorRnView(props: AddressSelectorRnViewProps) {
  return <NativeView {...props} />;
}
