import { Image } from '@library/kit';
import { Modal } from '@sellgar/kit';

import React from 'react';

interface IProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

export const View: React.FC<IProps> = (props) => {
  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <Image src={props.src} />
    </Modal>
  );
};
