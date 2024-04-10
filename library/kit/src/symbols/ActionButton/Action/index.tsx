import React from 'react';

import { Icon, type IIcon } from '@/symbols/Icon';

import st from './default.module.scss';

export interface IActionProps {
  icon: IIcon;
  title: string;
}

export const Action = (props: IActionProps) => {
  return (
    <div className={st.wrapper}>
      <div className={st.icon}>
        <Icon icon={props.icon} />
      </div>
      <div className={st.content}>{props.title}</div>
    </div>
  );
};
