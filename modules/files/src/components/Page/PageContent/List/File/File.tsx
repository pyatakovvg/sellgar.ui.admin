import { Actions } from '@library/design';
import { FileEntity } from '@library/domain';
import { Paragraph } from '@library/kit';

import React from 'react';
import { useParams } from 'react-router-dom';

import s from './default.module.scss';

interface IProps {
  file: FileEntity;
}

export const File: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.icon}>
          <img width={32} src={import.meta.env.VITE_GATEWAY_API + '/files/' + props.file.path} />
        </div>
        <div className={s.name}>
          <Paragraph>{props.file.name}</Paragraph>
        </div>
      </div>
      <div className={s.control}>
        <Actions onDelete={() => {}} />
      </div>
    </div>
  );
};
