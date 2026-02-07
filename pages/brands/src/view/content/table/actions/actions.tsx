import { Button, Icon, useCellData } from '@sellgar/kit';
import { useNavigate } from '@library/app';
import { BrandEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const { data } = useCellData<BrandEntity>();
  const navigate = useNavigate();

  return (
    <div className={s.wrapper}>
      <Button
        form={'icon'}
        style={'ghost'}
        size={'sm'}
        leadIcon={<Icon icon={'more-2-fill'} />}
        onClick={() => navigate.hash({ brand: { uuid: data.uuid } })}
      />
    </div>
  );
};
