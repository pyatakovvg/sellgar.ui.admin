import { BrandModifyFrame } from '@frame/brand-modify';
import * as App from '@sellgar/app';
import { Button } from '@sellgar/kit';
import { AddFillIcon } from '@sellgar/kit/icons';

import React from 'react';

export const Create: React.FC = () => {
  const brandModifyFrame = App.useFrame(BrandModifyFrame);

  const handleCreate = () => {
    void brandModifyFrame.open({});
  };

  return (
    <Button leadIcon={<AddFillIcon />} size={'sm'} onClick={handleCreate}>
      Добавить бренд
    </Button>
  );
};
