import { Text } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  inProcess: boolean;
}

export const Label: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  if (props.inProcess) {
    return <p>Loading</p>;
  }
  return (
    <div className={s.wrapper}>
      <Text>{props.children}</Text>
    </div>
  );
};
