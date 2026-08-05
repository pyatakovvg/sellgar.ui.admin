import { Button, Icon, Typography } from '@sellgar/kit';
import { PropertyModifyFrame } from '@frame/property-modify';
import { useFrame } from '@sellgar/app';

import React from 'react';

import s from './default.module.scss';

export const Header = () => {
  const propertyFrame = useFrame(PropertyModifyFrame);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Typography size={'h6'} weight={'semi-bold'}>
          <h6>Свойства</h6>
        </Typography>
      </div>
      <div className={s.link}>
        <Button size={'sm'} leadIcon={<Icon icon={'add-line'} />} onClick={() => void propertyFrame.open({})}>
          Добавить свойство
        </Button>
      </div>
    </div>
  );
};
