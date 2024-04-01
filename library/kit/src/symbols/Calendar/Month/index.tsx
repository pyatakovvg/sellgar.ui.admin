import React from 'react';
import moment, { type Moment } from 'moment';

import { Day } from './Day';
import type { ICalendarDay } from '../types';

import st from './styles/default.module.scss';

interface IMonthProps {
  value: Moment | null;
  weeks: ICalendarDay[][];
  disabled?: boolean;
  fromDate?: Moment;
  toDate?: Moment;
  isUTC?: boolean;
  onChange(value: ICalendarDay): void;
}

const createMoment = (value?: Moment, isUTC?: boolean) => {
  if (isUTC) {
    return moment(value, 'YYYY-MM-DD').utc();
  }
  return moment(value, 'YYYY-MM-DD');
};

const checkPeriodFrom = (value: Moment, from?: Moment, isUTC?: boolean) => {
  if (!from) {
    return false;
  }
  const date = createMoment(value, isUTC);
  const goal = createMoment(from, isUTC);
  return date.isSameOrAfter(goal, 'year') && date.isSameOrAfter(goal, 'month') && date.isSameOrAfter(goal, 'day');
};

const checkPeriodTo = (value: Moment, to?: Moment, isUTC?: boolean) => {
  if (!to) {
    return false;
  }
  const date = createMoment(value, isUTC);
  const goal = createMoment(to, isUTC);
  return date.isSameOrBefore(goal, 'year') && date.isSameOrBefore(goal, 'month') && date.isSameOrBefore(goal, 'day');
};

export const Month = (props: IMonthProps) => {
  return (
    <div className={st.wrapper}>
      {props.weeks.map((week, index) => (
        <div key={index} className={st.row}>
          {week.map((day, index) => {
            return (
              <div key={index} className={st.col}>
                <Day
                  key={index}
                  type={day.type}
                  disabled={
                    props.disabled ||
                    checkPeriodFrom(day.value, props.fromDate, props.isUTC) ||
                    checkPeriodTo(day.value, props.toDate, props.isUTC)
                  }
                  isWeekend={day.isWeekend}
                  isSelected={props.value ? day.value.isSame(props.value) : false}
                  onClick={() => props.onChange(day)}
                >
                  {day.value.format('DD')}
                </Day>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
