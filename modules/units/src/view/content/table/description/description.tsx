import type { UnitEntity } from '@library/domain';
import { reactive } from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  unit: UnitEntity;
}

const DescriptionComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.text}>{props.unit.description}</p>
      </Typography>
    </div>
  );
};

export const Description = reactive(DescriptionComponent);
