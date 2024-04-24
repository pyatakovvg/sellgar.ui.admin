import React from 'react';

import { Paragraph } from '@/typography/Paragraph';

import cn from 'classnames';
import st from './styles/default.module.scss';

interface IProps<T = any> {
  isSimplify?: boolean;
  disabled?: boolean;
  optionKey: keyof T;
  value: T;
  currentValue: T;
  onChange: () => void;
}

function checkActive(value: any, currentValue: any, optionKey: any, isSimplify?: boolean) {
  return currentValue === (isSimplify ? value : value[optionKey]);
}

export const Option: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const wrapperClassName = React.useMemo(
    () =>
      cn(st.wrapper, {
        [st.active]: checkActive(props.value, props.currentValue, props.optionKey, props.isSimplify),
      }),
    [props.value, props.currentValue],
  );

  return (
    <div className={wrapperClassName} onClick={() => props.onChange()}>
      <Paragraph>{props.children}</Paragraph>
    </div>
  );
};
