import { Breadcrumb } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
  label: string;
}

export const Label: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  if (props.inProcess) {
    return <p>Loading</p>;
  }
  return (
    <div className={s.wrapper}>
      <Breadcrumb active={true} label={props.label} showdivider={false} />
    </div>
  );
};
