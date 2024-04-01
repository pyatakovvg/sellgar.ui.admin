import React from 'react';

import type { Moment } from 'moment';

import { Year } from './Year';
import { Month } from './Month';

import st from './default.module.scss';

interface IControlProps {
  value: Moment;
  disabled?: boolean;
  onPrevMonth(): void;
  onNextMonth(): void;
  onPrevYear(): void;
  onNextYear(): void;
}

export const Control = (props: IControlProps) => {
  const handlePrevMonth = () => {
    if (props.disabled) {
      return void 0;
    }
    props.onPrevMonth();
  };

  const handleNextMonth = () => {
    if (props.disabled) {
      return void 0;
    }
    props.onNextMonth();
  };

  const handlePrevYear = () => {
    if (props.disabled) {
      return void 0;
    }
    props.onPrevYear();
  };

  const handleNextYear = () => {
    if (props.disabled) {
      return void 0;
    }
    props.onNextYear();
  };

  return (
    <div className={st.wrapper}>
      <div className={st.month}>
        <Month value={props.value} disabled={props.disabled} onPrev={handlePrevMonth} onNext={handleNextMonth} />
      </div>
      <div className={st.year}>
        <Year value={props.value} disabled={props.disabled} onPrev={handlePrevYear} onNext={handleNextYear} />
      </div>
    </div>
  );
};
