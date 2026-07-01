import { useCellData } from '@sellgar/kit';
import { CheckboxBlankCircleLineIcon, CheckboxBlankCircleFillIcon } from '@sellgar/kit/icons';
import { StoreProductEntity } from '@library/domain';

import React from 'react';

import s from './default.module.scss';

export const Visible: React.FC = () => {
  const { data } = useCellData<StoreProductEntity>();

  return (
    <div className={s.wrapper}>{data.showing ? <CheckboxBlankCircleFillIcon /> : <CheckboxBlankCircleLineIcon />}</div>
  );
};
