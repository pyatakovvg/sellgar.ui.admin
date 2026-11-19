import { Modal } from '@sellgar/kit';

import React from 'react';

import { Dialog } from './dialog';

interface IProps {
  open: boolean;
  onApply(): void;
  onCancel(): void;
}

export const Confirm: React.FC<IProps> = (props) => {
  return (
    <Modal open={props.open} onClose={props.onCancel}>
      <Dialog onApply={props.onApply} onCancel={props.onCancel} />
    </Modal>
  );
};
