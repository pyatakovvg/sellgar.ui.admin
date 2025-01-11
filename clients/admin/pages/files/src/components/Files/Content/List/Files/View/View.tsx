import { Dialog, Image } from '@library/kit';

import React from 'react';

interface IProps {
  src: string;
  isOpen: boolean;
  onClose: () => void;
}

export const View: React.FC<IProps> = (props) => {
  return (
    <Dialog isOpen={props.isOpen} onOpenChange={props.onClose}>
      <Dialog.Content>
        <Image src={props.src} />
      </Dialog.Content>
    </Dialog>
  );
};
