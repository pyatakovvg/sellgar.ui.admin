import { amountFormat } from '@utils/format';

import React from 'react';

import cn from 'classnames';
import s from './default.module.scss';

interface IProps {
  className?: string;
  value: number;
  currency: string;
}

export const Amount: React.FC<IProps> = (props) => {
  const classNameWrapper = React.useMemo(
    () =>
      cn(s.wrapper, props.className, {
        [s['mode--danger']]: props.value < 0,
        [s['mode--success']]: props.value > 0,
      }),
    [props.className, props.value],
  );
  const value = React.useMemo(() => {
    const amountFormated = amountFormat(props.value);
    if (props.value > 0) return '+' + amountFormated;
    return amountFormated;
  }, [props.value]);

  return (
    <div className={classNameWrapper}>
      <span className={s.value}>{value}</span>
      <span className={s.currency}>{props.currency}</span>
    </div>
  );
};
