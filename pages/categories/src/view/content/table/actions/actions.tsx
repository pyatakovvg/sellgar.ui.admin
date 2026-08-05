import { Button, Icon, useCellData } from '@sellgar/kit';
import { useNavigate } from '@sellgar/app';
import { CategoryEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Actions: React.FC = () => {
  const { data } = useCellData<CategoryEntity>();
  const navigate = useNavigate();

  return (
    <div className={s.wrapper}>
      <Button
        form={'icon'}
        style={'ghost'}
        size={'sm'}
        leadIcon={<Icon icon={'more-2-fill'} />}
        onClick={() => navigate.hashParams({ modal: { uuid: data.uuid } }, { merge: true })}
      />
    </div>
  );
};
