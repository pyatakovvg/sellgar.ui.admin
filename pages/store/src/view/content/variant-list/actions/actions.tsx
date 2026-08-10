import { StoreInventoryFrame } from '@frame/store-inventory';
import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app';
import * as Kit from '@sellgar/kit';
import { Button } from '@sellgar/kit';
import { StockLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import s from './default.module.scss';

interface ActionsProps {
  storeProductUuid: string;
}

export const Actions: React.FC<ActionsProps> = (props) => {
  const storeInventoryFrame = App.useFrame(StoreInventoryFrame);
  const { data } = Kit.useCellData<StoreOfferEntity>();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    void storeInventoryFrame.open({
      storeProductUuid: props.storeProductUuid,
      offerUuid: data.uuid,
    });
  };

  return (
    <div className={s.wrapper}>
      <Button.Icon style={'ghost'} size={'sm'} leadIcon={<StockLineIcon />} onClick={handleClick} />
    </div>
  );
};
