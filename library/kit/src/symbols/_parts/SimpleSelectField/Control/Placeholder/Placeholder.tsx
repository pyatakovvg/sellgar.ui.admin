import React from 'react';

import { Text } from '../../../../../typography/Text';

import st from './default.module.scss';

export const Placeholder = (props: React.PropsWithChildren) => {
  return (
    <div className={st.wrapper}>
      <div className={st.content}>
        <Text>{props.children}</Text>
      </div>
    </div>
  );
};
