import { Modal } from '@sellgar/kit';

import React from 'react';

import { Upload } from './Upload';

interface IProps {
  isOpen: boolean;
  onClose(): void;
}

export const ModalDialog: React.FC<IProps> = (props) => {
  return (
    <Modal open={props.isOpen} onOpen={props.onClose}>
      <Upload />
    </Modal>
  );
};
