import { StoreModifyFrame } from '@frame/store-modify';
import { StoreProductEntity } from '@library/domain';
import { Button, Icon, useCellData } from '@sellgar/kit';
import { useFrame } from '@tiyn/app';

import React from 'react';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const storeModifyFrame = useFrame(StoreModifyFrame);
  const { data } = useCellData<StoreProductEntity>();

  const handleClick = () => {
    void storeModifyFrame.open({ uuid: data.uuid });
  };

  return (
    <div className={s.wrapper}>
      <Button
        form={'icon'}
        style={'ghost'}
        size={'sm'}
        leadIcon={<Icon icon={'more-2-fill'} />}
        onClick={() => handleClick()}
      />
    </div>
  );
};
