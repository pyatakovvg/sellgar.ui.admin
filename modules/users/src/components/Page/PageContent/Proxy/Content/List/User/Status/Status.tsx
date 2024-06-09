import { Icon } from '@library/kit';

import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  isBlocked: boolean;
}

export const Status: React.FC<IProps> = (props) => {
  const wrapperClassName = cn(s.wrapper, {
    [s.blocked]: props.isBlocked,
  });

  const title = props.isBlocked ? 'Заблокирован' : 'Активный';

  return (
    <div className={wrapperClassName} title={title}>
      {props.isBlocked ? <Icon icon={'xmark'} /> : <Icon icon={'check'} />}
    </div>
  );
};
