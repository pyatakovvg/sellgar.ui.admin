import { Breadcrumb } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  label: string;
}

export const Label: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper}>
      <Breadcrumb active={true} label={props.label} />
    </div>
  );
};
