import { Scrollbar } from '@sellgar/kit';

import React from 'react';

import { Aside } from './aside';

export const Desktop: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <>
      <Aside />
      <Scrollbar>{props.children}</Scrollbar>
    </>
  );
};
