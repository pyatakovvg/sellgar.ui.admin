import React from 'react';

import { DrawerView } from './view';
import { DrawerProvider } from './drawer.provider.tsx';

interface IProps {
  onCancel(): void;
  onSuccess(): void;
}

export const Drawer: React.FC<IProps> = (props) => {
  return (
    <DrawerProvider onSuccess={props.onSuccess} onCancel={props.onCancel}>
      <DrawerView />
    </DrawerProvider>
  );
};
