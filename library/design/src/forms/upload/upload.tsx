import { Heading } from '@library/kit';

import React from 'react';

import { Form } from './form';

import s from './default.module.scss';

export interface IProps {
  inProcess: boolean;
  onDone(files: File[] | File): void;
}

export const Upload: React.FC<IProps> = (props) => {
  const handleSubmit = async (data: any) => {
    props.onDone(data.files);
  };

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <Heading variant={'H3'}>Загрузить файлы</Heading>
      </div>
      <div className={s.content}>
        <Form inProcess={props.inProcess} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
