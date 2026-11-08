import type { ProductTypeEntity } from '@library/domain';
import { reactive } from '@sellgar/app/react';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  template: ProductTypeEntity;
}

const NameComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-l'} weight={'medium'}>
        <p>{props.template.name}</p>
      </Typography>
    </div>
  );
};

export const Name = reactive(NameComponent);
