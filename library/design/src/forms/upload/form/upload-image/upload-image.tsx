import { Icon, Image } from '@library/kit';

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
        <Icon icon={'cancel'} size={18} />
      </div>
      <div className={s.content}>
        <Image src={props.src} />
      </div>
    </div>
  );
};
