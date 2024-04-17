import React from 'react';

import { Icon } from '../Icon';

import type { ICheckbox } from './types';

import cn from 'classnames';
import st from './styles/default.module.scss';

export const Checkbox = ({ className, children, ...rest }: ICheckbox) => {
  const wrapperClassName = React.useMemo(
    () =>
      cn(st.wrapper, className, {
        [st.disabled]: rest.disabled,
      }),
    [className, rest.disabled],
  );

  return (
    <label className={wrapperClassName}>
      <div className={st.container}>
        <input className={st.checkbox} type={'checkbox'} {...rest} checked={rest.value} value={undefined} />
        <div className={st.mark}>
          <Icon icon={'check'} />
        </div>
      </div>
      {children && <div className={st.content}>{children}</div>}
    </label>
  );
};
