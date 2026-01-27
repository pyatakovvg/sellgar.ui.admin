import { ShopEntity } from '@library/domain';
import { Button, Icon, useCellData } from '@sellgar/kit';
import { useNavigate } from '@library/app';

import React from 'react';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useCellData<ShopEntity>();

  const handleClick = () => {
    navigate.location('/shop/' + data.uuid);
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
