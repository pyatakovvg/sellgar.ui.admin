import { Icon } from '@library/kit';

import React from 'react';
import { observer } from 'mobx-react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  status: 'active' | 'not-active';
}

export const Status = observer((props: IProps) => {
  if (props.status === 'active') {
    return (
      <div className={cn(s.status, s.active)}>
        <Icon icon={'check'} />
      </div>
    );
  }

  if (props.status === 'not-active') {
    return (
      <div className={cn(s.status, s.ban)}>
        <Icon icon={'ban'} />
      </div>
    );
  }

  return null;
});
