import { CategoryModifyFrame } from '@frame/category-modify';
import * as App from '@sellgar/app';
import { Button } from '@sellgar/kit';
import { AddFillIcon } from '@sellgar/kit/icons';

import React from 'react';

export const Create: React.FC = () => {
  const categoryModifyFrame = App.useFrame(CategoryModifyFrame);

  const handleCreate = () => {
    void categoryModifyFrame.open({});
  };

  return (
    <Button leadIcon={<AddFillIcon />} size={'sm'} onClick={handleCreate}>
      Добавить категорию
    </Button>
  );
};
