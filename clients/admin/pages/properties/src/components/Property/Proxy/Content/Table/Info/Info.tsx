import { Description } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {}

export const Info: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper}>
      <Description>{props.children}</Description>
    </div>
  );
};
