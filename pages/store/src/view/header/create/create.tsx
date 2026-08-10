import { StoreModifyFrame } from '@frame/store-modify';
import * as App from '@sellgar/app';
import { Button } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';

export const Create: React.FC = () => {
  const storeModifyFrame = App.useFrame(StoreModifyFrame);

  return (
    <Button size={'sm'} leadIcon={<AddLineIcon />} onClick={() => void storeModifyFrame.open({})}>
      Добавить товар на склад
    </Button>
  );
};
