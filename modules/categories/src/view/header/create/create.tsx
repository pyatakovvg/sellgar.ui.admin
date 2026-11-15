import { CategoryCreateRoute } from '@library/route-tokens';
import * as App from '@sellgar/app/react';
import { Button } from '@sellgar/kit';
import { AddFillIcon } from '@sellgar/kit/icons';

import React from 'react';

import { CategoryControllerInterface } from '../../../classes/controller/category/category-controller.interface.ts';

export const Create: React.FC = () => {
  const { tree } = App.useLoaderData(CategoryControllerInterface);
  const navigate = App.useNavigate();
  const revalidation = App.useRevalidate();
  if (!tree) return null;
  return (
    <Button
      size={'sm'}
      leadIcon={<AddFillIcon />}
      disabled={revalidation.inProcess}
      onClick={() => void navigate.to(CategoryCreateRoute, { params: { shopUuid: tree.shopUuid } })}
    >
      Добавить категорию
    </Button>
  );
};
