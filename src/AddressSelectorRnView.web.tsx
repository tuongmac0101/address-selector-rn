import * as React from 'react';

import { AddressSelectorRnViewProps } from './AddressSelectorRn.types';

export default function AddressSelectorRnView(props: AddressSelectorRnViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
