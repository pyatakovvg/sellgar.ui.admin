import type { StoreProductEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { Dot } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  product: StoreProductEntity;
}

const VisibleComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <Dot size={'lg'} color={props.product.showing ? 'green' : 'gray'} />
    </div>
  );
};

export const Visible = App.reactive(VisibleComponent);
