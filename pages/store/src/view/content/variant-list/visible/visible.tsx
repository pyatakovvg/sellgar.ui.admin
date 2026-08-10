import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app';
import * as Kit from '@sellgar/kit';
import { CheckboxBlankCircleFillIcon, CheckboxBlankCircleLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import s from './default.module.scss';

const VisibleComponent: React.FC = () => {
  const { data } = Kit.useCellData<StoreOfferEntity>();

  return (
    <div className={s.wrapper}>{data.showing ? <CheckboxBlankCircleFillIcon /> : <CheckboxBlankCircleLineIcon />}</div>
  );
};

export const Visible = App.reactive(VisibleComponent);
