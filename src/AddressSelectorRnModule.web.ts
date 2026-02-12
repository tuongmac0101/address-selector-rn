import { registerWebModule, NativeModule } from 'expo';

import { AddressSelectorRnModuleEvents } from './AddressSelectorRn.types';

class AddressSelectorRnModule extends NativeModule<AddressSelectorRnModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(AddressSelectorRnModule, 'AddressSelectorRnModule');
