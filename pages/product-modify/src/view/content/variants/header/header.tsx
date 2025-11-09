import { Typography, ButtonLink, Icon } from '@sellgar/kit';

import React from 'react';

import s from './header.module.scss';

interface IProps {
  onAdd(): void;
}

export const Header: React.FC<IProps> = (props) => {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <Typography size={'body-m'} weight={'semi-bold'}>
          <p>Варианты товара</p>
        </Typography>
      </div>
      <div className={s.control}>
        <ButtonLink
          type={'button'}
          size={'sm'}
          target={'info'}
          leadIcon={<Icon icon={Icon.addLine} />}
          onClick={() => props.onAdd()}
        >
          Добавить вариант
        </ButtonLink>
      </div>
    </div>
  );
};
