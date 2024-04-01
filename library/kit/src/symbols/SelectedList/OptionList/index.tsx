import React from 'react';

import { Multi } from './Multi';
import { Simple } from './Simple';

import type { IOptionList } from './types';

export const OptionList = (props: IOptionList) => {
  if (props.isMultiple) {
    return (
      <Multi value={props.value} currentValue={props.currentValue} onClick={props.onClick}>
        {props.children}
      </Multi>
    );
  }
  return (
    <Simple value={props.value} currentValue={props.currentValue} onClick={props.onClick}>
      {props.children}
    </Simple>
  );
};
