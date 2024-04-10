import React from 'react';

import type { IOptionList, TOptionValue } from './types';

import cn from 'classnames';
import st from './styles/default.module.scss';

function checkActive(value: TOptionValue | TOptionValue[] | null, currentValue: TOptionValue) {
  if (value instanceof Array) {
    return value.some((item) => item === currentValue);
  }
  return value === currentValue;
}

export const Simple = (props: IOptionList) => {
  const wrapperClassName = React.useMemo(
    () =>
      cn(st.wrapper, {
        [st.active]: checkActive(props.value, props.currentValue),
      }),
    [props.value],
  );

  return (
    <div className={wrapperClassName} onClick={() => props.onClick()}>
      {props.children}
    </div>
  );
};
