import { Paragraph, Spinner } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
}

export const Label: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  if (props.inProcess) {
    return <Spinner />;
  }
  return (
    <div className={s.wrapper}>
      <Paragraph>{props.children}</Paragraph>
    </div>
  );
};
