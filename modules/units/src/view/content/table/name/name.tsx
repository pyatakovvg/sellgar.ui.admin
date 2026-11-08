import type { UnitEntity } from '@library/domain';
import { reactive } from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  unit: UnitEntity;
}

const NameComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p>{props.unit.name}</p>
      </Typography>
    </div>
  );
};

export const Name = reactive(NameComponent);
