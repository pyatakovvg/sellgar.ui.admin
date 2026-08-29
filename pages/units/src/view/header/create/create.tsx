import { UnitCreateRoute } from '@library/route-tokens';
import * as App from '@sellgar/app-v2/react';
import { Button } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';

export const Create: React.FC = () => {
  const navigate = App.useNavigate();

  const handleCreate = () => {
    void navigate.to(UnitCreateRoute);
  };

  return (
    <Button size={'sm'} leadIcon={<AddLineIcon />} onClick={handleCreate}>
      Добавить измерение
    </Button>
  );
};
