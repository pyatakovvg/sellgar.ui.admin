import React from 'react';

import { DropDownContext } from '@/base/DropDown';

import s from './default.module.scss';

export const Action: React.FC<React.PropsWithChildren> = (props) => {
  const context = React.useContext(DropDownContext);

  const handleClose = () => {
    context.close();
  };

  return (
    <div className={s.wrapper} onClick={handleClose}>
      {props.children}
    </div>
  );
};
