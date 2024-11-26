import React from 'react';

import { ESize } from '../../kit.types.ts';

import s from './default.module.scss';

interface IProps {
  size?: ESize.MD | ESize.LG;
}

export const Logo: React.FC<React.PropsWithChildren<IProps>> = () => {
  return <div className={s.logotype} />;
};
