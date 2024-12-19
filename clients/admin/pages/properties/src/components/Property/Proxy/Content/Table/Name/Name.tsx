import { Text } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

export const Name: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={s.wrapper}>
      <Text>{props.children}</Text>
    </div>
  );
};
