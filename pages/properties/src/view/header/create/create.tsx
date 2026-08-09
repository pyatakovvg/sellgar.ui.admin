import { PropertyModifyFrame } from '@frame/property-modify';
import * as App from '@sellgar/app';
import { Button } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';

export const Create: React.FC = () => {
  const propertyModifyFrame = App.useFrame(PropertyModifyFrame);

  const handleCreate = () => {
    void propertyModifyFrame.open({});
  };

  return (
    <Button size={'sm'} leadIcon={<AddLineIcon />} onClick={handleCreate}>
      Добавить свойство
    </Button>
  );
};
