import { Widget } from '@widget/property-group-modify';
import { Modal } from '@sellgar/kit';
import { useLoaderRevalidate } from '@library/app';

import React from 'react';

import { context } from './modify-group.context.ts';

export const ModifyGroup = () => {
  const { uuid, isOpen, onClose } = React.useContext(context);
  const { revalidate } = useLoaderRevalidate();

  return (
    <Modal open={isOpen} onClose={onClose}>
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
    </Modal>
  );
};
