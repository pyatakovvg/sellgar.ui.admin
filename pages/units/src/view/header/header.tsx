import { Typography, Icon, Button } from '@sellgar/kit';
import { UnitModifyFrame } from '@frame/unit-modify';
import { useFrame } from '@tiyn/app';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  const frame = useFrame(UnitModifyFrame);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Единица измерения</h6>
        </Typography>
      </div>
      <div>
        <Button leadIcon={<Icon icon={'add-fill'} />} size={'sm'} onClick={() => void frame.open({})}>
          Добавить измерение
        </Button>
      </div>
    </div>
  );
};
