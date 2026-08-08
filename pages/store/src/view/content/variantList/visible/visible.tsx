import { useCellData } from '@sellgar/kit';
import { CheckboxBlankCircleLineIcon, CheckboxBlankCircleFillIcon } from '@sellgar/kit/icons';
import { StoreOfferEntity } from '@library/domain';
import { reactive } from '@sellgar/app';

import React from 'react';

import s from './default.module.scss';

export const Visible: React.FC = reactive(() => {
  const { data } = useCellData<StoreOfferEntity>();

  return (
    <div className={s.wrapper}>{data.showing ? <CheckboxBlankCircleFillIcon /> : <CheckboxBlankCircleLineIcon />}</div>
  );
});
