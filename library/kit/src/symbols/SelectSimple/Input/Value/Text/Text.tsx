import React from 'react';

import { Icon } from '@/symbols/Icon';

import cn from 'classnames';
import st from './default.module.scss';

interface IProps {
  isClearable?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  onReset?: () => void;
}

export const Text: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const textClassName = React.useMemo(
    () =>
      cn(st.text, {
        [st.disabled]: props.disabled,
        [st.readonly]: props.readOnly,
      }),
    [props.disabled],
  );

  const hasReset = React.useMemo(() => {
    if (!props.isClearable || props.readOnly) {
      return false;
    }
    return !!props.children;
  }, [props.children, props.isClearable, props.readOnly]);

  return (
    <div className={st.wrapper}>
      <div className={st.content}>
        <span className={textClassName}>{props.children}</span>
      </div>
      {hasReset && (
        <div onClick={props.onReset}>
          <Icon icon={'xmark'} />
        </div>
      )}
    </div>
  );
};
