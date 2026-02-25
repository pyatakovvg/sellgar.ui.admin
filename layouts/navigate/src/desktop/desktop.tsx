import React from 'react';

import { Aside } from './aside';

export const Desktop: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <>
      <Aside />
      {props.children}
    </>
  );
};
