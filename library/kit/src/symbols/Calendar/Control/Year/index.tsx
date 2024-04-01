import React from 'react';
import moment, { type Moment } from 'moment';

import { Icon } from '@/symbols/Icon';

import cn from 'classnames';
import st from './default.module.scss';

interface IControlProps {
  value: Moment;
  disabled?: boolean;
  onPrev(): void;
  onNext(): void;
}

export const Year = (props: IControlProps) => {
  const iconClassName = React.useMemo(() => cn(st.icon), []);

  const handlePrevMonth = () => {
    if (props.disabled) {
      return void 0;
    }
    props.onPrev();
  };

  const handleNextMonth = () => {
    if (props.disabled) {
      return void 0;
    }
    props.onNext();
  };

  return (
    <div className={st.wrapper}>
      <div className={iconClassName} onClick={handlePrevMonth}>
        <Icon icon={'chevron-left'} />
      </div>
      <div className={st.content}>
        <p className={st.year}>{moment(props.value).year()}</p>
      </div>
      <div className={iconClassName} onClick={handleNextMonth}>
        <Icon icon={'chevron-right'} />
      </div>
    </div>
  );
};
