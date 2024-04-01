import React from 'react';

import type { TCalendarDayType } from '../../types';

import cn from 'classnames';
import st from './styles/default.module.scss';

interface IDayProps {
  disabled?: boolean;
  type: TCalendarDayType;
  isWeekend: boolean;
  isSelected: boolean;
  onClick(): void;
}

const BaseDay = (props: React.PropsWithChildren<IDayProps>) => {
  const handleClick = () => {
    if (props.disabled) {
      return void 0;
    }
    props.onClick();
  };

  return (
    <div
      className={cn(st.date, {
        [st.weekend]: props.isWeekend,
        [st.today]: props.type === 'today',
        [st.selected]: props.isSelected,
      })}
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

const OtherMonthDay = (props: React.PropsWithChildren<IDayProps>) => {
  return (
    <div
      className={cn(st['other-date'], {
        [st['weekend']]: props.isWeekend,
      })}
    >
      {props.children}
    </div>
  );
};

export const Day = (props: React.PropsWithChildren<IDayProps>) => {
  switch (props.type) {
    case 'day':
    case 'today':
      return props.disabled ? (
        <OtherMonthDay {...props}>{props.children}</OtherMonthDay>
      ) : (
        <BaseDay {...props}>{props.children}</BaseDay>
      );
    case 'prev-month-day':
    case 'next-month-day':
      return <OtherMonthDay {...props}>{props.children}</OtherMonthDay>;
    default:
      return null;
  }
};
