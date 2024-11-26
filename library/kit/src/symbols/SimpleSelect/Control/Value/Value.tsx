import React from 'react';

import { Text } from '../../../../typography/Text';

import cn from 'classnames';
import s from './default.module.scss';

export type TOptionValue = string | number;

export interface ISelectedValue {
  key: TOptionValue;
  value: TOptionValue;
}

interface IMultiValuesProps {
  value: ISelectedValue;
  disabled?: boolean;
  readOnly?: boolean;
}

export const Value = (props: IMultiValuesProps) => {
  const wrapperClassName = React.useMemo(
    () =>
      cn(s.wrapper, {
        [s.disabled]: props.disabled,
        [s.readonly]: props.readOnly,
      }),
    [props.disabled, props.readOnly],
  );

  return (
    <div className={wrapperClassName}>
      <div className={s.content}>
        <Text>{props.value.value}</Text>
      </div>
    </div>
  );
};
