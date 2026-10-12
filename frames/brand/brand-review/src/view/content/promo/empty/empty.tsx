import { CameraOffFillIcon } from '@sellgar/kit/icons';

import React from 'react';

import s from './default.module.scss';

export const Empty: React.FC = () => {
  return (
    <div className={s.wrapper}>
      <CameraOffFillIcon className={s.icon} />
    </div>
  );
};
