import React from 'react';

import s from './default.module.scss';
import { Icon } from '@/symbols/Icon';

interface IProps {
  onClose?: () => void;
}

export const Window = React.forwardRef<HTMLDivElement, React.PropsWithChildren<IProps>>((props, ref) => {
  return (
    <div ref={ref} className={s.wrapper} {...props}>
      <div className={s.close} onClick={props.onClose}>
        <Icon icon={'xmark'} />
      </div>
      <div className={s.content}>{props.children}</div>
    </div>
  );
});
