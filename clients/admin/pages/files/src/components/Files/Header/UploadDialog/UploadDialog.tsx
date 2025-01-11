import { ButtonContext, ESize } from '@library/kit';

import React from 'react';

import { ModalDialog } from './components/ModalDialog';

export const UploadDialog: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <ButtonContext
        size={ESize.SM}
        onClick={() => {
          setOpen(true);
        }}
      >
        Загрузить изображение
      </ButtonContext>
      <ModalDialog isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};
