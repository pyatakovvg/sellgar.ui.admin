import React from 'react';

import { Paragraph } from '@/typography/Paragraph';

import s from './default.module.scss';

interface IProps {}

export const Label: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  return (
    <div className={s.wrapper}>
      <Paragraph>{props.children}</Paragraph>
    </div>
  );
};
