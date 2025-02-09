import { Dialog } from '@library/kit';

import React from 'react';

import { Upload } from './Upload';

interface IProps {
  isOpen: boolean;
  onClose(): void;
}

export const ModalDialog: React.FC<IProps> = (props) => {
  return (
    <Dialog isOpen={props.isOpen} onOpenChange={props.onClose}>
      <Dialog.Content>
        <Upload />
      </Dialog.Content>
    </Dialog>
  );
};
