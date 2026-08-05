import { StoreInventoryFrame } from '@frame/store-inventory';
import { StoreOfferEntity, StoreProductEntity } from '@library/domain';
import { Button, Icon, useCellData } from '@sellgar/kit';
import { useFrame } from '@sellgar/app';

import React from 'react';

import s from './default.module.scss';

interface ActionsProps {
  storeProduct: StoreProductEntity;
}

export const Actions: React.FC<ActionsProps> = (props) => {
  const storeInventoryFrame = useFrame(StoreInventoryFrame);
  const { data } = useCellData<StoreOfferEntity>();

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    void storeInventoryFrame.open({
      storeProductUuid: props.storeProduct.uuid,
      offerUuid: data.uuid,
    });
  };

  return (
    <div className={s.wrapper}>
      <Button.Icon style={'ghost'} size={'sm'} leadIcon={<Icon icon={'stock-line'} />} onClick={handleClick} />
    </div>
  );
};
