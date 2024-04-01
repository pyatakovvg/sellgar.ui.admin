import React from 'react';

import type { IIcon, IWeight } from './types';

import cn from 'classnames';
import styles from './default.module.scss';

export interface IIconProps {
  weight?: IWeight;
  icon: IIcon;
}

export const Icon: React.FC<IIconProps> = React.memo((props) => {
  return <i className={cn(styles.icon, `fa-${props.weight ?? 'solid'} fa-${props.icon}`)} />;
});

export { icons, weights } from './types';
export type { IIcon, IWeight } from './types';
