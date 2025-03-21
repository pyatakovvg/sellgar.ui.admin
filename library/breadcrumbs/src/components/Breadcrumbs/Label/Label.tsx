import { Breadcrumb, Icon } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
  label: string;
}

export const Label: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper}>
      <Breadcrumb
        active={true}
        leadIcon={props.inProcess ? <Icon icon={'loader-4-fill'} /> : undefined}
        label={!props.inProcess ? props.label : ''}
        showDivider={false}
      />
    </div>
  );
};
