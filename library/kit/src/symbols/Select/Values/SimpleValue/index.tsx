import React from 'react';

import type { ISelectedValue } from '../../types';

import cn from 'classnames';
import st from './default.module.scss';

interface IMultiValuesProps {
  value: ISelectedValue;
  disabled?: boolean;
  readOnly?: boolean;
}

export const SimpleValue = (props: IMultiValuesProps) => {
  const textClassName = React.useMemo(
    () =>
      cn(st.text, {
        [st.disabled]: props.disabled,
        [st.readonly]: props.readOnly,
      }),
    [props.disabled],
  );

  return (
    <div className={st.wrapper}>
      <div className={st.content}>
        <span className={textClassName}>{props.value.value}</span>
      </div>
    </div>
  );
};
