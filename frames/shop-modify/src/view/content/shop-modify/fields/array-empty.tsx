import { Typography } from '@sellgar/kit';
import React from 'react';

import s from './array-fields.module.scss';

interface Props {
  children: React.ReactNode;
}

export const ArrayEmpty: React.FC<Props> = ({ children }) => (
  <div className={s.empty}>
    <Typography size={'body-s'}>
      <p>{children}</p>
    </Typography>
  </div>
);
