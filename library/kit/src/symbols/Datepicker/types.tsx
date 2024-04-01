import React from 'react';

import { EMode } from '@/types';
import { ICalendar } from '@/symbols/Calendar/types';

export interface IDatepicker extends React.PropsWithChildren<ICalendar> {
  mode?: (typeof EMode)[keyof typeof EMode];
  readOnly?: boolean;
  placeholder?: string;
  displayFormat?: string;
  isClearable?: boolean;
}
