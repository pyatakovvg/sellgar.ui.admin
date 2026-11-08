import type { UnitEntity } from '@library/domain';
import { reactive } from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  unit: UnitEntity;
}

const SymbolComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p>{props.unit.symbol}</p>
      </Typography>
    </div>
  );
};

export const Symbol = reactive(SymbolComponent);
