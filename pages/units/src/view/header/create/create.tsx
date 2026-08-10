import { UnitModifyFrame } from '@frame/unit-modify';
import * as App from '@sellgar/app';
import { Button } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';

export const Create: React.FC = () => {
  const unitModifyFrame = App.useFrame(UnitModifyFrame);

  const handleCreate = () => {
    void unitModifyFrame.open({});
  };

  return (
    <Button size={'sm'} leadIcon={<AddLineIcon />} onClick={handleCreate}>
      Добавить измерение
    </Button>
  );
};
