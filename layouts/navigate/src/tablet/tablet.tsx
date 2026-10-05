import { Scrollbar } from '@sellgar/kit';

import React from 'react';

import { Aside } from './aside';

export const Tablet: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <>
      <Aside />
      <Scrollbar>{props.children}</Scrollbar>
    </>
  );
};
