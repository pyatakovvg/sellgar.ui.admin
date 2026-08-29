import type { StoreOfferEntity } from '@library/domain';
import { StoreInventoryRoute } from '@library/route-tokens';
import * as App from '@sellgar/app-v2/react';
import * as Kit from '@sellgar/kit';
import { Button } from '@sellgar/kit';
import { StockLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import s from './default.module.scss';

interface ActionsProps {
  storeProductUuid: string;
}

export const Actions: React.FC<ActionsProps> = (props) => {
  const navigate = App.useNavigate();
  const { data } = Kit.useCellData<StoreOfferEntity>();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    void navigate.to(StoreInventoryRoute, {
      params: {
        storeProductUuid: props.storeProductUuid,
        offerUuid: data.uuid,
      },
    });
  };

  return (
    <div className={s.wrapper}>
      <Button.Icon style={'ghost'} size={'sm'} leadIcon={<StockLineIcon />} onClick={handleClick} />
    </div>
  );
};
