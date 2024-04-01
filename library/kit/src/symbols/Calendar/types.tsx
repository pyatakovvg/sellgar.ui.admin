import React from 'react';
import { Moment } from 'moment/moment';

export type TCalendarDayType = 'today' | 'day' | 'prev-month-day' | 'next-month-day';

export interface IDayProps {
  type: TCalendarDayType;
  isWeekend: boolean;
  isSelected: boolean;
  onClick(): void;
}

export interface ICalendarDay {
  type: TCalendarDayType;
  isWeekend: boolean;
  value: Moment;
}

interface ICalendarProps {
  value: string | null;
  format?: string;
  disabled?: boolean;
  isUTC?: boolean;
  fromDate?: Moment;
  toDate?: Moment;
  onFocus?(): void;
  onChange(value: string | null): void;
  onBlur?(): void;
}

export interface ICalendar extends React.PropsWithChildren<ICalendarProps> {}
