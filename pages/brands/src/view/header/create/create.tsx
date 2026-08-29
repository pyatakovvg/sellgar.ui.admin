import { BrandCreateRoute } from '@library/route-tokens';
import * as App from '@sellgar/app-v2/react';
import { Button } from '@sellgar/kit';
import { AddFillIcon } from '@sellgar/kit/icons';

import React from 'react';

export const Create: React.FC = () => {
  const navigate = App.useNavigate();

  const handleCreate = () => {
    void navigate.to(BrandCreateRoute);
  };

  return (
    <Button leadIcon={<AddFillIcon />} size={'sm'} onClick={handleCreate}>
      Добавить бренд
    </Button>
  );
};
