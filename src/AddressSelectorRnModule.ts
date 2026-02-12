import { NativeModule, requireNativeModule } from 'expo';

import { AddressSelectorRnModuleEvents } from './AddressSelectorRn.types';

declare class AddressSelectorRnModule extends NativeModule<AddressSelectorRnModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<AddressSelectorRnModule>('AddressSelectorRn');
