import type { StoreOfferEntity } from '@library/domain';
import * as App from '@sellgar/app/react';
import { CheckboxBlankCircleFillIcon, CheckboxBlankCircleLineIcon } from '@sellgar/kit/icons';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  offer: StoreOfferEntity;
}

const VisibleComponent: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      {props.offer.showing ? <CheckboxBlankCircleFillIcon /> : <CheckboxBlankCircleLineIcon />}
    </div>
  );
};

export const Visible = App.reactive(VisibleComponent);
