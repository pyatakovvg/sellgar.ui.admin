import { StoreCreateRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Button } from '@sellgar/kit';
import { AddLineIcon } from '@sellgar/kit/icons';

import React from 'react';

export const Create: React.FC = () => {
  const navigate = App.useNavigate();

  return (
    <Button size={'sm'} leadIcon={<AddLineIcon />} onClick={() => void navigate.to(StoreCreateRoute)}>
      Добавить товар на склад
    </Button>
  );
};
