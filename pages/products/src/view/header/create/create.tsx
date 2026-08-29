import * as App from '@sellgar/app-v2/react';
import { Button } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import { ProductControllerInterface } from '../../../classes/controller/product/product-controller.interface.ts';

export const Create: React.FC = () => {
  const controller = App.useController(ProductControllerInterface);

  const handleCreate = () => {
    void controller.create();
  };

  return (
    <Button size={'sm'} leadIcon={<AddLineIcon />} onClick={handleCreate}>
      Добавить товар
    </Button>
  );
};
