import { FileEntity } from '@library/domain';
import { Text, Description } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  data: FileEntity;
}

export const File: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.image}>
        <img className={s.file} src={window.env.GATEWAY_API + '/v1/files/' + props.data.name + '?width=80'} />
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
