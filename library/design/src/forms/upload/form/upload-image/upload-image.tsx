import { Image } from '@library/kit';
import { Icon } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  src: string;
  onRemove(): void;
}

export const UploadImage: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.remove} onClick={() => props.onRemove()}>
        <Icon icon={'ancient-gate-fill'} />
      </div>
      <div className={s.content}>
        <Image src={props.src} />
      </div>
    </div>
  );
};
