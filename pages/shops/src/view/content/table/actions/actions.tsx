import { ShopEntity } from '@library/domain';
import { Button, Icon, useCellData } from '@sellgar/kit';
import { ShopModifyFrame } from '@frame/shop-modify';
import { useFrame } from '@tiyn/app';

import React from 'react';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const frame = useFrame(ShopModifyFrame);
  const { data } = useCellData<ShopEntity>();

  const handleClick = () => {
    void frame.open({ uuid: data.uuid });
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
