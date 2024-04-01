import { ActionButton, Heading, Link } from '@library/kit';

import React from 'react';

import s from './default.module.scss';

interface IProps {
  title: string;
}

export const Header = (props: IProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Heading>{props.title}</Heading>
      </div>
      <div className={s.control}>
        <ActionButton caption={'Создать'}>
          <ActionButton.Action icon={'xmark'} title={'Товар'} />
          <ActionButton.Action icon={'xmark'} title={'Витрину'} />
        </ActionButton>
      </div>
    </div>
  );
};
