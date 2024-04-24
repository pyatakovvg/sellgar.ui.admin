import React from 'react';

import { Checkbox } from '@/symbols/Checkbox';

import st from './styles/default.module.scss';

interface IProps<T = any> {
  disabled?: boolean;
  optionKey: keyof T;
  value: T[];
  currentValue: T;
  onChange: (value: T) => void;
}

function checkActive(value: any[], currentValue: any, optionKey: any) {
  return value.some((item) => currentValue === item[optionKey]);
}

export const Option: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={st.wrapper}>
      <Checkbox value={checkActive(props.value, props.currentValue, props.optionKey)} onChange={props.onChange}>
        <div className={st.text}>{props.children}</div>
      </Checkbox>
    </div>
  );
};
