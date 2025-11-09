import { FileEntity } from '@library/domain';
import { Image } from '@library/kit';
import { Typography } from '@sellgar/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  data: FileEntity;
  onClick: (src: string) => void;
}

export const File: React.FC<IProps> = (props) => {
  const src = window.env.GATEWAY_API + '/v1/files/' + props.data.name;

  return (
    <div className={s.wrapper} onClick={() => props.onClick(src)}>
      <div className={s.image}>
        <Image className={s.file} alt={props.data.name} src={src + '?width=80'} />
      </div>
      <div className={s.content}>
        <div className={s.name}>
          <Typography size={'body-m'} weight={'medium'}>
            <p>{props.data.name}</p>
          </Typography>
        </div>
        <div className={s.info}>
          <Typography size={'caption-m'} weight={'medium'}>
            <p>
              {props.data.mime}: {props.data.size}Kb
            </p>
          </Typography>
        </div>
      </div>
    </div>
  );
};
