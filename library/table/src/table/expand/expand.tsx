import { Icon } from '@sellgar/kit';

import React from 'react';

import { context as rowContext } from '../row';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {}

export const Expand: React.FC<IProps> = () => {
  const { hasExpanded, expanded, setExpand } = React.use(rowContext);

  const className = React.useMemo(
    () =>
      cn(s.expand, {
        [s.active]: hasExpanded && expanded,
        [s.disabled]: !hasExpanded,
      }),
    [expanded, hasExpanded],
  );

  const handleClick = () => {
    if (!hasExpanded) {
      return void 0;
    }

    setExpand(!expanded);
  };

  return (
    <div className={s.cell} onClick={() => handleClick()}>
      <div className={className}>
        {expanded && hasExpanded ? <Icon icon={'arrow-down-s-line'} /> : <Icon icon={'arrow-right-s-line'} />}
      </div>
    </div>
  );
};
