import { Widget } from '@widget/property-modify';
import { Drawer } from '@sellgar/kit';
import { useLoaderRevalidate } from '@library/app';

import React from 'react';

import { context } from './modify.context.ts';

export const Modify = () => {
  const { uuid, isOpen, onClose } = React.useContext(context);
  const { revalidate } = useLoaderRevalidate();

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
