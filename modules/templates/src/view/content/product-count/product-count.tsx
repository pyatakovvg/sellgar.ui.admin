import type { ProductTypeEntity } from '@library/domain';
import { reactive } from '@sellgar/app/react';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  template: ProductTypeEntity;
  kind: 'active' | 'archived';
}

const ProductCountComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      {props.kind === 'active' ? props.template.activeProductCount : props.template.archivedProductCount}
    </div>
  );
};

export const ProductCount = reactive(ProductCountComponent);
