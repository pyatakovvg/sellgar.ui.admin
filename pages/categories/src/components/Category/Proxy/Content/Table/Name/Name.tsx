import { Text } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  deps: number;
}

export const Name: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper} style={{ marginLeft: props.deps * 24 }}>
      <Text>{props.children}</Text>
    </div>
  );
};
