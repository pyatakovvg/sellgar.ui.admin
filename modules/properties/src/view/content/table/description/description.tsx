import { reactive } from '@sellgar/app/react';
import type { PropertyEntity } from '@library/domain';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  property: PropertyEntity;
}

const DescriptionComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Typography size={'caption-m'} weight={'medium'}>
        <p className={s.text}>{props.property.description}</p>
      </Typography>
    </div>
  );
};

export const Description = reactive(DescriptionComponent);
