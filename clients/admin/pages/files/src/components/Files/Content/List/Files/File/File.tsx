import { FileEntity } from '@library/domain';
import { Text, Description, Image } from '@library/kit';

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
          <Text>{props.data.name}</Text>
        </div>
        <div className={s.info}>
          <Description>
            {props.data.mime}: {props.data.size}Kb
          </Description>
        </div>
      </div>
    </div>
  );
};
