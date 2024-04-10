import React from 'react';

import { Checkbox } from '../../../Checkbox';

import type { IOptionList, TOptionValue } from './types';

import st from './styles/default.module.scss';

function checkActive(value: TOptionValue | TOptionValue[] | null, currentValue: TOptionValue) {
  if (value instanceof Array) {
    return value.some((item) => item === currentValue).toString();
  }
  return (value === currentValue).toString();
}

export const Multi = (props: IOptionList) => {
  console.log(props.value, props.currentValue, checkActive(props.value, props.currentValue));
  return (
    <div className={st.wrapper}>
      {props.isShowControl ? (
        <Checkbox value={checkActive(props.value, props.currentValue)} onChange={props.onClick}>
          <div className={st.text}>{props.children}</div>
        </Checkbox>
      ) : (
        <div className={st.text}>{props.children}</div>
      )}
    </div>
  );
};
