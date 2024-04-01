import React from 'react';

import { Icon } from '@/symbols/Icon';

import type { ISelectedValue, TOptionValue } from '../../../types';

import cn from 'classnames';
import st from './default.module.scss';

interface IChipProps {
  value: ISelectedValue;
  disabled?: boolean;
  readOnly?: boolean;
  onRemove(key: TOptionValue): void;
}

export const Chip = (props: IChipProps) => {
  const controlClassName = React.useMemo(
    () =>
      cn(st.control, {
        [st.disabled]: props.disabled,
      }),
    [props.disabled],
  );
  const wrapperClassName = React.useMemo(
    () =>
      cn(st.wrapper, {
        [st.disabled]: props.disabled,
      }),
    [props.disabled],
  );
  const contentClassName = React.useMemo(
    () =>
      cn(st.content, {
        [st.disabled]: props.disabled,
      }),
    [props.disabled],
  );
  const handleRemove = (key: TOptionValue, event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (props.disabled) {
      return void 0;
    }
    props.onRemove(key);
  };

  return (
    <div className={wrapperClassName}>
      <div className={contentClassName}>{props.value.value}</div>
      {!props.readOnly && (
        <div className={controlClassName} onClick={handleRemove.bind(null, props.value.key)}>
          <Icon icon={'xmark'} />
        </div>
      )}
    </div>
  );
};
