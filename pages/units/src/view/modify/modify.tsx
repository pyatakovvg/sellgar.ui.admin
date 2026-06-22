import { Drawer } from '@sellgar/kit';
import { Widget } from '@widget/unit-modify';
import { useRevalidate } from '@tiyn/app';

import React from 'react';

import { context } from './modify.context.ts';

export const Modify = () => {
  const { uuid, isOpen, onClose } = React.useContext(context);
  const revalidate = useRevalidate();

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <Widget
        uuid={uuid}
        onSuccess={async () => {
          await revalidate();
          onClose();
        }}
        onCancel={() => {
          onClose();
        }}
      />
    </Drawer>
  );
};
