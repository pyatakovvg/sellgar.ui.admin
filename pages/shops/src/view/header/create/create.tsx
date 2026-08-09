import { ShopModifyFrame } from '@frame/shop-modify';
import * as App from '@sellgar/app';
import { Button } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';

export const Create: React.FC = () => {
  const shopModifyFrame = App.useFrame(ShopModifyFrame);

  const handleCreate = () => {
    void shopModifyFrame.open({});
  };

  return (
    <Button size={'sm'} leadIcon={<AddLineIcon />} onClick={handleCreate}>
      Добавить магазин
    </Button>
  );
};
