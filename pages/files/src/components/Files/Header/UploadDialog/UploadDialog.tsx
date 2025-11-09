import { Button } from '@sellgar/kit';

import React from 'react';

import { ModalDialog } from './components/ModalDialog';

export const UploadDialog: React.FC = () => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <>
      <Button
        size={'sm'}
        style={'secondary'}
        onClick={() => {
          setOpen(true);
        }}
      >
        Загрузить изображение
      </Button>
      <ModalDialog isOpen={isOpen} onClose={() => setOpen(false)} />
    </>
  );
};
