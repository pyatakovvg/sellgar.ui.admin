import React from 'react';

import type { IRadio } from './types';

import cn from 'classnames';
import st from './styles/default.module.scss';

export const Radio = ({ className, children, name, ...rest }: IRadio) => {
  const radioRef = React.useRef<HTMLInputElement>(null);

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
        <input ref={radioRef} className={st.radio} type={'radio'} {...rest} name={name} />
        <div className={st.mark} />
      </div>
      {children && <div className={st.content}>{children}</div>}
    </label>
  );
};
